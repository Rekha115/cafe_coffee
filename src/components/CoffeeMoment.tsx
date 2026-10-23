import React from 'react';

export const CoffeeMoment: React.FC = () => {
  return (
    <section className="relative min-h-[75vh] flex items-center justify-center bg-espresso text-oat overflow-hidden">
      {/* Background Image with Cinematic Darkness & Ambient Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/coffee-moment.jpg"
          alt="Slow espresso extraction with golden crema and rising steam"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/60 to-espresso" />
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-30" />
      </div>

      {/* Center Cinematic Editorial Pause */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
        
        {/* Editorial Subline */}
        <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-caramel font-semibold">
          <span className="w-8 h-[1px] bg-caramel/50" />
          <span>PAUSE · BREATHE · SAVOUR</span>
          <span className="w-8 h-[1px] bg-caramel/50" />
        </div>

        {/* Large Cinematic Statement */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal leading-[1.1] tracking-tight text-oat">
          Some moments <br />
          <span className="italic font-light text-caramel">deserve to slow down.</span>
        </h2>

        {/* Sensory Body */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-oat/75 font-light leading-relaxed">
          In a world that rushes toward the next deadline, a single ceramic cup of dark extraction is your quiet rebellion. Take this minute for yourself.
        </p>

        {/* Subtle Decorative Annotation */}
        <div className="pt-8 flex items-center justify-center gap-6 text-xs text-caramel/70 uppercase tracking-widest font-mono">
          <span>9.2 BARS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-caramel/40" />
          <span>63°C VELVET FOAM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-caramel/40" />
          <span>SINGLE ORIGIN</span>
        </div>

      </div>
    </section>
  );
};
