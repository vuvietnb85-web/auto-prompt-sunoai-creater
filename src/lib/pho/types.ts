export const TARGET_SEC = 260;

export type VenueId = "club" | "stadium" | "meeting" | "theater" | "hall";

export type Qualities = {
  sub: boolean;
  bright: boolean;
  smooth: boolean;
  drive: boolean;
};

export type Band = {
  id: string;
  label: string;
  lo: number;
  hi: number;
  db: number;
};

export type RibbonPoint = {
  t: number;
  bass: number;
  vocal: number;
  air: number;
};

export type Analysis = {
  fileName: string;
  duration: number;
  sampleRate: number;
  channels: number;
  bpm: number;
  keyName: string;
  keyRoot: number;
  keyMinor: boolean;
  lufs: number;
  peakDb: number;
  crestDb: number;
  centroidHz: number;
  rolloffHz: number;
  stereo: number;
  bands: Band[];
  spectrum: number[];
  ribbon: RibbonPoint[];
  fromFile: boolean;
};

export type Section = {
  name: string;
  start: number;
  end: number;
  bass: number;
  vocal: number;
  flute: number;
  treble: number;
  density: number;
};

export type Chain = {
  hp: number;
  bassShelfDb: number;
  bassHz: number;
  mudDb: number;
  vocalDb: number;
  vocalHz: number;
  fluteDb: number;
  fluteHz: number;
  trebleDb: number;
  airDb: number;
  compThreshold: number;
  compRatio: number;
  compAttack: number;
  compRelease: number;
  delaySec: number;
  delayFb: number;
  delayWet: number;
  loa3: number;
  sat: number;
};

export type CorpusHit = {
  id: string;
  vi: string;
  region: string;
  role: string;
  lead: string;
  p: number;
  en: string;
};

export type Design = {
  venue: VenueId;
  qualities: Qualities;
  bpm: number;
  detectedBpm: number;
  keyName: string;
  keyRoot: number;
  keyMinor: boolean;
  sections: Section[];
  chain: Chain;
  notes: string[];
  prompt: string;
  fromFile: boolean;
  hits: CorpusHit[];
  instrumental: boolean;
  lift: number;
};
