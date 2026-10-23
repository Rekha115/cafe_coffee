import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { PRODUCTS } from '../data/menuData';
import type { DrinkCategory, Product } from '../types';
import { DrinkTiltCard } from './DrinkTiltCard';

interface MenuSectionProps {
  onQuickView: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<DrinkCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tempFilter, setTempFilter] = useState<'all' | 'hot' | 'iced'>('all');

  const categories: { id: DrinkCategory; label: string }[] = [
    { id: 'all', label: 'All Pours' },
    { id: 'signature', label: 'Signature Drinks' },
    { id: 'espresso', label: 'Espresso' },
    { id: 'lattes', label: 'Lattes' },
    { id: 'cold-brew', label: 'Cold Brew' },
    { id: 'matcha', label: 'Matcha' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Temperature filter
      if (tempFilter === 'hot' && !product.availableHot) return false;
      if (tempFilter === 'iced' && !product.availableIced) return false;

      // Search query filter (search in name, description, ingredients, flavor notes)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFlavor = product.flavorNotes.some(f => f.toLowerCase().includes(query));
        const matchesIngredients = product.ingredients.some(i => i.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesFlavor || matchesIngredients;
      }

      return true;
    });
  }, [selectedCategory, tempFilter, searchQuery]);

  return (
    <section id="menu" className="py-24 md:py-32 bg-oat text-espresso relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-caramel-rich">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE COMPLETE BEVERAGE ARCHIVE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-espresso">
            The Coffee Menu.
          </h2>

          <p className="text-base sm:text-lg text-espresso/70 font-light">
            Every drink is pulled to order from freshly calibrated micro-roasts. Explore by flavor lineage, temperature, or sensory curiosity.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-6 mb-12">
          
          {/* Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-espresso text-oat shadow-sm scale-105'
                    : 'bg-oat-warm/40 text-espresso/70 hover:bg-oat-warm hover:text-espresso'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Temperature Pill Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavors, ingredients, brew..."
                className="w-full pl-11 pr-9 py-2.5 rounded-full bg-oat-light border border-oat-border text-xs text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-caramel focus:ring-1 focus:ring-caramel transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-espresso/40 hover:text-espresso"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Temperature Subfilter */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-oat-warm/50 border border-oat-border text-xs">
              <span className="text-[11px] uppercase tracking-wider text-espresso/50 px-3 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Style:</span>
              </span>
              <button
                onClick={() => setTempFilter('all')}
                className={`px-3 py-1 rounded-full uppercase tracking-wider text-[11px] font-medium transition-colors ${
                  tempFilter === 'all' ? 'bg-espresso text-oat' : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTempFilter('hot')}
                className={`px-3 py-1 rounded-full uppercase tracking-wider text-[11px] font-medium transition-colors ${
                  tempFilter === 'hot' ? 'bg-cocoa text-oat' : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                Hot
              </button>
              <button
                onClick={() => setTempFilter('iced')}
                className={`px-3 py-1 rounded-full uppercase tracking-wider text-[11px] font-medium transition-colors ${
                  tempFilter === 'iced' ? 'bg-sage-dark text-oat' : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                Iced
              </button>
            </div>
          </div>

        </div>

        {/* Results Count & Clear */}
        <div className="flex items-center justify-between mb-8 text-xs text-espresso/60 border-b border-oat-border/70 pb-3">
          <span>
            Showing <strong className="text-espresso font-semibold">{filteredProducts.length}</strong> creations
          </span>
          {(selectedCategory !== 'all' || tempFilter !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setTempFilter('all');
                setSearchQuery('');
              }}
              className="text-caramel-rich hover:underline font-medium uppercase tracking-wider text-[11px]"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Drinks Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((drink, index) => (
              <DrinkTiltCard
                key={drink.id}
                product={drink}
                index={index}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-oat-warm/30 rounded-3xl border border-oat-border">
            <h3 className="font-serif text-2xl text-espresso">No matches in our coffee archive.</h3>
            <p className="text-sm text-espresso/60 max-w-md mx-auto">
              We couldn't find any drinks matching "{searchQuery}". Try searching for 'oat', 'matcha', 'cocoa', or reset filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setTempFilter('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-espresso text-oat text-xs uppercase tracking-wider font-medium"
            >
              View Full Menu
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
