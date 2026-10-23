import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Signature', href: '#signature' },
    { label: 'Find Your Pour', href: '#pour' },
    { label: 'Menu', href: '#menu' },
    { label: 'The Ritual', href: '#art' },
    { label: 'Our Story', href: '#story' },
    { label: 'Visit Us', href: '#visit' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-espresso/85 backdrop-blur-md border-b border-caramel/15 shadow-coffee text-oat'
            : 'py-6 bg-gradient-to-b from-espresso/70 via-espresso/30 to-transparent text-oat'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-2.5 text-2xl md:text-3xl font-serif tracking-[0.2em] font-semibold transition-colors duration-300"
          >
            <span className="text-oat group-hover:text-caramel transition-colors">MUSE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-caramel group-hover:scale-150 transition-transform duration-300" />
            <span className="hidden sm:inline-block text-[10px] tracking-[0.3em] font-sans font-light uppercase text-caramel/80 border-l border-caramel/30 pl-2.5 ml-1">
              Bengaluru
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.16em] uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="relative py-1 text-oat/80 hover:text-caramel transition-colors duration-300 group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-caramel transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action CTAs & Cart */}
          <div className="flex items-center gap-4">
            {/* Quick Ritual CTA */}
            <a
              href="#pour"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#pour');
              }}
              className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium px-4 py-2 rounded-full border border-caramel/30 text-caramel hover:bg-caramel hover:text-espresso transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Taste Ritual</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View shopping bag"
              className="relative p-2.5 rounded-full bg-caramel/10 hover:bg-caramel/20 border border-caramel/25 text-caramel hover:text-oat transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-caramel"
            >
              <ShoppingBag className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[11px] font-bold text-espresso bg-caramel rounded-full shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="lg:hidden p-2 text-oat hover:text-caramel transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-espresso/95 backdrop-blur-xl lg:hidden transition-all duration-500 flex flex-col justify-between px-8 py-24 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-caramel font-medium">A little pause. A better day.</p>
          <div className="flex flex-col gap-5 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-2xl font-serif tracking-widest text-oat hover:text-caramel transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-caramel/20 pt-6 text-center space-y-3">
          <p className="text-xs text-oat/60 tracking-wider">Flagship: 14 Indiranagar, Bengaluru</p>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full py-3 rounded-full bg-caramel text-espresso font-medium uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Order Bag ({totalItems})</span>
          </button>
        </div>
      </div>
    </>
  );
};
