import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Coffee, CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SIZES } from '../data/menuData';
import type { DrinkSize, OrderCustomerDetails } from '../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    updateSize,
    updateTemperature,
    subtotal,
    tax,
    deliveryFee,
    grandTotal,
    submitOrder,
    lastOrder,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [customerDetails, setCustomerDetails] = useState<OrderCustomerDetails>({
    fullName: '',
    phone: '',
    email: '',
    orderType: 'dine-in',
    tableNumber: 'Table 04 (Window Alcove)',
    notes: 'Please pour with extra silky microfoam'
  });

  if (!isCartOpen) return null;

  const handleStartCheckout = () => {
    setCheckoutStep('details');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.fullName || !customerDetails.phone) {
      alert('Please provide your name and phone number for order notifications.');
      return;
    }
    const success = submitOrder(customerDetails);
    if (success) {
      setCheckoutStep('success');
    }
  };

  const handleClose = () => {
    setIsCartOpen(false);
    if (checkoutStep === 'success') {
      setCheckoutStep('cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-espresso/80 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-oat-light border-l border-oat-border shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-oat-border bg-oat flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-espresso text-caramel">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-espresso">
                  {checkoutStep === 'cart' && 'Your Coffee Order'}
                  {checkoutStep === 'details' && 'Craft Checkout'}
                  {checkoutStep === 'success' && 'Order Confirmed'}
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-espresso/60 block">
                  {checkoutStep === 'cart' && `${cart.length} unique selections`}
                  {checkoutStep === 'details' && 'Demo Ritual Prototype'}
                  {checkoutStep === 'success' && 'Fresh Barista Calibration'}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 text-espresso/60 hover:text-espresso rounded-full hover:bg-oat-warm/50 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* STEP 1: CART ITEMS */}
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-oat-warm mx-auto flex items-center justify-center text-espresso/40">
                      <Coffee className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-xl text-espresso">Your bag is empty.</h4>
                      <p className="text-xs text-espresso/60 max-w-xs mx-auto">
                        Explore our single-origin harvests or find your mood pour to begin.
                      </p>
                    </div>
                    <a
                      href="#menu"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block px-6 py-2.5 rounded-full bg-espresso text-oat text-xs uppercase tracking-wider font-medium hover:bg-cocoa transition-colors"
                    >
                      Browse Coffee Menu
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-oat border border-oat-border shadow-sm space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover border border-oat-border/80 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h4 className="font-serif text-base font-medium text-espresso truncate">
                                {item.name}
                              </h4>
                              <span className="font-serif text-sm font-semibold text-espresso">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                            <span className="text-xs text-espresso/60 block">
                              ₹{item.price} each · {item.size} · {item.temperature}
                            </span>
                          </div>
                        </div>

                        {/* Customization Options Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-oat-border/60 text-xs">
                          {/* Size Selector */}
                          <div className="flex items-center gap-1 bg-oat-warm/60 p-1 rounded-lg">
                            {SIZES.map((sz) => (
                              <button
                                key={sz.name}
                                onClick={() => updateSize(item.id, sz.name as DrinkSize)}
                                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                                  item.size === sz.name
                                    ? 'bg-espresso text-oat'
                                    : 'text-espresso/60 hover:text-espresso'
                                }`}
                              >
                                {sz.name[0]}
                              </button>
                            ))}
                          </div>

                          {/* Temp Selector */}
                          <div className="flex items-center gap-1 bg-oat-warm/60 p-1 rounded-lg">
                            <button
                              onClick={() => updateTemperature(item.id, 'hot')}
                              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                                item.temperature === 'hot'
                                  ? 'bg-cocoa text-oat'
                                  : 'text-espresso/60 hover:text-espresso'
                              }`}
                            >
                              Hot
                            </button>
                            <button
                              onClick={() => updateTemperature(item.id, 'iced')}
                              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                                item.temperature === 'iced'
                                  ? 'bg-sage-dark text-oat'
                                  : 'text-espresso/60 hover:text-espresso'
                              }`}
                            >
                              Iced
                            </button>
                          </div>

                          {/* Quantity Controls & Remove */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center bg-oat-warm/60 rounded-lg p-0.5">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 text-espresso/60 hover:text-espresso"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center font-medium text-xs">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 text-espresso/60 hover:text-espresso"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 text-espresso/40 hover:text-red-700 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT DETAILS FORM */}
            {checkoutStep === 'details' && (
              <form onSubmit={handleConfirmOrder} className="space-y-4 text-xs">
                {/* Prototype Disclaimer */}
                <div className="p-3.5 rounded-xl bg-caramel/15 border border-caramel/30 flex items-start gap-2.5 text-espresso">
                  <ShieldCheck className="w-4 h-4 text-caramel-rich flex-shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <strong>Prototype Demonstration:</strong> This is a hackathon simulation. No actual payment is collected or real order dispatched.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-semibold text-[11px] text-espresso/70">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerDetails.fullName}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, fullName: e.target.value })}
                    placeholder="e.g. Maya Shenoy"
                    className="w-full px-4 py-2.5 rounded-xl bg-oat border border-oat-border text-espresso focus:outline-none focus:border-caramel"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-semibold text-[11px] text-espresso/70">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-oat border border-oat-border text-espresso focus:outline-none focus:border-caramel"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-semibold text-[11px] text-espresso/70">
                    Order Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCustomerDetails({ ...customerDetails, orderType: 'dine-in' })}
                      className={`py-2 rounded-xl border text-center font-medium transition-colors ${
                        customerDetails.orderType === 'dine-in'
                          ? 'bg-espresso text-oat border-espresso'
                          : 'bg-oat border-oat-border text-espresso'
                      }`}
                    >
                      Dine In (Table)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerDetails({ ...customerDetails, orderType: 'takeaway' })}
                      className={`py-2 rounded-xl border text-center font-medium transition-colors ${
                        customerDetails.orderType === 'takeaway'
                          ? 'bg-espresso text-oat border-espresso'
                          : 'bg-oat border-oat-border text-espresso'
                      }`}
                    >
                      Takeaway Cup
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-semibold text-[11px] text-espresso/70">
                    Table / Counter Reference
                  </label>
                  <input
                    type="text"
                    value={customerDetails.tableNumber}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, tableNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-oat border border-oat-border text-espresso focus:outline-none focus:border-caramel"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-semibold text-[11px] text-espresso/70">
                    Special Barista Notes
                  </label>
                  <textarea
                    rows={2}
                    value={customerDetails.notes}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                    placeholder="e.g. Extra hot, oat milk preferred, separate sugar..."
                    className="w-full px-4 py-2 rounded-xl bg-oat border border-oat-border text-espresso focus:outline-none focus:border-caramel resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-caramel text-espresso font-medium text-xs uppercase tracking-wider hover:bg-caramel-glow transition-all duration-300 shadow-lg mt-4"
                >
                  Confirm Prototype Order (₹{grandTotal})
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full py-2 text-center text-xs text-espresso/60 hover:text-espresso"
                >
                  Back to Bag
                </button>
              </form>
            )}

            {/* STEP 3: ORDER CONFIRMED SCREEN */}
            {checkoutStep === 'success' && lastOrder && (
              <div className="text-center py-6 space-y-6">
                <div className="w-16 h-16 rounded-full bg-sage-light/60 mx-auto flex items-center justify-center text-sage-dark animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.25em] text-caramel-rich font-semibold">
                    CALIBRATING EXTRACTION
                  </span>
                  <h4 className="font-serif text-3xl font-normal text-espresso">
                    Order {lastOrder.orderId}
                  </h4>
                  <p className="text-xs text-espresso/70 max-w-xs mx-auto">
                    Thank you, <strong>{lastOrder.details.fullName}</strong>. Our barista is freshly grinding your beans for {lastOrder.details.orderType}.
                  </p>
                </div>

                {/* Ticket Summary */}
                <div className="p-4 rounded-2xl bg-oat border border-oat-border text-left space-y-3 text-xs">
                  <div className="flex justify-between border-b border-oat-border pb-2">
                    <span className="text-espresso/60">Estimated Prep Time</span>
                    <strong className="text-espresso">6 — 8 minutes</strong>
                  </div>
                  <div className="flex justify-between border-b border-oat-border pb-2">
                    <span className="text-espresso/60">Location / Service</span>
                    <strong className="text-espresso">{lastOrder.details.tableNumber}</strong>
                  </div>
                  <div className="flex justify-between border-b border-oat-border pb-2">
                    <span className="text-espresso/60">Grand Total</span>
                    <strong className="text-espresso font-serif text-base">₹{lastOrder.total}</strong>
                  </div>
                  <div className="pt-1">
                    <span className="text-espresso/60 block mb-1">Poured Drinks:</span>
                    <ul className="list-disc list-inside space-y-1 text-espresso/80">
                      {lastOrder.items.map((it, idx) => (
                        <li key={idx}>
                          {it.quantity}x {it.name} ({it.size}, {it.temperature})
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3.5 rounded-full bg-espresso text-oat text-xs uppercase tracking-wider font-medium hover:bg-cocoa transition-colors"
                >
                  Return to Café
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer Summary (only on cart step) */}
          {checkoutStep === 'cart' && cart.length > 0 && (
            <div className="p-6 border-t border-oat-border bg-oat space-y-4 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between text-espresso/70">
                  <span>Subtotal</span>
                  <span className="font-serif">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-espresso/70">
                  <span>GST (5% Hospitality)</span>
                  <span className="font-serif">₹{tax}</span>
                </div>
                <div className="flex justify-between text-espresso/70">
                  <span>Artisan Packaging / Delivery</span>
                  <span className="font-serif">
                    {deliveryFee === 0 ? <span className="text-sage-dark font-medium">Complimentary</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-oat-border flex justify-between text-base font-semibold text-espresso">
                  <span>Grand Total</span>
                  <span className="font-serif text-xl text-espresso">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handleStartCheckout}
                className="w-full py-4 rounded-full bg-caramel text-espresso font-medium text-xs uppercase tracking-wider hover:bg-caramel-glow transition-all duration-300 shadow-coffee flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
