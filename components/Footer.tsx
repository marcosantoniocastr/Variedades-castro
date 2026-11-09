'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  PhoneCall, 
  Mail, 
  Clock, 
  Truck,
  ScanBarcode,
  Lock,
  LogOut
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useMounted } from '@/hooks/use-mounted';

export default function Footer() {
  const { 
    setSelectedCategory, 
    setIsScannerOpen, 
    isAdmin, 
    setIsAdminLoginOpen, 
    adminLogout 
  } = useShop();

  const isMounted = useMounted();

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
    <footer className="bg-secondary text-secondary-foreground border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Fila Principal de Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* COLUMNA 1 & 2: MARCA Y LOGO */}
          <div className="lg:col-span-2 space-y-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1"
              aria-label="Variedades Castro - Volver al inicio"
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/40 bg-card">
                <Image
                  src="/assets/aistudio/logo-sm.webp"
                  alt="Logo Variedades Castro"
                  fill
                  sizes="48px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Variedades <span className="text-primary italic font-normal">Castro</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">
                  Haute Boutique • Colección 2026
                </span>
              </div>
            </Link>

            <p className="text-xs text-secondary-foreground/75 leading-relaxed max-w-sm">
              Tienda de ropa de alta gama. Vestidos elegantes, blusas de seda y sastrería femenina de máxima distinción. Precios en Córdobas (C$) y Dólares ($).
            </p>

            {/* HORARIO Y ATENCIÓN */}
            <div className="pt-2 text-xs text-secondary-foreground/80 space-y-2">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Clock className="w-4 h-4 text-accent shrink-0" />
                <span>Horario de Atención: 8:30 AM a 5:30 PM (Lunes a Sábado)</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <span>Envíos Locales Gratis • Envíos Nacionales con extra</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-primary shrink-0" />
                <span>Atención WhatsApp: +1 (800) CASTRO-MODA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>contacto@variedadescastro.com</span>
              </div>
            </div>
          </div>

          {/* COLUMNA 3: COLECCIONES */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-wider uppercase text-white mb-4">
              Colecciones
            </h3>
            <ul className="space-y-2.5 text-xs text-secondary-foreground/75">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('vestidos', 'catalogo')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Vestidos de Gala
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('blusas', 'catalogo')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Blusas & Tops de Seda
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('blazers', 'catalogo')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Blazers & Sastrería
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('pantalones', 'catalogo')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Pantalones & Faldas
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('accesorios', 'catalogo')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Bolsos en Piel & Accesorios
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('todos', 'catalogo')}
                  className="hover:text-accent font-semibold transition-colors cursor-pointer"
                >
                  Ver Todo el Catálogo →
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: ATENCIÓN & ENVÍOS */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-wider uppercase text-white mb-4">
              Servicios & Envíos
            </h3>
            <ul className="space-y-2.5 text-xs text-secondary-foreground/75">
              <li className="text-success font-semibold">
                ✓ Envíos Locales: Totalmente Gratis
              </li>
              <li className="text-secondary-foreground/80">
                ✓ Envíos Nacionales: Con recargo preferencial
              </li>
              {isMounted && isAdmin && (
                <li>
                  <button
                    type="button"
                    onClick={() => setIsScannerOpen(true)}
                    className="text-primary hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ScanBarcode className="w-3.5 h-3.5" />
                    <span>Lector de Códigos de Barras</span>
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick(undefined, 'lookbook')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Lookbook de Moda
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick(undefined, 'testimonios')}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Opiniones de Clientas
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMNA 5: MONEDAS Y PAGOS */}
          <div>
            <h3 className="font-serif text-sm font-bold tracking-wider uppercase text-white mb-4">
              Monedas Aceptadas
            </h3>
            <p className="text-xs text-secondary-foreground/75 leading-relaxed mb-4">
              Precios transparentes exclusivamente en <strong>Córdobas (C$)</strong> y <strong>Dólares ($ USD)</strong>.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-semibold text-secondary-foreground/80 mb-4">
              <span className="px-3 py-1 rounded bg-white/10 border border-white/15">Córdobas C$</span>
              <span className="px-3 py-1 rounded bg-white/10 border border-white/15">Dólares $ USD</span>
            </div>

            <div className="text-[11px] text-muted-foreground">
              Tasa de referencia: 1 USD = 36.80 Córdobas
            </div>
          </div>

        </div>

        {/* Fila Inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary-foreground/60 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} <strong>Variedades Castro</strong>. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span>Horario: 8:30 AM a 5:30 PM • Envíos Locales Gratis</span>
            {isMounted && (
              <>
                <span className="text-white/20">|</span>
                {!isAdmin ? (
                  <button
                    type="button"
                    onClick={() => setIsAdminLoginOpen(true)}
                    className="hover:text-primary text-secondary-foreground/70 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Lock className="w-3 h-3 text-accent" />
                    <span>Acceso Dueño / Admin</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={adminLogout}
                    className="text-primary hover:underline transition-colors flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Salir de Modo Admin</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
