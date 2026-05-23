import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, Clock, MapPin, Phone, Mail, User as UserIcon, 
  Calendar, CheckCircle, AlertCircle, RefreshCw, XCircle, ChevronRight, HelpCircle, Truck
} from 'lucide-react';
import { User, Order, Reservation, CateringBooking } from '../types';

interface UserDashboardProps {
  currentUser: User | null;
  orders: Order[];
  reservations: Reservation[];
  cateringBookings: CateringBooking[];
  onCancelOrder?: (orderId: string) => void;
  onCancelReservation?: (resId: string) => void;
  onCancelCatering?: (bookingId: string) => void;
  setCurrentTab: (tab: string) => void;
}

export default function UserDashboard({
  currentUser,
  orders = [],
  reservations = [],
  cateringBookings = [],
  onCancelOrder,
  onCancelReservation,
  onCancelCatering,
  setCurrentTab,
}: UserDashboardProps) {
  const [activeDashboardTab, setActiveDashboardTab] = useState<'orders' | 'reservations' | 'catering'>('orders');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'active' | 'completed' | 'cancelled'>('all');

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center" id="dashboard-logged-out-state">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-800 mb-4 shadow-sm">
          <UserIcon className="h-8 w-8" />
        </div>
        <h2 className="font-sans text-2xl font-bold text-stone-900">Access Denied</h2>
        <p className="mt-2 text-sm text-stone-550 max-w-md mx-auto">
          Please sign in or register an account to view your past orders, manage pending tables, and track catering bookings.
        </p>
        <button
          onClick={() => setCurrentTab('login')}
          className="mt-6 rounded-xl bg-amber-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-amber-900 transition-colors shadow-sm cursor-pointer"
        >
          Sign In / Register
        </button>
      </div>
    );
  }

  // Filter user specific logs
  const userOrders = orders.filter(o => o.userId === currentUser.id);
  const userReservations = reservations.filter(r => r.userId === currentUser.id);
  const userCatering = cateringBookings.filter(c => c.userId === currentUser.id);

  // Apply order filter
  const filteredOrders = userOrders.filter(order => {
    if (orderFilter === 'all') return true;
    if (orderFilter === 'pending') return order.status === 'pending';
    if (orderFilter === 'active') {
      return ['pending', 'preparing', 'ready', 'delivered'].includes(order.status);
    }
    if (orderFilter === 'completed') return order.status === 'completed';
    if (orderFilter === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  const getOrderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-100">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-550 animate-pulse" />
            Pending Checkout
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-550/10 text-blue-800 border border-blue-105">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Kitchen Preparing
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-505 animate-bounce" />
            Ready for Pickup / Out
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-55/65 text-orange-850 border border-orange-100">
            <Truck className="h-3 w-3" />
            Dispatched Delivery
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            <CheckCircle className="h-3 w-3 text-stone-500" />
            Fulfilled Order
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-100">
            <XCircle className="h-3 w-3 text-red-500" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const getReservationStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-100 uppercase">
            Awaiting Approval
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100 uppercase">
            Confirmed
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-800 border border-red-100 uppercase">
            Declined
          </span>
        );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 pb-24" id="user-dashboard-root-view">
      
      {/* 1. Header Banner Profile Snapshot */}
      <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row gap-6 justify-between items-start md:items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 h-28 w-28 bg-amber-50/40 rounded-bl-full pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="h-16 w-16 rounded-2xl bg-amber-800 text-white flex items-center justify-center font-extrabold text-2xl shadow-md border-2 border-amber-100">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-sans text-xl font-bold text-stone-903">{currentUser.name}</h2>
              <span className={`px-2 py-0.5 text-[9px] font-mono tracking-wider space-x-1 font-bold rounded-lg uppercase ${
                currentUser.role === 'student' 
                  ? 'bg-amber-100 text-amber-950 border border-amber-200' 
                  : 'bg-stone-100 text-stone-600 border border-stone-200'
              }`}>
                {currentUser.role}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500 font-sans">
              <span className="flex items-center gap-1"><Mail className="h-3 w-3 text-amber-700" />{currentUser.email}</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3 text-amber-700" />{currentUser.phone}</span>
              {currentUser.role === 'student' && (
                <span className="flex items-center gap-1 font-mono text-[11px] font-semibold text-amber-850">
                  ID: {currentUser.idNumber}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 relative z-10 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100 w-full md:w-auto">
          <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest block">Account Activity Stat</span>
          <div className="flex gap-4">
            <div className="text-center">
              <span className="text-base font-black text-amber-900 block">{userOrders.length}</span>
              <span className="text-[9px] uppercase font-bold text-stone-500">Orders</span>
            </div>
            <div className="text-center">
              <span className="text-base font-black text-amber-900 block">{userReservations.length}</span>
              <span className="text-[9px] uppercase font-bold text-stone-500">Reservations</span>
            </div>
            <div className="text-center">
              <span className="text-base font-black text-amber-900 block">{userCatering.length}</span>
              <span className="text-[9px] uppercase font-bold text-stone-500">Catering</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Navigation Section Tabs */}
      <div className="border-b border-stone-200">
        <nav className="flex space-x-8" aria-label="Dashboard views">
          <button
            onClick={() => setActiveDashboardTab('orders')}
            className={`pb-4 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
              activeDashboardTab === 'orders' 
                ? 'text-amber-800' 
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span>My Orders & Checkout ({userOrders.length})</span>
            </div>
            {activeDashboardTab === 'orders' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveDashboardTab('reservations')}
            className={`pb-4 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
              activeDashboardTab === 'reservations' 
                ? 'text-amber-800' 
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Dine-In Reservations ({userReservations.length})</span>
            </div>
            {activeDashboardTab === 'reservations' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-800 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveDashboardTab('catering')}
            className={`pb-4 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
              activeDashboardTab === 'catering' 
                ? 'text-amber-850' 
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Catering Bookings ({userCatering.length})</span>
            </div>
            {activeDashboardTab === 'catering' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-850 rounded-full" />
            )}
          </button>
        </nav>
      </div>

      {/* 3. Panel Switcher content area */}
      {activeDashboardTab === 'orders' && (
        <div className="space-y-6" id="dashboard-orders-deck">
          
          {/* Status Filter buttons */}
          <div className="flex flex-wrap items-center gap-2 border bg-stone-100/55 p-1 px-1.5 rounded-xl border-stone-200 max-w-xl">
            <span className="text-[10px] uppercase font-bold text-stone-500 px-2">Filter status:</span>
            {(['all', 'pending', 'active', 'completed', 'cancelled'] as const).map((filterOpt) => (
              <button
                key={filterOpt}
                onClick={() => setOrderFilter(filterOpt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                  orderFilter === filterOpt 
                    ? 'bg-amber-800 text-white shadow-xs' 
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {filterOpt}
              </button>
            ))}
          </div>

          {/* Orders Stack list */}
          <div className="grid grid-cols-1 gap-5">
            {filteredOrders.length > 0 ? (
              [...filteredOrders].reverse().map((order) => {
                const orderDateObj = new Date(order.createdAt);
                return (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={order.id}
                    className="rounded-2xl border border-stone-200 bg-white shadow-xs hover:shadow-md transition-all p-5 sm:p-6"
                  >
                    {/* Upper order state headers */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-black text-amber-950 font-sans">{order.id}</span>
                          {getOrderStatusBadge(order.status)}
                        </div>
                        <p className="text-[11px] text-stone-500 font-sans mt-1">
                          Placed on: <span className="font-semibold text-stone-700">{orderDateObj.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-stone-405 font-mono uppercase tracking-wider block">Fulfillment</span>
                        <span className="text-xs font-extrabold text-stone-850 capitalize px-2 py-0.5 rounded-md bg-stone-100 inline-block mt-0.5">
                          {order.type === 'delivery' ? '🚗 Local Delivery' : '🛍️ Counter Pickup'}
                        </span>
                      </div>
                    </div>

                    {/* Order items, quantities */}
                    <div className="py-4 space-y-2.5">
                      <span className="text-[10px] text-stone-400 font-mono uppercase tracking-widest block">Ordered Items</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs bg-stone-50/50 border rounded-xl p-2.5 px-3">
                            <div>
                              <span className="font-bold text-stone-850 block">{item.productName}</span>
                              <span className="text-stone-450 text-[10px]">Price: ₱{item.price.toFixed(2)}</span>
                            </div>
                            <span className="font-mono font-bold text-amber-900 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment strategy & address & cancel request */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-100 text-xs text-stone-550">
                      <div>
                        <span className="text-[9px] text-stone-400 font-mono uppercase tracking-wider block mb-1">Fulfillment Spot location</span>
                        {order.type === 'delivery' ? (
                          <p className="font-semibold text-stone-800 leading-normal">
                            <MapPin className="h-3 w-3 text-amber-800 inline mr-1" />
                            {order.address || 'No physical address specified'}
                          </p>
                        ) : (
                          <p className="font-semibold text-stone-800 italic">
                            🛍️ GK Cafe Counter pick-up list
                          </p>
                        )}
                        {order.notes && (
                          <p className="text-[10.5px] text-stone-500 italic mt-1.5 leading-relaxed bg-amber-50/20 p-2 rounded-lg border border-amber-100/30">
                            &ldquo;{order.notes}&rdquo;
                          </p>
                        )}
                      </div>

                      <div>
                        <span className="text-[9px] text-stone-400 font-mono uppercase tracking-wider block mb-1">Coupon & Billing Totals</span>
                        <div className="space-y-1.5">
                          {order.userRole === 'student' && (
                            <div className="flex items-center gap-1.5 text-[10.5px] text-emerald-850 font-bold">
                              <span className="h-2 w-2 rounded-full bg-emerald-500" />
                              10% student coupon discount auto-applied
                            </div>
                          )}
                          <p className="font-semibold text-stone-700">
                            Total computed amount Paid: <span className="text-base text-amber-950 font-black">₱{order.total.toFixed(2)}</span>
                          </p>
                        </div>
                      </div>

                      {/* Interactive cancel option */}
                      <div className="flex md:justify-end items-center">
                        {order.status === 'pending' ? (
                          <button
                            onClick={() => onCancelOrder && onCancelOrder(order.id)}
                            className="rounded-xl border border-red-200 text-red-700 hover:bg-red-50 px-4 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                          >
                            <XCircle className="h-4 w-4 shrink-0" />
                            <span>Cancel Booking / Order</span>
                          </button>
                        ) : order.status === 'cancelled' ? (
                          <span className="text-[11px] text-red-800 italic font-medium bg-red-50 p-2 rounded-lg border border-red-100 font-sans block w-full text-center">
                            This order was cancelled.
                          </span>
                        ) : (
                          <span className="text-[11px] text-stone-400 italic bg-stone-100 p-2 rounded-lg border border-stone-150 font-sans block w-full text-center">
                            Order is preparing / finalized
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3 shadow-xs">
                <ShoppingBag className="mx-auto h-12 w-12 text-stone-300 stroke-1" />
                <h3 className="font-sans text-base font-bold text-stone-800">No matching orders found</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto leading-normal">
                  You don&apos;t have any orders registered under this status. Savor our delicious Batangas Barako now!
                </p>
                <button
                  onClick={() => setCurrentTab('services')}
                  className="mt-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold px-4 py-2 text-xs transition-colors cursor-pointer"
                >
                  Order Coffee Treats
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Dine-in reservations tracker panel */}
      {activeDashboardTab === 'reservations' && (
        <div className="space-y-5" id="dashboard-reservations-deck">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userReservations.length > 0 ? (
              [...userReservations].reverse().map((res) => {
                return (
                  <div key={res.id} className="rounded-2xl border border-stone-200 bg-white p-5 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <span className="font-mono text-xs font-extrabold text-amber-950 block">{res.id}</span>
                        <p className="text-[10px] text-stone-400 font-mono uppercase mt-0.5">Dine-In Table</p>
                      </div>
                      {getReservationStatusBadge(res.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-stone-605">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-stone-400 block mb-0.5">Date Reserved</span>
                        <span className="font-semibold text-stone-850">{res.date}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-stone-400 block mb-0.5">Schedule Time</span>
                        <span className="font-semibold text-stone-850">{res.time}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-stone-400 block mb-0.5">Guests count</span>
                        <span className="font-semibold text-stone-850">{res.guestsCount} Persons</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-stone-400 block mb-0.5">Contact Call</span>
                        <span className="font-semibold text-stone-800">{res.phone}</span>
                      </div>
                    </div>

                    {res.notes && (
                      <div className="bg-stone-50 rounded-lg p-2.5 border text-[11px] text-stone-500 italic">
                        &ldquo;{res.notes}&rdquo;
                      </div>
                    )}

                    {res.status === 'pending' && (
                      <button
                        onClick={() => onCancelReservation && onCancelReservation(res.id)}
                        className="w-full text-center py-2 border border-red-100 hover:bg-red-50 text-red-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        Cancel Reservation
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="md:col-span-2 text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3">
                <Calendar className="mx-auto h-12 w-12 text-stone-300 stroke-1" />
                <h3 className="font-sans text-base font-bold text-stone-800">No reservations logged</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  You have not requested any tables yet. Let us save a premium VIP table for you next time!
                </p>
                <button
                  onClick={() => setCurrentTab('services')}
                  className="rounded-xl bg-amber-800 text-white font-bold px-4 py-2 text-xs hover:bg-amber-900 transition-colors cursor-pointer"
                >
                  Book Dine-In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Catering packages status panel */}
      {activeDashboardTab === 'catering' && (
        <div className="space-y-5" id="dashboard-catering-deck">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {userCatering.length > 0 ? (
              [...userCatering].reverse().map((booking) => {
                return (
                  <div key={booking.id} className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-6 space-y-4 shadow-xs relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-1.5 w-full bg-amber-800" />
                    
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-amber-950 block">{booking.id}</span>
                        <h4 className="font-sans text-sm font-extrabold text-stone-850 mt-0.5">{booking.eventName}</h4>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                        booking.status === 'pending'
                          ? 'bg-amber-50 text-amber-850 border border-amber-100'
                          : booking.status === 'accepted'
                          ? 'bg-emerald-55 bg-emerald-50 text-emerald-800 border border-emerald-100'
                          : 'bg-stone-100 text-stone-605'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-600">
                      <p>
                        <strong className="text-stone-800">Catering Choice:</strong> {booking.packageName}
                      </p>
                      <p>
                        <strong className="text-stone-800">Event Date:</strong> {booking.date}
                      </p>
                      <p>
                        <strong className="text-stone-800">Expected Guests:</strong> {booking.expectedGuests} persons
                      </p>
                      <p className="truncate" title={booking.address}>
                        <strong className="text-stone-800">Dispatch Spot:</strong> {booking.address}
                      </p>
                    </div>

                    {booking.notes && (
                      <p className="text-[11px] italic bg-stone-50 rounded-lg p-2.5 text-stone-500 leading-normal">
                        &ldquo;{booking.notes}&rdquo;
                      </p>
                    )}

                    {booking.status === 'pending' && (
                      <button
                        onClick={() => onCancelCatering && onCancelCatering(booking.id)}
                        className="w-full text-center py-2 border border-red-150 hover:bg-red-50 text-red-700 font-bold text-xs rounded-xl transition-all cursor-pointer"
                      >
                        Cancel Event Booking
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="md:col-span-2 text-center py-16 bg-white rounded-3xl border border-stone-200">
                <CheckCircle className="mx-auto h-12 w-12 text-stone-300 stroke-1 mb-3" />
                <h3 className="font-sans text-base font-bold text-stone-800">No culinary events booked</h3>
                <p className="text-xs text-stone-505 max-w-sm mx-auto leading-relaxed mb-4">
                  Planning a department meeting, physical physical physical banquet, or festive lunch at CMD/Laguna area? Reserve a customizable Bilao bundle or premium coffee caterers today!
                </p>
                <button
                  onClick={() => setCurrentTab('services')}
                  className="rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold px-5 py-2.5 text-xs transition-colors cursor-pointer"
                >
                  Explore Catering Selections
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
