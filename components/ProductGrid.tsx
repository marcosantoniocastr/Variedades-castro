'use client';

import React, { useState, useMemo } from 'react';
import { useShop } from '@/context/ShopContext';
import { useMounted } from '@/hooks/use-mounted';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Sparkles, ScanBarcode, Plus } from 'lucide-react';

export default function ProductGrid() {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setIsScannerOpen,
    setIsInventoryOpen,
    isAdmin 
  } = useShop();

  const isMounted = useMounted();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filtrado y ordenamiento dinámico sobre el inventario actual
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Filtro de categoría
      if (selectedCategory !== 'todos' && item.category !== selectedCategory) {
        return false;
      }
      // Filtro de búsqueda (nombre, código de barra, descripción)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBarcode = item.barcode?.toLowerCase().includes(query);
        const matchesSubtitle = item.subtitle.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesBarcode && !matchesSubtitle && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section 
      id="catalogo" 
      aria-label="Catálogo de productos de moda"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
    >
      {/* Encabezado del Catálogo */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-border">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prendas de Autor & Atelier</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-secondary tracking-tight">
            Catálogo Exclusivo
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Prendas confeccionadas con patronaje de alta costura, finas sedas y acabados reforzados.
          </p>
        </div>

        {/* Acciones de inventario y Ordenamiento */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Botones de Administrador (Lector de Códigos y Gestión) */}
          {isMounted && isAdmin && (
            <>
              <button
                type="button"
                onClick={() => setIsScannerOpen(true)}
                className="text-xs font-semibold px-3.5 py-2 rounded-full border border-border bg-card hover:bg-primary-light hover:text-primary transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Escanear prenda con lector de código de barras (Admin)"
              >
                <ScanBarcode className="w-4 h-4 text-primary" />
                <span>Lector de Barras</span>
              </button>

              <button
                type="button"
                onClick={() => setIsInventoryOpen(true)}
                className="text-xs font-semibold px-3.5 py-2 rounded-full bg-secondary hover:bg-secondary-hover text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Agregar o eliminar prendas del catálogo (Admin)"
              >
                <Plus className="w-4 h-4 text-accent" />
                <span>Gestionar Catálogo</span>
              </button>
            </>
          )}

          {/* Menú Desplegable de Ordenamiento */}
          <div className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-full shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-secondary focus:outline-none cursor-pointer"
              aria-label="Ordenar productos por"
            >
              <option value="featured">Destacados Atelier</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="rating">Mejor Calificados (5★)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Contador de resultados */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-6">
        <p>
          Mostrando <strong className="text-foreground">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'prenda' : 'prendas'}
          {selectedCategory !== 'todos' && <span> en esta categoría</span>}
        </p>

        {(selectedCategory !== 'todos' || searchQuery) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('todos');
              setSearchQuery('');
            }}
            className="text-primary hover:underline font-semibold cursor-pointer"
          >
            Ver todo el inventario
          </button>
        )}
      </div>

      {/* Rejilla de Productos Adaptativa */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Estado vacío */
        <div className="py-16 text-center bg-card rounded-2xl border border-dashed border-border p-8 max-w-lg mx-auto">
          <SlidersHorizontal className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="font-serif text-lg font-bold text-secondary mb-1">
            No encontramos prendas con esos filtros
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Prueba a restablecer la categoría o buscar por otro código de barras.
          </p>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-secondary text-white text-xs font-semibold rounded-full hover:bg-secondary-hover transition-colors cursor-pointer"
            >
              Ver Todo el Catálogo
            </button>
            {isAdmin && (
              <button
                type="button"
                onClick={() => setIsInventoryOpen(true)}
                className="px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-full hover:bg-primary-hover transition-colors cursor-pointer"
              >
                + Agregar Prenda
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
