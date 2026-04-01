import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserTie,
  FaHeadset,
  FaEye,
  FaShieldAlt,
  FaCheckCircle,
  FaSearchPlus,
  FaTimes,
  FaDownload,
  FaFilePdf,
} from "react-icons/fa";

// ── Datos ────────────────────────────────────────────────────────────────────
const features = [
  {
    icon: FaUserTie,
    title: "Servicio profesional",
    description:
      "Se brinda un servicio profesional con personal capacitado, organizado y responsable para todos nuestros clientes.",
  },
  {
    icon: FaHeadset,
    title: "Atención técnica especializada",
    description:
      "El soporte de atención es hecho por técnicos especializados, capaces de ayudar a resolver cualquier tipo de problema que pueda surgir.",
  },
  {
    icon: FaEye,
    title: "Gestión permanente",
    description:
      "Recibe monitoreo constante, lo que disminuye y, en algunos casos, hasta evita errores y caídas de servicio.",
  },
  {
    icon: FaShieldAlt,
    title: "Seguridad en el acceso",
    description:
      "Además de proporcionar estabilidad en la conexión, también ofrecemos más seguridad en tu navegación, requisito fundamental.",
  },
];

const IMAGE_SRC = "/Arcotel/calidad_banner.png";
const IMAGE_ALT = "Parámetros de Calidad — Telcomfib";
const PDF_URL = "/Documents/5Telcomfib_Parametros_Calidad_2025.pdf";
const PDF_NAME = "5Telcomfib_Parametros_Calidad_2025.pdf";

// ── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ src, alt, onClose }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full
          bg-white/10 hover:bg-white/20 border border-white/20
          flex items-center justify-center text-white
          transition-all duration-200 hover:scale-110"
      >
        <FaTimes className="w-5 h-5" />
      </button>

      {/* Image */}
      <motion.div
        className="relative z-10 max-w-5xl w-full"
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto rounded-2xl shadow-2xl shadow-black/60 border border-white/10"
        />

        {/* Download from lightbox */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-white/50 text-sm">
            Haz clic fuera de la imagen o en ✕ para cerrar
          </p>
          <a
            href={PDF_URL}
            download={PDF_NAME}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
              bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold
              transition-all duration-200 hover:scale-105 shadow-lg shadow-emerald-500/30"
          >
            <FaDownload className="w-3.5 h-3.5" />
            Descargar PDF
          </a>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);

// ── Componente principal ──────────────────────────────────────────────────────
const ParametrosCalidad = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      {lightboxOpen && (
        <Lightbox
          src={IMAGE_SRC}
          alt={IMAGE_ALT}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <section className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden py-24 px-6">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-emerald-400/5 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(100,116,139,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6 tracking-widest uppercase">
              <FaCheckCircle className="w-3.5 h-3.5" />
              Telcomfib
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
              Parámetros de{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                Calidad
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Optar por contratar Internet en{" "}
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Telcomfib
              </span>{" "}
              tiene ventajas importantes en relación con los otros tipos de
              conexiones. Entre las principales tenemos:
            </p>
          </motion.div>

          {/* Grid principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* ── Izquierda: feature cards + botón descarga ── */}
            <div className="space-y-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * index + 0.3 }}
                    className="group flex gap-5 p-5 rounded-2xl
                      bg-slate-50 border border-slate-200
                      dark:bg-slate-800/50 dark:border-slate-700/50
                      hover:border-emerald-400 dark:hover:border-emerald-500/40
                      hover:bg-white dark:hover:bg-slate-800/80
                      hover:shadow-md dark:hover:shadow-none
                      transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

              {/* ── Botón de descarga del PDF ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <a
                  href={PDF_URL}
                  download={PDF_NAME}
                  className="group flex items-center justify-between w-full p-5 rounded-2xl
                    bg-gradient-to-r from-emerald-500/10 to-blue-500/10
                    border border-emerald-500/30 dark:border-emerald-500/20
                    hover:from-emerald-500/20 hover:to-blue-500/20
                    hover:border-emerald-500/60 dark:hover:border-emerald-400/40
                    hover:shadow-lg hover:shadow-emerald-500/10
                    transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* PDF icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <FaFilePdf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-slate-900 dark:text-white font-bold text-base">
                        Reporte de Parámetros de Calidad
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Período: Abr – Jun 2025 · Formato ARCOTEL RT-CAL-01
                      </p>
                    </div>
                  </div>

                  {/* Download arrow */}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 group-hover:bg-emerald-400 text-white text-sm font-semibold transition-all duration-200 flex-shrink-0">
                    <FaDownload className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    <span>Descargar</span>
                  </div>
                </a>
              </motion.div>
            </div>

            {/* ── Derecha: imagen clickeable ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative"
            >
              <div
                className="relative rounded-3xl overflow-hidden
                  border border-slate-200 dark:border-slate-700/50
                  shadow-xl shadow-slate-200/80 dark:shadow-emerald-500/10
                  cursor-zoom-in group"
                onClick={() => setLightboxOpen(true)}
                title="Clic para ver en grande"
              >
                <img
                  src={IMAGE_SRC}
                  alt={IMAGE_ALT}
                  className="w-full object-cover min-h-[380px] transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                    <div className="flex flex-col items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 px-6 py-4 rounded-2xl">
                      <FaSearchPlus className="w-8 h-8 text-white drop-shadow" />
                      <span className="text-white text-sm font-semibold drop-shadow">
                        Ver imagen completa
                      </span>
                    </div>
                  </div>
                </div>

                {/* ARCOTEL badge */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/50">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-slate-800 dark:text-white text-sm font-semibold">
                      Regulado por ARCOTEL · Período Abr–Jun 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating stat top-right */}
              <div className="absolute -top-4 -right-4 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg shadow-emerald-500/30 pointer-events-none">
                <p className="text-white text-xs font-bold">Satisfacción</p>
                <p className="text-white text-xl font-black">4.92/5</p>
              </div>

              {/* Floating stat bottom-left */}
              <div className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg pointer-events-none">
                <p className="text-slate-500 dark:text-slate-400 text-xs">
                  Uptime garantizado
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 text-xl font-black">
                  99.9%
                </p>
              </div>

              {/* Hint */}
              <p className="text-center text-slate-400 dark:text-slate-500 text-xs mt-8 flex items-center justify-center gap-1.5">
                <FaSearchPlus className="w-3 h-3" />
                Haz clic en la imagen para verla completa
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ParametrosCalidad;
