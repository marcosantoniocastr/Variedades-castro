'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Lock, User, KeyRound, X, CheckCircle, ShieldAlert } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function AdminLoginModal() {
  const { 
    isAdminLoginOpen, 
    setIsAdminLoginOpen, 
    adminLogin,
    isAdmin,
    adminLogout,
    setIsScannerOpen,
    setIsInventoryOpen
  } = useShop();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isAdminLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(username, password);
    if (success) {
      setError('');
      setUsername('');
      setPassword('');
    } else {
      setError('Credenciales incorrectas. Verifica usuario y contraseña.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Acceso Administrativo"
    >
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsAdminLoginOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-sm bg-card rounded-3xl shadow-2xl overflow-hidden border border-border z-10 my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabecera */}
        <div className="p-5 border-b border-border bg-surface-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-secondary text-accent">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-base font-bold text-secondary">
                Acceso de Administrador
              </h2>
              <p className="text-[10px] text-muted-foreground">
                Panel exclusivo para el dueño de la tienda
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminLoginOpen(false)}
            className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {isAdmin ? (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-secondary">
                  Sesión de Administrador Activa
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  El lector de códigos y las herramientas de gestión están habilitados en tu tienda.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminLoginOpen(false);
                    setIsScannerOpen(true);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors"
                >
                  Abrir Lector
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminLoginOpen(false);
                    setIsInventoryOpen(true);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary-hover transition-colors"
                >
                  Inventario
                </button>
              </div>

              <div className="pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    adminLogout();
                    setIsAdminLoginOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-sale/10 hover:bg-sale text-sale hover:text-white border border-sale/20 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cerrar Sesión de Administrador
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-sale/10 border border-sale/20 text-sale text-xs font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Usuario
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-surface-subtle border border-border rounded-xl text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-surface-subtle border border-border rounded-xl text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Indicador de credenciales para el dueño */}
              <div className="p-3 rounded-xl bg-surface-subtle border border-border/80 text-[11px] text-muted-foreground space-y-1">
                <span className="font-bold text-secondary block">Credenciales de acceso:</span>
                <div>Usuario: <strong className="text-foreground">admin</strong></div>
                <div>Contraseña: <strong className="text-foreground">castro2026</strong></div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Lock className="w-4 h-4 text-accent" />
                <span>Iniciar Sesión</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
