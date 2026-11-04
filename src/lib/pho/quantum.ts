import { ATOMS, type Atom } from "@/lib/pho/corpus";
import type { Analysis, CorpusHit, Qualities, VenueId } from "@/lib/pho/types";

const DIM = 8;

const STATES: Float64Array[] = ATOMS.map((atom) => unit(center(Float64Array.from(atom.s))));

const VENUE_BIAS: Record<VenueId, number[]> = {
  club: [0.16, -0.04, 0.14, 0.04, -0.1, 0.12, 0, -0.04],
  stadium: [0.08, 0.1, 0.04, 0.08, -0.06, 0.08, 0, 0.08],
  meeting: [-0.14, -0.02, -0.16, -0.1, 0.04, -0.16, 0, -0.04],
  theater: [-0.04, 0.08, -0.02, 0.02, 0.1, -0.06, 0.02, 0.1],
  hall: [0, 0.04, 0.02, 0.06, 0.08, -0.04, 0, 0.04],
};

export type Collapse = {
  hits: CorpusHit[];
  bed: string;
  instrumental: boolean;
  lift: number;
  colorLead: string;
};

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

function band(a: Analysis, id: string): number {
  const db = a.bands.find((b) => b.id === id)?.db ?? -18;
  return clamp01((db + 24) / 24);
}

function center(v: Float64Array): Float64Array {
  const o = new Float64Array(DIM);
  for (let i = 0; i < DIM; i++) o[i] = (v[i] ?? 0) * 2 - 1;
  return o;
}

function unit(v: Float64Array): Float64Array {
  let s = 0;
  for (let i = 0; i < v.length; i++) s += v[i] * v[i];
  const n = Math.sqrt(s) || 1;
  const o = new Float64Array(v.length);
  for (let i = 0; i < v.length; i++) o[i] = v[i] / n;
  return o;
}

function dot(a: Float64Array, b: Float64Array): number {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function queryOf(a: Analysis, venue: VenueId, q: Qualities): Float64Array {
  const pulse = clamp01((a.bpm - 60) / 100);
  const bright = clamp01((a.centroidHz - 600) / 4200);
  const low = clamp01(band(a, "sub") * 0.55 + band(a, "bass") * 0.45 + (q.sub ? 0.1 : 0));
  const crestN = clamp01(a.crestDb / 18);
  const dense = clamp01(1 - crestN * 0.5 + band(a, "mid") * 0.35);
  const drone = clamp01((1 - pulse) * 0.45 + (a.keyMinor ? 0.18 : 0) + (1 - bright) * 0.2 + (q.smooth ? 0.1 : 0));
  const perc = clamp01(crestN * 0.48 + pulse * 0.34 + (q.smooth ? -0.1 : 0.04));
  const minor = a.keyMinor ? 0.85 : 0.18;
  const air = clamp01(band(a, "air") * 0.4 + band(a, "presence") * 0.3 + bright * 0.22 + (q.bright ? 0.1 : 0));
  const raw = [pulse, bright, low, dense, drone, perc, minor, air];
  const bias = VENUE_BIAS[venue];
  const v = new Float64Array(DIM);
  for (let i = 0; i < DIM; i++) v[i] = clamp01(raw[i] + bias[i]);
  if (q.drive) {
    v[0] = clamp01(v[0] + 0.22);
    v[5] = clamp01(v[5] + 0.16);
    v[4] = clamp01(v[4] - 0.18);
    v[1] = clamp01(v[1] + 0.06);
  }
  if (band(a, "vocal") >= 0.55) {
    v[0] = clamp01(v[0] - 0.16);
    v[5] = clamp01(v[5] - 0.2);
    v[1] = clamp01(v[1] + 0.06);
    v[3] = clamp01(v[3] + 0.05);
  }
  return unit(center(v));
}

function rolesOf(atom: Atom): string[] {
  const scored: [string, number][] = [
    ["Nhịp", Math.max(atom.s[0], atom.s[5])],
    ["Màu", Math.max(atom.s[1], atom.s[7])],
    ["Nền", Math.max(atom.s[2] * 0.9, atom.s[4])],
    ["Đệm", atom.s[3]],
  ];
  let best = scored[0];
  for (const item of scored) if (item[1] > best[1]) best = item;
  return [best[0]];
}

function kernelPrepare(alpha: Float64Array): Float64Array {
  const beta = new Float64Array(alpha.length);
  for (let i = 0; i < alpha.length; i++) {
    let s = 0;
    const si = STATES[i];
    for (let j = 0; j < alpha.length; j++) {
      if (alpha[j] <= 0) continue;
      const k = dot(si, STATES[j]);
      if (k > 0) s += k * alpha[j];
    }
    beta[i] = s;
  }
  return beta;
}

function groverOnce(beta: Float64Array, marked: Uint8Array): Float64Array {
  let norm = 0;
  for (let i = 0; i < beta.length; i++) norm += beta[i] * beta[i];
  norm = Math.sqrt(norm) || 1;
  const amp = new Float64Array(beta.length);
  for (let i = 0; i < beta.length; i++) {
    const a = beta[i] / norm;
    amp[i] = marked[i] ? -a : a;
  }
  let mean = 0;
  for (let i = 0; i < amp.length; i++) mean += amp[i];
  mean /= amp.length;
  for (let i = 0; i < amp.length; i++) amp[i] = 2 * mean - amp[i];
  return amp;
}

const ORDER = ["Nền", "Màu", "Nhịp", "Đệm"];

function measure(scores: Float64Array, alpha: Float64Array): { hit: CorpusHit; index: number }[] {
  const used = new Uint8Array(ATOMS.length);
  const picked: { hit: CorpusHit; index: number }[] = [];

  const take = (role: string): void => {
    let best = -1;
    let bestScore = -1;
    for (let i = 0; i < ATOMS.length; i++) {
      if (used[i] || scores[i] <= bestScore) continue;
      if (!rolesOf(ATOMS[i]).includes(role)) continue;
      let close = false;
      for (const prev of picked) {
        if (dot(STATES[i], STATES[prev.index]) > 0.9) close = true;
      }
      if (close) continue;
      best = i;
      bestScore = scores[i];
    }
    if (best < 0) return;
    used[best] = 1;
    const atom = ATOMS[best];
    picked.push({
      index: best,
      hit: {
        id: atom.id,
        vi: atom.vi,
        region: atom.region,
        role,
        lead: atom.lead,
        p: 0,
        en: atom.en,
      },
    });
  };

  for (const role of ORDER) take(role);

  if (picked.length < 4) {
    const spare = [...scores.keys()].sort((i, j) => scores[j] - scores[i]);
    for (const i of spare) {
      if (picked.length >= 4) break;
      if (used[i] || alpha[i] <= 0) continue;
      used[i] = 1;
      const atom = ATOMS[i];
      const role = rolesOf(atom)[0] ?? "Đệm";
      picked.push({
        index: i,
        hit: { id: atom.id, vi: atom.vi, region: atom.region, role, lead: atom.lead, p: 0, en: atom.en },
      });
    }
  }

  let mass = 0;
  for (const item of picked) mass += scores[item.index];
  if (mass <= 0) mass = 1;
  for (const item of picked) item.hit.p = scores[item.index] / mass;
  return picked;
}

export function arrangementLine(a: Analysis, q: Qualities, instrumental: boolean): string {
  return [
    a.stereo > 0.35
      ? "Pan the color instruments. Bass stays mono under 120 Hz."
      : "Keep the band mostly centered, a small pan on the lead only.",
    q.smooth ? "Legato bows and long breaths, soft attacks." : "Notes speak at once, attacks stay clear.",
    q.sub ? "The low instrument is felt, then stops. No endless sub." : "Low end stays even, no sub boom.",
    instrumental
      ? "No singer. The lead instrument carries the hook."
      : "A sung Vietnamese vocal sits in front. Instruments answer in the gaps.",
  ].join(" ");
}

export function collapseCorpus(a: Analysis, venue: VenueId, q: Qualities): Collapse {
  const query = queryOf(a, venue, q);
  const alpha = new Float64Array(ATOMS.length);
  for (let i = 0; i < ATOMS.length; i++) alpha[i] = Math.max(0, dot(query, STATES[i]));

  const beta = kernelPrepare(alpha);
  let betaMax = 0;
  for (let i = 0; i < beta.length; i++) if (beta[i] > betaMax) betaMax = beta[i];
  const mixed = new Float64Array(alpha.length);
  for (let i = 0; i < alpha.length; i++) {
    const b = betaMax > 0 ? beta[i] / betaMax : 0;
    mixed[i] = 0.72 * alpha[i] + 0.28 * b;
  }
  const rank = [...alpha.keys()].sort((i, j) => alpha[j] - alpha[i]);
  const markCount = Math.max(6, Math.round(ATOMS.length * 0.28));
  const marked = new Uint8Array(ATOMS.length);
  for (let k = 0; k < markCount; k++) marked[rank[k]] = 1;

  const amp = groverOnce(mixed, marked);
  const scores = new Float64Array(ATOMS.length);
  let mass = 0;
  let top = 0;
  for (let i = 0; i < ATOMS.length; i++) {
    const born = amp[i] * amp[i];
    const score = born * (0.2 + alpha[i]) * (marked[i] ? 1 : 0.3);
    scores[i] = score;
    mass += score;
    if (score > top) top = score;
  }

  const picked = measure(scores, alpha);
  const vocal = band(a, "vocal");
  const mid = band(a, "mid");
  const instrumental = vocal < 0.5 && vocal <= mid + 0.02;
  const color = picked.find((item) => item.hit.role === "Màu")?.hit.lead ?? picked[0]?.hit.lead ?? "flute";
  const lift = mass > 0 ? top / mass / (1 / ATOMS.length) : 1;

  return {
    hits: picked.map((item) => item.hit),
    bed: picked.map((item) => item.hit.en).join(" "),
    instrumental,
    lift,
    colorLead: color,
  };
}
