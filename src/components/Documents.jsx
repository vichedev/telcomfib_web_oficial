import { motion } from 'framer-motion';

const Documents = () => {
  const docs = [
    'Contrato de Adhesión (Aprobado ARCOTEL)',
    'Formulario de Inscripción SVA',
    'Carta de Derechos del Usuario',
    'Tarifarios de Planes 2026'
  ];

  return (
    <section id="documentos" className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-brand-blue/5 dark:bg-brand-green/5 border border-brand-blue/10 dark:border-brand-green/20 rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-2xl font-bold text-brand-blue dark:text-white mb-8 flex items-center gap-3">
            <span className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center text-white text-sm">PDF</span>
            Centro de Transparencia
          </h2>
          <div className="grid gap-4">
            {docs.map((doc, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ x: 10 }}
                className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/5 hover:shadow-md transition-all group"
              >
                <span className="font-medium text-slate-700 dark:text-slate-300">{doc}</span>
                <svg className="w-5 h-5 text-brand-green opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Documents;