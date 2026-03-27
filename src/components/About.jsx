import { motion } from "framer-motion";
import { useState } from "react";

const About = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const stats = [
    {
      label: "Tecnologia",
      title: "100% Fibra Optica",
      desc: "Conexion pura sin cables de cobre. Latencia minima y estabilidad garantizada.",
    },
    {
      label: "Cobertura",
      title: "Guayaquil y Zonas",
      desc: "Llegamos a los mejores sectores de Guayaquil y areas metropolitanas.",
    },
    {
      label: "Soporte",
      title: "Tecnicos Locales",
      desc: "Atencion inmediata y personalizada con tecnicos certificados en tu zona.",
    },
  ];

  const testimonials = [
    {
      name: "Maria Gonzalez",
      location: "Guayaquil, Urdesa",
      rating: 5,
      text: "Excelente servicio de internet. Desde que contratamos Telcomfib, no hemos tenido ningun corte. La velocidad es increible y el soporte tecnico es rapidisimo.",
      avatar: "MG",
    },
    {
      name: "Carlos Mendez",
      location: "Guayaquil, Ceibos",
      rating: 5,
      text: "Me cambie de proveedor porque siempre tenia problemas. Con Telcomfib todo es diferente, fibra optica pura, sin excusas. 100% recomendado.",
      avatar: "CM",
    },
    {
      name: "Ana Lucia Vera",
      location: "Guayaquil, Samborondon",
      rating: 5,
      text: "La mejor inversion para mi negocio. Internet estable, rapido y con soporte tecnico que realmente resuelve. Llevamos 2 anos con ellos y no pienso cambiarme.",
      avatar: "AV",
    },
    {
      name: "Roberto Espinoza",
      location: "Guayaquil, Alborada",
      rating: 5,
      text: "Trabajo desde casa y necesito una conexion confiable. Telcomfib me ha dado la tranquilidad que buscaba. Velocidad simetrica de verdad.",
      avatar: "RE",
    },
  ];

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/593986083855?text=Hola,%20quiero%20mas%20informacion%20sobre%20los%20planes%20de%20Telcomfib",
      "_blank",
    );
  };

  return (
    <section
      id="nosotros"
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-hidden relative"
    >
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-mono tracking-wider">
              CONOCENOS
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Sobre Telcomfib
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Somos una empresa de telecomunicaciones comprometida con llevar la
            mejor experiencia de internet a Guayaquil.
          </p>
        </motion.div>

        {/* Hero de la empresa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl overflow-hidden mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20" />
          <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 p-12 md:p-16 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <svg
                  className="w-4 h-4 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-white text-sm font-mono">
                  ISP CERTIFICADO · GUAYAQUIL
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Conectamos tu mundo con la{" "}
                <span className="text-emerald-400">velocidad de la luz</span>
              </h3>
              <p className="text-slate-300 text-lg mb-8">
                En Telcomfib creemos que el internet no es solo un servicio, es
                una herramienta que transforma vidas. Por eso, nos dedicamos a
                ofrecer la mejor experiencia en conectividad de fibra optica en
                Guayaquil.
              </p>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105"
              >
                Contrata ahora
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Grid de caracteristicas */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <div className="relative p-8 rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center mb-4">
                  {i === 0 && (
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  )}
                  {i === 1 && (
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
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                  {i === 2 && (
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
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  {item.label}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3 text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mision y Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="group"
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
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
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Nuestra Mision
                </h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                Proporcionar servicios de internet de alta velocidad y
                confiabilidad mediante tecnologia de fibra optica, garantizando
                una experiencia digital superior para hogares y empresas en
                Guayaquil, con un enfoque en la satisfaccion del cliente y el
                soporte tecnico de calidad.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="group"
          >
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 backdrop-blur-sm border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Nuestra Vision
                </h3>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                Ser el proveedor de internet lider en Guayaquil, reconocido por
                nuestra excelencia en servicio al cliente, innovacion
                tecnologica y compromiso con el desarrollo digital de nuestra
                comunidad, expandiendo nuestra cobertura a mas sectores de la
                ciudad.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Testimonios de Clientes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-emerald-600 dark:text-emerald-400 text-sm font-mono tracking-wider">
                TESTIMONIOS
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Lo que dicen nuestros{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                clientes
              </span>
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Mas de 1000 familias y empresas confian en la calidad de nuestro
              servicio
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {testimonial.location}
                        </p>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-yellow-500 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                      "{testimonial.text}"
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
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
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs font-medium">
                        Cliente satisfecho
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 p-12 border border-emerald-500/20">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300D278' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Listo para una mejor experiencia de internet?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
                Unete a los cientos de clientes que ya disfrutan de la mejor
                conexion de fibra optica en Guayaquil
              </p>
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105"
              >
                Contrata ahora
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
