import React from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-asphalt-gray text-white border-t-4 border-caution-gold mt-auto" id="cdc-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded bg-primary text-white font-black overflow-hidden border border-slate-700">
                <span className="text-lg tracking-tighter">C</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-white">ComfortDelGro</h4>
                <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Driving Centre Portal</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Singapore’s leading and most trusted driving academy. Empowering generations of drivers with a strong safety-first foundation since 1997.
            </p>
            <div className="flex items-center gap-2 text-xs text-caution-gold font-medium bg-slate-900/50 p-2.5 rounded border border-slate-800">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>SPF Traffic Police Accredited Driving School</span>
            </div>
          </div>

          {/* Column 2: Quick Contacts */}
          <div className="space-y-3">
            <h5 className="font-display font-semibold text-sm text-caution-gold tracking-wide uppercase">Contact & Help</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">+65 6841 8900</p>
                  <p className="text-[10px] text-slate-500">General Hotline (Enquiries)</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">enquiries@cdc.com.sg</p>
                  <p className="text-[10px] text-slate-500">Fast email responses in 1-2 days</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">ComfortDelGro Driving Centre</p>
                  <p className="text-[10px] text-slate-500">205 Ubi Avenue 4, Singapore 408805</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Main Branch Hours */}
          <div className="space-y-3">
            <h5 className="font-display font-semibold text-sm text-caution-gold tracking-wide uppercase">Opening Hours</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mondays to Fridays</p>
                  <p className="text-slate-400">8:30 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Saturdays & Sundays</p>
                  <p className="text-slate-400">8:30 AM - 5:30 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Public Holidays</p>
                  <p className="text-slate-500">Closed (eServices open 24/7)</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Satellite Centers */}
          <div className="space-y-3">
            <h5 className="font-display font-semibold text-sm text-caution-gold tracking-wide uppercase">Satellite Hubs</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <p className="font-semibold text-white">Kovan Branch Office</p>
                <p className="text-[10.5px] text-slate-400">Kovan MRT Exit C, Street Level</p>
              </li>
              <li>
                <p className="font-semibold text-white">Tampines Branch Office</p>
                <p className="text-[10.5px] text-slate-400">Tampines MRT Exit B, level 2 unit</p>
              </li>
              <li>
                <p className="font-semibold text-white">Yishun Branch Office</p>
                <p className="text-[10.5px] text-slate-400">Yishun MRT Exit A, next to dropoff</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
          <p>© 2026 ComfortDelGro Driving Centre Pte Ltd. Co. Reg. No. 199701024K. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 text-[11px] text-slate-400">
            <a href="#privacy" className="hover:text-caution-gold">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-caution-gold">Terms of Service</a>
            <span>•</span>
            <a href="#shuttle" className="hover:text-caution-gold">Shuttle Bus Info</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
