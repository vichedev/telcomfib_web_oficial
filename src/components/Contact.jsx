import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contacto" className="py-24 bg-slate-50 dark:bg-slate-900/20">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-black text-brand-blue dark:text-white mb-6 uppercase">¿Necesitas ayuda?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-12 text-lg">Nuestro equipo técnico está listo para conectarte.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <a href="https://wa.me/tu_numero" className="flex flex-col items-center p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-white/5 hover:border-brand-green transition-all shadow-sm">
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">W</div>
              <h4 className="font-bold text-brand-blue dark:text-white">Ventas WhatsApp</h4>
              <p className="text-xs text-slate-400 mt-1">Respuesta inmediata</p>
            </a>
            <div className="flex flex-col items-center p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-4 text-2xl font-bold">@</div>
              <h4 className="font-bold text-brand-blue dark:text-white">Email Corporativo</h4>
              <p className="text-xs text-slate-400 mt-1">soporte@telcomfib.net</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;