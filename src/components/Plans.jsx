import { motion } from 'framer-motion';

const Plans = () => {
  const plans = [
    { name: 'Plan Inicial', speed: '100', price: '20', feat: ['Fibra Simétrica', 'Soporte 24/7', 'Instalación Gratis'], popular: false },
    { name: 'Plan Familiar', speed: '300', price: '35', feat: ['Ideal para Streaming 4K', 'Prioridad de Tráfico', 'WiFi 6 Ready'], popular: true },
    { name: 'Plan Gaming', speed: '600', price: '50', feat: ['Ultra Baja Latencia', 'IP Pública Fija', 'Soporte VIP'], popular: false },
  ];

  return (
    <section id="planes" className="py-24 bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-brand-blue dark:text-white mb-4 uppercase tracking-tighter">Nuestros Planes</h2>
          <p className="text-slate-500">Elige la potencia que tu hogar necesita</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-3xl border ${
                plan.popular 
                ? 'border-brand-green bg-brand-blue/5 dark:bg-brand-green/5 ring-4 ring-brand-green/10' 
                : 'border-slate-100 dark:border-white/10 bg-white dark:bg-slate-900'
              } shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-green text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                  Más Vendido
                </span>
              )}

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-brand-blue dark:text-brand-green">{plan.speed}</span>
                <span className="text-xl font-bold text-slate-400">Mbps</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.feat.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                    <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                ${plan.price}<span className="text-sm font-normal text-slate-400">/mes</span>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.popular 
                ? 'bg-brand-green text-white hover:bg-green-600 shadow-lg shadow-green-500/30' 
                : 'bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white hover:bg-slate-200'
              }`}>
                Lo quiero ahora
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;