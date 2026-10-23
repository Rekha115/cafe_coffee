import React from 'react';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage, setIsCartOpen } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-espresso/95 text-oat border border-caramel/40 shadow-2xl backdrop-blur-md">
        <CheckCircle2 className="w-4 h-4 text-caramel flex-shrink-0" />
        <span className="text-xs font-medium tracking-wide">{toastMessage}</span>
        <button
          onClick={() => setIsCartOpen(true)}
          className="ml-2 px-3 py-1 rounded-full bg-caramel text-espresso text-[11px] font-semibold uppercase tracking-wider hover:bg-caramel-glow transition-colors flex items-center gap-1"
        >
          <ShoppingBag className="w-3 h-3" />
          <span>Bag</span>
        </button>
      </div>
    </div>
  );
};
