'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';

export default function WhatsAppConcierge() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Tooltip de bienvenida VIP */}
      {showTooltip && (
        <div className="bg-card/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-border max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 duration-300 relative pr-7">
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground p-0.5"
            aria-label="Cerrar sugerencia de asesoría"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1.5 text-primary font-bold text-[11px] mb-1">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>¿Dudas con tu talla o look?</span>
          </div>
          <p className="text-secondary text-[11px] leading-relaxed">
            Nuestra estilista personal está disponible para atenderte de 8:30 AM a 5:30 PM con envíos locales gratis.
          </p>
        </div>
      )}

      {/* Botón Flotante */}
      <a
        href="https://wa.me/?text=Hola%20Variedades%20Castro%2C%20quisiera%20asesor%C3%ADa%20personalizada%20con%20mi%20look%20de%20moda"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 group"
        aria-label="Conversar con asesora de moda de Variedades Castro por WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-white animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-white" />
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </div>
  );
}
