'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, User, Phone, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { useMounted } from '@/hooks/use-mounted';

export default function CustomerWelcomeModal() {
  const { 
    isCustomerGateOpen, 
    saveCustomer, 
    setIsAdminLoginOpen,
    isAdmin 
  } = useShop();

  const isMounted = useMounted();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isMounted || !isCustomerGateOpen || isAdmin) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor escribe tu nombre para darte la bienvenida.');
      return;
    }
    if (!phone.trim()) {
      setError('Por favor ingresa tu número de celular para coordinar tus compras.');
      return;
    }
    setError('');
    saveCustomer(name, phone);
  };

  const handleOpenAdmin = () => {
    setIsAdminLoginOpen(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenida a Variedades Castro"
    >
      {/* Fondo oscuro con desenfoque suave */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Tarjeta de Entrada de Cliente */}
      <div className="relative w-full max-w-md bg-card rounded-3xl shadow-2xl overflow-hidden border border-border z-10 my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabecera con Logotipo */}
        <div className="pt-8 pb-5 px-6 text-center bg-surface-subtle border-b border-border">
          <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden ring-4 ring-primary/20 shadow-md mb-3">
            <Image
              src="/assets/aistudio/logo-sm.webp"
              alt="Logo Variedades Castro"
              fill
              sizes="64px"
              priority
              className="object-cover"
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Bienvenida a Variedades Castro</span>
          </div>

          <h2 className="font-serif text-2xl font-bold text-secondary">
            Boutique de Alta Moda
          </h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            Por favor ingresa tu nombre y celular para darte acceso exclusivo a nuestro catálogo.
          </p>
        </div>

        {/* Formulario Sencillo: Sólo Nombre y Celular */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-sale/10 border border-sale/20 text-sale text-xs font-semibold">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="customer-name" className="block text-xs font-bold text-secondary mb-1.5">
              Tu Nombre Completo *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="customer-name"
                type="text"
                required
                placeholder="Ej: María López"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-subtle border border-border rounded-xl text-xs sm:text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label htmlFor="customer-phone" className="block text-xs font-bold text-secondary mb-1.5">
              Número de Celular o WhatsApp *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="customer-phone"
                type="tel"
                required
                placeholder="Ej: 8888-1234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface-subtle border border-border rounded-xl text-xs sm:text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-secondary hover:bg-secondary-hover text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <span>Ingresar a la Tienda</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-success" />
            <span>Tus datos solo se usarán para coordinar tus compras</span>
          </div>

          {/* Enlace para Administrador */}
          <div className="pt-4 border-t border-border text-center">
            <button
              type="button"
              onClick={handleOpenAdmin}
              className="text-[11px] text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 underline cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>¿Eres el administrador? Iniciar sesión aquí</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
