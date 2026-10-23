import React from 'react';
import { ArrowDownRight, Compass, Coffee } from 'lucide-react';
import { ThreeBeanCanvas } from './ThreeBeanCanvas';

export const Hero: React.FC = () => {
  const scrollTo = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[100vh] flex flex-col justify-between bg-espresso text-oat pt-28 pb-12 overflow-hidden">
      {/* Background Cinematic Texture & Ambient Warm Gradients */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-40 z-0" />
      
      {/* Warm Ambient Glows simulating soft natural cafe window lighting */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-caramel/15 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-cocoa/25 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[350px] rounded-full bg-caramel/10 blur-[90px] pointer-events-none z-0" />

      {/* Signature 3D Coffee-Bean Experience Layer */}
      <ThreeBeanCanvas />

      {/* Main Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Small Editorial Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-oat/5 border border-caramel/25 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-ping" />
              <span className="text-xs uppercase tracking-[0.25em] text-caramel font-medium">
                SPECIALTY COFFEE · MADE FOR YOUR MOMENTS
              </span>
            </div>

            {/* Large Expressive Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal leading-[1.05] tracking-tight">
                Your Everyday, <br />
                <span className="italic font-light text-caramel relative inline-block">
                  Extraordinary.
                  {/* Subtle underline flourish */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-caramel/40"
                    viewBox="0 0 300 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9.5C80 2 220 2 298 9.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg md:text-xl text-oat/80 max-w-xl font-light leading-relaxed">
              Find your flavour. Follow your feeling. Stay for the moment. Crafted from micro-lot estate harvests and poured with architectural intention.
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={() => scrollTo('#menu')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-caramel text-espresso font-medium text-sm uppercase tracking-wider overflow-hidden shadow-coffee-lg hover:bg-caramel-glow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore the Menu</span>
                <ArrowDownRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollTo('#pour')}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border border-caramel/30 text-oat hover:border-caramel hover:text-caramel font-medium text-sm uppercase tracking-wider backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Compass className="w-4 h-4 text-caramel transition-transform duration-500 group-hover:rotate-45" />
                <span>Find Your Pour</span>
              </button>
            </div>

            {/* Editorial Annotations */}
            <div className="pt-6 border-t border-oat/10 flex flex-wrap items-center gap-8 text-xs tracking-wider text-oat/60 uppercase">
              <div className="flex items-center gap-2">
                <span className="font-serif text-caramel text-sm italic font-normal">01</span>
                <span>CRAFTED SLOWLY</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-caramel text-sm italic font-normal">02</span>
                <span>100% SHADE-GROWN ARABICA</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-caramel text-sm italic font-normal">03</span>
                <span>ESTATE HARVESTED</span>
              </div>
            </div>

          </div>

          {/* Right Column: Large Beautifully Lit Coffee Composition */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            
            {/* Layered Architectural Card Frame */}
            <div className="relative group max-w-md w-full">
              
              {/* Soft Caramel Halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-caramel/20 via-cocoa/30 to-transparent rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Main Image Frame with Editorial Cut */}
              <div className="relative rounded-2xl overflow-hidden border border-caramel/20 bg-espresso-surface shadow-2xl">
                <img
                  src="/images/hero-latte.jpg"
                  alt="MUSE Signature Velvet Latte with intricate rosetta crema"
                  className="w-full h-[460px] md:h-[500px] object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="eager"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-espresso/30 opacity-70 pointer-events-none" />

                {/* Floating Product Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-espresso/90 backdrop-blur-md border border-caramel/30 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-caramel font-semibold block">
                      FEATURED RITUAL · VELVET LATTE
                    </span>
                    <h3 className="font-serif text-base text-oat font-medium">Toasted Hazelnut & Brown Butter</h3>
                    <p className="text-xs text-oat/70">Single-estate ristretto · Silky oat cream · ₹220</p>
                  </div>
                  <button
                    onClick={() => scrollTo('#signature')}
                    className="p-2.5 rounded-full bg-caramel text-espresso hover:scale-110 transition-transform duration-300 flex-shrink-0"
                    title="View drink details"
                  >
                    <ArrowDownRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Top Corner Badge */}
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-espresso/80 backdrop-blur-md border border-caramel/30 text-[11px] tracking-wider text-caramel uppercase font-medium flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5 text-caramel" />
                  <span>Fresh Extraction</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Hero Bottom Bar (Scroll button removed) */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 flex items-center justify-between text-xs tracking-wider text-oat/60 border-t border-oat/10">
        <div className="flex items-center gap-3">
          <span className="text-caramel font-serif text-base italic font-normal">“A little pause.”</span>
          <span className="hidden sm:inline">— A better day begins here.</span>
        </div>

        <div className="text-[11px] uppercase tracking-widest text-caramel/70 font-medium">
          Bengaluru Flagship Sanctuary
        </div>
      </div>

      {/* Coffee-inspired Crema Wave Transition Separator */}
      <div className="relative w-full overflow-hidden leading-none z-20 mt-10">
        <svg
          className="relative block w-full h-12 md:h-16 text-oat"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
