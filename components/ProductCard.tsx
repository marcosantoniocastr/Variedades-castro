'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Eye, ShoppingBag, Star, ScanBarcode, Trash2 } from 'lucide-react';
import { Product } from '@/types/product';
import { useShop } from '@/context/ShopContext';
import { useMounted } from '@/hooks/use-mounted';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { 
    formatPrice, 
    toggleWishlist, 
    isWishlisted, 
    setQuickViewProduct, 
    addToCart,
    deleteProduct,
    isAdmin
  } = useShop();

  const isMounted = useMounted();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isWishlisted(product.id);
  const hasSecondaryImage = product.images.length > 1;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], selectedColor, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = window.confirm(`¿Deseas eliminar permanentemente la prenda "${product.name}"?`);
    if (ok) {
      deleteProduct(product.id);
    }
  };

  return (
    <article 
      className="group relative flex flex-col bg-card rounded-2xl overflow-hidden border border-border/80 hover:border-primary/40 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-labelledby={`product-title-${product.id}`}
    >
      {/* Contenedor de Imagen de Moda */}
      <div 
        className="relative aspect-3/4 w-full overflow-hidden bg-muted cursor-pointer" 
        onClick={() => setQuickViewProduct(product)}
      >
        {/* Imagen Principal */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          unoptimized={product.images[0]?.startsWith('data:')}
          className={`object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 ${
            isHovered && hasSecondaryImage ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />

        {/* Imagen Secundaria al hacer hover */}
        {hasSecondaryImage && (
          <Image
            src={product.images[1]}
            alt={`${product.name} vista detallada`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized={product.images[1]?.startsWith('data:')}
            className={`object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}

        {/* Etiqueta de Producto (Badge) */}
        {product.tag && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-xs bg-secondary text-white">
              {product.tag}
            </span>
          </div>
        )}

        {/* Botones Superiores: Eliminar (Gestión) y Lista de Deseos */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          {/* Botón rápido para eliminar prenda (Sólo visible para Administrador) */}
          {isMounted && isAdmin && (
            <button
              type="button"
              onClick={handleDelete}
              className="p-2 rounded-full bg-card/90 backdrop-blur-xs text-muted-foreground hover:text-sale hover:bg-sale/10 transition-all shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
              title="Eliminar prenda del catálogo (Admin)"
              aria-label={`Eliminar ${product.name}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Botón de Lista de Deseos */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="p-2 rounded-full bg-card/90 backdrop-blur-xs text-foreground hover:text-primary transition-all shadow-sm hover:scale-110 active:scale-95 cursor-pointer"
            aria-label={isFavorited ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`}
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isFavorited ? 'fill-primary text-primary' : 'text-foreground/70'
              }`} 
            />
          </button>
        </div>

        {/* Botón Flotante de Vista Rápida */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-card/95 backdrop-blur-md text-secondary hover:text-primary hover:bg-card text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Rápida</span>
          </button>
        </div>

      </div>

      {/* Información del Producto */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Código de Barras / SKU y Muestrario de Colores */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground bg-surface-subtle px-2 py-0.5 rounded border border-border">
              <ScanBarcode className="w-3 h-3 text-primary" />
              <span>{product.barcode || product.id}</span>
            </div>

            {/* Valoración */}
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Subtítulo / Categoría */}
          <p className="text-[11px] uppercase tracking-wider text-primary font-semibold mb-1">
            {product.categoryLabel}
          </p>

          {/* Nombre del Producto */}
          <h3 
            id={`product-title-${product.id}`}
            onClick={() => setQuickViewProduct(product)}
            className="font-serif text-base font-bold text-secondary group-hover:text-primary transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-muted-foreground line-clamp-1 mb-3">
            {product.subtitle}
          </p>
        </div>

        {/* Fila de Precio (Sin descuentos) y Botón de Compra */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
          <div>
            <span className="text-base font-bold text-secondary">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Botón Agregar a la Bolsa */}
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`p-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              justAdded 
                ? 'bg-success text-white scale-95' 
                : 'bg-primary-light text-primary hover:bg-primary hover:text-white border border-primary/20 active:scale-95'
            }`}
            aria-label={`Agregar ${product.name} a la bolsa de compras`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">
              {justAdded ? '¡Agregado!' : 'Añadir'}
            </span>
          </button>
        </div>

      </div>
    </article>
  );
}
