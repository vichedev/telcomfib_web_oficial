/**
 * MapaCobertura.jsx — Mapa interactivo de cobertura de Telcomfib
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ 🔧 CÓMO AGREGAR TUS UBICACIONES                                         │
 * │                                                                         │
 * │ Solo edita el array ZONAS_COBERTURA de abajo. Cada zona necesita:      │
 * │                                                                         │
 * │   {                                                                     │
 * │     nombre: "Nombre del sector",                                        │
 * │     lat: -2.138682,          // latitud  (Google Maps: clic derecho →   │
 * │     lng: -79.911059,         // longitud  "¿Qué hay aquí?")             │
 * │     radio: 900,              // radio de cobertura en METROS            │
 * │     estado: "disponible",    // "disponible" | "proximamente" | "saturado"
 * │     detalle: "Texto corto que aparece al hacer clic en la zona",        │
 * │   }                                                                     │
 * │                                                                         │
 * │ El mapa se centra y hace zoom automáticamente sobre las zonas cargadas. │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { FaMapMarkedAlt, FaWhatsapp } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

/* ⬇️⬇️ AGREGA AQUÍ TUS UBICACIONES ⬇️⬇️ */
const ZONAS_COBERTURA = [
  // {
  //   nombre: "Nueva Prosperina",
  //   lat: -2.138682,
  //   lng: -79.911059,
  //   radio: 1200,
  //   estado: "disponible",
  //   detalle: "Cobertura total con fibra óptica hasta el hogar (FTTH).",
  // },
];
/* ⬆️⬆️ AGREGA AQUÍ TUS UBICACIONES ⬆️⬆️ */

/** Punto de la oficina principal (se dibuja siempre). */
const SEDE = {
  nombre: "Oficina principal Telcomfib",
  lat: -2.138682,
  lng: -79.911059,
  detalle: "Nueva Prosperina Mz 754 Sl 23 · Guayaquil",
};

/** Vista inicial cuando aún no hay zonas cargadas. */
const CENTRO_POR_DEFECTO = [SEDE.lat, SEDE.lng];
const ZOOM_POR_DEFECTO = 13;

const ESTADOS = {
  disponible: {
    etiqueta: "Cobertura disponible",
    color: "#059669",
    icono: "✓",
    clase: "bg-emerald-500",
  },
  proximamente: {
    etiqueta: "Próximamente",
    color: "#d97706",
    icono: "◔",
    clase: "bg-amber-500",
  },
  saturado: {
    etiqueta: "Capacidad limitada",
    color: "#dc2626",
    icono: "!",
    clase: "bg-red-500",
  },
};

const estadoDe = (zona) => ESTADOS[zona.estado] || ESTADOS.disponible;

const WHATSAPP =
  "https://wa.me/593986083855?text=Hola,%20quiero%20saber%20si%20tienen%20cobertura%20en%20mi%20sector";

const MapaCobertura = () => {
  const contenedorRef = useRef(null);
  const mapaRef = useRef(null);
  const capasRef = useRef({});
  const [listo, setListo] = useState(false);
  const [error, setError] = useState(false);
  const [zonaActiva, setZonaActiva] = useState(null);

  const zonas = useMemo(
    () => ZONAS_COBERTURA.filter((z) => Number.isFinite(z.lat) && Number.isFinite(z.lng)),
    [],
  );

  useEffect(() => {
    let cancelado = false;

    (async () => {
      try {
        const L = (await import("leaflet")).default;
        if (cancelado || !contenedorRef.current || mapaRef.current) return;

        const mapa = L.map(contenedorRef.current, {
          center: CENTRO_POR_DEFECTO,
          zoom: ZOOM_POR_DEFECTO,
          scrollWheelZoom: false,
          attributionControl: true,
        });
        mapaRef.current = mapa;

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; OpenStreetMap",
        }).addTo(mapa);

        // Marcador de la oficina
        L.circleMarker([SEDE.lat, SEDE.lng], {
          radius: 8,
          color: "#0d95dd",
          weight: 3,
          fillColor: "#0d95dd",
          fillOpacity: 0.9,
        })
          .addTo(mapa)
          .bindPopup(
            `<strong>${SEDE.nombre}</strong><br/><span>${SEDE.detalle}</span>`,
          );

        // Zonas de cobertura
        zonas.forEach((zona, i) => {
          const est = estadoDe(zona);
          const circulo = L.circle([zona.lat, zona.lng], {
            radius: zona.radio || 800,
            color: est.color,
            weight: 2,
            fillColor: est.color,
            fillOpacity: 0.2,
          }).addTo(mapa);

          circulo.bindPopup(
            `<strong>${zona.nombre}</strong><br/>` +
              `<span>${est.icono} ${est.etiqueta}</span><br/>` +
              `<span>${zona.detalle || ""}</span>`,
          );
          circulo.on("click", () => setZonaActiva(i));
          capasRef.current[i] = circulo;
        });

        if (zonas.length) {
          const grupo = L.featureGroup(Object.values(capasRef.current));
          mapa.fitBounds(grupo.getBounds().pad(0.25));
        }

        // Reajuste tras montar (evita tiles en gris dentro de contenedores animados)
        setTimeout(() => mapa.invalidateSize(), 250);
        setListo(true);
      } catch (e) {
        console.error("No se pudo cargar el mapa de cobertura:", e);
        if (!cancelado) setError(true);
      }
    })();

    return () => {
      cancelado = true;
      if (mapaRef.current) {
        mapaRef.current.remove();
        mapaRef.current = null;
        capasRef.current = {};
      }
    };
  }, [zonas]);

  const irAZona = (i) => {
    const capa = capasRef.current[i];
    if (!capa || !mapaRef.current) return;
    setZonaActiva(i);
    mapaRef.current.flyTo(capa.getLatLng(), 15, { duration: 0.8 });
    capa.openPopup();
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-white/10 dark:bg-slate-800/50">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/50 p-5 dark:border-white/10">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <FaMapMarkedAlt className="h-4 w-4 text-emerald-500" />
            Mapa de cobertura
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Explora los sectores donde llega nuestra fibra óptica
          </p>
        </div>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
        >
          <FaWhatsapp className="h-4 w-4" />
          Consultar mi sector
        </a>
      </div>

      {/* Mapa */}
      <div className="relative">
        <div
          ref={contenedorRef}
          className="h-80 w-full bg-slate-200 dark:bg-slate-700"
          style={{ zIndex: 0 }}
        />

        {!listo && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100/80 text-sm text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
            Cargando mapa…
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-100 p-6 text-center dark:bg-slate-800">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              No se pudo cargar el mapa
            </p>
            <a
              href={`https://maps.google.com/?q=${SEDE.lat},${SEDE.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Ver ubicación en Google Maps
            </a>
          </div>
        )}

        {listo && zonas.length === 0 && (
          <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-xl border border-slate-200/60 bg-white/90 px-4 py-2 text-xs text-slate-600 backdrop-blur dark:border-white/10 dark:bg-slate-900/85 dark:text-slate-300">
            Aún no hay zonas cargadas · agrégalas en el array{" "}
            <code className="font-mono text-emerald-600 dark:text-emerald-400">
              ZONAS_COBERTURA
            </code>{" "}
            de <code className="font-mono">MapaCobertura.jsx</code>
          </div>
        )}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-4 border-t border-slate-200/50 px-5 py-3 dark:border-white/10">
        {Object.entries(ESTADOS).map(([clave, est]) => (
          <span
            key={clave}
            className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${est.clase}`} />
            {est.icono} {est.etiqueta}
          </span>
        ))}
      </div>

      {/* Listado de zonas (clic para volar hasta el sector) */}
      {zonas.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-slate-200/50 p-4 dark:border-white/10">
          {zonas.map((zona, i) => {
            const est = estadoDe(zona);
            return (
              <button
                key={`${zona.nombre}-${i}`}
                onClick={() => irAZona(i)}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:scale-105 ${
                  zonaActiva === i
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "border-slate-200 text-slate-600 hover:border-emerald-400 dark:border-white/10 dark:text-slate-300"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${est.clase}`} />
                {zona.nombre}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MapaCobertura;
