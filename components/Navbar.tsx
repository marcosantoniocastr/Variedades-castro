'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  Heart, 
  Clock,
  ScanBarcode,
  Truck,
  PackagePlus,
  ShieldCheck,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useMounted } from '@/hooks/use-mounted';

export default function Navbar() {
  const { 
    cartCount, 
    setIsCartOpen, 
    setIsMobileMenuOpen, 
    setIsSearchOpen, 
    setIsScannerOpen,
    setIsInventoryOpen,
    wishlist,
    setSelectedCategory,
    currency,
    setCurrency,
    isAdmin,
    adminLogout,
    customer
  } = useShop();

  const isMounted = useMounted();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (categorySlug?: string, anchorId?: string) => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
    if (anchorId) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Barra superior de anuncios de alta costura - Horario y Envíos */}
      <div className="bg-secondary text-primary-light text-xs py-2 px-4 font-medium tracking-wide text-center flex items-center justify-between sm:justify-center gap-3 overflow-hidden border-b border-white/10">
        
        {/* Saludo al cliente si ya ingresó */}
        {isMounted && customer && (
          <div className="hidden sm:flex items-center gap-1.5 text-accent font-semibold pr-3 border-r border-white/20">
            <UserCheck className="w-3.5 h-3.5 text-accent" />
            <span>Hola, {customer.name}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-accent shrink-0">
          <Clock className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          <span className="font-semibold text-white">Horario: 8:30 AM a 5:30 PM</span>
        </div>

        <span className="text-white/30 hidden md:inline">•</span>

        <div className="hidden md:flex items-center gap-1.5 text-white/90 truncate">
          <Truck className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
          <span>Envíos Locales <strong>GRATIS</strong> | Envíos Nacionales con tarifa extra</span>
        </div>

        {/* Indicador de Admin Activo */}
        {isMounted && isAdmin && (
          <div className="flex items-center gap-2 pl-3 border-l border-white/20 text-xs">
            <span className="bg-accent/20 text-accent font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Modo Admin
            </span>
            <button
              type="button"
              onClick={adminLogout}
              className="text-white/70 hover:text-white p-1"
              title="Cerrar sesión de administrador"
              aria-label="Cerrar sesión de administrador"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Navegación Principal */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-card/95 backdrop-blur-md shadow-sm border-b border-border py-2.5' 
            : 'bg-card border-b border-border/60 py-3.5'
        }`}
        aria-label="Navegación principal de la tienda"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* LADO IZQUIERDO: Menú Hamburguesa + Enlaces Rápidos */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 -ml-2 text-foreground hover:text-primary transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-primary flex items-center gap-2 cursor-pointer"
                aria-label="Abrir menú de navegación lateral"
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest hidden md:inline-block">Menú</span>
              </button>

              {/* Enlaces de Escritorio */}
              <div className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-widest font-medium text-foreground/80">
                <button
                  type="button"
                  onClick={() => handleNavClick('todos', 'catalogo')}
                  className="hover:text-primary transition-colors py-1 cursor-pointer"
                >
                  Colección
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('vestidos', 'catalogo')}
                  className="hover:text-primary transition-colors py-1 cursor-pointer"
                >
                  Vestidos
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('blazers', 'catalogo')}
                  className="hover:text-primary transition-colors py-1 cursor-pointer"
                >
                  Sastrería
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick(undefined, 'lookbook')}
                  className="hover:text-primary transition-colors py-1 cursor-pointer"
                >
                  Lookbook
                </button>
              </div>
            </div>

            {/* CENTRO: LOGO DE VARIEDADES CASTRO (Optimizado en WebP) */}
            <div className="flex-1 flex justify-center">
              <Link 
                href="/" 
                className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
                aria-label="Variedades Castro - Inicio"
              >
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full ring-2 ring-primary/30 group-hover:ring-primary transition-all shadow-sm">
                  <Image
                    src="/assets/aistudio/logo-sm.webp"
                    alt="Logo Variedades Castro"
                    fill
                    sizes="(max-width: 640px) 40px, 48px"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-secondary leading-none">
                    Variedades <span className="text-primary italic font-normal">Castro</span>
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium mt-0.5">
                    Haute Boutique
                  </span>
                </div>
              </Link>
            </div>

            {/* LADO DERECHO: Herramientas */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* BOTONES ADMINISTRADOR: SÓLO APARECEN CON USUARIO Y CONTRASEÑA */}
              {isMounted && isAdmin && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-primary-light hover:bg-primary hover:text-white border border-primary/40 text-primary text-xs font-bold transition-all cursor-pointer animate-in fade-in"
                    title="Lector de Códigos de Barras (Admin)"
                    aria-label="Lector de Códigos de Barras"
                  >
                    <ScanBarcode className="w-4 h-4" />
                    <span className="hidden md:inline">Lector</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsInventoryOpen(true)}
                    className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-white hover:bg-secondary-hover text-xs font-semibold transition-all cursor-pointer animate-in fade-in"
                    title="Gestión de Inventario (Admin)"
                    aria-label="Gestor de Productos"
                  >
                    <PackagePlus className="w-3.5 h-3.5 text-accent" />
                    <span>Inventario</span>
                  </button>
                </>
              )}

              {/* SELECTOR DE MONEDA: SOLO CÓRDOBAS (NIO) Y DÓLARES (USD) */}
              <div className="flex items-center bg-surface-subtle border border-border rounded-full p-0.5 ml-1">
                <button
                  type="button"
                  onClick={() => setCurrency('NIO')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    currency === 'NIO'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Ver precios en Córdobas (C$)"
                  title="Córdobas nicaragüenses"
                >
                  C$
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    currency === 'USD'
                      ? 'bg-secondary text-white shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  aria-label="Ver precios en Dólares ($)"
                  title="Dólares estadounidenses"
                >
                  $
                </button>
              </div>

              {/* Botón de Búsqueda */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-foreground hover:text-primary transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                aria-label="Buscar en la tienda"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Botón de Lista de Deseos */}
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('catalogo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative p-2 text-foreground hover:text-primary transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-primary hidden sm:inline-flex cursor-pointer"
                aria-label={`Ver lista de deseos (${wishlist.length} artículos)`}
              >
                <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-primary text-primary' : ''}`} aria-hidden="true" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Botón de Carrito de Compras */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground hover:text-primary transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                aria-label={`Abrir bolsa de compras con ${cartCount} artículos`}
              >
                <ShoppingBag className="w-5 h-5 text-secondary" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center animate-bounce shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}
