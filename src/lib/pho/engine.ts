import type { Chain, Design } from "@/lib/pho/types";
import { TARGET_SEC } from "@/lib/pho/types";
import { midiHz } from "@/lib/pho/theory";

const MOTIF = [0, 2, 4, 2, 7, 4, 3, 2];

export type PlayMode = "idle" | "file" | "sketch";

function curve(amount: number): Float32Array {
  const n = 256;
  const out = new Float32Array(n);
  const k = Math.max(0, amount) * 14;
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    out[i] = ((1 + k) * x) / (1 + k * Math.abs(x));
  }
  return out;
}

function glide(param: AudioParam, value: number, ctx: AudioContext) {
  const t = ctx.currentTime;
  param.cancelScheduledValues(t);
  param.setTargetAtTime(value, t, 0.04);
}

export class MasterEngine {
  ctx: AudioContext | null = null;
  analyser: AnalyserNode | null = null;
  private media: HTMLAudioElement | null = null;
  private mediaSrc: MediaElementAudioSourceNode | null = null;
  private mediaGain: GainNode | null = null;
  private sketchGain: GainNode | null = null;
  private session: GainNode | null = null;
  private input: GainNode | null = null;
  private hp: BiquadFilterNode | null = null;
  private mud: BiquadFilterNode | null = null;
  private vocal: BiquadFilterNode | null = null;
  private flute: BiquadFilterNode | null = null;
  private treble: BiquadFilterNode | null = null;
  private air: BiquadFilterNode | null = null;
  private comp: DynamicsCompressorNode | null = null;
  private delay: DelayNode | null = null;
  private delayFb: GainNode | null = null;
  private wet: GainNode | null = null;
  private shaper: WaveShaperNode | null = null;
  private bassShelf: BiquadFilterNode | null = null;
  private bassPeak: BiquadFilterNode | null = null;
  private bassSend: GainNode | null = null;
  private loa: GainNode | null = null;
  private limiter: DynamicsCompressorNode | null = null;
  private hatPan: StereoPannerNode | null = null;
  private flutePan: StereoPannerNode | null = null;
  private bassLp: BiquadFilterNode | null = null;
  private vocalBp: BiquadFilterNode | null = null;
  private noise: AudioBuffer | null = null;
  private design: Design | null = null;
  private level = 1;
  private running = false;
  private timer = 0;
  private originCtx = 0;
  private originScore = 0;
  private nextScore = 0;
  private mode: PlayMode = "idle";
  private lastEmit = 0;
  onTime: ((sec: number, mode: PlayMode) => void) | null = null;

  private build() {
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.media = new Audio();
    this.media.preload = "auto";
    this.media.setAttribute("playsinline", "true");
    this.mediaGain = ctx.createGain();
    this.sketchGain = ctx.createGain();
    this.sketchGain.gain.value = 1;
    this.input = ctx.createGain();
    this.mediaGain.connect(this.input);
    this.sketchGain.connect(this.input);

    this.hp = ctx.createBiquadFilter();
    this.hp.type = "highpass";
    this.mud = ctx.createBiquadFilter();
    this.mud.type = "peaking";
    this.mud.frequency.value = 280;
    this.mud.Q.value = 0.9;
    this.vocal = ctx.createBiquadFilter();
    this.vocal.type = "peaking";
    this.vocal.Q.value = 0.8;
    this.flute = ctx.createBiquadFilter();
    this.flute.type = "peaking";
    this.flute.Q.value = 1.3;
    this.treble = ctx.createBiquadFilter();
    this.treble.type = "highshelf";
    this.air = ctx.createBiquadFilter();
    this.air.type = "peaking";
    this.air.frequency.value = 11000;
    this.air.Q.value = 0.7;
    this.comp = ctx.createDynamicsCompressor();
    this.comp.knee.value = 8;
    this.delay = ctx.createDelay(1);
    this.delayFb = ctx.createGain();
    const delayFilter = ctx.createBiquadFilter();
    delayFilter.type = "lowpass";
    delayFilter.frequency.value = 4500;
    this.wet = ctx.createGain();
    this.bassShelf = ctx.createBiquadFilter();
    this.bassShelf.type = "lowshelf";
    this.bassPeak = ctx.createBiquadFilter();
    this.bassPeak.type = "peaking";
    this.bassPeak.Q.value = 0.8;
    this.shaper = ctx.createWaveShaper();
    this.bassSend = ctx.createGain();
    this.loa = ctx.createGain();
    this.limiter = ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -1.2;
    this.limiter.knee.value = 0;
    this.limiter.ratio.value = 20;
    this.limiter.attack.value = 0.003;
    this.limiter.release.value = 0.08;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.72;

    this.input.connect(this.hp);
    this.hp.connect(this.mud);
    this.mud.connect(this.vocal);
    this.vocal.connect(this.flute);
    this.flute.connect(this.treble);
    this.treble.connect(this.air);
    this.air.connect(this.comp);
    this.comp.connect(this.loa);
    this.comp.connect(this.delay);
    this.delay.connect(delayFilter);
    delayFilter.connect(this.delayFb);
    this.delayFb.connect(this.delay);
    delayFilter.connect(this.wet);
    this.wet.connect(this.loa);

    const bassLow = ctx.createBiquadFilter();
    bassLow.type = "lowpass";
    bassLow.frequency.value = 160;
    const bassSplit = ctx.createGain();
    this.air.connect(bassSplit);
    bassSplit.connect(bassLow);
    bassLow.connect(this.bassShelf);
    this.bassShelf.connect(this.bassPeak);
    this.bassPeak.connect(this.shaper);
    this.shaper.connect(this.bassSend);
    this.bassSend.connect(this.comp);

    this.loa.connect(this.limiter);
    this.limiter.connect(this.analyser);
    this.analyser.connect(ctx.destination);

    this.hatPan = ctx.createStereoPanner();
    this.hatPan.pan.value = -0.55;
    this.flutePan = ctx.createStereoPanner();
    this.flutePan.pan.value = 0.4;
    this.bassLp = ctx.createBiquadFilter();
    this.bassLp.type = "lowpass";
    this.bassLp.frequency.value = 180;
    this.vocalBp = ctx.createBiquadFilter();
    this.vocalBp.type = "bandpass";
    this.vocalBp.frequency.value = 1400;
    this.vocalBp.Q.value = 0.7;

    const samples = Math.floor(ctx.sampleRate * 0.06);
    const buf = ctx.createBuffer(1, samples, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < samples; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / samples);
    this.noise = buf;

    this.media.onended = () => {
      if (this.mode === "file") this.emit(this.media?.duration ?? 0, "idle");
    };
    this.media.ontimeupdate = () => {
      if (this.mode === "file" && this.media) this.emit(this.media.currentTime, "file");
    };
  }

  async ensure() {
    if (!this.ctx) this.build();
    if (this.ctx && this.ctx.state === "suspended") await this.ctx.resume();
  }

  attach(url: string) {
    if (!this.media) this.build();
    if (!this.media) return;
    this.media.pause();
    this.media.src = url;
    this.media.load();
  }

  setDesign(design: Design) {
    this.design = design;
    this.applyChain(design.chain);
  }

  setLevel(level: number) {
    this.level = level;
    if (this.design) this.applyChain(this.design.chain);
  }

  private applyChain(chain: Chain) {
    const ctx = this.ctx;
    if (!ctx || !this.hp || !this.mud || !this.vocal || !this.flute || !this.treble || !this.air) return;
    if (!this.comp || !this.delay || !this.delayFb || !this.wet || !this.bassShelf || !this.bassPeak) return;
    if (!this.bassSend || !this.shaper || !this.loa) return;
    glide(this.hp.frequency, chain.hp, ctx);
    glide(this.mud.gain, chain.mudDb, ctx);
    glide(this.vocal.frequency, chain.vocalHz, ctx);
    glide(this.vocal.gain, chain.vocalDb, ctx);
    glide(this.flute.frequency, chain.fluteHz, ctx);
    glide(this.flute.gain, chain.fluteDb, ctx);
    glide(this.treble.frequency, 6500, ctx);
    glide(this.treble.gain, chain.trebleDb, ctx);
    glide(this.air.gain, chain.airDb, ctx);
    glide(this.comp.threshold, chain.compThreshold, ctx);
    glide(this.comp.ratio, chain.compRatio, ctx);
    glide(this.comp.attack, chain.compAttack, ctx);
    glide(this.comp.release, chain.compRelease, ctx);
    glide(this.delay.delayTime, chain.delaySec, ctx);
    glide(this.delayFb.gain, chain.delayFb, ctx);
    glide(this.wet.gain, chain.delayWet, ctx);
    glide(this.bassShelf.frequency, chain.bassHz, ctx);
    glide(this.bassShelf.gain, chain.bassShelfDb, ctx);
    glide(this.bassPeak.frequency, Math.max(40, chain.bassHz * 0.75), ctx);
    glide(this.bassPeak.gain, Math.max(0, chain.bassShelfDb * 0.45), ctx);
    glide(this.bassSend.gain, 0.22 + chain.sat * 0.25, ctx);
    this.shaper.curve = curve(chain.sat) as unknown as Float32Array<ArrayBuffer>;
    glide(this.loa.gain, chain.loa3 * this.level, ctx);
  }

  async playFile() {
    await this.ensure();
    if (!this.media || !this.ctx || !this.mediaGain) return;
    this.stopSketch();
    if (!this.mediaSrc) {
      this.mediaSrc = this.ctx.createMediaElementSource(this.media);
      this.mediaSrc.connect(this.mediaGain);
    }
    this.mediaGain.gain.value = 1;
    this.mode = "file";
    try {
      await this.media.play();
    } catch {
      this.mode = "idle";
      throw new Error("Trình duyệt chặn phát. Chạm lại nút nghe.");
    }
  }

  pauseFile() {
    this.media?.pause();
    if (this.mode === "file") this.mode = "idle";
    this.emit(this.media?.currentTime ?? 0, "idle");
  }

  async playSketch(from = 0) {
    await this.ensure();
    if (!this.ctx || !this.design || !this.sketchGain) return;
    this.media?.pause();
    if (this.mediaGain) this.mediaGain.gain.value = 0;
    this.stopSketch();
    const session = this.ctx.createGain();
    session.gain.value = 0.4;
    session.connect(this.sketchGain);
    this.session = session;
    this.hatPan?.connect(session);
    this.flutePan?.connect(session);
    this.bassLp?.connect(session);
    this.vocalBp?.connect(session);
    const startAt = Math.min(TARGET_SEC - 0.2, Math.max(0, from));
    this.originCtx = this.ctx.currentTime + 0.06;
    this.originScore = startAt;
    this.nextScore = startAt;
    this.running = true;
    this.mode = "sketch";
    this.pump();
  }

  stop() {
    this.stopSketch();
    this.pauseFile();
    this.mode = "idle";
  }

  private drop(node: AudioNode | null) {
    if (!node) return;
    try {
      node.disconnect();
    } catch {
      /* already disconnected */
    }
  }

  private stopSketch() {
    this.running = false;
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = 0;
    this.drop(this.hatPan);
    this.drop(this.flutePan);
    this.drop(this.bassLp);
    this.drop(this.vocalBp);
    if (this.session && this.ctx) {
      const dead = this.session;
      dead.gain.setValueAtTime(0, this.ctx.currentTime);
      window.setTimeout(() => this.drop(dead), 400);
    }
    this.session = null;
    if (this.mode === "sketch") this.mode = "idle";
  }

  private emit(sec: number, mode: PlayMode) {
    const now = performance.now();
    if (mode !== "idle" && now - this.lastEmit < 200) return;
    this.lastEmit = now;
    this.mode = mode;
    this.onTime?.(sec, mode);
  }

  private pump = () => {
    if (!this.running || !this.ctx || !this.design) return;
    const scoreNow = this.originScore + (this.ctx.currentTime - this.originCtx);
    if (scoreNow >= TARGET_SEC) {
      this.stopSketch();
      this.emit(TARGET_SEC, "idle");
      return;
    }
    const horizon = scoreNow + 0.4;
    const bar = (240 / this.design.bpm);
    while (this.nextScore < horizon && this.nextScore < TARGET_SEC) {
      this.scheduleBar(this.nextScore);
      this.nextScore += bar;
    }
    this.emit(scoreNow, "sketch");
    this.timer = window.setTimeout(this.pump, 90);
  };

  private scheduleBar(scoreTime: number) {
    const design = this.design;
    const ctx = this.ctx;
    const session = this.session;
    if (!design || !ctx || !session) return;
    const beat = 60 / design.bpm;
    const when0 = this.originCtx + (scoreTime - this.originScore);
    const sec =
      design.sections.find((s) => scoreTime >= s.start && scoreTime < s.end) ??
      design.sections[design.sections.length - 1];
    const barIndex = Math.floor(scoreTime / (beat * 4));
    const kicks = sec.density > 0.75 ? [0, 1, 2, 3] : sec.density > 0.4 ? [0, 2] : [0];
    for (const b of kicks) this.kick(when0 + b * beat, 0.5 * Math.max(0.25, sec.density));
    if (sec.treble > 0.3 && this.hatPan) {
      const steps = sec.density > 0.7 ? 8 : 4;
      for (let i = 0; i < steps; i++) {
        this.hat(this.hatPan, when0 + ((i * 4) / steps) * beat, 0.045 * sec.treble);
      }
    }
    if (sec.bass > 0.12 && this.bassLp) {
      const deg = [0, 0, 4, 0][barIndex % 4];
      const f = midiHz(design.keyRoot, design.keyMinor, deg, 2);
      this.tone(this.bassLp, "sine", f, when0, beat * 1.5, 0.16 * sec.bass, false);
      if (sec.bass > 0.5) this.tone(this.bassLp, "sine", f / 2, when0, beat * 1.3, 0.11 * sec.bass, false);
    }
    if (sec.flute > 0.12 && this.flutePan) {
      const steps = sec.flute > 0.72 ? 8 : 4;
      for (let i = 0; i < steps; i++) {
        const deg = MOTIF[(barIndex * 2 + i) % MOTIF.length];
        const f = midiHz(design.keyRoot, design.keyMinor, deg, 5);
        const step = (beat * 4) / steps;
        this.tone(this.flutePan, "sine", f, when0 + i * step, step * 0.86, 0.07 * sec.flute, true);
      }
    }
    if (sec.vocal > 0.15 && this.vocalBp) {
      for (const deg of [0, 2, 4]) {
        const f = midiHz(design.keyRoot, design.keyMinor, deg, 4);
        this.tone(this.vocalBp, "triangle", f, when0, beat * 3.5, 0.03 * sec.vocal, false);
      }
    }
  }

  private tone(
    dest: AudioNode,
    type: OscillatorType,
    freq: number,
    when: number,
    dur: number,
    vel: number,
    vibrato: boolean,
  ) {
    const ctx = this.ctx;
    if (!ctx || vel < 0.004 || dur <= 0) return;
    if (when + dur < ctx.currentTime) return;
    const start = Math.max(when, ctx.currentTime);
    const o = ctx.createOscillator();
    o.type = type;
    const f = Math.max(28, freq);
    o.frequency.setValueAtTime(f, start);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(Math.max(0.001, vel), start + Math.min(0.04, dur * 0.35));
    g.gain.exponentialRampToValueAtTime(0.0001, start + Math.max(0.05, dur));
    if (vibrato) {
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      lfo.frequency.value = 4.5;
      lg.gain.value = Math.min(7, f * 0.006);
      lfo.connect(lg);
      lg.connect(o.frequency);
      lfo.start(start);
      lfo.stop(start + dur + 0.05);
    }
    o.connect(g);
    g.connect(dest);
    o.start(start);
    o.stop(start + dur + 0.03);
  }

  private kick(when: number, vel: number) {
    const ctx = this.ctx;
    const session = this.session;
    if (!ctx || !session) return;
    if (when + 0.2 < ctx.currentTime) return;
    const start = Math.max(when, ctx.currentTime);
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(150, start);
    o.frequency.exponentialRampToValueAtTime(46, start + 0.09);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vel, start);
    g.gain.exponentialRampToValueAtTime(0.001, start + 0.2);
    o.connect(g);
    g.connect(session);
    o.start(start);
    o.stop(start + 0.22);
  }

  private hat(dest: AudioNode, when: number, vel: number) {
    const ctx = this.ctx;
    if (!ctx || !this.noise || vel < 0.004) return;
    if (when + 0.06 < ctx.currentTime) return;
    const start = Math.max(when, ctx.currentTime);
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 6800;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vel, start);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.045);
    src.connect(filter);
    filter.connect(g);
    g.connect(dest);
    src.start(start);
    src.stop(start + 0.06);
  }

  dispose() {
    this.stop();
    void this.ctx?.close();
    this.ctx = null;
  }
}
