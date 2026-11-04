export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

export const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
export const MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10];

const MAJOR_PROFILE = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const MINOR_PROFILE = [6.33, 2.68, 3.52, 5.38, 2.6, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];

export function midiHz(root: number, minor: boolean, degree: number, octave: number): number {
  const scale = minor ? MINOR_SCALE : MAJOR_SCALE;
  let d = degree;
  let oct = octave;
  while (d < 0) {
    d += 7;
    oct -= 1;
  }
  while (d > 6) {
    d -= 7;
    oct += 1;
  }
  const midi = root + scale[d] + (oct + 1) * 12;
  return 440 * 2 ** ((midi - 69) / 12);
}

export function detectKey(chroma: ArrayLike<number>): { root: number; minor: boolean; name: string } {
  let best = -Infinity;
  let root = 9;
  let minor = true;
  for (let shift = 0; shift < 12; shift++) {
    let maj = 0;
    let min = 0;
    for (let i = 0; i < 12; i++) {
      const v = chroma[(i + shift) % 12] ?? 0;
      maj += v * MAJOR_PROFILE[i];
      min += v * MINOR_PROFILE[i];
    }
    if (maj > best) {
      best = maj;
      root = shift;
      minor = false;
    }
    if (min > best) {
      best = min;
      root = shift;
      minor = true;
    }
  }
  const name = `${NOTE_NAMES[root]} ${minor ? "minor" : "major"}`;
  return { root, minor, name };
}
