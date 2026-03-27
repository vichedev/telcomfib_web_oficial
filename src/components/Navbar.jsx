import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light";
  });
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Sobre Nosotros", path: "/sobre-nosotros" },
    { name: "Planes", path: "/planes" },
    { name: "Documentos", path: "/documentos" },
    { name: "Contacto", path: "/contacto" },
  ];

  const themeIconVariants = {
    initial: { scale: 0.6, rotate: 90, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0.6, rotate: -90, opacity: 0 },
  };

  const isDark = theme === "dark";

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/593986083855?text=Hola,%20necesito%20información%20sobre%20los%20planes%20de%20Telcomfib",
      "_blank",
    );
  };

  return (
    <motion.nav
      className={`
        fixed top-0 w-full z-50 transition-all duration-500
        ${
          scrolled
            ? isDark
              ? "bg-slate-950/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-2xl"
              : "bg-white/95 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg"
            : "bg-transparent"
        }
      `}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 1.5 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo/Nombre con estilo Hero */}
        <Link to="/">
          <motion.div
            className="flex items-center gap-2 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="relative">
              {/* Anillo de pulso */}
              <div
                className={`absolute inset-0 rounded-full ${isDark ? "bg-emerald-500/20" : "bg-emerald-500/10"} blur-xl group-hover:blur-2xl transition-all duration-500`}
              />

              {/* Icono de fibra */}
              <div className="relative w-8 h-8 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-emerald-500"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5 5l14 14"
                    className="opacity-50"
                  />
                </svg>
                <div
                  className={`absolute inset-0 rounded-full border ${isDark ? "border-emerald-500/30" : "border-emerald-500/40"} animate-ping`}
                  style={{ animationDuration: "2s" }}
                />
              </div>
            </div>

            <span
              className={`text-xl font-black tracking-tighter ${
                isDark
                  ? "bg-gradient-to-r from-white via-emerald-500 to-blue-500 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-slate-800 via-emerald-600 to-blue-600 bg-clip-text text-transparent"
              }`}
            >
              Telcom<span className="text-emerald-500">fib</span>
            </span>

            {/* Badge de red activa */}
            <div
              className={`hidden lg:flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full ${
                isDark
                  ? "bg-emerald-500/10 border border-emerald-500/20"
                  : "bg-emerald-500/15 border border-emerald-500/30"
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span
                className={`text-[9px] font-mono font-medium tracking-wider ${
                  isDark ? "text-emerald-500" : "text-emerald-600"
                }`}
              >
                RED ACTIVA
              </span>
            </div>
          </motion.div>
        </Link>

        {/* Links Centrados con estilo Hero */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link key={link.name} to={link.path}>
              <motion.div
                className={`relative text-sm font-medium transition-colors duration-300 group cursor-pointer ${
                  isDark
                    ? "text-slate-300 hover:text-emerald-500"
                    : "text-slate-600 hover:text-emerald-600"
                } ${
                  location.pathname === link.path
                    ? isDark
                      ? "text-emerald-500"
                      : "text-emerald-600"
                    : ""
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.1 }}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-1 w-0 h-[1.5px] bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? "w-full" : ""
                  }`}
                />
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-[1.5px] ${isDark ? "bg-emerald-500/50" : "bg-emerald-500/60"} blur-sm transition-all duration-300 group-hover:w-full ${
                    location.pathname === link.path ? "w-full" : ""
                  }`}
                />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Botones con estilo Hero */}
        <div className="flex items-center gap-4">
          {/* Indicador de fibra */}
          <motion.div
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-black/5 border-black/10"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div className="flex gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-emerald-500 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    height: `${6 + i * 2}px`,
                  }}
                />
              ))}
            </div>
            <span
              className={`text-[10px] font-mono tracking-wider ${
                isDark ? "text-emerald-500/80" : "text-emerald-600/80"
              }`}
            >
              FIBRA ÓPTICA
            </span>
          </motion.div>

          {/* Botón Modo Claro/Oscuro */}
          <motion.button
            onClick={toggleTheme}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm border ${
              isDark
                ? "text-slate-300 hover:text-emerald-500 bg-white/5 border-white/10 hover:border-emerald-500/30"
                : "text-slate-600 hover:text-emerald-600 bg-black/5 border-black/10 hover:border-emerald-500/30"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <div
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                isDark ? "hover:bg-emerald-500/10" : "hover:bg-emerald-500/10"
              }`}
            />

            <AnimatePresence mode="wait" initial={false}>
              {theme === "light" ? (
                <motion.svg
                  key="moon"
                  variants={themeIconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-5 h-5 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="sun"
                  variants={themeIconVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="w-5 h-5 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Botón CTA principal */}
          <motion.button
            onClick={handleWhatsApp}
            className="group relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.1, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors duration-300" />

            <span className="relative text-white dark:text-white font-bold tracking-wide flex items-center gap-2">
              Contratar
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
            </span>
          </motion.button>
        </div>
      </div>

      {/* Barra de luz inferior */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse" />
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
