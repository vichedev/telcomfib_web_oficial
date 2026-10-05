// Gestión del consentimiento de cookies (LOPDP - Ecuador)
// El consentimiento se guarda en localStorage, por eso el banner solo
// se muestra en la primera visita del usuario a este navegador.

const STORAGE_KEY = "telcomfib_cookie_consent";
const CONSENT_VERSION = 1; // súbelo si cambian las finalidades: pide consentimiento de nuevo
const CHANGE_EVENT = "telcomfib:cookie-consent";
const OPEN_EVENT = "telcomfib:cookie-preferences";

// Las cookies estrictamente necesarias no requieren consentimiento
export const DEFAULT_CONSENT = {
  necesarias: true,
  analiticas: false,
  marketing: false,
};

const isBrowser = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

/** Devuelve el consentimiento guardado o null si el usuario nunca decidió. */
export const getConsent = () => {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const stored = JSON.parse(raw);
    // Si la versión cambió, el consentimiento anterior ya no es válido
    if (!stored || stored.version !== CONSENT_VERSION) return null;

    return {
      ...DEFAULT_CONSENT,
      analiticas: Boolean(stored.analiticas),
      marketing: Boolean(stored.marketing),
      fecha: stored.fecha,
      version: stored.version,
    };
  } catch {
    return null;
  }
};

/** true si el usuario ya tomó una decisión (aceptó, rechazó o personalizó). */
export const hasDecided = () => getConsent() !== null;

/** true si una categoría concreta está permitida. */
export const isAllowed = (categoria) => {
  if (categoria === "necesarias") return true;
  const consent = getConsent();
  return consent ? Boolean(consent[categoria]) : false;
};

/** Guarda la decisión del usuario y avisa al resto de la app. */
export const saveConsent = (preferencias = {}) => {
  const consent = {
    ...DEFAULT_CONSENT,
    analiticas: Boolean(preferencias.analiticas),
    marketing: Boolean(preferencias.marketing),
    version: CONSENT_VERSION,
    fecha: new Date().toISOString(),
  };

  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // Modo privado o almacenamiento bloqueado: seguimos sin persistir
    }
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: consent }));
  }

  return consent;
};

/** Revoca el consentimiento: el banner volverá a mostrarse. */
export const revokeConsent = () => {
  if (!isBrowser()) return;

  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignorado
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: null }));
};

/** Reabre el panel de preferencias desde cualquier parte del sitio. */
export const openCookiePreferences = () => {
  if (!isBrowser()) return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
};

/** Suscripción a cambios de consentimiento. Devuelve la función de limpieza. */
export const onConsentChange = (callback) => {
  if (!isBrowser()) return () => {};

  const handler = (event) => callback(event.detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
};

/** Suscripción a la apertura del panel. Devuelve la función de limpieza. */
export const onOpenPreferences = (callback) => {
  if (!isBrowser()) return () => {};

  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
};

export { CONSENT_VERSION, STORAGE_KEY };
