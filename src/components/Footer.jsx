const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 pt-16 pb-8 transition-colors">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <h3 className="text-2xl font-black text-brand-blue dark:text-white mb-6 tracking-tighter uppercase">
              Telcom<span className="text-brand-green">fib</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm leading-relaxed">
              Proveedor líder de servicios de internet de banda ancha. Comprometidos con el desarrollo tecnológico de nuestra comunidad bajo los más altos estándares de calidad.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Atención</h4>
            <ul className="text-slate-500 dark:text-slate-400 text-sm space-y-3">
              <li>Lunes a Viernes: 08:00 - 18:00</li>
              <li>Sábados: 09:00 - 13:00</li>
              <li>Soporte Emergencias: 24/7</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="text-slate-500 dark:text-slate-400 text-sm space-y-3">
              <li><a href="#" className="hover:text-brand-green">Políticas de Privacidad</a></li>
              <li><a href="#" className="hover:text-brand-green">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>

        {/* REQUERIMIENTOS LEGALES ARCOTEL ECUADOR */}
        <div className="border-t border-slate-100 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <img 
              src="https://www.arcotel.gob.ec/wp-content/uploads/2016/03/logo-arcotel.png" 
              alt="Arcotel" 
              className="h-10 grayscale dark:invert opacity-50"
            />
          </div>
          <div className="text-[10px] text-slate-400 text-center md:text-right font-medium leading-loose uppercase tracking-widest">
            Telcomfib Cía. Ltda. | Registrado en la ARCOTEL <br />
            Ley Orgánica de Telecomunicaciones de la República del Ecuador <br />
            © 2026 - Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;