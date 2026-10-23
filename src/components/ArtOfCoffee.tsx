import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { THE_ART_STAGES } from '../data/menuData';

export const ArtOfCoffee: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="art" className="py-24 md:py-36 bg-oat text-espresso relative overflow-hidden">
      {/* Editorial Watermark */}
      <div className="absolute top-10 left-12 font-serif text-[180px] font-bold text-espresso/[0.025] select-none pointer-events-none leading-none">
        RITUAL
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-caramel-rich">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CRAFT PHILOSOPHY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-espresso leading-tight">
            The Art of Coffee.
          </h2>

          <p className="text-lg text-espresso/70 font-light">
            A three-act movement from mountain mist to morning stillness. Fictional brand storytelling crafted around the relentless pursuit of the perfect cup.
          </p>
        </div>

        {/* Refined Horizontal Timeline Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 border-b border-oat-border pb-6">
          {THE_ART_STAGES.map((stage, idx) => {
            const isActive = idx === activeStage;
            return (
              <button
                key={stage.number}
                onClick={() => setActiveStage(idx)}
                className={`text-left p-4 rounded-xl transition-all duration-300 relative group ${
                  isActive ? 'bg-oat-warm/60 shadow-sm' : 'hover:bg-oat-warm/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-serif text-2xl font-medium ${isActive ? 'text-cocoa' : 'text-espresso/40 group-hover:text-espresso/70'}`}>
                    {stage.number}
                  </span>
                  {isActive && (
                    <span className="p-1 rounded-full bg-caramel text-espresso">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-medium text-espresso mb-1">
                  {stage.title}
                </h3>
                
                <p className="text-xs uppercase tracking-wider text-caramel-rich font-medium">
                  {stage.subtitle}
                </p>

                {/* Active Underline Indicator */}
                {isActive && (
                  <div className="absolute -bottom-6 left-0 right-0 h-[2.5px] bg-cocoa hidden md:block" />
                )}
              </button>
            );
          })}
        </div>

        {/* Split Editorial Stage Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Oversized Typography & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1">
              <span className="font-serif text-6xl md:text-7xl font-normal text-caramel-rich/40 block">
                {THE_ART_STAGES[activeStage].number}
              </span>
              <span className="text-xs uppercase tracking-[0.3em] text-caramel-rich font-semibold block">
                PHASE SPECIFICATION
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-espresso font-normal">
                {THE_ART_STAGES[activeStage].title}
              </h3>
            </div>

            <p className="text-base sm:text-lg text-espresso/80 font-light leading-relaxed">
              {THE_ART_STAGES[activeStage].description}
            </p>

            <div className="p-4 rounded-xl bg-oat-warm/50 border border-oat-border/80 inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-caramel-rich" />
              <span className="text-xs uppercase tracking-wider font-medium text-cocoa">
                Benchmark: {THE_ART_STAGES[activeStage].accent}
              </span>
            </div>

            {/* Quick Next/Prev controls */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => setActiveStage((prev) => (prev + 1) % THE_ART_STAGES.length)}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cocoa hover:text-caramel-rich transition-colors"
              >
                <span>Continue to Phase 0{((activeStage + 1) % THE_ART_STAGES.length) + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Immersive Coffee Art Photography Frame */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-coffee-lg border border-oat-border bg-espresso-surface aspect-[4/3] group">
              <img
                src={THE_ART_STAGES[activeStage].image}
                alt={THE_ART_STAGES[activeStage].title}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent pointer-events-none" />

              {/* Stage Annotation */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-espresso/80 backdrop-blur-md border border-caramel/30 text-oat flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-caramel font-semibold block">
                    STAGE {THE_ART_STAGES[activeStage].number} ARCHIVE
                  </span>
                  <span className="font-serif text-sm font-medium">
                    {THE_ART_STAGES[activeStage].subtitle}
                  </span>
                </div>
                <span className="text-xs text-caramel/80 italic font-serif">
                  MUSE Fictional Brand Narrative
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
