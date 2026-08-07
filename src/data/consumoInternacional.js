/**
 * consumoInternacional.js — Datos del enlace internacional de Telcomfib
 *
 * La gráfica funciona como un monitoreo vivo:
 *   · Cada día aparece automáticamente un punto nuevo (a las 00:00 se cierra el
 *     día anterior y arranca el siguiente).
 *   · Al terminar el mes, cambia solo al mes siguiente.
 *   · El día en curso se recalcula cada hora siguiendo el perfil real de
 *     tráfico (bajo de madrugada, pico en la noche), así que el valor "de hoy"
 *     va subiendo durante el día en lugar de quedarse congelado.
 *   · La simulación es DETERMINISTA: la misma fecha y hora siempre dan el mismo
 *     valor, por lo que la curva no cambia entre recargas ni entre visitantes.
 *
 * 🔧 CÓMO AJUSTARLO:
 *
 * 1) Si cambia la capacidad contratada con el carrier, edita CAPACIDAD_CONTRATADA_GBPS.
 *
 * 2) Para fijar la banda en la que se mueve la simulación, edita BANDA_USO.
 *
 * 3) Para cargar mediciones reales de un mes (tienen prioridad sobre la
 *    simulación), agrega una entrada a REGISTROS con la clave "AAAA-MM" y un
 *    arreglo con el consumo efectivo de cada día en Gbps (posición 0 = día 1):
 *
 *       "2026-08": [5.81, 6.22, 5.95, ...],
 *
 *    Solo hace falta cargar los días ya transcurridos.
 */

/** Salida internacional total contratada, en Gbps. */
export const CAPACIDAD_CONTRATADA_GBPS = 8;

/** Banda de uso de la simulación, como fracción de la capacidad contratada. */
export const BANDA_USO = { min: 0.62, max: 0.82 };

/** Consumo efectivo diario en Gbps, por mes ("AAAA-MM"). */
export const REGISTROS = {
  // "2026-08": [5.81, 6.22, 5.95, 5.26, 5.25, 5.73, 5.46],
};

/** Cuántos meses hacia atrás se pueden consultar en el selector. */
export const MESES_HISTORICO = 12;

export const NOMBRES_MES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

/* ── Utilidades internas ──────────────────────────────────────────────────── */

export const claveMes = (anio, mes) =>
  `${anio}-${String(mes + 1).padStart(2, "0")}`;

export const diasDelMes = (anio, mes) => new Date(anio, mes + 1, 0).getDate();

/**
 * Generador determinista: la misma fecha siempre devuelve el mismo valor,
 * así la gráfica no "baila" entre recargas.
 */
const pseudoAleatorio = (semilla) => {
  const x = Math.sin(semilla * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Perfil horario de tráfico (peso relativo de cada hora del día).
 * Madrugada baja, subida progresiva y pico entre 19:00 y 22:00.
 */
const PERFIL_HORARIO = [
  0.55, 0.45, 0.38, 0.33, 0.32, 0.35, 0.42, 0.55, 0.68, 0.75, 0.8, 0.85, 0.88,
  0.86, 0.85, 0.88, 0.92, 0.97, 1.05, 1.15, 1.2, 1.18, 1.05, 0.8,
];
const PESO_MEDIO_DIA =
  PERFIL_HORARIO.reduce((a, b) => a + b, 0) / PERFIL_HORARIO.length;

/**
 * Promedio acumulado del día hasta cierta hora, como fracción del promedio
 * que tendrá el día completo. A las 03:00 va por debajo del promedio final;
 * a las 23:59 llega exactamente a 1.
 */
const factorParcialDia = (hora, minutos = 0) => {
  const avance = Math.min(hora + minutos / 60, 23.999);
  const completas = Math.floor(avance);
  let acumulado = 0;
  for (let h = 0; h < completas; h++) acumulado += PERFIL_HORARIO[h];
  acumulado += PERFIL_HORARIO[completas] * (avance - completas);
  return acumulado / (avance + 1e-6) / PESO_MEDIO_DIA;
};

/**
 * Curva simulada de uso (en Gbps) para un mes sin registros cargados.
 * Se mueve dentro de BANDA_USO, con los fines de semana algo más altos.
 */
const simularMes = (anio, mes, dias) => {
  const { min, max } = BANDA_USO;
  const valores = [];
  for (let dia = 1; dia <= dias; dia++) {
    const semilla = anio * 10000 + (mes + 1) * 100 + dia;
    const ruido = pseudoAleatorio(semilla); // 0 → 1
    const onda = Math.sin((dia / dias) * Math.PI * 2) * 0.035;
    const diaSemana = new Date(anio, mes, dia).getDay();
    const finDeSemana = diaSemana === 0 || diaSemana === 6 ? 0.03 : 0;
    const fraccion = min + ruido * (max - min) + onda + finDeSemana;
    valores.push(
      Number(
        (Math.min(fraccion, 0.94) * CAPACIDAD_CONTRATADA_GBPS).toFixed(2),
      ),
    );
  }
  return valores;
};

/**
 * Devuelve la serie diaria del mes solicitado.
 *
 * En el mes en curso solo se dibujan los días transcurridos, y el último punto
 * (el día de hoy) es un promedio parcial que crece hora a hora.
 *
 * @param {number} anio
 * @param {number} mes    0 = Enero
 * @param {Date}   ahora  fecha y hora de referencia
 * @returns {{ dias: Array, simulado: boolean, esMesActual: boolean, totalDias: number }}
 */
export const obtenerSerieMensual = (anio, mes, ahora = new Date()) => {
  const totalDias = diasDelMes(anio, mes);
  const esMesActual =
    ahora.getFullYear() === anio && ahora.getMonth() === mes;

  // En el mes en curso solo se muestran los días ya transcurridos.
  const diasVisibles = esMesActual ? ahora.getDate() : totalDias;

  const cargados = REGISTROS[claveMes(anio, mes)];
  const simulado = !Array.isArray(cargados) || cargados.length === 0;
  const fuente = simulado ? simularMes(anio, mes, totalDias) : cargados;

  const factorHoy = factorParcialDia(ahora.getHours(), ahora.getMinutes());

  const dias = [];
  for (let i = 0; i < Math.min(diasVisibles, fuente.length); i++) {
    const esHoy = esMesActual && i + 1 === ahora.getDate();
    const base = Number(fuente[i]);
    if (!Number.isFinite(base)) continue;

    // El día en curso avanza con el reloj: promedio acumulado hasta esta hora.
    const gbps = esHoy ? base * factorHoy : base;

    dias.push({
      dia: i + 1,
      fecha: new Date(anio, mes, i + 1),
      gbps: Number(gbps.toFixed(2)),
      porcentaje: Number(
        ((gbps / CAPACIDAD_CONTRATADA_GBPS) * 100).toFixed(1),
      ),
      parcial: esHoy,
    });
  }

  return { dias, simulado, esMesActual, totalDias };
};

/** Meses disponibles en el selector, del más reciente hacia atrás. */
export const listarMesesDisponibles = (hoy = new Date()) => {
  const meses = [];
  for (let i = 0; i < MESES_HISTORICO; i++) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
    meses.push({
      anio: d.getFullYear(),
      mes: d.getMonth(),
      etiqueta: `${NOMBRES_MES[d.getMonth()]} ${d.getFullYear()}`,
      actual: i === 0,
    });
  }
  return meses;
};

/** Resumen estadístico del periodo. */
export const resumirPeriodo = (dias) => {
  if (!dias.length) return null;
  const porcentajes = dias.map((d) => d.porcentaje);
  const promedio =
    porcentajes.reduce((a, b) => a + b, 0) / porcentajes.length;
  const pico = dias.reduce((a, b) => (b.porcentaje > a.porcentaje ? b : a));
  const minimo = dias.reduce((a, b) => (b.porcentaje < a.porcentaje ? b : a));
  const gbpsPromedio =
    dias.reduce((a, b) => a + b.gbps, 0) / dias.length;

  return {
    promedio: Number(promedio.toFixed(1)),
    gbpsPromedio: Number(gbpsPromedio.toFixed(2)),
    pico,
    minimo,
    holgura: Number((100 - promedio).toFixed(1)),
    gbpsLibres: Number(
      (CAPACIDAD_CONTRATADA_GBPS - gbpsPromedio).toFixed(2),
    ),
    saturado: porcentajes.some((p) => p >= 100),
  };
};
