import React, { useState } from 'react';
import { ArrowUp, Sparkles, Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-espresso-dark text-oat pt-20 pb-12 border-t border-caramel/20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
        
        {/* Top Section: Brand Statement & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start justify-between border-b border-oat/10 pb-16">
          
          <div className="lg:col-span-6 space-y-4">
            <a href="#hero" className="inline-block text-3xl sm:text-4xl font-serif tracking-[0.2em] font-semibold text-oat hover:text-caramel transition-colors">
              MUSE<span className="text-caramel font-sans text-xl ml-1">·</span>
            </a>
            <p className="font-serif text-xl sm:text-2xl text-caramel italic font-light">
              “A little pause. A better day.”
            </p>
            <p className="text-xs sm:text-sm text-oat/70 max-w-md font-light leading-relaxed">
              Specialty estate coffee, artisanal micro-extractions, and intentional space. Designed for the web design hackathon 2026.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-caramel font-semibold block">
              JOIN THE RITUAL DISPATCH
            </span>
            <p className="text-xs text-oat/70 font-light">
              Receive seasonal micro-lot release notes, brew guides, and invitation to our monthly cupping rituals.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-2xl bg-caramel/20 border border-caramel/40 text-caramel text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are in the circle. Welcome to slower mornings.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-3 rounded-full bg-espresso border border-caramel/30 text-xs text-oat placeholder:text-oat/40 focus:outline-none focus:border-caramel"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-caramel text-espresso hover:bg-caramel-glow font-medium text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-md flex-shrink-0"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Middle Navigation & Info Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-oat/70">
          
          <div className="space-y-3">
            <span className="uppercase tracking-widest text-caramel font-semibold block text-[11px]">
              EXPERIENCE
            </span>
            <ul className="space-y-2">
              <li><a href="#signature" className="hover:text-caramel transition-colors">Curated Signatures</a></li>
              <li><a href="#pour" className="hover:text-caramel transition-colors">Find Your Pour</a></li>
              <li><a href="#menu" className="hover:text-caramel transition-colors">The Full Menu</a></li>
              <li><a href="#art" className="hover:text-caramel transition-colors">The Art of Coffee</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="uppercase tracking-widest text-caramel font-semibold block text-[11px]">
              ABOUT MUSE
            </span>
            <ul className="space-y-2">
              <li><a href="#story" className="hover:text-caramel transition-colors">Our Story & Philosophy</a></li>
              <li><a href="#visit" className="hover:text-caramel transition-colors">Sanctuary Hours</a></li>
              <li><a href="#visit" className="hover:text-caramel transition-colors">Table Reservations</a></li>
              <li><span className="opacity-50">Estate Partnerships</span></li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="uppercase tracking-widest text-caramel font-semibold block text-[11px]">
              SANCTUARY HOURS
            </span>
            <div className="space-y-1">
              <p className="font-medium text-oat">Mon — Fri</p>
              <p className="font-mono text-caramel">07:30 — 22:00</p>
              <p className="font-medium text-oat pt-1">Sat — Sun</p>
              <p className="font-mono text-caramel">08:00 — 23:00</p>
            </div>
          </div>

          <div className="space-y-3">
            <span className="uppercase tracking-widest text-caramel font-semibold block text-[11px]">
              FLAGSHIP (DEMO)
            </span>
            <p className="leading-relaxed">
              14 Indiranagar Arts Quarter <br />
              Bengaluru, Karnataka 560038 <br />
              <span className="text-caramel font-mono">+91 80 4920-MUSE</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar: Disclaimers & Back to Top */}
        <div className="pt-8 border-t border-oat/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-oat/50">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-caramel/70" />
            <span>© 2026 MUSE Specialty Coffee. Fictional brand created for Web Design Hackathon.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-caramel transition-colors group"
          >
            <span className="uppercase tracking-wider">Back to Top</span>
            <div className="p-1.5 rounded-full border border-caramel/30 group-hover:border-caramel transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};
