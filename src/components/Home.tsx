import { motion } from 'motion/react';
import { Product, Announcement } from '../types';
import { Coffee, Calendar, Utensils, Megaphone, CheckCircle, ArrowRight, Star } from 'lucide-react';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  products: Product[];
  announcements: Announcement[];
  onAddToCart: (product: Product) => void;
  setSelectedCategory: (category: string) => void;
}

export default function Home({
  setCurrentTab,
  products,
  announcements,
  onAddToCart,
  setSelectedCategory,
}: HomeProps) {
  // Take first 3 active announcements
  const activeAnnouncements = announcements.filter(a => a.active).slice(0, 3);
  
  // Best sellers: Barako hot coffee, Spanish Latte, Special Bibingka, Pancit Canton
  const featuredIds = ['hc-1', 'hc-2', 'kk-1', 'bl-1'];
  const featuredProducts = products.filter(p => featuredIds.includes(p.id) && p.available);

  const handleQuickAccess = (tab: string, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentTab(tab);
  };

  return (
    <div className="flex flex-col space-y-16 pb-16" id="home-view-root">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-radial from-amber-50/70 via-amber-50/30 to-amber-100/10 py-20 sm:py-28 border-b border-amber-900/5" id="home-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            
            {/* Hero Left Content */}
            <div className="space-y-8 lg:col-span-7 flex flex-col items-start justify-center pr-2" id="hero-text-container">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 rounded-full bg-amber-100/80 px-4 py-1.5 text-xs font-semibold text-amber-900 border border-amber-200/50 shadow-xs"
              >
                <Star className="h-3.5 w-3.5 fill-amber-900 text-amber-900 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Award-winning Batangas Barako & Artisan Eats</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl leading-[1.1] sm:leading-[1.1] lg:leading-[1.08]"
              >
                Steaming Bold Flavors, <br />
                <span className="text-amber-800 bg-linear-to-r from-amber-800 to-amber-950 bg-clip-text text-transparent drop-shadow-xs decoration-amber-500/30 decoration-wavy underline underline-offset-8">Fresh Philippines Heritage</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="max-w-2xl text-base text-stone-600 sm:text-lg leading-relaxed font-sans"
              >
                Welcome to <strong className="text-stone-900 font-bold">GK Coffee By Primo</strong>. We serve real Batangas Kapeng Barako, premium iced espresso coffees, authentic home-cooked kakanin rice cakes, bilao fiesta platters, and hearty canteen meals configured for student-friendly price points.
              </motion.p>

              {/* Quick Access Grid Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 text-left"
                id="hero-call-to-actions"
              >
                <button
                  onClick={() => handleQuickAccess('services', 'all')}
                  className="flex items-center space-x-2 rounded-xl bg-amber-800 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-800/25 hover:bg-amber-900 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  id="hero-order-now-btn"
                >
                  <Coffee className="h-4.5 w-4.5" />
                  <span>Order Now (Pickup/Delivery)</span>
                </button>

                <button
                  onClick={() => handleQuickAccess('services', 'reservation')}
                  className="flex items-center space-x-2 rounded-xl bg-white border border-amber-250/70 px-6 py-3.5 text-sm font-bold text-stone-900 shadow-sm hover:bg-amber-50 hover:border-amber-400/80 hover:shadow-md transition-all duration-200 cursor-pointer"
                  id="hero-reserve-table-btn"
                >
                  <Calendar className="h-4.5 w-4.5 text-amber-800" />
                  <span className="bg-linear-to-r from-amber-900 to-amber-950 bg-clip-text font-bold">Reserve Table</span>
                </button>

                <button
                  onClick={() => handleQuickAccess('services', 'catering')}
                  className="flex items-center space-x-2 rounded-xl bg-amber-50 border border-amber-200 px-6 py-3.5 text-sm font-bold text-amber-900 hover:bg-amber-150/60 hover:shadow-xs transition-all cursor-pointer"
                  id="hero-book-catering-btn"
                >
                  <Utensils className="h-4.5 w-4.5 text-amber-800" />
                  <span>Our Catering Packages</span>
                </button>
              </motion.div>

              {/* Key Value Props */}
              <div className="grid grid-cols-3 gap-4 border-t border-amber-200/60 pt-6 text-stone-700 w-full">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4.5 w-4.5 text-amber-800 shrink-0" />
                  <span className="text-xs font-semibold text-stone-600">Student Friendly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4.5 w-4.5 text-amber-800 shrink-0" />
                  <span className="text-xs font-semibold text-stone-600">Islandwide Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4.5 w-4.5 text-amber-800 shrink-0" />
                  <span className="text-xs font-semibold text-stone-600">Authentic Recipes</span>
                </div>
              </div>

            </div>

            {/* Hero Right Media */}
            <div className="lg:col-span-5" id="hero-graphic-section">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mx-auto max-w-md lg:max-w-none"
              >
                {/* Decorative Background Glow */}
                <div className="absolute -inset-1.5 rounded-3xl bg-amber-500/25 blur-2xl opacity-70 animate-pulse duration-5000" />
                
                <div className="relative overflow-hidden rounded-2xl border-[6px] border-white bg-white shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800"
                    alt="GK Coffee Brewing"
                    className="h-80 w-full object-cover sm:h-[420px] transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white max-w-sm">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold">Authentic Brew</p>
                    <h3 className="font-sans text-xl font-extrabold text-white mt-1">Kapeng Barako of Batangas</h3>
                    <p className="mt-1 text-xs text-stone-200 leading-relaxed">Steamed fresh in our open kitchen workspace daily using premium harvest beans.</p>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ANNOUNCEMENTS BULLETIN (Sticky Board) */}
      {activeAnnouncements.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="home-announcements-bulletin">
          <div className="rounded-2xl bg-amber-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-amber-800/30 blur-2xl" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-amber-900 pb-4 mb-6 gap-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-800/60 text-amber-300">
                  <Megaphone className="h-5.5 w-5.5 animate-pulse" />
                </div>
                <div>
                  <h2 className="font-sans text-xl font-bold tracking-tight text-amber-100">Canteen Updates & Bulletins</h2>
                  <p className="text-xs text-amber-400/80">Stay tuned for local menus, schedule events, and campus updates.</p>
                </div>
              </div>
              <button
                onClick={() => handleQuickAccess('services', 'all')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-300 hover:text-white transition-colors"
              >
                <span>Check Available Food list</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="announcements-cards-grid">
              {activeAnnouncements.map((ann, idx) => (
                <div 
                  key={ann.id} 
                  className="rounded-xl bg-white/5 p-5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-between"
                  id={`announcement-card-${ann.id}`}
                >
                  <div>
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block mb-2 font-semibold">
                      Posted: {ann.date}
                    </span>
                    <h3 className="font-sans text-base font-bold text-white mb-2">{ann.title}</h3>
                    <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">{ann.content}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="text-[10px] uppercase font-bold text-amber-400">★ Campus Notice</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. FEATURED PRODUCTS (BEST SELLERS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="featured-products-section">
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-850">
            Customer Favorites
          </span>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Featured Coffee & Canteen Bestsellers
          </h2>
          <p className="text-sm text-stone-600">
            Handpicked heritage recipes, brewed coffee beans, and savory platters. Order online for swift pickup or delivery right to your dormitory, classroom, or office desk.
          </p>
        </div>

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8" id="featured-items-grid">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-stone-100 bg-white shadow-xs transition-all duration-305 hover:scale-[1.01] hover:shadow-xl"
              id={`featured-product-card-${product.id}`}
            >
              {/* Product Thumbnail wrapper */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-100 sm:aspect-[4/3]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 rounded-full bg-amber-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  Best Seller
                </span>
              </div>

              {/* Card Meta Content */}
              <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-amber-700">
                    {product.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-sans text-base font-bold text-stone-900">
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-50">
                  <span className="font-sans text-base font-extrabold text-amber-950">
                    ₱{product.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => onAddToCart(product)}
                    className="rounded-lg bg-amber-800 hover:bg-amber-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors cursor-pointer"
                    id={`add-to-cart-featured-${product.id}`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Entire Menu CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => handleQuickAccess('services', 'all')}
            className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-850 text-white px-6 py-3 font-semibold text-sm transition-all shadow-md cursor-pointer"
            id="view-full-menu-cta"
          >
            <span>Explore Full Menu Grid</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 4. BANNER ABOUT & VALUES SHOWCASE */}
      <section className="bg-stone-900 text-stone-100 py-16" id="home-brand-values">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-700 text-white">
                <Coffee className="h-5.5 w-5.5" />
              </div>
              <h3 className="font-sans text-lg font-bold">1. Grade-A Local Barako</h3>
              <p className="text-sm text-stone-400">
                Our Batangas Barako coffee beans are harvested by local farmers, slow roasted over woodfire, and ground fresh to power your academic study sessions.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-700 text-white">
                <Utensils className="h-5.5 w-5.5" />
              </div>
              <h3 className="font-sans text-lg font-bold">2. Traditional Canteen Pride</h3>
              <p className="text-sm text-stone-400">
                No shortcut pre-mixed food solutions. All of our meals, pancit platters, and seasonal sweet kakanin treats are handmade by the Primo family recipe.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-700 text-white">
                <Calendar className="h-5.5 w-5.5" />
              </div>
              <h3 className="font-sans text-lg font-bold">3. Full Catering Solutions</h3>
              <p className="text-sm text-stone-400">
                Planning a collegiate seminar or family gathering? We supply table setups, live espresso barista stations, and grand traditional Filipino buffet dishes.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
