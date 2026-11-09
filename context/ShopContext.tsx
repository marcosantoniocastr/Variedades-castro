'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ProductColor, ShippingType } from '@/types/product';
import { PRODUCTS as INITIAL_PRODUCTS } from '@/data/products';

export interface CustomerData {
  name: string;
  phone: string;
}

interface ShopContextType {
  // Productos dinámicos (Gestión de Inventario)
  products: Product[];
  addProduct: (newProduct: Product) => void;
  deleteProduct: (productId: string) => void;
  findProductByBarcode: (barcode: string) => Product | undefined;
  resetInventory: () => void;

  // Carrito de compras
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Envíos: Locales Gratis vs Nacionales con Extra
  shippingType: ShippingType;
  setShippingType: (type: ShippingType) => void;
  shippingCost: number; // en USD
  cartTotal: number;

  // Lista de deseos
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Seguridad y Modo Administrador (Sólo el dueño puede ver el lector y gestión)
  isAdmin: boolean;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (open: boolean) => void;

  // Registro mínimo de Cliente (Sólo Nombre y Celular para entrar)
  customer: CustomerData | null;
  saveCustomer: (name: string, phone: string) => void;
  isCustomerGateOpen: boolean;
  setIsCustomerGateOpen: (open: boolean) => void;

  // Modales y Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  isInventoryOpen: boolean;
  setIsInventoryOpen: (open: boolean) => void;

  isScannerOpen: boolean;
  setIsScannerOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Filtros
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Monedas: Córdobas (NIO) y Dólares (USD)
  currency: 'NIO' | 'USD';
  setCurrency: (c: 'NIO' | 'USD') => void;
  formatPrice: (amountInUSD: number) => string;
  exchangeRate: number; // 36.8 NIO por 1 USD
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const EXCHANGE_RATE = 36.8;
const NATIONAL_SHIPPING_USD = 5.0;

export function ShopProvider({ children }: { children: React.ReactNode }) {
  // Productos administrables
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('vc_inventory_v3');
        if (saved) return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('vc_inventory_v3', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Carrito de compras
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('vc_cart_v3');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('vc_wishlist_v3');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  // Estado Administrador (Protege el lector y gestión con usuario y contraseña)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('vc_admin_auth') === 'true';
      } catch {
        // ignore
      }
    }
    return false;
  });

  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  // Datos del Cliente (Sólo pide Nombre y Celular)
  const [customer, setCustomer] = useState<CustomerData | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('vc_customer_info');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return null;
  });

  // Puerta de entrada para clientes: se abre si no hay cliente registrado y no es admin
  const [isCustomerGateOpen, setIsCustomerGateOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('vc_customer_info');
        const adminAuth = localStorage.getItem('vc_admin_auth') === 'true';
        if (saved || adminAuth) return false;
      } catch {
        // ignore
      }
    }
    return true;
  });

  const [shippingType, setShippingType] = useState<ShippingType>('local');
  const [currency, setCurrency] = useState<'NIO' | 'USD'>('NIO');

  // Modales
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Persistir carrito y deseos
  useEffect(() => {
    try {
      localStorage.setItem('vc_cart_v3', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('vc_wishlist_v3', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // AUTENTICACIÓN ADMINISTRADOR (Para proteger el lector y gestión de inventario)
  const adminLogin = (user: string, pass: string) => {
    const cleanUser = user.trim().toLowerCase();
    const cleanPass = pass.trim();
    // Credenciales válidas: admin / castro2026 (o variedadescastro / castro2026)
    if (
      (cleanUser === 'admin' || cleanUser === 'variedadescastro' || cleanUser === 'castro') &&
      (cleanPass === 'castro2026' || cleanPass === 'admin123')
    ) {
      setIsAdmin(true);
      try {
        localStorage.setItem('vc_admin_auth', 'true');
      } catch {
        // ignore
      }
      setIsAdminLoginOpen(false);
      setIsCustomerGateOpen(false);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    try {
      localStorage.removeItem('vc_admin_auth');
    } catch {
      // ignore
    }
    setIsScannerOpen(false);
    setIsInventoryOpen(false);
  };

  // REGISTRO DE CLIENTE (Sólo Nombre y Celular)
  const saveCustomer = (name: string, phone: string) => {
    const data: CustomerData = {
      name: name.trim(),
      phone: phone.trim()
    };
    setCustomer(data);
    try {
      localStorage.setItem('vc_customer_info', JSON.stringify(data));
    } catch {
      // ignore
    }
    setIsCustomerGateOpen(false);
  };

  // GESTIÓN DE PRODUCTOS: Agregar y Eliminar
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const findProductByBarcode = (barcode: string) => {
    const cleanCode = barcode.trim().toLowerCase();
    return products.find(
      (p) => p.barcode?.toLowerCase() === cleanCode || p.id.toLowerCase() === cleanCode
    );
  };

  const resetInventory = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  // CARRITO
  const addToCart = (product: Product, size?: string, color?: ProductColor, quantity = 1) => {
    const chosenSize = size || product.sizes[0] || 'ÚNICO';
    const chosenColor = color || product.colors[0] || { name: 'Estándar', hex: '#000000' };

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor.name === chosenColor.name
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string, colorName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      )
    );
  };

  const updateQuantity = (productId: string, size: string, colorName: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const shippingCost = shippingType === 'local' || cartSubtotal === 0 ? 0 : NATIONAL_SHIPPING_USD;
  const cartTotal = cartSubtotal + shippingCost;

  const formatPrice = (amountInUSD: number) => {
    if (currency === 'NIO') {
      const inCordobas = Math.round(amountInUSD * EXCHANGE_RATE);
      return `C$ ${inCordobas.toLocaleString('es-NI')}`;
    }
    return `$${amountInUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })} USD`;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        findProductByBarcode,
        resetInventory,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingType,
        setShippingType,
        shippingCost,
        cartTotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isAdmin,
        adminLogin,
        adminLogout,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        customer,
        saveCustomer,
        isCustomerGateOpen,
        setIsCustomerGateOpen,
        isCartOpen,
        setIsCartOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        isInventoryOpen,
        setIsInventoryOpen,
        isScannerOpen,
        setIsScannerOpen,
        quickViewProduct,
        setQuickViewProduct,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        currency,
        setCurrency,
        formatPrice,
        exchangeRate: EXCHANGE_RATE
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
