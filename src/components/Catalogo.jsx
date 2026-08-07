/**
 * Catalogo.jsx — Zona de Publicidad / Catálogo Digital de Telcomfib
 *
 * Carrusel animado de anuncios, promociones y flyers.
 * Cualquier proporción de imagen funciona (vertical u horizontal).
 *
 * 🔧 PARA AGREGAR PUBLICIDAD:
 *   1. Sube tu imagen a la carpeta:  public/Publicidad/
 *   2. Añade una entrada al array `slides` de abajo.
 * ¡Eso es todo! El carrusel se encarga del resto.
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import Galeria from "./Galeria";

const WHATSAPP =
  "https://wa.me/593986083855?text=Hola,%20vi%20su%20publicidad%20y%20quiero%20más%20información";

/* 🔧 TUS ANUNCIOS — agrega/edita aquí. (Pon las imágenes en public/Publicidad/) */
const slides = [
  {
    src: "/Publicidad/flyer-internet.png",
    alt: "Planes de Internet 100% Fibra Óptica",
    titulo: "100% Fibra Óptica",
    subtitulo: "Planes desde $20.75 · Instalación gratis",
    link: WHATSAPP,
  },
  {
    src: "/Planes/1giga.png",
    alt: "Plan Turbo 1 Giga",
    titulo: "Plan Turbo · 1 GIGA",
    subtitulo: "La velocidad de la luz en tu hogar",
    link: WHATSAPP,
  },
  {
    src: "/Planes/600megas.png",
    alt: "Plan Avanzado 600 Megas",
    titulo: "Plan Avanzado · 600 MEGAS",
    subtitulo: "Ideal para gaming y streaming 4K",
    link: WHATSAPP,
  },
  {
    src: "/Planes/400megas.png",
    alt: "Plan Básico 400 Megas",
    titulo: "Plan Básico · 400 MEGAS",
    subtitulo: "Conéctate desde $20.75 al mes",
    link: WHATSAPP,
  },
];

const AUTOPLAY_MS = 5000;

/* Variantes de animación del slide */
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.95 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.95 }),
};

const Catalogo = () => {
  const [[index, dir], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const timerRef = useRef(null);

  const count = slides.length;
  const current = slides[index];

  const paginate = useCallback(
    (newDir) => {
      setState(([prev]) => [(prev + newDir + count) % count, newDir]);
    },
    [count],
  );

  const goTo = (i) => setState(([prev]) => [i, i > prev ? 1 : -1]);

  /* Autoplay */
  useEffect(() => {
    if (paused || lightbox || count <= 1) return;
    timerRef.current = setTimeout(() => paginate(1), AUTOPLAY_MS);
    return () => clearTimeout(timerRef.current);
  }, [index, paused, lightbox, paginate, count]);

  /* Teclado: ← → y Esc */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  return (
    <section
      id="catalogo"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-hidden relative"
    >
      {/* Decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-mono tracking-wider">
              CATÁLOGO DIGITAL
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Promociones & Anuncios
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Descubre nuestras últimas ofertas de fibra óptica.
          </p>
        </motion.div>

        {/* ═══ CARRUSEL ═══ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Marco con glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/40 to-blue-500/40 rounded-[2rem] blur-lg opacity-60" />

          <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl">
            {/* Escenario del carrusel */}
            <div className="relative h-[440px] sm:h-[520px] md:h-[600px] w-full">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.div
                  key={index}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 260, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.4 },
                  }}
                  className="absolute inset-0"
                >
                  {/* Fondo difuminado (rellena los lados de cualquier proporción) */}
                  <div
                    className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-40"
                    style={{ backgroundImage: `url(${current.src})` }}
                  />
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Placeholder de fondo (visible solo si la imagen falla) */}
                  <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center text-center px-8">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                      <svg
                        className="w-10 h-10 text-white/70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-white font-bold text-lg">
                      {current.titulo}
                    </p>
                    <p className="text-white/60 text-sm mt-1 font-mono">
                      Sube la imagen a: public{current.src}
                    </p>
                  </div>

                  {/* Imagen principal (Ken Burns) — tapa al placeholder si carga */}
                  <motion.img
                    src={current.src}
                    alt={current.alt}
                    onClick={() => setLightbox(true)}
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    className="relative z-10 w-full h-full object-contain cursor-zoom-in"
                  />

                  {/* Texto overlay (título / subtítulo) */}
                  {(current.titulo || current.subtitulo) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    >
                      {current.titulo && (
                        <h3 className="text-2xl md:text-4xl font-black text-white drop-shadow-lg">
                          {current.titulo}
                        </h3>
                      )}
                      {current.subtitulo && (
                        <p className="text-emerald-300 text-sm md:text-lg font-semibold mt-1">
                          {current.subtitulo}
                        </p>
                      )}
                      {current.link && (
                        <a
                          href={current.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg hover:scale-105 transition-transform"
                        >
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                          </svg>
                          Más información
                        </a>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Flechas */}
              {count > 1 && (
                <>
                  <button
                    onClick={() => paginate(-1)}
                    aria-label="Anterior"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    aria-label="Siguiente"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Barra de progreso del autoplay */}
              {count > 1 && !paused && !lightbox && (
                <motion.div
                  key={`bar-${index}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-30"
                />
              )}
            </div>
          </div>

          {/* Indicadores (dots) */}
          {count > 1 && (
            <div className="flex items-center justify-center gap-2.5 mt-6">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ir a la diapositiva ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-8 bg-emerald-500"
                      : "w-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-emerald-400"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Miniaturas */}
        {count > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-4xl mx-auto">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  i === index
                    ? "ring-2 ring-emerald-500 scale-105"
                    : "ring-1 ring-slate-200 dark:ring-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  onError={(e) => (e.currentTarget.style.opacity = "0")}
                  className="w-full h-full object-cover bg-slate-800"
                />
              </button>
            ))}
          </div>
        )}

        {/* ═══ GALERÍA DINÁMICA ═══ */}
        <Galeria />
      </div>

      {/* ═══ LIGHTBOX (pantalla completa) ═══ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Cerrar"
              className="absolute top-6 right-6 text-white hover:text-emerald-400 transition-colors"
            >
              <svg
                className="w-9 h-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <motion.img
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={current.src}
              alt={current.alt}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[90vh] object-contain rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Catalogo;
