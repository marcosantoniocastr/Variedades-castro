'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Eye, ArrowRight } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function LookbookSection() {
  const { products, setQuickViewProduct, setSelectedCategory } = useShop();

  const dressProduct = products.find((p) => p.id === 'vc-01') || products[0];
  const blazerProduct = products.find((p) => p.id === 'vc-02') || products[1];

  const handleExploreCategory = (cat: string) => {
    setSelectedCategory(cat);
    const el = document.getElementById('catalogo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="lookbook" 
      aria-label="Lookbook Editorial y Estilismos"
      className="bg-surface-subtle py-16 sm:py-24 border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Editorial */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Editorial de Estilo • Verano & Otoño 2026</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-secondary tracking-tight mb-4">
            El Arte del Buen Vestir
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Inspirada en la elegancia intemporal europea y la calidez latina. Una sinfonía de siluetas depuradas, tejidos que respiran y piezas pensadas para durar temporadas enteras.
          </p>
        </div>

        {/* Cuadrícula Editorial con Hotspots Interactivos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LOOK 1: VESTIDO DE SEDA (Columna 1-6) */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl bg-muted border-2 border-card">
              <Image
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1000&auto=format&fit=crop&q=80"
                alt="Lookbook Vestido Midi Plisado Blush Romantic"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Punto Interactivo (Hotspot) */}
              {dressProduct && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(dressProduct)}
                    className="relative flex items-center justify-center p-3 rounded-full bg-card/90 text-primary shadow-xl hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary group/spot"
                    aria-label="Ver detalles del vestido en este look"
                  >
                    <span className="absolute -inset-2 rounded-full bg-primary/30 animate-ping opacity-75" />
                    <Eye className="w-5 h-5 relative z-10 text-primary" />
                  </button>
                </div>
              )}

              {/* Ficha Flotante del Look */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary block">Look 01 • Velada Estelar</span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-secondary">
                    Vestido Lencero de Satén & Joyas Champagne
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => dressProduct && setQuickViewProduct(dressProduct)}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl bg-secondary text-white text-xs font-semibold hover:bg-secondary-hover transition-colors flex items-center gap-1 shrink-0"
                >
                  <span className="hidden sm:inline">Comprar Look</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

          {/* LOOK 2: SASTRERÍA & ACCESORIOS (Columna 7-12) */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl bg-muted border-2 border-card">
              <Image
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&auto=format&fit=crop&q=80"
                alt="Lookbook Blazer Cruzado Sastre Marfil Studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Punto Interactivo (Hotspot) */}
              {blazerProduct && (
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(blazerProduct)}
                    className="relative flex items-center justify-center p-3 rounded-full bg-card/90 text-primary shadow-xl hover:scale-110 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-primary group/spot"
                    aria-label="Ver detalles del blazer sastre en este look"
                  >
                    <span className="absolute -inset-2 rounded-full bg-accent/30 animate-ping opacity-75" />
                    <Eye className="w-5 h-5 relative z-10 text-accent" />
                  </button>
                </div>
              )}

              {/* Ficha Flotante del Look */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-accent block">Look 02 • Poder Femenino</span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-secondary">
                    Blazer Sastre Cruzado & Bolso Atelier
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => blazerProduct && setQuickViewProduct(blazerProduct)}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl bg-secondary text-white text-xs font-semibold hover:bg-secondary-hover transition-colors flex items-center gap-1 shrink-0"
                >
                  <span className="hidden sm:inline">Comprar Look</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Botón de acceso a toda la colección de sastrería */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => handleExploreCategory('blazers')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-card border border-border hover:border-primary text-secondary hover:text-primary font-semibold text-xs tracking-wider uppercase transition-all shadow-xs"
          >
            <span>Ver Todas las Piezas de Sastrería & Atelier</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </button>
        </div>

      </div>
    </section>
  );
}
