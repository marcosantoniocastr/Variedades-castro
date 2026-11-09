'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/products';

export default function TestimonialsSection() {
  return (
    <section 
      id="testimonios" 
      aria-label="Opiniones de clientas verificadas"
      className="bg-card py-16 sm:py-24 border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            <span>Clientas que Brillan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight mb-4">
            La Experiencia Variedades Castro
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Más de 5,000 mujeres han confiado en nuestros diseños para sus eventos más memorables. Lee sus testimonios auténticos.
          </p>
        </div>

        {/* Tarjetas de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div 
              key={t.id}
              className="p-6 sm:p-8 rounded-3xl bg-surface-subtle border border-border/80 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                {/* Estrellas y Comillas */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1" aria-label="Calificación de 5 estrellas">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/30" />
                </div>

                {/* Comentario */}
                <p className="text-xs sm:text-sm text-foreground/85 leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Perfil de la Clienta */}
              <div className="pt-4 border-t border-border/60 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-primary/30">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-secondary">{t.name}</span>
                    <span title="Compradora Verificada" className="inline-flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 text-success" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{t.city}</p>
                  <p className="text-[10px] text-primary font-semibold truncate mt-0.5">
                    {t.productPurchased}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
