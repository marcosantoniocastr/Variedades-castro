'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Truck, Clock, ScanBarcode, BookOpen } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useMounted } from '@/hooks/use-mounted';

export default function HeroBanner() {
  const { setSelectedCategory, formatPrice, setIsScannerOpen, isAdmin } = useShop();
  const isMounted = useMounted();

  const handleExplore = (categorySlug = 'todos') => {
    setSelectedCategory(categorySlug);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLookbook = () => {
    const el = document.getElementById('lookbook');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      aria-label="Presentación de la Nueva Colección Variedades Castro"
      className="relative overflow-hidden bg-surface-subtle border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LADO DE TEXTO Y ACCIONES (Columna 1-7) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Tag / Etiqueta de Horario y Envíos */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-primary text-xs font-semibold tracking-wide mb-4 sm:mb-6 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>Horario de Atención: 8:30 AM a 5:30 PM</span>
            </div>

            {/* Título Principal de Moda */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-secondary tracking-tight leading-[1.15] mb-4 sm:mb-6">
              El Arte del Buen Vestir, <br className="hidden sm:inline" />
              <span className="text-primary italic font-normal">Reinventado</span> para Ti.
            </h1>

            {/* Subtítulo descriptivo */}
            <p className="text-base sm:text-lg text-muted-foreground font-normal max-w-xl leading-relaxed mb-6 sm:mb-8">
              En <strong className="text-foreground font-semibold">Variedades Castro</strong> te ofrecemos vestidos de gala, sastrería femenina de alta gama y prendas exclusivas. Con <strong className="text-foreground">envíos locales gratis</strong> y envíos a todo el país.
            </p>

            {/* Botones de Llamada a la Acción (CTA) */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 sm:mb-12">
              <button
                type="button"
                onClick={() => handleExplore('todos')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary-hover text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
              >
                <span>Descubrir Colección</span>
                <ArrowRight className="w-4 h-4 text-accent" />
              </button>

              {isMounted && isAdmin ? (
                <button
                  type="button"
                  onClick={() => setIsScannerOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-card hover:bg-primary-light/50 border border-border text-foreground hover:text-primary text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
                >
                  <ScanBarcode className="w-4 h-4 text-primary" />
                  <span>Lector de Códigos (Admin)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLookbook}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-card hover:bg-primary-light/50 border border-border text-foreground hover:text-primary text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span>Ver Lookbook Editorial</span>
                </button>
              )}
            </div>

            {/* Micro-ventajas / Sellos de Confianza */}
            <div className="w-full grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-border/80">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold text-foreground block">Envíos Locales</span>
                  <span className="text-muted-foreground hidden sm:block">100% Gratis</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold text-foreground block">Envíos Nacionales</span>
                  <span className="text-muted-foreground hidden sm:block">Tarifa Preferencial</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" />
                <div className="text-[11px] sm:text-xs">
                  <span className="font-bold text-foreground block">8:30 AM - 5:30 PM</span>
                  <span className="text-muted-foreground hidden sm:block">Lunes a Sábado</span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* LADO VISUAL / FOTOGRAFÍA EDITORIAL (Columna 8-12) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Marco de Imagen Principal */}
              <div className="relative aspect-4/5 sm:aspect-3/4 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-card ring-1 ring-border">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80"
                  alt="Modelo vistiendo la nueva colección de alta moda Variedades Castro"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Tarjeta flotante sobre la imagen */}
                <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-md p-3.5 rounded-xl border border-border shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-primary/20">
                      <Image
                        src="/assets/aistudio/logo-sm.webp"
                        alt="Logo Insignia"
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-secondary">Vestido Satén Champagne</p>
                      <p className="text-[11px] text-primary font-bold">{formatPrice(189)}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleExplore('vestidos')}
                    className="text-xs bg-primary text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-primary-hover transition-colors shadow-xs cursor-pointer"
                  >
                    Ver Pieza
                  </button>
                </div>
              </div>

              {/* Insignia Circular Flotante */}
              <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 bg-card text-secondary p-3 sm:p-4 rounded-full shadow-xl border border-border hidden sm:flex flex-col items-center justify-center text-center w-24 h-24 ring-4 ring-background">
                <span className="font-serif text-lg font-bold text-primary leading-none">100%</span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-muted-foreground mt-0.5">Original Atelier</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
