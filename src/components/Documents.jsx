import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import documentosData from "../data/documents";

// Modal para ver documentos
const DocumentModal = ({ doc, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{doc.title}</h3>
                  <p className="text-white/80 text-sm">{doc.description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
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
            </div>
          </div>

          {/* Contenido del documento */}
          <div className="p-6">
            <iframe
              src={doc.pdfUrl}
              title={doc.title}
              className="w-full h-[70vh] rounded-lg border border-slate-200 dark:border-white/10"
            />

            <div className="mt-6 flex justify-end gap-3">
              <a
                href={doc.pdfUrl}
                download
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Descargar Documento
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Documentos = () => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  // Asignación manual de categorías para cada documento
  const documentosConCategoria = documentosData.map((doc) => {
    let categoria = "otros";
    const title = doc.title.toLowerCase();

    if (
      title.includes("ley orgánica") ||
      (title.includes("ley") && !title.includes("reglamento"))
    ) {
      categoria = "leyes";
    } else if (
      title.includes("reglamento") ||
      title.includes("resolucion") ||
      title.includes("propuesta")
    ) {
      categoria = "reglamentos";
    } else if (
      title.includes("calidad") ||
      title.includes("parametros") ||
      title.includes("qos") ||
      title.includes("saturacion")
    ) {
      categoria = "calidad";
    } else if (
      title.includes("seguridad") ||
      title.includes("parental") ||
      title.includes("consejos")
    ) {
      categoria = "seguridad";
    } else if (
      title.includes("discapacidades") ||
      title.includes("adultos") ||
      title.includes("tercera")
    ) {
      categoria = "inclusion";
    } else {
      categoria = "otros";
    }

    return { ...doc, categoria };
  });

  // Categorías con conteo exacto
  const categories = [
    {
      id: "todos",
      name: "Todos",
      icon: "📄",
      count: documentosConCategoria.length,
    },
    {
      id: "leyes",
      name: "Leyes",
      icon: "⚖️",
      count: documentosConCategoria.filter((d) => d.categoria === "leyes")
        .length,
    },
    {
      id: "reglamentos",
      name: "Reglamentos",
      icon: "📋",
      count: documentosConCategoria.filter((d) => d.categoria === "reglamentos")
        .length,
    },
    {
      id: "calidad",
      name: "Calidad",
      icon: "📊",
      count: documentosConCategoria.filter((d) => d.categoria === "calidad")
        .length,
    },
    {
      id: "seguridad",
      name: "Seguridad",
      icon: "🔒",
      count: documentosConCategoria.filter((d) => d.categoria === "seguridad")
        .length,
    },
    {
      id: "inclusion",
      name: "Inclusión",
      icon: "♿",
      count: documentosConCategoria.filter((d) => d.categoria === "inclusion")
        .length,
    },
    {
      id: "otros",
      name: "Otros",
      icon: "📁",
      count: documentosConCategoria.filter((d) => d.categoria === "otros")
        .length,
    },
  ];

  // Filtrar documentos
  const filteredDocs = useMemo(() => {
    return documentosConCategoria.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "todos" || doc.categoria === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleViewDocument = (doc) => {
    setSelectedDoc(doc);
    setModalOpen(true);
  };

  // Función para obtener el nombre de la categoría
  const getCategoryName = (categoriaId) => {
    const cat = categories.find((c) => c.id === categoriaId);
    return cat ? cat.name : "Otros";
  };

  return (
    <section
      id="documentos"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-hidden relative"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-mono tracking-wider">
              DOCUMENTOS OFICIALES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Marco Legal y Normativas
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-3xl mx-auto">
            Encuentra aquí toda la documentación oficial, leyes, reglamentos y
            normativas que rigen los servicios de telecomunicaciones en Ecuador.
          </p>
        </motion.div>

        {/* Barra de búsqueda y filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por título o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-4 pl-12 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:outline-none transition-colors text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg
                    className="w-5 h-5"
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
              )}
            </div>
          </div>

          {/* Filtros por categoría */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-emerald-500"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategory === cat.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Resultados */}
        <div className="mb-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mostrando {filteredDocs.length} de {documentosConCategoria.length}{" "}
            documentos
          </p>
        </div>

        {/* Grid de Documentos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocs.map((doc, index) => {
            const categoryInfo = categories.find((c) => c.id === doc.categoria);

            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Imagen del documento */}
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                    <img
                      src={doc.imageUrl}
                      alt={doc.title}
                      className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* Categoría badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-white/95 backdrop-blur-sm text-xs font-bold rounded-lg flex items-center gap-1 shadow-sm">
                        <span>{categoryInfo?.icon}</span>
                        <span className="text-slate-700">
                          {categoryInfo?.name}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 min-h-[48px]">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
                      {doc.description}
                    </p>

                    <div className="flex gap-2 mt-auto">
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all hover:scale-105"
                      >
                        Ver Documento
                      </button>
                      <a
                        href={doc.pdfUrl}
                        download
                        className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
                        title="Descargar"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredDocs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No se encontraron documentos
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Intenta con otros términos de búsqueda o categorías
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("todos");
              }}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 p-8 border border-emerald-500/20">
            <div className="relative">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
                ¿Necesitas más información?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Contáctanos para recibir asesoría personalizada sobre nuestra
                documentación
              </p>
              <button
                onClick={() =>
                  window.open(
                    "https://wa.me/593986083855?text=Hola,%20necesito%20información%20sobre%20los%20documentos%20legales%20de%20Telcomfib",
                    "_blank",
                  )
                }
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Contactar Soporte
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal para ver documentos */}
      <DocumentModal
        doc={selectedDoc}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default Documentos;
