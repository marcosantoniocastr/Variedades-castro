'use client';

import React from 'react';
import { Award, Truck, Clock, CreditCard } from 'lucide-react';

export default function BrandFeatures() {
  const features = [
    {
      icon: <Award className="w-6 h-6 text-accent" />,
      title: 'Confección de Alta Gama',
      description: 'Prendas con acabados atelier, finas sedas y costuras reforzadas diseñadas para brindar máxima elegancia y confort.'
    },
    {
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: 'Envíos Locales Gratis',
      description: 'Entregas locales 100% gratuitas y envíos a todos los departamentos con tarifa preferencial y empaque protector.'
    },
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      title: 'Atención: 8:30 AM a 5:30 PM',
      description: 'Asesoría personalizada por WhatsApp durante todo nuestro horario comercial de lunes a sábado.'
    },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      title: 'Monedas C$ y USD ($)',
      description: 'Precios transparentes en Córdobas y Dólares estadounidenses sin falsos descuentos ni costos ocultos.'
    }
  ];

  return (
    <section 
      id="nosotros" 
      aria-label="Valores y Compromisos de Variedades Castro"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div 
            key={i} 
            className="p-6 rounded-2xl bg-card border border-border/80 hover:border-primary/40 hover:shadow-md transition-all flex flex-col items-start"
          >
            <div className="p-3 rounded-2xl bg-surface-subtle mb-4">
              {f.icon}
            </div>
            <h3 className="font-serif text-base font-bold text-secondary mb-2">
              {f.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
