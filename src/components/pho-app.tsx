import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Copy, Download, Pause, Play, Square, Upload } from "lucide-react";
import { RibbonCanvas, SpectrumCanvas } from "@/components/meters";
import { BonusCube } from "@/components/bonus-cube";
import { MomoMark } from "@/components/momo-mark";
import { CuDock, type CuHandle } from "@/components/cu-dock";
import { DEMO_ANALYSIS, analyzeFile, stashFile } from "@/lib/pho/analyze";
import { CORPUS_COUNT } from "@/lib/pho/corpus";
import { VENUES, buildDesign, qualityLabel, suggestVenue } from "@/lib/pho/design";
import { MasterEngine, type PlayMode } from "@/lib/pho/engine";
import { SUNO_LEN } from "@/lib/pho/suno";
import type { Analysis, Qualities, VenueId } from "@/lib/pho/types";

function clock(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

function signed(n: number): string {
  return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}

const PAYPAL_SRC =
  "https://www.paypal.com/sdk/js?client-id=BAAIfuQli_a3Qud-8CIRqCRCeohqtiW29_i2Txx2rQM35pqMc-pbCIZX6L8tx1zbyOj_vp8AUE_dpSqOhc&components=hosted-buttons&disable-funding=venmo&currency=USD";

const MOMO_WALLET = "+84988960419";

type Pane = "do" | "ban" | "prompt" | "ho";

const PANES: { id: Pane; label: string }[] = [
  { id: "do", label: "ĐO" },
  { id: "ban", label: "BẢN" },
  { id: "prompt", label: "PROMPT" },
  { id: "ho", label: "VÍ" },
];

export function PhoApp() {
  const engineRef = useRef<MasterEngine | null>(null);
  const cuRef = useRef<CuHandle | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [venue, setVenue] = useState<VenueId>("club");
  const [qualities, setQualities] = useState<Qualities>({ sub: true, bright: true, smooth: false, drive: true });
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [mode, setMode] = useState<PlayMode>("idle");
  const [playhead, setPlayhead] = useState(0);
  const [level, setLevel] = useState(1);
  const [copied, setCopied] = useState(false);
  const [paypalOn, setPaypalOn] = useState(false);
  const [paypalMsg, setPaypalMsg] = useState("");
  const [momoMsg, setMomoMsg] = useState("");
  const [pane, setPane] = useState<Pane>("do");
  const walletRef = useRef<HTMLDivElement>(null);
  const [bonusPop, setBonusPop] = useState(false);
  const [walletFlash, setWalletFlash] = useState(false);

  const source = analysis ?? DEMO_ANALYSIS;
  const design = useMemo(() => buildDesign(source, venue, qualities), [source, venue, qualities]);
  const active = mode !== "idle";
  const getAnalyser = useCallback(() => engineRef.current?.analyser ?? null, []);
  const head = playhead;

  useEffect(() => {
    const engine = new MasterEngine();
    engineRef.current = engine;
    engine.onTime = (sec, next) => {
      setPlayhead(sec);
      setMode(next);
    };
    try {
      const raw = localStorage.getItem("pho-vang");
      if (raw) {
        const saved = JSON.parse(raw) as { venue?: VenueId; qualities?: Qualities };
        if (saved.venue) setVenue(saved.venue);
        if (saved.qualities) {
          setQualities({
            sub: saved.qualities.sub ?? true,
            bright: saved.qualities.bright ?? true,
            smooth: saved.qualities.smooth ?? false,
            drive: saved.qualities.drive ?? true,
          });
        }
      }
    } catch {
      /* ignore broken local storage */
    }
    return () => engine.dispose();
  }, []);

  useEffect(() => {
    localStorage.setItem("pho-vang", JSON.stringify({ venue, qualities }));
  }, [venue, qualities]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.setDesign(design);
    engine.setLevel(level);
  }, [design, level]);

  useEffect(() => {
    if (!paypalOn) return;
    let dead = false;
    const sel = "#paypal-container-T7AZ748Y27248";
    const render = () => {
      if (dead) return;
      const paypal = (
        window as unknown as {
          paypal?: {
            HostedButtons: (o: { hostedButtonId: string }) => { render: (s: string) => Promise<void> };
          };
        }
      ).paypal;
      const host = document.querySelector(sel);
      if (!paypal || !host || host.childElementCount > 0) return;
      paypal
        .HostedButtons({ hostedButtonId: "T7AZ748Y27248" })
        .render(sel)
        .catch(() => {
          if (!dead) setPaypalMsg("PayPal chưa hiện. Kiểm tra mạng rồi chạm lại.");
        });
    };
    const existing = document.getElementById("paypal-sdk-pho") as HTMLScriptElement | null;
    if (existing) {
      if (window.setTimeout) window.setTimeout(render, 30);
      return () => {
        dead = true;
      };
    }
    const script = document.createElement("script");
    script.id = "paypal-sdk-pho";
    script.src = PAYPAL_SRC;
    script.async = true;
    script.onload = () => render();
    script.onerror = () => {
      if (!dead) setPaypalMsg("Không tải được PayPal.");
    };
    document.body.appendChild(script);
    return () => {
      dead = true;
    };
  }, [paypalOn]);

  async function takeFile(file: File) {
    setError("");
    setBusy(true);
    setProgress(0.01);
    engineRef.current?.stop();
    cuRef.current?.stopAudio();
    try {
      void stashFile(file);
      const result = await analyzeFile(file, setProgress);
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      const url = URL.createObjectURL(file);
      urlRef.current = url;
      engineRef.current?.attach(url);
      setAnalysis(result);
      setVenue(suggestVenue(result));
      setPlayhead(0);
      setMode("idle");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        msg && !/decode|encoding|unable/i.test(msg)
          ? msg
          : "Không đọc được file này. Dùng MP3, WAV, FLAC, M4A hoặc OGG.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function onPlayFile() {
    setError("");
    if (!analysis) {
      setError("Hãy tải một file nhạc trước khi nghe bản gốc.");
      return;
    }
    cuRef.current?.stopAudio();
    try {
      if (mode === "file") {
        engineRef.current?.pauseFile();
        return;
      }
      await engineRef.current?.playFile();
      setMode("file");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không phát được file.");
    }
  }

  async function onSketch(from = 0) {
    setError("");
    cuRef.current?.stopAudio();
    try {
      await engineRef.current?.playSketch(from);
      setMode("sketch");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không phát được phác thảo.");
    }
  }

  function onStop() {
    engineRef.current?.stop();
    setMode("idle");
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(design.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setError("Máy chặn bộ nhớ tạm. Hãy tải bản thiết kế.");
    }
  }

  function onDownload() {
    const body = [
      "PHỔ VÀNG · bản thiết kế 4:20",
      design.notes.join("\n"),
      "",
      `Prompt Suno v6 (${design.prompt.length} ký tự)`,
      design.prompt,
      "",
    ].join("\n");
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pho-vang-4-20.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function onMomo() {
    void navigator.clipboard.writeText(MOMO_WALLET).then(
      () => setMomoMsg("Đã chép ví MoMo. Mở ứng dụng và dán."),
      () => setMomoMsg("Máy chặn bộ nhớ tạm. Mở MoMo trên máy này."),
    );
  }

  function onBonus() {
    setPane("ho");
    setPaypalMsg("");
    setPaypalOn(true);
    onMomo();
    setBonusPop(true);
    setWalletFlash(true);
    window.setTimeout(() => setBonusPop(false), 650);
    window.setTimeout(() => setWalletFlash(false), 800);
    window.requestAnimationFrame(() => {
      walletRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  }

  return (
    <div className="safe-app flex flex-col gap-1 bg-navy-950">
      <section className="zone-new frame-gold relative flex min-h-0 min-w-0 flex-col bg-navy-950">
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
          <header className="mb-2 flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-sm tracking-widest text-gold-500">
                {mode === "file" ? "FILE" : mode === "sketch" ? "PHÁC 4:20" : "SẴN SÀNG"}
              </p>
              <h1 className="font-display text-3xl leading-none tracking-wide text-ink">PHỔ VÀNG</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950"
              >
                <Upload className="size-4" aria-hidden="true" />
                TẢI
              </button>
              <p className="font-display text-2xl tabular-nums text-gold-300">{clock(mode === "idle" ? 0 : head)}</p>
            </div>
          </header>
          <input
            ref={fileRef}
            type="file"
            accept="audio/*,.mp3,.wav,.flac,.m4a,.aac,.ogg,.opus,.webm"
            className="hidden"
            suppressHydrationWarning
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void takeFile(file);
              e.target.value = "";
            }}
          />

          <div className="mb-2 grid grid-cols-4 gap-1 rounded-full border border-line bg-navy-900 p-1" role="tablist">
            {PANES.map((item) => {
              const on = pane === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setPane(item.id)}
                  className={
                    on
                      ? "h-10 rounded-full bg-gold-500 font-display text-sm tracking-wide text-navy-950"
                      : "h-10 rounded-full font-display text-sm tracking-wide text-ink"
                  }
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="min-w-0 text-sm text-muted">
              Kho {CORPUS_COUNT} mẫu · đỉnh ×{design.lift.toFixed(1)} · {design.instrumental ? "khí nhạc" : "có lời"}
              {design.hits[0] ? ` · ${design.hits[0].vi}` : ""}
            </p>
            <BonusCube pop={bonusPop} onOpen={onBonus} />
          </div>
          {error ? <p className="mb-3 text-sm text-gold-300">{error}</p> : null}

          {pane === "do" ? (
            <>
              <div
                className="mb-3 rounded-lg border border-dashed border-gold-500 bg-navy-900 px-3 py-3"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) void takeFile(file);
                }}
              >
                <p className="text-sm text-muted">Thả MP3, WAV, FLAC, M4A hoặc OGG. Đo trên máy, không gửi file đi.</p>
                {analysis ? (
                  <p className="mt-2 text-sm text-ink">
                    {analysis.fileName} · {clock(analysis.duration)} · {analysis.channels === 1 ? "mono" : "stereo"} ·{" "}
                    {Math.round(analysis.sampleRate / 1000)} kHz
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-gold-100">Chưa có file. Prompt đang theo phổ mẫu.</p>
                )}
                {busy ? (
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-navy-800" aria-hidden="true">
                    <div className="h-1 bg-gold-500" style={{ width: `${Math.round(progress * 100)}%` }} />
                  </div>
                ) : null}
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["BPM gốc", String(source.bpm)],
                  ["BPM bản", String(design.bpm)],
                  ["Tông", source.keyName],
                  ["LUFS", source.lufs.toFixed(1)],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-md border border-line bg-navy-900 px-2 py-2">
                    <p className="text-xs tracking-wide text-muted uppercase">{k}</p>
                    <p className="font-display text-xl tabular-nums text-ink">{v}</p>
                  </div>
                ))}
              </div>
              <div className="mb-1">
                <SpectrumCanvas bins={source.spectrum} active={active} getAnalyser={getAnalyser} />
              </div>
              <p className="mb-2 text-xs text-muted">Vàng = đang nghe. Xanh đậm = phổ đã đo.</p>
              <RibbonCanvas points={source.ribbon} />
              <div className="mt-3 mb-3 flex flex-wrap gap-1">
                {source.bands.map((b) => (
                  <span key={b.id} className="rounded-full border border-line px-2 py-1 text-xs text-ink">
                    {b.label} {b.db.toFixed(0)}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setPane("prompt")}
                className="mb-4 h-11 rounded-full border border-gold-500 px-4 font-display tracking-wide text-gold-500"
              >
                XEM PROMPT
              </button>
            </>
          ) : null}

          {pane === "ban" ? (
            <>
              <h2 className="mb-2 font-display tracking-wide text-gold-500">PHÒNG</h2>
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {VENUES.map((v) => {
                  const on = v.id === venue;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVenue(v.id)}
                      className={
                        on
                          ? "h-11 shrink-0 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950"
                          : "h-11 shrink-0 rounded-full border border-line px-4 font-display tracking-wide text-ink"
                      }
                    >
                      {v.label}
                    </button>
                  );
                })}
              </div>
              <h2 className="mb-2 font-display tracking-wide text-gold-500">CHẤT ÂM</h2>
              <div className="mb-3 flex flex-wrap gap-2">
                {(
                  [
                    ["sub", "SIÊU TRẦM"],
                    ["bright", "SIÊU SÁNG"],
                    ["smooth", "SIÊU MƯỢT"],
                    ["drive", "SÔI ĐỘNG"],
                  ] as const
                ).map(([key, label]) => {
                  const on = qualities[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setQualities((q) => ({ ...q, [key]: !q[key] }))}
                      className={
                        on
                          ? "h-11 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950"
                          : "h-11 rounded-full border border-line px-4 font-display tracking-wide text-ink"
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="mb-3 text-sm text-muted">{qualityLabel(qualities)}</p>
              <div className="mb-3 grid grid-cols-2 gap-2">
                {[
                  ["Bass JBL", signed(design.chain.bassShelfDb), `${Math.round(design.chain.bassHz)} Hz`],
                  ["Treble TOA", signed(design.chain.trebleDb), "5–8 kHz"],
                  ["Lời Bose", signed(design.chain.vocalDb), `${Math.round(design.chain.vocalHz)} Hz`],
                  ["Màu TOA", signed(design.chain.fluteDb), `${Math.round(design.chain.fluteHz)} Hz`],
                ].map(([name, db, hz]) => (
                  <article key={name} className="rounded-md border border-line bg-navy-900 px-3 py-2">
                    <h3 className="font-display tracking-wide text-gold-300">{name}</h3>
                    <p className="font-display text-2xl tabular-nums text-ink">{db}</p>
                    <p className="text-xs text-muted">{hz}</p>
                  </article>
                ))}
              </div>
              <h2 className="mb-2 font-display tracking-wide text-gold-500">BẢN 4:20</h2>
              <div className="relative mb-2 flex h-16 overflow-x-auto rounded-md border border-line">
                {design.sections.map((s) => {
                  const here = head >= s.start && head < s.end && mode === "sketch";
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => void onSketch(s.start)}
                      className={
                        here
                          ? "flex min-w-16 flex-col justify-end bg-gold-500 px-1 pb-1 text-left text-navy-950"
                          : "flex min-w-16 flex-col justify-end border-r border-line bg-navy-900 px-1 pb-1 text-left text-ink"
                      }
                      style={{ flexGrow: s.end - s.start }}
                    >
                      <span className="truncate text-xs">{s.name}</span>
                      <span className="text-xs tabular-nums">{clock(s.start)}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mb-3 text-sm text-muted">Chạm một đoạn để nghe phác thảo từ đó.</p>
              <ul className="mb-4 space-y-1 text-sm text-ink">
                {design.notes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}

          {pane === "prompt" ? (
            <>
              <ul className="mb-3 space-y-1">
                {design.hits.map((hit) => (
                  <li
                    key={hit.id}
                    className="flex items-baseline justify-between gap-2 rounded-md border border-line bg-navy-900 px-3 py-2"
                  >
                    <span className="text-sm text-ink">
                      <span className="font-display tracking-wide text-gold-300">{hit.role}</span> {hit.vi}
                      <span className="text-muted"> · {hit.region}</span>
                    </span>
                    <span className="font-display tabular-nums text-gold-300">{Math.round(hit.p * 100)}%</span>
                  </li>
                ))}
              </ul>
              <p className="mb-3 text-sm text-muted">
                {design.instrumental
                  ? "Phổ này viết khí nhạc, không đặt ca sĩ."
                  : "Phổ còn dải lời: giọng Việt hát, khí nhạc đệm."}{" "}
                Khung chuẩn: nhịp, màu giai điệu, kèn, lời, mix, mốc 4:20.
                {qualities.drive ? " Khóa 145 BPM, sôi động ngay từ đầu." : ""}
              </p>
              <div className="mb-2 flex items-center justify-between gap-2">
                <h2 className="font-display tracking-wide text-gold-500">PROMPT SUNO V6</h2>
                <p className="font-display tabular-nums text-gold-300">
                  {design.prompt.length}/{SUNO_LEN}
                </p>
              </div>
              <textarea
                readOnly
                tabIndex={-1}
                spellCheck={false}
                rows={8}
                value={design.prompt}
                translate="no"
                className="notranslate mb-2 w-full rounded-md border border-line bg-navy-900 p-3 text-sm leading-relaxed text-ink"
                aria-label="Prompt Suno 995 ký tự"
              />
              <div className="mb-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void onCopy()}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950"
                >
                  <Copy className="size-4" aria-hidden="true" />
                  {copied ? "ĐÃ CHÉP" : "CHÉP PROMPT"}
                </button>
                <button
                  type="button"
                  onClick={onDownload}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-gold-500 px-4 font-display tracking-wide text-gold-500"
                >
                  <Download className="size-4" aria-hidden="true" />
                  TẢI BẢN
                </button>
              </div>
            </>
          ) : null}

          {pane === "ho" ? (
            <div ref={walletRef} className={walletFlash ? "wallet-live mb-6" : "mb-6"}>
              <p className="mb-2 font-display tracking-wide text-gold-500">PAYPAL · MOMO</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={onMomo}
                  aria-label="Ủng hộ bằng MoMo"
                  className="flex flex-col items-center justify-center gap-2 rounded-md border border-line bg-navy-900 px-3 py-4"
                >
                  <MomoMark className="size-16" />
                  <span className="font-display tracking-widest text-gold-300">MOMO</span>
                  <span className="text-sm text-muted">Chạm biểu tượng để chép ví</span>
                </button>
                <article className="rounded-md border border-line bg-navy-900 p-3">
                  <h3 className="mb-2 font-display tracking-wide text-gold-300">PAYPAL</h3>
                  {!paypalOn ? (
                    <button
                      type="button"
                      onClick={() => {
                        setPaypalMsg("");
                        setPaypalOn(true);
                      }}
                      className="h-11 rounded-full border border-gold-500 px-4 font-display tracking-wide text-gold-500"
                    >
                      MỞ PAYPAL
                    </button>
                  ) : (
                    <div id="paypal-container-T7AZ748Y27248" className="min-h-11 overflow-hidden" />
                  )}
                  {paypalMsg ? <p className="mt-2 text-sm text-gold-100">{paypalMsg}</p> : null}
                </article>
              </div>
              {momoMsg ? <p className="mt-2 text-sm text-gold-100">{momoMsg}</p> : null}
            </div>
          ) : null}
        </div>

        <div className="border-t border-gold-500 bg-navy-900 px-3 py-2">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-display tracking-widest text-gold-500">NGAME</p>
            <p className="text-xs text-muted">LOA3 ×{(design.chain.loa3 * level).toFixed(2)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void onPlayFile()}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950"
            >
              {mode === "file" ? <Pause className="size-4" /> : <Play className="size-4" />}
              {mode === "file" ? "DỪNG FILE" : "NGHE FILE"}
            </button>
            <button
              type="button"
              onClick={() => void onSketch(0)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-gold-500 px-4 font-display tracking-wide text-gold-500"
            >
              <Play className="size-4" aria-hidden="true" />
              PHÁC 4:20
            </button>
            <button
              type="button"
              onClick={onStop}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 font-display tracking-wide text-ink"
            >
              <Square className="size-4" aria-hidden="true" />
              NGẮT
            </button>
            <label className="flex min-w-32 flex-1 items-center gap-2 text-xs text-muted">
              Mức
              <input
                type="range"
                min={0.4}
                max={1.4}
                step={0.02}
                value={level}
                suppressHydrationWarning
                onChange={(e) => setLevel(Number(e.target.value))}
                aria-label="Mức nghe LOA3"
              />
            </label>
          </div>
        </div>

      </section>
      <CuDock ref={cuRef} onExclusive={() => engineRef.current?.stop()} />
    </div>
  );
}
