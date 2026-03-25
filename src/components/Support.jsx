import { motion } from 'framer-motion';

const Support = () => {
  return (
    <section id="soporte" className="py-24 bg-slate-50 dark:bg-slate-900/40 transition-colors">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-950 rounded-[2.5rem] p-8 md:p-16 border border-slate-100 dark:border-white/5 shadow-xl relative overflow-hidden">
          
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 blur-[100px] rounded-full"></div>

          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <h2 className="text-3xl font-black text-brand-blue dark:text-white mb-6 uppercase tracking-tight">Soporte Técnico <br/><span className="text-brand-green">Nivel Experto</span></h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                No hablamos con bots. En Telcomfib recibes atención humana inmediata. Monitoreamos nuestra red las 24 horas para prevenir incidencias antes de que las notes.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center text-white font-bold">01</div>
                  <div>
                    <h4 className="font-bold dark:text-white">Ticket Express</h4>
                    <p className="text-xs text-slate-400 text-brand-blue-hover">Atención en menos de 15 min</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-green rounded-2xl flex items-center justify-center text-white font-bold">02</div>
                  <div>
                    <h4 className="font-bold dark:text-white">Visita Técnica</h4>
                    <p className="text-xs text-slate-400">Resolución en sitio en 24h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel de Estado de Red (Novedoso) */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="bg-slate-900 rounded-3xl p-6 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Network Status</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                  <span className="text-[10px] text-green-500 font-bold uppercase">All Systems Online</span>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { node: 'Core Central - Guayaquil', status: '99.9%', color: 'bg-green-500' },
                  { node: 'Nodo Local Sector A', status: 'Optimal', color: 'bg-green-500' },
                  { node: 'Latencia Internacional', status: '42ms', color: 'bg-cyan-500' },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>{item.node}</span>
                      <span className="font-mono text-brand-green">{item.status}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className={`h-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all uppercase tracking-widest">
                Abrir Ticket de Soporte
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;