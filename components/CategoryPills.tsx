'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES } from '@/data/products';
import { Sparkles, Shirt, Scissors, ShoppingBag, Tag } from 'lucide-react';

export default function CategoryPills() {
  const { selectedCategory, setSelectedCategory } = useShop();

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'todos': return <Sparkles className="w-3.5 h-3.5" />;
      case 'vestidos': return <Shirt className="w-3.5 h-3.5" />;
      case 'blusas': return <Shirt className="w-3.5 h-3.5" />;
      case 'blazers': return <Scissors className="w-3.5 h-3.5" />;
      case 'accesorios': return <ShoppingBag className="w-3.5 h-3.5" />;
      default: return <Tag className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="w-full bg-card border-b border-border py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contenedor desplazable con scroll horizontal sin scrollbar visible */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-secondary text-secondary-foreground shadow-sm scale-102 ring-2 ring-primary/40'
                    : 'bg-surface-subtle text-muted-foreground hover:text-foreground hover:bg-muted border border-border/80'
                }`}
                aria-pressed={isSelected}
              >
                <span className={isSelected ? 'text-accent' : 'text-primary'}>
                  {getIcon(cat.slug)}
                </span>
                <span>{cat.name}</span>
                <span 
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-border text-muted-foreground'
                  }`}
                >
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
