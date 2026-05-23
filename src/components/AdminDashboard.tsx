import React, { useState } from 'react';
import { User, Order, Reservation, CateringBooking, Product, Announcement } from '../types';
import { CATERING_PACKAGES } from '../data';
import { 
  TrendingUp, ShoppingBag, Calendar, Utensils, 
  Trash2, ShieldAlert, Check, X, Play, Truck, 
  Plus, Edit, Eye, Archive, BellRing, RefreshCw 
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User | null;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  cateringBookings: CateringBooking[];
  setCateringBookings: React.Dispatch<React.SetStateAction<CateringBooking[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  setCurrentTab: (tab: string) => void;
}

export default function AdminDashboard({
  currentUser,
  orders,
  setOrders,
  reservations,
  setReservations,
  cateringBookings,
  setCateringBookings,
  products,
  setProducts,
  announcements,
  setAnnouncements,
  setCurrentTab,
}: AdminDashboardProps) {
  // Tabs: 'analytics' | 'orders' | 'reservations' | 'catering' | 'products' | 'announcements'
  const [adminTab, setAdminTab] = useState<'analytics' | 'orders' | 'reservations' | 'catering' | 'products' | 'announcements'>('analytics');
  
  // Interactive KPI donut pie chart hovered slice indicator
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Multi-choice state variables for adding product
  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(100);
  const [newProdCat, setNewProdCat] = useState<'hot-coffee' | 'iced-coffee' | 'bilao'>('hot-coffee');
  const [newProdImg, setNewProdImg] = useState('');
  const [productSuccess, setProductSuccess] = useState('');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const handleProductEditSelect = (prod: Product) => {
    setEditingProductId(prod.id);
    setNewProdName(prod.name);
    setNewProdDesc(prod.description);
    setNewProdPrice(prod.price);
    setNewProdCat(prod.category as any);
    setNewProdImg(prod.image);
  };

  const handleCancelProductEdit = () => {
    setEditingProductId(null);
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice(100);
    setNewProdCat('hot-coffee');
    setNewProdImg('');
  };

  // Announcement state addition
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [annSuccess, setAnnSuccess] = useState('');

  // Guard access to admin
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="mx-auto max-w-md py-16 px-4 text-center space-y-6" id="unauthorized-access-banner">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 mx-auto shadow-md">
          <ShieldAlert className="h-8 w-8 text-amber-805" />
        </div>
        <div className="space-y-2">
          <h3 className="font-sans text-xl font-bold text-stone-900">Admin Platform Restriction</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            This module contains GK Cafe By Primo operational dials. To view or execute status adjustments, please sign in using Chef Primo administrator credentials.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setCurrentTab('login')}
            className="rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold py-2.5 px-6 text-xs shadow-md transition-colors cursor-pointer"
          >
            Go to Admin Sign In Presets
          </button>
        </div>
      </div>
    );
  }

  // Analytics Helpers
  const totalCompletedSales = orders
    .filter(o => o.status === 'completed' || o.status === 'delivered')
    .reduce((sum, order) => sum + order.total, 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const pendingReservationsCount = reservations.filter(r => r.status === 'pending').length;
  const pendingCateringCount = cateringBookings.filter(c => c.status === 'pending').length;

  // Handler functions for Order Management
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Handler functions for Table Reservations
  const updateReservationStatus = (resId: string, newStatus: Reservation['status']) => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status: newStatus } : r));
  };

  // Handler functions for Catering
  const updateCateringStatus = (catId: string, newStatus: CateringBooking['status']) => {
    setCateringBookings(prev => prev.map(c => c.id === catId ? { ...c, status: newStatus } : c));
  };

  // Toggle food availability
  const toggleProductAvailability = (prodId: string) => {
    setProducts(prev => prev.map(p => p.id === prodId ? { ...p, available: !p.available } : p));
  };

  // Delete product logic
  const handleProductDelete = (prodId: string) => {
    setProducts(prev => prev.filter(p => p.id !== prodId));
  };

  // Post or Edit Food Menu Item
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdDesc || newProdPrice <= 0) return;

    const defaultImg = newProdImg || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600';

    if (editingProductId) {
      setProducts(prev => prev.map(p => p.id === editingProductId ? {
        ...p,
        name: newProdName,
        description: newProdDesc,
        price: Number(newProdPrice),
        category: newProdCat,
        image: defaultImg
      } : p));
      setProductSuccess(`Success! "${newProdName}" has been updated.`);
      handleCancelProductEdit();
    } else {
      const newProduct: Product = {
        id: 'custom-' + Math.random().toString(36).substr(2, 4),
        name: newProdName,
        description: newProdDesc,
        price: Number(newProdPrice),
        category: newProdCat,
        image: defaultImg,
        available: true,
      };

      setProducts(prev => [newProduct, ...prev]);
      setProductSuccess(`Success! "${newProdName}" added onto menu.`);
      
      // Clear inputs
      setNewProdName('');
      setNewProdDesc('');
      setNewProdPrice(100);
      setNewProdImg('');
    }

    setTimeout(() => setProductSuccess(''), 4000);
  };

  // Add Announcement
  const handleAddAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnContent) return;

    const newAnn: Announcement = {
      id: 'ann-' + Math.random().toString(36).substr(2, 4),
      title: newAnnTitle,
      content: newAnnContent,
      date: new Date().toISOString().split('T')[0],
      active: true,
    };

    setAnnouncements(prev => [newAnn, ...prev]);
    setAnnSuccess(`Broadcast posted: "${newAnnTitle}"`);
    
    setNewAnnTitle('');
    setNewAnnContent('');

    setTimeout(() => setAnnSuccess(''), 4000);
  };

  // Toggle active announcement status
  const toggleAnnouncementStatus = (annId: string) => {
    setAnnouncements(prev => prev.map(a => a.id === annId ? { ...a, active: !a.active } : a));
  };

  // Delete Announcement
  const deleteAnnouncement = (annId: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== annId));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 pb-20" id="admin-dashboard-view-root">
      
      {/* Header section with credentials overview */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-amber-100 pb-5 gap-4" id="admin-summary-header">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-mono text-xs uppercase text-amber-800 font-bold block">Live Cafe Operational Command</span>
          </div>
          <h2 className="font-sans text-2xl font-extrabold text-stone-900 sm:text-3xl mt-1">GK Cafe Administrative Control</h2>
          <p className="text-xs text-stone-500 mt-1">Analyze revenue stats, dispatch orders, approve dine-in bookings, and curate cafe menus.</p>
        </div>

        {/* Cafe operational metrics indicators */}
        <div className="flex gap-3 text-xs font-sans overflow-x-auto pb-1" id="admin-tab-selection">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl shrink-0 cursor-pointer transition-all ${
              adminTab === 'analytics' ? 'bg-amber-800 text-white shadow-md' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            📊 Analytics Hub
          </button>

          <button
            onClick={() => setAdminTab('orders')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl shrink-0 cursor-pointer transition-all ${
              adminTab === 'orders' ? 'bg-amber-800 text-white shadow-md' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            Orders Queue ({pendingOrdersCount})
          </button>

          <button
            onClick={() => setAdminTab('catering')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl shrink-0 cursor-pointer transition-all ${
              adminTab === 'catering' ? 'bg-amber-800 text-white shadow-md' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            Catering Queue ({pendingCateringCount})
          </button>
          
          <button
            onClick={() => setAdminTab('products')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl shrink-0 cursor-pointer transition-all ${
              adminTab === 'products' ? 'bg-amber-800 text-white shadow-md' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            Curate Menu ({products.length})
          </button>
        </div>
      </div>

      {/* Primary operational statistics row (Upper Analytics Overview) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="admin-kpi-grid">
        <div className="bg-white p-5 border border-amber-100/60 rounded-xl shadow-xs">
          <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">Gross Sales Revenue</span>
          <span className="text-xl font-extrabold text-amber-950 block mt-1">₱{totalCompletedSales.toFixed(2)}</span>
          <span className="text-[10px] text-emerald-800 flex items-center gap-1 mt-0.5 font-semibold">
            <TrendingUp className="h-3 w-3" />
            <span>Success Dispatch Orders</span>
          </span>
        </div>

        <div className="bg-white p-5 border border-amber-100/60 rounded-xl shadow-xs">
          <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">Orders Queue</span>
          <span className="text-xl font-extrabold text-amber-950 block mt-1">{pendingOrdersCount}</span>
          <span className="text-[10px] text-stone-500 mt-0.5 block">Pending & Preparing state</span>
        </div>

        <div className="bg-white p-5 border border-amber-100/60 rounded-xl shadow-xs">
          <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">Catering Appointments</span>
          <span className="text-xl font-extrabold text-amber-950 block mt-1">{pendingCateringCount}</span>
          <span className="text-[10px] text-stone-500 mt-0.5 block">Needs contract phone checks</span>
        </div>
      </div>

      {/* Secondary Sub-navigation for secondary features */}
      <div className="flex border-b border-stone-100 justify-start gap-8" id="admin-subtabs">
        <button
          onClick={() => setAdminTab('analytics')}
          className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer ${
            adminTab === 'analytics' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          📊 Analytics Hub
        </button>

        <button
          onClick={() => setAdminTab('orders')}
          className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer ${
            adminTab === 'orders' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          1. Customer Orders
        </button>

        <button
          onClick={() => setAdminTab('catering')}
          className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer ${
            adminTab === 'catering' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          2. Catering Bookings
        </button>

        <button
          onClick={() => setAdminTab('products')}
          className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer ${
            adminTab === 'products' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          3. Stock & Menu curator
        </button>

        <button
          onClick={() => setAdminTab('announcements')}
          className={`pb-2.5 text-xs font-bold transition-colors cursor-pointer ${
            adminTab === 'announcements' ? 'text-amber-800 border-b-2 border-amber-800' : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          4. Broadcast Board
        </button>
      </div>

      {/* ================= DYNAMIC ENTERPRISE PIE CHART CALCULATIONS ================= */}
      {(() => {
        // Setup raw count mappings 
        const successDispatchedCount = orders.filter(o => o.status === 'completed' || o.status === 'delivered').length;
        const queueCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
        const cateringCount = cateringBookings.filter(c => c.status === 'pending' || c.status === 'accepted').length;

        const totalSegmentsCount = successDispatchedCount + queueCount + cateringCount;

        const chartData = [
          {
            id: 'success',
            label: 'Success Dispatch Orders',
            count: successDispatchedCount,
            revenueRelated: true,
            color: '#d97706', // amber-600
            hoverColor: '#b45309', // amber-700
            description: 'Fulfilled & successfully dispatched customer food/beverage checkout values',
            rawPercent: totalSegmentsCount > 0 ? (successDispatchedCount / totalSegmentsCount) * 100 : 33.33
          },
          {
            id: 'queue',
            label: 'Orders Queue',
            count: queueCount,
            revenueRelated: false,
            color: '#0d9488', // teal-600
            hoverColor: '#0f766e', // teal-700
            description: 'Customer items in queue checkouts, pending kitchen preparation status',
            rawPercent: totalSegmentsCount > 0 ? (queueCount / totalSegmentsCount) * 100 : 33.33
          },
          {
            id: 'catering',
            label: 'Catering Appointments',
            count: cateringCount,
            revenueRelated: false,
            color: '#4f46e5', // indigo-600
            hoverColor: '#4338ca', // indigo-700
            description: 'Corporate catering reservations, bilao feasts schedules and banquets booked',
            rawPercent: totalSegmentsCount > 0 ? (cateringCount / totalSegmentsCount) * 100 : 33.33
          }
        ];

        const hoSegData = chartData.find(seg => seg.id === hoveredSegment);
        const activeDetail = hoSegData || {
          id: 'total',
          label: 'Total Metrics',
          count: totalSegmentsCount,
          description: 'Overall active metric indicators tracked in security ledger systems.',
          rawPercent: 100
        };

        return adminTab === 'analytics' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="admin-analytics-segment">
            
            {/* Card Left: The Pie/Donut Chart */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-amber-800 block">Dynamic Distribution Diagram</span>
                <h3 className="font-sans text-base font-bold text-stone-900 mt-1">Operational Allocation Pie Chart</h3>
                <p className="text-xs text-stone-500 mt-1">Surgical proportions representing current order flows, catering contracts, and completed dispatches.</p>
              </div>

              <div className="flex flex-col items-center justify-center py-6 relative">
                {/* SVG Centered Circular Donut */}
                <div className="relative w-56 h-56">
                  <svg viewBox="0 0 100 100" className="w-full h-full rotate-[-90deg]">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="35" 
                      stroke="#f5f5f4" 
                      strokeWidth="9" 
                      fill="transparent" 
                    />
                    {(() => {
                      let accumulated = 0;
                      return chartData.map((seg) => {
                        const val = seg.rawPercent;
                        const circ = 219.911; // 2 * Math.PI * 35
                        const strokeDasharray = `${(val / 100) * circ} ${circ}`;
                        const strokeDashoffset = `${-((accumulated / 100) * circ)}`;
                        accumulated += val;
                        const isHovered = hoveredSegment === seg.id;
                        
                        return (
                          <circle
                            key={seg.id}
                            cx="50"
                            cy="50"
                            r="35"
                            stroke={seg.color}
                            strokeWidth={isHovered ? "12" : "9"}
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            fill="transparent"
                            strokeLinecap="round"
                            className="transition-all duration-300 cursor-pointer origin-center"
                            style={{
                              transformOrigin: '50% 50%',
                              opacity: hoveredSegment && !isHovered ? 0.45 : 1
                            }}
                            onMouseEnter={() => setHoveredSegment(seg.id)}
                            onMouseLeave={() => setHoveredSegment(null)}
                          />
                        );
                      });
                    })()}
                  </svg>

                  {/* Absolute Center Hole description */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 pointer-events-none">
                    <span className="text-[10px] text-stone-400 uppercase font-mono tracking-wider">
                      {activeDetail.id === 'total' ? 'Total Volume' : activeDetail.label}
                    </span>
                    <span className="text-3xl font-black text-stone-900 mt-0.5">
                      {activeDetail.count}
                    </span>
                    <span className="text-[10.5px] text-stone-500 font-medium font-sans">
                      {activeDetail.id === 'total' ? 'Data Units' : `${activeDetail.rawPercent?.toFixed(1)}% share`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Informative footer dynamic banner */}
              <div className="bg-stone-50 text-[11px] text-stone-605 p-3 rounded-xl border border-stone-150 flex items-center justify-center gap-1.5 min-h-[44px] italic leading-normal text-center font-sans">
                &ldquo;{activeDetail.description}&rdquo;
              </div>
            </div>

            {/* Card Right: Interactive Legend List progress controllers */}
            <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-amber-800 block">Performance Analysis</span>
                <h3 className="font-sans text-base font-bold text-stone-900 mt-1">Operational Metrics Ledger</h3>
                <p className="text-xs text-stone-500 mt-1">Real-time calculations corresponding to user interactions and administrator status handshakes.</p>
              </div>

              <div className="space-y-4">
                {chartData.map((seg) => {
                  const isHovered = hoveredSegment === seg.id;
                  return (
                    <div
                      key={seg.id}
                      className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isHovered 
                          ? 'border-amber-200 bg-amber-50/20 shadow-xs translate-x-1' 
                          : 'border-stone-150 hover:border-amber-100 hover:bg-stone-50/40'
                      }`}
                      onMouseEnter={() => setHoveredSegment(seg.id)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                          <span className="text-xs font-bold text-stone-800 font-sans">{seg.label}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-stone-900">{seg.count} item{seg.count !== 1 ? 's' : ''}</span>
                          <span className="text-[10px] text-stone-500 block font-mono">({seg.rawPercent.toFixed(1)}%)</span>
                        </div>
                      </div>

                      {/* Bar indicator meter */}
                      <div className="w-full bg-stone-100 h-2 rounded-full mt-3 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${seg.rawPercent}%`,
                            backgroundColor: seg.color
                          }}
                        />
                      </div>

                      {/* Impact detail description */}
                      <div className="flex items-center justify-between mt-2.5 text-[10.5px]">
                        <span className="text-stone-400 font-sans">Business Output</span>
                        {seg.revenueRelated ? (
                          <span className="text-emerald-800 font-bold font-sans">
                            ₱{totalCompletedSales.toFixed(2)} Gross Sales Revenue
                          </span>
                        ) : seg.id === 'queue' ? (
                          <span className="text-teal-800 font-bold font-sans">
                            {queueCount} active orders preparing state
                          </span>
                        ) : (
                          <span className="text-indigo-805 font-bold font-sans">
                            {pendingCateringCount} bookings requiring approval checks
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Educational banner note */}
              <div className="bg-amber-50/50 border border-amber-100/60 p-4 rounded-xl flex items-start gap-3">
                <span className="text-base select-none shrink-0 mt-0.5">💡</span>
                <div className="text-[11px] leading-relaxed text-stone-605">
                  <p>
                    <strong>Interactive Pie Chart Synchronization:</strong> You can hover over the pie chart segments or individual operational cards above to focus focus coordinates.
                  </p>
                </div>
              </div>
            </div>

          </div>
        ) : null;
      })()}

      {/* ================= ADMIN VIEW 1: COMPREHENSIVE ORDERS DISPATCHER ================= */}
      {adminTab === 'orders' && (
        <div className="space-y-6" id="admin-orders-ledger">
          <div className="flex items-center justify-between">
            <h3 className="font-sans text-sm font-bold text-stone-900 uppercase tracking-widest pl-2 border-l-4 border-amber-800">
              Customer Dispatch Backlog
            </h3>
            <span className="text-[10px] text-stone-500 font-mono">Total logged orders: {orders.length}</span>
          </div>

          <div className="grid grid-cols-1 gap-4" id="orders-cards-stack">
            {orders.length > 0 ? (
              [...orders].reverse().map((order) => (
                <div 
                  key={order.id} 
                  className="rounded-xl border border-stone-150 bg-white p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-5"
                  id={`admin-order-row-${order.id}`}
                >
                  
                  {/* Left Metadata col */}
                  <div className="md:col-span-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-extrabold text-amber-950 bg-amber-50 rounded-md px-2 py-0.5 border border-amber-100">
                        {order.id}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        order.type === 'delivery' ? 'bg-orange-100 text-orange-950' : 'bg-blue-100 text-blue-950'
                      }`}>
                        {order.type}
                      </span>
                    </div>

                    <div className="text-xs">
                      <div className="font-bold text-stone-900">{order.userName}</div>
                      <div className="text-stone-500 font-mono text-[10.5px] mt-0.5">{order.userEmail} | {order.phone}</div>
                      <div className="text-amber-800 font-mono text-[9px] mt-0.5 capitalize">Role: {order.userRole}</div>
                    </div>

                    <div className="text-[10.5px] text-stone-500 leading-normal bg-stone-50/70 rounded-md p-2 mt-1">
                      <span className="block font-semibold text-[9px] uppercase tracking-wider text-stone-500">Dispatch Location</span>
                      {order.type === 'delivery' ? (order.address || 'Address missing') : 'Pickup at Cafe Counter'}
                    </div>
                  </div>

                  {/* Mid Products & notes col */}
                  <div className="md:col-span-5 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 font-bold block">Cart items:</span>
                      <ul className="mt-1.5 space-y-1" id={`order-items-${order.id}`}>
                        {order.items.map((item, keyId) => (
                          <li key={keyId} className="text-xs text-stone-700 flex justify-between">
                            <span>{item.productName} <strong className="text-amber-900">x{item.quantity}</strong></span>
                            <span className="font-mono text-stone-500">₱{(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {order.notes && (
                      <div className="border-t border-dashed border-stone-100 pt-2.5 mt-2.5">
                        <span className="text-[9px] uppercase font-bold text-amber-850 block">Customer Instructions:</span>
                        <p className="text-xs text-stone-500 italic mt-0.5 leading-normal">&ldquo;{order.notes}&rdquo;</p>
                      </div>
                    )}
                  </div>

                  {/* Right Status Actions col */}
                  <div className="md:col-span-3 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-stone-100 md:pl-5 pt-3 md:pt-0">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 block">Total cost Bill</span>
                      <span className="font-sans text-base font-extrabold text-amber-950 block mt-0.5">₱{order.total.toFixed(2)}</span>
                      
                      <div className="mt-2">
                        <span className={`inline-flex items-center gap-1 rounded-sm px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          order.status === 'pending' ? 'bg-yellow-50 text-yellow-900 border border-yellow-200' :
                          order.status === 'preparing' ? 'bg-blue-50 text-blue-900 border border-blue-200' :
                          order.status === 'ready' ? 'bg-teal-50 text-teal-900 border border-teal-200' :
                          order.status === 'delivered' || order.status === 'completed' ? 'bg-emerald-50 text-emerald-950 border border-emerald-200' :
                          'bg-red-50 text-red-900 border border-red-200'
                        }`}>
                          ● {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Sequential Status transition drivers */}
                    <div className="flex flex-wrap gap-1.5 justify-end mt-4">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'preparing')}
                          className="rounded bg-amber-800 hover:bg-amber-900 text-white px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Accept & Prepare
                        </button>
                      )}

                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'ready')}
                          className="rounded bg-teal-800 hover:bg-teal-900 text-white px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Mark Ready
                        </button>
                      )}

                      {order.status === 'ready' && order.type === 'delivery' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'delivered')}
                          className="rounded bg-orange-750 bg-orange-800 hover:bg-orange-950 text-white px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Out for Delivery
                        </button>
                      )}

                      {order.status === 'ready' && order.type === 'pickup' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="rounded bg-emerald-800 hover:bg-emerald-950 text-white px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Mark Picked Up
                        </button>
                      )}

                      {order.status === 'delivered' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'completed')}
                          className="rounded bg-emerald-800 hover:bg-emerald-950 text-white px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Complete Order
                        </button>
                      )}

                      {order.status !== 'completed' && order.status !== 'cancelled' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="rounded border border-red-250 text-red-700 hover:bg-red-50 px-2 py-1 text-[10px] font-semibold transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-xl text-stone-500 text-xs border border-dashed border-stone-200">
                No orders registered in the system database log.
              </div>
            )}
          </div>
        </div>
      )}



      {/* ================= ADMIN VIEW 3: CATERING BOOKINGS ================= */}
      {adminTab === 'catering' && (
        <div className="space-y-6" id="admin-catering-ledger">
          <h3 className="font-sans text-sm font-bold text-stone-900 uppercase tracking-widest pl-2 border-l-4 border-amber-800">
            Flexible Catering event queue approvals
          </h3>

          <div className="grid grid-cols-1 gap-4" id="caterings-list-stack">
            {cateringBookings.length > 0 ? (
              [...cateringBookings].reverse().map((cat) => (
                <div 
                  key={cat.id} 
                  className="rounded-xl border border-stone-150 bg-white p-5 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-5"
                  id={`admin-catering-card-${cat.id}`}
                >
                  
                  {/* Left Column event title & date */}
                  <div className="md:col-span-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-950 bg-amber-50 rounded px-1.5 py-0.1 border border-amber-100">
                        {cat.id}
                      </span>
                      <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        cat.status === 'pending' ? 'bg-yellow-50 text-yellow-905 border border-yellow-200' :
                        cat.status === 'accepted' ? 'bg-blue-50 text-blue-905 border border-blue-200' :
                        cat.status === 'completed' ? 'bg-emerald-50 text-emerald-950 border border-emerald-250' :
                        'bg-red-50 text-red-955'
                      }`}>
                        {cat.status}
                      </span>
                    </div>

                    <h4 className="font-sans text-base font-bold text-stone-900 leading-snug">{cat.eventName}</h4>
                    <div className="font-mono text-xs text-amber-800">Event Date: <strong>{cat.date}</strong></div>

                    <p className="text-xs text-stone-500 leading-normal bg-stone-50 rounded-md p-2">
                      📍 <strong>Event Venue Address:</strong> {cat.address}
                    </p>
                  </div>

                  {/* Mid package requirements */}
                  <div className="md:col-span-4 space-y-2 text-xs">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Customer Contact</span>
                      <span className="block font-semibold mt-0.5 text-stone-900">{cat.userName}</span>
                      <span className="block text-[11px] text-stone-500 font-mono mt-0.1">{cat.userEmail} | {cat.phone}</span>
                    </div>

                    <div className="border-t border-stone-50 pt-2">
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Bundle Package</span>
                      <span className="block font-semibold text-amber-950">{cat.packageName}</span>
                      <span className="block text-[10px] text-stone-500 mt-0.5">Head Headcount: <strong>{cat.expectedGuests} persons</strong></span>
                    </div>

                    {cat.notes && (
                      <div className="border-t border-stone-50 pt-2 italic text-stone-500 text-[11px]">
                        &ldquo;{cat.notes}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Right Actions columns */}
                  <div className="md:col-span-3 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-stone-100 md:pl-5 pt-3 md:pt-0">
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-bold">Estimated Cost</span>
                      <span className="block text-sm font-extrabold text-amber-900 mt-0.5">
                        ₱{CATERING_PACKAGES.find(p => p.id === cat.packageId)?.pricePerHead ? 
                          ((CATERING_PACKAGES.find(p => p.id === cat.packageId)?.pricePerHead || 1) * cat.expectedGuests) : 5000
                        }
                      </span>
                      <span className="text-[9.5px] text-stone-500">Based on per guest heads</span>
                    </div>

                    <div className="flex gap-2 justify-end mt-4">
                      {cat.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateCateringStatus(cat.id, 'accepted')}
                            className="rounded-lg bg-emerald-800 hover:bg-emerald-950 text-white font-bold py-1 px-3 text-xs shadow-xs cursor-pointer"
                          >
                            Accept & Contact
                          </button>
                          
                          <button
                            onClick={() => updateCateringStatus(cat.id, 'rejected')}
                            className="rounded-lg border border-red-200 text-red-700 hover:bg-red-50 py-1 px-2.5 text-xs transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {cat.status === 'accepted' && (
                        <button
                          onClick={() => updateCateringStatus(cat.id, 'completed')}
                          className="rounded-lg bg-teal-805 bg-amber-800 hover:bg-amber-900 text-white font-bold py-1 px-3 text-xs transition-colors cursor-pointer"
                        >
                          Mark Event Completed
                        </button>
                      )}

                      {cat.status === 'completed' && (
                        <span className="text-xs text-stone-400 font-semibold block">Historic completed event</span>
                      )}
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-stone-50 rounded-xl text-stone-500 text-xs border border-dashed border-stone-200">
                No catering bookings found in record histories.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= ADMIN VIEW 4: MENU CURATOR & FOOD POSTER ================= */}
      {adminTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="admin-inventory-ledger">
          
          {/* Post New Food (Left Form) */}
          <div className="lg:col-span-5" id="admin-add-product-panel">
            <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-6 space-y-4">
              <div>
                <span className="font-mono text-[9.5px] font-extrabold uppercase tracking-widest text-amber-850">Cafe Operations</span>
                <h3 className="font-sans text-base font-bold text-amber-955 mt-0.5">{editingProductId ? 'Edit Product Details' : 'Post New Available Food'}</h3>
                <p className="text-xs text-stone-500 mt-1">Populate gourmet coffees, iced brews, or festive bilao packages instantly on the menu grid.</p>
              </div>

              {productSuccess && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-950 font-semibold">
                  {productSuccess}
                </div>
              )}

              <form onSubmit={handleAddProductSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label htmlFor="p-name" className="text-xs font-semibold text-stone-700 block">Food Name</label>
                  <input
                    type="text"
                    id="p-name"
                    required
                    placeholder="e.g. Sizzling Sisig Deluxe"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full rounded-lg bg-white border border-stone-250 px-3 py-1.5 text-xs outline-none focus:border-amber-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="p-price" className="text-xs font-semibold text-stone-700 block">Price (₱)</label>
                    <input
                      type="number"
                      id="p-price"
                      required
                      min={1}
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full rounded-lg bg-white border border-stone-250 px-3 py-1.5 text-xs outline-none focus:border-amber-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="p-cat" className="text-xs font-semibold text-stone-700 block">Category</label>
                    <select
                      id="p-cat"
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value as any)}
                      className="w-full rounded-lg bg-white border border-stone-250 px-3 py-1.5 text-xs outline-none focus:border-amber-700"
                    >
                      <option value="hot-coffee">Hot Coffee</option>
                      <option value="iced-coffee">Iced Coffee</option>
                      <option value="bilao">Bilao Packages</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="p-img" className="text-xs font-semibold text-stone-700 block">Unsplash Photography URL (Optional)</label>
                  <input
                    type="url"
                    id="p-img"
                    placeholder="https://images.unsplash.com/..."
                    value={newProdImg}
                    onChange={(e) => setNewProdImg(e.target.value)}
                    className="w-full rounded-lg bg-white border border-stone-250 px-3 py-1.5 text-xs outline-none focus:border-amber-700"
                  />
                  <span className="text-[9.5px] text-stone-500 block">Leaves dynamic premium placeholder coffee images if left blank.</span>
                </div>

                <div className="space-y-1">
                  <label htmlFor="p-desc" className="text-xs font-semibold text-stone-700 block">Food Description</label>
                  <textarea
                    id="p-desc"
                    required
                    rows={3}
                    placeholder="Ingredients, sizes, or specific servings count..."
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    className="w-full rounded-lg bg-white border border-stone-250 px-3 py-1.5 text-xs outline-none focus:border-amber-700"
                  />
                </div>

                <div className="flex gap-2.5">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    id="add-custom-product-btn"
                  >
                    {editingProductId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    <span>{editingProductId ? 'Save Product Changes' : 'Publish Food Post'}</span>
                  </button>
                  {editingProductId && (
                    <button
                      type="button"
                      onClick={handleCancelProductEdit}
                      className="px-3 rounded-lg bg-stone-100 hover:bg-stone-205 text-stone-605 border border-stone-200 text-xs font-semibold hover:text-stone-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List of current products inside system (Right Column) */}
          <div className="lg:col-span-7 space-y-4" id="admin-inventory-list">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Live stock controllers ({products.length} Items)</h4>
            
            <div className="grid grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-2" id="available-toggle-cards">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-lg border border-stone-200 p-3 bg-white flex items-center justify-between gap-4 shadow-2xs hover:border-amber-200 transition-colors"
                  id={`admin-product-item-${prod.id}`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="h-11 w-11 object-cover rounded-md"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">{prod.name}</div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-wide font-semibold mt-0.5">{prod.category.replace('-', ' ')} | ₱{prod.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Toggle availability status */}
                    <button
                      onClick={() => toggleProductAvailability(prod.id)}
                      className={`px-3 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                        prod.available 
                          ? 'bg-emerald-50 text-emerald-950 hover:bg-emerald-100 border border-emerald-250' 
                          : 'bg-stone-100 text-stone-400 hover:bg-stone-200 border border-stone-200'
                      }`}
                      id={`toggle-avail-${prod.id}`}
                    >
                      {prod.available ? '● Available' : '○ Sold Out'}
                    </button>

                    {/* Edit product option */}
                    <button
                      onClick={() => handleProductEditSelect(prod)}
                      className="text-stone-400 hover:text-amber-800 p-1 rounded hover:bg-amber-50 transition-colors cursor-pointer"
                      id={`edit-prod-${prod.id}`}
                      title="Edit product"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    {/* Delete product option */}
                    <button
                      onClick={() => handleProductDelete(prod.id)}
                      className="text-stone-400 hover:text-red-700 p-1 rounded-sm hover:bg-red-50 transition-colors cursor-pointer"
                      id={`delete-prod-${prod.id}`}
                      title="Remove product"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ================= ADMIN VIEW 5: BROADCAST ANNOUNCEMENTS ================= */}
      {adminTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="admin-broadcast-ledger">
          
          {/* Post announcement (Left Column) */}
          <div className="lg:col-span-5" id="admin-add-announcement-panel">
            <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-amber-800" />
                <h3 className="font-sans text-base font-bold text-amber-955">Create General Broadcast</h3>
              </div>
              <p className="text-xs text-stone-500">Post immediate announcements, holiday closures, student discount periods, or weekend menus updates.</p>

              {annSuccess && (
                <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-950 font-semibold text-center">
                  {annSuccess}
                </div>
              )}

              <form onSubmit={handleAddAnnouncementSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label htmlFor="ann-title" className="text-xs font-semibold text-stone-700 block">Broadcast Title</label>
                  <input
                    type="text"
                    id="ann-title"
                    required
                    placeholder="e.g. Batangas Barako Restocked!"
                    value={newAnnTitle}
                    onChange={(e) => setNewAnnTitle(e.target.value)}
                    className="w-full rounded-lg bg-white border border-stone-250 px-3 py-1.5 text-xs outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="ann-content" className="text-xs font-semibold text-stone-700 block">Bulletin Content</label>
                  <textarea
                    id="ann-content"
                    required
                    rows={4}
                    placeholder="Provide description. Write clearly about dates, eligibility, locations or actions required..."
                    value={newAnnContent}
                    onChange={(e) => setNewAnnContent(e.target.value)}
                    className="w-full rounded-lg bg-white border border-stone-250 px-3 py-1.5 text-xs outline-none focus:border-amber-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-amber-805 bg-amber-800 hover:bg-amber-900 text-white font-bold py-2 text-xs transition-colors cursor-pointer"
                  id="post-announcement-btn"
                >
                  Publish Broadcast Notice
                </button>
              </form>
            </div>
          </div>

          {/* List announcements (Right Column) */}
          <div className="lg:col-span-7 space-y-4" id="admin-broadcast-cards">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-500">Active Campus Bulletins</h4>
            
            <div className="space-y-3" id="admin-announcement-cards-grid">
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="rounded-lg border border-stone-200 p-4 bg-white flex flex-col justify-between gap-3 shadow-2xs hover:border-amber-200 transition-colors"
                  id={`admin-announcement-item-${ann.id}`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="font-mono text-[9px] text-stone-400 block font-semibold">{ann.date}</span>
                      <h4 className="font-sans text-sm font-bold text-stone-900 mt-1">{ann.title}</h4>
                      <p className="text-xs text-stone-500 leading-normal mt-1">{ann.content}</p>
                    </div>

                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="text-stone-400 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove bulletin"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-stone-50 pt-2 text-[10.5px]">
                    <span className="text-stone-400">Notice status</span>
                    <button
                      onClick={() => toggleAnnouncementStatus(ann.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ann.active ? 'bg-emerald-50 text-emerald-950 border border-emerald-250' : 'bg-stone-50 text-stone-400'
                      }`}
                    >
                      {ann.active ? 'Active on Home bulletin' : 'Hidden from Bulletin'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
