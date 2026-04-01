import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaDownload,
  FaCalendarAlt,
  FaTag,
  FaExternalLinkAlt,
} from "react-icons/fa";

const planes = [
  {
    id: "OF-TELCOMFIB-PLANES-2026-001",
    fecha: "28 de marzo del 2026",
    tipo: "PLANES",
    url: "/Documents/Telcomfib_Planes_Promociones_2026.pdf",
  },
  // Para agregar más documentos copia el objeto de arriba y cambia los datos
];

const TarifarioPromociones = () => {
  return (
    <section className="relative min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden py-24 px-6">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(100,116,139,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,116,139,.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6 tracking-widest uppercase">
            <FaTag className="w-3.5 h-3.5" />
            Documentos Oficiales
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            Planes y{" "}
            <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Promociones
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Consulta los planes tarifarios y promociones vigentes notificados
            ante ARCOTEL.
          </p>
        </motion.div>

        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 shadow-lg shadow-emerald-500/20">
            <FaCalendarAlt className="w-4 h-4 text-white" />
            <span className="text-white font-black text-lg">Año: 2025</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="rounded-2xl overflow-hidden
            border border-slate-200 dark:border-slate-700/60
            shadow-xl shadow-slate-200/60 dark:shadow-slate-900/50"
        >
          {/* Table header */}
          <div className="grid grid-cols-12 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700/60 px-6 py-4">
            <div className="col-span-5 flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-widest">
              <FaFileAlt className="w-3.5 h-3.5" />
              Documento notificado No.
            </div>
            <div className="col-span-4 text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">
              Fecha de notificación
            </div>
            <div className="col-span-2 text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">
              Tipo de documento
            </div>
            <div className="col-span-1 text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest text-center">
              Ver
            </div>
          </div>

          {/* Table rows */}
          {planes.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.1 }}
              className="grid grid-cols-12 items-center px-6 py-5
                bg-white dark:bg-slate-900/40
                hover:bg-slate-50 dark:hover:bg-slate-800/50
                transition-colors duration-200
                border-b border-slate-100 dark:border-slate-800/50
                last:border-b-0 group"
            >
              {/* ID */}
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <FaFileAlt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-slate-800 dark:text-white font-mono text-sm font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {plan.id}
                </span>
              </div>

              {/* Fecha */}
              <div className="col-span-4">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                  <FaCalendarAlt className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  {plan.fecha}
                </div>
              </div>

              {/* Tipo */}
              <div className="col-span-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  {plan.tipo}
                </span>
              </div>

              {/* Ver */}
              <div className="col-span-1 flex justify-center">
                <a
                  href={plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver documento"
                  className="w-9 h-9 rounded-lg
                    bg-slate-100 dark:bg-slate-800
                    hover:bg-gradient-to-br hover:from-emerald-500 hover:to-blue-500
                    border border-slate-200 dark:border-slate-700
                    hover:border-transparent
                    flex items-center justify-center
                    transition-all duration-300 hover:scale-110
                    hover:shadow-lg hover:shadow-emerald-500/20
                    group/btn"
                >
                  <FaExternalLinkAlt className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover/btn:text-white transition-colors" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex items-start gap-3 p-5 rounded-xl
            bg-blue-50 dark:bg-blue-500/5
            border border-blue-200 dark:border-blue-500/20"
        >
          <FaDownload className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            Los documentos de planes y promociones son notificados ante la
            Agencia de Regulación y Control de las Telecomunicaciones{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              (ARCOTEL)
            </span>{" "}
            conforme a la normativa vigente. Puedes descargarlos haciendo clic
            en el ícono de la derecha.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TarifarioPromociones;
