import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCookieBite,
  FaShieldAlt,
  FaChartBar,
  FaBullhorn,
  FaLock,
  FaCheck,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";
import {
  getConsent,
  hasDecided,
  saveConsent,
  onOpenPreferences,
} from "../utils/cookieConsent";

// Categorías mostradas en el panel de personalización
const CATEGORIAS = [
  {
    id: "necesarias",
    icon: FaLock,
    titulo: "Estrictamente necesarias",
    obligatoria: true,
    descripcion:
      "Permiten el funcionamiento técnico del sitio, la seguridad de la red y la prestación de los servicios que solicitas (sesión, autenticación en el portal de clientes y balanceo de carga). No requieren consentimiento según la LOPDP.",
    duracion: "Sesión / hasta 12 meses",
  },
  {
    id: "analiticas",
    icon: FaChartBar,
    titulo: "Analíticas y de rendimiento",
    obligatoria: false,
    descripcion:
      "Nos ayudan a entender de forma estadística cómo se navega el sitio (páginas más visitadas, errores, velocidad de carga) para mejorar la experiencia y la calidad del servicio.",
    duracion: "Hasta 24 meses",
  },
  {
    id: "marketing",
    icon: FaBullhorn,
    titulo: "Marketing y publicidad",
    obligatoria: false,
    descripcion:
      "Se utilizan para mostrarte promociones y planes de fibra óptica relevantes y medir el resultado de nuestras campañas en redes sociales.",
    duracion: "Hasta 12 meses",
  },
];

// ── Interruptor ──────────────────────────────────────────────────────────────
const Toggle = ({ checked, disabled, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative w-12 h-6 shrink-0 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
      checked
        ? "bg-gradient-to-r from-emerald-500 to-blue-500"
        : "bg-slate-300 dark:bg-slate-700"
    } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
        checked ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
);

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [mostrarPanel, setMostrarPanel] = useState(false);
  // true cuando el usuario ya había decidido y reabre el panel desde el footer:
  // en ese caso puede cerrar sin volver a decidir.
  const [esReapertura, setEsReapertura] = useState(false);
  const [preferencias, setPreferencias] = useState({
    necesarias: true,
    analiticas: false,
    marketing: false,
  });

  // Primera visita: solo se muestra si el usuario nunca decidió
  useEffect(() => {
    if (hasDecided()) return;

    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Permite reabrir las preferencias desde el footer o cualquier enlace
  useEffect(
    () =>
      onOpenPreferences(() => {
        const actual = getConsent();
        if (actual) {
          setPreferencias({
            necesarias: true,
            analiticas: actual.analiticas,
            marketing: actual.marketing,
          });
        }
        setEsReapertura(Boolean(actual));
        setMostrarPanel(true);
        setVisible(true);
      }),
    [],
  );

  const cerrar = () => {
    setVisible(false);
    setMostrarPanel(false);
    setEsReapertura(false);
  };

  const aceptarTodas = () => {
    saveConsent({ analiticas: true, marketing: true });
    cerrar();
  };

  const rechazarNoEsenciales = () => {
    saveConsent({ analiticas: false, marketing: false });
    cerrar();
  };

  const guardarSeleccion = () => {
    saveConsent(preferencias);
    cerrar();
  };

  const actualizar = (id, valor) =>
    setPreferencias((prev) => ({ ...prev, [id]: valor }));

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Fondo atenuado solo cuando se personaliza */}
          <AnimatePresence>
            {mostrarPanel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm"
                aria-hidden="true"
              />
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: "spring", damping: 24, stiffness: 220 }}
            role="dialog"
            data-testid="cookie-banner"
            aria-modal={mostrarPanel ? "true" : "false"}
            aria-labelledby="cookie-consent-titulo"
            className="fixed inset-x-0 bottom-0 z-[1001] p-3 sm:p-4 md:p-6"
          >
            <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/20">
              {/* Borde superior de marca */}
              <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500" />

              <div className="max-h-[80vh] overflow-y-auto">
                <div className="p-5 sm:p-6 md:p-7">
                  {/* Encabezado */}
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-12 h-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 shadow-lg shadow-emerald-500/20">
                      <FaCookieBite className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2
                        id="cookie-consent-titulo"
                        className="flex items-center gap-2 text-base sm:text-lg font-bold text-slate-900 dark:text-white"
                      >
                        <FaCookieBite className="w-5 h-5 text-emerald-500 sm:hidden" />
                        Uso de cookies en Telcomfib
                      </h2>

                      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        Utilizamos cookies propias estrictamente necesarias para
                        el funcionamiento y la seguridad del sitio, y, con tu
                        autorización, cookies analíticas y de marketing para
                        mejorar nuestros servicios de fibra óptica. Puedes
                        aceptarlas todas, rechazar las no esenciales o elegir
                        cuáles permitir. Tu decisión se guarda en este navegador
                        y puedes cambiarla cuando quieras.
                      </p>

                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        Tratamos tus datos conforme a la Ley Orgánica de
                        Protección de Datos Personales del Ecuador y a la
                        normativa de ARCOTEL. Más detalle en nuestra{" "}
                        <Link
                          to="/politica-de-cookies"
                          onClick={cerrar}
                          className="font-semibold text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/40 hover:decoration-emerald-500 underline-offset-2"
                        >
                          Política de Cookies
                        </Link>
                        .
                      </p>
                    </div>

                    {/* Solo se puede cerrar sin decidir si ya había una
                        decisión previa (reapertura desde el footer) */}
                    {(esReapertura || mostrarPanel) && (
                      <button
                        type="button"
                        data-testid="cookie-cerrar"
                        onClick={() =>
                          esReapertura ? cerrar() : setMostrarPanel(false)
                        }
                        aria-label={
                          esReapertura
                            ? "Cerrar preferencias de cookies"
                            : "Volver al aviso de cookies"
                        }
                        className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Panel de personalización */}
                  <AnimatePresence initial={false}>
                    {mostrarPanel && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-5 space-y-3 border-t border-slate-200 dark:border-slate-700/60 pt-5">
                          {CATEGORIAS.map((categoria) => {
                            const Icono = categoria.icon;
                            const activa = categoria.obligatoria
                              ? true
                              : preferencias[categoria.id];

                            return (
                              <div
                                key={categoria.id}
                                className="rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/50 p-4"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex items-start gap-3 min-w-0">
                                    <Icono className="mt-0.5 w-4 h-4 shrink-0 text-emerald-500" />
                                    <div className="min-w-0">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                          {categoria.titulo}
                                        </h3>
                                        {categoria.obligatoria && (
                                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                                            Siempre activas
                                          </span>
                                        )}
                                      </div>
                                      <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                                        {categoria.descripcion}
                                      </p>
                                      <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-500">
                                        Conservación: {categoria.duracion}
                                      </p>
                                    </div>
                                  </div>

                                  <Toggle
                                    checked={activa}
                                    disabled={categoria.obligatoria}
                                    onChange={(valor) =>
                                      actualizar(categoria.id, valor)
                                    }
                                    label={`Permitir cookies ${categoria.titulo}`}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Acciones */}
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-end">
                    {mostrarPanel ? (
                      <>
                        <button
                          type="button"
                          onClick={guardarSeleccion}
                          data-testid="cookie-guardar"
                          className="order-2 sm:order-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <FaCheck className="w-3.5 h-3.5" />
                          Guardar mi selección
                        </button>
                        <button
                          type="button"
                          onClick={aceptarTodas}
                          data-testid="cookie-aceptar"
                          className="order-1 sm:order-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all"
                        >
                          <FaShieldAlt className="w-3.5 h-3.5" />
                          Aceptar todas
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setMostrarPanel(true)}
                          data-testid="cookie-personalizar"
                          className="order-3 sm:order-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <FaSlidersH className="w-3.5 h-3.5" />
                          Personalizar
                        </button>
                        <button
                          type="button"
                          onClick={rechazarNoEsenciales}
                          data-testid="cookie-rechazar"
                          className="order-2 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          Rechazar no esenciales
                        </button>
                        <button
                          type="button"
                          onClick={aceptarTodas}
                          data-testid="cookie-aceptar"
                          className="order-1 sm:order-3 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] transition-all"
                        >
                          <FaShieldAlt className="w-3.5 h-3.5" />
                          Aceptar todas
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
