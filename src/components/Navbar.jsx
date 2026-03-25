import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Planes', href: '#planes' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Soporte', href: '#soporte' },
  ];

  const themeIconVariants = {
    initial: { scale: 0.6, rotate: 90, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0.6, rotate: -90, opacity: 0 }
  };

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 backdrop-blur-lg border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-slate-950/80"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 1.5 }}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo/Nombre */}
        <div className="flex items-center gap-2">
          {/* Un placeholder para el logo animado, pero aquí lo simplificamos */}
          <span className="text-2xl font-black tracking-tighter text-brand-blue dark:text-white">
            Telcom<span className='text-brand-green'>fib</span>
          </span>
        </div>

        {/* Links Centrados */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-brand-blue dark:hover:text-brand-green group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.1 }}
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-brand-green transition-all group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>

        {/* Botón Modo Claro/Oscuro y CTA */}
        <div className="flex items-center gap-6">
          <motion.button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'light' ? (
                <motion.svg key="moon" variants={themeIconVariants} initial="initial" animate="animate" exit="exit" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></motion.svg>
              ) : (
                <motion.svg key="sun" variants={themeIconVariants} initial="initial" animate="animate" exit="exit" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
          
          <motion.button 
            className="px-6 py-2.5 bg-brand-blue dark:bg-white text-white dark:text-brand-blue font-semibold rounded-full text-sm hover:bg-brand-blue-hover dark:hover:bg-slate-100 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.1, type: 'spring' }}
          >
            Contratar
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;