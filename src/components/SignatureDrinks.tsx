import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/menuData';
import { DrinkTiltCard } from './DrinkTiltCard';
import type { Product } from '../types';

interface SignatureDrinksProps {
  onQuickView: (product: Product) => void;
}

export const SignatureDrinks: React.FC<SignatureDrinksProps> = ({ onQuickView }) => {
  // Filter the 6 required signature drinks in order
  const signatureOrder = [
    'velvet-latte',
    'cloud-nine-cold-brew',
    'rose-vanilla-matcha',
    'midnight-mocha',
    'honey-cinnamon-latte',
    'pistachio-cream-latte'
  ];

  const signatureDrinks = signatureOrder
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);

  return (
    <section id="signature" className="py-24 md:py-32 bg-oat text-espresso relative overflow-hidden">
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-12 right-0 -mr-20 w-80 h-80 rounded-full bg-caramel/10 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-12 left-0 -ml-20 w-96 h-96 rounded-full bg-sage/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-caramel-rich">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CURATED SIGNATURES</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-espresso leading-tight">
              Find your new favourite.
            </h2>
            
            <p className="text-lg md:text-xl text-espresso/70 font-light">
              A little craft. A lot of character.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-espresso/50">
              6 BESPOKE BLENDS
            </span>
            <div className="w-12 h-[1px] bg-espresso/20" />
            <a
              href="#menu"
              className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-cocoa hover:text-caramel-rich transition-colors"
            >
              <span>Full Archive</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 6 Drinks Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureDrinks.map((drink, index) => (
            <DrinkTiltCard
              key={drink.id}
              product={drink}
              index={index}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Sensory Manifesto Banner */}
        <div className="mt-16 p-8 md:p-10 rounded-2xl bg-espresso text-oat flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="text-[11px] uppercase tracking-[0.25em] text-caramel font-semibold">
              OUR SENSORY CODE
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-normal">
              Not sure which one aligns with your headspace?
            </h3>
            <p className="text-sm text-oat/70 max-w-xl font-light">
              Step into our interactive mood discovery and let your afternoon rhythm choose your pour.
            </p>
          </div>

          <a
            href="#pour"
            className="z-10 px-6 py-3.5 rounded-full bg-caramel text-espresso font-medium text-xs uppercase tracking-wider hover:bg-caramel-glow transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Launch Drink Ritual
          </a>

          {/* Background subtle watermark */}
          <span className="absolute -right-6 -bottom-10 font-serif text-8xl text-oat/5 select-none pointer-events-none font-bold">
            MUSE
          </span>
        </div>

      </div>
    </section>
  );
};
