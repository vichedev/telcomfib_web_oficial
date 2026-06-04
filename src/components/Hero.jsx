/**
 * Hero.jsx — Telcomfib v4 (limpio e intuitivo)
 *
 * Hero minimalista centrado en una sola acción: contratar por WhatsApp.
 * Logo protagonista + frase clara + 2 botones.
 * Una sola animación de fibra muy tenue de fondo ("un toque").
 * Soporta modo claro y oscuro.
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import logoImg from "../assets/telcomfib_logotipo.png";

const WHATSAPP_URL =
  "https://wa.me/593986083855?text=Hola,%20quiero%20contratar%20internet%20de%20fibra%20%C3%B3ptica%20con%20Telcomfib";

/* ─── Fibra óptica de fondo (muy tenue) ───────────────────────────────────── */
function FiberCanvas({ isDark }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const G = "#00D278",
      B = "#0058CC";
    let W, H, aId, fibers = [];

    const rz = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", rz);
    rz();

    class Fiber {
      constructor() {
        this.r();
      }
      r() {
        this.x = Math.random() * W;
        this.y = Math.random() < 0.5 ? -40 : H + 40;
        this.tx = Math.random() * W;
        this.ty = this.y > 0 ? -40 : H + 40;
        this.sp = Math.random() * 0.9 + 0.3;
        this.a = Math.random() * 0.06 + 0.02;
        this.c = Math.random() > 0.4 ? G : B;
        this.t = 0;
        this.cu = (Math.random() - 0.5) * 200;
      }
      tick() {
        this.t += this.sp * 0.004;
        if (this.t > 1.2) this.r();
      }
      draw() {
        const t = Math.min(this.t, 1),
          t0 = Math.max(0, t - 0.1);
        const x = this.x + (this.tx - this.x) * t + this.cu * Math.sin(t * Math.PI);
        const y = this.y + (this.ty - this.y) * t;
        const x0 = this.x + (this.tx - this.x) * t0 + this.cu * Math.sin(t0 * Math.PI);
        const y0 = this.y + (this.ty - this.y) * t0;
        const mult = isDark ? 1 : 1.6;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x, y);
        ctx.strokeStyle = this.c;
        ctx.lineWidth = 1;
        ctx.globalAlpha = this.a * mult * (1 - Math.abs(t - 0.5) * 1.6);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < 12; i++) {
      const f = new Fiber();
      f.t = Math.random();
      fibers.push(f);
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
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
  }, [isDark]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}

/* ─── Hero Principal ─────────────────────────────────────────────────────── */
export default function Hero() {
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

  const isDark = theme === "dark";

  const scrollToPlanes = () => {
    const el = document.getElementById("planes");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-white to-emerald-50/40"
      }`}
    >
      {/* Resplandor suave detrás del contenido */}
      <div
        className={`absolute inset-0 z-0 ${
          isDark
            ? "bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(0,210,120,0.10),transparent)]"
            : "bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(0,210,120,0.14),transparent)]"
        }`}
      />

      {/* Fibra óptica muy tenue */}
      <FiberCanvas isDark={isDark} />

      {/* Contenido principal — centrado */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-3xl mx-auto py-24">
        {/* Badge */}
        <motion.div
          {...fadeUp(0.1)}
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium tracking-wide mb-10 ${
            isDark
              ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/5"
              : "border-emerald-500/40 text-emerald-700 bg-white/60"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_9px_#00D278] animate-pulse" />
          Fibra óptica · Ecuador
        </motion.div>

        {/* Logo protagonista */}
        <motion.img
          src={logoImg}
          alt="Telcomfib"
          initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className={`w-[clamp(260px,42vw,460px)] h-auto mb-8 ${
            isDark
              ? "drop-shadow-[0_0_55px_rgba(0,210,120,0.30)]"
              : "drop-shadow-[0_0_45px_rgba(0,210,120,0.22)]"
          }`}
        />

        {/* Titular claro */}
        <motion.h1
          {...fadeUp(0.35)}
          className={`font-manrope text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-5 ${
            isDark ? "text-slate-100" : "text-slate-800"
          }`}
        >
          Internet a la{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent font-extrabold">
            velocidad de la luz
          </span>
        </motion.h1>

        {/* Subtítulo simple */}
        <motion.p
          {...fadeUp(0.5)}
          className={`text-[clamp(15px,1.4vw,18px)] leading-relaxed max-w-xl mb-10 ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Fibra óptica simétrica de hasta{" "}
          <span className="font-semibold text-emerald-500">1 Gbps</span>. Sin
          permanencia y con soporte{" "}
          <span className="font-semibold text-emerald-500">24/7</span>.
        </motion.p>

        {/* Botones — WhatsApp principal */}
        <motion.div
          {...fadeUp(0.65)}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-manrope text-base font-semibold text-white shadow-lg shadow-emerald-500/25 bg-gradient-to-r from-emerald-500 to-emerald-600 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <svg
              className="relative"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="relative">Contratar por WhatsApp</span>
          </motion.a>

          <motion.button
            onClick={scrollToPlanes}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-manrope text-base font-medium transition-colors ${
              isDark
                ? "border border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-white bg-white/5"
                : "border border-slate-300 text-slate-700 hover:border-emerald-500/60 hover:text-slate-900 bg-white/70"
            }`}
          >
            Ver Planes
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
