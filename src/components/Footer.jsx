import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaFileAlt,
  FaShieldAlt,
  FaStar,
  FaUsers,
  FaEnvelope,
  FaHome,
  FaExternalLinkAlt,
  FaBroadcastTower,
  FaHeart,
  FaCode,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/593986083855?text=Hola,%20necesito%20información%20sobre%20los%20planes%20de%20Telcomfib",
      "_blank",
    );
  };

  // Mapeo de documentos con rutas correctas según tu estructura
  const documentosPaths = {
    1: "1ley_organica_de_telecomunicaciones2.pdf",
    2: "2Reglamento-Ley-Organica-de-Telecomunicaciones4.pdf",
    3: "3REGLAMENTO-PARA-LA-PRESTACION-DE-SERVICIOS-DE-TELECOMUNICACIONES12.pdf",
    4: "4resolucion_reforma_norma_de_condiciones_generalessigned_signed1-signed-signed.pdf",
    5: "5PARAMETROS DE CALIDAD_GOBRAVCORPSA.pdf",
    6: "6qos sva 4.pdf",
    7: "7terminologias 2.pdf",
    8: "8reglamento valor agregado.pdf",
    9: "9ley_organica_discapacidades 1.pdf",
    10: "10LEY ORGANICA DE LAS PERSONAS ADULTOS MAYORES (2) 2.pdf",
    11: "11reglamento tercera edad 3.pdf",
    12: "12política_publica_internet_segura 4.pdf",
    13: "13Consejos_de_seguridad 2.pdf",
    14: "14control parental 2.pdf",
    15: "15propuesta_335-normativa_reforma_norma_condiciones_generales-contratos adhesion.pdf",
    16: "16Saturacion.pdf",
  };

  const getDocumentUrl = (id) => `/Documents/${documentosPaths[id]}`;

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-emerald-500/5 to-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo y descripción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Link to="/">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-white via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  Telcom<span className="text-emerald-500">fib</span>
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-emerald-500 pl-4">
              Conectando hogares y empresas con la mejor tecnología de fibra
              óptica en Guayaquil. Velocidad, estabilidad y soporte 24/7.
            </p>

            {/* Contacto rápido */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                <FaPhoneAlt className="w-3 h-3 text-emerald-500" />
                <span>098 608 3855</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                <FaEnvelope className="w-3 h-3 text-emerald-500" />
                <span>ventas@telcomfib.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <FaMapMarkerAlt className="w-3 h-3 text-emerald-500" />
                <span>Nueva Prosperina Mz 754 Sl 23, Guayaquil</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl text-white text-sm font-semibold hover:shadow-lg transition-all hover:scale-105 mt-4"
            >
              <FaWhatsapp className="w-4 h-4" />
              Contratar ahora
            </button>
          </motion.div>

          {/* Enlaces de Interés - Documentos Legales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                <FaFileAlt className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Documentos Legales
              </span>
            </h3>
            <ul className="space-y-3">
              {[
                {
                  name: "ARCOTEL",
                  url: "https://www.arcotel.gob.ec",
                  external: true,
                },
                {
                  name: "MINTEL",
                  url: "https://www.telecomunicaciones.gob.ec/",
                  external: true,
                },
                {
                  name: "Ley Orgánica Telecomunicaciones",
                  url: getDocumentUrl(1),
                },
                {
                  name: "Reglamento Prestación Servicios",
                  url: getDocumentUrl(3),
                },
                {
                  name: "Parámetros de Calidad",
                  url: getDocumentUrl(5),
                },
                {
                  name: "Servicios de Valor Agregado",
                  url: getDocumentUrl(8),
                },
                {
                  name: "Ley de Discapacidades",
                  url: getDocumentUrl(9),
                },
                {
                  name: "Ley Adulto Mayor",
                  url: getDocumentUrl(10),
                },
                {
                  name: "Reglamento Tercera Edad",
                  url: getDocumentUrl(11),
                },
                {
                  name: "Propuesta 335 - Contratos Adhesión",
                  url: getDocumentUrl(15),
                },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target={link.external ? "_blank" : "_blank"}
                    rel={
                      link.external
                        ? "noopener noreferrer"
                        : "noopener noreferrer"
                    }
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 py-1"
                  >
                    <div className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm">{link.name}</span>
                    {link.external && (
                      <FaExternalLinkAlt className="w-3 h-3 text-slate-600 group-hover:text-emerald-400" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Zona de Clientes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                <FaUsers className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Zona de Clientes
              </span>
            </h3>
            <ul className="space-y-3">
              {[
                {
                  name: "Control Parental",
                  url: getDocumentUrl(14),
                  icon: FaShieldAlt,
                },
                {
                  name: "Consejos de Seguridad",
                  url: getDocumentUrl(13),
                  icon: FaShieldAlt,
                },
                {
                  name: "Parámetros de Calidad",
                  url: getDocumentUrl(5),
                  icon: FaStar,
                },
                {
                  name: "Terminologías Técnicas",
                  url: getDocumentUrl(7),
                  icon: FaFileAlt,
                },
                {
                  name: "Política Internet Segura",
                  url: getDocumentUrl(12),
                  icon: FaShieldAlt,
                },
                {
                  name: "Saturación de Red",
                  url: getDocumentUrl(16),
                  icon: FaBroadcastTower,
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 py-1"
                    >
                      <Icon className="w-3 h-3 text-emerald-500 group-hover:text-emerald-400" />
                      <span className="text-sm">{item.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Speedtest */}
            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <a
                href="https://www.speedtest.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all group border border-slate-700"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                  <FaBroadcastTower className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    Test de Velocidad
                  </p>
                  <p className="text-xs text-slate-400">Verifica tu conexión</p>
                </div>
                <FaExternalLinkAlt className="w-3 h-3 text-slate-500 group-hover:text-emerald-400" />
              </a>
            </div>
          </motion.div>

          {/* Navegación y Redes Sociales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                <FaHome className="w-4 h-4 text-white" />
              </div>
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Navegación
              </span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Inicio", url: "/" },
                { name: "Planes", url: "/planes" },
                { name: "Sobre Nosotros", url: "/sobre-nosotros" },
                { name: "Documentos", url: "/documentos" },
                { name: "Contacto", url: "/contacto" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.url}
                    className="group flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 py-1"
                  >
                    <div className="w-1 h-1 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Redes Sociales */}
            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <h4 className="text-sm font-semibold text-white mb-3">
                Síguenos
              </h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <FaFacebook className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <FaInstagram className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
                <a
                  href="https://wa.me/593986083855"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <FaWhatsapp className="w-5 h-5 text-slate-400 hover:text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-slate-700/50 my-8"></div>

        {/* Pie inferior */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <span className="text-slate-400">© {currentYear} Telcomfib</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">
              Todos los derechos reservados
            </span>
            <span className="text-slate-600">•</span>
            <Link
              to="/terminos"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Términos y Condiciones
            </Link>
            <span className="text-slate-600">•</span>
            <Link
              to="/privacidad"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              Política de Privacidad
            </Link>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <FaHeart className="w-3 h-3 text-emerald-500 animate-pulse" />
              <span>By ZG</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <FaCode className="w-3 h-3 text-blue-500" />
              <span>por</span>
              <span className="text-emerald-500 font-semibold">
                JhonnVicTech
              </span>
            </div>
          </div>

          <p className="text-slate-500 text-xs max-w-3xl mx-auto leading-relaxed">
            Telcomfib cumple con todos los requisitos establecidos por la
            Agencia de Regulación y Control de las Telecomunicaciones (ARCOTEL)
            y el Ministerio de Telecomunicaciones (MINTEL). Nuestros servicios
            están regulados bajo la Ley Orgánica de Telecomunicaciones y sus
            respectivos reglamentos, garantizando calidad, seguridad y
            transparencia en la prestación de servicios de fibra óptica.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-slate-500">Red Activa</span>
            </div>
            <div className="w-px h-3 bg-slate-600" />
            <div className="flex items-center gap-1">
              <FaClock className="w-3 h-3 text-slate-500" />
              <span className="text-[10px] text-slate-500">Soporte 24/7</span>
            </div>
            <div className="w-px h-3 bg-slate-600" />
            <div className="flex items-center gap-1">
              <FaBroadcastTower className="w-3 h-3 text-slate-500" />
              <span className="text-[10px] text-slate-500">
                Fibra Óptica 100%
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
