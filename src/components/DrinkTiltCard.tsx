import React, { useState, useRef } from 'react';
import { Plus, Eye, Flame, Snowflake, Sparkles } from 'lucide-react';
import type { Product, Temperature } from '../types';
import { useCart } from '../context/CartContext';

interface DrinkTiltCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  index: number;
}

export const DrinkTiltCard: React.FC<DrinkTiltCardProps> = ({ product, onQuickView, index }) => {
  const { addToCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [selectedTemp, setSelectedTemp] = useState<Temperature>(product.defaultTemp);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [radialLight, setRadialLight] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation (-8 to +8 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`);
    setRadialLight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setRadialLight(prev => ({ ...prev, opacity: 0 }));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'Regular', selectedTemp);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onQuickView(product)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onQuickView(product);
        }
      }}
      role="button"
      aria-label={`View details for ${product.name}`}
      style={{
        transform: transformStyle,
        transition: 'transform 0.25s ease-out, box-shadow 0.25s ease-out',
      }}
      className="group relative rounded-2xl bg-oat-light border border-oat-border/80 shadow-coffee hover:shadow-coffee-lg p-5 flex flex-col justify-between overflow-hidden cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-caramel"
    >
      {/* Dynamic Cursor Radial Light Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${radialLight.x}% ${radialLight.y}%, rgba(198, 164, 125, ${radialLight.opacity}) 0%, transparent 65%)`,
        }}
      />

      {/* Top Bar: Sequence Number & Temperature Availability */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-serif text-caramel-rich font-semibold tracking-wider">
          0{index + 1}
        </span>

        {/* Temperature Badge / Selector */}
        <div
          className="flex items-center gap-1.5 bg-oat/90 p-1 rounded-full border border-oat-border"
          onClick={(e) => e.stopPropagation()}
        >
          {product.availableHot && (
            <button
              onClick={() => setSelectedTemp('hot')}
              aria-label="Select hot option"
              className={`p-1 rounded-full transition-colors ${
                selectedTemp === 'hot'
                  ? 'bg-cocoa text-oat shadow-sm'
                  : 'text-espresso/60 hover:text-cocoa'
              }`}
              title="Hot"
            >
              <Flame className="w-3.5 h-3.5" />
            </button>
          )}

          {product.availableIced && (
            <button
              onClick={() => setSelectedTemp('iced')}
              aria-label="Select iced option"
              className={`p-1 rounded-full transition-colors ${
                selectedTemp === 'iced'
                  ? 'bg-sage-dark text-oat shadow-sm'
                  : 'text-espresso/60 hover:text-sage-dark'
              }`}
              title="Iced"
            >
              <Snowflake className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Image Showcase with Layered Zoom */}
      <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden mb-4 bg-oat-warm/40 border border-oat-border/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Subtle caramel accent border on hover */}
        <div className="absolute inset-0 border-2 border-caramel/0 group-hover:border-caramel/40 transition-colors duration-300 rounded-xl pointer-events-none" />

        {/* Quick View Hover Pill */}
        <div className="absolute inset-0 bg-espresso/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-oat text-espresso text-xs font-semibold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye className="w-3.5 h-3.5 text-caramel-rich" />
            <span>Discover Ritual</span>
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl font-medium text-espresso group-hover:text-cocoa transition-colors">
              {product.name}
            </h3>
            <span className="font-serif text-lg font-semibold text-espresso">
              ₹{product.price}
            </span>
          </div>

          <p className="text-xs text-espresso/75 font-light leading-relaxed line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Flavor Notes Tags */}
        <div className="pt-2 flex flex-wrap gap-1.5">
          {product.flavorNotes.slice(0, 2).map((note, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-caramel/15 text-[11px] font-medium text-espresso/80"
            >
              <Sparkles className="w-2.5 h-2.5 text-caramel-rich" />
              <span>{note}</span>
            </span>
          ))}
        </div>

        {/* Card Action Buttons */}
        <div className="pt-4 border-t border-oat-border/70 flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 px-4 rounded-xl bg-espresso text-oat hover:bg-cocoa font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-sm active:scale-98"
          >
            <Plus className="w-3.5 h-3.5 text-caramel" />
            <span>Add to Order</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 rounded-xl border border-oat-border hover:border-caramel text-espresso/70 hover:text-caramel transition-colors"
            title="Discover more details"
            aria-label="Discover more details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
