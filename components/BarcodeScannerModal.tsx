'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ScanBarcode, 
  X, 
  Camera, 
  Trash2, 
  ShoppingBag, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Product } from '@/types/product';

interface BarcodeScannerInnerProps {
  onClose: () => void;
}

function BarcodeScannerInner({ onClose }: BarcodeScannerInnerProps) {
  const { 
    findProductByBarcode, 
    deleteProduct, 
    addToCart, 
    formatPrice,
    setIsInventoryOpen
  } = useShop();

  const [inputCode, setInputCode] = useState('');
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'found' | 'not-found'>('idle');
  const [deletedSuccess, setDeletedSuccess] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const stopCamera = React.useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => inputRef.current?.focus(), 150);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [onClose]);

  const handleProcessBarcode = React.useCallback((codeToSearch: string) => {
    const code = codeToSearch.trim();
    if (!code) return;
    setInputCode(code);
    setDeletedSuccess(false);

    const found = findProductByBarcode(code);
    if (found) {
      setScannedProduct(found);
      setScanStatus('found');
    } else {
      setScannedProduct(null);
      setScanStatus('not-found');
    }
  }, [findProductByBarcode]);

  const startCamera = async () => {
    try {
      setCameraError('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
      }

      // Si el navegador soporta la API nativa BarcodeDetector
      if ('BarcodeDetector' in window) {
        const barcodeDetector = new (window as any).BarcodeDetector({
          formats: ['code_128', 'code_39', 'ean_13', 'ean_8', 'qr_code', 'upc_a', 'upc_e']
        });

        const interval = setInterval(async () => {
          if (!videoRef.current || !streamRef.current) {
            clearInterval(interval);
            return;
          }
          try {
            const barcodes = await barcodeDetector.detect(videoRef.current);
            if (barcodes.length > 0) {
              const rawVal = barcodes[0].rawValue;
              clearInterval(interval);
              stopCamera();
              handleProcessBarcode(rawVal);
            }
          } catch {
            // ignore scan frame error
          }
        }, 400);
      }
    } catch {
      setCameraError('No se pudo acceder a la cámara. Puedes escribir o escanear con tu lector USB/Bluetooth.');
      setCameraActive(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessBarcode(inputCode);
  };

  const handleDeleteScanned = () => {
    if (!scannedProduct) return;
    const confirmDelete = window.confirm(`¿Seguro que deseas eliminar permanentemente "${scannedProduct.name}" del catálogo?`);
    if (confirmDelete) {
      deleteProduct(scannedProduct.id);
      setDeletedSuccess(true);
      setScannedProduct(null);
      setScanStatus('idle');
      setInputCode('');
    }
  };

  const handleCreateWithCode = () => {
    onClose();
    setIsInventoryOpen(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Lector de Códigos de Barras"
    >
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden border border-border z-10 my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabecera */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-surface-subtle">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary text-white">
              <ScanBarcode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-secondary">
                Lector de Códigos de Barras
              </h2>
              <p className="text-[10px] text-muted-foreground">
                Escanea para buscar, vender o eliminar prendas
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="Cerrar escáner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          
          {/* CÁMARA O ACTIVADOR DE CÁMARA */}
          <div className="relative rounded-2xl overflow-hidden bg-black/90 aspect-16/9 flex flex-col items-center justify-center text-white border border-border">
            {cameraActive ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                />
                {/* Cuadrícula o mirilla roja de escaneo */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-pulse" />
                <div className="absolute inset-8 border-2 border-white/40 rounded-xl pointer-events-none" />
                <button
                  type="button"
                  onClick={stopCamera}
                  className="absolute bottom-3 bg-card/80 backdrop-blur-md text-foreground px-3 py-1.5 rounded-full text-xs font-semibold shadow-md cursor-pointer"
                >
                  Detener Cámara
                </button>
              </>
            ) : (
              <div className="text-center p-4">
                <Camera className="w-10 h-10 mx-auto text-primary mb-2 opacity-80" />
                <p className="text-xs font-medium text-white/90 mb-3">
                  Puedes activar tu cámara o usar un lector físico de barras
                </p>
                <button
                  type="button"
                  onClick={startCamera}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-full text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Escanear con Cámara</span>
                </button>
              </div>
            )}
          </div>
          {cameraError && (
            <p className="text-[11px] text-sale text-center">{cameraError}</p>
          )}

          {/* INPUT MANUAL O DEL LECTOR FÍSICO */}
          <form onSubmit={handleManualSubmit} className="space-y-2">
            <label htmlFor="barcode-input" className="block text-xs font-semibold text-secondary">
              Ingresar o Escanear Código (Pistola Láser o Teclado):
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <ScanBarcode className="w-4 h-4 text-primary absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  ref={inputRef}
                  id="barcode-input"
                  type="text"
                  placeholder="Ej: 744100123001"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 bg-secondary hover:bg-secondary-hover text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                Buscar
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground">
              💡 Tip de prueba: Puedes probar con códigos de ejemplo: <strong>744100123001</strong> o <strong>744100123002</strong>
            </p>
          </form>

          {/* ALERTA DE ÉXITO AL ELIMINAR */}
          {deletedSuccess && (
            <div className="p-3.5 rounded-xl bg-success/10 border border-success/30 text-success text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>¡La prenda fue eliminada exitosamente del catálogo de Variedades Castro!</span>
            </div>
          )}

          {/* RESULTADO: PRODUCTO ENCONTRADO */}
          {scanStatus === 'found' && scannedProduct && (
            <div className="p-4 rounded-2xl bg-surface-subtle border border-primary/30 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-primary font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span>Prenda Localizada en Inventario</span>
                </span>
                <span className="font-mono text-[11px] bg-card px-2 py-0.5 rounded border border-border">
                  SKU: {scannedProduct.barcode}
                </span>
              </div>

              <div className="flex gap-3">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                  <Image
                    src={scannedProduct.images[0]}
                    alt={scannedProduct.name}
                    fill
                    sizes="64px"
                    unoptimized={scannedProduct.images[0]?.startsWith('data:')}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold text-primary block">
                    {scannedProduct.categoryLabel}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-secondary line-clamp-1">
                    {scannedProduct.name}
                  </h4>
                  <p className="text-sm font-extrabold text-secondary mt-1">
                    {formatPrice(scannedProduct.price)}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Tallas: {scannedProduct.sizes.join(', ')}
                  </p>
                </div>
              </div>

              {/* BOTONES DE ACCIÓN PARA LA PRENDA ENCONTRADA */}
              <div className="pt-2 border-t border-border/80 grid grid-cols-2 gap-2">
                
                {/* Botón Eliminar Prenda (Requerido por el usuario) */}
                <button
                  type="button"
                  onClick={handleDeleteScanned}
                  className="w-full py-2.5 px-3 rounded-xl bg-sale/10 hover:bg-sale text-sale hover:text-white border border-sale/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Eliminar esta prenda permanentemente"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar Prenda</span>
                </button>

                {/* Botón Agregar a la Bolsa */}
                <button
                  type="button"
                  onClick={() => {
                    addToCart(scannedProduct);
                    onClose();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-secondary hover:bg-secondary-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Vender / Añadir</span>
                </button>

              </div>
            </div>
          )}

          {/* RESULTADO: CÓDIGO NO REGISTRADO */}
          {scanStatus === 'not-found' && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Código &ldquo;{inputCode}&rdquo; no existe en el catálogo</span>
              </div>
              <p className="text-xs text-amber-700 leading-relaxed">
                ¿Deseas registrar y agregar una prenda nueva con este código de barras ahora mismo?
              </p>
              <button
                type="button"
                onClick={handleCreateWithCode}
                className="w-full py-2.5 px-4 bg-secondary hover:bg-secondary-hover text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-accent" />
                <span>Registrar Prenda con este Código</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function BarcodeScannerModal() {
  const { isScannerOpen, setIsScannerOpen } = useShop();

  if (!isScannerOpen) return null;

  return <BarcodeScannerInner onClose={() => setIsScannerOpen(false)} />;
}
