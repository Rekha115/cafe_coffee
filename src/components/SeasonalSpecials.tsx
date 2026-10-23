import React from 'react';
import { Sparkles, Plus, Eye, Sun, Flame } from 'lucide-react';
import { PRODUCTS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface SeasonalSpecialsProps {
  onQuickView: (product: Product) => void;
}

export const SeasonalSpecials: React.FC<SeasonalSpecialsProps> = ({ onQuickView }) => {
  const { addToCart } = useCart();
  const goldenHourDrink = PRODUCTS.find(p => p.id === 'golden-hour-latte') || PRODUCTS[0];

  return (
    <section className="py-24 md:py-32 bg-oat-light text-espresso relative overflow-hidden border-y border-oat-border">
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-caramel/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Asymmetrical Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Oversized Product Image with Warm Caramel Halo */}
          <div className="lg:col-span-7 relative order-2 lg:order-1">
            <div className="relative group">
              {/* Warm Golden Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-caramel/30 via-caramel-glow/20 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-caramel/40 shadow-coffee-lg bg-espresso-surface aspect-[4/3]">
                <img
                  src="/images/golden-hour.jpg"
                  alt="MUSE Seasonal Golden Hour Latte with caramel drizzle and cardamom dust"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Seasonal Badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-caramel text-espresso text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>AUTUMN / WINTER HARVEST</span>
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-6 right-6 px-5 py-2.5 rounded-2xl bg-espresso/90 backdrop-blur-md border border-caramel/40 text-oat flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-wider text-caramel">Single Pour</span>
                  <span className="font-serif text-2xl font-semibold text-oat">₹{goldenHourDrink.price}</span>
                </div>
              </div>

              {/* Overlapping Editorial Badge */}
              <div className="absolute -bottom-6 -left-6 hidden sm:block p-4 rounded-2xl bg-espresso text-oat border border-caramel/30 shadow-2xl max-w-xs">
                <span className="text-[10px] uppercase tracking-widest text-caramel font-semibold block mb-1">
                  BLONDE EXTRACTION
                </span>
                <p className="text-xs text-oat/80 font-light leading-relaxed">
                  Extracted from light-roasted Ethiopian beans, yielding zero bitterness and vibrant sweet acidity.
                </p>
              </div>

            </div>
          </div>

          {/* Right: Narrative & Action Showcase */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-caramel-rich">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LIMITED SEASONAL POUR</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-serif text-espresso leading-tight">
                Golden Hour <br />
                <span className="italic font-light text-cocoa">Latte.</span>
              </h2>

              <p className="text-base text-espresso/75 font-light leading-relaxed">
                Cardamom-kissed blonde espresso with salted date caramel drizzle and spun amber crystals. Bathed in the warm light of late autumn afternoons.
              </p>
            </div>

            {/* Flavor Decomposition */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-espresso/60 font-medium block">
                The Anatomy of Golden Hour
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-oat-warm/40 border border-oat-border">
                  <span className="font-medium text-espresso">Base: Scandinavian Blonde Espresso</span>
                  <span className="text-caramel-rich font-mono">18g Ristretto</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-oat-warm/40 border border-oat-border">
                  <span className="font-medium text-espresso">Cream: Micro-foamed Oat & Green Cardamom</span>
                  <span className="text-caramel-rich font-mono">63°C Steam</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-oat-warm/40 border border-oat-border">
                  <span className="font-medium text-espresso">Crown: Slow-cooked Medjool Date Caramel</span>
                  <span className="text-caramel-rich font-mono">Artisan Drizzle</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => addToCart(goldenHourDrink, 'Regular', 'hot')}
                className="px-8 py-3.5 rounded-full bg-espresso text-oat hover:bg-cocoa font-medium text-xs uppercase tracking-wider transition-all duration-300 shadow-coffee hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-caramel" />
                <span>Add Golden Hour (₹{goldenHourDrink.price})</span>
              </button>

              <button
                onClick={() => onQuickView(goldenHourDrink)}
                className="px-6 py-3.5 rounded-full border border-oat-border hover:border-caramel text-espresso hover:text-caramel-rich text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Notes</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-espresso/60 pt-2">
              <Flame className="w-3.5 h-3.5 text-cocoa" />
              <span>Available hot or iced throughout this season only.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
