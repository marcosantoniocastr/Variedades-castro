'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  MessageCircle,
  ScanBarcode,
  Trash2
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Product, ProductColor } from '@/types/product';

interface QuickViewInnerProps {
  product: Product;
  onClose: () => void;
}

function QuickViewInner({ product, onClose }: QuickViewInnerProps) {
  const { addToCart, formatPrice, toggleWishlist, isWishlisted, deleteProduct, isAdmin } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'ÚNICO');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const isFavorited = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  const handleDelete = () => {
    const ok = window.confirm(`¿Seguro que deseas eliminar "${product.name}" del catálogo?`);
    if (ok) {
      deleteProduct(product.id);
      onClose();
    }
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hola Variedades Castro, deseo ordenar la siguiente prenda:\n\n• Producto: ${product.name}\n• Código/SKU: ${product.barcode || product.id}\n• Talla: ${selectedSize}\n• Color: ${selectedColor?.name || 'Estándar'}\n• Cantidad: ${quantity}\n• Precio: ${formatPrice(product.price)}\n\n¿Tienen disponibilidad en horario de 8:30 AM a 5:30 PM?`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles de ${product.name}`}
    >
      {/* Fondo oscuro */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-4xl bg-card rounded-3xl shadow-2xl overflow-hidden border border-border z-10 my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Botón Cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary shadow-xs cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* GALERÍA DE IMÁGENES */}
          <div className="p-5 sm:p-8 bg-surface-subtle flex flex-col justify-between">
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-muted shadow-inner mb-4">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={(product.images[activeImageIndex] || product.images[0])?.startsWith('data:')}
                className="object-cover object-top"
                priority
              />

              {product.tag && (
                <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Miniaturas */}
            {product.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx 
                        ? 'border-primary ring-2 ring-primary/30 scale-105' 
                        : 'border-border opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      fill
                      sizes="64px"
                      unoptimized={img.startsWith('data:')}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETALLES Y ACCIONES DE COMPRA */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh]">
            
            <div>
              {/* Categoría y Código de Barra */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  {product.categoryLabel}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-surface-subtle px-2 py-0.5 rounded border border-border text-muted-foreground">
                  <ScanBarcode className="w-3.5 h-3.5 text-primary" />
                  <span>{product.barcode || product.id}</span>
                </span>
              </div>

              {/* Título */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-secondary mb-1">
                {product.name}
              </h2>
              <p className="text-xs text-muted-foreground mb-4">
                {product.subtitle}
              </p>

              {/* Precio Limpio (Sin descuentos) */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-2xl font-bold text-secondary">
                  {formatPrice(product.price)}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground font-semibold ml-auto">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  <span>{product.rating}</span>
                  <span>({product.reviewCount} opiniones)</span>
                </div>
              </div>

              {/* Descripción */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* SELECCIÓN DE COLOR */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-secondary">Color:</span>
                  <span className="text-primary">{selectedColor?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all cursor-pointer ${
                        selectedColor?.name === c.name
                          ? 'border-primary bg-primary-light text-secondary font-bold ring-2 ring-primary/20'
                          : 'border-border text-muted-foreground hover:border-foreground/30'
                      }`}
                    >
                      <span 
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" 
                        style={{ backgroundColor: c.hex }} 
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* SELECCIÓN DE TALLA */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-secondary">Selecciona tu Talla:</span>
                  <span className="text-muted-foreground text-[11px] font-semibold">Tallas Disponibles</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'bg-secondary text-white border-secondary shadow-xs'
                          : 'border-border bg-card text-secondary hover:border-primary/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* CANTIDAD Y BOTONES */}
              <div className="flex items-center gap-3 mb-4">
                {/* Control de Cantidad */}
                <div className="flex items-center border border-border rounded-xl bg-surface-subtle p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-secondary hover:text-primary rounded-lg cursor-pointer"
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-secondary">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-sm font-bold text-secondary hover:text-primary rounded-lg cursor-pointer"
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                {/* Botón Agregar a la Bolsa */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                    addedAnimation 
                      ? 'bg-success text-white scale-98' 
                      : 'bg-primary text-white hover:bg-primary-hover active:scale-98'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedAnimation ? '¡Agregado a la Bolsa!' : 'Agregar a la Bolsa'}</span>
                </button>

                {/* Favorito */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3.5 rounded-2xl border border-border text-foreground hover:text-primary hover:bg-primary-light/50 transition-colors cursor-pointer"
                  aria-label="Guardar en favoritos"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-primary text-primary' : ''}`} />
                </button>
              </div>

              {/* Botón de Eliminar Prenda (Sólo para Administrador) */}
              {isAdmin && (
                <div className="flex gap-2 mb-4">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full py-2 px-3 rounded-xl bg-sale/10 hover:bg-sale text-sale hover:text-white border border-sale/20 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Eliminar del catálogo (Admin)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar esta Prenda del Catálogo</span>
                  </button>
                </div>
              )}

              {/* Botón Directo Pedido por WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full mb-6 py-2.5 px-4 rounded-xl bg-[#25D366]/10 text-[#128C7E] border border-[#25D366]/30 hover:bg-[#25D366] hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir o consultar por WhatsApp (8:30 AM - 5:30 PM)</span>
              </button>

              {/* Detalles y Composición */}
              <div className="border-t border-border pt-4 text-xs text-muted-foreground space-y-2">
                <p>
                  <strong className="text-secondary">Composición:</strong> {product.composition}
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[11px]">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Garantías y Envíos */}
            <div className="mt-6 pt-4 border-t border-border grid grid-cols-3 gap-2 text-center text-[10px] text-muted-foreground">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-primary" />
                <span>Locales Gratis</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Pago Protegido</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-primary" />
                <span>Cambios Fáciles</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct } = useShop();

  if (!quickViewProduct) return null;

  return (
    <QuickViewInner
      key={quickViewProduct.id}
      product={quickViewProduct}
      onClose={() => setQuickViewProduct(null)}
    />
  );
}
