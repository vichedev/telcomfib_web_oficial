import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Modal Component para los bancos
const BankModal = ({ bank, isOpen, onClose }) => {
  if (!isOpen || !bank) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con gradiente suave */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center">
                {/* Logo real del banco en el modal */}
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{bank.name}</h3>
                <p className="text-white/70 text-sm">{bank.type}</p>
              </div>
            </div>
          </div>

          {/* Contenido del modal */}
          <div className="p-6 space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
              <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Número de cuenta
              </label>
              <div className="flex items-center justify-between mt-1">
                <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white tracking-wider">
                  {bank.account}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(bank.account);
                    alert("✅ ¡Cuenta copiada al portapapeles!");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium transition-all duration-200 flex items-center gap-1"
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
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copiar
                </button>
              </div>
            </div>

            <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
              <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Titular de la cuenta
              </label>
              <p className="text-base font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {bank.owner}
              </p>
            </div>

            {bank.id && (
              <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
                <label className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  RUC / Cédula
                </label>
                <p className="text-base font-mono text-slate-800 dark:text-slate-200 mt-1">
                  {bank.id}
                </p>
              </div>
            )}

            <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-xl p-4 mt-2">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-emerald-800 dark:text-emerald-300">
                  Una vez realizado el depósito, envía el comprobante por
                  WhatsApp para activar tu servicio
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Modal Component para la imagen del plan
const ImageModal = ({ image, title, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-emerald-400 transition-colors z-10"
          >
            <svg
              className="w-8 h-8"
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

          {/* Imagen */}
          <div className="relative rounded-2xl overflow-hidden bg-black/50">
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-[85vh] object-contain"
            />

            {/* Título flotante */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white text-center">
                {title}
              </h3>
              <p className="text-emerald-400 text-center text-sm mt-1">
                Haz clic fuera de la imagen para cerrar
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Plans = () => {
  const [activeTab, setActiveTab] = useState("natural");
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: "", title: "" });

  const plans = [
    {
      name: "Plan Básico",
      speed: "400",
      speedUnit: "MEGAS",
      price: "18.04",
      finalPrice: "20.75",
      image: "/Planes/400megas.png",
      bgColor: "from-blue-500 to-cyan-500",
      features: [
        "Fibra Simétrica",
        "Soporte 24/7",
        "Instalación Gratis",
        "Sin permanencia",
      ],
      icon: "🚀",
      tag: "Ideal para navegación",
    },
    {
      name: "Plan Medio",
      speed: "500",
      speedUnit: "MEGAS",
      price: "21.30",
      finalPrice: "24.50",
      image: "/Planes/500megas.png",
      bgColor: "from-emerald-500 to-teal-500",
      features: [
        "Streaming 4K",
        "WiFi 6 Ready",
        "Soporte Prioritario",
        "IP Dinámica",
      ],
      icon: "⚡",
      tag: "Más popular",
      popular: true,
    },
    {
      name: "Plan Avanzado",
      speed: "600",
      speedUnit: "MEGAS",
      price: "26.52",
      finalPrice: "30.50",
      image: "/Planes/600megas.png",
      bgColor: "from-purple-500 to-pink-500",
      features: [
        "Ultra Baja Latencia",
        "Mesh WiFi incluido",
        "Soporte VIP",
        "IP Pública",
      ],
      icon: "💎",
      tag: "Gaming ready",
    },
    {
      name: "Plan Extreme",
      speed: "700",
      speedUnit: "MEGAS",
      price: "30.26",
      finalPrice: "34.80",
      image: "/Planes/700megas.png",
      bgColor: "from-orange-500 to-red-500",
      features: [
        "Gaming Optimizado",
        "Red Dedicada",
        "Soporte 24/7 Premium",
        "Estabilidad Máxima",
      ],
      icon: "🎮",
      tag: "Para profesionales",
    },
    {
      name: "Plan Turbo",
      speed: "1",
      speedUnit: "GIGA",
      price: "40.00",
      finalPrice: "46.00",
      image: "/Planes/1giga.png",
      bgColor: "from-amber-500 to-yellow-500",
      features: [
        "Velocidad Extrema",
        "Fibra Óptica Pura",
        "Prioridad Máxima",
        "Router WiFi 6E",
      ],
      icon: "🏆",
      tag: "Velocidad de la luz",
      highlight: true,
    },
  ];

  const banks = [
    {
      name: "Banco Pichincha",
      type: "Cuenta Corriente",
      account: "2100279425",
      owner: "Israel Frutos Burgos",
      id: "xxxxxxxx",
      logo: "/Bancos/Pichincha.png",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      name: "Banco Pichincha",
      type: "Cuenta Ahorros",
      account: "2203373811",
      owner: "Israel Frutos Burgos",
      id: "xxxxxxxx",
      logo: "/Bancos/Pichincha.png",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      name: "Banco Guayaquil",
      type: "Cuenta Corriente",
      account: "2100279425",
      owner: "Israel Frutos Burgos",
      id: "xxxxxxxx",
      logo: "/Bancos/Guayaquil.png",
      color: "from-pink-500 to-red-600",
    },
    {
      name: "Banco Guayaquil",
      type: "Cuenta Ahorros",
      account: "2203373811",
      owner: "Israel Frutos Burgos",
      id: "xxxxxxxx",
      logo: "/Bancos/Guayaquil.png",
      color: "from-pink-500 to-red-600",
    },
    {
      name: "Banco Bolivariano",
      type: "Cuenta Corriente",
      account: "0925042501",
      owner: "CASTNET S.A.S",
      id: "0993384453001",
      logo: "/Bancos/Bolivariano.png",
      color: "from-teal-600 to-blue-700",
    },
    {
      name: "Banco Bolivariano",
      type: "Cuenta Ahorros",
      account: "0921522556",
      owner: "CASTNET S.A.S",
      id: "0993384453001",
      logo: "/Bancos/Bolivariano.png",
      color: "from-teal-600 to-blue-700",
    },
    {
      name: "Banco del Pacífico",
      type: "Cuenta Ahorros",
      account: "1062703064",
      owner: "Israel Frutos Burgos",
      id: "xxxxxxxx",
      logo: "/Bancos/Pacifico.png",
      color: "from-blue-500 to-blue-700",
    },
    {
      name: "Produbanco",
      type: "Cuenta Ahorros",
      account: "20059786629",
      owner: "Israel Frutos Burgos",
      id: "xxxxxxxx",
      logo: "/Bancos/Produbanco.png",
      color: "from-green-600 to-emerald-800",
    },
  ];

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/593986083855?text=Hola,%20estoy%20interesado%20en%20contratar%20un%20plan%20de%20fibra%20óptica",
      "_blank",
    );
  };

  const handleImageClick = (imageUrl, planName) => {
    setSelectedImage({ url: imageUrl, title: planName });
    setImageModalOpen(true);
  };

  return (
    <section
      id="planes"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-hidden relative"
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header con diseño mejorado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-mono tracking-wider">
              FIBRA ÓPTICA SIMÉTRICA
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Planes de Internet
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Velocidad de la luz en tu hogar o negocio. Fibra óptica pura,
            estabilidad garantizada.
          </p>
        </motion.div>

        {/* Grid de Planes con imágenes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative group cursor-pointer ${plan.popular ? "lg:scale-105" : ""}`}
            >
              {/* Tarjeta principal */}
              <div
                className={`relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-500 ${
                  hoveredPlan === i
                    ? "shadow-2xl shadow-emerald-500/20 -translate-y-2"
                    : "shadow-xl"
                }`}
              >
                {/* Imagen de fondo - Ahora clickeable */}
                <div
                  className="relative h-48 overflow-hidden cursor-pointer group/image"
                  onClick={() => handleImageClick(plan.image, plan.name)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.bgColor} opacity-20`}
                  />
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Overlay de zoom */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-2">
                      <svg
                        className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Tag flotante */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold rounded-full">
                      {plan.tag}
                    </span>
                  </div>

                  {/* Icono flotante */}
                  <div className="absolute bottom-4 right-4 text-4xl filter drop-shadow-lg">
                    {plan.icon}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg animate-pulse">
                        ⭐ Más Vendido
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>

                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      {plan.speed}
                    </span>
                    <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {plan.speedUnit}
                    </span>
                  </div>

                  <div className="mb-4 text-center">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        ${plan.finalPrice}
                      </span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        Precio final
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.slice(0, 3).map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
                      >
                        <svg
                          className="w-4 h-4 text-emerald-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full py-3 rounded-xl font-bold transition-all bg-gradient-to-r from-emerald-500 to-blue-500 text-white hover:shadow-xl hover:scale-105 transform transition-all duration-300 relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10">Contratar Ahora</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                  </button>
                </div>
              </div>

              {/* Efecto de brillo */}
              {plan.popular && (
                <div className="absolute -inset-px bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Sección Requisitos y Pagos */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Requisitos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="group"
          >
            <div className="relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white">
                    <svg
                      className="w-6 h-6"
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
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Requisitos
                  </h3>
                </div>

                <div className="flex gap-4 mb-6 border-b border-slate-200 dark:border-white/10">
                  {["natural", "juridica"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-4 font-semibold transition-all relative capitalize ${activeTab === tab ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`}
                    >
                      {tab === "natural"
                        ? "Persona Natural"
                        : "Persona Jurídica"}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <ul className="space-y-4">
                  {(activeTab === "natural"
                    ? [
                        "Cédula original y copia",
                        "Planilla de servicios básicos",
                        "Llenar solicitud de instalación",
                        "Contrato firmado",
                      ]
                    : [
                        "Cédula del representante",
                        "RUC actualizado",
                        "Nombramiento legal",
                        "Contrato firmado",
                      ]
                  ).map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-slate-700 dark:text-slate-300 text-sm"
                    >
                      <span className="text-emerald-500">✔</span> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Métodos de Pago - CORREGIDO SEGÚN IMAGEN */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="group"
          >
            <div className="relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Métodos de Pago
                  </h3>
                </div>

                <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                  {banks.map((bank, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      onClick={() => {
                        setSelectedBank(bank);
                        setModalOpen(true);
                      }}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 hover:border-emerald-500 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-white p-1 shadow-sm flex items-center justify-center">
                          {/* Logo real del banco en la lista */}
                          <img
                            src={bank.logo}
                            alt={bank.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                            {bank.name}
                          </h4>
                          <p className="font-mono text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            {bank.account}
                          </p>
                          <p className="text-[10px] text-slate-500 uppercase font-bold">
                            {bank.type}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Banner de contacto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative text-center bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 backdrop-blur-sm rounded-3xl p-12 border border-emerald-500/20"
        >
          <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent dark:text-white mb-4">
            ¿Listo para la velocidad de la luz?
          </h3>
          <button
            onClick={handleWhatsApp}
            className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            ¡Contactar por WhatsApp!
          </button>
        </motion.div>
      </div>

      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }`}</style>

      <BankModal
        bank={selectedBank}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ImageModal
        image={selectedImage.url}
        title={selectedImage.title}
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
      />
    </section>
  );
};

export default Plans;
