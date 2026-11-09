'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Truck, 
  ArrowRight, 
  MessageCircle, 
  Check, 
  Lock,
  Clock,
  ScanBarcode,
  MapPin
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartCount,
    shippingType,
    setShippingType,
    shippingCost,
    cartTotal,
    formatPrice,
    currency,
    customer
  } = useShop();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    const itemsSummary = cart.map(
      (item, i) =>
        `${i + 1}. ${item.product.name} (SKU: ${item.product.barcode || item.product.id} | Talla: ${item.selectedSize} | Color: ${item.selectedColor.name} | Cant: ${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`
    ).join('\n');

    const shippingLabel = shippingType === 'local' 
      ? 'Envío Local (GRATIS)' 
      : `Envío Nacional (Extra: ${formatPrice(shippingCost)})`;

    const customerDetails = customer 
      ? `\n• Cliente: ${customer.name}\n• Celular / WhatsApp: ${customer.phone}`
      : '';

    const msg = `Hola Variedades Castro, quiero realizar mi pedido:${customerDetails}\n\n${itemsSummary}\n\n• Subtotal: ${formatPrice(cartSubtotal)}\n• Método de Envío: ${shippingLabel}\n• TOTAL A PAGAR: ${formatPrice(cartTotal)}\n• Moneda: ${currency === 'NIO' ? 'Córdobas (C$)' : 'Dólares ($)'}\n\n¿Tienen disponibilidad para procesar la orden hoy en horario de 8:30 AM a 5:30 PM?`;

    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleDirectCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden" 
      role="dialog" 
      aria-modal="true" 
      aria-label="Bolsa de compras"
    >
      {/* Fondo oscuro */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-card shadow-2xl flex flex-col transform transition-transform ease-out duration-300 border-l border-border animate-in slide-in-from-right">
          
          {/* CABECERA DE LA BOLSA */}
          <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-surface-subtle">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="font-serif text-lg font-bold text-secondary">
                Tu Bolsa de Compras
              </h2>
              <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
              aria-label="Cerrar bolsa de compras"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* HORARIO DE ATENCIÓN EN LA BOLSA */}
          <div className="p-3 bg-secondary text-white text-xs flex items-center justify-between border-b border-white/10">
            <span className="flex items-center gap-1.5 font-medium text-white/90">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>Horario de Atención: <strong>8:30 AM a 5:30 PM</strong></span>
            </span>
            <span className="text-[10px] bg-accent/20 text-accent font-bold px-2 py-0.5 rounded">
              Activo
            </span>
          </div>

          {/* CONTENIDO DE LA BOLSA */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-border/70">
            {orderComplete ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-success/15 text-success flex items-center justify-center mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-secondary mb-2">
                  ¡Orden Lista para Coordinar!
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs mb-6">
                  Nos comunicaremos contigo en horario de 8:30 AM a 5:30 PM para coordinar la entrega de tus prendas.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary-hover transition-colors cursor-pointer"
                >
                  Seguir Comprando
                </button>
              </div>
            ) : cart.length > 0 ? (
              <div className="space-y-4 pb-4">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex gap-3 sm:gap-4 pt-4 first:pt-0">
                    {/* Imagen del Producto */}
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="80px"
                        unoptimized={item.product.images[0]?.startsWith('data:')}
                        className="object-cover object-top"
                      />
                    </div>

                    {/* Información */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-secondary line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor.name)}
                            className="text-muted-foreground hover:text-sale p-1 cursor-pointer"
                            aria-label={`Eliminar ${item.product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* SKU / Código de barras */}
                        <div className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground mt-0.5">
                          <ScanBarcode className="w-3 h-3 text-primary" />
                          <span>{item.product.barcode || item.product.id}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground">
                          <span className="font-semibold text-secondary">Talla: {item.selectedSize}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <span 
                              className="w-2.5 h-2.5 rounded-full border border-black/20" 
                              style={{ backgroundColor: item.selectedColor.hex }} 
                            />
                            {item.selectedColor.name}
                          </span>
                        </div>
                      </div>

                      {/* Cantidad y Precio Limpio */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/50">
                        <div className="flex items-center border border-border rounded-lg bg-surface-subtle p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, -1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-secondary hover:text-primary cursor-pointer"
                            aria-label="Restar una unidad"
                          >
                            -
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-secondary">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor.name, 1)}
                            className="w-6 h-6 flex items-center justify-center text-xs font-bold text-secondary hover:text-primary cursor-pointer"
                            aria-label="Sumar una unidad"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-secondary">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary-light text-primary flex items-center justify-center mb-4">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-secondary mb-1">
                  Tu bolsa está vacía
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs mb-6">
                  Descubre nuestras prendas de alta costura y agrega tus favoritas.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-secondary text-white text-xs font-bold rounded-full hover:bg-secondary-hover transition-colors cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            )}
          </div>

          {/* PIE DE LA BOLSA: SELECTOR DE ENVÍOS Y TOTALES */}
          {cart.length > 0 && !orderComplete && (
            <div className="p-4 sm:p-5 border-t border-border bg-card space-y-4 shadow-lg">
              
              {/* SELECTOR DE ENVÍO: LOCALES GRATIS VS NACIONALES CON EXTRA */}
              <div className="p-3 bg-surface-subtle border border-border rounded-2xl space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-primary" />
                  <span>Seleccionar Tipo de Envío:</span>
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {/* Envío Local GRATIS */}
                  <button
                    type="button"
                    onClick={() => setShippingType('local')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      shippingType === 'local'
                        ? 'border-primary bg-primary-light/80 shadow-xs ring-1 ring-primary'
                        : 'border-border bg-card hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-secondary">Envío Local</span>
                      <span className="text-[10px] bg-success text-white px-1.5 py-0.2 rounded font-bold">
                        GRATIS
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">
                      Entrega en la ciudad
                    </span>
                  </button>

                  {/* Envío Nacional CON EXTRA */}
                  <button
                    type="button"
                    onClick={() => setShippingType('nacional')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      shippingType === 'nacional'
                        ? 'border-primary bg-primary-light/80 shadow-xs ring-1 ring-primary'
                        : 'border-border bg-card hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-secondary">Nacional</span>
                      <span className="text-[10px] font-bold text-primary">
                        +{formatPrice(5)}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground block mt-0.5">
                      Departamentos / Extra
                    </span>
                  </button>
                </div>
              </div>

              {/* Totales y Cálculos */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-secondary">{formatPrice(cartSubtotal)}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Envío ({shippingType === 'local' ? 'Local' : 'Nacional con recargo'})</span>
                  <span className="font-medium text-secondary">
                    {shippingType === 'local' ? (
                      <strong className="text-success font-bold">GRATIS</strong>
                    ) : (
                      <strong className="text-primary font-bold">+{formatPrice(shippingCost)}</strong>
                    )}
                  </span>
                </div>

                <div className="pt-2 border-t border-border flex justify-between text-base font-extrabold text-secondary">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Botón WhatsApp Express con Detalles */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir por WhatsApp (8:30 AM a 5:30 PM)</span>
              </button>

              {/* Botón Pago Directo */}
              <button
                type="button"
                onClick={handleDirectCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 px-6 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 disabled:opacity-70 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-accent" />
                <span>{isCheckingOut ? 'Procesando Orden...' : 'Completar Orden en Tienda'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-2">
                <MapPin className="w-3 h-3 text-primary" />
                <span>Envíos locales sin costo • Nacionales con tarifa preferencial</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
