/**
 * Catalogo.jsx — Sección de Catálogo Digital
 *
 * ⚠️ ESTADO: PRÓXIMAMENTE (placeholder).
 *
 * Las bases ya están listas. Cuando tengas el catálogo solo tienes que:
 *   1. Poner   const CATALOGO_LISTO = true;
 *   2. Rellenar el array `productos` (o cambiar el bloque por un PDF / iframe).
 * El resto (estilos, animaciones, grid responsivo) ya funciona.
 */

import { motion } from "framer-motion";

/* 🔧 Cambia a `true` cuando el catálogo esté listo */
const CATALOGO_LISTO = false;

/* 🔧 Rellena aquí tus productos/planes cuando esté listo.
 * Ejemplo de estructura:
 * {
 *   id: 1,
 *   nombre: "Plan Hogar 300",
 *   descripcion: "Fibra simétrica 300 Mbps",
 *   precio: "$25/mes",
 *   imagen: "/ruta/a/imagen.png",  // o importa el asset
 * }
 */
const productos = [];

const CatalogoProximamente = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative max-w-3xl mx-auto"
  >
    <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 dark:border-white/10 bg-white dark:bg-slate-800/50 backdrop-blur-sm shadow-xl">
      {/* Glow decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative p-12 md:p-16 text-center">
        {/* Icono */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 mb-6 shadow-lg shadow-emerald-500/20">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>

        {/* Badge Próximamente */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
            Próximamente
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
          Estamos preparando nuestro catálogo
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-base max-w-lg mx-auto mb-8">
          Muy pronto podrás explorar aquí todos nuestros planes y servicios en
          un catálogo digital interactivo. Mientras tanto, escríbenos y te
          asesoramos al instante.
        </p>

        <a
          href="https://wa.me/593986083855?text=Hola,%20quiero%20información%20sobre%20el%20catálogo%20de%20Telcomfib"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25 hover:scale-105 transition-transform"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  </motion.div>
);

/* 🔧 Grid de productos — se usa automáticamente cuando CATALOGO_LISTO = true */
const CatalogoGrid = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {productos.map((producto, i) => (
      <motion.div
        key={producto.id ?? i}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08 }}
        className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        {producto.imagen && (
          <div className="aspect-video overflow-hidden">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
            {producto.nombre}
          </h3>
          {producto.descripcion && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {producto.descripcion}
            </p>
          )}
          {producto.precio && (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
              {producto.precio}
            </span>
          )}
        </div>
      </motion.div>
    ))}
  </div>
);

const Catalogo = () => {
  return (
    <section
      id="catalogo"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-hidden relative"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
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
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Nuestro Catálogo
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Explora nuestros planes y servicios de fibra óptica en un solo lugar.
          </p>
        </motion.div>

        {/* Contenido: grid si está listo, placeholder si no */}
        {CATALOGO_LISTO && productos.length > 0 ? (
          <CatalogoGrid />
        ) : (
          <CatalogoProximamente />
        )}
      </div>
    </section>
  );
};

export default Catalogo;
