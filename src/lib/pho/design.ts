import { CORPUS_COUNT } from "@/lib/pho/corpus";
import { arrangementLine, collapseCorpus } from "@/lib/pho/quantum";
import { buildPrompt } from "@/lib/pho/suno";
import type { Analysis, Chain, Design, Qualities, Section, VenueId } from "@/lib/pho/types";

export const VENUES: { id: VenueId; label: string; hint: string }[] = [
  { id: "club", label: "HỘP ĐÊM", hint: "Sub chặt, phòng ngắn, kick bơm" },
  { id: "stadium", label: "SÂN VẬN ĐỘNG", hint: "Đấm, không ù, vang sân" },
  { id: "meeting", label: "PHÒNG HỌP", hint: "Lời trước, gần như khô" },
  { id: "theater", label: "RẠP HÁT", hint: "Động học rộng, màu đứng trước" },
  { id: "hall", label: "HỘI TRƯỜNG", hint: "Ấm, nở tự nhiên, mượt" },
];

const BASE_SECTIONS: Section[] = [
  { name: "Mở", start: 0, end: 16, bass: 0.35, vocal: 0, flute: 0.25, treble: 0.3, density: 0.35 },
  { name: "Khổ 1", start: 16, end: 48, bass: 0.55, vocal: 0.7, flute: 0.2, treble: 0.4, density: 0.55 },
  { name: "Đưa", start: 48, end: 64, bass: 0.65, vocal: 0.75, flute: 0.55, treble: 0.6, density: 0.7 },
  { name: "Điệp", start: 64, end: 100, bass: 0.9, vocal: 1, flute: 0.45, treble: 0.8, density: 0.9 },
  { name: "Khổ 2", start: 100, end: 128, bass: 0.6, vocal: 0.8, flute: 0.3, treble: 0.45, density: 0.6 },
  { name: "Đưa 2", start: 128, end: 144, bass: 0.7, vocal: 0.85, flute: 0.7, treble: 0.75, density: 0.8 },
  { name: "Điệp 2", start: 144, end: 184, bass: 1, vocal: 1, flute: 0.5, treble: 0.9, density: 1 },
  { name: "Màu", start: 184, end: 216, bass: 0.4, vocal: 0.25, flute: 1, treble: 0.7, density: 0.45 },
  { name: "Điệp cuối", start: 216, end: 248, bass: 1, vocal: 1, flute: 0.65, treble: 1, density: 1 },
  { name: "Kết", start: 248, end: 260, bass: 0.3, vocal: 0.4, flute: 0.8, treble: 0.35, density: 0.25 },
];

const BIAS: Record<VenueId, { bass: number; vocal: number; flute: number; treble: number; density: number }> = {
  club: { bass: 1.25, vocal: 0.9, flute: 0.7, treble: 0.85, density: 1.1 },
  stadium: { bass: 1.05, vocal: 1.12, flute: 0.8, treble: 1.2, density: 1 },
  meeting: { bass: 0.45, vocal: 1.15, flute: 0.35, treble: 0.55, density: 0.45 },
  theater: { bass: 0.75, vocal: 1.05, flute: 1.2, treble: 0.9, density: 0.62 },
  hall: { bass: 0.85, vocal: 1, flute: 1, treble: 0.82, density: 0.72 },
};

const BASE_CHAIN: Record<VenueId, Chain> = {
  club: {
    hp: 28, bassShelfDb: 7, bassHz: 70, mudDb: -3.5,
    vocalDb: 2.5, vocalHz: 2800, fluteDb: 1.5, fluteHz: 1800,
    trebleDb: 2, airDb: 1,
    compThreshold: -18, compRatio: 4, compAttack: 0.008, compRelease: 0.12,
    delaySec: 0.04, delayFb: 0.18, delayWet: 0.12, loa3: 1.2, sat: 0.45,
  },
  stadium: {
    hp: 35, bassShelfDb: 4, bassHz: 90, mudDb: -2,
    vocalDb: 4.5, vocalHz: 3200, fluteDb: 2, fluteHz: 2000,
    trebleDb: 5, airDb: 1.5,
    compThreshold: -16, compRatio: 3.2, compAttack: 0.012, compRelease: 0.18,
    delaySec: 0.11, delayFb: 0.28, delayWet: 0.2, loa3: 1.2, sat: 0.2,
  },
  meeting: {
    hp: 90, bassShelfDb: -2, bassHz: 120, mudDb: -3,
    vocalDb: 5, vocalHz: 2500, fluteDb: 0.4, fluteHz: 1800,
    trebleDb: 1, airDb: -1.5,
    compThreshold: -20, compRatio: 2.2, compAttack: 0.02, compRelease: 0.2,
    delaySec: 0.018, delayFb: 0.05, delayWet: 0.04, loa3: 1.2, sat: 0,
  },
  theater: {
    hp: 40, bassShelfDb: 2, bassHz: 80, mudDb: -1.5,
    vocalDb: 3.5, vocalHz: 2400, fluteDb: 4, fluteHz: 1600,
    trebleDb: 2.5, airDb: 2,
    compThreshold: -22, compRatio: 2, compAttack: 0.02, compRelease: 0.25,
    delaySec: 0.07, delayFb: 0.3, delayWet: 0.18, loa3: 1.2, sat: 0.1,
  },
  hall: {
    hp: 32, bassShelfDb: 3, bassHz: 75, mudDb: -2,
    vocalDb: 3, vocalHz: 2200, fluteDb: 3, fluteHz: 1700,
    trebleDb: 1.5, airDb: 1,
    compThreshold: -20, compRatio: 2.4, compAttack: 0.018, compRelease: 0.28,
    delaySec: 0.08, delayFb: 0.32, delayWet: 0.22, loa3: 1.2, sat: 0.08,
  },
};

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

function snapBpm(raw: number, lo: number, hi: number, fallback: number): number {
  let x = Math.round(raw);
  if (!Number.isFinite(x) || x < 40) x = fallback;
  while (x < lo) x *= 2;
  while (x > hi) x = Math.round(x / 2);
  return clamp(x, lo, hi);
}

export function targetBpm(venue: VenueId, detected: number, drive = false): number {
  if (drive) return 145;
  if (venue === "club") return snapBpm(detected, 120, 128, 124);
  if (venue === "stadium") return snapBpm(detected, 96, 128, 110);
  if (venue === "meeting") return snapBpm(detected, 72, 108, 92);
  if (venue === "theater") return snapBpm(detected, 68, 100, 84);
  return snapBpm(detected, 76, 112, 96);
}

function bandDb(a: Analysis, id: string): number {
  return a.bands.find((b) => b.id === id)?.db ?? -12;
}

function shapeSections(venue: VenueId, q: Qualities): Section[] {
  const b = BIAS[venue];
  const rows = BASE_SECTIONS.map((s) => ({
    ...s,
    bass: clamp(s.bass * b.bass * (q.sub ? 1.18 : 1), 0, 1),
    vocal: clamp(s.vocal * b.vocal, 0, 1),
    flute: clamp(s.flute * b.flute * (q.smooth ? 1.08 : 1), 0, 1),
    treble: clamp(s.treble * b.treble * (q.bright ? 1.2 : 1) * (q.smooth ? 0.86 : 1), 0, 1),
    density: clamp(s.density * b.density * (q.smooth ? 0.92 : 1), 0, 1),
  }));
  if (q.drive && rows[0]) {
    rows[0] = {
      ...rows[0],
      bass: Math.max(rows[0].bass, 0.88),
      treble: Math.max(rows[0].treble, 0.8),
      flute: Math.max(rows[0].flute, 0.72),
      density: Math.max(rows[0].density, 0.92),
      vocal: 0,
    };
  }
  return rows;
}

function shapeChain(a: Analysis, venue: VenueId, q: Qualities): Chain {
  const c: Chain = { ...BASE_CHAIN[venue] };
  if (q.sub) {
    c.bassShelfDb += 3.5;
    c.sat = clamp(c.sat + 0.25, 0, 1);
  }
  if (q.bright) {
    c.trebleDb += 3;
    c.airDb += 1.5;
    c.vocalDb += 0.4;
  }
  if (q.smooth) {
    c.trebleDb -= 1.5;
    c.airDb -= 1;
    c.compRatio = Math.max(1.5, c.compRatio - 0.8);
    c.compAttack += 0.01;
    c.sat *= 0.4;
    c.fluteDb += 0.6;
  }
  const sub = bandDb(a, "sub");
  const air = bandDb(a, "air");
  const mud = bandDb(a, "mud");
  if (sub > -6) c.bassShelfDb -= 2;
  if (sub < -16) c.bassShelfDb += 2;
  if (air > -8) c.trebleDb -= 1.5;
  if (air < -18) c.trebleDb += 1.5;
  if (mud > -4) c.mudDb -= 1.5;
  c.bassShelfDb = clamp(c.bassShelfDb, -6, 12);
  c.trebleDb = clamp(c.trebleDb, -4, 9);
  c.airDb = clamp(c.airDb, -4, 6);
  c.vocalDb = clamp(c.vocalDb, 0, 7);
  c.fluteDb = clamp(c.fluteDb, 0, 7);
  c.mudDb = clamp(c.mudDb, -8, 0);
  return c;
}

export function suggestVenue(a: Analysis): VenueId {
  const sub = bandDb(a, "sub");
  const vocal = bandDb(a, "vocal");
  if (a.bpm >= 118 && sub > vocal) return "club";
  if (vocal > sub + 6 && a.bpm <= 112) return "meeting";
  if (a.crestDb > 14 && a.centroidHz < 1800) return "theater";
  if (a.stereo > 0.45 && a.bpm < 108) return "hall";
  if (a.bpm >= 100) return "stadium";
  return "hall";
}

function signed(n: number): string {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}

export function qualityLine(q: Qualities): string {
  return [
    q.sub ? "super sub" : "controlled bass",
    q.bright ? "super bright" : "civil treble",
    q.smooth ? "super smooth" : "direct attack",
    q.drive ? "energetic from the first beat" : "dynamic intro",
  ].join(", ");
}

export function qualityLabel(q: Qualities): string {
  const parts = [
    q.sub ? "Siêu trầm" : "Trầm vừa",
    q.bright ? "Siêu sáng" : "Sáng vừa",
    q.smooth ? "Siêu mượt" : "Tức thì",
    q.drive ? "Sôi động ngay từ đầu" : "Mở có thở",
  ];
  return parts.join(" · ");
}

export function buildDesign(a: Analysis, venue: VenueId, qualities: Qualities): Design {
  const bpm = targetBpm(venue, a.bpm, qualities.drive);
  const sections = shapeSections(venue, qualities);
  const chain = shapeChain(a, venue, qualities);
  const venueMeta = VENUES.find((v) => v.id === venue)!;
  const collapse = collapseCorpus(a, venue, qualities);
  const arrange = arrangementLine(a, qualities, collapse.instrumental);
  const prompt = buildPrompt({
    venue,
    bpm,
    detectedBpm: a.bpm,
    keyName: a.keyName,
    qualities: qualityLine(qualities),
    arrange,
    colorLead: collapse.colorLead,
    instrumental: collapse.instrumental,
    drive: qualities.drive,
    hits: collapse.hits,
  });
  const picked = collapse.hits.map((h) => `${h.role} ${h.vi} ${Math.round(h.p * 100)}%`).join(" · ");
  const notes = [
    a.fromFile
      ? `Phổ file «${a.fileName}»: ${a.bpm} BPM, tông ${a.keyName}, dài ${Math.round(a.duration)} giây.`
      : "Chưa có file — đang dùng phổ mẫu La thứ, 118 BPM. Tải nhạc để tính lại.",
    `Tâm phổ ${Math.round(a.centroidHz)} Hz, rolloff ${Math.round(a.rolloffHz)} Hz, đỉnh ${a.peakDb.toFixed(1)} dBFS, crest ${a.crestDb.toFixed(1)} dB, ước lượng ${a.lufs.toFixed(1)} LUFS.`,
    `Kho ${CORPUS_COUNT} mẫu khí nhạc. Giao thoa 8 chiều, Grover một vòng, đo Born. Đỉnh gấp ${collapse.lift.toFixed(1)} lần nền.`,
    picked ? `Đã đo: ${picked}.` : "Kho chưa chọn được mẫu.",
    collapse.instrumental
      ? "Phổ nghiêng khí nhạc: prompt không đặt ca sĩ."
      : "Phổ còn dải lời: prompt giữ giọng hát Việt, khí nhạc đệm và đối đáp.",
    qualities.drive
      ? `Bản 4:20 khóa 145 BPM, sôi động ngay từ đầu. Nguồn đo ${a.bpm} BPM. ${venueMeta.label}: ${venueMeta.hint}.`
      : `Bản 4:20 khóa nhịp ${bpm} BPM cho ${venueMeta.label}. ${venueMeta.hint}.`,
    `Bass JBL: kệ thấp ${signed(chain.bassShelfDb)} tại ${Math.round(chain.bassHz)} Hz, cắt bùn ${signed(chain.mudDb)} tại 280 Hz, bão hòa ${Math.round(chain.sat * 100)}%.`,
    `Treble TOA: kệ cao ${signed(chain.trebleDb)}, hơi ${signed(chain.airDb)}. Lời Bose: ${signed(chain.vocalDb)} quanh ${Math.round(chain.vocalHz)} Hz, cắt dưới ${Math.round(chain.hp)} Hz.`,
    qualities.drive
      ? `Màu TOA: ${signed(chain.fluteDb)} quanh ${Math.round(chain.fluteHz)} Hz. Mở đầu đã đầy ngay giây 0, không intro thưa.`
      : `Màu TOA: ${signed(chain.fluteDb)} quanh ${Math.round(chain.fluteHz)} Hz. Dày nhất ở đoạn màu (3:04–3:36).`,
    `Phòng: trễ ${Math.round(chain.delaySec * 1000)} ms, ướt ${Math.round(chain.delayWet * 100)}%. Nén tỷ lệ ${chain.compRatio.toFixed(1)}:1. LOA3 ×${chain.loa3.toFixed(2)} sau nén.`,
    `Chất âm: ${qualityLabel(qualities)}. Stereo gốc ${Math.round(a.stereo * 100)}% rộng.`,
  ];
  return {
    venue,
    qualities,
    bpm,
    detectedBpm: a.bpm,
    keyName: a.keyName,
    keyRoot: a.keyRoot,
    keyMinor: a.keyMinor,
    sections,
    chain,
    notes,
    prompt,
    fromFile: a.fromFile,
    hits: collapse.hits,
    instrumental: collapse.instrumental,
    lift: collapse.lift,
  };
}
