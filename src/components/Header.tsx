import { User, CartItem } from '../types';
import { Coffee, ShoppingBag, User as UserIcon, Menu as MenuIcon, X, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cart: CartItem[];
  onOpenCart: () => void;
}

export default function Header({
  currentUser,
  onLogout,
  currentTab,
  setCurrentTab,
  cart,
  onOpenCart,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Menu & Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-100 bg-white/95 shadow-xs backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')} 
          className="flex cursor-pointer items-center space-x-2"
          id="header-logo-container"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-800 text-white shadow-md transition-transform hover:scale-105">
            <Coffee className="h-5.5 w-5.5" />
          </div>
          <div>
            <h1 className="font-sans text-lg font-bold leading-none tracking-tight text-amber-950 sm:text-xl">
              GK COFFEE
            </h1>
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-700">
              By Primo Canteen
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-8" id="desktop-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => setCurrentTab(tab.id)}
              className={`font-sans text-sm font-medium transition-colors ${
                currentTab === tab.id
                  ? 'text-amber-800'
                  : 'text-stone-600 hover:text-amber-800'
              } relative py-2`}
            >
              {tab.label}
              {currentTab === tab.id && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-amber-800" />
              )}
            </button>
          ))}

          {currentUser?.role === 'admin' && (
            <button
              key="admin"
              id="nav-tab-admin"
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center space-x-1.5 font-sans text-sm font-semibold transition-colors ${
                currentTab === 'admin'
                  ? 'text-orange-850'
                  : 'text-amber-800 hover:text-amber-950'
              } border-l border-amber-200 pl-4`}
            >
              <ShieldAlert className="h-4 w-4 text-amber-750" />
              <span>Admin Panel</span>
            </button>
          )}
        </nav>

        {/* Right Section: Session Info & Cart */}
        <div className="flex items-center space-x-4" id="header-right-controls">
          
          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 hover:bg-amber-100 transition-colors"
            id="open-cart-button"
            aria-label="View Cart"
          >
            <ShoppingBag className="h-5 w-5 text-amber-900 group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-800 text-[10px] font-bold text-white shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth Info & Logout/Login */}
          <div className="hidden border-l border-amber-100 pl-4 sm:flex sm:items-center sm:space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3" id="user-info-badge">
                <div className="flex flex-col text-right">
                  <span className="text-xs font-semibold text-stone-900">
                    {currentUser.name}
                  </span>
                  <span className="font-mono text-[9px] capitalize text-amber-700">
                    {currentUser.role === 'student' ? `Student (${currentUser.idNumber})` : currentUser.role}
                  </span>
                </div>
                
                <button
                  onClick={onLogout}
                  className="rounded-lg border border-amber-200 px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-50 transition-colors cursor-pointer"
                  id="header-logout-btn"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentTab('login')}
                className="flex items-center space-x-1.5 rounded-lg bg-amber-800 px-4 py-2 text-xs font-medium text-white shadow-xs hover:bg-amber-900 hover:shadow-md transition-all cursor-pointer"
                id="header-login-btn"
              >
                <UserIcon className="h-3.5 w-3.5" />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-900 md:hidden"
            id="mobile-menu-toggle"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="h-5.5 w-5.5" /> : <MenuIcon className="h-5.5 w-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-amber-50 bg-white/98 shadow-lg md:hidden" id="mobile-menu">
          <div className="space-y-1.5 px-4 pt-3 pb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`mobile-nav-tab-${tab.id}`}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                  currentTab === tab.id
                    ? 'bg-amber-50 text-amber-900'
                    : 'text-stone-600 hover:bg-amber-50/50 hover:text-amber-800'
                }`}
              >
                {tab.label}
              </button>
            ))}

            {currentUser?.role === 'admin' && (
              <button
                key="admin-mobile"
                id="mobile-nav-tab-admin"
                onClick={() => {
                  setCurrentTab('admin');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold text-amber-800 transition-colors ${
                  currentTab === 'admin' ? 'bg-amber-50' : 'hover:bg-amber-50/50'
                }`}
              >
                Admin Panel ⭐
              </button>
            )}

            {/* Mobile Auth Session */}
            <div className="mt-4 border-t border-amber-100 pt-4">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-200 text-amber-900 font-bold">
                      {currentUser.name[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-stone-90 warning">{currentUser.name}</div>
                      <div className="font-mono text-[10px] text-amber-700 capitalize">
                        {currentUser.role === 'student' ? `Student ID: ${currentUser.idNumber}` : currentUser.role}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full rounded-lg border border-amber-200 px-4 py-2.5 text-center text-sm font-medium text-amber-900 hover:bg-amber-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setCurrentTab('login');
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-amber-800 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-amber-900"
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Sign In / Register</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
