import { Coffee, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300" id="canteen-main-footer">
      {/* Upper Footer section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Column 1: Brand Intro */}
          <div className="space-y-4 xl:col-span-1" id="footer-brand-section">
            <div className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-700 text-white shadow-md">
                <Coffee className="h-5 w-5" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-white">
                GK CAFE
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-stone-400">
              Savoring moments, steaming heritage. We specialize in professional event catering, premium coffee brews, and a seamless online ordering experience for office and home delivery.
            </p>
            <div className="flex space-x-4 pt-1" id="social-handles-row">
              <a href="#" className="text-stone-500 hover:text-amber-500 transition-colors" aria-label="Facebook">
                <span className="text-sm font-semibold">FaceBook</span>
              </a>
              <a href="#" className="text-stone-500 hover:text-amber-500 transition-colors" aria-label="Instagram">
                <span className="text-sm font-semibold">InstaGram</span>
              </a>
              <a href="#" className="text-stone-500 hover:text-amber-500 transition-colors" aria-label="LinkedIn">
                <span className="text-sm font-semibold">TikTok</span>
              </a>
            </div>
          </div>

          {/* Column 2 & 3: Useful Links & Working Hours / Context Info */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0" id="footer-links-container">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-amber-500">
                  Quick Access
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm" id="footer-actions-list">
                  <li>
                    <button
                      onClick={() => setCurrentTab('home')}
                      className="text-stone-400 hover:text-white transition-colors text-left"
                    >
                      Home Portal
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentTab('services')}
                      className="text-stone-400 hover:text-white transition-colors text-left"
                    >
                      Order Menu & Food Packages
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentTab('about')}
                      className="text-stone-400 hover:text-white transition-colors text-left"
                    >
                      Our Story & Background
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setCurrentTab('contact')}
                      className="text-stone-400 hover:text-white transition-colors text-left"
                    >
                      Enquiries & Map Location
                    </button>
                  </li>
                </ul>
              </div>

              <div className="mt-10 md:mt-0">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-amber-500">
                  Daily Offerings
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  <li className="text-stone-400 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    Online Ordering System
                  </li>
                  <li className="text-stone-400 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    Catering Services
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 4: Location & Operating Hours */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-amber-500">
                Operating Schedule & Contact
              </h3>
              <ul className="space-y-3 text-sm text-stone-400" id="footer-contacts">
                <li className="flex items-start space-x-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <span>Barangay Maahas, Los Baños, Laguna, Philippines</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>+63 917 123 4567</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-amber-600" />
                  <span>gkcafe.primo@gmail.com</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                  <div>
                    <span className="block text-white font-medium">Mon - Sat: 7:00 AM - 6:00 PM</span>
                    <span className="text-xs">Sunday: Closed (Available Only for Pre-booked catering)</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Lower copyright bar */}
        <div className="mt-12 border-t border-stone-850 pt-8 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-stone-500">
          <p id="footer-copyright-text">
            &copy; {currentYear} GK Cafe By Primo. All rights reserved. Premium Cafe & Catering Provider.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300">Catering Policy</a>
            <a href="#" className="hover:text-stone-300">Terms of Dining</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
