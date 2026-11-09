'use client';

import React, { useState } from 'react';
import { Mail, Sparkles, Check, Clock } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <section 
      id="newsletter" 
      aria-label="Suscripción al Club VIP"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
    >
      <div className="relative rounded-3xl overflow-hidden bg-secondary text-secondary-foreground p-8 sm:p-14 lg:p-16 border border-border shadow-2xl">
        
        {/* Adorno decorativo de fondo */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Círculo Exclusivo Variedades Castro</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Sé la Primera en Descubrir Nuevas <span className="text-primary italic font-normal">Colecciones</span>
          </h2>

          <p className="text-xs sm:text-sm text-secondary-foreground/80 leading-relaxed mb-8 max-w-lg mx-auto">
            Recibe adelantos de vestidos de gala, sastrería femenina atelier y novedades de temporada. Atención y asesoría personalizada de 8:30 AM a 5:30 PM.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Introduce tu correo electrónico..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-full bg-white text-secondary text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                  aria-label="Correo electrónico para suscripción al club de beneficios"
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98 cursor-pointer shrink-0"
              >
                Suscribirme
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-md mx-auto animate-in zoom-in-95">
              <div className="w-10 h-10 rounded-full bg-primary/30 text-accent flex items-center justify-center mx-auto mb-3">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold mb-1">¡Bienvenida al Círculo Exclusivo!</h3>
              <p className="text-xs text-secondary-foreground/80">
                Te notificaremos cuando tengamos nuevas piezas disponibles en el catálogo.
              </p>
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-[11px] text-secondary-foreground/60 mt-4">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>Horario de Atención: 8:30 AM a 5:30 PM • Envíos Locales Gratis</span>
          </div>

        </div>

      </div>
    </section>
  );
}
