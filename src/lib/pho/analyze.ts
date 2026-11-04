import { fft } from "@/lib/pho/fft";
import { detectKey } from "@/lib/pho/theory";
import type { Analysis, Band } from "@/lib/pho/types";

const FFT_N = 4096;

const BANDS: { id: string; label: string; lo: number; hi: number }[] = [
  { id: "sub", label: "Siêu trầm", lo: 20, hi: 60 },
  { id: "bass", label: "Bass", lo: 60, hi: 250 },
  { id: "mud", label: "Bùn", lo: 250, hi: 500 },
  { id: "mid", label: "Trung", lo: 500, hi: 1500 },
  { id: "vocal", label: "Lời", lo: 1500, hi: 4000 },
  { id: "presence", label: "Hiện diện", lo: 4000, hi: 8000 },
  { id: "air", label: "Hơi", lo: 8000, hi: 16000 },
];

function hann(n: number): Float32Array {
  const w = new Float32Array(n);
  for (let i = 0; i < n; i++) w[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1)));
  return w;
}

function biquadHighpass(fs: number, f: number, q: number) {
  const w0 = (2 * Math.PI * f) / fs;
  const cos = Math.cos(w0);
  const sin = Math.sin(w0);
  const alpha = sin / (2 * q);
  const a0 = 1 + alpha;
  return {
    b0: (1 + cos) / 2 / a0,
    b1: -(1 + cos) / a0,
    b2: (1 + cos) / 2 / a0,
    a1: (-2 * cos) / a0,
    a2: (1 - alpha) / a0,
  };
}

function biquadHighShelf(fs: number, f: number, gainDb: number) {
  const A = 10 ** (gainDb / 40);
  const w0 = (2 * Math.PI * f) / fs;
  const cos = Math.cos(w0);
  const sin = Math.sin(w0);
  const alpha = sin / 2;
  const twoSqrtAAlpha = 2 * Math.sqrt(A) * alpha;
  const a0 = A + 1 - (A - 1) * cos + twoSqrtAAlpha;
  return {
    b0: (A * (A + 1 + (A - 1) * cos + twoSqrtAAlpha)) / a0,
    b1: (-2 * A * (A - 1 + (A + 1) * cos)) / a0,
    b2: (A * (A + 1 + (A - 1) * cos - twoSqrtAAlpha)) / a0,
    a1: (2 * (A - 1 - (A + 1) * cos)) / a0,
    a2: (A + 1 - (A - 1) * cos - twoSqrtAAlpha) / a0,
  };
}

function runBiquad(
  x: number,
  c: { b0: number; b1: number; b2: number; a1: number; a2: number },
  z: { x1: number; x2: number; y1: number; y2: number },
): number {
  const y = c.b0 * x + c.b1 * z.x1 + c.b2 * z.x2 - c.a1 * z.y1 - c.a2 * z.y2;
  z.x2 = z.x1;
  z.x1 = x;
  z.y2 = z.y1;
  z.y1 = y;
  return y;
}

function estimateBpm(read: (i: number) => number, length: number, sr: number): number {
  const envRate = 100;
  const step = Math.max(1, Math.floor(sr / envRate));
  const env: number[] = [];
  const cap = Math.min(length, sr * 90);
  for (let i = 0; i + step < cap; i += step) {
    let s = 0;
    const hop = 4;
    for (let j = 0; j < step; j += hop) {
      const v = read(i + j);
      s += v * v;
    }
    env.push(Math.sqrt(s / (step / hop)));
  }
  if (env.length < 200) return 120;
  let mean = 0;
  for (const v of env) mean += v;
  mean /= env.length;
  const onset = new Float32Array(env.length);
  for (let i = 1; i < env.length; i++) {
    const d = env[i] - env[i - 1];
    onset[i] = d > 0 ? d : 0;
  }
  let bestBpm = 120;
  let best = 0;
  for (let bpm = 70; bpm <= 176; bpm++) {
    const lag = Math.round((envRate * 60) / bpm);
    let acc = 0;
    for (let i = 0; i + lag < onset.length; i += 2) acc += onset[i] * onset[i + lag];
    const score = acc / (1 + Math.abs(mean));
    if (score > best) {
      best = score;
      bestBpm = bpm;
    }
  }
  return bestBpm;
}

function approxLufs(read: (i: number) => number, length: number, sr: number): number {
  const hp = biquadHighpass(sr, 60, 0.5);
  const hs = biquadHighShelf(sr, 1500, 4);
  const z1 = { x1: 0, x2: 0, y1: 0, y2: 0 };
  const z2 = { x1: 0, x2: 0, y1: 0, y2: 0 };
  const block = Math.max(1, Math.floor(sr * 0.4));
  const stride = 2;
  const powers: number[] = [];
  let acc = 0;
  let count = 0;
  const cap = Math.min(length, sr * 180);
  for (let i = 0; i < cap; i += stride) {
    let y = runBiquad(read(i), hp, z1);
    y = runBiquad(y, hs, z2);
    acc += y * y;
    count++;
    if (count >= block / stride) {
      powers.push(acc / count);
      acc = 0;
      count = 0;
    }
  }
  const loud = powers.map((p) => -0.691 + 10 * Math.log10(p + 1e-12));
  const abs = loud.filter((v) => v > -70);
  if (!abs.length) return -32;
  const mean = abs.reduce((s, v) => s + v, 0) / abs.length;
  const rel = abs.filter((v) => v > mean - 10);
  const gated = rel.length ? rel : abs;
  return gated.reduce((s, v) => s + v, 0) / gated.length;
}

function yieldTick(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

export async function analyzeFile(
  file: File,
  onProgress?: (p: number) => void,
): Promise<Analysis> {
  onProgress?.(0.02);
  const audioCtx = new AudioContext();
  try {
    const encoded = await file.arrayBuffer();
    onProgress?.(0.12);
    const buffer = await audioCtx.decodeAudioData(encoded.slice(0));
    const sr = buffer.sampleRate;
    const channels = buffer.numberOfChannels;
    const length = buffer.length;
    const duration = buffer.duration;
    if (!Number.isFinite(duration) || duration < 0.2 || length < FFT_N) {
      throw new Error("File quá ngắn hoặc không có tiếng.");
    }
    const ch0 = buffer.getChannelData(0);
    const ch1 = channels > 1 ? buffer.getChannelData(1) : ch0;
    const read = (i: number) => {
      const a = ch0[i] ?? 0;
      const b = ch1[i] ?? 0;
      return (a + b) * 0.5;
    };

    let peak = 0;
    let sumSq = 0;
    let nSq = 0;
    let corr = 0;
    let eL = 0;
    let eR = 0;
    const stride = Math.max(1, Math.floor(length / 250000));
    for (let i = 0; i < length; i += stride) {
      const l = ch0[i] ?? 0;
      const r = ch1[i] ?? 0;
      const m = (l + r) * 0.5;
      const a = Math.abs(m);
      if (a > peak) peak = a;
      sumSq += m * m;
      nSq++;
      corr += l * r;
      eL += l * l;
      eR += r * r;
    }
    const peakDb = 20 * Math.log10(peak + 1e-9);
    const rmsDb = 10 * Math.log10(sumSq / Math.max(1, nSq) + 1e-12);
    const crestDb = peakDb - rmsDb;
    const denom = Math.sqrt(eL * eR) + 1e-12;
    const corrN = Math.min(1, Math.max(-1, corr / denom));
    const stereo = Math.min(1, Math.max(0, 1 - corrN));

    const window = hann(FFT_N);
    const re = new Float32Array(FFT_N);
    const im = new Float32Array(FFT_N);
    const windows = Math.min(140, Math.max(24, Math.floor(duration)));
    const bandAcc = new Float32Array(BANDS.length);
    const chroma = new Float32Array(12);
    const specAcc = new Float32Array(48);
    const ribbon: Analysis["ribbon"] = [];
    const binHz = sr / FFT_N;
    let centroidNum = 0;
    let centroidDen = 0;

    for (let w = 0; w < windows; w++) {
      const start = Math.floor((w * Math.max(0, length - FFT_N)) / Math.max(1, windows - 1));
      for (let i = 0; i < FFT_N; i++) {
        re[i] = read(start + i) * window[i];
        im[i] = 0;
      }
      fft(re, im);
      let bassE = 0;
      let vocalE = 0;
      let airE = 0;
      for (let k = 1; k < FFT_N / 2; k++) {
        const mag = Math.hypot(re[k], im[k]);
        const freq = k * binHz;
        centroidNum += freq * mag;
        centroidDen += mag;
        if (freq >= 40 && freq <= 5000) {
          const midi = 69 + 12 * Math.log2(freq / 440);
          const pc = ((Math.round(midi) % 12) + 12) % 12;
          chroma[pc] += mag;
        }
        for (let b = 0; b < BANDS.length; b++) {
          if (freq >= BANDS[b].lo && freq < BANDS[b].hi) bandAcc[b] += mag * mag;
        }
        if (freq >= 40 && freq < 200) bassE += mag;
        else if (freq >= 300 && freq < 4000) vocalE += mag;
        else if (freq >= 6000 && freq < 16000) airE += mag;
        const logPos = Math.log(freq / 30) / Math.log(16000 / 30);
        const bin = Math.min(47, Math.max(0, Math.floor(logPos * 48)));
        if (freq >= 30 && freq <= 16000) specAcc[bin] += mag;
      }
      ribbon.push({ t: start / sr, bass: bassE, vocal: vocalE, air: airE });
      if (w % 10 === 0) {
        onProgress?.(0.2 + (0.7 * w) / windows);
        await yieldTick();
      }
    }

    let cum = 0;
    let specSum = 0;
    for (let i = 0; i < specAcc.length; i++) specSum += specAcc[i];
    let rolloffHz = 8000;
    for (let i = 0; i < specAcc.length; i++) {
      cum += specAcc[i];
      if (cum >= 0.85 * specSum) {
        rolloffHz = 30 * (16000 / 30) ** (i / 48);
        break;
      }
    }

    const maxBand = Math.max(...Array.from(bandAcc), 1e-9);
    const bands: Band[] = BANDS.map((b, i) => ({
      id: b.id,
      label: b.label,
      lo: b.lo,
      hi: b.hi,
      db: 10 * Math.log10((bandAcc[i] + 1e-12) / maxBand),
    }));

    let specMax = 1e-9;
    for (const v of specAcc) if (v > specMax) specMax = v;
    const spectrum = Array.from(specAcc, (v) => v / specMax);

    let ribMax = 1e-9;
    for (const p of ribbon) ribMax = Math.max(ribMax, p.bass, p.vocal, p.air);
    for (const p of ribbon) {
      p.bass /= ribMax;
      p.vocal /= ribMax;
      p.air /= ribMax;
    }

    const key = detectKey(chroma);
    onProgress?.(0.94);
    const lufs = approxLufs(read, length, sr);
    const bpm = estimateBpm(read, length, sr);
    onProgress?.(1);

    return {
      fileName: file.name,
      duration,
      sampleRate: sr,
      channels,
      bpm,
      keyName: key.name,
      keyRoot: key.root,
      keyMinor: key.minor,
      lufs,
      peakDb,
      crestDb,
      centroidHz: centroidDen > 0 ? centroidNum / centroidDen : 1000,
      rolloffHz,
      stereo,
      bands,
      spectrum,
      ribbon,
      fromFile: true,
    };
  } finally {
    await audioCtx.close().catch(() => undefined);
  }
}

export const DEMO_ANALYSIS: Analysis = {
  fileName: "Phổ mẫu",
  duration: 200,
  sampleRate: 48000,
  channels: 2,
  bpm: 118,
  keyName: "A minor",
  keyRoot: 9,
  keyMinor: true,
  lufs: -16.5,
  peakDb: -1.2,
  crestDb: 12,
  centroidHz: 1800,
  rolloffHz: 9200,
  stereo: 0.42,
  bands: [
    { id: "sub", label: "Siêu trầm", lo: 20, hi: 60, db: -14 },
    { id: "bass", label: "Bass", lo: 60, hi: 250, db: -6 },
    { id: "mud", label: "Bùn", lo: 250, hi: 500, db: -8 },
    { id: "mid", label: "Trung", lo: 500, hi: 1500, db: -4 },
    { id: "vocal", label: "Lời", lo: 1500, hi: 4000, db: -3 },
    { id: "presence", label: "Hiện diện", lo: 4000, hi: 8000, db: -9 },
    { id: "air", label: "Hơi", lo: 8000, hi: 16000, db: -16 },
  ],
  spectrum: Array.from({ length: 48 }, (_, i) => {
    const x = i / 47;
    return Math.max(0.08, Math.sin(Math.PI * x) * 0.85 * (1 - 0.35 * x));
  }),
  ribbon: Array.from({ length: 64 }, (_, i) => ({
    t: (i / 63) * 200,
    bass: 0.35 + 0.4 * Math.sin(i / 6),
    vocal: 0.3 + 0.45 * Math.sin(i / 8 + 1),
    air: 0.15 + 0.2 * Math.sin(i / 5 + 2),
  })),
  fromFile: false,
};

export async function stashFile(file: File): Promise<void> {
  const storage = navigator.storage;
  if (!storage?.getDirectory) return;
  try {
    const root = await storage.getDirectory();
    const handle = await root.getFileHandle("pho-vang-current", { create: true });
    const writable = await handle.createWritable();
    await writable.write(file);
    await writable.close();
  } catch {
    /* quota or private mode — analysis still runs from the file in hand */
  }
}
