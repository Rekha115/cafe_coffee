import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureDrinks } from './components/SignatureDrinks';
import { FindYourPour } from './components/FindYourPour';
import { ArtOfCoffee } from './components/ArtOfCoffee';
import { CoffeeMoment } from './components/CoffeeMoment';
import { SeasonalSpecials } from './components/SeasonalSpecials';
import { MenuSection } from './components/MenuSection';
import { OurStory } from './components/OurStory';
import { VisitUs } from './components/VisitUs';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { BeanCursorTrail } from './components/BeanCursorTrail';
import { Toast } from './components/Toast';
import type { Product } from './types';

export const AppContent: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="relative min-h-screen bg-oat text-espresso selection:bg-caramel/30 selection:text-espresso font-sans">
      {/* Desktop Coffee Bean Cursor Trail */}
      <BeanCursorTrail />

      {/* Floating Notifications */}
      <Toast />

      {/* Sticky Glassmorphic Navigation */}
      <Navbar />

      {/* Main Experience Flow */}
      <main>
        {/* 1. Cinematic Hero with 3D Beans & Crema Wave */}
        <Hero />

        {/* 2. Signature Drinks with 3D Tilt Cards */}
        <SignatureDrinks onQuickView={(p) => setQuickViewProduct(p)} />

        {/* 3. Interactive Drink Discovery: Find Your Pour */}
        <FindYourPour onQuickView={(p) => setQuickViewProduct(p)} />

        {/* 4. Craft Storytelling: The Art of Coffee */}
        <ArtOfCoffee />

        {/* 5. Atmospheric Pause: A Coffee Moment */}
        <CoffeeMoment />

        {/* 6. Seasonal Special: Golden Hour Latte */}
        <SeasonalSpecials onQuickView={(p) => setQuickViewProduct(p)} />

        {/* 7. Comprehensive Menu Archive */}
        <MenuSection onQuickView={(p) => setQuickViewProduct(p)} />

        {/* 8. Brand Philosophy: Our Story */}
        <OurStory />

        {/* 9. Physical Sanctuary: Visit MUSE */}
        <VisitUs />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Global Slide-out Cart Drawer & Demo Checkout */}
      <CartDrawer />

      {/* Quick View Modal for In-depth Drink Exploration */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
