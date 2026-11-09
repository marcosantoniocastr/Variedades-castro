'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  PackagePlus, 
  Trash2, 
  X, 
  ScanBarcode, 
  Check, 
  Plus, 
  Layers, 
  Search,
  RotateCcw,
  Upload
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { Product } from '@/types/product';

const PRESET_FASHION_IMAGES = [
  { label: 'Vestido Gala Blush', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&auto=format&fit=crop&q=80' },
  { label: 'Blazer Crepé Blanco', url: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=900&auto=format&fit=crop&q=80' },
  { label: 'Vestido Plisado Rosa', url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=900&auto=format&fit=crop&q=80' },
  { label: 'Blusa Seda Crema', url: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=900&auto=format&fit=crop&q=80' },
  { label: 'Pantalón Lino Natural', url: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=900&auto=format&fit=crop&q=80' },
  { label: 'Bolso Cuero Atelier', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80' }
];

export default function InventoryManagerModal() {
  const { 
    isInventoryOpen, 
    setIsInventoryOpen, 
    products, 
    addProduct, 
    deleteProduct, 
    setIsScannerOpen,
    formatPrice,
    exchangeRate,
    resetInventory
  } = useShop();

  const [activeTab, setActiveTab] = useState<'add' | 'list'>('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Estados del Formulario para Agregar Producto
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState<'vestidos' | 'blusas' | 'blazers' | 'pantalones' | 'accesorios' | 'calzado'>('vestidos');
  const [subtitle, setSubtitle] = useState('');
  const [priceUSD, setPriceUSD] = useState<number>(120);
  const [sizes, setSizes] = useState<string[]>(['S', 'M', 'L']);
  const [colorName, setColorName] = useState('Rosa Atelier');
  const [colorHex, setColorHex] = useState('#c27b88');
  const [imageUrl, setImageUrl] = useState(PRESET_FASHION_IMAGES[0].url);
  const [description, setDescription] = useState('Confeccionada con delicadeza en fibras nobles con caída perfecta.');

  if (!isInventoryOpen) return null;

  const handleToggleSize = (sizeStr: string) => {
    setSizes((prev) => 
      prev.includes(sizeStr) ? prev.filter((s) => s !== sizeStr) : [...prev, sizeStr]
    );
  };

  const handleGenerateBarcode = () => {
    const randomCode = '744' + Math.floor(100000000 + Math.random() * 900000000);
    setBarcode(randomCode);
  };

  const handleOpenScanner = () => {
    setIsInventoryOpen(false);
    setIsScannerOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('La imagen seleccionada supera los 10MB. Selecciona una más ligera.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalBarcode = barcode.trim() || ('744' + Math.floor(100000000 + Math.random() * 900000000));

    const categoryLabels: Record<string, string> = {
      vestidos: 'Vestidos & Gala',
      blusas: 'Blusas & Tops',
      blazers: 'Blazers & Sastrería',
      pantalones: 'Pantalones & Faldas',
      accesorios: 'Bolsos & Accesorios',
      calzado: 'Calzado & Zapatos'
    };

    const newProd: Product = {
      id: 'vc-' + Date.now().toString().slice(-6),
      barcode: finalBarcode,
      name: name.trim(),
      subtitle: subtitle.trim() || 'Prenda de confección exclusiva',
      category,
      categoryLabel: categoryLabels[category] || 'Colección Atelier',
      price: Number(priceUSD) || 100,
      rating: 5.0,
      reviewCount: 1,
      images: [imageUrl],
      sizes: sizes.length > 0 ? sizes : ['ÚNICO'],
      colors: [{ name: colorName || 'Estándar', hex: colorHex || '#c27b88' }],
      tag: 'NUEVO',
      inStock: true,
      description: description.trim() || 'Diseño de alta costura de Variedades Castro.',
      details: ['Confección artesanal', 'Materiales seleccionados de alta gama', 'Acabados reforzados'],
      composition: 'Tejido Premium Seleccionado'
    };

    addProduct(newProd);
    setSuccessMessage(`¡"${newProd.name}" (Código: ${finalBarcode}) agregada exitosamente!`);
    
    // Limpiar formulario
    setName('');
    setBarcode('');
    setSubtitle('');
    setTimeout(() => setSuccessMessage(''), 3500);
    setActiveTab('list');
  };

  const handleDelete = (id: string, prodName: string) => {
    const ok = window.confirm(`¿Confirmas que deseas eliminar permanentemente la prenda "${prodName}"?`);
    if (ok) {
      deleteProduct(id);
    }
  };

  const filteredInventory = products.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.barcode?.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Gestor de Inventario y Códigos de Barras"
    >
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsInventoryOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-card rounded-3xl shadow-2xl overflow-hidden border border-border z-10 my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabecera del Gestor */}
        <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between bg-surface-subtle">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-secondary text-white">
              <PackagePlus className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-secondary">
                Gestión de Inventario & Prendas
              </h2>
              <p className="text-[10px] text-muted-foreground">
                Agregar o eliminar prendas con subida de fotos y lector de códigos
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsInventoryOpen(false)}
            className="p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors cursor-pointer"
            aria-label="Cerrar gestor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas de Navegación */}
        <div className="flex border-b border-border bg-card">
          <button
            type="button"
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'add'
                ? 'border-primary text-primary bg-primary-light/40'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Nueva Prenda</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'list'
                ? 'border-primary text-primary bg-primary-light/40'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Lista & Eliminar ({products.length})</span>
          </button>
        </div>

        {/* Notificación de Éxito */}
        {successMessage && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-success/15 border border-success/30 text-success text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="p-5 max-h-[75vh] overflow-y-auto">
          
          {/* PESTAÑA 1: AGREGAR PRODUCTO */}
          {activeTab === 'add' && (
            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              
              {/* Botón Acceso Rápido al Lector de Códigos */}
              <div className="p-3 bg-primary-light/60 border border-primary/20 rounded-2xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
                  <ScanBarcode className="w-4 h-4 text-primary" />
                  <span>¿Tienes la prenda físicamente con su código?</span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenScanner}
                  className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <ScanBarcode className="w-3.5 h-3.5" />
                  <span>Abrir Escáner</span>
                </button>
              </div>

              {/* Nombre y Subtítulo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Nombre de la Prenda *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Vestido Lencero Esmeralda"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Subtítulo / Silueta
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Corte al bies en satén puro"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                  />
                </div>
              </div>

              {/* Código de Barras / SKU */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-secondary">
                    Código de Barras / SKU *
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateBarcode}
                    className="text-[11px] text-primary hover:underline font-semibold cursor-pointer"
                  >
                    + Generar Código Automático
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Ej: 744100987654"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-surface-subtle border border-border rounded-xl text-xs font-mono text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={handleOpenScanner}
                    className="px-3 py-2 bg-secondary text-white rounded-xl text-xs font-semibold hover:bg-secondary-hover flex items-center gap-1 shrink-0 cursor-pointer"
                    title="Escanear con lector"
                  >
                    <ScanBarcode className="w-3.5 h-3.5" />
                    <span>Escanear</span>
                  </button>
                </div>
              </div>

              {/* Categoría y Precio (en USD y Córdobas) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-medium cursor-pointer"
                  >
                    <option value="vestidos">Vestidos & Gala</option>
                    <option value="blusas">Blusas & Tops</option>
                    <option value="blazers">Blazers & Sastrería</option>
                    <option value="pantalones">Pantalones & Faldas</option>
                    <option value="accesorios">Bolsos & Accesorios</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Precio en Dólares ($ USD)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      required
                      value={priceUSD}
                      onChange={(e) => setPriceUSD(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-surface-subtle border border-border rounded-xl text-xs font-bold text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="mt-1 text-[11px] font-semibold text-primary">
                      Equivale a: <strong>C$ {Math.round(priceUSD * exchangeRate).toLocaleString()} Córdobas</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selección de Tallas */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-1">
                  Tallas Disponibles:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'ÚNICO'].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => handleToggleSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        sizes.includes(sz)
                          ? 'bg-secondary text-white border-secondary'
                          : 'bg-surface-subtle text-muted-foreground border-border hover:border-foreground/30'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Principal */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Nombre del Color
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Rosa Palo / Blanco Seda"
                    value={colorName}
                    onChange={(e) => setColorName(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-subtle border border-border rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Tono Visual
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={colorHex}
                      onChange={(e) => setColorHex(e.target.value)}
                      className="w-10 h-8 rounded-lg cursor-pointer border border-border p-0.5 bg-transparent"
                    />
                    <span className="text-xs font-mono text-muted-foreground">{colorHex}</span>
                  </div>
                </div>
              </div>

              {/* SUBIDA DE FOTO DESDE ARCHIVOS O GALERÍA */}
              <div className="p-4 rounded-2xl bg-surface-subtle border border-border space-y-3">
                <label className="block text-xs font-bold text-secondary">
                  Foto de la Prenda (Sube directamente desde tus archivos o celular) *
                </label>

                <input
                  type="file"
                  id="product-file-upload-input"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div className="flex flex-col sm:flex-row gap-2">
                  <label
                    htmlFor="product-file-upload-input"
                    className="flex-1 py-3 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer active:scale-98"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Elegir Foto de mis Archivos / Galería</span>
                  </label>
                </div>

                {/* Vista previa de la foto seleccionada */}
                {imageUrl && (
                  <div className="flex items-center gap-3 p-2.5 bg-card border border-primary/30 rounded-xl">
                    <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-muted border border-border shrink-0">
                      <Image
                        src={imageUrl}
                        alt="Vista previa de foto"
                        fill
                        sizes="56px"
                        unoptimized={imageUrl.startsWith('data:')}
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs flex-1">
                      <span className="font-bold text-success block">✓ Foto lista para la prenda</span>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {imageUrl.startsWith('data:') ? 'Imagen local cargada con éxito' : 'Foto seleccionada'}
                      </p>
                      <label
                        htmlFor="product-file-upload-input"
                        className="text-primary hover:underline text-[11px] font-semibold cursor-pointer inline-block mt-0.5"
                      >
                        Cambiar por otra foto de mis archivos
                      </label>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-muted-foreground">
                  O elige una foto prediseñada del catálogo:
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_FASHION_IMAGES.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setImageUrl(preset.url)}
                      className={`relative aspect-3/4 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        imageUrl === preset.url
                          ? 'border-primary ring-2 ring-primary/40 scale-102'
                          : 'border-border opacity-70 hover:opacity-100'
                      }`}
                      title={preset.label}
                    >
                      <Image
                        src={preset.url}
                        alt={preset.label}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón Guardar */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-secondary hover:bg-secondary-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-accent" />
                <span>Guardar y Publicar Prenda en Catálogo</span>
              </button>

            </form>
          )}

          {/* PESTAÑA 2: LISTA DE PRODUCTOS Y ELIMINAR */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              
              {/* Buscador de inventario */}
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar prenda por nombre o código de barras..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-surface-subtle border border-border rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Lista */}
              <div className="divide-y divide-border/60">
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <div key={item.id} className="py-3 flex items-center justify-between gap-3 first:pt-0">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif text-xs font-bold text-secondary line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded text-secondary font-semibold">
                            Cód: {item.barcode}
                          </span>
                          <p className="text-xs font-bold text-primary mt-0.5">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>

                      {/* Botón Eliminar Prenda (Requerido) */}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-2 rounded-xl text-sale hover:bg-sale/10 border border-sale/20 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0 cursor-pointer"
                        title="Eliminar producto permanentemente"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    No se encontraron prendas con &ldquo;{searchTerm}&rdquo;.
                  </div>
                )}
              </div>

              {/* Botón de Restablecimiento */}
              <div className="pt-4 border-t border-border flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const ok = window.confirm('¿Restablecer el catálogo al estado inicial de Variedades Castro?');
                    if (ok) resetInventory();
                  }}
                  className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restablecer catálogo original</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
