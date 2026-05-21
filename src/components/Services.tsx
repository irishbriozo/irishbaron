import React, { useState } from 'react';
import { Product, User, CartItem } from '../types';
import { CATERING_PACKAGES } from '../data';
import { Coffee, Calendar, Utensils, Search, CheckCircle, Clock, MapPin, Users, Info, ShieldCheck } from 'lucide-react';

interface ServicesProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  currentUser: User | null;
  onBookReservation: (resData: { date: string; time: string; guestsCount: number; notes?: string }) => { success: boolean; message: string };
  onBookCatering: (catData: { eventName: string; date: string; expectedGuests: number; packageId: string; packageName: string; address: string; notes?: string }) => { success: boolean; message: string };
  setCurrentTab: (tab: string) => void;
}

export default function Services({
  products,
  selectedCategory,
  setSelectedCategory,
  onAddToCart,
  currentUser,
  onBookReservation,
  onBookCatering,
  setCurrentTab,
}: ServicesProps) {
  // Sub-tabs: 'menu' | 'reservation' | 'catering'
  const [activeTab, setActiveTab] = useState<'menu' | 'reservation' | 'catering'>('menu');
  const [searchQuery, setSearchQuery] = useState('');

  // Table reservation form state
  const [resDate, setResDate] = useState('');
  const [resTime, setResTime] = useState('');
  const [resGuests, setResGuests] = useState(2);
  const [resNotes, setResNotes] = useState('');
  const [resStatusMsg, setResStatusMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Catering form state
  const [catEventName, setCatEventName] = useState('');
  const [catDate, setCatDate] = useState('');
  const [catGuests, setCatGuests] = useState(30);
  const [catPackageId, setCatPackageId] = useState('cat-deluxe');
  const [catAddress, setCatAddress] = useState('');
  const [catNotes, setCatNotes] = useState('');
  const [catStatusMsg, setCatStatusMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Sync state if selectedCategory turns into reservation or catering from Home clicks
  if (selectedCategory === 'reservation' && activeTab !== 'reservation') {
    setActiveTab('reservation');
    setSelectedCategory('all');
  } else if (selectedCategory === 'catering' && activeTab !== 'catering') {
    setActiveTab('catering');
    setSelectedCategory('all');
  }

  // Categories helper
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'hot-coffee', label: 'Hot Coffee' },
    { id: 'iced-coffee', label: 'Iced Coffee' },
    { id: 'kakanin', label: 'Classic Kakanin' },
    { id: 'bilao', label: 'Bilao Platters' },
    { id: 'meals', label: 'Hearty Meals' },
  ];

  // Filtering products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || selectedCategory === 'all-products' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Table Reservation Submit
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setResStatusMsg({
        success: false,
        text: 'You must be signed in to reserve a table. Please Sign In / Register first.',
      });
      return;
    }

    if (!resDate || !resTime || resGuests < 1) {
      setResStatusMsg({
        success: false,
        text: 'Please choose a valid date, time, and guest count.',
      });
      return;
    }

    const res = onBookReservation({
      date: resDate,
      time: resTime,
      guestsCount: resGuests,
      notes: resNotes,
    });

    if (res.success) {
      setResStatusMsg({
        success: true,
        text: 'Excellent! Your table reservation request was sent to Chef Primo. Track its status in your notifications or contact us.',
      });
      // Clear fields
      setResDate('');
      setResTime('');
      setResGuests(2);
      setResNotes('');
    } else {
      setResStatusMsg({
        success: false,
        text: res.message,
      });
    }
  };

  // Handle Catering booking submit
  const handleCateringSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setCatStatusMsg({
        success: false,
        text: 'You must be signed in to submit a catering request. Please Login / Register.',
      });
      return;
    }

    if (!catEventName || !catDate || !catAddress || catGuests < 10) {
      setCatStatusMsg({
        success: false,
        text: 'Please capture all required fields. Note: Minimum guests count is 10 for catering packages.',
      });
      return;
    }

    const selectedPkg = CATERING_PACKAGES.find((p) => p.id === catPackageId);
    const packageName = selectedPkg ? selectedPkg.name : 'Custom Event Package';

    const res = onBookCatering({
      eventName: catEventName,
      date: catDate,
      expectedGuests: catGuests,
      packageId: catPackageId,
      packageName,
      address: catAddress,
      notes: catNotes,
    });

    if (res.success) {
      setCatStatusMsg({
        success: true,
        text: `Outstanding! Your catering request for "${catEventName}" on ${catDate} (${packageName}) has been logged in GK Canteen's queue. An administrator will call you shortly at ${currentUser.phone} to finalize details.`,
      });
      // Reset forms
      setCatEventName('');
      setCatDate('');
      setCatGuests(30);
      setCatAddress('');
      setCatNotes('');
    } else {
      setCatStatusMsg({
        success: false,
        text: res.message,
      });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10 pb-20" id="services-view-root">
      
      {/* Upper Navigation Tabs */}
      <div className="border-b border-amber-100 pb-4" id="services-subnav-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-amber-950">
              GK Services & Menu Marketplace
            </h2>
            <p className="text-xs text-stone-500">Pick from our freshly steamed food menu, reserve coffee tables, or book high-quality venue catering packages.</p>
          </div>

          <div className="flex bg-amber-50 p-1 rounded-xl self-start sm:self-auto border border-amber-100" id="services-subtabs">
            <button
              onClick={() => { setActiveTab('menu'); setSelectedCategory('all'); }}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'menu' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-600 hover:text-amber-900'
              }`}
              id="subtab-menu"
            >
              <Coffee className="h-4 w-4" />
              <span>1. Order Food & Coffee</span>
            </button>
            
            <button
              onClick={() => { setActiveTab('reservation'); setSelectedCategory('all'); }}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'reservation' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-600 hover:text-amber-900'
              }`}
              id="subtab-reservation"
            >
              <Calendar className="h-4 w-4" />
              <span>2. Table Reservation</span>
            </button>

            <button
              onClick={() => { setActiveTab('catering'); setSelectedCategory('all'); }}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'catering' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-600 hover:text-amber-900'
              }`}
              id="subtab-catering"
            >
              <Utensils className="h-4 w-4" />
              <span>3. Catering Services</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================== SUB-TAB 1: MENU CARD GRID ==================== */}
      {activeTab === 'menu' && (
        <div className="space-y-8" id="menu-view-pane">
          
          {/* Filters Row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-xl border border-stone-100 shadow-xs">
            {/* Category horizontal scroller */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none" id="category-selector-row">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-800 text-white'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                  }`}
                  id={`category-btn-${cat.id}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative max-w-xs w-full" id="search-input-wrapper">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee or meal..."
                className="w-full rounded-lg border border-stone-200 bg-stone-50 pl-9 pr-4 py-1.5 text-xs font-sans outline-none focus:border-amber-700 focus:bg-white transition-colors"
                id="menu-search-input"
              />
            </div>
          </div>

          {/* Student Perks alert */}
          <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-amber-950">
            <Info className="h-5 w-5 text-amber-850 shrink-0" />
            <p className="text-xs">
              💡 <strong>Are you an enrolled student?</strong> Login with your student ID to claim a <strong>10% instant discount</strong> on Coffee items during checkout! Our canteen provides flexible <strong>Room Delivery</strong> inside CMDI campus for your physical convenience.
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" id="items-grid-container">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group flex flex-col justify-between overflow-hidden rounded-xl border ${
                    product.available ? 'border-amber-100/60 bg-white' : 'border-stone-100 bg-stone-50/50 grayscale-60'
                  } shadow-xs transition-transform duration-200 hover:scale-[1.01]`}
                  id={`product-card-${product.id}`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {!product.available && (
                      <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center">
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-widest bg-stone-850/90 rounded-sm px-2.5 py-1">
                          Sold Out Today
                        </span>
                      </div>
                    )}
                    {product.available && product.price > 300 && (
                      <span className="absolute top-2 left-2 rounded bg-amber-800 text-[9px] uppercase font-bold tracking-widest text-white px-2 py-0.5">
                        Festive Platter
                      </span>
                    )}
                  </div>

                  {/* Card content */}
                  <div className="p-4 flex flex-1 flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-amber-700">
                          {product.category.replace('-', ' ')}
                        </span>
                        {product.available && (
                        <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          In stock
                        </span>
                        )}
                      </div>
                      <h3 className="font-sans text-sm font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-stone-500 leading-normal line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-50">
                      <span className="font-sans text-sm font-extrabold text-amber-950">
                        ₱{product.price.toFixed(2)}
                      </span>

                      {product.available ? (
                        <button
                          onClick={() => onAddToCart(product)}
                          className="rounded-lg bg-amber-800 hover:bg-amber-900 text-white px-3 py-1.5 text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
                          id={`add-to-cart-service-${product.id}`}
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          disabled
                          className="rounded-lg bg-stone-200 text-stone-400 px-3 py-1.5 text-xs font-medium cursor-not-allowed"
                          id={`add-to-cart-disabled-${product.id}`}
                        >
                          Sold Out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-stone-50 rounded-xl max-w-lg mx-auto border border-dashed border-stone-200 space-y-3" id="empty-search-alert">
              <p className="text-stone-500 text-sm">We couldn&apos;t find any food or coffee matching your search term.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="text-xs font-semibold text-amber-800 underline hover:text-amber-950"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================== SUB-TAB 2: FOOD RESERVATION SYSTEM ==================== */}
      {activeTab === 'reservation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" id="reservation-view-pane">
          
          {/* Reservation Info Left */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-bold block">
              Dine-In Space Reservation
            </span>
            <h2 className="font-sans text-2xl font-bold text-amber-950">
              Reserve a Study Cozy Seat or Meeting Table
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Skip the long lunch queues inside CMDI Canteen! Students and customers can reserve specific coffee corners or modular tables ahead of time. This service is 100% free with pre-ordered menu foods.
            </p>

            <div className="rounded-xl bg-amber-50 p-5 border border-amber-100 space-y-4">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Canteen Dining Policy</h4>
              <ul className="space-y-2.5 text-xs text-stone-600">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>Held for a maximum of <strong>20 minutes</strong> from reserved arrival time.</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>Canteen dining features high-speed school campus Wi-Fi & power outlets.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>Tables hold 2 to 8 guests. Contact us directly for larger groups.</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-stone-500 border-t border-stone-100 pt-4">
              <ShieldCheck className="h-4 w-4 text-emerald-800" />
              <span>Canteen slot availability guaranteed on real-time admin approvals.</span>
            </div>
          </div>

          {/* Reservation Form Right */}
          <div className="lg:col-span-1" />
          
          <div className="lg:col-span-6" id="reservation-form-container">
            <div className="rounded-2xl border border-amber-100 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="font-sans text-lg font-bold text-amber-950 mb-1">Reserve Your Spot</h3>
              <p className="text-xs text-stone-500 mb-6">Complete the slots form. Approval status will reflect inside Admin view.</p>

              <form onSubmit={handleReservationSubmit} className="space-y-5">
                {resStatusMsg && (
                  <div
                    className={`rounded-lg p-4 text-xs ${
                      resStatusMsg.success ? 'bg-emerald-50 text-emerald-950 border border-emerald-100' : 'bg-red-50 text-red-950 border border-red-100'
                    }`}
                  >
                    {resStatusMsg.text}
                  </div>
                )}

                {!currentUser && (
                  <div className="rounded-lg bg-orange-50 border border-orange-100 p-3.5 text-xs text-orange-950 flex items-start gap-2.5">
                    <span>⚠️</span>
                    <p>
                      You are operating as a Guest. To persist booking, please{' '}
                      <button type="button" onClick={() => setCurrentTab('login')} className="font-bold underline text-amber-900">
                        Sign In or Register
                      </button>{' '}
                      first.
                    </p>
                  </div>
                )}

                {/* Form fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="res-date" className="block text-xs font-semibold text-stone-700">Date of Dining</label>
                    <input
                      type="date"
                      id="res-date"
                      required
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="res-time" className="block text-xs font-semibold text-stone-700">Arrival Time</label>
                    <input
                      type="time"
                      id="res-time"
                      required
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="res-guests" className="block text-xs font-semibold text-stone-700">Expected Head Count</label>
                  <select
                    id="res-guests"
                    required
                    value={resGuests}
                    onChange={(e) => setResGuests(Number(e.target.value))}
                    className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="res-notes" className="block text-xs font-semibold text-stone-700">Special Requests (Optional)</label>
                  <textarea
                    id="res-notes"
                    rows={3}
                    value={resNotes}
                    onChange={(e) => setResNotes(e.target.value)}
                    placeholder="e.g. Near power outlet, quiet spot, gluten free diet"
                    className="w-full rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 text-xs shadow-md transition-colors cursor-pointer"
                  id="submit-reservation-btn"
                >
                  Send Reservation Request
                </button>
              </form>
            </div>
          </div>

        </div>
      )}

      {/* ==================== SUB-TAB 3: CATERING SERVICES & APPOINTMENTS ==================== */}
      {activeTab === 'catering' && (
        <div className="space-y-12" id="catering-view-pane">
          
          {/* Header section */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-800">
              Event Solutions By Chef Primo
            </span>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-amber-950 sm:text-3xl">
              Catering Services & Package Booking
            </h2>
            <p className="text-sm text-stone-600">
              From small office coffeetime meetings to grand academic celebrations - let us handle the kitchen logistics with high-grade espresso bars and hearty Filipino buffet platters.
            </p>
          </div>

          {/* Catering bundles display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="catering-bundles-panel">
            {CATERING_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-2xl border border-amber-100 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                id={`catering-pack-${pkg.id}`}
              >
                {pkg.id === 'cat-deluxe' && (
                  <div className="absolute top-0 right-0 rounded-bl-xl bg-amber-800 text-[9px] uppercase font-bold tracking-widest text-white px-3 py-1">
                    Best Value
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <h3 className="font-sans text-base font-extrabold text-amber-950 mb-1">{pkg.name}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2">{pkg.description}</p>
                  </div>

                  <div className="border-y border-amber-50 py-3.5">
                    <span className="text-[10px] text-stone-500 block uppercase font-bold">Estimated Cost</span>
                    <span className="font-sans text-2xl font-extrabold text-amber-950">
                      ₱{pkg.pricePerHead}
                    </span>
                    <span className="text-xs text-stone-500"> / guest head</span>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold text-stone-850 uppercase block">Package Includes:</span>
                    <ul className="space-y-2 text-xs text-stone-600" id={`catering-list-${pkg.id}`}>
                      {pkg.includes.map((item, idy) => (
                        <li key={idy} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-amber-50">
                  <button
                    onClick={() => {
                      setCatPackageId(pkg.id);
                      // Scroll to catering form manually or give focus comfort
                      const formEl = document.getElementById('catering-booking-form');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full rounded-lg bg-amber-50 border border-amber-200 text-amber-950 hover:bg-amber-100 font-bold py-2.5 text-xs transition-colors cursor-pointer"
                    id={`select-package-btn-${pkg.id}`}
                  >
                    Select this Package Bundle
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Appointment Form */}
          <div className="max-w-3xl mx-auto border border-amber-100 bg-amber-50/50 rounded-2xl p-6 sm:p-10" id="catering-booking-form">
            <div className="text-center space-y-2 mb-8">
              <h3 className="font-sans text-lg font-bold text-amber-950">Secure Your Catering Slot Appointment</h3>
              <p className="text-xs text-stone-500">Available across Laguna and Metro Manila. Fill in key event metrics below.</p>
            </div>

            <form onSubmit={handleCateringSubmit} className="space-y-6">
              {catStatusMsg && (
                <div
                  className={`rounded-lg p-4 text-xs ${
                    catStatusMsg.success ? 'bg-emerald-50 text-emerald-950 border border-emerald-100' : 'bg-red-50 text-red-950 border border-red-100'
                  }`}
                >
                  {catStatusMsg.text}
                </div>
              )}

              {!currentUser && (
                <div className="rounded-lg bg-orange-50 border border-orange-100 p-3.5 text-xs text-orange-950">
                  ⚠️ Guest notice: Please{' '}
                  <button type="button" onClick={() => setCurrentTab('login')} className="font-bold underline text-amber-900">
                    Sign In or Register
                  </button>{' '}
                  prior to planning catering, so we can connect this booking to your profile correctly.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="cat-event-name" className="block text-xs font-semibold text-stone-700">What is the Event Name/Occasion?</label>
                  <input
                    type="text"
                    id="cat-event-name"
                    required
                    value={catEventName}
                    onChange={(e) => setCatEventName(e.target.value)}
                    placeholder="e.g. Collegiate Graduation Banquet, Seminar Bar"
                    className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-amber-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cat-date" className="block text-xs font-semibold text-stone-700">Desired Date of Event</label>
                  <input
                    type="date"
                    id="cat-date"
                    required
                    value={catDate}
                    onChange={(e) => setCatDate(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-amber-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cat-guests" className="block text-xs font-semibold text-stone-700">Expected Guests count</label>
                  <input
                    type="number"
                    id="cat-guests"
                    required
                    min={10}
                    value={catGuests}
                    onChange={(e) => setCatGuests(Number(e.target.value))}
                    className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-amber-700"
                  />
                  <span className="text-[10px] text-stone-500 block">Catering service requires a minimum of 10 heads.</span>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="cat-pkg-select" className="block text-xs font-semibold text-stone-700">Selected Catering Package Package</label>
                  <select
                    id="cat-pkg-select"
                    value={catPackageId}
                    onChange={(e) => setCatPackageId(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-amber-700"
                  >
                    {CATERING_PACKAGES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} - ₱{p.pricePerHead}/head
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cat-address" className="block text-xs font-semibold text-stone-700">Delivery venue Address</label>
                <input
                  type="text"
                  id="cat-address"
                  required
                  value={catAddress}
                  onChange={(e) => setCatAddress(e.target.value)}
                  placeholder="Street No., Hall Room, Barangay, City/Province"
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-amber-700"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cat-notes" className="block text-xs font-semibold text-stone-700">Custom menu preferences or setup requests</label>
                <textarea
                  id="cat-notes"
                  rows={3}
                  value={catNotes}
                  onChange={(e) => setCatNotes(e.target.value)}
                  placeholder="Describe your desired theme, vegetarian alternatives, dessert substitutions here..."
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs outline-none focus:border-amber-700"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 text-xs shadow-md transition-all cursor-pointer"
                id="submit-catering-btn"
              >
                Send Catering Appointment Request
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
