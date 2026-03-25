import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { label: 'Tecnología', title: '100% Fibra Óptica', desc: 'Conexión pura sin cables de cobre.' },
    { label: 'Cobertura', title: 'Todo el Sector', desc: 'Llegamos donde otros no pueden.' },
    { label: 'Soporte', title: 'Técnicos Locales', desc: 'Atención inmediata y personalizada.' },
  ];

  return (
    <section id="nosotros" className="py-24 bg-slate-50 dark:bg-slate-900/30 transition-colors">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-brand-blue dark:text-white mb-4 italic uppercase">Sobre Telcomfib</h2>
          <div className="w-20 h-1.5 bg-brand-green mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 hover:border-brand-green transition-colors group"
            >
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest">{item.label}</span>
              <h3 className="text-xl font-bold mt-2 mb-4 text-brand-blue dark:text-white">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;