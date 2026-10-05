import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCookieBite,
  FaLock,
  FaChartBar,
  FaBullhorn,
  FaSlidersH,
  FaEnvelope,
  FaBalanceScale,
  FaInfoCircle,
} from "react-icons/fa";
import { openCookiePreferences } from "../utils/cookieConsent";

const ULTIMA_ACTUALIZACION = "5 de octubre de 2026";

const categorias = [
  {
    icon: FaLock,
    titulo: "Estrictamente necesarias",
    consentimiento: "No requiere consentimiento",
    finalidad:
      "Funcionamiento técnico del sitio, seguridad de la red y prestación de los servicios solicitados por el abonado: mantener la sesión, autenticación en el portal de clientes, prevención de fraude, balanceo de carga y registro de las preferencias de cookies.",
    duracion: "De sesión hasta 12 meses",
    titularidad: "Propias",
  },
  {
    icon: FaChartBar,
    titulo: "Analíticas y de rendimiento",
    consentimiento: "Requiere consentimiento",
    finalidad:
      "Medición estadística y agregada del uso del sitio: páginas más visitadas, origen del tráfico, velocidad de carga y errores, con el fin de mejorar la experiencia de navegación y la calidad del servicio.",
    duracion: "Hasta 24 meses",
    titularidad: "Propias y de terceros",
  },
  {
    icon: FaBullhorn,
    titulo: "Marketing y publicidad",
    consentimiento: "Requiere consentimiento",
    finalidad:
      "Mostrar promociones y planes de fibra óptica relevantes, limitar la frecuencia de los anuncios y medir el resultado de las campañas en buscadores y redes sociales.",
    duracion: "Hasta 12 meses",
    titularidad: "Propias y de terceros",
  },
];

const derechos = [
  "Acceso a los datos personales que tratamos sobre ti.",
  "Rectificación de la información inexacta o incompleta.",
  "Eliminación o supresión de tus datos personales.",
  "Oposición al tratamiento y revocatoria del consentimiento otorgado.",
  "Portabilidad de tus datos en un formato estructurado y de uso común.",
  "No ser objeto de decisiones automatizadas que te afecten significativamente.",
];

const navegadores = [
  {
    nombre: "Google Chrome",
    url: "https://support.google.com/chrome/answer/95647",
  },
  {
    nombre: "Mozilla Firefox",
    url: "https://support.mozilla.org/es/kb/Borrar%20cookies",
  },
  {
    nombre: "Microsoft Edge",
    url: "https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
  {
    nombre: "Safari",
    url: "https://support.apple.com/es-es/guide/safari/sfri11471/mac",
  },
];

// ── Bloque de sección ────────────────────────────────────────────────────────
const Seccion = ({ numero, titulo, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="space-y-3"
  >
    <h2 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 text-sm font-bold text-white">
        {numero}
      </span>
      {titulo}
    </h2>
    <div className="space-y-3 pl-0 sm:pl-11 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
      {children}
    </div>
  </motion.section>
);

const PoliticaCookies = () => {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* Encabezado */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
              <FaCookieBite className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-400">
                Transparencia y privacidad
              </span>
            </div>

            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Política de Cookies
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300">
              Esta política explica qué son las cookies, cuáles utilizamos en el
              sitio web de Telcomfib, con qué finalidad, durante cuánto tiempo
              las conservamos y cómo puedes aceptar, rechazar o revocar tu
              consentimiento en cualquier momento.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={openCookiePreferences}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40"
              >
                <FaSlidersH className="h-3.5 w-3.5" />
                Configurar mis cookies
              </button>
              <span className="text-xs text-slate-400">
                Última actualización: {ULTIMA_ACTUALIZACION}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenido */}
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-12 lg:py-16">
        <Seccion numero="1" titulo="Responsable del tratamiento">
          <p>
            El responsable del tratamiento de los datos personales recogidos a
            través de las cookies de este sitio web es{" "}
            <strong className="text-slate-900 dark:text-white">
              Telcomfib
            </strong>
            , proveedor de servicios de acceso a internet con título habilitante
            otorgado por la Agencia de Regulación y Control de las
            Telecomunicaciones (ARCOTEL).
          </p>
          <p>
            Para cualquier consulta sobre esta política o sobre el ejercicio de
            tus derechos puedes escribirnos a través de nuestra{" "}
            <Link
              to="/contacto"
              className="font-semibold text-emerald-600 underline decoration-emerald-500/40 underline-offset-2 hover:decoration-emerald-500 dark:text-emerald-400"
            >
              página de contacto
            </Link>
            .
          </p>
        </Seccion>

        <Seccion numero="2" titulo="¿Qué son las cookies?">
          <p>
            Las cookies son pequeños archivos de texto que se descargan y
            almacenan en el dispositivo del usuario (computador, teléfono o
            tableta) cuando visita un sitio web. Permiten que el sitio recuerde
            información sobre la visita, como el idioma, la sesión iniciada o
            las preferencias elegidas. En esta política usamos el término
            «cookies» de forma amplia, incluyendo tecnologías equivalentes como
            el almacenamiento local del navegador (localStorage) y los píxeles
            de seguimiento.
          </p>
        </Seccion>

        <Seccion numero="3" titulo="Consentimiento previo e informado">
          <p>
            En tu primera visita mostramos un banner de cookies en el que puedes{" "}
            <strong className="text-slate-900 dark:text-white">
              aceptar todas
            </strong>
            ,{" "}
            <strong className="text-slate-900 dark:text-white">
              rechazar las no esenciales
            </strong>{" "}
            o{" "}
            <strong className="text-slate-900 dark:text-white">
              personalizar
            </strong>{" "}
            categoría por categoría. Las cookies no esenciales (analíticas y de
            marketing) no se instalan hasta que otorgas tu consentimiento
            expreso y activo.
          </p>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <div className="flex gap-3">
              <FaInfoCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Se exceptúan del consentimiento las cookies estrictamente
                necesarias para el funcionamiento técnico del sitio, la
                seguridad de la red o la prestación de un servicio solicitado
                expresamente por el abonado, como las cookies de sesión y de
                autenticación en el portal de clientes.
              </p>
            </div>
          </div>
          <p>
            Tu decisión se guarda en este navegador, por lo que el banner no
            vuelve a mostrarse en visitas posteriores. Si borras los datos del
            navegador, usas otro dispositivo o navegas en modo privado, el
            banner aparecerá de nuevo.
          </p>
        </Seccion>

        <Seccion numero="4" titulo="Cookies que utilizamos">
          <div className="space-y-3">
            {categorias.map((categoria) => {
              const Icono = categoria.icon;
              const esNecesaria = categoria.titulo.startsWith("Estrictamente");

              return (
                <div
                  key={categoria.titulo}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700/60 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10">
                      <Icono className="h-4 w-4 text-emerald-500" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {categoria.titulo}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        esNecesaria
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {categoria.consentimiento}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {categoria.finalidad}
                  </p>

                  <dl className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4 text-xs dark:border-slate-700/60 sm:grid-cols-2">
                    <div>
                      <dt className="font-semibold uppercase tracking-wide text-slate-400">
                        Plazo de conservación
                      </dt>
                      <dd className="mt-0.5 text-slate-700 dark:text-slate-200">
                        {categoria.duracion}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold uppercase tracking-wide text-slate-400">
                        Titularidad
                      </dt>
                      <dd className="mt-0.5 text-slate-700 dark:text-slate-200">
                        {categoria.titularidad}
                      </dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </Seccion>

        <Seccion numero="5" titulo="Cómo revocar o cambiar tu consentimiento">
          <p>
            Puedes modificar o retirar tu consentimiento en cualquier momento,
            sin que ello afecte la licitud del tratamiento previo:
          </p>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>
                Desde el botón{" "}
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="font-semibold text-emerald-600 underline decoration-emerald-500/40 underline-offset-2 hover:decoration-emerald-500 dark:text-emerald-400"
                >
                  Configurar mis cookies
                </button>
                , disponible en esta página y en el pie de cada página del
                sitio.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              <span>
                Desde la configuración de tu navegador, donde además puedes
                bloquear o eliminar las cookies ya almacenadas. Ten en cuenta
                que bloquear las cookies necesarias puede impedir el correcto
                funcionamiento de algunas secciones del sitio.
              </span>
            </li>
          </ul>

          <div className="flex flex-wrap gap-2 pt-1">
            {navegadores.map((navegador) => (
              <a
                key={navegador.nombre}
                href={navegador.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-500/50 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                {navegador.nombre}
              </a>
            ))}
          </div>
        </Seccion>

        <Seccion numero="6" titulo="Tus derechos como titular de datos">
          <p>
            Conforme a la Ley Orgánica de Protección de Datos Personales
            (LOPDP), como titular de los datos puedes ejercer los siguientes
            derechos:
          </p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {derechos.map((derecho) => (
              <li
                key={derecho}
                className="flex gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs dark:border-slate-700/60 dark:bg-slate-900"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                <span>{derecho}</span>
              </li>
            ))}
          </ul>
          <p className="flex items-start gap-2 pt-1">
            <FaEnvelope className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
            <span>
              Para ejercerlos, comunícate con nosotros desde la{" "}
              <Link
                to="/contacto"
                className="font-semibold text-emerald-600 underline decoration-emerald-500/40 underline-offset-2 hover:decoration-emerald-500 dark:text-emerald-400"
              >
                sección de contacto
              </Link>
              . Atenderemos tu solicitud en los plazos previstos por la
              normativa vigente.
            </span>
          </p>
        </Seccion>

        <Seccion numero="7" titulo="Marco normativo aplicable">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-900">
            <div className="flex gap-3">
              <FaBalanceScale className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
              <div className="space-y-2">
                <p>
                  El tratamiento de datos personales a través de este sitio web
                  se rige por la{" "}
                  <strong className="text-slate-900 dark:text-white">
                    Ley Orgánica de Protección de Datos Personales
                  </strong>{" "}
                  y su reglamento, así como por la{" "}
                  <strong className="text-slate-900 dark:text-white">
                    Ley Orgánica de Telecomunicaciones
                  </strong>{" "}
                  y la normativa emitida por{" "}
                  <strong className="text-slate-900 dark:text-white">
                    ARCOTEL
                  </strong>{" "}
                  en materia de secreto de las comunicaciones y protección de
                  los datos de los abonados.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Puedes consultar la normativa de telecomunicaciones aplicable
                  en nuestra{" "}
                  <Link
                    to="/documentos"
                    className="font-semibold text-emerald-600 underline decoration-emerald-500/40 underline-offset-2 hover:decoration-emerald-500 dark:text-emerald-400"
                  >
                    sección de documentos
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </Seccion>

        <Seccion numero="8" titulo="Cambios en esta política">
          <p>
            Podemos actualizar esta Política de Cookies para adaptarla a
            cambios normativos, técnicos u operativos. Cuando la actualización
            afecte a las finalidades para las que solicitamos tu
            consentimiento, volveremos a mostrarte el banner para que puedas
            manifestar nuevamente tu decisión.
          </p>
        </Seccion>
      </div>
    </main>
  );
};

export default PoliticaCookies;
