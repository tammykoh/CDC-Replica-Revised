import React, { useState } from 'react';
import { Shield, Menu, X, Compass, Calendar, Award, Phone } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
}

export default function Header({ currentView, setView }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', id: 'home', icon: Compass },
    { name: 'Courses', id: 'courses', icon: Award },
    { name: 'Booking', id: 'booking', icon: Calendar },
    { name: 'About Us', id: 'about', icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-outline-variant shadow-sm transition-all" id="cdc-header">
      {/* Top micro-banner */}
      <div className="bg-primary text-white text-xs py-2 px-4 flex justify-between items-center" id="micro-banner">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-caution-gold animate-pulse" />
          <span>Important Notice: Simulator bookings now available for Aug/Sep batches.</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-slate-300">
          <span>Call: +65 6841 8900</span>
          <span>|</span>
          <span>Mon-Fri: 8:30 AM - 10:00 PM</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group" 
            onClick={() => { setView('home'); setIsOpen(false); }}
            id="brand-logo"
          >
            {/* Styled Custom CDC Shield Emblem */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-primary text-white font-black overflow-hidden shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl tracking-tighter">C</span>
              <span className="text-xs text-caution-gold absolute bottom-0.5 font-bold">CDC</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-caution-gold transform rotate-45 opacity-20 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-lg font-extrabold text-primary tracking-tight">ComfortDelGro</span>
                <span className="font-display text-xs font-semibold bg-caution-gold/25 text-primary-fixed-dim px-1.5 py-0.5 rounded-full border border-caution-gold/50">Centre</span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-on-surface-variant font-semibold uppercase">Driving School Portal</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-navigation">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setView(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all ${
                    isActive 
                      ? 'text-primary bg-primary-fixed/30 font-semibold' 
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-mist'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-on-surface-variant/70'}`} />
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
            
            <div className="h-6 w-px bg-outline-variant mx-2"></div>

            <button 
              id="header-cta-book"
              onClick={() => setView('booking')}
              className="bg-primary hover:bg-safety-blue text-white text-xs font-semibold px-4.5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all uppercase tracking-wider cursor-pointer"
            >
              Book Lesson
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="mobile-cta-book"
              onClick={() => setView('booking')}
              className="bg-primary hover:bg-safety-blue text-white text-[11px] font-bold px-3 py-1.5 rounded-md shadow-sm transition-all uppercase tracking-wider"
            >
              Book
            </button>
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-mist transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-outline-variant bg-white shadow-lg animate-fade-in" id="mobile-drawer">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => {
                    setView(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive 
                      ? 'text-primary bg-primary-fixed/20 font-semibold' 
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-mist'
                  }`}
                >
                  <Icon className="w-5 h-5 text-on-surface-variant/70" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
