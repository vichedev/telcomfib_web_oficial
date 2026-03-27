import { motion } from "framer-motion";
import { useState } from "react";

const Support = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/593986083855?text=Hola,%20necesito%20soporte%20tecnico%20para%20mi%20servicio%20de%20internet",
      "_blank",
    );
  };

  const features = [
    {
      icon: "🤖",
      title: "Bot Inteligente",
      description:
        "Respuesta inmediata 24/7 para consultas rápidas y solución de problemas comunes.",
      badge: "NUEVO",
    },
    {
      icon: "👥",
      title: "Agente Humano",
      description:
        "Si el bot no resuelve tu caso, un técnico experto toma el control en minutos.",
      badge: "GARANTIZADO",
    },
    {
      icon: "⚡",
      title: "Respuesta Rápida",
      description:
        "Tiempo de respuesta promedio: menos de 2 minutos en horario comercial.",
      badge: "RÉCORD",
    },
  ];

  const faqs = [
    {
      question: "¿Cómo puedo reportar una falla?",
      answer:
        "Escríbenos por WhatsApp al bot, te guiará paso a paso para diagnosticar y resolver la incidencia.",
    },
    {
      question: "¿Qué hago si mi internet está lento?",
      answer:
        "El bot realizará pruebas de velocidad automáticas y te dará recomendaciones personalizadas.",
    },
    {
      question: "¿Puedo solicitar una visita técnica?",
      answer:
        "Sí, el bot agendará la visita en el horario que prefieras y te confirmará la disponibilidad.",
    },
    {
      question: "¿Cómo pago mi factura?",
      answer:
        "El bot te enviará el link de pago y te ayudará con cualquier duda sobre tu facturación.",
    },
  ];

  return (
    <section
      id="soporte"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-hidden relative"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-600 dark:text-emerald-400 text-sm font-mono tracking-wider">
                SOPORTE 24/7
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Soporte Inteligente
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Atención instantánea con nuestro asistente virtual + respaldo
              humano especializado
            </p>
          </motion.div>

          {/* Hero del Soporte - WhatsApp Bot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-3xl overflow-hidden mb-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20" />
            <div className="relative bg-gradient-to-r from-emerald-600 to-blue-600 p-12 md:p-16 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
                  <span className="text-2xl">🤖</span>
                  <span className="text-white text-sm font-mono">
                    ASISTENTE INTELIGENTE
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Atención por WhatsApp
                </h3>
                <p className="text-white/90 text-lg mb-8">
                  Resuelve tus dudas, reporta fallas o agenda visitas técnicas
                  de forma rápida y sencilla. Nuestro bot está disponible 24/7.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleWhatsApp}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Iniciar conversación
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  </button>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Respuesta en menos de 2 minutos
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-4 text-white/70 text-xs">
                  <span className="flex items-center gap-1">✓ 24/7</span>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span className="flex items-center gap-1">
                    ✓ Soporte humano
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span className="flex items-center gap-1">
                    ✓ Resolución rápida
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Características del Soporte */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{feature.icon}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Panel de Estado de Red + FAQ */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Estado de Red */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="group"
            >
              <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
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
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          Estado de Red
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Monitoreo en tiempo real
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                      <span className="text-[10px] text-green-500 font-bold uppercase">
                        Todo operativo
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {[
                      {
                        node: "Core Central - Guayaquil",
                        status: "99.9%",
                        value: 99.9,
                      },
                      {
                        node: "Nodo Local Alborada",
                        status: "Óptimo",
                        value: 98.5,
                      },
                      {
                        node: "Latencia Internacional",
                        status: "38ms",
                        value: 95,
                      },
                      { node: "Red de Respaldo", status: "Activa", value: 100 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600 dark:text-slate-400">
                            {item.node}
                          </span>
                          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            {item.status}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.value}%` }}
                            transition={{ duration: 1.2, delay: i * 0.1 }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                    <p className="text-xs text-emerald-800 dark:text-emerald-400 text-center">
                      ✓ Sistema de monitoreo 24/7 · Alertas preventivas
                      automáticas
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ - Preguntas Frecuentes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="group"
            >
              <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
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
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Preguntas Frecuentes
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Resuelve tus dudas al instante
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {faqs.map((faq, i) => (
                      <details key={i} className="group/faq">
                        <summary className="cursor-pointer list-none flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {faq.question}
                          </span>
                          <svg
                            className="w-5 h-5 text-slate-500 group-open/faq:rotate-180 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        <div className="p-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                      ¿No encuentras lo que buscas?
                    </p>
                    <button
                      onClick={handleWhatsApp}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium transition-all"
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Habla con nuestro asistente
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Badge de disponibilidad */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 shadow-lg">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150" />
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-300" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Equipo disponible ahora
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                +593 98 608 3855
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Support;
