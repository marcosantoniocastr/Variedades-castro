'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  X, 
  Search, 
  ChevronRight, 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  MessageCircle, 
  Clock, 
  Truck, 
  Tag, 
  Shirt, 
  Scissors,
  ScanBarcode,
  PackagePlus,
  Lock,
  LogOut,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { CATEGORIES } from '@/data/products';

export default function MobileSidebarDrawer() {
  const { 
    isMobileMenuOpen, 
    setIsMobileMenuOpen, 
    setSelectedCategory, 
    setIsSearchOpen,
    setIsScannerOpen,
    setIsInventoryOpen,
    cartCount,
    setIsCartOpen,
    wishlist,
    currency,
    setCurrency,
    isAdmin,
    adminLogout,
    setIsAdminLoginOpen,
    customer
  } = useShop();

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsMobileMenuOpen(false);
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateTo = (targetId: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'todos': return <Sparkles className="w-4 h-4 text-accent" />;
      case 'vestidos': return <Shirt className="w-4 h-4 text-primary" />;
      case 'blusas': return <Shirt className="w-4 h-4 text-primary" />;
      case 'blazers': return <Scissors className="w-4 h-4 text-primary" />;
      case 'accesorios': return <ShoppingBag className="w-4 h-4 text-accent" />;
      default: return <Tag className="w-4 h-4 text-primary" />;
    }
  };

  if (!isMobileMenuOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden" 
      role="dialog" 
      aria-modal="true" 
      aria-label="Menú de navegación lateral deslizante"
    >
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div 
          ref={drawerRef}
          className="w-screen max-w-sm sm:max-w-md bg-card shadow-2xl flex flex-col transform transition-transform ease-out duration-300 border-r border-border animate-in slide-in-from-left"
        >
          {/* Cabecera del Drawer */}
          <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-surface-subtle/50">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-primary/40 shadow-xs">
                <Image
                  src="/assets/aistudio/logo-sm.webp"
                  alt="Logo Variedades Castro"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-secondary leading-tight">
                  Variedades <span className="text-primary italic font-normal">Castro</span>
                </h2>
                {customer ? (
                  <p className="text-[11px] text-primary font-semibold flex items-center gap-1">
                    <UserCheck className="w-3 h-3" /> {customer.name}
                  </p>
                ) : (
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                    Menú de Navegación
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              aria-label="Cerrar menú lateral"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Selector de Moneda: SOLO CÓRDOBAS Y DÓLARES */}
          <div className="p-4 border-b border-border bg-card flex items-center justify-between">
            <span className="text-xs font-semibold text-secondary">Moneda:</span>
            <div className="flex items-center gap-1 bg-surface-subtle border border-border p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setCurrency('NIO')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  currency === 'NIO'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Córdobas (C$)
              </button>
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  currency === 'USD'
                    ? 'bg-secondary text-white shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dólares ($)
              </button>
            </div>
          </div>

          {/* HERRAMIENTAS ADMINISTRADOR: SÓLO VISIBLES SI isAdmin ES TRUE */}
          {isAdmin && (
            <div className="p-4 border-b border-border bg-primary-light/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-primary px-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Panel Administrador Activo</span>
                </span>
                <button
                  type="button"
                  onClick={adminLogout}
                  className="text-[10px] text-sale hover:underline flex items-center gap-1 font-semibold"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Salir</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsScannerOpen(true);
                  }}
                  className="p-2.5 rounded-xl bg-card border border-primary/40 hover:bg-primary hover:text-white text-left transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <ScanBarcode className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-xs font-bold block">Lector Barras</span>
                    <span className="text-[10px] opacity-75">Escanear / Vender</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsInventoryOpen(true);
                  }}
                  className="p-2.5 rounded-xl bg-card border border-border hover:bg-secondary hover:text-white text-left transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <PackagePlus className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <span className="text-xs font-bold block">Inventario</span>
                    <span className="text-[10px] opacity-75">Agregar / Borrar</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Barra de Búsqueda Rápida */}
          <div className="p-4 border-b border-border bg-card">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 bg-muted/60 hover:bg-muted rounded-full text-left text-xs font-medium text-muted-foreground transition-colors border border-border/70"
            >
              <Search className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Buscar vestidos, blazers, bolsos...</span>
            </button>
          </div>

          {/* Contenido Desplazable */}
          <div className="flex-1 overflow-y-auto px-4 py-4 divide-y divide-border/60">
            
            {/* Acciones Rápidas Superior */}
            <div className="pb-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-subtle border border-border hover:border-primary/50 text-xs font-semibold text-secondary transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-primary" />
                <span>Bolsa ({cartCount})</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavigateTo('catalogo')}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-subtle border border-border hover:border-primary/50 text-xs font-semibold text-secondary transition-all cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-primary text-primary' : 'text-primary'}`} />
                <span>Deseos ({wishlist.length})</span>
              </button>
            </div>

            {/* SECCIÓN DE CATEGORÍAS */}
            <div className="py-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Colecciones
                </span>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                  2026
                </span>
              </div>

              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg text-left hover:bg-primary-light/60 transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-1.5 rounded-md bg-muted/80 group-hover:bg-primary/20 transition-colors">
                        {getCategoryIcon(cat.slug)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                          {cat.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground line-clamp-1">
                          {cat.tagline}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>

            {/* ENLACES DIRECTOS A SECCIONES */}
            <div className="py-4 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground block mb-2 px-1">
                Explorar Secciones
              </span>

              <button
                type="button"
                onClick={() => handleNavigateTo('hero')}
                className="w-full flex items-center justify-between p-2 text-sm font-medium text-secondary hover:text-primary transition-colors rounded-md cursor-pointer"
              >
                <span>Inicio</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigateTo('catalogo')}
                className="w-full flex items-center justify-between p-2 text-sm font-medium text-secondary hover:text-primary transition-colors rounded-md cursor-pointer"
              >
                <span>Catálogo de Prendas</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              <button
                type="button"
                onClick={() => handleNavigateTo('lookbook')}
                className="w-full flex items-center justify-between p-2 text-sm font-medium text-secondary hover:text-primary transition-colors rounded-md cursor-pointer"
              >
                <span>Lookbook de Estilo</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* HORARIO Y ENVÍOS */}
            <div className="py-4 space-y-3">
              <div className="p-3 rounded-2xl bg-surface-subtle border border-border/80 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-secondary">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Horario: 8:30 AM a 5:30 PM</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-[11px]">
                  <Truck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>Envíos Locales: <strong>GRATIS</strong><br />Envíos Nacionales: con tarifa preferencial</span>
                </div>
              </div>

              <a
                href="https://wa.me/?text=Hola%20Variedades%20Castro%2C%20quisiera%20asesor%C3%ADa%20personalizada%20sobre%20su%20colecci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 px-4 rounded-xl text-xs font-bold hover:brightness-105 transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Asesoría por WhatsApp</span>
              </a>
            </div>

            {/* ENLACE PARA ACCESO ADMINISTRATIVO (Si no es admin) */}
            {!isAdmin && (
              <div className="py-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAdminLoginOpen(true);
                  }}
                  className="text-xs text-muted-foreground hover:text-primary font-semibold flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Acceso Dueño / Administrador</span>
                </button>
              </div>
            )}

          </div>

          {/* Pie del Drawer */}
          <div className="p-4 border-t border-border bg-surface-subtle text-center text-[11px] text-muted-foreground">
            <p className="font-serif text-secondary font-semibold">Variedades Castro © 2026</p>
            <p className="text-[10px] mt-0.5">8:30 AM a 5:30 PM • Envíos Locales Gratis</p>
          </div>

        </div>
      </div>
    </div>
  );
}
