/**
 * Hero.jsx — Telcomfib v3 con Tailwind CSS
 *
 * Modo oscuro y claro refinado
 * Todos los elementos decorativos visibles en ambos modos
 * Logo siempre visible y por encima de todo
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../assets/telcomfib_logotipo.png";

/* ─── Canvas fibra óptica ─────────────────────────────────────────────────── */
function FiberCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const G = "#00D278",
      B = "#0058CC";
    let W,
      H,
      aId,
      pts = [],
      fibers = [];

    const rz = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", rz);
    rz();

    class Pt {
      constructor() {
        this.r();
      }
      r() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.rad = Math.random() * 1.2 + 0.4;
        this.a = Math.random() * 0.25 + 0.06;
        this.c = Math.random() > 0.5 ? G : B;
      }
      tick() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.r();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
        ctx.fillStyle = this.c;
        ctx.globalAlpha = this.a;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    class Fiber {
      constructor() {
        this.r();
      }
      r() {
        this.x = Math.random() * W;
        this.y = Math.random() < 0.5 ? -40 : H + 40;
        this.tx = Math.random() * W;
        this.ty = this.y > 0 ? -40 : H + 40;
        this.sp = Math.random() * 1.1 + 0.4;
        this.a = Math.random() * 0.16 + 0.04;
        this.c = Math.random() > 0.4 ? G : B;
        this.t = 0;
        this.cu = (Math.random() - 0.5) * 180;
      }
      tick() {
        this.t += this.sp * 0.005;
        if (this.t > 1.2) this.r();
      }
      draw() {
        const t = Math.min(this.t, 1),
          t0 = Math.max(0, t - 0.08);
        const x =
          this.x + (this.tx - this.x) * t + this.cu * Math.sin(t * Math.PI);
        const y = this.y + (this.ty - this.y) * t;
        const x0 =
          this.x + (this.tx - this.x) * t0 + this.cu * Math.sin(t0 * Math.PI);
        const y0 = this.y + (this.ty - this.y) * t0;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x, y);
        ctx.strokeStyle = this.c;
        ctx.lineWidth = 1;
        ctx.globalAlpha = this.a * (1 - Math.abs(t - 0.5) * 1.6);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.c;
        ctx.globalAlpha = this.a * 2;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < 60; i++) pts.push(new Pt());
    for (let i = 0; i < 24; i++) {
      const f = new Fiber();
      f.t = Math.random();
      fibers.push(f);
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x,
            dy = pts[i].y - pts[j].y,
            d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = G;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = (1 - d / 90) * 0.08;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      pts.forEach((p) => {
        p.tick();
        p.draw();
      });
      fibers.forEach((f) => {
        f.tick();
        f.draw();
      });
      aId = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("resize", rz);
      cancelAnimationFrame(aId);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
    />
  );
}

/* ─── Velocímetro ───────────────────────────────────────────────────────── */
function SpeedCounter({ delay = 0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const target = 943,
      startAt = Date.now() + delay;
    const tick = () => {
      const now = Date.now();
      if (now < startAt) {
        requestAnimationFrame(tick);
        return;
      }
      const p = Math.min((now - startAt) / 2000, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [delay]);
  return <>{val}</>;
}

/* ─── Hero Principal ─────────────────────────────────────────────────────── */
export default function Hero() {
  const [phase, setPhase] = useState("intro");
  const [sweep, setSweep] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light";
  });

  useEffect(() => {
    const t1 = setTimeout(() => setSweep(true), 1500);
    const t2 = setTimeout(() => setPhase("hero"), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Escuchar cambios de tema
  useEffect(() => {
    const handleThemeChange = () => {
      const newTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleThemeChange);
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", handleThemeChange);
      observer.disconnect();
    };
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 26, filter: "blur(7px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  });

  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50/30"
      }`}
    >
      {/* Capas de fondo - Grid y efectos visibles en ambos modos */}
      <div className="absolute inset-0 z-0">
        {/* Radial gradient */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,210,120,0.05),transparent)]"
              : "bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(0,210,120,0.12),transparent)]"
          }`}
        />

        {/* Grid - Más visible en modo claro */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(rgba(0,210,120,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,210,120,0.03)_1px,transparent_1px)] bg-[size:64px_64px] ${
            isDark ? "opacity-100" : "opacity-60"
          }`}
        />

        {/* Scanlines - Más visibles en modo claro */}
        <div
          className={`absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.02)_0px,rgba(0,0,0,0.02)_1px,transparent_1px,transparent_3px)] ${
            isDark ? "opacity-100" : "opacity-40"
          }`}
        />
      </div>

      <FiberCanvas />

      {/* Líneas decorativas horizontales */}
      <div
        className={`absolute top-1/2 left-0 right-0 h-px z-[3] pointer-events-none ${
          isDark
            ? "bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
            : "bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
        }`}
      />

      {/* Líneas diagonales decorativas */}
      <div
        className={`absolute right-[48%] top-[-10%] bottom-[-10%] w-px z-[3] pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/25 to-transparent rotate-[9deg] ${
          isDark ? "opacity-100" : "opacity-70"
        }`}
      />
      <div
        className={`absolute right-[52%] top-[-10%] bottom-[-10%] w-px z-[3] pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent rotate-[9deg] ${
          isDark ? "opacity-100" : "opacity-60"
        }`}
      />

      {/* Anillos orbitales - Más visibles en modo claro */}
      {phase === "hero" && (
        <div className="absolute right-[4%] top-1/2 -translate-y-1/2 z-[3] pointer-events-none w-[540px] h-[540px] max-lg:hidden">
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[330px] h-[330px] rounded-full border animate-[spin_25s_linear_infinite] ${
              isDark ? "border-emerald-500/10" : "border-emerald-500/25"
            }`}
          />
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border animate-[spin_42s_linear_infinite_reverse] ${
              isDark ? "border-blue-500/10" : "border-blue-500/20"
            }`}
          />
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[525px] h-[525px] rounded-full border animate-[spin_65s_linear_infinite] ${
              isDark ? "border-emerald-500/10" : "border-emerald-500/20"
            }`}
          />
        </div>
      )}

      {/* Esquinas decorativas - Más visibles en modo claro */}
      {[
        ["tl", "M0 28 L0 0 L28 0", "top-10 left-10"],
        ["tr", "M28 28 L28 0 L0 0", "top-10 right-10"],
        ["bl", "M0 0 L0 28 L28 28", "bottom-10 left-10"],
        ["br", "M28 0 L28 28 L0 28", "bottom-10 right-10"],
      ].map(([pos, d, position]) => (
        <div
          key={pos}
          className={`absolute z-[4] pointer-events-none ${position}`}
        >
          <svg width="28" height="28" fill="none">
            <path
              d={d}
              stroke={isDark ? "rgba(0,210,120,0.35)" : "rgba(0,210,120,0.6)"}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      ))}

      {/* Tags técnicos - MUCHO más visibles en modo claro */}
      <div
        className={`absolute z-[5] text-[9px] font-mono tracking-wide uppercase pointer-events-none ${
          isDark ? "text-emerald-500/40" : "text-emerald-600/70 font-semibold"
        } top-[3.8rem] left-[6.5rem] max-lg:hidden`}
      >
        SYS://TELCOMFIB.NET
      </div>
      <div
        className={`absolute z-[5] text-[9px] font-mono tracking-wide uppercase pointer-events-none ${
          isDark ? "text-emerald-500/40" : "text-emerald-600/70 font-semibold"
        } top-[3.8rem] right-[6.5rem] text-right max-lg:hidden`}
      >
        LAT: -1.8312 · LON: -78.1834
      </div>
      <div
        className={`absolute z-[5] text-[9px] font-mono tracking-wide uppercase pointer-events-none ${
          isDark ? "text-emerald-500/40" : "text-emerald-600/70 font-semibold"
        } bottom-[3.8rem] left-[6.5rem] max-lg:hidden`}
      >
        VER 3.2.1 · BUILD 2024
      </div>
      <div
        className={`absolute z-[5] text-[9px] font-mono tracking-wide uppercase pointer-events-none ${
          isDark ? "text-emerald-500/40" : "text-emerald-600/70 font-semibold"
        } bottom-[3.8rem] right-[6.5rem] text-right max-lg:hidden`}
      >
        FIBRA ÓPTICA · ECUADOR
      </div>

      {/* INTRO */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center"
            exit={{
              opacity: 0,
              transition: { duration: 0.65, ease: [0.65, 0, 0.35, 1] },
            }}
          >
            <motion.div
              className="flex flex-col items-center gap-2.5 relative"
              initial={{ opacity: 0, scale: 0.42, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className={`absolute w-[200px] h-[200px] rounded-full border ${
                  isDark ? "border-emerald-500/25" : "border-emerald-500/40"
                }`}
                initial={{ opacity: 0.8, scale: 0.8 }}
                animate={{ opacity: 0, scale: 2.5 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              />
              <img
                src={logoImg}
                alt="Telcomfib"
                className="w-[clamp(280px,38vw,520px)] h-auto"
                style={{
                  filter: `drop-shadow(0 0 70px ${isDark ? "rgba(0,210,120,0.25)" : "rgba(0,210,120,0.35)"})`,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SWEEP - Barrido de luz */}
      {sweep && (
        <div className="absolute inset-0 z-25 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-0 bottom-0 left-[-55%] w-[50%] animate-[sweep_0.9s_cubic-bezier(0.4,0,0.2,1)_forwards] ${
              isDark
                ? "bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent"
                : "bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent"
            }`}
          />
        </div>
      )}

      {/* LAYOUT HERO */}
      <AnimatePresence>
        {phase === "hero" && (
          <>
            {/* Layout principal */}
            <div className="relative z-10 w-full max-w-[1340px] mx-auto px-5 md:px-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-0 min-h-screen py-20 lg:py-0">
              {/* Divisor central - Más visible en modo claro */}
              <div
                className={`hidden lg:block absolute left-1/2 top-[12%] bottom-[12%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-500 to-transparent ${
                  isDark ? "opacity-20" : "opacity-40"
                }`}
              />

              {/* Columna izquierda - Textos */}
              <div className="flex flex-col justify-center items-start lg:pr-[4.5rem] text-center lg:text-left">
                <motion.div
                  {...fadeUp(0.25)}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border ${
                    isDark
                      ? "border-emerald-500/30 text-emerald-500"
                      : "border-emerald-500/50 text-emerald-600 bg-white/30"
                  } text-[10px] font-mono font-medium tracking-wider mb-6`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_9px_#00D278] animate-pulse" />
                  Red Activa · Fibra Simétrica
                </motion.div>

                <motion.div
                  {...fadeUp(0.38)}
                  className={`text-[11px] font-mono tracking-[0.22em] uppercase mb-4 ${
                    isDark
                      ? "text-emerald-500/50"
                      : "text-emerald-600/70 font-semibold"
                  }`}
                >
                  Proveedor de Internet · Ecuador
                </motion.div>

                <motion.h1
                  {...fadeUp(0.52)}
                  className={`font-manrope text-[clamp(2.9rem,4.6vw,5.6rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-6 ${
                    isDark ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  <span className="font-medium">Conecta tu</span>
                  <br />
                  mundo a la
                  <br />
                  <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent font-extrabold">
                    velocidad
                    <br />
                    de la luz.
                  </span>
                </motion.h1>

                <motion.p
                  {...fadeUp(0.66)}
                  className={`text-[clamp(12px,0.95vw,14px)] font-normal leading-relaxed max-w-md mb-8 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Internet de{" "}
                  <span className="font-semibold text-emerald-500">
                    fibra óptica simétrica
                  </span>{" "}
                  hasta{" "}
                  <span className="font-semibold text-emerald-500">1 Gbps</span>
                  . Latencia &lt;
                  <span className="font-semibold text-emerald-500">5ms</span>,
                  soporte{" "}
                  <span className="font-semibold text-emerald-500">24/7</span> y
                  sin permanencia. Llevamos el futuro a tu hogar y empresa.
                </motion.p>

                <motion.div
                  {...fadeUp(0.78)}
                  className="flex border rounded-lg overflow-hidden w-fit mb-8"
                >
                  {[
                    ["1 Gbps", "VELOCIDAD"],
                    ["< 5ms", "LATENCIA"],
                    ["99.9%", "UPTIME"],
                  ].map(([n, l]) => (
                    <div
                      key={l}
                      className={`px-5 py-3 text-center border-r last:border-r-0 ${
                        isDark ? "border-slate-700/50" : "border-slate-200"
                      }`}
                    >
                      <span
                        className={`block font-manrope text-[1.75rem] font-bold leading-none mb-1 ${
                          isDark ? "text-emerald-500" : "text-emerald-600"
                        }`}
                      >
                        {n}
                      </span>
                      <span
                        className={`block text-[9px] font-mono font-medium tracking-wide ${
                          isDark ? "text-slate-500" : "text-slate-400"
                        }`}
                      >
                        {l}
                      </span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  {...fadeUp(0.9)}
                  className="flex gap-3 flex-wrap justify-center lg:justify-start"
                >
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative px-8 py-3.5 rounded-lg font-manrope text-sm font-semibold tracking-wide overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative flex items-center gap-2">
                      Ver Planes
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-7 py-3.5 rounded-lg font-manrope text-sm font-medium tracking-wide transition-all ${
                      isDark
                        ? "border border-slate-700 text-slate-400 hover:border-emerald-500/50 hover:text-slate-300"
                        : "border border-slate-300 text-slate-600 hover:border-emerald-500/70 hover:text-slate-800 bg-white/50"
                    }`}
                  >
                    Soporte Técnico
                  </motion.button>
                </motion.div>
              </div>

              {/* Columna derecha - Logo (siempre visible y por encima) */}
              <div className="relative flex items-center justify-center lg:pl-8 z-[50]">
                {/* Halo decorativo detrás del logo - Más visible en claro */}
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full pointer-events-none animate-[pulse_4s_ease_infinite] ${
                    isDark
                      ? "bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,210,120,0.1),transparent)]"
                      : "bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(0,210,120,0.2),transparent)]"
                  }`}
                />

                {/* Card velocidad flotante */}
                <motion.div
                  {...fadeUp(1.1)}
                  className={`absolute -left-8 top-1/3 w-[152px] rounded-xl p-4 backdrop-blur-sm z-10 ${
                    isDark
                      ? "bg-white/5 border border-emerald-500/20"
                      : "bg-white/80 border border-emerald-500/30 shadow-lg"
                  } max-md:hidden`}
                >
                  <div
                    className={`text-[9px] font-mono tracking-wide uppercase mb-1.5 ${
                      isDark ? "text-slate-500" : "text-slate-500 font-medium"
                    }`}
                  >
                    Velocidad actual
                  </div>
                  <div
                    className={`font-manrope text-3xl font-bold leading-none mb-0.5 ${
                      isDark ? "text-emerald-500" : "text-emerald-600"
                    }`}
                  >
                    <SpeedCounter delay={2800} />
                  </div>
                  <div
                    className={`text-[9px] tracking-wide ${
                      isDark ? "text-emerald-500/45" : "text-emerald-600/60"
                    }`}
                  >
                    MBPS DOWN
                  </div>
                </motion.div>

                {/* Logo principal - z-index alto para estar sobre todo */}
                <motion.div
                  className="relative flex flex-col items-center gap-3 z-[100]"
                  initial={{
                    opacity: 0,
                    x: 40,
                    scale: 0.9,
                    filter: "blur(8px)",
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.95,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15,
                  }}
                >
                  <img
                    src={logoImg}
                    alt="Telcomfib"
                    className={`w-[clamp(280px,30vw,420px)] h-auto relative transition-all duration-300 ${
                      isDark
                        ? "drop-shadow-[0_0_50px_rgba(0,210,120,0.3)] drop-shadow-[0_0_100px_rgba(0,88,204,0.2)]"
                        : "drop-shadow-[0_0_40px_rgba(0,210,120,0.25)]"
                    }`}
                  />

                  <div
                    className={`flex items-center gap-3 w-full text-[10px] font-mono tracking-[0.25em] uppercase ${
                      isDark
                        ? "text-emerald-500/50"
                        : "text-emerald-600/70 font-semibold"
                    }`}
                  >
                    <div
                      className={`flex-1 h-px bg-gradient-to-r ${
                        isDark
                          ? "from-emerald-500/30 to-transparent"
                          : "from-emerald-500/50 to-transparent"
                      }`}
                    />
                    <span>Ecuador</span>
                    <div
                      className={`flex-1 h-px bg-gradient-to-l ${
                        isDark
                          ? "from-emerald-500/30 to-transparent"
                          : "from-emerald-500/50 to-transparent"
                      }`}
                    />
                  </div>

                  <div
                    className={`flex items-center gap-2 text-[10px] tracking-wide ${
                      isDark ? "text-slate-500" : "text-slate-500 font-medium"
                    }`}
                  >
                    <div className="flex items-end gap-0.5 h-3.5">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-emerald-500 rounded-full animate-[signal_1.7s_ease_infinite]"
                          style={{
                            height: `${4 + i * 2}px`,
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                      ))}
                    </div>
                    Red activa
                  </div>
                </motion.div>

                {/* Card ping flotante */}
                <motion.div
                  {...fadeUp(1.25)}
                  className={`absolute -right-8 bottom-1/3 w-[145px] rounded-xl p-4 backdrop-blur-sm z-10 ${
                    isDark
                      ? "bg-white/5 border border-blue-500/20"
                      : "bg-white/80 border border-blue-500/30 shadow-lg"
                  } max-md:hidden`}
                >
                  {[
                    ["PING", "3 ms"],
                    ["JITTER", "0.4 ms"],
                    ["UPTIME", "99.9%"],
                    ["NODOS", "5 activos"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between items-center py-1 border-b last:border-b-0 border-white/10"
                    >
                      <span
                        className={`text-[9px] tracking-wide ${
                          isDark
                            ? "text-slate-500"
                            : "text-slate-500 font-medium"
                        }`}
                      >
                        {k}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isDark ? "text-emerald-500" : "text-emerald-600"
                        }`}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Scroll hint */}
            <motion.div
              className={`absolute bottom-8 left-20 z-10 flex items-center gap-3 text-[10px] tracking-wide ${
                isDark ? "text-slate-500" : "text-slate-500 font-medium"
              } max-lg:hidden`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div
                className={`w-9 h-px bg-gradient-to-r ${
                  isDark
                    ? "from-emerald-500/50 to-transparent"
                    : "from-emerald-600/60 to-transparent"
                }`}
              />
              Scroll
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes sweep {
          from { transform: translateX(0); }
          to { transform: translateX(310%); }
        }
        @keyframes signal {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.07; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-[sweep_0.9s_cubic-bezier(0.4,0,0.2,1)_forwards] {
          animation: sweep 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-[signal_1.7s_ease_infinite] {
          animation: signal 1.7s ease infinite;
        }
        .animate-[pulse_4s_ease_infinite] {
          animation: pulse 4s ease infinite;
        }
        .animate-[spin_25s_linear_infinite] {
          animation: spin 25s linear infinite;
        }
        .animate-[spin_42s_linear_infinite_reverse] {
          animation: spin 42s linear infinite reverse;
        }
        .animate-[spin_65s_linear_infinite] {
          animation: spin 65s linear infinite;
        }
      `}</style>
    </div>
  );
}
