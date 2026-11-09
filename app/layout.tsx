import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import MobileSidebarDrawer from '@/components/MobileSidebarDrawer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import SearchModal from '@/components/SearchModal';
import WhatsAppConcierge from '@/components/WhatsAppConcierge';

import BarcodeScannerModal from '@/components/BarcodeScannerModal';
import InventoryManagerModal from '@/components/InventoryManagerModal';
import CustomerWelcomeModal from '@/components/CustomerWelcomeModal';
import AdminLoginModal from '@/components/AdminLoginModal';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

export const viewport: Viewport = {
  themeColor: '#c27b88',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'https://variedadescastro.com'),
  title: {
    default: 'Variedades Castro | Boutique de Moda Femenina de Alta Gama',
    template: '%s | Variedades Castro',
  },
  description: 'Variedades Castro - Vestidos de gala, sastrería femenina de alta costura, blusas de seda y accesorios. Horario: 8:30 AM a 5:30 PM. Envíos locales gratis.',
  keywords: [
    'Variedades Castro',
    'moda femenina',
    'vestidos de gala',
    'blazers sastre',
    'tienda de ropa en cordobas y dolares',
    'boutique de lujo',
    'vestidos de noche',
    'blusas de seda',
    'bolsos de piel'
  ],
  authors: [{ name: 'Variedades Castro Atelier' }],
  creator: 'Variedades Castro',
  publisher: 'Variedades Castro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/assets/aistudio/logo-sm.webp', type: 'image/webp' },
    ],
    apple: [
      { url: '/assets/aistudio/logo-sm.webp', type: 'image/webp' },
    ],
  },
  openGraph: {
    title: 'Variedades Castro | Boutique de Moda Femenina de Alta Gama',
    description: 'Vestidos de gala, sastrería femenina y accesorios. Horario de 8:30 AM a 5:30 PM. Envíos locales gratis.',
    url: process.env.APP_URL || 'https://variedadescastro.com',
    siteName: 'Variedades Castro',
    images: [
      {
        url: '/assets/aistudio/logo.webp',
        width: 1200,
        height: 1200,
        alt: 'Variedades Castro - Logotipo Oficial',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Variedades Castro | Moda de Alta Gama',
    description: 'Vestidos de gala, blazers sastre y accesorios. Horario 8:30 AM a 5:30 PM. Envíos locales gratis.',
    images: ['/assets/aistudio/logo.webp'],
    creator: '@variedadescastro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.APP_URL || 'https://variedadescastro.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: 'Variedades Castro',
    description: 'Boutique de moda femenina de alta gama. Horario: 8:30 AM a 5:30 PM. Envíos locales gratis.',
    image: 'https://variedadescastro.com/assets/aistudio/logo.webp',
    logo: 'https://variedadescastro.com/assets/aistudio/logo.webp',
    priceRange: '$$$',
    currenciesAccepted: 'NIO, USD',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '17:30',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NI',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catálogo Atelier 2026',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Vestidos de Gala',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Blazers & Sastrería',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Bolsos & Accesorios',
        },
      ],
    },
  };

  return (
    <html lang="es" className={`${plusJakartaSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-screen bg-background text-foreground antialiased selection:bg-primary-light selection:text-secondary" suppressHydrationWarning>
        <ShopProvider>
          {children}
          {/* Componentes interactivos flotantes globales */}
          <MobileSidebarDrawer />
          <CartDrawer />
          <QuickViewModal />
          <SearchModal />
          <BarcodeScannerModal />
          <InventoryManagerModal />
          <CustomerWelcomeModal />
          <AdminLoginModal />
          <WhatsAppConcierge />
        </ShopProvider>
      </body>
    </html>
  );
}
