import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Sparkles, Home, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md mx-auto">
        
        {/* Logo de Variedades Castro */}
        <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lg mb-6">
          <Image
            src="/assets/aistudio/logo.webp"
            alt="Logo Variedades Castro"
            fill
            sizes="80px"
            priority
            className="object-cover"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>Error 404 • Página No Encontrada</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-secondary tracking-tight mb-3">
          Esta Pieza de Moda no está Disponible
        </h1>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-8">
          Lo sentimos, la prenda o sección que buscas ha cambiado de ubicación o ya no se encuentra en nuestro catálogo actual.
        </p>

        {/* Acciones de Retorno */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary text-white hover:bg-secondary-hover text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-98"
          >
            <Home className="w-4 h-4" />
            <span>Volver a la Tienda</span>
          </Link>

          <Link
            href="/#catalogo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-card hover:bg-primary-light/50 border border-border text-primary hover:text-primary-hover text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explorar Colección</span>
          </Link>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-[11px] text-muted-foreground">
          Variedades Castro © {new Date().getFullYear()} • Moda de Alta Gama
        </div>

      </div>
    </main>
  );
}
