import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CloudSun, Coins, MapPin, Mic, Moon, Radio } from "lucide-react";
import { countdowns, formatLunar, formatSolar } from "@/lib/pho/lunar";

export type CuHandle = { stopAudio: () => void };

const MORSE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....",
  I: "..", J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.",
  Q: "--.-", R: ".-.", S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..", " ": " ",
};

function sky(code: number): string {
  if (code === 0) return "quang";
  if (code <= 2) return "ít mây";
  if (code <= 48) return "mây";
  if (code <= 67) return "mưa";
  if (code <= 77) return "tuyết";
  return "mưa rào";
}

function playMorse(text: string) {
  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0.18;
  master.connect(ctx.destination);
  let t = ctx.currentTime + 0.05;
  const unit = 0.08;
  for (const ch of text) {
    const pat = MORSE[ch] ?? "";
    if (ch === " ") {
      t += unit * 4;
      continue;
    }
    for (const s of pat) {
      const dur = s === "-" ? unit * 3 : unit;
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = 680;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.9, t);
      g.gain.setValueAtTime(0, t + dur);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + dur + 0.02);
      t += dur + unit;
    }
    t += unit * 2;
  }
  window.setTimeout(() => void ctx.close(), (t - ctx.currentTime) * 1000 + 400);
}

type Station = { name: string; url: string };

export const CuDock = forwardRef<CuHandle, { onExclusive: () => void }>(function CuDock({ onExclusive }, ref) {
  const radioRef = useRef<HTMLAudioElement | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [now, setNow] = useState<Date | null>(null);
  const [temp, setTemp] = useState("Thanh Hóa · đang lấy trời");
  const [fx, setFx] = useState("USD · …");
  const [place, setPlace] = useState("Thanh Hóa");
  const [coords, setCoords] = useState({ lat: 19.807, lon: 105.776 });
  const [detail, setDetail] = useState("CU 2/13 · trời, giá, đài, lịch, thu, Morse");
  const [stations, setStations] = useState<Station[]>([]);
  const [stationIdx, setStationIdx] = useState(0);
  const [recOn, setRecOn] = useState(false);
  const [clipUrl, setClipUrl] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    stopAudio() {
      radioRef.current?.pause();
    },
  }));

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    const run = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`;
        const res = await fetch(url, { signal: ac.signal });
        if (!res.ok) throw new Error("weather");
        const data = (await res.json()) as {
          current?: { temperature_2m?: number; weather_code?: number; wind_speed_10m?: number };
        };
        const c = data.current;
        if (!c) throw new Error("empty");
        setTemp(
          `${place} ${Math.round(c.temperature_2m ?? 0)}°C ${sky(c.weather_code ?? 0)} gió ${Math.round(c.wind_speed_10m ?? 0)} km/h`,
        );
      } catch {
        if (!ac.signal.aborted) setTemp(`${place} · trời chưa tới`);
      }
    };
    void run();
    return () => ac.abort();
  }, [coords, place]);

  useEffect(() => {
    const ac = new AbortController();
    const run = async () => {
      try {
        const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json", {
          signal: ac.signal,
        });
        if (!res.ok) throw new Error("fx");
        const data = (await res.json()) as { usd?: { vnd?: number; eur?: number; jpy?: number } };
        const vnd = data.usd?.vnd;
        const eur = data.usd?.eur;
        const jpy = data.usd?.jpy;
        if (!vnd) throw new Error("no vnd");
        const fmt = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 });
        setFx(`USD ${fmt.format(vnd)} VND · EUR ${eur?.toFixed(2) ?? "—"} · JPY ${jpy ? Math.round(jpy) : "—"}`);
      } catch {
        if (!ac.signal.aborted) setFx("Tỉ giá chưa tới");
      }
    };
    void run();
    return () => ac.abort();
  }, []);

  const lunar = now ? `${formatSolar(now)} · âm ${formatLunar(now)}` : "Đang lấy lịch";
  const soon = now
    ? countdowns(now)
        .slice(0, 3)
        .map((c) => `${c.name} ${c.days} ngày`)
        .join(" · ")
    : "";
  const ticker = `PHỔ VÀNG · ${lunar} · ${temp} · ${fx} · ${soon} · LOA3 +20% · DSPSS · NGAME · `;

  async function onRadio() {
    onExclusive();
    let list = stations;
    if (!list.length) {
      setDetail("Đang tìm đài Việt Nam…");
      try {
        const res = await fetch(
          "https://de1.api.radio-browser.info/json/stations/search?countrycode=VN&hidebroken=true&order=clickcount&reverse=true&limit=25",
        );
        if (!res.ok) throw new Error("radio");
        const rows = (await res.json()) as { name?: string; url_resolved?: string }[];
        list = rows
          .map((r) => ({ name: r.name || "Đài", url: r.url_resolved || "" }))
          .filter((r) => r.url.startsWith("https://"));
        if (!list.length) throw new Error("empty");
        setStations(list);
      } catch {
        setDetail("Không lấy được đài. Chạm lại khi có mạng.");
        return;
      }
    }
    const idx = stations.length ? (stationIdx + 1) % list.length : 0;
    const pick = list[idx];
    if (!pick) return;
    setStationIdx(idx);
    if (!radioRef.current) radioRef.current = new Audio();
    const audio = radioRef.current;
    audio.src = pick.url;
    try {
      await audio.play();
      setDetail(`Đài · ${pick.name}`);
    } catch {
      setDetail(`Đài ${pick.name} không phát được. Chạm để đài kế.`);
    }
  }

  async function onRec() {
    if (recOn && recRef.current) {
      recRef.current.stop();
      setRecOn(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
      const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      chunks.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size) chunks.current.push(e.data);
      };
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: rec.mimeType || "audio/webm" });
        const url = URL.createObjectURL(blob);
        setClipUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
        setDetail("Đã thu. Chạm Phát thu để nghe.");
      };
      recRef.current = rec;
      rec.start(250);
      setRecOn(true);
      setDetail("Đang thu… chạm Thu lần nữa để dừng.");
    } catch {
      setDetail("Chưa có micro. Bật quyền rồi chạm Thu lại.");
    }
  }

  function onPlayClip() {
    if (!clipUrl) {
      setDetail("Chưa có bản thu.");
      return;
    }
    onExclusive();
    const audio = new Audio(clipUrl);
    void audio.play().catch(() => setDetail("Không phát được bản thu."));
    setDetail("Đang phát bản thu.");
  }

  function onLocate() {
    if (!navigator.geolocation) {
      setDetail("Máy không có định vị.");
      return;
    }
    setDetail("Đang xin vị trí…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setPlace("Vị trí máy");
        setDetail(
          `GPS ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)} · trời cập nhật theo điểm này`,
        );
      },
      () => setDetail("Chưa được cấp vị trí. Bật quyền rồi chạm lại."),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  }

  const tools = [
    { id: "radio", label: "Đài", icon: Radio, run: () => void onRadio() },
    { id: "fx", label: "Giá", icon: Coins, run: () => setDetail(fx) },
    { id: "sky", label: "Trời", icon: CloudSun, run: () => setDetail(temp) },
    { id: "moon", label: "Lịch", icon: Moon, run: () => setDetail(`${lunar} · ${soon}`) },
    { id: "pin", label: "Vị trí", icon: MapPin, run: onLocate },
    { id: "mic", label: recOn ? "Dừng" : "Thu", icon: Mic, run: () => void onRec() },
  ];

  return (
    <section className="zone-cu frame-gold flex min-h-0 min-w-0 flex-col bg-navy-900" aria-label="CU 2/13">
      <div className="overflow-hidden border-b border-line">
        <div className="ticker-track py-1 font-display text-sm tracking-wide text-gold-500 uppercase">
          <span className="px-6">{ticker}</span>
          <span className="px-6" aria-hidden="true">
            {ticker}
          </span>
        </div>
      </div>
      <div className="flex min-h-0 w-full min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              type="button"
              onClick={tool.run}
              className="flex h-11 shrink-0 items-center gap-1 rounded-full border border-line bg-navy-950 px-3 text-sm text-ink"
            >
              <Icon className="size-4 text-gold-500" aria-hidden="true" />
              {tool.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            onExclusive();
            playMorse("PHO VANG");
            setDetail("Morse · PHO VANG · 680 Hz");
          }}
          className="flex h-11 shrink-0 items-center rounded-full border border-gold-500 px-3 font-display text-sm tracking-wide text-gold-500"
        >
          MORSE
        </button>
        {clipUrl ? (
          <button
            type="button"
            onClick={onPlayClip}
            className="flex h-11 shrink-0 items-center rounded-full bg-gold-500 px-3 font-display text-sm tracking-wide text-navy-950"
          >
            PHÁT THU
          </button>
        ) : null}
      </div>
      <p className="truncate px-3 pb-1 text-sm text-gold-100">{detail}</p>
    </section>
  );
});
