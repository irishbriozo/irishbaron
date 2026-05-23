import React, { useState, useEffect } from 'react';
import { Product, User, CartItem, Review } from '../types';
import { CATERING_PACKAGES } from '../data';
import { Coffee, Calendar, Utensils, Search, CheckCircle, Clock, MapPin, Users, Info, ShieldCheck, Star, MessageSquare } from 'lucide-react';

interface ServicesProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  currentUser: User | null;
  onBookReservation: (resData: { date: string; time: string; guestsCount: number; notes?: string }) => { success: boolean; message: string };
  onBookCatering: (catData: { eventName: string; date: string; expectedGuests: number; packageId: string; packageName: string; address: string; notes?: string }) => { success: boolean; message: string };
  setCurrentTab: (tab: string) => void;
  reviews?: Review[];
  onAddReview?: (itemId: string, userName: string, rating: number, comment: string) => void;
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
  reviews = [],
  onAddReview,
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

  // Reviews view / submission state
  const [selectedReviewItem, setSelectedReviewItem] = useState<{ id: string; name: string; image: string } | null>(null);
  
  // New review form fields
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewFormError, setReviewFormError] = useState('');
  const [reviewFormSuccess, setReviewFormSuccess] = useState(false);

  // Sync reviewer name with logged-in user profile
  useEffect(() => {
    if (selectedReviewItem) {
      if (currentUser) {
        setNewReviewName(currentUser.name);
      } else {
        setNewReviewName('');
      }
      setNewReviewRating(5);
      setNewReviewComment('');
      setReviewFormError('');
      setReviewFormSuccess(false);
    }
  }, [currentUser, selectedReviewItem]);

  // Stars helper function for modular render
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`h-3 w-3 ${
              s <= Math.round(rating)
                ? 'fill-amber-500 text-amber-500'
                : 'text-stone-200 fill-stone-100'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleReviewFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReviewItem) return;
    
    if (!newReviewComment.trim()) {
      setReviewFormError('Please write a comment first.');
      return;
    }
    
    if (onAddReview) {
      onAddReview(
        selectedReviewItem.id, 
        newReviewName.trim() || 'Anonymous Guest', 
        newReviewRating, 
        newReviewComment.trim()
      );
      setReviewFormSuccess(true);
      setNewReviewComment('');
      setReviewFormError('');
      setTimeout(() => {
        setReviewFormSuccess(false);
      }, 4000);
    }
  };

  // Sync state if selectedCategory turns into reservation or catering from Home clicks
  useEffect(() => {
    if (selectedCategory === 'reservation') {
      setActiveTab('reservation');
      setSelectedCategory('all');
    } else if (selectedCategory === 'catering') {
      setActiveTab('catering');
      setSelectedCategory('all');
    }
  }, [selectedCategory, setSelectedCategory]);

  // Categories helper
  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'hot-coffee', label: 'Hot Coffee' },
    { id: 'iced-coffee', label: 'Iced Coffee' },
    { id: 'bilao', label: 'Bilao Platters' },
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
        text: `Outstanding! Your catering request for "${catEventName}" on ${catDate} (${packageName}) has been logged in GK Cafe's queue. An administrator will call you shortly at ${currentUser.phone} to finalize details.`,
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
            <p className="text-xs text-stone-500">Pick from our freshly steamed food menu, or book high-quality venue catering packages.</p>
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
              onClick={() => { setActiveTab('catering'); setSelectedCategory('all'); }}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'catering' ? 'bg-amber-800 text-white shadow-xs' : 'text-stone-600 hover:text-amber-900'
              }`}
              id="subtab-catering"
            >
              <Utensils className="h-4 w-4" />
              <span>2. Catering Services</span>
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

                      {/* Average Product Rating Display */}
                      {(() => {
                        const itemReviews = reviews.filter(r => r.itemId === product.id);
                        const avg = itemReviews.length > 0 ? itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length : 0;
                        return (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReviewItem({ id: product.id, name: product.name, image: product.image });
                            }}
                            className="flex items-center justify-between pt-1.5 cursor-pointer hover:opacity-85 group/stars"
                            title="View customer review feedback"
                          >
                            <div className="flex items-center gap-1.5">
                              {renderStars(avg)}
                              <span className="text-[10px] font-sans text-stone-605 font-bold group-hover/stars:underline">
                                {itemReviews.length > 0 ? `${avg.toFixed(1)} (${itemReviews.length})` : '0 feedback'}
                              </span>
                            </div>
                            <span className="text-[9px] font-bold text-amber-800 hover:text-amber-955 underline decoration-dotted">
                              Rate/Review
                            </span>
                          </div>
                        );
                      })()}
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
                className="rounded-2xl border border-amber-100 bg-white shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
                id={`catering-pack-${pkg.id}`}
              >
                {pkg.id === 'cat-deluxe' && (
                  <div className="absolute top-3 right-3 z-10 rounded-full bg-amber-800 text-[10px] uppercase font-bold tracking-widest text-white px-3 py-1 shadow-md">
                    Best Value
                  </div>
                )}

                <div>
                  {/* Photo of the Catering Menu Package */}
                  <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                    <img
                      src={(pkg as any).image}
                      alt={pkg.name}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-6 space-y-5">
                    <div>
                      <h3 className="font-sans text-base font-extrabold text-amber-950 mb-1">{pkg.name}</h3>
                      <p className="text-xs text-stone-500 line-clamp-2">{pkg.description}</p>
                      
                      {/* Average Catering Package Rating Display */}
                      {(() => {
                        const itemReviews = reviews.filter(r => r.itemId === pkg.id);
                        const avg = itemReviews.length > 0 ? itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length : 0;
                        return (
                          <div 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReviewItem({ id: pkg.id, name: pkg.name, image: (pkg as any).image });
                            }}
                            className="flex items-center justify-between mt-3 px-2.5 py-1.5 rounded-lg bg-amber-50/50 border border-amber-100/45 cursor-pointer hover:bg-amber-100/50 transition-colors group/cat-stars"
                            title="View customer review feedback"
                          >
                            <div className="flex items-center gap-1.5">
                              {renderStars(avg)}
                              <span className="text-[10px] font-sans text-amber-900 font-bold">
                                {itemReviews.length > 0 ? `${avg.toFixed(1)} (${itemReviews.length} reviews)` : 'No reviews'}
                              </span>
                            </div>
                            <span className="text-[9px] font-bold text-amber-800 hover:text-amber-950 underline decoration-dotted">
                              Discuss
                            </span>
                          </div>
                        );
                      })()}
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
                </div>

                <div className="p-6 pt-0 mt-2">
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

      {/* ========================================================================= */}
      {/* ======================= INTERACTIVE REVIEWS MODAL ======================= */}
      {/* ========================================================================= */}
      {selectedReviewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/65 p-4 backdrop-blur-xs" id="reviews-overlay-modal">
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header section with image backdrop */}
            <div className="relative h-28 bg-stone-950 overflow-hidden flex items-end">
              <img 
                src={selectedReviewItem.image} 
                alt={selectedReviewItem.name} 
                className="absolute inset-0 h-full w-full object-cover opacity-45 grayscale-10 scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 to-transparent" />
              <div className="relative z-10 p-5 w-full flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-amber-400 font-mono uppercase tracking-widest font-extrabold block">Customer Feedback Book</span>
                  <h3 className="text-white text-base font-bold leading-tight truncate max-w-xs">{selectedReviewItem.name}</h3>
                </div>
                <button 
                  type="button" 
                  onClick={() => setSelectedReviewItem(null)} 
                  className="rounded-lg bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 text-xs font-bold transition-all cursor-pointer border border-white/20 font-sans"
                  id="close-reviews-modal"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Rating snapshot summary */}
              {(() => {
                const itemReviews = reviews.filter(r => r.itemId === selectedReviewItem.id);
                const avg = itemReviews.length > 0 ? itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length : 0;
                return (
                  <div className="bg-amber-50/40 border border-amber-100/60 rounded-xl p-4 flex items-center gap-5">
                    <div className="text-center shrink-0 pr-4 border-r border-amber-100">
                      <span className="text-3xl font-black text-amber-950 block">{avg > 0 ? avg.toFixed(1) : '0.0'}</span>
                      <span className="text-[10px] text-stone-500 font-medium">out of 5.0</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        {renderStars(avg)}
                        <span className="text-xs font-bold text-stone-800">{itemReviews.length} Verified ratings</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                        Our community shares direct ratings and descriptions to keep tastes freshly verified!
                      </p>
                    </div>
                  </div>
                );
              })()}

              {/* List of customer comments */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1 w-full border-b pb-1.5 border-stone-100">
                  <MessageSquare className="h-3.5 w-3.5 text-amber-800" />
                  <span>Comments & Reviews ({reviews.filter(r => r.itemId === selectedReviewItem.id).length})</span>
                </h4>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {reviews.filter(r => r.itemId === selectedReviewItem.id).length > 0 ? (
                    reviews
                      .filter(r => r.itemId === selectedReviewItem.id)
                      .map((rev) => (
                        <div key={rev.id} className="rounded-xl bg-stone-50 border border-stone-200/50 p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-6 w-6 rounded-full bg-amber-800 text-white text-[10px] uppercase font-bold flex items-center justify-center">
                                {rev.userName.charAt(0)}
                              </div>
                              <span className="text-xs font-bold text-stone-800">{rev.userName}</span>
                            </div>
                            <div className="flex flex-col items-end">
                              {renderStars(rev.rating)}
                              <span className="text-[8px] text-stone-400 font-mono mt-0.5">
                                {new Date(rev.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-stone-600 leading-normal italic pl-8">
                            &ldquo;{rev.comment}&rdquo;
                          </p>
                        </div>
                      ))
                  ) : (
                    <p className="text-center py-6 text-xs text-stone-500 italic bg-stone-50/50 border border-dashed rounded-xl">
                      No custom comments posted yet. Be the first to share your experience below!
                    </p>
                  )}
                </div>
              </div>

              {/* Comment submission Form */}
              <div className="border-t border-stone-100 pt-5 space-y-3.5">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                  Share Your Experience Feedback
                </h4>

                <form onSubmit={handleReviewFormSubmit} className="space-y-4">
                  {reviewFormError && (
                    <div className="text-[11px] text-red-700 bg-red-50 border border-red-100 rounded-lg p-2 font-medium">
                      ⚠️ {reviewFormError}
                    </div>
                  )}
                  
                  {reviewFormSuccess && (
                    <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg p-2 font-medium">
                      ✓ Thank you! Your feedback comment was added in memory and recalculated.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold text-stone-500">Your Full Name</label>
                      <input 
                        type="text" 
                        value={newReviewName}
                        onChange={(e) => setNewReviewName(e.target.value)}
                        placeholder="Anonymous Diner"
                        className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 outline-none focus:border-amber-700 bg-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase font-bold text-stone-500">Tap to Rate Stars</label>
                      <div className="flex items-center gap-1 h-[32px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="hover:scale-110 transition-transform cursor-pointer"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                star <= newReviewRating
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-stone-300 fill-transparent'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-stone-500">Your Review / Comment</label>
                    <textarea 
                      rows={2}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="How did you find the flavors, portioning and service?"
                      required
                      className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 outline-none focus:border-amber-700 bg-white"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Submit Customer Feedback
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
