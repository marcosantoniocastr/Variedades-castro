import React from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import CategoryPills from '@/components/CategoryPills';
import ProductGrid from '@/components/ProductGrid';
import LookbookSection from '@/components/LookbookSection';
import BrandFeatures from '@/components/BrandFeatures';
import TestimonialsSection from '@/components/TestimonialsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Barra de navegación superior con drawer lateral y carrito */}
      <Navbar />

      <main className="flex-1" id="main-content">
        {/* Sección Hero con estética atelier de alta gama */}
        <HeroBanner />

        {/* Filtro interactivo de colecciones y categorías */}
        <CategoryPills />

        {/* Catálogo interactivo de prendas con vista rápida y filtros */}
        <ProductGrid />

        {/* Lookbook editorial "El Arte de Vestir Bien" con puntos de compra */}
        <LookbookSection />

        {/* Pilares de marca, empaque de lujo y garantías */}
        <BrandFeatures />

        {/* Testimonios y opiniones de clientas verificadas */}
        <TestimonialsSection />

        {/* Suscripción al club VIP y novedades de temporada */}
        <NewsletterSection />
      </main>

      {/* Pie de página con enlaces completos y métodos de pago */}
      <Footer />
    </div>
  );
}
