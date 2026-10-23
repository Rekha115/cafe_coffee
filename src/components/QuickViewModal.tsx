import React, { useState } from 'react';
import { X, Plus, Flame, Snowflake, Sparkles } from 'lucide-react';
import type { Product, DrinkSize, Temperature } from '../types';
import { SIZES } from '../data/menuData';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<DrinkSize>('Regular');
  const [selectedTemp, setSelectedTemp] = useState<Temperature>(product?.defaultTemp || 'hot');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentSizeObj = SIZES.find(s => s.name === selectedSize);
  const calculatedPrice = product.price + (currentSizeObj ? currentSizeObj.priceDiff : 0);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedTemp, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-espresso/85 backdrop-blur-md transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative bg-oat-light border border-oat-border rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-espresso/60 text-oat hover:bg-espresso transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left: Product Image */}
          <div className="md:col-span-5 relative h-64 md:h-full min-h-[300px] bg-espresso-surface overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 text-oat space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-caramel font-semibold block">
                {product.category.toUpperCase()} SPECIFICATION
              </span>
              <p className="text-xs text-oat/70 font-light">
                {product.brewMethod} · {product.calories}
              </p>
            </div>
          </div>

          {/* Right: Customization & Sensory Specs */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            
            {/* Title & Price */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
                  {product.name}
                </h3>
                <span className="font-serif text-2xl font-semibold text-cocoa">
                  ₹{calculatedPrice * quantity}
                </span>
              </div>
              <p className="text-xs text-espresso/70 font-light mt-1 leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Flavor Notes */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-espresso/50 font-semibold block">
                Sensory Profile
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.flavorNotes.map((note, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-caramel/15 text-xs text-espresso font-medium"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-caramel-rich" />
                    <span>{note}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] uppercase tracking-wider text-espresso/50 font-semibold">
                  Select Size
                </span>
                <span className="text-espresso/60 text-[11px]">
                  {currentSizeObj?.volume}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map((sz) => (
                  <button
                    key={sz.name}
                    onClick={() => setSelectedSize(sz.name as DrinkSize)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                      selectedSize === sz.name
                        ? 'bg-espresso text-oat border-espresso shadow-sm'
                        : 'bg-oat border-oat-border text-espresso/70 hover:border-caramel'
                    }`}
                  >
                    <div>{sz.name}</div>
                    <div className="text-[10px] opacity-70">
                      {sz.priceDiff === 0 ? 'Standard' : sz.priceDiff > 0 ? `+₹${sz.priceDiff}` : `-₹${Math.abs(sz.priceDiff)}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature Choice */}
            {(product.availableHot || product.availableIced) && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-espresso/50 font-semibold block">
                  Temperature
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.availableHot && (
                    <button
                      onClick={() => setSelectedTemp('hot')}
                      className={`py-2 px-4 rounded-xl border flex items-center justify-center gap-2 font-medium transition-colors ${
                        selectedTemp === 'hot'
                          ? 'bg-cocoa text-oat border-cocoa'
                          : 'bg-oat border-oat-border text-espresso/70'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>Hot & Steamed</span>
                    </button>
                  )}
                  {product.availableIced && (
                    <button
                      onClick={() => setSelectedTemp('iced')}
                      className={`py-2 px-4 rounded-xl border flex items-center justify-center gap-2 font-medium transition-colors ${
                        selectedTemp === 'iced'
                          ? 'bg-sage-dark text-oat border-sage-dark'
                          : 'bg-oat border-oat-border text-espresso/70'
                      }`}
                    >
                      <Snowflake className="w-3.5 h-3.5" />
                      <span>Chilled & Over Ice</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Quantity and Add CTA */}
            <div className="pt-2 flex items-center gap-4">
              <div className="flex items-center bg-oat rounded-xl border border-oat-border p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-espresso/60 hover:text-espresso"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-espresso/60 hover:text-espresso"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 rounded-full bg-espresso text-oat hover:bg-cocoa font-medium text-xs uppercase tracking-wider transition-all duration-300 shadow-coffee flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4 text-caramel" />
                <span>Add to Bag (₹{calculatedPrice * quantity})</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
