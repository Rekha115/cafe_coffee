import React from 'react';
import { Sparkles, Quote, Compass, Award } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-24 md:py-36 bg-espresso text-oat relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-caramel/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Editorial Eyebrow & Headline */}
        <div className="max-w-3xl mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-oat/5 border border-caramel/25 text-xs font-semibold uppercase tracking-[0.25em] text-caramel">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE ORIGIN CHRONICLE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal text-oat leading-tight">
            We believe your day deserves a deliberate pause.
          </h2>
          
          <p className="text-lg md:text-xl text-oat/70 font-light">
            MUSE was born in 2024 from a quiet desire: to rescue coffee from the blur of mindless consumption and return it to an art of presence.
          </p>
        </div>

        {/* Editorial Split Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Layered Photography Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative group max-w-lg mx-auto">
              {/* Primary Image: Cafe Sanctuary */}
              <div className="relative rounded-3xl overflow-hidden border border-caramel/30 shadow-2xl bg-espresso-surface aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80"
                  alt="MUSE flagship cafe interior in Bengaluru"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-70 pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-espresso/80 backdrop-blur-md border border-caramel/30">
                  <span className="text-[10px] uppercase tracking-widest text-caramel font-semibold block">
                    ARCHITECTURAL SANCTUARY
                  </span>
                  <p className="font-serif text-sm text-oat font-medium">
                    Hand-cast stone, linen drapery, and acoustic timber in Indiranagar.
                  </p>
                </div>
              </div>

              {/* Overlapping Floating Small Image: Handcrafted Extraction */}
              <div className="absolute -bottom-10 -right-6 hidden sm:block w-52 h-64 rounded-2xl overflow-hidden border-2 border-caramel/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
                  alt="Barista calibrating single origin espresso"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              {/* Fictional Award Badge */}
              <div className="absolute -top-6 -left-6 p-4 rounded-2xl bg-caramel text-espresso shadow-2xl flex items-center gap-3">
                <Award className="w-5 h-5" />
                <div className="text-left">
                  <span className="text-[10px] uppercase tracking-wider font-bold block leading-tight">
                    BEST SPECIALTY SPACE
                  </span>
                  <span className="text-[11px] font-medium opacity-90">Design Hackathon 2026</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Brand Philosophy & Story Text */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4 text-sm sm:text-base text-oat/80 font-light leading-relaxed">
              <p>
                Too much of modern life is measured in throughput. We bolt down lukewarm espresso while staring into screens, hurrying from one notification to another without tasting the morning.
              </p>
              <p>
                At MUSE, we reject the rush. We designed our space and our menu around a singular truth: <em className="text-caramel font-serif text-lg">a little pause creates a better day</em>. When you hold a ceramic cup warmed by fresh steam, the noise outside dials down.
              </p>
              <p>
                Every bean we roast has a lineage. We work directly with multi-generational estates in Chikmagalur and Coorg that nurture heirloom varieties under native tree shade. We roast in micro-batches to preserve delicate terroir—the elderflower florals, the raw honey sweetness, the lingering bittersweet chocolate.
              </p>
            </div>

            {/* Editorial Quote Box */}
            <div className="p-6 rounded-2xl bg-espresso-surface/80 border-l-4 border-caramel space-y-3">
              <Quote className="w-6 h-6 text-caramel/60" />
              <p className="font-serif text-lg sm:text-xl text-oat font-normal italic leading-snug">
                “Coffee is not fuel. Coffee is the punctuation mark that gives cadence to an intentional life.”
              </p>
              <span className="text-xs uppercase tracking-widest text-caramel font-medium block">
                — Aranya & Kabir, Founders of MUSE (Fictional Narrative)
              </span>
            </div>

            {/* Brand Values Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-oat/5 border border-oat/10 space-y-1">
                <Compass className="w-4 h-4 text-caramel" />
                <h4 className="font-serif text-sm font-medium text-oat">Estate Direct</h4>
                <p className="text-oat/60 font-light">100% traceable harvests from Western Ghats micro-lots.</p>
              </div>

              <div className="p-4 rounded-xl bg-oat/5 border border-oat/10 space-y-1">
                <Sparkles className="w-4 h-4 text-caramel" />
                <h4 className="font-serif text-sm font-medium text-oat">Zero Rush</h4>
                <p className="text-oat/60 font-light">Brewed slowly, served attentively, savoured completely.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
