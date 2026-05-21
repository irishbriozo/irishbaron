import React, { useState } from 'react';
import { User, CartItem, Product, Order } from '../types';
import { ShoppingBag, X, Trash2, ShieldCheck, HelpCircle, Truck, PackageCheck, AlertCircle } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  currentUser: User | null;
  onPlaceOrder: (orderDetail: {
    type: 'pickup' | 'delivery';
    address?: string;
    notes?: string;
    paymentMethod: string;
    total: number;
    discountType?: string;
    discountAmount?: number;
  }) => { success: boolean; orderId: string; error?: string };
  setCurrentTab: (tab: string) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cart,
  setCart,
  currentUser,
  onPlaceOrder,
  setCurrentTab,
}: CartModalProps) {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);
  const [orderErrorMsg, setOrderErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate Subtotal & Discounts
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Apply 10% discount ONLY on coffee products (category: 'hot-coffee' | 'iced-coffee') if student
  const isStudent = currentUser?.role === 'student';
  let coffeeSavings = 0;
  if (isStudent) {
    cart.forEach(item => {
      if (item.product.category === 'hot-coffee' || item.product.category === 'iced-coffee') {
        coffeeSavings += (item.product.price * 0.10) * item.quantity;
      }
    });
  }

  const deliveryFee = orderType === 'delivery' ? 35 : 0; // Flat 35 Pesos delivery fee for student dorms
  const finalTotal = subtotal - coffeeSavings + deliveryFee;

  // Quantity updates
  const incrementQuantity = (prodId: string) => {
    setCart(prev => prev.map(item => item.product.id === prodId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decrementQuantity = (prodId: string) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === prodId) {
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }
      return item;
    }));
  };

  const removeItem = (prodId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== prodId));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!currentUser) {
      setOrderErrorMsg('You are currently a Guest. Please Sign In / Register to place orders.');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress) {
      setOrderErrorMsg('Please state a valid Delivery Address on campus or room area.');
      return;
    }

    const res = onPlaceOrder({
      type: orderType,
      address: orderType === 'delivery' ? deliveryAddress : undefined,
      notes: orderNotes,
      paymentMethod,
      total: finalTotal,
      discountType: isStudent ? '10% student coffee discount' : undefined,
      discountAmount: coffeeSavings,
    });

    if (res.success) {
      setOrderSuccessMsg(`Hurrah! Order ${res.orderId} successfully dispatched. Chef Primo has loaded it onto active monitors. Check the Admin Dashboard to see it live!`);
      setCart([]); // Clear cart items
      setOrderNotes('');
      setDeliveryAddress('');
      setOrderErrorMsg(null);
    } else {
      setOrderErrorMsg(res.error || 'Failed to dispatch order. Try again.');
    }
  };

  const hasCoffee = cart.some(item => item.product.category === 'hot-coffee' || item.product.category === 'iced-coffee');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex justify-end" id="cart-drawer-root">
      
      {/* Drawer content body */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between" id="cart-drawer-body">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-800">
              <ShoppingBag className="h-4.5 w-4.5" />
            </div>
            <h3 className="font-sans text-base font-bold text-stone-900">Your Checkout Basket</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Products List & Forms */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Status feedback block */}
          {orderSuccessMsg ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-emerald-950 space-y-4 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 mx-auto shadow-md">
                <PackageCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans text-sm font-bold">Successfully Dispatched</h4>
                <p className="text-xs leading-relaxed text-emerald-900/90">{orderSuccessMsg}</p>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => { onClose(); setCurrentTab('services'); setOrderSuccessMsg(null); }}
                  className="flex-1 rounded-lg bg-white border border-emerald-200 py-1.5 text-xs text-emerald-900 hover:bg-emerald-50/50 cursor-pointer font-semibold"
                >
                  Continue Browsing Menu
                </button>
                <button
                  onClick={() => { onClose(); setCurrentTab('admin'); setOrderSuccessMsg(null); }}
                  className="flex-1 rounded-lg bg-emerald-800 text-white py-1.5 text-xs font-semibold hover:bg-emerald-900 cursor-pointer"
                >
                  Go inspect Admin Queue
                </button>
              </div>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 space-y-3" id="blank-cart-screen">
              <ShoppingBag className="h-10 w-10 text-stone-305 text-stone-300 mx-auto" />
              <p className="text-stone-500 text-xs">Your basket helper is empty. Start adding delicious coffees or meals onto your checkout!</p>
              <button
                onClick={() => { onClose(); setCurrentTab('services'); }}
                className="text-xs font-bold text-amber-800 hover:underline"
              >
                Go to services menu
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Product Lists */}
              <div className="space-y-4" id="cart-items-row">
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider block">Checked Items ({cart.length})</span>
                
                <div className="divide-y divide-stone-100">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-3.5 flex items-center justify-between gap-4" id={`cart-item-row-${item.product.id}`}>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-12 w-12 object-cover rounded-md"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 leading-snug">{item.product.name}</h4>
                          <span className="text-[10.5px] text-stone-500 block font-semibold mt-0.5">₱{item.product.price.toFixed(2)} each</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {/* Quantity Controllers */}
                        <div className="flex items-center bg-stone-50 border border-stone-200 rounded-md">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(item.product.id)}
                            className="px-2 py-0.5 text-stone-500 hover:bg-stone-200 text-xs font-bold transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-stone-850 font-mono">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => incrementQuantity(item.product.id)}
                            className="px-2 py-0.5 text-stone-500 hover:bg-stone-200 text-xs font-bold transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove trash */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.product.id)}
                          className="text-stone-400 hover:text-red-700 p-1 rounded-sm hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest check notice */}
              {!currentUser && (
                <div className="rounded-lg bg-orange-50 border border-orange-100 p-3.5 text-xs text-orange-950 space-y-1.5 flex items-start gap-2.5">
                  <AlertCircle className="h-4.5 w-4.5 text-orange-850 mt-0.5 shrink-0" />
                  <div>
                    <span className="block font-bold">Unauthorized Session</span>
                    <p className="text-[11px] leading-relaxed">
                      You are operating as a Guest. Canteen system requires credentials to process online delivery orders. Please{' '}
                      <button type="button" onClick={() => { onClose(); setCurrentTab('login'); }} className="font-bold underline text-amber-900">
                        Sign In or Register
                      </button>{' '}
                      to execute checkout.
                    </p>
                  </div>
                </div>
              )}

              {/* Student discount check badge */}
              {isStudent && hasCoffee && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3.5 text-xs text-emerald-950 flex items-center gap-2.5">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-800 shrink-0 animate-bounce" />
                  <div>
                    <strong>Student (ID: {currentUser?.idNumber}) Discount Applied!</strong>
                    <span className="block text-[10px] text-emerald-900 opacity-90">Enjoying 10% cash savings on all Primo coffee cups in your basket.</span>
                  </div>
                </div>
              )}

              {/* Account login as guest banner */}
              {currentUser && !isStudent && hasCoffee && (
                <div className="rounded-lg bg-amber-50/50 border border-amber-100 p-3.5 text-xs text-amber-950 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 shrink-0 text-amber-700" />
                  <p className="text-[10px]">
                    Note: Only Enrolled Student accounts receive 10% coffee discounts. Log in as <strong>sophia@student.edu</strong> to enjoy student savings.
                  </p>
                </div>
              )}

              {/* Checkout Form */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 border-t border-stone-100 pt-5">
                {orderErrorMsg && (
                  <div className="rounded-lg bg-red-50 text-red-950 border border-red-105 p-3 text-xs">
                    {orderErrorMsg}
                  </div>
                )}

                {/* Fulfillment selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">Fulfillment Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('pickup')}
                      className={`py-2 text-xs font-semibold rounded-lg text-center transition-colors border cursor-pointer ${
                        orderType === 'pickup'
                          ? 'bg-amber-805 bg-amber-800 text-white border-amber-800 shadow-xs'
                          : 'bg-white text-stone-605 text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      Counter Pick-Up
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrderType('delivery')}
                      className={`py-2 text-xs font-semibold rounded-lg text-center transition-colors border cursor-pointer ${
                        orderType === 'delivery'
                          ? 'bg-amber-805 bg-amber-800 text-white border-amber-800 shadow-xs'
                          : 'bg-white text-stone-605 text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      Dorm / Room Delivery
                    </button>
                  </div>
                </div>

                {/* Address block if delivery chosen */}
                {orderType === 'delivery' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label htmlFor="del-addr" className="text-xs font-semibold text-stone-700 block">Dormitory Room / Office Location Address</label>
                    <textarea
                      id="del-addr"
                      required
                      rows={2}
                      placeholder="e.g. Room 302, Wing B, CMDI Student Dormitory"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full rounded-lg border border-stone-250 bg-white px-3 py-2 text-xs outline-none focus:border-amber-700"
                    />
                    <span className="text-[9.5px] text-amber-850 font-bold block">★ Note: Flat ₱35 flat fee for local campus delivery runs.</span>
                  </div>
                )}

                {/* Payment methodology selector */}
                <div className="space-y-1.5">
                  <label htmlFor="pay-method" className="text-xs font-semibold text-stone-700 block">Method of Payment</label>
                  <select
                    id="pay-method"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full rounded-lg border border-stone-250 bg-white px-3 py-1.5 text-xs outline-none"
                  >
                    <option value="cod">{orderType === 'delivery' ? 'Cash on Delivery' : 'Pay at Counter'}</option>
                    <option value="gcash">GCash Digital Wallet (Scan QR at Pick-up)</option>
                    <option value="bank">Local Bank Fund Transfer</option>
                  </select>
                </div>

                {/* Additional instructions notes */}
                <div className="space-y-1.5">
                  <label htmlFor="ord-notes" className="text-xs font-semibold text-stone-700 block">Chef Cooking Notes (Optional)</label>
                  <input
                    type="text"
                    id="ord-notes"
                    placeholder="e.g. Medium sweet coffee, bring spoons..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full rounded-lg border border-stone-250 bg-white px-3 py-1.5 text-xs outline-none focus:border-amber-700"
                  />
                </div>

              </form>
            </div>
          )}
        </div>

        {/* Drawer footer summing up checkout bill */}
        {!orderSuccessMsg && cart.length > 0 && (
          <div className="bg-stone-50 border-t border-stone-150 p-6 space-y-4" id="cart-drawer-bill">
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal menu price:</span>
                <span className="font-mono">₱{subtotal.toFixed(2)}</span>
              </div>
              
              {isStudent && coffeeSavings > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Student Coffee Discount (10% off):</span>
                  <span className="font-mono">-₱{coffeeSavings.toFixed(2)}</span>
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="flex justify-between">
                  <span>Campus Dispatch Delivery Fee:</span>
                  <span className="font-mono">₱{deliveryFee.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-sm text-stone-900 font-bold border-t border-stone-200/60 pt-2 text-base">
                <span>Total checkout Bill:</span>
                <span className="font-sans text-amber-950 font-extrabold pb-1">₱{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutSubmit}
              disabled={!currentUser}
              className={`w-full rounded-xl py-3.5 text-xs font-bold shadow-md text-white transition-all text-center flex items-center justify-center gap-2 cursor-pointer ${
                currentUser ? 'bg-amber-800 hover:bg-amber-900' : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
              id="cart-primary-checkout-btn"
            >
              <span>Place Order (Accept Counter/Delivery)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
