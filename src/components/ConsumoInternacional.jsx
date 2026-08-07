/**
 * ConsumoInternacional.jsx — Porcentaje de capacidad efectiva utilizada
 * frente a la capacidad internacional total contratada por Telcomfib.
 *
 * Los datos y la capacidad contratada se editan en: src/data/consumoInternacional.js
 */

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaGlobeAmericas,
  FaInfoCircle,
  FaTable,
} from "react-icons/fa";
import {
  CAPACIDAD_CONTRATADA_GBPS,
  NOMBRES_MES,
  listarMesesDisponibles,
  obtenerSerieMensual,
  resumirPeriodo,
} from "../data/consumoInternacional";

/* Paleta de la gráfica (validada sobre superficie oscura: banda de luminosidad,
   croma, separación para daltonismo y contraste ≥ 3:1). */
const SERIE_USO = "#0d95dd"; // uso efectivo
const SERIE_CAPACIDAD = "#0f9d6e"; // capacidad contratada (100 %)

/* Geometría del lienzo SVG */
const W = 900;
const H = 380;
const M = { top: 40, right: 28, bottom: 46, left: 56 };
const PLOT_W = W - M.left - M.right;
const PLOT_H = H - M.top - M.bottom;

const escalaY = (porcentaje) => M.top + PLOT_H * (1 - porcentaje / 110);

const Grafica = ({ dias, etiquetaPeriodo }) => {
  const [activo, setActivo] = useState(null);

  const escalaX = (i) =>
    dias.length === 1
      ? M.left + PLOT_W / 2
      : M.left + (PLOT_W * i) / (dias.length - 1);

  const puntos = dias.map((d, i) => [escalaX(i), escalaY(d.porcentaje)]);
  const linea = puntos.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `${M.left},${M.top + PLOT_H} ${linea} ${
    puntos[puntos.length - 1][0]
  },${M.top + PLOT_H}`;

  // El día en curso se dibuja con trazo discontinuo: aún no ha cerrado.
  const enCurso = dias[dias.length - 1]?.parcial && dias.length > 1;
  const lineaCerrada = enCurso
    ? puntos
        .slice(0, -1)
        .map(([x, y]) => `${x},${y}`)
        .join(" ")
    : linea;
  const ultimoPunto = puntos[puntos.length - 1];
  const penultimoPunto = puntos[puntos.length - 2];

  const yCapacidad = escalaY(100);

  const manejarPuntero = (e) => {
    const caja = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - caja.left) / caja.width) * W;
    let mejor = 0;
    let dist = Infinity;
    dias.forEach((_, i) => {
      const d = Math.abs(escalaX(i) - x);
      if (d < dist) {
        dist = d;
        mejor = i;
      }
    });
    setActivo(mejor);
  };

  const punto = activo !== null ? dias[activo] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto touch-none"
        onPointerMove={manejarPuntero}
        onPointerLeave={() => setActivo(null)}
        role="img"
        aria-label={`Porcentaje diario de uso del enlace internacional en ${etiquetaPeriodo}`}
      >
        <defs>
          <linearGradient id="ci-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={SERIE_USO} stopOpacity="0.55" />
            <stop offset="100%" stopColor={SERIE_USO} stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Rejilla + eje Y */}
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line
              x1={M.left}
              x2={W - M.right}
              y1={escalaY(v)}
              y2={escalaY(v)}
              stroke="#ffffff"
              strokeOpacity={v === 0 ? 0.18 : 0.07}
              strokeWidth="1"
            />
            <text
              x={M.left - 12}
              y={escalaY(v) + 4}
              textAnchor="end"
              className="fill-slate-400"
              fontSize="11"
            >
              {v} %
            </text>
          </g>
        ))}

        {/* Referencia: capacidad contratada (100 %) */}
        <line
          x1={M.left}
          x2={W - M.right}
          y1={yCapacidad}
          y2={yCapacidad}
          stroke={SERIE_CAPACIDAD}
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <text
          x={W - M.right}
          y={yCapacidad - 10}
          textAnchor="end"
          fill={SERIE_CAPACIDAD}
          fontSize="11"
          fontWeight="600"
        >
          Capacidad contratada · {CAPACIDAD_CONTRATADA_GBPS} Gbps
        </text>

        {/* Área + línea de uso efectivo */}
        <polygon points={area} fill="url(#ci-area)" />
        <polyline
          points={lineaCerrada}
          fill="none"
          stroke={SERIE_USO}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Tramo del día en curso (aún no cerrado) */}
        {enCurso && (
          <>
            <line
              x1={penultimoPunto[0]}
              y1={penultimoPunto[1]}
              x2={ultimoPunto[0]}
              y2={ultimoPunto[1]}
              stroke={SERIE_USO}
              strokeWidth="2"
              strokeDasharray="4 4"
              strokeLinecap="round"
            />
            <circle
              cx={ultimoPunto[0]}
              cy={ultimoPunto[1]}
              r="5"
              fill={SERIE_USO}
              stroke="#0b1220"
              strokeWidth="2"
            />
            {/* Pulso "en vivo" */}
            <circle
              cx={ultimoPunto[0]}
              cy={ultimoPunto[1]}
              r="5"
              fill="none"
              stroke={SERIE_USO}
            >
              <animate
                attributeName="r"
                values="5;14"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}

        {/* Eje X: días */}
        {dias.map((d, i) => {
          const paso = Math.ceil(dias.length / 12);
          if (i % paso !== 0 && i !== dias.length - 1) return null;
          return (
            <text
              key={d.dia}
              x={escalaX(i)}
              y={H - M.bottom + 22}
              textAnchor="middle"
              className="fill-slate-400"
              fontSize="11"
            >
              {d.dia}
            </text>
          );
        })}
        <text
          x={M.left + PLOT_W / 2}
          y={H - 8}
          textAnchor="middle"
          className="fill-slate-500"
          fontSize="11"
        >
          Día del mes
        </text>

        {/* Capa de interacción: cruz + marcador */}
        {punto && (
          <g pointerEvents="none">
            <line
              x1={escalaX(activo)}
              x2={escalaX(activo)}
              y1={M.top}
              y2={M.top + PLOT_H}
              stroke="#ffffff"
              strokeOpacity="0.28"
              strokeWidth="1"
            />
            <circle
              cx={escalaX(activo)}
              cy={escalaY(punto.porcentaje)}
              r="6"
              fill={SERIE_USO}
              stroke="#0b1220"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>

      {/* Tooltip */}
      {punto && (
        <div
          className="pointer-events-none absolute top-2 z-10 rounded-xl border border-white/10 bg-slate-900/95 px-3 py-2 shadow-xl backdrop-blur"
          style={{
            left: `${(escalaX(activo) / W) * 100}%`,
            transform: `translateX(${activo > dias.length / 2 ? "-105%" : "5%"})`,
          }}
        >
          <p className="text-[11px] font-mono text-slate-400">
            Día {punto.dia} · {etiquetaPeriodo}
            {punto.parcial && " · en curso"}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm font-bold text-white">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: SERIE_USO }}
            />
            {punto.porcentaje} % de uso
          </p>
          <p className="text-xs text-slate-400">
            {punto.gbps} Gbps de {CAPACIDAD_CONTRATADA_GBPS} Gbps
          </p>
        </div>
      )}

      {/* Leyenda */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
        <span className="flex items-center gap-2 text-xs text-slate-300">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: SERIE_USO }}
          />
          Porcentaje de uso efectivo
        </span>
        <span className="flex items-center gap-2 text-xs text-slate-300">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: SERIE_CAPACIDAD }}
          />
          Capacidad total contratada (100 %)
        </span>
        {enCurso && (
          <span className="flex items-center gap-2 text-xs text-slate-300">
            <svg width="20" height="4" aria-hidden="true">
              <line
                x1="0"
                y1="2"
                x2="20"
                y2="2"
                stroke={SERIE_USO}
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
            Día en curso (promedio parcial)
          </span>
        )}
      </div>
    </div>
  );
};

const Kpi = ({ etiqueta, valor, unidad, detalle, color }) => (
  <div className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all hover:shadow-lg dark:border-white/10 dark:bg-slate-800/50">
    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
      {etiqueta}
    </p>
    <p className={`mt-2 text-3xl font-black ${color}`}>
      {valor}
      <span className="ml-1 text-base font-semibold">{unidad}</span>
    </p>
    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{detalle}</p>
  </div>
);

const ConsumoInternacional = () => {
  /* Reloj vivo: cada minuto se refresca la referencia temporal, así el día en
     curso avanza solo, a medianoche entra un día nuevo y al terminar el mes
     la gráfica pasa al siguiente sin recargar la página. */
  const [ahora, setAhora] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const meses = useMemo(
    () => listarMesesDisponibles(ahora),
    // Solo hace falta recalcular el listado cuando cambia el mes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ahora.getFullYear(), ahora.getMonth()],
  );
  const [seleccion, setSeleccion] = useState(0);
  const [tablaAbierta, setTablaAbierta] = useState(false);

  const { anio, mes, etiqueta, actual } = meses[seleccion] || meses[0];
  const { dias, simulado } = useMemo(
    () => obtenerSerieMensual(anio, mes, ahora),
    [anio, mes, ahora],
  );
  /* Los indicadores se calculan sobre días cerrados: el día en curso todavía
     no tiene su promedio completo y distorsionaría el resumen del mes. */
  const resumen = useMemo(() => {
    const cerrados = dias.filter((d) => !d.parcial);
    return resumirPeriodo(cerrados.length ? cerrados : dias);
  }, [dias]);
  const diaEnCurso = dias.find((d) => d.parcial);

  const horaActualizacion = ahora.toLocaleTimeString("es-EC", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Decorativos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
            <FaGlobeAmericas className="h-3.5 w-3.5 text-emerald-500" />
            <span className="font-mono text-sm tracking-wider text-emerald-600 dark:text-emerald-400">
              ENLACE INTERNACIONAL
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-black md:text-6xl">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Consumo Internacional
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
            Porcentaje promedio de capacidad efectiva utilizada frente a la
            capacidad internacional total contratada por Telcomfib. La gráfica
            se actualiza cada día y cambia de mes automáticamente.
          </p>
        </motion.div>

        {/* Barra de estado + selector */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-slate-800/50">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span>
              Monitoreo{" "}
              <strong className="text-slate-900 dark:text-white">
                {actual ? "en curso" : "cerrado"}
              </strong>{" "}
              · {dias.length} días registrados de {NOMBRES_MES[mes]}
            </span>
            {actual && diaEnCurso && (
              <span className="font-mono text-xs text-slate-400">
                · hoy {diaEnCurso.porcentaje} % ({diaEnCurso.gbps} Gbps) ·
                actualizado {horaActualizacion}
              </span>
            )}
          </div>

          <label className="flex items-center gap-3 text-sm">
            <span className="text-slate-500 dark:text-slate-400">Periodo:</span>
            <select
              value={seleccion}
              onChange={(e) => setSeleccion(Number(e.target.value))}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 outline-none focus:border-emerald-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
            >
              {meses.map((m, i) => (
                <option key={m.etiqueta} value={i}>
                  {m.etiqueta}
                  {m.actual ? " (mes actual)" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>

        {resumen && (
          <>
            {/* KPIs */}
            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Kpi
                etiqueta="Uso promedio"
                valor={resumen.promedio}
                unidad="%"
                detalle={`${resumen.gbpsPromedio} Gbps promedio`}
                color="text-blue-600 dark:text-blue-400"
              />
              <Kpi
                etiqueta="Pico máximo"
                valor={resumen.pico.porcentaje}
                unidad="%"
                detalle={`Día ${resumen.pico.dia} · ${resumen.pico.gbps} Gbps`}
                color="text-orange-500"
              />
              <Kpi
                etiqueta="Holgura disponible"
                valor={resumen.holgura}
                unidad="%"
                detalle={`${resumen.gbpsLibres} Gbps libres en promedio`}
                color="text-emerald-600 dark:text-emerald-400"
              />
              <Kpi
                etiqueta="Capacidad contratada"
                valor={CAPACIDAD_CONTRATADA_GBPS}
                unidad="Gbps"
                detalle="Salida internacional total"
                color="text-slate-900 dark:text-white"
              />
            </div>

            {/* Gráfica */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border border-white/10 bg-[#0b1220] p-6 shadow-2xl md:p-8"
            >
              <h2 className="text-center text-lg font-bold text-white md:text-xl">
                Porcentaje promedio de capacidad efectiva vs capacidad
                internacional
              </h2>
              <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-slate-400">
                {etiqueta}
              </p>
              <Grafica dias={dias} etiquetaPeriodo={etiqueta} />
            </motion.div>

            {/* Lectura del periodo */}
            <div className="mt-6 flex gap-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
              <FaInfoCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Lectura del periodo
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  En {etiqueta} el uso promedio de la capacidad internacional
                  fue del{" "}
                  <strong className="text-slate-900 dark:text-white">
                    {resumen.promedio} %
                  </strong>{" "}
                  ({resumen.gbpsPromedio} Gbps de los{" "}
                  {CAPACIDAD_CONTRATADA_GBPS} Gbps contratados), con un pico del{" "}
                  {resumen.pico.porcentaje} % el día {resumen.pico.dia} y un
                  mínimo del {resumen.minimo.porcentaje} %. Esto deja una
                  holgura promedio del {resumen.holgura} %.{" "}
                  {resumen.saturado
                    ? "Se registraron días en el límite de la capacidad contratada."
                    : "La red operó con holgura durante todo el mes: la capacidad contratada cubrió la demanda sin saturación."}
                  {actual && (
                    <>
                      {" "}
                      El día {ahora.getDate()} está en curso y su promedio se
                      actualiza cada hora hasta el cierre del día.
                    </>
                  )}
                  {simulado && (
                    <em className="ml-1 text-slate-500">
                      (Valores de referencia del monitoreo: aún no se cargan las
                      mediciones oficiales de este periodo.)
                    </em>
                  )}
                </p>
              </div>
            </div>

            {/* Tabla de datos */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm dark:border-white/10 dark:bg-slate-800/50">
              <button
                onClick={() => setTablaAbierta((v) => !v)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="flex items-center gap-3 font-semibold text-slate-900 dark:text-white">
                  <FaTable className="h-4 w-4 text-emerald-500" />
                  Ver tabla de datos diarios
                </span>
                <FaChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    tablaAbierta ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {tablaAbierta && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="overflow-x-auto border-t border-slate-200/70 dark:border-white/10">
                      <table className="w-full min-w-[560px] text-sm">
                        <thead>
                          <tr className="text-left font-mono text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            <th className="px-5 py-3">Fecha</th>
                            <th className="px-5 py-3">Uso efectivo</th>
                            <th className="px-5 py-3">Consumo (Gbps)</th>
                            <th className="px-5 py-3">Capacidad contratada</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dias.map((d) => (
                            <tr
                              key={d.dia}
                              className="border-t border-slate-100 dark:border-white/5"
                            >
                              <td className="px-5 py-3 text-slate-600 dark:text-slate-400">
                                {d.dia}/{String(mes + 1).padStart(2, "0")}/
                                {anio}
                                {d.parcial && (
                                  <span className="ml-2 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                                    en curso
                                  </span>
                                )}
                              </td>
                              <td className="px-5 py-3 font-semibold text-slate-900 dark:text-white">
                                {d.porcentaje} %
                              </td>
                              <td className="px-5 py-3 text-blue-600 dark:text-blue-400">
                                {d.gbps} Gbps
                              </td>
                              <td className="px-5 py-3 text-emerald-600 dark:text-emerald-400">
                                {CAPACIDAD_CONTRATADA_GBPS} Gbps · 100 %
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
          Los valores corresponden al promedio diario de utilización del enlace
          internacional de Telcomfib sobre la capacidad total contratada,
          publicados conforme a la normativa de la Agencia de Regulación y
          Control de las Telecomunicaciones (ARCOTEL).
        </p>
      </div>
    </section>
  );
};

export default ConsumoInternacional;
