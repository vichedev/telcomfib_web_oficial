/**
 * Galeria.jsx — Galería dinámica de Telcomfib
 *
 * Muestra en un mosaico animado todo el material gráfico de la empresa
 * (flyers, planes, certificados, medios de pago) con filtros por categoría,
 * efecto hover y visor a pantalla completa con navegación por teclado.
 *
 * 🔧 PARA AGREGAR UNA IMAGEN:
 *   1. Súbela a public/ (ej: public/Publicidad/mi-flyer.png)
 *   2. Añade una entrada al array `imagenes` con su categoría.
 *   Las categorías del filtro se generan solas a partir del array.
 */

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* 🔧 CONTENIDO DE LA GALERÍA */
const imagenes = [
  {
    src: "/Publicidad/flyer-internet.png",
    titulo: "100% Fibra Óptica",
    descripcion: "Planes de internet para hogar y empresa",
    categoria: "Promociones",
  },
  {
    src: "/Planes/1giga.png",
    titulo: "Plan Turbo · 1 Giga",
    descripcion: "La máxima velocidad de nuestra red",
    categoria: "Planes",
  },
  {
    src: "/Planes/700megas.png",
    titulo: "Plan Élite · 700 Megas",
    descripcion: "Para hogares con muchos dispositivos",
    categoria: "Planes",
  },
  {
    src: "/Planes/600megas.png",
    titulo: "Plan Avanzado · 600 Megas",
    descripcion: "Ideal para gaming y streaming 4K",
    categoria: "Planes",
  },
  {
    src: "/Planes/500megas.png",
    titulo: "Plan Full · 500 Megas",
    descripcion: "Equilibrio perfecto entre precio y velocidad",
    categoria: "Planes",
  },
  {
    src: "/Planes/400megas.png",
    titulo: "Plan Básico · 400 Megas",
    descripcion: "Conéctate desde $20.75 al mes",
    categoria: "Planes",
  },
  {
    src: "/Arcotel/calidad_banner.png",
    titulo: "Parámetros de Calidad",
    descripcion: "Indicadores reportados a ARCOTEL",
    categoria: "Calidad",
  },
  {
    src: "/Bancos/Pichincha.png",
    titulo: "Banco Pichincha",
    descripcion: "Medio de pago habilitado",
    categoria: "Pagos",
  },
  {
    src: "/Bancos/Guayaquil.png",
    titulo: "Banco Guayaquil",
    descripcion: "Medio de pago habilitado",
    categoria: "Pagos",
  },
  {
    src: "/Bancos/Pacifico.png",
    titulo: "Banco del Pacífico",
    descripcion: "Medio de pago habilitado",
    categoria: "Pagos",
  },
  {
    src: "/Bancos/Produbanco.png",
    titulo: "Produbanco",
    descripcion: "Medio de pago habilitado",
    categoria: "Pagos",
  },
  {
    src: "/Bancos/Bolivariano.png",
    titulo: "Banco Bolivariano",
    descripcion: "Medio de pago habilitado",
    categoria: "Pagos",
  },
];

const Galeria = () => {
  const [filtro, setFiltro] = useState("Todo");
  const [visor, setVisor] = useState(null); // índice dentro de `visibles`

  const categorias = useMemo(
    () => ["Todo", ...new Set(imagenes.map((i) => i.categoria))],
    [],
  );

  const visibles = useMemo(
    () =>
      filtro === "Todo"
        ? imagenes
        : imagenes.filter((i) => i.categoria === filtro),
    [filtro],
  );

  /* Navegación del visor con teclado */
  useEffect(() => {
    if (visor === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setVisor(null);
      if (e.key === "ArrowRight")
        setVisor((v) => (v + 1) % visibles.length);
      if (e.key === "ArrowLeft")
        setVisor((v) => (v - 1 + visibles.length) % visibles.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visor, visibles.length]);

  /* Bloquea el scroll del fondo mientras el visor está abierto */
  useEffect(() => {
    document.body.style.overflow = visor !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visor]);

  const actual = visor !== null ? visibles[visor] : null;

  return (
    <div className="mt-24">
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
          <span className="font-mono text-sm tracking-wider text-blue-600 dark:text-blue-400">
            GALERÍA DINÁMICA
          </span>
        </div>
        <h3 className="mb-3 text-3xl font-black md:text-5xl">
          <span className="bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Todo nuestro material
          </span>
        </h3>
        <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
          Flyers, planes, certificaciones y medios de pago. Filtra por categoría
          y haz clic en cualquier imagen para verla en grande.
        </p>
      </motion.div>

      {/* Filtros */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        {categorias.map((cat) => {
          const activo = filtro === cat;
          const total =
            cat === "Todo"
              ? imagenes.length
              : imagenes.filter((i) => i.categoria === cat).length;
          return (
            <button
              key={cat}
              onClick={() => {
                setFiltro(cat);
                setVisor(null);
              }}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                activo
                  ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/25"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-400 hover:text-emerald-600 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:text-emerald-400"
              }`}
            >
              {cat}
              <span
                className={`ml-2 text-xs ${activo ? "text-white/70" : "text-slate-400"}`}
              >
                {total}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mosaico */}
      <motion.div layout className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {visibles.map((img, i) => (
            <motion.button
              key={img.src}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onClick={() => setVisor(i)}
              className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-slate-200/70 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-2xl dark:border-white/10 dark:bg-slate-800/50"
            >
              <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={img.src}
                  alt={img.titulo}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0.15";
                  }}
                  className="w-full transition-transform duration-700 group-hover:scale-110"
                />

                {/* Velo + acción */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                    <FaExpand className="h-3.5 w-3.5" />
                    Ver en grande
                  </span>
                </div>

                {/* Etiqueta de categoría */}
                <span className="absolute left-3 top-3 rounded-full bg-slate-900/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
                  {img.categoria}
                </span>
              </div>

              <div className="p-4">
                <p className="font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                  {img.titulo}
                </p>
                <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                  {img.descripcion}
                </p>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Visor a pantalla completa */}
      <AnimatePresence>
        {actual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVisor(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md md:p-10"
          >
            <button
              onClick={() => setVisor(null)}
              aria-label="Cerrar"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:scale-110 hover:bg-white/20"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            {visibles.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisor((v) => (v - 1 + visibles.length) % visibles.length);
                  }}
                  aria-label="Anterior"
                  className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30"
                >
                  <FaChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisor((v) => (v + 1) % visibles.length);
                  }}
                  aria-label="Siguiente"
                  className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30"
                >
                  <FaChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.div
              key={actual.src}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-full max-w-4xl flex-col items-center"
            >
              <img
                src={actual.src}
                alt={actual.titulo}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl border border-white/10 object-contain shadow-2xl"
              />
              <div className="mt-4 text-center">
                <p className="text-lg font-bold text-white">{actual.titulo}</p>
                <p className="text-sm text-slate-300">{actual.descripcion}</p>
                <p className="mt-2 font-mono text-xs text-slate-500">
                  {visor + 1} / {visibles.length} · usa ← → para navegar
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Galeria;
