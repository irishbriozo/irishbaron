import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import LoginRegister from './components/LoginRegister';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import CartModal from './components/CartModal';
import UserDashboard from './components/UserDashboard';

import { User, Product, Announcement, Order, Reservation, CateringBooking, CartItem, Review } from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_ORDERS, 
  INITIAL_RESERVATIONS, 
  INITIAL_CATERING_BOOKINGS,
  INITIAL_REVIEWS
} from './data';

export default function App() {
  // --- 1. SEED AND POPULATE INITIAL STATE (WITH LOCALSTORAGE REFLATION) ---
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('primo_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentTab, setCurrentTab] = useState<'home' | 'services' | 'about' | 'contact' | 'login' | 'admin' | 'dashboard'>(() => {
    const saved = localStorage.getItem('primo_tab');
    return (saved as any) || 'home';
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('primo_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('primo_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('primo_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('primo_reservations');
    return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
  });

  const [cateringBookings, setCateringBookings] = useState<CateringBooking[]>(() => {
    const saved = localStorage.getItem('primo_catering');
    return saved ? JSON.parse(saved) : INITIAL_CATERING_BOOKINGS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('primo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('primo_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- 2. STATE PERSISTENT STATE SAVERS ---
  useEffect(() => {
    localStorage.setItem('primo_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('primo_user', currentUser ? JSON.stringify(currentUser) : '');
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('primo_tab', currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('primo_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('primo_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('primo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('primo_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('primo_catering', JSON.stringify(cateringBookings));
  }, [cateringBookings]);

  useEffect(() => {
    localStorage.setItem('primo_cart', JSON.stringify(cart));
  }, [cart]);


  // --- 3. SESSION HANDLER ACTIONS ---
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setCurrentTab('admin');
    } else {
      setCurrentTab('services');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setCurrentTab('home');
  };

  // --- 4. CART & ORDER ACTIONS ---
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const match = prev.find(item => item.product.id === product.id);
      if (match) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    // Open cart drawer immediately to provide quick visual interaction feedback
    setIsCartOpen(true);
  };

  const handlePlaceOrder = (details: {
    type: 'pickup' | 'delivery';
    address?: string;
    notes?: string;
    paymentMethod: string;
    total: number;
    discountType?: string;
    discountAmount?: number;
  }) => {
    if (!currentUser) return { success: false, orderId: '', error: 'Session unauthorized.' };

    const newOrder: Order = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      userRole: currentUser.role,
      phone: currentUser.phone,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total: details.total,
      status: 'pending',
      type: details.type,
      address: details.address,
      notes: details.notes,
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [...prev, newOrder]);
    return { success: true, orderId: newOrder.id };
  };

  // --- 5. RESERVATION ACTION TRIGGER ---
  const handleBookReservation = (resData: {
    date: string;
    time: string;
    guestsCount: number;
    notes?: string;
  }) => {
    if (!currentUser) return { success: false, message: 'Must login first.' };

    const newRes: Reservation = {
      id: 'RES-' + Math.floor(1000 + Math.random() * 9000),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      phone: currentUser.phone,
      date: resData.date,
      time: resData.time,
      guestsCount: resData.guestsCount,
      notes: resData.notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setReservations(prev => [...prev, newRes]);
    return { success: true, message: 'Reservation logged.' };
  };

  // --- 6. CATERING ACTION TRIGGER ---
  const handleBookCatering = (catData: {
    eventName: string;
    date: string;
    expectedGuests: number;
    packageId: string;
    packageName: string;
    address: string;
    notes?: string;
  }) => {
    if (!currentUser) return { success: false, message: 'Must login first.' };

    const newCat: CateringBooking = {
      id: 'CAT-' + Math.floor(1000 + Math.random() * 9000),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      phone: currentUser.phone,
      eventName: catData.eventName,
      date: catData.date,
      expectedGuests: catData.expectedGuests,
      packageId: catData.packageId,
      packageName: catData.packageName,
      address: catData.address,
      notes: catData.notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setCateringBookings(prev => [...prev, newCat]);
    return { success: true, message: 'Catering booking complete.' };
  };

  const handleAddReview = (itemId: string, userName: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: 'REV-' + Math.floor(100000 + Math.random() * 900000),
      itemId,
      userName: userName.trim() || 'Anonymous Guest',
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' as const } : o));
  };

  const handleCancelReservation = (resId: string) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: 'rejected' as const } : r));
  };

  const handleCancelCatering = (bookingId: string) => {
    setCateringBookings(prev => prev.map(c => c.id === bookingId ? { ...c, status: 'rejected' as const } : c));
  };

  return (
    <div className="min-h-screen bg-stone-50/50 flex flex-col justify-between" id="gk-cafe-app">
      
      {/* 1. Header Toolbar Navigation */}
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        currentTab={currentTab}
        setCurrentTab={(tab: any) => setCurrentTab(tab)}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 2. Main Tabbed Body Sections */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            setCurrentTab={(tab: any) => setCurrentTab(tab)}
            products={products}
            announcements={announcements}
            onAddToCart={handleAddToCart}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentTab === 'services' && (
          <Services
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            currentUser={currentUser}
            onBookReservation={handleBookReservation}
            onBookCatering={handleBookCatering}
            setCurrentTab={(tab: any) => setCurrentTab(tab)}
            reviews={reviews}
            onAddReview={handleAddReview}
          />
        )}

        {currentTab === 'about' && <About />}

        {currentTab === 'contact' && <Contact />}

        {currentTab === 'login' && (
          <LoginRegister
            onLoginSuccess={handleLoginSuccess}
            setCurrentTab={(tab: any) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'dashboard' && (
          <UserDashboard
            currentUser={currentUser}
            orders={orders}
            reservations={reservations}
            cateringBookings={cateringBookings}
            onCancelOrder={handleCancelOrder}
            onCancelReservation={handleCancelReservation}
            onCancelCatering={handleCancelCatering}
            setCurrentTab={(tab: any) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard
            currentUser={currentUser}
            orders={orders}
            setOrders={setOrders}
            reservations={reservations}
            setReservations={setReservations}
            cateringBookings={cateringBookings}
            setCateringBookings={setCateringBookings}
            products={products}
            setProducts={setProducts}
            announcements={announcements}
            setAnnouncements={setAnnouncements}
            setCurrentTab={(tab: any) => setCurrentTab(tab)}
          />
        )}
      </main>

      {/* 3. Footer info section */}
      <Footer setCurrentTab={(tab: any) => setCurrentTab(tab)} />

      {/* 4. Slide-over Shopping Cart Modal Drawer */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        currentUser={currentUser}
        onPlaceOrder={handlePlaceOrder}
        setCurrentTab={(tab: any) => setCurrentTab(tab)}
      />

    </div>
  );
}
