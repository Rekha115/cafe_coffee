import React, { useState, useMemo } from 'react';
import { Zap, Clock, Sparkles, Heart, Flame, Snowflake, Plus, Eye, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MOOD_OPTIONS, PRODUCTS } from '../data/menuData';
import type { MoodId, Temperature, Product } from '../types';
import { useCart } from '../context/CartContext';

interface FindYourPourProps {
  onQuickView: (product: Product) => void;
}

export const FindYourPour: React.FC<FindYourPourProps> = ({ onQuickView }) => {
  const { addToCart } = useCart();
  const [selectedMoodId, setSelectedMoodId] = useState<MoodId>('creative');
  const [temperature, setTemperature] = useState<Temperature>('iced');
  const [isAnimating, setIsAnimating] = useState(false);

  // Icon map for moods
  const getMoodIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Clock':
        return <Clock className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Heart':
        return <Heart className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const currentMood = useMemo(() => {
    return MOOD_OPTIONS.find(m => m.id === selectedMoodId) || MOOD_OPTIONS[0];
  }, [selectedMoodId]);

  // Deterministic Recommendation Engine
  const recommendedProduct = useMemo(() => {
    const targetDrinkId =
      temperature === 'hot'
        ? currentMood.recommendedDrinkIdHot
        : currentMood.recommendedDrinkIdIced;

    let prod = PRODUCTS.find(p => p.id === targetDrinkId);

    // Fallback if temperature not available for that specific drink
    if (!prod || (temperature === 'hot' && !prod.availableHot) || (temperature === 'iced' && !prod.availableIced)) {
      prod = PRODUCTS.find(p =>
        p.moodPairings.includes(selectedMoodId) &&
        (temperature === 'hot' ? p.availableHot : p.availableIced)
      ) || PRODUCTS[0];
    }

    return prod;
  }, [currentMood, selectedMoodId, temperature]);

  const handleMoodSelect = (moodId: MoodId) => {
    if (moodId === selectedMoodId) return;
    setIsAnimating(true);
    setSelectedMoodId(moodId);

    // Trigger subtle celebratory coffee-colored confetti
    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#C6A47D', '#704735', '#241713', '#F5EFE5']
    });

    setTimeout(() => setIsAnimating(false), 350);
  };

  const handleTempToggle = (temp: Temperature) => {
    if (temp === temperature) return;
    setIsAnimating(true);
    setTemperature(temp);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleAddToCart = () => {
    addToCart(recommendedProduct, 'Regular', temperature);
  };

  return (
    <section id="pour" className="py-24 md:py-32 bg-espresso text-oat relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-25" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-caramel/10 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-cocoa/20 blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-oat/5 border border-caramel/25 text-xs font-semibold uppercase tracking-[0.25em] text-caramel">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE DISCOVERY RITUAL</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-oat">
            What kind of day are you having?
          </h2>

          <p className="text-base sm:text-lg text-oat/70 font-light">
            Select your inner mood and preferred temperature. We calibrate the extraction, aromatics, and texture to match your exact moment.
          </p>
        </div>

        {/* Mood Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {MOOD_OPTIONS.map((mood) => {
            const isSelected = mood.id === selectedMoodId;
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 relative group overflow-hidden ${
                  isSelected
                    ? 'bg-caramel/15 border-caramel shadow-caramel-glow scale-[1.02]'
                    : 'bg-espresso-dark/60 border-oat/10 hover:border-caramel/40 hover:bg-espresso-surface/80'
                }`}
              >
                {/* Active Indicator Pip */}
                {isSelected && (
                  <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-caramel animate-ping" />
                )}

                <div className={`p-3 rounded-xl inline-flex mb-4 transition-colors ${
                  isSelected ? 'bg-caramel text-espresso' : 'bg-oat/10 text-caramel group-hover:bg-caramel/20'
                }`}>
                  {getMoodIcon(mood.iconName)}
                </div>

                <h3 className="font-serif text-xl font-medium text-oat mb-1">
                  {mood.title}
                </h3>

                <p className="text-xs uppercase tracking-wider text-caramel/90 font-medium mb-2">
                  {mood.subtitle}
                </p>

                <p className="text-xs text-oat/60 font-light leading-relaxed line-clamp-3">
                  {mood.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Temperature Preference Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 rounded-full bg-espresso-dark border border-oat/15 shadow-inner">
            <button
              onClick={() => handleTempToggle('hot')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
                temperature === 'hot'
                  ? 'bg-cocoa text-oat shadow-md'
                  : 'text-oat/60 hover:text-oat'
              }`}
            >
              <Flame className="w-4 h-4 text-caramel" />
              <span>Hot & Steamed</span>
            </button>

            <button
              onClick={() => handleTempToggle('iced')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
                temperature === 'iced'
                  ? 'bg-sage-dark text-oat shadow-md'
                  : 'text-oat/60 hover:text-oat'
              }`}
            >
              <Snowflake className="w-4 h-4 text-caramel" />
              <span>Chilled & Over Ice</span>
            </button>
          </div>
        </div>

        {/* Dynamic Recommendation Card Display */}
        <div
          className={`rounded-3xl bg-espresso-dark/90 border border-caramel/30 overflow-hidden shadow-2xl transition-all duration-500 transform ${
            isAnimating ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left: Product Image & Badges */}
            <div className="lg:col-span-5 relative h-80 sm:h-96 lg:h-full min-h-[380px] bg-espresso-surface overflow-hidden">
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark via-transparent to-transparent opacity-80" />

              {/* Floating Badge */}
              <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-espresso/80 backdrop-blur-md border border-caramel/40 text-xs tracking-wider text-caramel uppercase font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-caramel" />
                <span>Tailored Pour for {currentMood.title}</span>
              </div>

              {/* Temperature Badge */}
              <div className="absolute bottom-5 left-5 px-3 py-1 rounded-full bg-espresso/80 backdrop-blur-md border border-oat/20 text-xs text-oat flex items-center gap-1.5">
                {temperature === 'hot' ? <Flame className="w-3.5 h-3.5 text-caramel" /> : <Snowflake className="w-3.5 h-3.5 text-caramel" />}
                <span className="capitalize">{temperature} Selection</span>
              </div>
            </div>

            {/* Right: Rich Editorial Content & Actions */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.25em] text-caramel font-semibold block">
                  RECOMMENDED POUR · {recommendedProduct.category.toUpperCase()}
                </span>
                
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="text-3xl sm:text-4xl font-serif text-oat font-medium">
                    {recommendedProduct.name}
                  </h3>
                  <span className="text-2xl font-serif font-semibold text-caramel">
                    ₹{recommendedProduct.price}
                  </span>
                </div>

                <p className="text-xs italic text-caramel/80 font-light">
                  {currentMood.tastingVibe}
                </p>
              </div>

              <p className="text-sm sm:text-base text-oat/80 font-light leading-relaxed">
                {recommendedProduct.longDescription}
              </p>

              {/* Flavor Profile Tags */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-oat/50 font-medium block">
                  Sensory Notes
                </span>
                <div className="flex flex-wrap gap-2">
                  {recommendedProduct.flavorNotes.map((note, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-caramel/15 border border-caramel/30 text-xs text-caramel"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Ingredients */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-oat/50 font-medium block">
                  Curated Ingredients
                </span>
                <p className="text-xs text-oat/70 font-light">
                  {recommendedProduct.ingredients.join(' · ')}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-oat/15 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleAddToCart}
                  className="px-8 py-3.5 rounded-full bg-caramel text-espresso font-medium text-xs uppercase tracking-wider hover:bg-caramel-glow transition-all duration-300 shadow-coffee hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add This Pour to Order</span>
                </button>

                <button
                  onClick={() => onQuickView(recommendedProduct)}
                  className="px-6 py-3.5 rounded-full border border-caramel/40 text-oat hover:border-caramel hover:text-caramel text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-caramel" />
                  <span>Inspect Brew Specs</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
