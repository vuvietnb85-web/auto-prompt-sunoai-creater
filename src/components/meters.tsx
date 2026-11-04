import { useEffect, useRef } from "react";

function take(values: number[], count: number): number[] {
  if (values.length <= count) return values;
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.round((i * (values.length - 1)) / (count - 1));
    out.push(values[idx] ?? 0);
  }
  return out;
}

export function SpectrumCanvas({
  bins,
  active,
  getAnalyser,
}: {
  bins: number[];
  active: boolean;
  getAnalyser: () => AnalyserNode | null;
}) {
  const liveRef = useRef<HTMLDivElement>(null);
  const shown = take(bins, 36);

  useEffect(() => {
    if (!active) return;
    const host = liveRef.current;
    if (!host) return;
    const bars = Array.from(host.children) as HTMLDivElement[];
    const live = new Uint8Array(512);
    let raf = 0;
    const draw = () => {
      const an = getAnalyser();
      if (an) {
        an.getByteFrequencyData(live);
        bars.forEach((bar, i) => {
          const t = i / Math.max(1, bars.length - 1);
          const idx = Math.min(live.length - 1, Math.floor(t * t * (live.length - 1)));
          const v = (live[idx] ?? 0) / 255;
          bar.style.height = `${Math.max(6, v * 100)}%`;
        });
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active, getAnalyser]);

  return (
    <div className="relative h-28 overflow-hidden rounded-md bg-navy-950" aria-label="Phổ tần">
      <div className="flex h-full items-end gap-px px-1">
        {shown.map((v, i) => (
          <div
            key={i}
            className="min-w-0 flex-1 rounded-sm bg-line"
            style={{ height: `${Math.max(6, Math.round(v * 100))}%` }}
          />
        ))}
      </div>
      {active ? (
        <div ref={liveRef} className="absolute inset-0 flex items-end gap-px px-1">
          {shown.map((_, i) => (
            <div key={i} className="min-w-0 flex-1 rounded-sm bg-gold-500" style={{ height: "6%" }} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function RibbonCanvas({
  points,
}: {
  points: { bass: number; vocal: number; air: number }[];
}) {
  const shown = take(
    points.map((p) => p.bass),
    42,
  ).map((_, i, arr) => {
    const idx = Math.round((i * (points.length - 1)) / Math.max(1, arr.length - 1));
    return points[idx] ?? { bass: 0, vocal: 0, air: 0 };
  });

  return (
    <div className="flex h-16 items-end gap-px overflow-hidden rounded-md bg-navy-950 px-1" aria-label="Dải năng lượng theo thời gian">
      {shown.map((p, i) => (
        <div key={i} className="flex h-full min-w-0 flex-1 flex-col justify-end">
          <div className="bg-muted" style={{ height: `${Math.round(Math.max(0, p.air) * 34)}%` }} />
          <div className="bg-ink" style={{ height: `${Math.round(Math.max(0, p.vocal) * 34)}%` }} />
          <div className="bg-gold-500" style={{ height: `${Math.round(Math.max(0, p.bass) * 34)}%` }} />
        </div>
      ))}
    </div>
  );
}
