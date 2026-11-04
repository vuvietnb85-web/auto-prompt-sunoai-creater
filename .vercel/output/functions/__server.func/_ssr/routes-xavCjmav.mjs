import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Play, c as Mic, d as Copy, f as Coins, i as Radio, l as MapPin, o as Pause, p as CloudSun, r as Square, s as Moon, t as Upload, u as Download } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-xavCjmav.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function take(values, count) {
	if (values.length <= count) return values;
	const out = [];
	for (let i = 0; i < count; i++) {
		const idx = Math.round(i * (values.length - 1) / (count - 1));
		out.push(values[idx] ?? 0);
	}
	return out;
}
function SpectrumCanvas({ bins, active, getAnalyser }) {
	const liveRef = (0, import_react.useRef)(null);
	const shown = take(bins, 36);
	(0, import_react.useEffect)(() => {
		if (!active) return;
		const host = liveRef.current;
		if (!host) return;
		const bars = Array.from(host.children);
		const live = /* @__PURE__ */ new Uint8Array(512);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-28 overflow-hidden rounded-md bg-navy-950",
		"aria-label": "Phổ tần",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full items-end gap-px px-1",
			children: shown.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1 rounded-sm bg-line",
				style: { height: `${Math.max(6, Math.round(v * 100))}%` }
			}, i))
		}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: liveRef,
			className: "absolute inset-0 flex items-end gap-px px-1",
			children: shown.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1 rounded-sm bg-gold-500",
				style: { height: "6%" }
			}, i))
		}) : null]
	});
}
function RibbonCanvas({ points }) {
	const shown = take(points.map((p) => p.bass), 42).map((_, i, arr) => {
		return points[Math.round(i * (points.length - 1) / Math.max(1, arr.length - 1))] ?? {
			bass: 0,
			vocal: 0,
			air: 0
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-16 items-end gap-px overflow-hidden rounded-md bg-navy-950 px-1",
		"aria-label": "Dải năng lượng theo thời gian",
		children: shown.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full min-w-0 flex-1 flex-col justify-end",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-muted",
					style: { height: `${Math.round(Math.max(0, p.air) * 34)}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-ink",
					style: { height: `${Math.round(Math.max(0, p.vocal) * 34)}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-gold-500",
					style: { height: `${Math.round(Math.max(0, p.bass) * 34)}%` }
				})
			]
		}, i))
	});
}
var FACES = [
	"front",
	"back",
	"right",
	"left",
	"top",
	"bottom"
];
function BonusCube({ pop, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: pop ? "bonus-scene bonus-scene-pop" : "bonus-scene",
		onClick: onOpen,
		"aria-label": "Bonus Now, mở PayPal và MoMo",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "bonus-tilt",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bonus-cube",
				children: FACES.map((face) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `bonus-face bonus-${face}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bonus-plate",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "bonus-mark",
							children: [
								"BONUS",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"NOW"
							]
						})
					})
				}, face))
			})
		})
	});
}
function MomoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className,
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: "64",
			height: "64",
			rx: "16",
			fill: "#AE2070"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#fff",
			d: "M14 46V18h8.2l9.8 16.2L41.8 18H50v28h-7.2V30.2L35.2 44h-6.4l-7.6-13.8V46z"
		})]
	});
}
var CAN = [
	"Giáp",
	"Ất",
	"Bính",
	"Đinh",
	"Mậu",
	"Kỷ",
	"Canh",
	"Tân",
	"Nhâm",
	"Quý"
];
var CHI = [
	"Tý",
	"Sửu",
	"Dần",
	"Mão",
	"Thìn",
	"Tỵ",
	"Ngọ",
	"Mùi",
	"Thân",
	"Dậu",
	"Tuất",
	"Hợi"
];
var WEEK = [
	"Chủ nhật",
	"Thứ Hai",
	"Thứ Ba",
	"Thứ Tư",
	"Thứ Năm",
	"Thứ Sáu",
	"Thứ Bảy"
];
function INT(d) {
	return Math.floor(d);
}
function jdFromDate(dd, mm, yy) {
	const a = INT((14 - mm) / 12);
	const y = yy + 4800 - a;
	const m = mm + 12 * a - 3;
	let jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;
	if (jd < 2299161) jd = dd + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
	return jd;
}
function NewMoon(k) {
	const T = k / 1236.85;
	const T2 = T * T;
	const T3 = T2 * T;
	const dr = Math.PI / 180;
	let Jd1 = 2415020.75933 + 29.53058868 * k + 1178e-7 * T2 - 155e-9 * T3;
	Jd1 += 33e-5 * Math.sin((166.56 + 132.87 * T - .009173 * T2) * dr);
	const M = 359.2242 + 29.10535608 * k - 333e-7 * T2 - 347e-8 * T3;
	const Mpr = 306.0253 + 385.81691806 * k + .0107306 * T2 + 1236e-8 * T3;
	const F = 21.2964 + 390.67050646 * k - .0016528 * T2 - 239e-8 * T3;
	let C1 = (.1734 - 393e-6 * T) * Math.sin(M * dr) + .0021 * Math.sin(2 * dr * M);
	C1 = C1 - .4068 * Math.sin(Mpr * dr) + .0161 * Math.sin(dr * 2 * Mpr);
	C1 = C1 - 4e-4 * Math.sin(dr * 3 * Mpr);
	C1 = C1 + .0104 * Math.sin(dr * 2 * F) - .0051 * Math.sin(dr * (M + Mpr));
	C1 = C1 - .0074 * Math.sin(dr * (M - Mpr)) + 4e-4 * Math.sin(dr * (2 * F + M));
	C1 = C1 - 4e-4 * Math.sin(dr * (2 * F - M)) - 6e-4 * Math.sin(dr * (2 * F + Mpr));
	C1 = C1 + .001 * Math.sin(dr * (2 * F - Mpr)) + 5e-4 * Math.sin(dr * (2 * Mpr + M));
	const deltat = T < -11 ? .001 + 839e-6 * T + 2261e-7 * T2 - 845e-8 * T3 - 81e-9 * T * T3 : -278e-6 + 265e-6 * T + 262e-6 * T2;
	return Jd1 + C1 - deltat;
}
function SunLongitude(jdn) {
	const T = (jdn - 2451545) / 36525;
	const T2 = T * T;
	const dr = Math.PI / 180;
	const M = 357.5291 + 35999.0503 * T - 1559e-7 * T2 - 48e-8 * T * T2;
	const L0 = 280.46645 + 36000.76983 * T + 3032e-7 * T2;
	let DL = (1.9146 - .004817 * T - 14e-6 * T2) * Math.sin(dr * M);
	DL = DL + (.019993 - 101e-6 * T) * Math.sin(dr * 2 * M) + 29e-5 * Math.sin(dr * 3 * M);
	let L = (L0 + DL) * dr;
	L = L - Math.PI * 2 * INT(L / (Math.PI * 2));
	return L;
}
function getSunLongitude(dayNumber, timeZone) {
	return INT(SunLongitude(dayNumber - .5 - timeZone / 24) / Math.PI * 6);
}
function getNewMoonDay(k, timeZone) {
	return INT(NewMoon(k) + .5 + timeZone / 24);
}
function getLunarMonth11(yy, timeZone) {
	const k = INT((jdFromDate(31, 12, yy) - 2415021) / 29.530588853);
	let nm = getNewMoonDay(k, timeZone);
	if (getSunLongitude(nm, timeZone) >= 9) nm = getNewMoonDay(k - 1, timeZone);
	return nm;
}
function getLeapMonthOffset(a11, timeZone) {
	const k = INT(.5 + (a11 - 2415021.076998695) / 29.530588853);
	let last = 0;
	let i = 1;
	let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
	do {
		last = arc;
		i++;
		arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
	} while (arc !== last && i < 14);
	return i - 1;
}
function solarToLunar(dd, mm, yy, timeZone = 7) {
	const dayNumber = jdFromDate(dd, mm, yy);
	const k = INT((dayNumber - 2415021.076998695) / 29.530588853);
	let monthStart = getNewMoonDay(k + 1, timeZone);
	if (monthStart > dayNumber) monthStart = getNewMoonDay(k, timeZone);
	let a11 = getLunarMonth11(yy, timeZone);
	let b11 = a11;
	let lunarYear;
	if (a11 >= monthStart) {
		lunarYear = yy;
		a11 = getLunarMonth11(yy - 1, timeZone);
	} else {
		lunarYear = yy + 1;
		b11 = getLunarMonth11(yy + 1, timeZone);
	}
	const lunarDay = dayNumber - monthStart + 1;
	const diff = INT((monthStart - a11) / 29);
	let lunarLeap = 0;
	let lunarMonth = diff + 11;
	if (b11 - a11 > 365) {
		const leapMonthDiff = getLeapMonthOffset(a11, timeZone);
		if (diff >= leapMonthDiff) {
			lunarMonth = diff + 10;
			if (diff === leapMonthDiff) lunarLeap = 1;
		}
	}
	if (lunarMonth > 12) lunarMonth -= 12;
	if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
	return [
		lunarDay,
		lunarMonth,
		lunarYear,
		lunarLeap
	];
}
function yearName(year) {
	return `${CAN[(year + 6) % 10]} ${CHI[(year + 8) % 12]}`;
}
function formatSolar(d) {
	const dd = String(d.getDate()).padStart(2, "0");
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	return `${WEEK[d.getDay()]} ${dd}.${mm}.${d.getFullYear()}`;
}
function formatLunar(d) {
	const [ld, lm, ly, leap] = solarToLunar(d.getDate(), d.getMonth() + 1, d.getFullYear(), 7);
	return `${String(ld).padStart(2, "0")}/${String(lm).padStart(2, "0")}${leap ? " nhuận" : ""} ${yearName(ly)}`;
}
function isLunar(d, day, month) {
	const [ld, lm] = solarToLunar(d.getDate(), d.getMonth() + 1, d.getFullYear(), 7);
	return ld === day && lm === month;
}
function nextSolar(from, month, day) {
	const y = from.getFullYear();
	let t = new Date(y, month - 1, day);
	const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
	if (t < start) t = new Date(y + 1, month - 1, day);
	return t;
}
function daysUntil(from, target) {
	const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
	const b = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate());
	return Math.round((b - a) / 864e5);
}
function nextLunar(from, day, month) {
	const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
	for (let i = 0; i < 400; i++) {
		const d = new Date(start);
		d.setDate(start.getDate() + i);
		if (isLunar(d, day, month)) return d;
	}
	return start;
}
function countdowns(from) {
	return [
		{
			name: "Tết",
			days: daysUntil(from, nextLunar(from, 1, 1))
		},
		{
			name: "Giỗ Tổ",
			days: daysUntil(from, nextLunar(from, 10, 3))
		},
		{
			name: "30/4",
			days: daysUntil(from, nextSolar(from, 4, 30))
		},
		{
			name: "2/9",
			days: daysUntil(from, nextSolar(from, 9, 2))
		},
		{
			name: "Trung thu",
			days: daysUntil(from, nextLunar(from, 15, 8))
		},
		{
			name: "1/1",
			days: daysUntil(from, nextSolar(from, 1, 1))
		}
	].sort((a, b) => a.days - b.days);
}
var MORSE = {
	A: ".-",
	B: "-...",
	C: "-.-.",
	D: "-..",
	E: ".",
	F: "..-.",
	G: "--.",
	H: "....",
	I: "..",
	J: ".---",
	K: "-.-",
	L: ".-..",
	M: "--",
	N: "-.",
	O: "---",
	P: ".--.",
	Q: "--.-",
	R: ".-.",
	S: "...",
	T: "-",
	U: "..-",
	V: "...-",
	W: ".--",
	X: "-..-",
	Y: "-.--",
	Z: "--..",
	" ": " "
};
function sky(code) {
	if (code === 0) return "quang";
	if (code <= 2) return "ít mây";
	if (code <= 48) return "mây";
	if (code <= 67) return "mưa";
	if (code <= 77) return "tuyết";
	return "mưa rào";
}
function playMorse(text) {
	const ctx = new AudioContext();
	const master = ctx.createGain();
	master.gain.value = .18;
	master.connect(ctx.destination);
	let t = ctx.currentTime + .05;
	const unit = .08;
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
			g.gain.setValueAtTime(.9, t);
			g.gain.setValueAtTime(0, t + dur);
			o.connect(g);
			g.connect(master);
			o.start(t);
			o.stop(t + dur + .02);
			t += dur + unit;
		}
		t += unit * 2;
	}
	window.setTimeout(() => void ctx.close(), (t - ctx.currentTime) * 1e3 + 400);
}
var CuDock = (0, import_react.forwardRef)(function CuDock({ onExclusive }, ref) {
	const radioRef = (0, import_react.useRef)(null);
	const recRef = (0, import_react.useRef)(null);
	const chunks = (0, import_react.useRef)([]);
	const [now, setNow] = (0, import_react.useState)(null);
	const [temp, setTemp] = (0, import_react.useState)("Thanh Hóa · đang lấy trời");
	const [fx, setFx] = (0, import_react.useState)("USD · …");
	const [place, setPlace] = (0, import_react.useState)("Thanh Hóa");
	const [coords, setCoords] = (0, import_react.useState)({
		lat: 19.807,
		lon: 105.776
	});
	const [detail, setDetail] = (0, import_react.useState)("CU 2/13 · trời, giá, đài, lịch, thu, Morse");
	const [stations, setStations] = (0, import_react.useState)([]);
	const [stationIdx, setStationIdx] = (0, import_react.useState)(0);
	const [recOn, setRecOn] = (0, import_react.useState)(false);
	const [clipUrl, setClipUrl] = (0, import_react.useState)(null);
	(0, import_react.useImperativeHandle)(ref, () => ({ stopAudio() {
		radioRef.current?.pause();
	} }));
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		const ac = new AbortController();
		const run = async () => {
			try {
				const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`;
				const res = await fetch(url, { signal: ac.signal });
				if (!res.ok) throw new Error("weather");
				const c = (await res.json()).current;
				if (!c) throw new Error("empty");
				setTemp(`${place} ${Math.round(c.temperature_2m ?? 0)}°C ${sky(c.weather_code ?? 0)} gió ${Math.round(c.wind_speed_10m ?? 0)} km/h`);
			} catch {
				if (!ac.signal.aborted) setTemp(`${place} · trời chưa tới`);
			}
		};
		run();
		return () => ac.abort();
	}, [coords, place]);
	(0, import_react.useEffect)(() => {
		const ac = new AbortController();
		const run = async () => {
			try {
				const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json", { signal: ac.signal });
				if (!res.ok) throw new Error("fx");
				const data = await res.json();
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
		run();
		return () => ac.abort();
	}, []);
	const lunar = now ? `${formatSolar(now)} · âm ${formatLunar(now)}` : "Đang lấy lịch";
	const soon = now ? countdowns(now).slice(0, 3).map((c) => `${c.name} ${c.days} ngày`).join(" · ") : "";
	const ticker = `PHỔ VÀNG · ${lunar} · ${temp} · ${fx} · ${soon} · LOA3 +20% · DSPSS · NGAME · `;
	async function onRadio() {
		onExclusive();
		let list = stations;
		if (!list.length) {
			setDetail("Đang tìm đài Việt Nam…");
			try {
				const res = await fetch("https://de1.api.radio-browser.info/json/stations/search?countrycode=VN&hidebroken=true&order=clickcount&reverse=true&limit=25");
				if (!res.ok) throw new Error("radio");
				list = (await res.json()).map((r) => ({
					name: r.name || "Đài",
					url: r.url_resolved || ""
				})).filter((r) => r.url.startsWith("https://"));
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
		new Audio(clipUrl).play().catch(() => setDetail("Không phát được bản thu."));
		setDetail("Đang phát bản thu.");
	}
	function onLocate() {
		if (!navigator.geolocation) {
			setDetail("Máy không có định vị.");
			return;
		}
		setDetail("Đang xin vị trí…");
		navigator.geolocation.getCurrentPosition((pos) => {
			setCoords({
				lat: pos.coords.latitude,
				lon: pos.coords.longitude
			});
			setPlace("Vị trí máy");
			setDetail(`GPS ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)} · trời cập nhật theo điểm này`);
		}, () => setDetail("Chưa được cấp vị trí. Bật quyền rồi chạm lại."), {
			enableHighAccuracy: false,
			timeout: 8e3
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "zone-cu frame-gold flex min-h-0 min-w-0 flex-col bg-navy-900",
		"aria-label": "CU 2/13",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden border-b border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ticker-track py-1 font-display text-sm tracking-wide text-gold-500 uppercase",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-6",
						children: ticker
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-6",
						"aria-hidden": "true",
						children: ticker
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 w-full min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1",
				children: [
					[
						{
							id: "radio",
							label: "Đài",
							icon: Radio,
							run: () => void onRadio()
						},
						{
							id: "fx",
							label: "Giá",
							icon: Coins,
							run: () => setDetail(fx)
						},
						{
							id: "sky",
							label: "Trời",
							icon: CloudSun,
							run: () => setDetail(temp)
						},
						{
							id: "moon",
							label: "Lịch",
							icon: Moon,
							run: () => setDetail(`${lunar} · ${soon}`)
						},
						{
							id: "pin",
							label: "Vị trí",
							icon: MapPin,
							run: onLocate
						},
						{
							id: "mic",
							label: recOn ? "Dừng" : "Thu",
							icon: Mic,
							run: () => void onRec()
						}
					].map((tool) => {
						const Icon = tool.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: tool.run,
							className: "flex h-11 shrink-0 items-center gap-1 rounded-full border border-line bg-navy-950 px-3 text-sm text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-4 text-gold-500",
								"aria-hidden": "true"
							}), tool.label]
						}, tool.id);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							onExclusive();
							playMorse("PHO VANG");
							setDetail("Morse · PHO VANG · 680 Hz");
						},
						className: "flex h-11 shrink-0 items-center rounded-full border border-gold-500 px-3 font-display text-sm tracking-wide text-gold-500",
						children: "MORSE"
					}),
					clipUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onPlayClip,
						className: "flex h-11 shrink-0 items-center rounded-full bg-gold-500 px-3 font-display text-sm tracking-wide text-navy-950",
						children: "PHÁT THU"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate px-3 pb-1 text-sm text-gold-100",
				children: detail
			})
		]
	});
});
/** In-place radix-2 FFT. `re` and `im` length must be a power of two. */
function fft(re, im) {
	const n = re.length;
	for (let i = 1, j = 0; i < n; i++) {
		let bit = n >> 1;
		for (; j & bit; bit >>= 1) j ^= bit;
		j ^= bit;
		if (i < j) {
			const tr = re[i];
			re[i] = re[j];
			re[j] = tr;
			const ti = im[i];
			im[i] = im[j];
			im[j] = ti;
		}
	}
	for (let len = 2; len <= n; len <<= 1) {
		const ang = -2 * Math.PI / len;
		const wlenRe = Math.cos(ang);
		const wlenIm = Math.sin(ang);
		for (let i = 0; i < n; i += len) {
			let wr = 1;
			let wi = 0;
			const half = len >> 1;
			for (let k = 0; k < half; k++) {
				const jr = re[i + k + half] * wr - im[i + k + half] * wi;
				const ji = re[i + k + half] * wi + im[i + k + half] * wr;
				re[i + k + half] = re[i + k] - jr;
				im[i + k + half] = im[i + k] - ji;
				re[i + k] += jr;
				im[i + k] += ji;
				const nwr = wr * wlenRe - wi * wlenIm;
				wi = wr * wlenIm + wi * wlenRe;
				wr = nwr;
			}
		}
	}
}
var NOTE_NAMES = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B"
];
var MAJOR_SCALE = [
	0,
	2,
	4,
	5,
	7,
	9,
	11
];
var MINOR_SCALE = [
	0,
	2,
	3,
	5,
	7,
	8,
	10
];
var MAJOR_PROFILE = [
	6.35,
	2.23,
	3.48,
	2.33,
	4.38,
	4.09,
	2.52,
	5.19,
	2.39,
	3.66,
	2.29,
	2.88
];
var MINOR_PROFILE = [
	6.33,
	2.68,
	3.52,
	5.38,
	2.6,
	3.53,
	2.54,
	4.75,
	3.98,
	2.69,
	3.34,
	3.17
];
function midiHz(root, minor, degree, octave) {
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
	return 440 * 2 ** ((root + scale[d] + (oct + 1) * 12 - 69) / 12);
}
function detectKey(chroma) {
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
	return {
		root,
		minor,
		name
	};
}
var FFT_N = 4096;
var BANDS = [
	{
		id: "sub",
		label: "Siêu trầm",
		lo: 20,
		hi: 60
	},
	{
		id: "bass",
		label: "Bass",
		lo: 60,
		hi: 250
	},
	{
		id: "mud",
		label: "Bùn",
		lo: 250,
		hi: 500
	},
	{
		id: "mid",
		label: "Trung",
		lo: 500,
		hi: 1500
	},
	{
		id: "vocal",
		label: "Lời",
		lo: 1500,
		hi: 4e3
	},
	{
		id: "presence",
		label: "Hiện diện",
		lo: 4e3,
		hi: 8e3
	},
	{
		id: "air",
		label: "Hơi",
		lo: 8e3,
		hi: 16e3
	}
];
function hann(n) {
	const w = new Float32Array(n);
	for (let i = 0; i < n; i++) w[i] = .5 * (1 - Math.cos(2 * Math.PI * i / (n - 1)));
	return w;
}
function biquadHighpass(fs, f, q) {
	const w0 = 2 * Math.PI * f / fs;
	const cos = Math.cos(w0);
	const alpha = Math.sin(w0) / (2 * q);
	const a0 = 1 + alpha;
	return {
		b0: (1 + cos) / 2 / a0,
		b1: -(1 + cos) / a0,
		b2: (1 + cos) / 2 / a0,
		a1: -2 * cos / a0,
		a2: (1 - alpha) / a0
	};
}
function biquadHighShelf(fs, f, gainDb) {
	const A = 10 ** (gainDb / 40);
	const w0 = 2 * Math.PI * f / fs;
	const cos = Math.cos(w0);
	const alpha = Math.sin(w0) / 2;
	const twoSqrtAAlpha = 2 * Math.sqrt(A) * alpha;
	const a0 = A + 1 - (A - 1) * cos + twoSqrtAAlpha;
	return {
		b0: A * (A + 1 + (A - 1) * cos + twoSqrtAAlpha) / a0,
		b1: -2 * A * (A - 1 + (A + 1) * cos) / a0,
		b2: A * (A + 1 + (A - 1) * cos - twoSqrtAAlpha) / a0,
		a1: 2 * (A - 1 - (A + 1) * cos) / a0,
		a2: (A + 1 - (A - 1) * cos - twoSqrtAAlpha) / a0
	};
}
function runBiquad(x, c, z) {
	const y = c.b0 * x + c.b1 * z.x1 + c.b2 * z.x2 - c.a1 * z.y1 - c.a2 * z.y2;
	z.x2 = z.x1;
	z.x1 = x;
	z.y2 = z.y1;
	z.y1 = y;
	return y;
}
function estimateBpm(read, length, sr) {
	const step = Math.max(1, Math.floor(sr / 100));
	const env = [];
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
		const lag = Math.round(6e3 / bpm);
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
function approxLufs(read, length, sr) {
	const hp = biquadHighpass(sr, 60, .5);
	const hs = biquadHighShelf(sr, 1500, 4);
	const z1 = {
		x1: 0,
		x2: 0,
		y1: 0,
		y2: 0
	};
	const z2 = {
		x1: 0,
		x2: 0,
		y1: 0,
		y2: 0
	};
	const block = Math.max(1, Math.floor(sr * .4));
	const stride = 2;
	const powers = [];
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
	const abs = powers.map((p) => -.691 + 10 * Math.log10(p + 1e-12)).filter((v) => v > -70);
	if (!abs.length) return -32;
	const mean = abs.reduce((s, v) => s + v, 0) / abs.length;
	const rel = abs.filter((v) => v > mean - 10);
	const gated = rel.length ? rel : abs;
	return gated.reduce((s, v) => s + v, 0) / gated.length;
}
function yieldTick() {
	return new Promise((resolve) => {
		setTimeout(resolve, 0);
	});
}
async function analyzeFile(file, onProgress) {
	onProgress?.(.02);
	const audioCtx = new AudioContext();
	try {
		const encoded = await file.arrayBuffer();
		onProgress?.(.12);
		const buffer = await audioCtx.decodeAudioData(encoded.slice(0));
		const sr = buffer.sampleRate;
		const channels = buffer.numberOfChannels;
		const length = buffer.length;
		const duration = buffer.duration;
		if (!Number.isFinite(duration) || duration < .2 || length < FFT_N) throw new Error("File quá ngắn hoặc không có tiếng.");
		const ch0 = buffer.getChannelData(0);
		const ch1 = channels > 1 ? buffer.getChannelData(1) : ch0;
		const read = (i) => {
			return ((ch0[i] ?? 0) + (ch1[i] ?? 0)) * .5;
		};
		let peak = 0;
		let sumSq = 0;
		let nSq = 0;
		let corr = 0;
		let eL = 0;
		let eR = 0;
		const stride = Math.max(1, Math.floor(length / 25e4));
		for (let i = 0; i < length; i += stride) {
			const l = ch0[i] ?? 0;
			const r = ch1[i] ?? 0;
			const m = (l + r) * .5;
			const a = Math.abs(m);
			if (a > peak) peak = a;
			sumSq += m * m;
			nSq++;
			corr += l * r;
			eL += l * l;
			eR += r * r;
		}
		const peakDb = 20 * Math.log10(peak + 1e-9);
		const crestDb = peakDb - 10 * Math.log10(sumSq / Math.max(1, nSq) + 1e-12);
		const denom = Math.sqrt(eL * eR) + 1e-12;
		const corrN = Math.min(1, Math.max(-1, corr / denom));
		const stereo = Math.min(1, Math.max(0, 1 - corrN));
		const window = hann(FFT_N);
		const re = new Float32Array(FFT_N);
		const im = new Float32Array(FFT_N);
		const windows = Math.min(140, Math.max(24, Math.floor(duration)));
		const bandAcc = new Float32Array(BANDS.length);
		const chroma = /* @__PURE__ */ new Float32Array(12);
		const specAcc = /* @__PURE__ */ new Float32Array(48);
		const ribbon = [];
		const binHz = sr / FFT_N;
		let centroidNum = 0;
		let centroidDen = 0;
		for (let w = 0; w < windows; w++) {
			const start = Math.floor(w * Math.max(0, length - FFT_N) / Math.max(1, windows - 1));
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
				if (freq >= 40 && freq <= 5e3) {
					const midi = 69 + 12 * Math.log2(freq / 440);
					const pc = (Math.round(midi) % 12 + 12) % 12;
					chroma[pc] += mag;
				}
				for (let b = 0; b < BANDS.length; b++) if (freq >= BANDS[b].lo && freq < BANDS[b].hi) bandAcc[b] += mag * mag;
				if (freq >= 40 && freq < 200) bassE += mag;
				else if (freq >= 300 && freq < 4e3) vocalE += mag;
				else if (freq >= 6e3 && freq < 16e3) airE += mag;
				const logPos = Math.log(freq / 30) / Math.log(16e3 / 30);
				const bin = Math.min(47, Math.max(0, Math.floor(logPos * 48)));
				if (freq >= 30 && freq <= 16e3) specAcc[bin] += mag;
			}
			ribbon.push({
				t: start / sr,
				bass: bassE,
				vocal: vocalE,
				air: airE
			});
			if (w % 10 === 0) {
				onProgress?.(.2 + .7 * w / windows);
				await yieldTick();
			}
		}
		let cum = 0;
		let specSum = 0;
		for (let i = 0; i < specAcc.length; i++) specSum += specAcc[i];
		let rolloffHz = 8e3;
		for (let i = 0; i < specAcc.length; i++) {
			cum += specAcc[i];
			if (cum >= .85 * specSum) {
				rolloffHz = 30 * (16e3 / 30) ** (i / 48);
				break;
			}
		}
		const maxBand = Math.max(...Array.from(bandAcc), 1e-9);
		const bands = BANDS.map((b, i) => ({
			id: b.id,
			label: b.label,
			lo: b.lo,
			hi: b.hi,
			db: 10 * Math.log10((bandAcc[i] + 1e-12) / maxBand)
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
		onProgress?.(.94);
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
			centroidHz: centroidDen > 0 ? centroidNum / centroidDen : 1e3,
			rolloffHz,
			stereo,
			bands,
			spectrum,
			ribbon,
			fromFile: true
		};
	} finally {
		await audioCtx.close().catch(() => void 0);
	}
}
var DEMO_ANALYSIS = {
	fileName: "Phổ mẫu",
	duration: 200,
	sampleRate: 48e3,
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
	stereo: .42,
	bands: [
		{
			id: "sub",
			label: "Siêu trầm",
			lo: 20,
			hi: 60,
			db: -14
		},
		{
			id: "bass",
			label: "Bass",
			lo: 60,
			hi: 250,
			db: -6
		},
		{
			id: "mud",
			label: "Bùn",
			lo: 250,
			hi: 500,
			db: -8
		},
		{
			id: "mid",
			label: "Trung",
			lo: 500,
			hi: 1500,
			db: -4
		},
		{
			id: "vocal",
			label: "Lời",
			lo: 1500,
			hi: 4e3,
			db: -3
		},
		{
			id: "presence",
			label: "Hiện diện",
			lo: 4e3,
			hi: 8e3,
			db: -9
		},
		{
			id: "air",
			label: "Hơi",
			lo: 8e3,
			hi: 16e3,
			db: -16
		}
	],
	spectrum: Array.from({ length: 48 }, (_, i) => {
		const x = i / 47;
		return Math.max(.08, Math.sin(Math.PI * x) * .85 * (1 - .35 * x));
	}),
	ribbon: Array.from({ length: 64 }, (_, i) => ({
		t: i / 63 * 200,
		bass: .35 + .4 * Math.sin(i / 6),
		vocal: .3 + .45 * Math.sin(i / 8 + 1),
		air: .15 + .2 * Math.sin(i / 5 + 2)
	})),
	fromFile: false
};
async function stashFile(file) {
	const storage = navigator.storage;
	if (!storage?.getDirectory) return;
	try {
		const writable = await (await (await storage.getDirectory()).getFileHandle("pho-vang-current", { create: true })).createWritable();
		await writable.write(file);
		await writable.close();
	} catch {}
}
var ATOMS = [
	[
		"bau",
		"Đàn bầu",
		"Việt",
		"dan bau",
		"Dan bau monochord, one string, slow pitch bends, pentatonic, silence between phrases.",
		[
			.18,
			.58,
			.22,
			.16,
			.88,
			.06,
			.72,
			.48
		]
	],
	[
		"tranh",
		"Đàn tranh",
		"Việt",
		"dan tranh",
		"Dan tranh zither, rolling pentatonic figures, bright silk strings, soft accelerando.",
		[
			.42,
			.78,
			.18,
			.48,
			.34,
			.22,
			.55,
			.72
		]
	],
	[
		"nhi",
		"Đàn nhị",
		"Việt",
		"dan nhi",
		"Dan nhi spike fiddle, nasal ornaments, slides into the note, folk lament.",
		[
			.36,
			.46,
			.28,
			.4,
			.5,
			.12,
			.86,
			.3
		]
	],
	[
		"sao",
		"Sáo trúc",
		"Việt",
		"sao truc",
		"Sao truc bamboo flute, airy attacks, pastoral melody, human vibrato.",
		[
			.34,
			.74,
			.1,
			.28,
			.4,
			.08,
			.48,
			.9
		]
	],
	[
		"nguyet",
		"Đàn nguyệt",
		"Việt",
		"dan nguyet",
		"Dan nguyet moon lute, dry plucks, even eighths, modal folk tune.",
		[
			.55,
			.52,
			.3,
			.46,
			.22,
			.34,
			.6,
			.28
		]
	],
	[
		"com",
		"Trống cơm",
		"Việt",
		"trong com",
		"Trong com rice drums, two pitches, dry slap, dance pulse, no cymbal wash.",
		[
			.78,
			.34,
			.46,
			.42,
			.1,
			.92,
			.4,
			.16
		]
	],
	[
		"trung",
		"T'rưng",
		"Việt",
		"trung",
		"T'rung bamboo xylophone, short pentatonic taps, forest brightness, light hands.",
		[
			.62,
			.84,
			.12,
			.5,
			.12,
			.58,
			.35,
			.7
		]
	],
	[
		"tyba",
		"Đàn tỳ bà",
		"Việt",
		"ty ba",
		"Ty ba pear lute, tremolo rolls, narrative plucks, courtly pace.",
		[
			.4,
			.6,
			.26,
			.44,
			.3,
			.24,
			.58,
			.36
		]
	],
	[
		"gao",
		"Đàn gáo",
		"Việt",
		"dan gao",
		"Dan gao coconut fiddle, rough bow, rural ornament, minor thirds.",
		[
			.32,
			.36,
			.34,
			.38,
			.46,
			.14,
			.82,
			.18
		]
	],
	[
		"dong",
		"Trống đồng",
		"Việt",
		"trong dong",
		"Bronze drum, deep metallic pulse, ceremonial, long gaps, no melody rush.",
		[
			.28,
			.22,
			.78,
			.2,
			.55,
			.7,
			.5,
			.12
		]
	],
	[
		"kenb",
		"Kèn bầu",
		"Việt",
		"ken bau",
		"Ken bau gourd horn, reedy drone, outdoor call, narrow melody.",
		[
			.3,
			.28,
			.4,
			.22,
			.8,
			.16,
			.66,
			.2
		]
	],
	[
		"guqin",
		"Cổ cầm",
		"Hoa",
		"guqin",
		"Guqin, harmonics and slides, very slow, scholar silence, low strings.",
		[
			.12,
			.4,
			.48,
			.14,
			.84,
			.04,
			.6,
			.32
		]
	],
	[
		"erhu",
		"Nhị hồ",
		"Hoa",
		"erhu",
		"Erhu, singing bow, portamento, pentatonic sorrow, close and human.",
		[
			.34,
			.5,
			.24,
			.36,
			.42,
			.08,
			.88,
			.34
		]
	],
	[
		"pipa",
		"Tỳ bà",
		"Hoa",
		"pipa",
		"Pipa, tremolo and snaps, martial accents, bright attack, pentatonic.",
		[
			.58,
			.8,
			.2,
			.52,
			.16,
			.4,
			.45,
			.62
		]
	],
	[
		"dizi",
		"Sáo dizi",
		"Hoa",
		"dizi",
		"Dizi membrane flute, buzzy brightness, lively ornaments, folk dance.",
		[
			.64,
			.86,
			.08,
			.4,
			.18,
			.28,
			.3,
			.84
		]
	],
	[
		"guzheng",
		"Đàn tranh Hoa",
		"Hoa",
		"guzheng",
		"Guzheng, waterfall glissandi, pentatonic rolls, wide and elegant.",
		[
			.46,
			.82,
			.22,
			.55,
			.28,
			.2,
			.42,
			.74
		]
	],
	[
		"sheng",
		"Sênh",
		"Hoa",
		"sheng",
		"Sheng mouth organ, stacked chords, breathy reed choir, steady.",
		[
			.4,
			.48,
			.36,
			.62,
			.7,
			.12,
			.4,
			.44
		]
	],
	[
		"suona",
		"Kèn suona",
		"Hoa",
		"suona",
		"Suona shawm, piercing outdoor lead, wedding pulse, no soft intro.",
		[
			.72,
			.7,
			.3,
			.48,
			.2,
			.66,
			.35,
			.4
		]
	],
	[
		"yangqin",
		"Dương cầm",
		"Hoa",
		"yangqin",
		"Yangqin hammered dulcimer, rapid bamboo mallets, sparkling chords.",
		[
			.66,
			.88,
			.16,
			.7,
			.1,
			.48,
			.3,
			.8
		]
	],
	[
		"shaku",
		"Shakuhachi",
		"Nhật",
		"shakuhachi",
		"Shakuhachi, breath noise, honkyoku, one note held, meri pitch bends.",
		[
			.14,
			.42,
			.2,
			.12,
			.9,
			.02,
			.78,
			.66
		]
	],
	[
		"koto",
		"Koto",
		"Nhật",
		"koto",
		"Koto, pentatonic plucks, koto gliss, restrained, silk decay.",
		[
			.36,
			.76,
			.2,
			.4,
			.36,
			.14,
			.5,
			.7
		]
	],
	[
		"shami",
		"Shamisen",
		"Nhật",
		"shamisen",
		"Shamisen, percussive snaps, sawari buzz, narrative pace.",
		[
			.6,
			.44,
			.32,
			.42,
			.18,
			.55,
			.62,
			.22
		]
	],
	[
		"taiko",
		"Taiko",
		"Nhật",
		"taiko",
		"Taiko ensemble, huge drums, unison hits, theatrical space between strokes.",
		[
			.7,
			.3,
			.86,
			.45,
			.12,
			.96,
			.3,
			.2
		]
	],
	[
		"biwa",
		"Biwa",
		"Nhật",
		"biwa",
		"Biwa lute, cracked attacks, sparse narrative, low and dry.",
		[
			.28,
			.34,
			.5,
			.22,
			.48,
			.3,
			.7,
			.14
		]
	],
	[
		"sho",
		"Sáo sho",
		"Nhật",
		"sho",
		"Gagaku sho, cluster chords, immobile, ancient court drone.",
		[
			.1,
			.36,
			.4,
			.3,
			.95,
			.02,
			.55,
			.4
		]
	],
	[
		"gaya",
		"Gayageum",
		"Hàn",
		"gayageum",
		"Gayageum, sanjo plucks, accelerating cycles, silk zither.",
		[
			.58,
			.72,
			.18,
			.5,
			.24,
			.32,
			.48,
			.6
		]
	],
	[
		"haeg",
		"Haegeum",
		"Hàn",
		"haegeum",
		"Haegeum fiddle, tense bow, sinuous ornaments, court timbre.",
		[
			.4,
			.48,
			.22,
			.36,
			.4,
			.1,
			.74,
			.28
		]
	],
	[
		"jang",
		"Janggu",
		"Hàn",
		"janggu",
		"Janggu hourglass drum, kung and tok, cyclic folk meter.",
		[
			.74,
			.32,
			.42,
			.4,
			.08,
			.9,
			.35,
			.16
		]
	],
	[
		"piri",
		"Piri",
		"Hàn",
		"piri",
		"Piri double reed, raw and nasal, long tones, court melody.",
		[
			.32,
			.3,
			.28,
			.24,
			.72,
			.1,
			.8,
			.22
		]
	],
	[
		"sitar",
		"Sitar",
		"Ấn",
		"sitar",
		"Sitar, jawari buzz, meend slides, raga phrases, sympathetic strings.",
		[
			.38,
			.56,
			.34,
			.48,
			.62,
			.16,
			.7,
			.42
		]
	],
	[
		"tanp",
		"Tanpura",
		"Ấn",
		"tanpura",
		"Tanpura drone only, four strings, no melody, constant just intonation.",
		[
			.08,
			.3,
			.55,
			.2,
			.98,
			.02,
			.6,
			.25
		]
	],
	[
		"tabla",
		"Tabla",
		"Ấn",
		"tabla",
		"Tabla, tin and dha, kaida variations, resonant bass bayan.",
		[
			.72,
			.48,
			.58,
			.55,
			.15,
			.94,
			.4,
			.3
		]
	],
	[
		"bans",
		"Bansuri",
		"Ấn",
		"bansuri",
		"Bansuri bamboo, alap then gat, airy, gamak ornaments, no drums yet.",
		[
			.28,
			.7,
			.12,
			.26,
			.5,
			.06,
			.66,
			.86
		]
	],
	[
		"sarod",
		"Sarod",
		"Ấn",
		"sarod",
		"Sarod, metal fingerboard slides, dark raga, pulsing jhala.",
		[
			.48,
			.4,
			.46,
			.5,
			.4,
			.3,
			.78,
			.22
		]
	],
	[
		"mrid",
		"Mridangam",
		"Ấn",
		"mridangam",
		"Mridangam, carnatic stroke language, mathematical cadence, dry and exact.",
		[
			.76,
			.36,
			.5,
			.52,
			.08,
			.93,
			.35,
			.18
		]
	],
	[
		"veena",
		"Veena",
		"Ấn",
		"veena",
		"Saraswati veena, gamaka, slow raga, fretted and vocal-like.",
		[
			.3,
			.52,
			.32,
			.4,
			.55,
			.1,
			.72,
			.34
		]
	],
	[
		"santn",
		"Santoor Ấn",
		"Ấn",
		"santoor",
		"Indian santoor, light hammers, cascading raga, shimmering sustain.",
		[
			.6,
			.86,
			.14,
			.62,
			.2,
			.36,
			.4,
			.78
		]
	],
	[
		"oud",
		"Oud",
		"Ả Rập",
		"oud",
		"Oud taqsim, fretless, maqam quarter tones, rubato, no beat at first.",
		[
			.22,
			.48,
			.36,
			.3,
			.46,
			.08,
			.84,
			.26
		]
	],
	[
		"qanun",
		"Qanun",
		"Ả Rập",
		"qanun",
		"Qanun, rapid mandals, glittering runs, takht ensemble color.",
		[
			.5,
			.84,
			.16,
			.58,
			.22,
			.28,
			.55,
			.76
		]
	],
	[
		"nay",
		"Nay",
		"Ả Rập",
		"nay",
		"Ney reed flute, breathy maqam, long held tones, intimate.",
		[
			.2,
			.55,
			.14,
			.18,
			.7,
			.04,
			.8,
			.8
		]
	],
	[
		"riq",
		"Riq",
		"Ả Rập",
		"riq",
		"Riq tambourine, jingle subdivisions, crisp iqa, no wash.",
		[
			.8,
			.62,
			.12,
			.45,
			.05,
			.88,
			.3,
			.55
		]
	],
	[
		"darb",
		"Darbuka",
		"Thổ",
		"darbuka",
		"Darbuka, dum tek, driving belly-dance pulse, skin tone dry.",
		[
			.86,
			.4,
			.48,
			.4,
			.05,
			.95,
			.35,
			.22
		]
	],
	[
		"saz",
		"Saz",
		"Thổ",
		"saz",
		"Saz baglama, long neck, folk strum, Anatolian mode.",
		[
			.46,
			.64,
			.28,
			.44,
			.28,
			.26,
			.74,
			.3
		]
	],
	[
		"kaman",
		"Kamancheh",
		"Ba Tư",
		"kamancheh",
		"Kamancheh spike fiddle, bowed dastgah, crying slides.",
		[
			.3,
			.44,
			.26,
			.34,
			.48,
			.08,
			.9,
			.28
		]
	],
	[
		"tombak",
		"Tombak",
		"Ba Tư",
		"tombak",
		"Tombak goblet, finger snaps and bass, radif rhythm, subtle.",
		[
			.64,
			.38,
			.55,
			.4,
			.12,
			.86,
			.45,
			.16
		]
	],
	[
		"duduk",
		"Duduk",
		"Armenia",
		"duduk",
		"Duduk, apricot wood, two notes crying, drone underneath, very slow.",
		[
			.12,
			.32,
			.3,
			.16,
			.92,
			.02,
			.95,
			.4
		]
	],
	[
		"morin",
		"Morin khuur",
		"Mông",
		"morin khuur",
		"Morin khuur horsehead fiddle, overtones, gallop bow, open steppe.",
		[
			.48,
			.4,
			.42,
			.36,
			.6,
			.22,
			.7,
			.3
		]
	],
	[
		"gnawa",
		"Guembri",
		"Ma-rốc",
		"guembri",
		"Guembri bass lute, trance ostinato, iron castanets implied, minor loop.",
		[
			.55,
			.22,
			.8,
			.34,
			.75,
			.4,
			.88,
			.1
		]
	],
	[
		"gamelan",
		"Gamelan Java",
		"Java",
		"gamelan",
		"Javanese gamelan, slendro, soft mallets, gong cycle, unhurried.",
		[
			.4,
			.66,
			.5,
			.7,
			.55,
			.45,
			.35,
			.58
		]
	],
	[
		"kebyar",
		"Gong kebyar",
		"Bali",
		"gong kebyar",
		"Balinese gong kebyar, sudden bursts, interlocking kotekan, bright bronze.",
		[
			.82,
			.9,
			.4,
			.88,
			.15,
			.8,
			.25,
			.7
		]
	],
	[
		"angkl",
		"Angklung",
		"Sunda",
		"angklung",
		"Angklung rattles, one pitch each, shaking chords, gentle.",
		[
			.48,
			.7,
			.14,
			.55,
			.2,
			.35,
			.3,
			.64
		]
	],
	[
		"kulint",
		"Kulintang",
		"Philippines",
		"kulintang",
		"Kulintang gongs in a row, improvising melody, bossed bronze.",
		[
			.6,
			.78,
			.36,
			.58,
			.2,
			.5,
			.4,
			.6
		]
	],
	[
		"ranat",
		"Ranat",
		"Thái",
		"ranat",
		"Ranat xylophone, rapid Thai melody, piphat color, wooden bars.",
		[
			.7,
			.8,
			.16,
			.6,
			.12,
			.42,
			.45,
			.66
		]
	],
	[
		"khene",
		"Khèn",
		"Lào",
		"khene",
		"Khene mouth organ, free reeds, pentatonic drone chords, lam melody.",
		[
			.36,
			.46,
			.32,
			.4,
			.78,
			.1,
			.5,
			.42
		]
	],
	[
		"roneat",
		"Roneat",
		"Khmer",
		"roneat",
		"Roneat, pinpeat ensemble, ceremonial tempo, xylophone lead.",
		[
			.44,
			.68,
			.3,
			.52,
			.35,
			.4,
			.48,
			.5
		]
	],
	[
		"tro",
		"Trò",
		"Khmer",
		"tro",
		"Tro bowed lute, nasal, wedding ornament, heterophony.",
		[
			.4,
			.4,
			.24,
			.34,
			.4,
			.16,
			.72,
			.22
		]
	],
	[
		"kora",
		"Kora",
		"Tây Phi",
		"kora",
		"Kora harp, cascading polyrhythm, two thumbs, bright and cyclic.",
		[
			.66,
			.8,
			.22,
			.64,
			.18,
			.4,
			.35,
			.7
		]
	],
	[
		"bala",
		"Balafon",
		"Tây Phi",
		"balafon",
		"Balafon, gourd resonators, buzzing keys, interlocking melody.",
		[
			.7,
			.76,
			.28,
			.66,
			.12,
			.55,
			.4,
			.5
		]
	],
	[
		"djembe",
		"Djembe",
		"Tây Phi",
		"djembe",
		"Djembe ensemble, bass tone and slap, call and response, no melody lead.",
		[
			.84,
			.36,
			.7,
			.5,
			.08,
			.98,
			.3,
			.2
		]
	],
	[
		"tama",
		"Trống nói",
		"Tây Phi",
		"talking drum",
		"Talking drum, pitch bends that mimic speech, pressure drum, ensemble answers.",
		[
			.75,
			.42,
			.4,
			.45,
			.15,
			.9,
			.45,
			.18
		]
	],
	[
		"mbira",
		"Mbira",
		"Zimbabwe",
		"mbira",
		"Mbira lamella, buzzing bottlecaps, circular pattern, trance.",
		[
			.58,
			.7,
			.2,
			.6,
			.5,
			.32,
			.55,
			.48
		]
	],
	[
		"krar",
		"Krar",
		"Ethiopia",
		"krar",
		"Krar lyre, pentatonic strum, tezeta minor, spare and vocal-like.",
		[
			.4,
			.46,
			.3,
			.32,
			.4,
			.28,
			.86,
			.24
		]
	],
	[
		"shek",
		"Shekere",
		"Tây Phi",
		"shekere",
		"Shekere gourd shaker, woven net, timeline pattern, dry highs.",
		[
			.8,
			.55,
			.1,
			.35,
			.05,
			.84,
			.25,
			.6
		]
	],
	[
		"udu",
		"Udu",
		"Nigeria",
		"udu",
		"Udu clay pot, bass hum and slap, intimate, low and hollow.",
		[
			.48,
			.18,
			.82,
			.22,
			.3,
			.6,
			.4,
			.08
		]
	],
	[
		"uille",
		"Kèn uilleann",
		"Ireland",
		"uilleann pipes",
		"Uilleann pipes, regulators as chords, reels, bellows-blown, indoor.",
		[
			.72,
			.5,
			.28,
			.55,
			.48,
			.3,
			.4,
			.32
		]
	],
	[
		"bodh",
		"Bodhrán",
		"Ireland",
		"bodhran",
		"Bodhran frame drum, tipper rolls, jig pulse, skin only.",
		[
			.78,
			.3,
			.36,
			.3,
			.05,
			.88,
			.3,
			.14
		]
	],
	[
		"fiddle",
		"Fiddle Celtic",
		"Ireland",
		"fiddle",
		"Celtic fiddle, rolls and cuts, reel bowing, double stops.",
		[
			.8,
			.62,
			.16,
			.5,
			.1,
			.35,
			.35,
			.48
		]
	],
	[
		"pipes",
		"Kèn túi",
		"Scotland",
		"highland pipes",
		"Highland pipes, constant drone, outdoor march, piercing chanter.",
		[
			.55,
			.48,
			.45,
			.4,
			.92,
			.25,
			.5,
			.3
		]
	],
	[
		"hard",
		"Hardanger",
		"Na Uy",
		"hardanger",
		"Hardanger fiddle, sympathetic drone, halling rhythm, understrings ringing.",
		[
			.64,
			.58,
			.22,
			.48,
			.66,
			.22,
			.6,
			.4
		]
	],
	[
		"nyck",
		"Nyckelharpa",
		"Thụy Điển",
		"nyckelharpa",
		"Nyckelharpa keyed fiddle, tangents, drone strings, nordic minor.",
		[
			.5,
			.46,
			.3,
			.44,
			.7,
			.16,
			.82,
			.28
		]
	],
	[
		"klez",
		"Kèn klezmer",
		"Do Thái",
		"clarinet",
		"Klezmer clarinet, krekhts ornaments, freygish, sob then dance.",
		[
			.7,
			.55,
			.18,
			.4,
			.15,
			.3,
			.9,
			.42
		]
	],
	[
		"musette",
		"Phong cầm musette",
		"Pháp",
		"accordion",
		"Musette accordion, waltz in three, bellows swell, Paris cafe.",
		[
			.5,
			.52,
			.34,
			.55,
			.25,
			.2,
			.45,
			.3
		]
	],
	[
		"bouz",
		"Bouzouki",
		"Hy Lạp",
		"bouzouki",
		"Bouzouki, tremolo, zeibekiko 9-pulse, rebetiko minor.",
		[
			.48,
			.6,
			.26,
			.42,
			.3,
			.28,
			.8,
			.34
		]
	],
	[
		"balao",
		"Balalaika",
		"Nga",
		"balalaika",
		"Balalaika orchestra, triangular strums, prima lead, bright folk.",
		[
			.62,
			.74,
			.2,
			.6,
			.12,
			.36,
			.4,
			.55
		]
	],
	[
		"hurdy",
		"Hurdy-gurdy",
		"Âu",
		"hurdy-gurdy",
		"Hurdy-gurdy, cranked drone, buzzing bridge, medieval dance.",
		[
			.58,
			.34,
			.48,
			.4,
			.86,
			.3,
			.55,
			.16
		]
	],
	[
		"cimbal",
		"Cimbalom",
		"Trung Âu",
		"cimbalom",
		"Cimbalom, hammered strings, verbunkos flourishes, dry concert hall.",
		[
			.6,
			.8,
			.2,
			.58,
			.15,
			.4,
			.62,
			.66
		]
	],
	[
		"quena",
		"Quena",
		"Andes",
		"quena",
		"Quena notch flute, breathy Andean melody, minor pentatonic, thin air.",
		[
			.36,
			.68,
			.1,
			.24,
			.35,
			.08,
			.75,
			.88
		]
	],
	[
		"zampona",
		"Zampoña",
		"Andes",
		"zampoña",
		"Zampoña panpipes, hocket between two rows, wide mountain space.",
		[
			.32,
			.72,
			.16,
			.34,
			.4,
			.1,
			.7,
			.9
		]
	],
	[
		"charango",
		"Charango",
		"Andes",
		"charango",
		"Charango, ten steel strings, bright strum, huayno pulse.",
		[
			.68,
			.84,
			.14,
			.5,
			.1,
			.4,
			.45,
			.7
		]
	],
	[
		"cajon",
		"Cajón",
		"Peru",
		"cajon",
		"Cajon, bass in the middle, slap on the edge, flamenco or afro-peru.",
		[
			.74,
			.28,
			.62,
			.35,
			.05,
			.9,
			.4,
			.12
		]
	],
	[
		"flam",
		"Guitar flamenco",
		"Tây Ban Nha",
		"flamenco guitar",
		"Flamenco guitar, picado and rasgueado, golpes on the top, Phrygian.",
		[
			.78,
			.7,
			.22,
			.55,
			.1,
			.6,
			.7,
			.48
		]
	],
	[
		"berim",
		"Berimbau",
		"Brasil",
		"berimbau",
		"Berimbau, one steel string, coin buzz, capoeira toque, call.",
		[
			.5,
			.4,
			.35,
			.22,
			.55,
			.45,
			.5,
			.2
		]
	],
	[
		"choro",
		"Choro",
		"Brasil",
		"cavaquinho",
		"Choro: cavaquinho, flute and 7-string guitar, maxixe swing, virtuosic.",
		[
			.76,
			.72,
			.24,
			.66,
			.08,
			.4,
			.35,
			.58
		]
	],
	[
		"tres",
		"Tres Cuba",
		"Cuba",
		"tres",
		"Cuban tres, double-string montuno, interlocking with claves implied.",
		[
			.72,
			.64,
			.2,
			.55,
			.08,
			.42,
			.4,
			.4
		]
	],
	[
		"conga",
		"Conga",
		"Cuba",
		"congas",
		"Congas, tumbao, open tones and slaps, dance floor, no wash.",
		[
			.8,
			.38,
			.5,
			.42,
			.05,
			.92,
			.3,
			.2
		]
	],
	[
		"bata",
		"Batá",
		"Cuba",
		"bata",
		"Batá trio, sacred conversation, three drums, no Western backbeat.",
		[
			.7,
			.34,
			.6,
			.48,
			.1,
			.95,
			.45,
			.14
		]
	],
	[
		"steel",
		"Steel pan",
		"Trinidad",
		"steel pan",
		"Steel pan, rolled mallets, bright harmonic melody, carnival.",
		[
			.74,
			.92,
			.12,
			.6,
			.08,
			.45,
			.2,
			.86
		]
	],
	[
		"maria",
		"Kèn mariachi",
		"Mexico",
		"trumpets",
		"Mariachi trumpets in thirds, vihuela strums, guitarrón bass, festive.",
		[
			.7,
			.78,
			.4,
			.7,
			.1,
			.5,
			.25,
			.55
		]
	],
	[
		"quartet",
		"Tứ tấu dây",
		"Âu",
		"string quartet",
		"String quartet, four independent lines, bow changes audible, no drum kit.",
		[
			.28,
			.48,
			.32,
			.72,
			.25,
			.05,
			.55,
			.36
		]
	],
	[
		"viols",
		"Consort viol",
		"Âu",
		"viols",
		"Viol consort, Renaissance polyphony, gut strings, hushed.",
		[
			.18,
			.4,
			.36,
			.6,
			.4,
			.02,
			.5,
			.22
		]
	],
	[
		"continuo",
		"Continuo",
		"Âu",
		"harpsichord",
		"Baroque continuo, harpsichord and cello, walking eighths, terraced.",
		[
			.48,
			.58,
			.4,
			.55,
			.15,
			.12,
			.3,
			.3
		]
	],
	[
		"winds",
		"Ngũ tấu hơi",
		"Âu",
		"wind quintet",
		"Wind quintet, flute oboe clarinet horn bassoon, classical phrases.",
		[
			.4,
			.66,
			.22,
			.58,
			.12,
			.08,
			.35,
			.6
		]
	],
	[
		"horns",
		"Dàn kèn cor",
		"Âu",
		"horns",
		"Horn choir, stopped and open, romantic bloom, no percussion.",
		[
			.22,
			.36,
			.48,
			.5,
			.45,
			.04,
			.6,
			.2
		]
	],
	[
		"harp",
		"Hạc cầm",
		"Âu",
		"harp",
		"Concert harp, arpeggios, harmonics, pedal gliss at the climax only.",
		[
			.3,
			.8,
			.2,
			.4,
			.2,
			.08,
			.4,
			.84
		]
	],
	[
		"organ",
		"Đại phong cầm",
		"Âu",
		"organ",
		"Pipe organ, principal chorus, pedal bass, church acoustic, slow harmony.",
		[
			.14,
			.42,
			.7,
			.55,
			.9,
			.04,
			.5,
			.28
		]
	],
	[
		"piano",
		"Piano cổ điển",
		"Âu",
		"piano",
		"Classical piano, voiced chords, pedaled but clear, singing tenor line.",
		[
			.36,
			.6,
			.4,
			.5,
			.15,
			.1,
			.45,
			.4
		]
	],
	[
		"prepiano",
		"Piano soạn sẵn",
		"Âu",
		"prepared piano",
		"Prepared piano, bolts and rubber, percussive pitches, Cage-like.",
		[
			.55,
			.5,
			.3,
			.45,
			.1,
			.7,
			.4,
			.35
		]
	],
	[
		"cello",
		"Cello độc tấu",
		"Âu",
		"cello",
		"Solo cello, suite bowing, low singing, open strings, intimate.",
		[
			.24,
			.38,
			.62,
			.28,
			.35,
			.06,
			.7,
			.18
		]
	],
	[
		"violin",
		"Violin độc tấu",
		"Âu",
		"violin",
		"Solo violin, bariolage, lyrical then brilliant, hall reverb short.",
		[
			.42,
			.7,
			.14,
			.4,
			.12,
			.1,
			.5,
			.66
		]
	],
	[
		"celesta",
		"Celesta",
		"Âu",
		"celesta",
		"Celesta, bell-like keyboard, soft mallets, magical and thin.",
		[
			.28,
			.9,
			.06,
			.25,
			.15,
			.12,
			.35,
			.92
		]
	],
	[
		"marimba",
		"Marimba",
		"Âu",
		"marimba",
		"Marimba choir, four-mallet chords, warm wood, low A pipe.",
		[
			.48,
			.62,
			.45,
			.55,
			.2,
			.3,
			.4,
			.4
		]
	],
	[
		"vibes",
		"Vibraphone",
		"Âu",
		"vibraphone",
		"Vibraphone, motor off, jazz voicings, pedal bloom, soft mallets.",
		[
			.4,
			.74,
			.18,
			.45,
			.2,
			.15,
			.55,
			.7
		]
	],
	[
		"orch",
		"Dàn nhạc",
		"Âu",
		"orchestra",
		"Full orchestra, strings carry, winds answer, brass only at the peak.",
		[
			.34,
			.55,
			.5,
			.85,
			.2,
			.25,
			.45,
			.45
		]
	],
	[
		"brassband",
		"Brass band",
		"Âu",
		"brass band",
		"Brass band, cornets and tubas, hymn then march, outdoor punch.",
		[
			.6,
			.64,
			.55,
			.75,
			.15,
			.4,
			.3,
			.35
		]
	],
	[
		"walk",
		"Tứ tấu jazz",
		"Jazz",
		"upright bass",
		"Jazz quartet, walking bass, ride cymbal, horn head then solos.",
		[
			.72,
			.48,
			.55,
			.5,
			.08,
			.55,
			.6,
			.3
		]
	],
	[
		"rhodes",
		"Rhodes",
		"Jazz",
		"rhodes",
		"Rhodes electric piano, bark on the attack, fusion vamp, chorus light.",
		[
			.66,
			.5,
			.48,
			.55,
			.2,
			.35,
			.55,
			.28
		]
	],
	[
		"funk",
		"Trống funk",
		"Jazz",
		"funk kit",
		"Funk drum kit, ghost notes, dry snare, bass guitar locked, sixteenth grid.",
		[
			.88,
			.4,
			.72,
			.48,
			.05,
			.9,
			.3,
			.22
		]
	],
	[
		"brush",
		"Chổi jazz",
		"Jazz",
		"brushes",
		"Jazz brushes on snare, ballad, no backbeat slam, room quiet.",
		[
			.28,
			.35,
			.3,
			.3,
			.15,
			.4,
			.65,
			.2
		]
	],
	[
		"reggae",
		"One drop",
		"Jamaica",
		"one drop",
		"Reggae one drop, kick on three, organ bubble, bass melodic.",
		[
			.55,
			.36,
			.7,
			.4,
			.2,
			.6,
			.5,
			.18
		]
	],
	[
		"metal",
		"Trống metal",
		"Rock",
		"metal kit",
		"Metal kit, tight kick, double pedal sparse, guitars chug, no wash cymbals over the riff.",
		[
			.92,
			.55,
			.6,
			.7,
			.05,
			.85,
			.42,
			.35
		]
	],
	[
		"bluesharp",
		"Harmonica",
		"Mỹ",
		"harmonica",
		"Blues harmonica, cross harp, hand wah, shuffle, small amp grit.",
		[
			.6,
			.45,
			.28,
			.3,
			.15,
			.35,
			.7,
			.25
		]
	],
	[
		"banjo",
		"Banjo",
		"Mỹ",
		"banjo",
		"Scruggs banjo, three-finger rolls, bluegrass, no sustain.",
		[
			.9,
			.82,
			.1,
			.55,
			.05,
			.5,
			.2,
			.6
		]
	],
	[
		"mandolin",
		"Mandolin",
		"Mỹ",
		"mandolin",
		"Mandolin tremolo and chops, fiddle answers, acoustic and dry.",
		[
			.82,
			.78,
			.12,
			.5,
			.05,
			.4,
			.3,
			.55
		]
	],
	[
		"steelgtr",
		"Pedal steel",
		"Mỹ",
		"pedal steel",
		"Pedal steel, crying slides, country ballad, volume swell.",
		[
			.3,
			.55,
			.25,
			.28,
			.35,
			.08,
			.55,
			.48
		]
	],
	[
		"didg",
		"Didgeridoo",
		"Úc",
		"didgeridoo",
		"Didgeridoo, circular breath, rhythmic drone, no melody on top.",
		[
			.4,
			.15,
			.9,
			.2,
			.95,
			.35,
			.4,
			.05
		]
	],
	[
		"clap",
		"Clapsticks",
		"Úc",
		"clapsticks",
		"Clapsticks, wooden pulse against a drone, dry, outdoor.",
		[
			.6,
			.3,
			.15,
			.15,
			.2,
			.75,
			.3,
			.2
		]
	],
	[
		"slack",
		"Slack key",
		"Hawaii",
		"slack key",
		"Slack-key guitar, alternating bass, open tuning, gentle.",
		[
			.4,
			.62,
			.35,
			.35,
			.2,
			.15,
			.35,
			.4
		]
	],
	[
		"uke",
		"Ukulele",
		"Hawaii",
		"ukulele",
		"Ukulele, soft strums, major brightness, small body, no bass guitar.",
		[
			.5,
			.8,
			.08,
			.3,
			.05,
			.2,
			.15,
			.7
		]
	],
	[
		"native",
		"Sáo đồng bằng",
		"Bắc Mỹ",
		"plains flute",
		"Plains flute, minor pentatonic, breath, slow, lots of air.",
		[
			.16,
			.5,
			.12,
			.12,
			.6,
			.02,
			.8,
			.85
		]
	],
	[
		"handpan",
		"Handpan",
		"Đương đại",
		"handpan",
		"Handpan, central ding and tone fields, soft hands, pentatonic loop.",
		[
			.42,
			.7,
			.4,
			.35,
			.45,
			.3,
			.5,
			.55
		]
	],
	[
		"analog",
		"Bass analog",
		"Điện tử",
		"analog bass",
		"Mono analog bass, filter movement, sidechained to a short kick, dry.",
		[
			.8,
			.22,
			.92,
			.3,
			.25,
			.55,
			.45,
			.08
		]
	],
	[
		"modular",
		"Drone modular",
		"Điện tử",
		"modular drone",
		"Modular drone, slow filter, no beat, evolving harmonics.",
		[
			.08,
			.35,
			.6,
			.25,
			.98,
			.02,
			.55,
			.4
		]
	],
	[
		"malletmin",
		"Mallet tối giản",
		"Đương đại",
		"mallets",
		"Mallet minimalism, phasing patterns, marimba and vibes, hypnotic.",
		[
			.7,
			.75,
			.25,
			.8,
			.3,
			.4,
			.25,
			.6
		]
	],
	[
		"spectral",
		"Dàn phổ",
		"Đương đại",
		"spectral orchestra",
		"Spectral orchestra, chords built from overtones, slow bloom, no motif chase.",
		[
			.12,
			.4,
			.55,
			.7,
			.75,
			.05,
			.4,
			.5
		]
	],
	[
		"pad",
		"Pad synth",
		"Điện tử",
		"synth pad",
		"Wide synth pad, slow attack, no lead hook yet, stereo but not chorus-soupy.",
		[
			.15,
			.45,
			.35,
			.3,
			.7,
			.02,
			.5,
			.65
		]
	],
	[
		"machine",
		"Máy trống",
		"Điện tử",
		"drum machine",
		"Drum machine, short analog hats, dry kick, grid with a human nudge.",
		[
			.86,
			.4,
			.66,
			.35,
			.05,
			.88,
			.3,
			.25
		]
	],
	[
		"drumline",
		"Drumline",
		"Mỹ",
		"drumline",
		"Marching drumline, snares and basses, cadence, sticks on plastic.",
		[
			.8,
			.5,
			.55,
			.6,
			.05,
			.97,
			.2,
			.3
		]
	],
	[
		"guzheng2",
		"Pipa và sáo",
		"Hoa",
		"pipa and dizi",
		"Pipa and dizi in heterophony, same melody, different ornaments.",
		[
			.5,
			.82,
			.16,
			.55,
			.2,
			.25,
			.4,
			.78
		]
	],
	[
		"takht",
		"Takht",
		"Ả Rập",
		"takht",
		"Takht: oud, qanun, nay, violin and riq, maqam, arranged not solo.",
		[
			.48,
			.6,
			.3,
			.7,
			.35,
			.4,
			.75,
			.45
		]
	],
	[
		"piphat",
		"Piphat",
		"Thái",
		"piphat",
		"Piphat ensemble, ranat, gongs and drums, theater tempo, heterophony.",
		[
			.66,
			.7,
			.32,
			.75,
			.2,
			.6,
			.45,
			.5
		]
	],
	[
		"gagaku",
		"Gagaku",
		"Nhật",
		"gagaku",
		"Gagaku, sho chords, hichiriki lead, biwa and taiko, glacial.",
		[
			.12,
			.38,
			.45,
			.5,
			.9,
			.2,
			.6,
			.3
		]
	],
	[
		"stringorch",
		"Dàn dây",
		"Âu",
		"string orchestra",
		"String orchestra divisi, warm, no brass, melody in violas sometimes.",
		[
			.26,
			.5,
			.4,
			.75,
			.3,
			.04,
			.55,
			.32
		]
	],
	[
		"soloflt",
		"Flute độc tấu",
		"Âu",
		"concert flute",
		"Concert flute, classical phrases, key clicks audible, dry room.",
		[
			.32,
			.8,
			.06,
			.22,
			.15,
			.05,
			.35,
			.9
		]
	],
	[
		"oboe",
		"Oboe",
		"Âu",
		"oboe",
		"Oboe, pastoral solo, double reed, long lines over soft strings.",
		[
			.28,
			.52,
			.16,
			.35,
			.25,
			.04,
			.5,
			.4
		]
	],
	[
		"clarinetorch",
		"Clarinet",
		"Âu",
		"clarinet",
		"Orchestral clarinet, chalumeau low then clarion, woody, lyrical.",
		[
			.3,
			.48,
			.28,
			.32,
			.2,
			.05,
			.55,
			.3
		]
	],
	[
		"bassoon",
		"Bassoon",
		"Âu",
		"bassoon",
		"Bassoon, tenor melody, reedy, humorous staccato then legato.",
		[
			.34,
			.32,
			.55,
			.3,
			.15,
			.1,
			.4,
			.12
		]
	],
	[
		"timp",
		"Timpani",
		"Âu",
		"timpani",
		"Timpani tuned to the key, rolls into cadences, not a drum kit.",
		[
			.3,
			.2,
			.8,
			.25,
			.2,
			.65,
			.35,
			.08
		]
	],
	[
		"guitclass",
		"Guitar cổ điển",
		"Âu",
		"classical guitar",
		"Classical guitar, nail and flesh, rest strokes, nylon, intimate.",
		[
			.32,
			.7,
			.2,
			.35,
			.12,
			.12,
			.45,
			.55
		]
	],
	[
		"lute",
		"Lute",
		"Âu",
		"lute",
		"Renaissance lute, polyphony, light right hand, short decay.",
		[
			.28,
			.58,
			.22,
			.45,
			.15,
			.08,
			.4,
			.3
		]
	],
	[
		"bandoneon",
		"Bandoneón",
		"Argentina",
		"bandoneon",
		"Bandoneon, tango, bellows snaps, minor, violin answers, no drum kit.",
		[
			.5,
			.46,
			.32,
			.55,
			.2,
			.25,
			.9,
			.22
		]
	],
	[
		"balkan",
		"Kèn Balkan",
		"Balkan",
		"balkan brass",
		"Balkan brass, odd meter, trumpets and tuba, wedding volume, fast.",
		[
			.88,
			.6,
			.5,
			.7,
			.1,
			.75,
			.55,
			.35
		]
	],
	[
		"organtrio",
		"Organ trio",
		"Jazz",
		"hammond",
		"Hammond organ trio, Leslie fast on the shout, guitar and drums.",
		[
			.74,
			.5,
			.55,
			.55,
			.15,
			.6,
			.4,
			.25
		]
	],
	[
		"afrocuba",
		"Charanga",
		"Cuba",
		"charanga",
		"Charanga: flute and violins over piano montuno, elegant dance.",
		[
			.75,
			.78,
			.3,
			.7,
			.08,
			.5,
			.25,
			.7
		]
	]
].map((row) => ({
	id: row[0],
	vi: row[1],
	region: row[2],
	lead: row[3],
	en: row[4],
	s: row[5]
}));
var CORPUS_COUNT = ATOMS.length;
var DIM = 8;
var STATES = ATOMS.map((atom) => unit(center(Float64Array.from(atom.s))));
var VENUE_BIAS = {
	club: [
		.16,
		-.04,
		.14,
		.04,
		-.1,
		.12,
		0,
		-.04
	],
	stadium: [
		.08,
		.1,
		.04,
		.08,
		-.06,
		.08,
		0,
		.08
	],
	meeting: [
		-.14,
		-.02,
		-.16,
		-.1,
		.04,
		-.16,
		0,
		-.04
	],
	theater: [
		-.04,
		.08,
		-.02,
		.02,
		.1,
		-.06,
		.02,
		.1
	],
	hall: [
		0,
		.04,
		.02,
		.06,
		.08,
		-.04,
		0,
		.04
	]
};
function clamp01(n) {
	return Math.min(1, Math.max(0, n));
}
function band(a, id) {
	return clamp01(((a.bands.find((b) => b.id === id)?.db ?? -18) + 24) / 24);
}
function center(v) {
	const o = new Float64Array(DIM);
	for (let i = 0; i < DIM; i++) o[i] = (v[i] ?? 0) * 2 - 1;
	return o;
}
function unit(v) {
	let s = 0;
	for (let i = 0; i < v.length; i++) s += v[i] * v[i];
	const n = Math.sqrt(s) || 1;
	const o = new Float64Array(v.length);
	for (let i = 0; i < v.length; i++) o[i] = v[i] / n;
	return o;
}
function dot(a, b) {
	let s = 0;
	for (let i = 0; i < a.length; i++) s += a[i] * b[i];
	return s;
}
function queryOf(a, venue, q) {
	const pulse = clamp01((a.bpm - 60) / 100);
	const bright = clamp01((a.centroidHz - 600) / 4200);
	const low = clamp01(band(a, "sub") * .55 + band(a, "bass") * .45 + (q.sub ? .1 : 0));
	const crestN = clamp01(a.crestDb / 18);
	const raw = [
		pulse,
		bright,
		low,
		clamp01(1 - crestN * .5 + band(a, "mid") * .35),
		clamp01((1 - pulse) * .45 + (a.keyMinor ? .18 : 0) + (1 - bright) * .2 + (q.smooth ? .1 : 0)),
		clamp01(crestN * .48 + pulse * .34 + (q.smooth ? -.1 : .04)),
		a.keyMinor ? .85 : .18,
		clamp01(band(a, "air") * .4 + band(a, "presence") * .3 + bright * .22 + (q.bright ? .1 : 0))
	];
	const bias = VENUE_BIAS[venue];
	const v = new Float64Array(DIM);
	for (let i = 0; i < DIM; i++) v[i] = clamp01(raw[i] + bias[i]);
	if (q.drive) {
		v[0] = clamp01(v[0] + .22);
		v[5] = clamp01(v[5] + .16);
		v[4] = clamp01(v[4] - .18);
		v[1] = clamp01(v[1] + .06);
	}
	if (band(a, "vocal") >= .55) {
		v[0] = clamp01(v[0] - .16);
		v[5] = clamp01(v[5] - .2);
		v[1] = clamp01(v[1] + .06);
		v[3] = clamp01(v[3] + .05);
	}
	return unit(center(v));
}
function rolesOf(atom) {
	const scored = [
		["Nhịp", Math.max(atom.s[0], atom.s[5])],
		["Màu", Math.max(atom.s[1], atom.s[7])],
		["Nền", Math.max(atom.s[2] * .9, atom.s[4])],
		["Đệm", atom.s[3]]
	];
	let best = scored[0];
	for (const item of scored) if (item[1] > best[1]) best = item;
	return [best[0]];
}
function kernelPrepare(alpha) {
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
function groverOnce(beta, marked) {
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
var ORDER = [
	"Nền",
	"Màu",
	"Nhịp",
	"Đệm"
];
function measure(scores, alpha) {
	const used = new Uint8Array(ATOMS.length);
	const picked = [];
	const take = (role) => {
		let best = -1;
		let bestScore = -1;
		for (let i = 0; i < ATOMS.length; i++) {
			if (used[i] || scores[i] <= bestScore) continue;
			if (!rolesOf(ATOMS[i]).includes(role)) continue;
			let close = false;
			for (const prev of picked) if (dot(STATES[i], STATES[prev.index]) > .9) close = true;
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
				en: atom.en
			}
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
				hit: {
					id: atom.id,
					vi: atom.vi,
					region: atom.region,
					role,
					lead: atom.lead,
					p: 0,
					en: atom.en
				}
			});
		}
	}
	let mass = 0;
	for (const item of picked) mass += scores[item.index];
	if (mass <= 0) mass = 1;
	for (const item of picked) item.hit.p = scores[item.index] / mass;
	return picked;
}
function arrangementLine(a, q, instrumental) {
	return [
		a.stereo > .35 ? "Pan the color instruments. Bass stays mono under 120 Hz." : "Keep the band mostly centered, a small pan on the lead only.",
		q.smooth ? "Legato bows and long breaths, soft attacks." : "Notes speak at once, attacks stay clear.",
		q.sub ? "The low instrument is felt, then stops. No endless sub." : "Low end stays even, no sub boom.",
		instrumental ? "No singer. The lead instrument carries the hook." : "A sung Vietnamese vocal sits in front. Instruments answer in the gaps."
	].join(" ");
}
function collapseCorpus(a, venue, q) {
	const query = queryOf(a, venue, q);
	const alpha = new Float64Array(ATOMS.length);
	for (let i = 0; i < ATOMS.length; i++) alpha[i] = Math.max(0, dot(query, STATES[i]));
	const beta = kernelPrepare(alpha);
	let betaMax = 0;
	for (let i = 0; i < beta.length; i++) if (beta[i] > betaMax) betaMax = beta[i];
	const mixed = new Float64Array(alpha.length);
	for (let i = 0; i < alpha.length; i++) {
		const b = betaMax > 0 ? beta[i] / betaMax : 0;
		mixed[i] = .72 * alpha[i] + .28 * b;
	}
	const rank = [...alpha.keys()].sort((i, j) => alpha[j] - alpha[i]);
	const markCount = Math.max(6, Math.round(ATOMS.length * .28));
	const marked = new Uint8Array(ATOMS.length);
	for (let k = 0; k < markCount; k++) marked[rank[k]] = 1;
	const amp = groverOnce(mixed, marked);
	const scores = new Float64Array(ATOMS.length);
	let mass = 0;
	let top = 0;
	for (let i = 0; i < ATOMS.length; i++) {
		const score = amp[i] * amp[i] * (.2 + alpha[i]) * (marked[i] ? 1 : .3);
		scores[i] = score;
		mass += score;
		if (score > top) top = score;
	}
	const picked = measure(scores, alpha);
	const vocal = band(a, "vocal");
	const mid = band(a, "mid");
	const instrumental = vocal < .5 && vocal <= mid + .02;
	const color = picked.find((item) => item.hit.role === "Màu")?.hit.lead ?? picked[0]?.hit.lead ?? "flute";
	const lift = mass > 0 ? top / mass / (1 / ATOMS.length) : 1;
	return {
		hits: picked.map((item) => item.hit),
		bed: picked.map((item) => item.hit.en).join(" "),
		instrumental,
		lift,
		colorLead: color
	};
}
var VENUE_MIX = {
	club: "Nightclub atmosphere, no muddy low-end, centered stereo image, subtle lead panning only, punchy controlled bass, crisp highs.",
	stadium: "Stadium atmosphere, no muddy low-end, punch not boom, vocal and snare to the back row, crisp presence.",
	meeting: "Meeting-room atmosphere, words first, almost dry, bass only as warmth, little reverb, no harsh horn.",
	theater: "Theater atmosphere, wide dynamics, medium hall, the lead tells the story, no muddy low-end.",
	hall: "Concert-hall atmosphere, balanced, smooth decay, warm mids, no harsh horn, no excessive sub-bass."
};
function clip(text, max) {
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
function leadName(raw) {
	const name = raw.replace(/[^\w\s'-]/g, "").trim().slice(0, 18);
	if (!name) return "Lead";
	return name.charAt(0).toUpperCase() + name.slice(1);
}
function clause(en, max) {
	return clip(en.replace(/\.$/, ""), max);
}
function byRole(hits, role) {
	return hits.find((hit) => hit.role === role);
}
function timeline(lead, drive, instrumental) {
	const solo = instrumental ? `${lead} solo` : `${lead} solo, humming only`;
	if (drive) return `Arrangement Timeline: 0:00 Full ensemble, ${lead} in, no slow intro. 0:16 Dry verse, pulse stays. 0:48 Pre-chorus, brighter. 1:04 Chorus, hook twice. 1:40 Verse two, no energy drop. 2:08 Brighter pre-chorus. 2:24 Bigger chorus. 3:04 ${solo}. 3:36 Final chorus. 4:08 Dry outro, still in time. 4:20 Absolute ending, no extended tail.`;
	return `Arrangement Timeline: ${instrumental ? `0:00 Intro, ${lead} alone.` : `0:00 Intro, ${lead}, instrumental.`} 0:16 Dry verse. 0:48 Pre-chorus. 1:04 Chorus, hook twice. 1:40 Verse two. 2:08 Brighter pre-chorus. 2:24 Bigger chorus. 3:04 ${solo}. 3:36 Final chorus. 4:08 Dry outro. 4:20 Absolute ending, no extended tail.`;
}
function rhythm(input) {
	const bed = byRole(input.hits, "Nền");
	const pulse = byRole(input.hits, "Nhịp");
	const low = bed ? clause(bed.en, 64) : "Deep short bass notes with clean stops";
	return `Rhythm & Bass: Mono analog bass, short dry kick, ${pulse ? `${leadName(pulse.lead)} keeps time` : "Tight drums"}, no cymbal wash, ${input.drive ? "no fade-in" : "enters with the intro"}. ${low}.`;
}
function melody(input, lead) {
	const color = byRole(input.hits, "Màu");
	return `Melodic Identity: ${color ? clause(color.en, 78) : `${lead}, interlocking melody`}. ${input.qualities.includes("smooth") ? "Legato strings, soft attacks, long breaths." : "Notes speak at once. Attacks stay clear."}`;
}
function brass(input) {
	if (input.drive) return "Brass Arrangement: Cornets and tubas from the first bar, hymn color already a marching-band sound.";
	if (input.venue === "meeting") return "Brass Arrangement: Muted cornets, short and dry, never a parade. Words stay in front.";
	if (input.venue === "theater" || input.venue === "hall") return "Brass Arrangement: Warm horns, hymn color, no harsh blast, bloom only in the chorus.";
	return "Brass Arrangement: Cornets and tubas, evolving from a solemn hymn into a powerful outdoor marching-band sound.";
}
function vocal(input) {
	if (input.instrumental) return "Vocal: Instrumental only. No singer, no rap, no choir lyric. The lead instrument carries the hook.";
	return "Vocal: Vietnamese sung vocal, never rapped, prominent and clear in front. Instruments answer between phrases.";
}
function mix(input) {
	const hint = input.arrange ? ` ${clip(input.arrange, 56)}` : "";
	return `Mix: ${VENUE_MIX[input.venue]}${hint} No muddy low-end or excessive sub-bass.`;
}
function fit995(raw, drive = false) {
	let s = raw.replace(/\s+/g, " ").trim();
	if (s.length > 995) {
		let cut = s.slice(0, 995);
		const sp = cut.lastIndexOf(" ");
		if (sp >= 947) cut = cut.slice(0, sp);
		s = cut.replace(/[\s,;:]+$/g, "");
		if (!s.endsWith(".")) s = s.length >= 995 ? `${s.slice(0, 994)}.` : `${s}.`;
	}
	const bits = drive ? [
		" No fade-in.",
		" No long intro.",
		" Kick stays dry.",
		" No cymbal wash.",
		" End on the tonic.",
		" Human timing, not a locked machine.",
		" True peak under -1 dBTP."
	] : [
		" No vocal chop.",
		" No chipmunk.",
		" No riser.",
		" No trailer impact.",
		" Tune the low end to the key.",
		" Last two seconds nearly dry.",
		" True peak under -1 dBTP.",
		" Human timing, not a locked machine.",
		" End on the tonic."
	];
	for (const bit of bits) {
		const key = bit.trim().replace(/\.$/, "").toLowerCase();
		if (s.toLowerCase().includes(key)) continue;
		if (s.length + bit.length <= 995) s += bit;
	}
	const tails = drive ? [
		" Still driving.",
		" Human.",
		" End."
	] : [
		" Clean cadence.",
		" Human.",
		" End."
	];
	while (s.length < 995) {
		const gap = 995 - s.length;
		const pick = tails.find((item) => item.length <= gap);
		if (!pick) break;
		s += pick;
	}
	if (s.length < 995 && s.endsWith(".")) {
		const gap = 995 - s.length;
		s = `${s.slice(0, -1)}${" ".repeat(gap)}.`;
	}
	if (s.length > 995) s = `${s.slice(0, 994)}.`;
	if (!s.endsWith(".")) s = `${s.slice(0, 994)}.`;
	return s.slice(0, 995);
}
function buildPrompt(input) {
	const lead = leadName(input.colorLead);
	const header = `Suno v6. Exactly 4:20, ${input.bpm} BPM, ${input.keyName}. Source reference: ${input.detectedBpm} BPM.`;
	const clock = timeline(lead, input.drive, input.instrumental);
	const blocks = [
		rhythm(input),
		melody(input, lead),
		brass(input),
		vocal(input),
		mix(input)
	];
	let guard = 0;
	while ([
		header,
		...blocks,
		clock
	].join(" ").length > 995 && guard < 48) {
		guard += 1;
		let idx = 0;
		for (let i = 1; i < blocks.length; i++) if (blocks[i].length > blocks[idx].length) idx = i;
		if (blocks[idx].length <= 72) break;
		blocks[idx] = clip(blocks[idx], blocks[idx].length - 18);
	}
	let body = [
		header,
		...blocks,
		clock
	].join(" ");
	if (body.length > 995) {
		const spare = 995 - `${header} ${clock}`.length - 1;
		let rest = blocks.join(" ");
		rest = clip(rest, Math.max(80, spare));
		body = `${header} ${rest} ${clock}`;
		if (body.length > 995) body = `${header} ${clock}`;
	}
	return fit995(body, input.drive);
}
var VENUES = [
	{
		id: "club",
		label: "HỘP ĐÊM",
		hint: "Sub chặt, phòng ngắn, kick bơm"
	},
	{
		id: "stadium",
		label: "SÂN VẬN ĐỘNG",
		hint: "Đấm, không ù, vang sân"
	},
	{
		id: "meeting",
		label: "PHÒNG HỌP",
		hint: "Lời trước, gần như khô"
	},
	{
		id: "theater",
		label: "RẠP HÁT",
		hint: "Động học rộng, màu đứng trước"
	},
	{
		id: "hall",
		label: "HỘI TRƯỜNG",
		hint: "Ấm, nở tự nhiên, mượt"
	}
];
var BASE_SECTIONS = [
	{
		name: "Mở",
		start: 0,
		end: 16,
		bass: .35,
		vocal: 0,
		flute: .25,
		treble: .3,
		density: .35
	},
	{
		name: "Khổ 1",
		start: 16,
		end: 48,
		bass: .55,
		vocal: .7,
		flute: .2,
		treble: .4,
		density: .55
	},
	{
		name: "Đưa",
		start: 48,
		end: 64,
		bass: .65,
		vocal: .75,
		flute: .55,
		treble: .6,
		density: .7
	},
	{
		name: "Điệp",
		start: 64,
		end: 100,
		bass: .9,
		vocal: 1,
		flute: .45,
		treble: .8,
		density: .9
	},
	{
		name: "Khổ 2",
		start: 100,
		end: 128,
		bass: .6,
		vocal: .8,
		flute: .3,
		treble: .45,
		density: .6
	},
	{
		name: "Đưa 2",
		start: 128,
		end: 144,
		bass: .7,
		vocal: .85,
		flute: .7,
		treble: .75,
		density: .8
	},
	{
		name: "Điệp 2",
		start: 144,
		end: 184,
		bass: 1,
		vocal: 1,
		flute: .5,
		treble: .9,
		density: 1
	},
	{
		name: "Màu",
		start: 184,
		end: 216,
		bass: .4,
		vocal: .25,
		flute: 1,
		treble: .7,
		density: .45
	},
	{
		name: "Điệp cuối",
		start: 216,
		end: 248,
		bass: 1,
		vocal: 1,
		flute: .65,
		treble: 1,
		density: 1
	},
	{
		name: "Kết",
		start: 248,
		end: 260,
		bass: .3,
		vocal: .4,
		flute: .8,
		treble: .35,
		density: .25
	}
];
var BIAS = {
	club: {
		bass: 1.25,
		vocal: .9,
		flute: .7,
		treble: .85,
		density: 1.1
	},
	stadium: {
		bass: 1.05,
		vocal: 1.12,
		flute: .8,
		treble: 1.2,
		density: 1
	},
	meeting: {
		bass: .45,
		vocal: 1.15,
		flute: .35,
		treble: .55,
		density: .45
	},
	theater: {
		bass: .75,
		vocal: 1.05,
		flute: 1.2,
		treble: .9,
		density: .62
	},
	hall: {
		bass: .85,
		vocal: 1,
		flute: 1,
		treble: .82,
		density: .72
	}
};
var BASE_CHAIN = {
	club: {
		hp: 28,
		bassShelfDb: 7,
		bassHz: 70,
		mudDb: -3.5,
		vocalDb: 2.5,
		vocalHz: 2800,
		fluteDb: 1.5,
		fluteHz: 1800,
		trebleDb: 2,
		airDb: 1,
		compThreshold: -18,
		compRatio: 4,
		compAttack: .008,
		compRelease: .12,
		delaySec: .04,
		delayFb: .18,
		delayWet: .12,
		loa3: 1.2,
		sat: .45
	},
	stadium: {
		hp: 35,
		bassShelfDb: 4,
		bassHz: 90,
		mudDb: -2,
		vocalDb: 4.5,
		vocalHz: 3200,
		fluteDb: 2,
		fluteHz: 2e3,
		trebleDb: 5,
		airDb: 1.5,
		compThreshold: -16,
		compRatio: 3.2,
		compAttack: .012,
		compRelease: .18,
		delaySec: .11,
		delayFb: .28,
		delayWet: .2,
		loa3: 1.2,
		sat: .2
	},
	meeting: {
		hp: 90,
		bassShelfDb: -2,
		bassHz: 120,
		mudDb: -3,
		vocalDb: 5,
		vocalHz: 2500,
		fluteDb: .4,
		fluteHz: 1800,
		trebleDb: 1,
		airDb: -1.5,
		compThreshold: -20,
		compRatio: 2.2,
		compAttack: .02,
		compRelease: .2,
		delaySec: .018,
		delayFb: .05,
		delayWet: .04,
		loa3: 1.2,
		sat: 0
	},
	theater: {
		hp: 40,
		bassShelfDb: 2,
		bassHz: 80,
		mudDb: -1.5,
		vocalDb: 3.5,
		vocalHz: 2400,
		fluteDb: 4,
		fluteHz: 1600,
		trebleDb: 2.5,
		airDb: 2,
		compThreshold: -22,
		compRatio: 2,
		compAttack: .02,
		compRelease: .25,
		delaySec: .07,
		delayFb: .3,
		delayWet: .18,
		loa3: 1.2,
		sat: .1
	},
	hall: {
		hp: 32,
		bassShelfDb: 3,
		bassHz: 75,
		mudDb: -2,
		vocalDb: 3,
		vocalHz: 2200,
		fluteDb: 3,
		fluteHz: 1700,
		trebleDb: 1.5,
		airDb: 1,
		compThreshold: -20,
		compRatio: 2.4,
		compAttack: .018,
		compRelease: .28,
		delaySec: .08,
		delayFb: .32,
		delayWet: .22,
		loa3: 1.2,
		sat: .08
	}
};
function clamp(n, lo, hi) {
	return Math.min(hi, Math.max(lo, n));
}
function snapBpm(raw, lo, hi, fallback) {
	let x = Math.round(raw);
	if (!Number.isFinite(x) || x < 40) x = fallback;
	while (x < lo) x *= 2;
	while (x > hi) x = Math.round(x / 2);
	return clamp(x, lo, hi);
}
function targetBpm(venue, detected, drive = false) {
	if (drive) return 145;
	if (venue === "club") return snapBpm(detected, 120, 128, 124);
	if (venue === "stadium") return snapBpm(detected, 96, 128, 110);
	if (venue === "meeting") return snapBpm(detected, 72, 108, 92);
	if (venue === "theater") return snapBpm(detected, 68, 100, 84);
	return snapBpm(detected, 76, 112, 96);
}
function bandDb(a, id) {
	return a.bands.find((b) => b.id === id)?.db ?? -12;
}
function shapeSections(venue, q) {
	const b = BIAS[venue];
	const rows = BASE_SECTIONS.map((s) => ({
		...s,
		bass: clamp(s.bass * b.bass * (q.sub ? 1.18 : 1), 0, 1),
		vocal: clamp(s.vocal * b.vocal, 0, 1),
		flute: clamp(s.flute * b.flute * (q.smooth ? 1.08 : 1), 0, 1),
		treble: clamp(s.treble * b.treble * (q.bright ? 1.2 : 1) * (q.smooth ? .86 : 1), 0, 1),
		density: clamp(s.density * b.density * (q.smooth ? .92 : 1), 0, 1)
	}));
	if (q.drive && rows[0]) rows[0] = {
		...rows[0],
		bass: Math.max(rows[0].bass, .88),
		treble: Math.max(rows[0].treble, .8),
		flute: Math.max(rows[0].flute, .72),
		density: Math.max(rows[0].density, .92),
		vocal: 0
	};
	return rows;
}
function shapeChain(a, venue, q) {
	const c = { ...BASE_CHAIN[venue] };
	if (q.sub) {
		c.bassShelfDb += 3.5;
		c.sat = clamp(c.sat + .25, 0, 1);
	}
	if (q.bright) {
		c.trebleDb += 3;
		c.airDb += 1.5;
		c.vocalDb += .4;
	}
	if (q.smooth) {
		c.trebleDb -= 1.5;
		c.airDb -= 1;
		c.compRatio = Math.max(1.5, c.compRatio - .8);
		c.compAttack += .01;
		c.sat *= .4;
		c.fluteDb += .6;
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
function suggestVenue(a) {
	const sub = bandDb(a, "sub");
	const vocal = bandDb(a, "vocal");
	if (a.bpm >= 118 && sub > vocal) return "club";
	if (vocal > sub + 6 && a.bpm <= 112) return "meeting";
	if (a.crestDb > 14 && a.centroidHz < 1800) return "theater";
	if (a.stereo > .45 && a.bpm < 108) return "hall";
	if (a.bpm >= 100) return "stadium";
	return "hall";
}
function signed$1(n) {
	return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
function qualityLine(q) {
	return [
		q.sub ? "super sub" : "controlled bass",
		q.bright ? "super bright" : "civil treble",
		q.smooth ? "super smooth" : "direct attack",
		q.drive ? "energetic from the first beat" : "dynamic intro"
	].join(", ");
}
function qualityLabel(q) {
	return [
		q.sub ? "Siêu trầm" : "Trầm vừa",
		q.bright ? "Siêu sáng" : "Sáng vừa",
		q.smooth ? "Siêu mượt" : "Tức thì",
		q.drive ? "Sôi động ngay từ đầu" : "Mở có thở"
	].join(" · ");
}
function buildDesign(a, venue, qualities) {
	const bpm = targetBpm(venue, a.bpm, qualities.drive);
	const sections = shapeSections(venue, qualities);
	const chain = shapeChain(a, venue, qualities);
	const venueMeta = VENUES.find((v) => v.id === venue);
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
		hits: collapse.hits
	});
	const picked = collapse.hits.map((h) => `${h.role} ${h.vi} ${Math.round(h.p * 100)}%`).join(" · ");
	const notes = [
		a.fromFile ? `Phổ file «${a.fileName}»: ${a.bpm} BPM, tông ${a.keyName}, dài ${Math.round(a.duration)} giây.` : "Chưa có file — đang dùng phổ mẫu La thứ, 118 BPM. Tải nhạc để tính lại.",
		`Tâm phổ ${Math.round(a.centroidHz)} Hz, rolloff ${Math.round(a.rolloffHz)} Hz, đỉnh ${a.peakDb.toFixed(1)} dBFS, crest ${a.crestDb.toFixed(1)} dB, ước lượng ${a.lufs.toFixed(1)} LUFS.`,
		`Kho ${CORPUS_COUNT} mẫu khí nhạc. Giao thoa 8 chiều, Grover một vòng, đo Born. Đỉnh gấp ${collapse.lift.toFixed(1)} lần nền.`,
		picked ? `Đã đo: ${picked}.` : "Kho chưa chọn được mẫu.",
		collapse.instrumental ? "Phổ nghiêng khí nhạc: prompt không đặt ca sĩ." : "Phổ còn dải lời: prompt giữ giọng hát Việt, khí nhạc đệm và đối đáp.",
		qualities.drive ? `Bản 4:20 khóa 145 BPM, sôi động ngay từ đầu. Nguồn đo ${a.bpm} BPM. ${venueMeta.label}: ${venueMeta.hint}.` : `Bản 4:20 khóa nhịp ${bpm} BPM cho ${venueMeta.label}. ${venueMeta.hint}.`,
		`Bass JBL: kệ thấp ${signed$1(chain.bassShelfDb)} tại ${Math.round(chain.bassHz)} Hz, cắt bùn ${signed$1(chain.mudDb)} tại 280 Hz, bão hòa ${Math.round(chain.sat * 100)}%.`,
		`Treble TOA: kệ cao ${signed$1(chain.trebleDb)}, hơi ${signed$1(chain.airDb)}. Lời Bose: ${signed$1(chain.vocalDb)} quanh ${Math.round(chain.vocalHz)} Hz, cắt dưới ${Math.round(chain.hp)} Hz.`,
		qualities.drive ? `Màu TOA: ${signed$1(chain.fluteDb)} quanh ${Math.round(chain.fluteHz)} Hz. Mở đầu đã đầy ngay giây 0, không intro thưa.` : `Màu TOA: ${signed$1(chain.fluteDb)} quanh ${Math.round(chain.fluteHz)} Hz. Dày nhất ở đoạn màu (3:04–3:36).`,
		`Phòng: trễ ${Math.round(chain.delaySec * 1e3)} ms, ướt ${Math.round(chain.delayWet * 100)}%. Nén tỷ lệ ${chain.compRatio.toFixed(1)}:1. LOA3 ×${chain.loa3.toFixed(2)} sau nén.`,
		`Chất âm: ${qualityLabel(qualities)}. Stereo gốc ${Math.round(a.stereo * 100)}% rộng.`
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
		lift: collapse.lift
	};
}
var MOTIF = [
	0,
	2,
	4,
	2,
	7,
	4,
	3,
	2
];
function curve(amount) {
	const n = 256;
	const out = new Float32Array(n);
	const k = Math.max(0, amount) * 14;
	for (let i = 0; i < n; i++) {
		const x = i / 255 * 2 - 1;
		out[i] = (1 + k) * x / (1 + k * Math.abs(x));
	}
	return out;
}
function glide(param, value, ctx) {
	const t = ctx.currentTime;
	param.cancelScheduledValues(t);
	param.setTargetAtTime(value, t, .04);
}
var MasterEngine = class {
	ctx = null;
	analyser = null;
	media = null;
	mediaSrc = null;
	mediaGain = null;
	sketchGain = null;
	session = null;
	input = null;
	hp = null;
	mud = null;
	vocal = null;
	flute = null;
	treble = null;
	air = null;
	comp = null;
	delay = null;
	delayFb = null;
	wet = null;
	shaper = null;
	bassShelf = null;
	bassPeak = null;
	bassSend = null;
	loa = null;
	limiter = null;
	hatPan = null;
	flutePan = null;
	bassLp = null;
	vocalBp = null;
	noise = null;
	design = null;
	level = 1;
	running = false;
	timer = 0;
	originCtx = 0;
	originScore = 0;
	nextScore = 0;
	mode = "idle";
	lastEmit = 0;
	onTime = null;
	build() {
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
		this.mud.Q.value = .9;
		this.vocal = ctx.createBiquadFilter();
		this.vocal.type = "peaking";
		this.vocal.Q.value = .8;
		this.flute = ctx.createBiquadFilter();
		this.flute.type = "peaking";
		this.flute.Q.value = 1.3;
		this.treble = ctx.createBiquadFilter();
		this.treble.type = "highshelf";
		this.air = ctx.createBiquadFilter();
		this.air.type = "peaking";
		this.air.frequency.value = 11e3;
		this.air.Q.value = .7;
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
		this.bassPeak.Q.value = .8;
		this.shaper = ctx.createWaveShaper();
		this.bassSend = ctx.createGain();
		this.loa = ctx.createGain();
		this.limiter = ctx.createDynamicsCompressor();
		this.limiter.threshold.value = -1.2;
		this.limiter.knee.value = 0;
		this.limiter.ratio.value = 20;
		this.limiter.attack.value = .003;
		this.limiter.release.value = .08;
		this.analyser = ctx.createAnalyser();
		this.analyser.fftSize = 1024;
		this.analyser.smoothingTimeConstant = .72;
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
		this.hatPan.pan.value = -.55;
		this.flutePan = ctx.createStereoPanner();
		this.flutePan.pan.value = .4;
		this.bassLp = ctx.createBiquadFilter();
		this.bassLp.type = "lowpass";
		this.bassLp.frequency.value = 180;
		this.vocalBp = ctx.createBiquadFilter();
		this.vocalBp.type = "bandpass";
		this.vocalBp.frequency.value = 1400;
		this.vocalBp.Q.value = .7;
		const samples = Math.floor(ctx.sampleRate * .06);
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
	attach(url) {
		if (!this.media) this.build();
		if (!this.media) return;
		this.media.pause();
		this.media.src = url;
		this.media.load();
	}
	setDesign(design) {
		this.design = design;
		this.applyChain(design.chain);
	}
	setLevel(level) {
		this.level = level;
		if (this.design) this.applyChain(this.design.chain);
	}
	applyChain(chain) {
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
		glide(this.bassPeak.frequency, Math.max(40, chain.bassHz * .75), ctx);
		glide(this.bassPeak.gain, Math.max(0, chain.bassShelfDb * .45), ctx);
		glide(this.bassSend.gain, .22 + chain.sat * .25, ctx);
		this.shaper.curve = curve(chain.sat);
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
		session.gain.value = .4;
		session.connect(this.sketchGain);
		this.session = session;
		this.hatPan?.connect(session);
		this.flutePan?.connect(session);
		this.bassLp?.connect(session);
		this.vocalBp?.connect(session);
		const startAt = Math.min(259.8, Math.max(0, from));
		this.originCtx = this.ctx.currentTime + .06;
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
	drop(node) {
		if (!node) return;
		try {
			node.disconnect();
		} catch {}
	}
	stopSketch() {
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
	emit(sec, mode) {
		const now = performance.now();
		if (mode !== "idle" && now - this.lastEmit < 200) return;
		this.lastEmit = now;
		this.mode = mode;
		this.onTime?.(sec, mode);
	}
	pump = () => {
		if (!this.running || !this.ctx || !this.design) return;
		const scoreNow = this.originScore + (this.ctx.currentTime - this.originCtx);
		if (scoreNow >= 260) {
			this.stopSketch();
			this.emit(260, "idle");
			return;
		}
		const horizon = scoreNow + .4;
		const bar = 240 / this.design.bpm;
		while (this.nextScore < horizon && this.nextScore < 260) {
			this.scheduleBar(this.nextScore);
			this.nextScore += bar;
		}
		this.emit(scoreNow, "sketch");
		this.timer = window.setTimeout(this.pump, 90);
	};
	scheduleBar(scoreTime) {
		const design = this.design;
		const ctx = this.ctx;
		const session = this.session;
		if (!design || !ctx || !session) return;
		const beat = 60 / design.bpm;
		const when0 = this.originCtx + (scoreTime - this.originScore);
		const sec = design.sections.find((s) => scoreTime >= s.start && scoreTime < s.end) ?? design.sections[design.sections.length - 1];
		const barIndex = Math.floor(scoreTime / (beat * 4));
		const kicks = sec.density > .75 ? [
			0,
			1,
			2,
			3
		] : sec.density > .4 ? [0, 2] : [0];
		for (const b of kicks) this.kick(when0 + b * beat, .5 * Math.max(.25, sec.density));
		if (sec.treble > .3 && this.hatPan) {
			const steps = sec.density > .7 ? 8 : 4;
			for (let i = 0; i < steps; i++) this.hat(this.hatPan, when0 + i * 4 / steps * beat, .045 * sec.treble);
		}
		if (sec.bass > .12 && this.bassLp) {
			const deg = [
				0,
				0,
				4,
				0
			][barIndex % 4];
			const f = midiHz(design.keyRoot, design.keyMinor, deg, 2);
			this.tone(this.bassLp, "sine", f, when0, beat * 1.5, .16 * sec.bass, false);
			if (sec.bass > .5) this.tone(this.bassLp, "sine", f / 2, when0, beat * 1.3, .11 * sec.bass, false);
		}
		if (sec.flute > .12 && this.flutePan) {
			const steps = sec.flute > .72 ? 8 : 4;
			for (let i = 0; i < steps; i++) {
				const deg = MOTIF[(barIndex * 2 + i) % MOTIF.length];
				const f = midiHz(design.keyRoot, design.keyMinor, deg, 5);
				const step = beat * 4 / steps;
				this.tone(this.flutePan, "sine", f, when0 + i * step, step * .86, .07 * sec.flute, true);
			}
		}
		if (sec.vocal > .15 && this.vocalBp) for (const deg of [
			0,
			2,
			4
		]) {
			const f = midiHz(design.keyRoot, design.keyMinor, deg, 4);
			this.tone(this.vocalBp, "triangle", f, when0, beat * 3.5, .03 * sec.vocal, false);
		}
	}
	tone(dest, type, freq, when, dur, vel, vibrato) {
		const ctx = this.ctx;
		if (!ctx || vel < .004 || dur <= 0) return;
		if (when + dur < ctx.currentTime) return;
		const start = Math.max(when, ctx.currentTime);
		const o = ctx.createOscillator();
		o.type = type;
		const f = Math.max(28, freq);
		o.frequency.setValueAtTime(f, start);
		const g = ctx.createGain();
		g.gain.setValueAtTime(1e-4, start);
		g.gain.exponentialRampToValueAtTime(Math.max(.001, vel), start + Math.min(.04, dur * .35));
		g.gain.exponentialRampToValueAtTime(1e-4, start + Math.max(.05, dur));
		if (vibrato) {
			const lfo = ctx.createOscillator();
			const lg = ctx.createGain();
			lfo.frequency.value = 4.5;
			lg.gain.value = Math.min(7, f * .006);
			lfo.connect(lg);
			lg.connect(o.frequency);
			lfo.start(start);
			lfo.stop(start + dur + .05);
		}
		o.connect(g);
		g.connect(dest);
		o.start(start);
		o.stop(start + dur + .03);
	}
	kick(when, vel) {
		const ctx = this.ctx;
		const session = this.session;
		if (!ctx || !session) return;
		if (when + .2 < ctx.currentTime) return;
		const start = Math.max(when, ctx.currentTime);
		const o = ctx.createOscillator();
		o.type = "sine";
		o.frequency.setValueAtTime(150, start);
		o.frequency.exponentialRampToValueAtTime(46, start + .09);
		const g = ctx.createGain();
		g.gain.setValueAtTime(vel, start);
		g.gain.exponentialRampToValueAtTime(.001, start + .2);
		o.connect(g);
		g.connect(session);
		o.start(start);
		o.stop(start + .22);
	}
	hat(dest, when, vel) {
		const ctx = this.ctx;
		if (!ctx || !this.noise || vel < .004) return;
		if (when + .06 < ctx.currentTime) return;
		const start = Math.max(when, ctx.currentTime);
		const src = ctx.createBufferSource();
		src.buffer = this.noise;
		const filter = ctx.createBiquadFilter();
		filter.type = "highpass";
		filter.frequency.value = 6800;
		const g = ctx.createGain();
		g.gain.setValueAtTime(vel, start);
		g.gain.exponentialRampToValueAtTime(1e-4, start + .045);
		src.connect(filter);
		filter.connect(g);
		g.connect(dest);
		src.start(start);
		src.stop(start + .06);
	}
	dispose() {
		this.stop();
		this.ctx?.close();
		this.ctx = null;
	}
};
function clock(sec) {
	const s = Math.max(0, Math.floor(sec));
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function signed(n) {
	return `${n > 0 ? "+" : ""}${n.toFixed(1)} dB`;
}
var PAYPAL_SRC = "https://www.paypal.com/sdk/js?client-id=BAAIfuQli_a3Qud-8CIRqCRCeohqtiW29_i2Txx2rQM35pqMc-pbCIZX6L8tx1zbyOj_vp8AUE_dpSqOhc&components=hosted-buttons&disable-funding=venmo&currency=USD";
var MOMO_WALLET = "+84988960419";
var PANES = [
	{
		id: "do",
		label: "ĐO"
	},
	{
		id: "ban",
		label: "BẢN"
	},
	{
		id: "prompt",
		label: "PROMPT"
	},
	{
		id: "ho",
		label: "VÍ"
	}
];
function PhoApp() {
	const engineRef = (0, import_react.useRef)(null);
	const cuRef = (0, import_react.useRef)(null);
	const fileRef = (0, import_react.useRef)(null);
	const urlRef = (0, import_react.useRef)(null);
	const [analysis, setAnalysis] = (0, import_react.useState)(null);
	const [venue, setVenue] = (0, import_react.useState)("club");
	const [qualities, setQualities] = (0, import_react.useState)({
		sub: true,
		bright: true,
		smooth: false,
		drive: true
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("idle");
	const [playhead, setPlayhead] = (0, import_react.useState)(0);
	const [level, setLevel] = (0, import_react.useState)(1);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [paypalOn, setPaypalOn] = (0, import_react.useState)(false);
	const [paypalMsg, setPaypalMsg] = (0, import_react.useState)("");
	const [momoMsg, setMomoMsg] = (0, import_react.useState)("");
	const [pane, setPane] = (0, import_react.useState)("do");
	const walletRef = (0, import_react.useRef)(null);
	const [bonusPop, setBonusPop] = (0, import_react.useState)(false);
	const [walletFlash, setWalletFlash] = (0, import_react.useState)(false);
	const source = analysis ?? DEMO_ANALYSIS;
	const design = (0, import_react.useMemo)(() => buildDesign(source, venue, qualities), [
		source,
		venue,
		qualities
	]);
	const active = mode !== "idle";
	const getAnalyser = (0, import_react.useCallback)(() => engineRef.current?.analyser ?? null, []);
	const head = playhead;
	(0, import_react.useEffect)(() => {
		const engine = new MasterEngine();
		engineRef.current = engine;
		engine.onTime = (sec, next) => {
			setPlayhead(sec);
			setMode(next);
		};
		try {
			const raw = localStorage.getItem("pho-vang");
			if (raw) {
				const saved = JSON.parse(raw);
				if (saved.venue) setVenue(saved.venue);
				if (saved.qualities) setQualities({
					sub: saved.qualities.sub ?? true,
					bright: saved.qualities.bright ?? true,
					smooth: saved.qualities.smooth ?? false,
					drive: saved.qualities.drive ?? true
				});
			}
		} catch {}
		return () => engine.dispose();
	}, []);
	(0, import_react.useEffect)(() => {
		localStorage.setItem("pho-vang", JSON.stringify({
			venue,
			qualities
		}));
	}, [venue, qualities]);
	(0, import_react.useEffect)(() => {
		const engine = engineRef.current;
		if (!engine) return;
		engine.setDesign(design);
		engine.setLevel(level);
	}, [design, level]);
	(0, import_react.useEffect)(() => {
		if (!paypalOn) return;
		let dead = false;
		const sel = "#paypal-container-T7AZ748Y27248";
		const render = () => {
			if (dead) return;
			const paypal = window.paypal;
			const host = document.querySelector(sel);
			if (!paypal || !host || host.childElementCount > 0) return;
			paypal.HostedButtons({ hostedButtonId: "T7AZ748Y27248" }).render(sel).catch(() => {
				if (!dead) setPaypalMsg("PayPal chưa hiện. Kiểm tra mạng rồi chạm lại.");
			});
		};
		if (document.getElementById("paypal-sdk-pho")) {
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
	async function takeFile(file) {
		setError("");
		setBusy(true);
		setProgress(.01);
		engineRef.current?.stop();
		cuRef.current?.stopAudio();
		try {
			stashFile(file);
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
			setError(msg && !/decode|encoding|unable/i.test(msg) ? msg : "Không đọc được file này. Dùng MP3, WAV, FLAC, M4A hoặc OGG.");
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
			""
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
		navigator.clipboard.writeText(MOMO_WALLET).then(() => setMomoMsg("Đã chép ví MoMo. Mở ứng dụng và dán."), () => setMomoMsg("Máy chặn bộ nhớ tạm. Mở MoMo trên máy này."));
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
			walletRef.current?.scrollIntoView({
				block: "nearest",
				behavior: "smooth"
			});
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "safe-app flex flex-col gap-1 bg-navy-950",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "zone-new frame-gold relative flex min-h-0 min-w-0 flex-col bg-navy-950",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "mb-2 flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm tracking-widest text-gold-500",
							children: mode === "file" ? "FILE" : mode === "sketch" ? "PHÁC 4:20" : "SẴN SÀNG"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl leading-none tracking-wide text-ink",
							children: "PHỔ VÀNG"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => fileRef.current?.click(),
								className: "inline-flex h-11 items-center gap-2 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
									className: "size-4",
									"aria-hidden": "true"
								}), "TẢI"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl tabular-nums text-gold-300",
								children: clock(mode === "idle" ? 0 : head)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "audio/*,.mp3,.wav,.flac,.m4a,.aac,.ogg,.opus,.webm",
						className: "hidden",
						suppressHydrationWarning: true,
						onChange: (e) => {
							const file = e.target.files?.[0];
							if (file) takeFile(file);
							e.target.value = "";
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 grid grid-cols-4 gap-1 rounded-full border border-line bg-navy-900 p-1",
						role: "tablist",
						children: PANES.map((item) => {
							const on = pane === item.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								role: "tab",
								"aria-selected": on,
								onClick: () => setPane(item.id),
								className: on ? "h-10 rounded-full bg-gold-500 font-display text-sm tracking-wide text-navy-950" : "h-10 rounded-full font-display text-sm tracking-wide text-ink",
								children: item.label
							}, item.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "min-w-0 text-sm text-muted",
							children: [
								"Kho ",
								CORPUS_COUNT,
								" mẫu · đỉnh ×",
								design.lift.toFixed(1),
								" · ",
								design.instrumental ? "khí nhạc" : "có lời",
								design.hits[0] ? ` · ${design.hits[0].vi}` : ""
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BonusCube, {
							pop: bonusPop,
							onOpen: onBonus
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-gold-300",
						children: error
					}) : null,
					pane === "do" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 rounded-lg border border-dashed border-gold-500 bg-navy-900 px-3 py-3",
							onDragOver: (e) => e.preventDefault(),
							onDrop: (e) => {
								e.preventDefault();
								const file = e.dataTransfer.files[0];
								if (file) takeFile(file);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Thả MP3, WAV, FLAC, M4A hoặc OGG. Đo trên máy, không gửi file đi."
								}),
								analysis ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-ink",
									children: [
										analysis.fileName,
										" · ",
										clock(analysis.duration),
										" · ",
										analysis.channels === 1 ? "mono" : "stereo",
										" ·",
										" ",
										Math.round(analysis.sampleRate / 1e3),
										" kHz"
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-gold-100",
									children: "Chưa có file. Prompt đang theo phổ mẫu."
								}),
								busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-1 overflow-hidden rounded-full bg-navy-800",
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1 bg-gold-500",
										style: { width: `${Math.round(progress * 100)}%` }
									})
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4",
							children: [
								["BPM gốc", String(source.bpm)],
								["BPM bản", String(design.bpm)],
								["Tông", source.keyName],
								["LUFS", source.lufs.toFixed(1)]
							].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-line bg-navy-900 px-2 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-wide text-muted uppercase",
									children: k
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl tabular-nums text-ink",
									children: v
								})]
							}, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpectrumCanvas, {
								bins: source.spectrum,
								active,
								getAnalyser
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs text-muted",
							children: "Vàng = đang nghe. Xanh đậm = phổ đã đo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RibbonCanvas, { points: source.ribbon }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 mb-3 flex flex-wrap gap-1",
							children: source.bands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full border border-line px-2 py-1 text-xs text-ink",
								children: [
									b.label,
									" ",
									b.db.toFixed(0)
								]
							}, b.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPane("prompt"),
							className: "mb-4 h-11 rounded-full border border-gold-500 px-4 font-display tracking-wide text-gold-500",
							children: "XEM PROMPT"
						})
					] }) : null,
					pane === "ban" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 font-display tracking-wide text-gold-500",
							children: "PHÒNG"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 flex gap-2 overflow-x-auto pb-1",
							children: VENUES.map((v) => {
								const on = v.id === venue;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setVenue(v.id),
									className: on ? "h-11 shrink-0 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950" : "h-11 shrink-0 rounded-full border border-line px-4 font-display tracking-wide text-ink",
									children: v.label
								}, v.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 font-display tracking-wide text-gold-500",
							children: "CHẤT ÂM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 flex flex-wrap gap-2",
							children: [
								["sub", "SIÊU TRẦM"],
								["bright", "SIÊU SÁNG"],
								["smooth", "SIÊU MƯỢT"],
								["drive", "SÔI ĐỘNG"]
							].map(([key, label]) => {
								const on = qualities[key];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": on,
									onClick: () => setQualities((q) => ({
										...q,
										[key]: !q[key]
									})),
									className: on ? "h-11 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950" : "h-11 rounded-full border border-line px-4 font-display tracking-wide text-ink",
									children: label
								}, key);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-sm text-muted",
							children: qualityLabel(qualities)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-3 grid grid-cols-2 gap-2",
							children: [
								[
									"Bass JBL",
									signed(design.chain.bassShelfDb),
									`${Math.round(design.chain.bassHz)} Hz`
								],
								[
									"Treble TOA",
									signed(design.chain.trebleDb),
									"5–8 kHz"
								],
								[
									"Lời Bose",
									signed(design.chain.vocalDb),
									`${Math.round(design.chain.vocalHz)} Hz`
								],
								[
									"Màu TOA",
									signed(design.chain.fluteDb),
									`${Math.round(design.chain.fluteHz)} Hz`
								]
							].map(([name, db, hz]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "rounded-md border border-line bg-navy-900 px-3 py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display tracking-wide text-gold-300",
										children: name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-2xl tabular-nums text-ink",
										children: db
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: hz
									})
								]
							}, name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 font-display tracking-wide text-gold-500",
							children: "BẢN 4:20"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative mb-2 flex h-16 overflow-x-auto rounded-md border border-line",
							children: design.sections.map((s) => {
								const here = head >= s.start && head < s.end && mode === "sketch";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => void onSketch(s.start),
									className: here ? "flex min-w-16 flex-col justify-end bg-gold-500 px-1 pb-1 text-left text-navy-950" : "flex min-w-16 flex-col justify-end border-r border-line bg-navy-900 px-1 pb-1 text-left text-ink",
									style: { flexGrow: s.end - s.start },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-xs",
										children: s.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tabular-nums",
										children: clock(s.start)
									})]
								}, s.name);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-sm text-muted",
							children: "Chạm một đoạn để nghe phác thảo từ đó."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mb-4 space-y-1 text-sm text-ink",
							children: design.notes.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
						})
					] }) : null,
					pane === "prompt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mb-3 space-y-1",
							children: design.hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-baseline justify-between gap-2 rounded-md border border-line bg-navy-900 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-ink",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display tracking-wide text-gold-300",
											children: hit.role
										}),
										" ",
										hit.vi,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [" · ", hit.region]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display tabular-nums text-gold-300",
									children: [Math.round(hit.p * 100), "%"]
								})]
							}, hit.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 text-sm text-muted",
							children: [
								design.instrumental ? "Phổ này viết khí nhạc, không đặt ca sĩ." : "Phổ còn dải lời: giọng Việt hát, khí nhạc đệm.",
								" ",
								"Khung chuẩn: nhịp, màu giai điệu, kèn, lời, mix, mốc 4:20.",
								qualities.drive ? " Khóa 145 BPM, sôi động ngay từ đầu." : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display tracking-wide text-gold-500",
								children: "PROMPT SUNO V6"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display tabular-nums text-gold-300",
								children: [
									design.prompt.length,
									"/",
									995
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							readOnly: true,
							tabIndex: -1,
							spellCheck: false,
							rows: 8,
							value: design.prompt,
							translate: "no",
							className: "notranslate mb-2 w-full rounded-md border border-line bg-navy-900 p-3 text-sm leading-relaxed text-ink",
							"aria-label": "Prompt Suno 995 ký tự"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void onCopy(),
								className: "inline-flex h-11 items-center gap-2 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
									className: "size-4",
									"aria-hidden": "true"
								}), copied ? "ĐÃ CHÉP" : "CHÉP PROMPT"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: onDownload,
								className: "inline-flex h-11 items-center gap-2 rounded-full border border-gold-500 px-4 font-display tracking-wide text-gold-500",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
									className: "size-4",
									"aria-hidden": "true"
								}), "TẢI BẢN"]
							})]
						})
					] }) : null,
					pane === "ho" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: walletRef,
						className: walletFlash ? "wallet-live mb-6" : "mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 font-display tracking-wide text-gold-500",
								children: "PAYPAL · MOMO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: onMomo,
									"aria-label": "Ủng hộ bằng MoMo",
									className: "flex flex-col items-center justify-center gap-2 rounded-md border border-line bg-navy-900 px-3 py-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MomoMark, { className: "size-16" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display tracking-widest text-gold-300",
											children: "MOMO"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted",
											children: "Chạm biểu tượng để chép ví"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-md border border-line bg-navy-900 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mb-2 font-display tracking-wide text-gold-300",
											children: "PAYPAL"
										}),
										!paypalOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setPaypalMsg("");
												setPaypalOn(true);
											},
											className: "h-11 rounded-full border border-gold-500 px-4 font-display tracking-wide text-gold-500",
											children: "MỞ PAYPAL"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											id: "paypal-container-T7AZ748Y27248",
											className: "min-h-11 overflow-hidden"
										}),
										paypalMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-gold-100",
											children: paypalMsg
										}) : null
									]
								})]
							}),
							momoMsg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-gold-100",
								children: momoMsg
							}) : null
						]
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-gold-500 bg-navy-900 px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display tracking-widest text-gold-500",
						children: "NGAME"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: ["LOA3 ×", (design.chain.loa3 * level).toFixed(2)]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void onPlayFile(),
							className: "inline-flex h-11 items-center gap-2 rounded-full bg-gold-500 px-4 font-display tracking-wide text-navy-950",
							children: [mode === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), mode === "file" ? "DỪNG FILE" : "NGHE FILE"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void onSketch(0),
							className: "inline-flex h-11 items-center gap-2 rounded-full border border-gold-500 px-4 font-display tracking-wide text-gold-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
								className: "size-4",
								"aria-hidden": "true"
							}), "PHÁC 4:20"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onStop,
							className: "inline-flex h-11 items-center gap-2 rounded-full border border-line px-4 font-display tracking-wide text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {
								className: "size-4",
								"aria-hidden": "true"
							}), "NGẮT"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-w-32 flex-1 items-center gap-2 text-xs text-muted",
							children: ["Mức", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: .4,
								max: 1.4,
								step: .02,
								value: level,
								suppressHydrationWarning: true,
								onChange: (e) => setLevel(Number(e.target.value)),
								"aria-label": "Mức nghe LOA3"
							})]
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CuDock, {
			ref: cuRef,
			onExclusive: () => engineRef.current?.stop()
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoApp, {});
}
//#endregion
export { Home as component };
