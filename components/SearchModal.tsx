'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function SearchModal() {
  const { 
    products,
    isSearchOpen, 
    setIsSearchOpen, 
    setQuickViewProduct, 
    formatPrice 
  } = useShop();

  const [term, setTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = React.useCallback(() => {
    setIsSearchOpen(false);
    setTerm('');
  }, [setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen, handleClose]);

  if (!isSearchOpen) return null;

  const results = term.trim()
    ? products.filter((p) => {
        const q = term.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.barcode?.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (product: any) => {
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  const handleSearchChip = (keyword: string) => {
    setTerm(keyword);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Búsqueda de prendas y colecciones"
    >
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-card rounded-3xl shadow-2xl overflow-hidden border border-border z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Input de Búsqueda */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center gap-3 bg-surface-subtle">
          <Search className="w-5 h-5 text-primary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar por prenda, tejido, color o silueta..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none font-medium"
            aria-label="Término de búsqueda"
          />
          {term && (
            <button
              type="button"
              onClick={() => setTerm('')}
              className="p-1 text-muted-foreground hover:text-foreground rounded-full"
              aria-label="Borrar texto de búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors ml-1"
            aria-label="Cerrar modal de búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sugerencias Rápidas */}
        {!term && (
          <div className="p-5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
              Búsquedas Frecuentes
            </span>
            <div className="flex flex-wrap gap-2">
              {['Vestido Satén', 'Blazer Marfil', 'Seda', 'Lino', 'Bolso Piel', 'Gala', 'Alta Costura'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleSearchChip(tag)}
                  className="px-3 py-1.5 rounded-full bg-surface-subtle hover:bg-primary-light hover:text-primary text-xs font-semibold text-secondary border border-border transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Tag className="w-3 h-3 text-muted-foreground" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resultados de Búsqueda */}
        {term && (
          <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-border/60">
            {results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className="p-3 rounded-2xl hover:bg-primary-light/50 transition-colors flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-16 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="56px"
                        unoptimized={product.images[0]?.startsWith('data:')}
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                        {product.categoryLabel}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-secondary group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {product.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-secondary block">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-[11px] text-primary flex items-center gap-1 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver prenda <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground">
                No encontramos prendas con &ldquo;<strong className="text-foreground">{term}</strong>&rdquo;. Intenta con otra palabra.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
