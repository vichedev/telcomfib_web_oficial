import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import logoImg from '../assets/hero.png'; // Asegúrate de que esta ruta es correcta

const Hero = () => {
  const [init, setInit] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Inicializar el motor de partículas una vez
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Variantes de animación para el texto
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + i * 0.15, // Empieza después de la animación del logo
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] // Ease out elegante
      }
    })
  };

  // Configuración de Partículas (Sutil y Tecnológica)
  const particlesOptions = useMemo(() => ({
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // Conecta líneas al pasar el mouse
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
      },
    },
    particles: {
      color: {
        value: "#2ECC71", // Verde de la marca
      },
      links: {
        color: "#1F3A93", // Azul de la marca
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: 0.3, // Muy sutil
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  }), []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950">
      
      {/* Fondo de Partículas */}
      {init && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Grid de Fondo sutil para dar textura (opcional) */}
      <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Contenedor Principal */}
      <div className="container mx-auto px-6 text-center relative z-10 pt-20">
        
        {/* ANIMACIÓN INICIAL DEL LOGO */}
        <div className="flex justify-center mb-10">
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            onAnimationComplete={() => setAnimationComplete(true)}
          >
            {/* El logo base */}
            <img 
              src={logoImg} 
              alt="Telcomfib Logo" 
              className="w-32 md:w-40 h-auto"
            />
            
            {/* Pulso de "Conexión" después de aparecer */}
            <motion.div 
              className="absolute inset-0 border-4 border-brand-green rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={animationComplete ? { scale: 1.4, opacity: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            />
          </motion.div>
        </div>

        {/* TEXTOS DEL HERO (Aparecen secuencialmente) */}
        
        {/* Etiqueta superior */}
        <motion.span 
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-bold uppercase tracking-widest mb-6"
        >
          Fibra Óptica Real en Ecuador
        </motion.span>

        {/* Título Principal */}
        <motion.h1 
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white leading-tight mb-8 tracking-tighter"
        >
          Conecta tu mundo <br />
          a la <span className="text-brand-blue dark:text-brand-green">velocidad de la luz</span>
        </motion.h1>

        {/* Descripción */}
        <motion.p 
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg md:text-xl mb-12 leading-relaxed"
        >
          Experimenta internet sin límites con Telcomfib. Navegación simétrica, ultra baja latencia y soporte 24/7. Llevamos el futuro a tu hogar y empresa.
        </motion.p>

        {/* Botones de Acción */}
        <motion.div 
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button 
            className="px-10 py-4 bg-brand-blue text-white font-bold rounded-xl shadow-lg shadow-brand-blue/20 transition-all hover:bg-brand-blue-hover hover:-translate-y-0.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver Planes
          </motion.button>
          
          <motion.button 
            className="px-10 py-4 bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-semibold rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Soporte Técnico
          </motion.button>
        </motion.div>

        {/* Indicador de scroll sutil (opcional) */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;