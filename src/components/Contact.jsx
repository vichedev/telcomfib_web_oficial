import { motion } from "framer-motion";
import { useState } from "react";
import MapaCobertura from "./MapaCobertura";

const Contact = () => {
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [copiedPhone, setCopiedPhone] = useState(null);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(text);
      setTimeout(() => setCopiedEmail(null), 2000);
    } else {
      setCopiedPhone(text);
      setTimeout(() => setCopiedPhone(null), 2000);
    }
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/593986083855?text=Hola,%20necesito%20información%20sobre%20los%20planes%20de%20Telcomfib",
      "_blank",
    );
  };

  const contactInfo = {
    phone: "098 608 3855",
    phoneFull: "+593 98 608 3855",
    salesEmail: "ventas@telcomfib.com",
    supportEmail: "soporte@telcomfib.com",
    address: "Nueva Prosperina Mz 754 Sl 23",
    city: "Guayaquil - Ecuador",
    schedule: "Lunes a Viernes: 8:00 - 18:00",
    scheduleWeekend: "Sábados: 9:00 - 13:00",
  };

  return (
    <section
      id="contacto"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-hidden relative"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
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
              CONTÁCTANOS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              ¿Necesitas Ayuda?
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Nuestro equipo está listo para conectarte con la mejor experiencia
            de internet
          </p>
        </motion.div>

        {/* Grid de Contacto */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Información de Contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* WhatsApp - Principal */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-white"
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
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      WhatsApp
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                      Respuesta inmediata · 24/7
                    </p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="text-lg font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        {contactInfo.phone}
                      </span>
                      <button
                        onClick={handleWhatsApp}
                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all hover:scale-105"
                      >
                        Enviar mensaje
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Correos Electrónicos */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Email Ventas */}
              <div className="group relative">
                <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Ventas
                    </h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-400">
                      {contactInfo.salesEmail}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(contactInfo.salesEmail, "email")
                      }
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="Copiar email"
                    >
                      {copiedEmail === contactInfo.salesEmail ? (
                        <svg
                          className="w-4 h-4 text-emerald-500"
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
                      ) : (
                        <svg
                          className="w-4 h-4 text-slate-400"
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
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Soporte */}
              <div className="group relative">
                <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
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
                          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Soporte Técnico
                    </h4>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-slate-600 dark:text-slate-400">
                      {contactInfo.supportEmail}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(contactInfo.supportEmail, "email")
                      }
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="Copiar email"
                    >
                      {copiedEmail === contactInfo.supportEmail ? (
                        <svg
                          className="w-4 h-4 text-emerald-500"
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
                      ) : (
                        <svg
                          className="w-4 h-4 text-slate-400"
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
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ubicación y Horario */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Ubicación */}
              <div className="group relative">
                <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Oficina Principal
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {contactInfo.address}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    {contactInfo.city}
                  </p>
                  <button
                    onClick={() =>
                      window.open(
                        `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address + ", " + contactInfo.city)}`,
                        "_blank",
                      )
                    }
                    className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Ver en mapa
                  </button>
                </div>
              </div>

              {/* Horario de Atención */}
              <div className="group relative">
                <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Horario de Atención
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {contactInfo.schedule}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                    {contactInfo.scheduleWeekend}
                  </p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                    Soporte técnico 24/7
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mapa y WhatsApp Directo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Mapa interactivo de cobertura */}
            <MapaCobertura />

            {/* Tarjeta de WhatsApp - Contacto Directo */}
            <div className="relative bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 mb-4">
                <svg
                  className="w-8 h-8 text-white"
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
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                ¡Contrata Ahora!
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                Responde en menos de 2 minutos. Atención personalizada.
              </p>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
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
                Escribir por WhatsApp
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                {contactInfo.phone}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Llamada a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Atención 24/7
              </span>
            </div>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
            <a
              href={`tel:${contactInfo.phoneFull}`}
              className="text-sm font-mono text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              {contactInfo.phone}
            </a>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />
            <button
              onClick={handleWhatsApp}
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
