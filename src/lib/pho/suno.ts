import type { CorpusHit, VenueId } from "@/lib/pho/types";

export const SUNO_LEN = 995;

const VENUE_MIX: Record<VenueId, string> = {
  club: "Nightclub atmosphere, no muddy low-end, centered stereo image, subtle lead panning only, punchy controlled bass, crisp highs.",
  stadium: "Stadium atmosphere, no muddy low-end, punch not boom, vocal and snare to the back row, crisp presence.",
  meeting: "Meeting-room atmosphere, words first, almost dry, bass only as warmth, little reverb, no harsh horn.",
  theater: "Theater atmosphere, wide dynamics, medium hall, the lead tells the story, no muddy low-end.",
  hall: "Concert-hall atmosphere, balanced, smooth decay, warm mids, no harsh horn, no excessive sub-bass.",
};

export type PromptInput = {
  venue: VenueId;
  bpm: number;
  detectedBpm: number;
  keyName: string;
  qualities: string;
  arrange: string;
  colorLead: string;
  instrumental: boolean;
  drive: boolean;
  hits: Pick<CorpusHit, "role" | "lead" | "en">[];
};

function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const zone = clean.slice(0, max);
  const dot = zone.lastIndexOf(".");
  if (dot >= 36) return zone.slice(0, dot + 1);
  let cut = zone;
  const sp = cut.lastIndexOf(" ");
  if (sp >= 24) cut = cut.slice(0, sp);
  cut = cut.replace(/[\s,;:]+$/g, "").replace(/\b(and|with|the|a|to|of|or)$/i, "").trim();
  if (!cut.endsWith(".")) cut += ".";
  return cut;
}

function leadName(raw: string): string {
  const name = raw.replace(/[^\w\s'-]/g, "").trim().slice(0, 18);
  if (!name) return "Lead";
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function clause(en: string, max: number): string {
  return clip(en.replace(/\.$/, ""), max);
}

function byRole(hits: PromptInput["hits"], role: string) {
  return hits.find((hit) => hit.role === role);
}

function timeline(lead: string, drive: boolean, instrumental: boolean): string {
  const solo = instrumental ? `${lead} solo` : `${lead} solo, humming only`;
  if (drive) {
    return (
      `Arrangement Timeline: 0:00 Full ensemble, ${lead} in, no slow intro. ` +
      "0:16 Dry verse, pulse stays. 0:48 Pre-chorus, brighter. 1:04 Chorus, hook twice. " +
      "1:40 Verse two, no energy drop. 2:08 Brighter pre-chorus. 2:24 Bigger chorus. " +
      `3:04 ${solo}. 3:36 Final chorus. 4:08 Dry outro, still in time. ` +
      "4:20 Absolute ending, no extended tail."
    );
  }
  const intro = instrumental ? `0:00 Intro, ${lead} alone.` : `0:00 Intro, ${lead}, instrumental.`;
  return (
    `Arrangement Timeline: ${intro} 0:16 Dry verse. 0:48 Pre-chorus. ` +
    "1:04 Chorus, hook twice. 1:40 Verse two. 2:08 Brighter pre-chorus. " +
    `2:24 Bigger chorus. 3:04 ${solo}. 3:36 Final chorus. 4:08 Dry outro. ` +
    "4:20 Absolute ending, no extended tail."
  );
}

function rhythm(input: PromptInput): string {
  const bed = byRole(input.hits, "Nền");
  const pulse = byRole(input.hits, "Nhịp");
  const low = bed ? clause(bed.en, 64) : "Deep short bass notes with clean stops";
  const drums = pulse ? `${leadName(pulse.lead)} keeps time` : "Tight drums";
  const open = input.drive ? "no fade-in" : "enters with the intro";
  return `Rhythm & Bass: Mono analog bass, short dry kick, ${drums}, no cymbal wash, ${open}. ${low}.`;
}

function melody(input: PromptInput, lead: string): string {
  const color = byRole(input.hits, "Màu");
  const line = color ? clause(color.en, 78) : `${lead}, interlocking melody`;
  const bow = input.qualities.includes("smooth")
    ? "Legato strings, soft attacks, long breaths."
    : "Notes speak at once. Attacks stay clear.";
  return `Melodic Identity: ${line}. ${bow}`;
}

function brass(input: PromptInput): string {
  if (input.drive) {
    return "Brass Arrangement: Cornets and tubas from the first bar, hymn color already a marching-band sound.";
  }
  if (input.venue === "meeting") {
    return "Brass Arrangement: Muted cornets, short and dry, never a parade. Words stay in front.";
  }
  if (input.venue === "theater" || input.venue === "hall") {
    return "Brass Arrangement: Warm horns, hymn color, no harsh blast, bloom only in the chorus.";
  }
  return "Brass Arrangement: Cornets and tubas, evolving from a solemn hymn into a powerful outdoor marching-band sound.";
}

function vocal(input: PromptInput): string {
  if (input.instrumental) {
    return "Vocal: Instrumental only. No singer, no rap, no choir lyric. The lead instrument carries the hook.";
  }
  return "Vocal: Vietnamese sung vocal, never rapped, prominent and clear in front. Instruments answer between phrases.";
}

function mix(input: PromptInput): string {
  const hint = input.arrange ? ` ${clip(input.arrange, 56)}` : "";
  return `Mix: ${VENUE_MIX[input.venue]}${hint} No muddy low-end or excessive sub-bass.`;
}

export function fit995(raw: string, drive = false): string {
  let s = raw.replace(/\s+/g, " ").trim();
  if (s.length > SUNO_LEN) {
    let cut = s.slice(0, SUNO_LEN);
    const sp = cut.lastIndexOf(" ");
    if (sp >= SUNO_LEN - 48) cut = cut.slice(0, sp);
    s = cut.replace(/[\s,;:]+$/g, "");
    if (!s.endsWith(".")) s = s.length >= SUNO_LEN ? `${s.slice(0, SUNO_LEN - 1)}.` : `${s}.`;
  }
  const bits = drive
    ? [
        " No fade-in.",
        " No long intro.",
        " Kick stays dry.",
        " No cymbal wash.",
        " End on the tonic.",
        " Human timing, not a locked machine.",
        " True peak under -1 dBTP.",
      ]
    : [
        " No vocal chop.",
        " No chipmunk.",
        " No riser.",
        " No trailer impact.",
        " Tune the low end to the key.",
        " Last two seconds nearly dry.",
        " True peak under -1 dBTP.",
        " Human timing, not a locked machine.",
        " End on the tonic.",
      ];
  for (const bit of bits) {
    const key = bit.trim().replace(/\.$/, "").toLowerCase();
    if (s.toLowerCase().includes(key)) continue;
    if (s.length + bit.length <= SUNO_LEN) s += bit;
  }
  const tails = drive ? [" Still driving.", " Human.", " End."] : [" Clean cadence.", " Human.", " End."];
  while (s.length < SUNO_LEN) {
    const gap = SUNO_LEN - s.length;
    const pick = tails.find((item) => item.length <= gap);
    if (!pick) break;
    s += pick;
  }
  if (s.length < SUNO_LEN && s.endsWith(".")) {
    const gap = SUNO_LEN - s.length;
    s = `${s.slice(0, -1)}${" ".repeat(gap)}.`;
  }
  if (s.length > SUNO_LEN) s = `${s.slice(0, SUNO_LEN - 1)}.`;
  if (!s.endsWith(".")) s = `${s.slice(0, SUNO_LEN - 1)}.`;
  return s.slice(0, SUNO_LEN);
}

export function buildPrompt(input: PromptInput): string {
  const lead = leadName(input.colorLead);
  const header = `Suno v6. Exactly 4:20, ${input.bpm} BPM, ${input.keyName}. Source reference: ${input.detectedBpm} BPM.`;
  const clock = timeline(lead, input.drive, input.instrumental);
  const blocks = [rhythm(input), melody(input, lead), brass(input), vocal(input), mix(input)];
  let guard = 0;
  while ([header, ...blocks, clock].join(" ").length > SUNO_LEN && guard < 48) {
    guard += 1;
    let idx = 0;
    for (let i = 1; i < blocks.length; i++) if (blocks[i].length > blocks[idx].length) idx = i;
    if (blocks[idx].length <= 72) break;
    blocks[idx] = clip(blocks[idx], blocks[idx].length - 18);
  }
  let body = [header, ...blocks, clock].join(" ");
  if (body.length > SUNO_LEN) {
    const spare = SUNO_LEN - `${header} ${clock}`.length - 1;
    let rest = blocks.join(" ");
    rest = clip(rest, Math.max(80, spare));
    body = `${header} ${rest} ${clock}`;
    if (body.length > SUNO_LEN) body = `${header} ${clock}`;
  }
  return fit995(body, input.drive);
}
