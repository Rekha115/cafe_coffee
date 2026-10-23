import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, DrinkSize, Temperature, OrderCustomerDetails } from '../types';
import { SIZES } from '../data/menuData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size?: DrinkSize, temperature?: Temperature, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  updateSize: (itemId: string, newSize: DrinkSize) => void;
  updateTemperature: (itemId: string, newTemp: Temperature) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  tax: number; // 5% GST
  deliveryFee: number;
  grandTotal: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: { details: OrderCustomerDetails; items: CartItem[]; total: number; orderId: string } | null;
  submitOrder: (details: OrderCustomerDetails) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'muse_cafe_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastOrder, setLastOrder] = useState<{ details: OrderCustomerDetails; items: CartItem[]; total: number; orderId: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 2800);
  };

  const calculateItemPrice = (basePrice: number, size: DrinkSize): number => {
    const sizeObj = SIZES.find(s => s.name === size);
    return Math.max(50, basePrice + (sizeObj ? sizeObj.priceDiff : 0));
  };

  const addToCart = (
    product: Product,
    size: DrinkSize = 'Regular',
    temperature: Temperature = product.defaultTemp,
    quantity: number = 1
  ) => {
    const compositeId = `${product.id}-${size}-${temperature}`;
    const unitPrice = calculateItemPrice(product.price, size);

    setCart(prev => {
      const existing = prev.find(item => item.id === compositeId);
      if (existing) {
        return prev.map(item =>
          item.id === compositeId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: compositeId,
            productId: product.id,
            name: product.name,
            basePrice: product.price,
            price: unitPrice,
            size,
            temperature,
            quantity,
            image: product.image,
            flavorNotes: product.flavorNotes
          }
        ];
      }
    });

    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}${product.name} (${size}, ${temperature}) to order`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const updateSize = (itemId: string, newSize: DrinkSize) => {
    setCart(prev => {
      const item = prev.find(i => i.id === itemId);
      if (!item) return prev;

      const newCompositeId = `${item.productId}-${newSize}-${item.temperature}`;
      const newPrice = calculateItemPrice(item.basePrice, newSize);

      // Check if an item with target specs already exists
      const existingTarget = prev.find(i => i.id === newCompositeId && i.id !== itemId);
      if (existingTarget) {
        return prev
          .filter(i => i.id !== itemId)
          .map(i => i.id === newCompositeId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }

      return prev.map(i => i.id === itemId ? {
        ...i,
        id: newCompositeId,
        size: newSize,
        price: newPrice
      } : i);
    });
  };

  const updateTemperature = (itemId: string, newTemp: Temperature) => {
    setCart(prev => {
      const item = prev.find(i => i.id === itemId);
      if (!item) return prev;

      const newCompositeId = `${item.productId}-${item.size}-${newTemp}`;
      const existingTarget = prev.find(i => i.id === newCompositeId && i.id !== itemId);
      if (existingTarget) {
        return prev
          .filter(i => i.id !== itemId)
          .map(i => i.id === newCompositeId ? { ...i, quantity: i.quantity + item.quantity } : i);
      }

      return prev.map(i => i.id === itemId ? {
        ...i,
        id: newCompositeId,
        temperature: newTemp
      } : i);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% GST on cafe beverages
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40; // Free above ₹500
  const grandTotal = subtotal + tax + deliveryFee;

  const submitOrder = (details: OrderCustomerDetails): boolean => {
    if (cart.length === 0) return false;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MUSE-${randomSuffix}`;

    setLastOrder({
      details,
      items: [...cart],
      total: grandTotal,
      orderId
    });

    clearCart();
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateSize,
        updateTemperature,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        tax,
        deliveryFee,
        grandTotal,
        toastMessage,
        showToast,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        submitOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
