import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, HelpCircle, Map, ExternalLink, Compass } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('order-inquiry');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ success: boolean; text: string } | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ success: false, text: 'Please fill inside required fields (Name, Email, Message).' });
      return;
    }

    setStatus({
      success: true,
      text: `Thank you, ${name}! Your inquiry concerning "${subject.replace('-', ' ')}" has been dispatched to Chef Primo's team. We will write back to you at ${email} shortly.`,
    });

    setName('');
    setEmail('');
    setPhone('');
    setSubject('order-inquiry');
    setMessage('');
  };

  const faqs = [
    {
      q: 'Do you deliver across Laguna?',
      a: 'Yes! We deliver our freshly brewed coffee, specialty drinks, and catering packages throughout Los Baños, Bay, Calamba, and adjacent Laguna areas. For full-service event catering package deals, we handle the entire CALABARZON region.',
    },
    {
      q: 'How do I claim a student discount?',
      a: 'Simply register an account and type in your school ID to verify. During checkout, our order engine will apply a 10% discount automatically on all coffee beverages! You may be asked to present your physical Student ID card upon delivery or pickup.',
    },
    {
      q: 'What is your lead time for catering or Bilao packages?',
      a: 'Since we prepare all custom catering menus and bilao noodle spreads (Pancit Canton, Palabok) fresh at the GK Cafe kitchen, please reserve catering packages at least 1-2 days inside our platform, and online bilao orders at least 2 hours prior to your desired delivery/pickup time.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16 pb-20" id="contact-view-root">
      
      {/* Upper Grid: Contact Info + Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Coordinates */}
        <div className="lg:col-span-5 space-y-8" id="contact-details-panel">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-850">
              Get in Touch with Primo
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950 mt-1">
              Connect with GK Cafe
            </h2>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Have customized catering requests? Ordering questions? Or private event inquiries? Write to our team or locate our cozy cafe in Los Baños, Laguna.
            </p>
          </div>

          <div className="space-y-6" id="coordinate-items-list">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-805 shrink-0 border border-amber-100">
                <Phone className="h-5 w-5 text-amber-800" />
              </div>
              <div>
                <dt className="text-xs font-bold text-stone-900 uppercase">Customer Line</dt>
                <dd className="text-sm text-stone-600 mt-0.5 font-semibold">+63 917 123 4567</dd>
                <dd className="text-[10px] text-stone-500 mt-0.5">Viber support and direct SMS available.</dd>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-805 shrink-0 border border-amber-100">
                <Mail className="h-5 w-5 text-amber-800" />
              </div>
              <div>
                <dt className="text-xs font-bold text-stone-900 uppercase">Email Inbox</dt>
                <dd className="text-sm text-stone-600 mt-0.5 font-semibold underline">gkcafe.primo@gmail.com</dd>
                <dd className="text-[10px] text-stone-500 mt-0.5">Expect average email replies in under 3 hours.</dd>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-805 shrink-0 border border-amber-100">
                <MapPin className="h-5 w-5 text-amber-800" />
              </div>
              <div>
                <dt className="text-xs font-bold text-stone-900 uppercase">Cafe Address</dt>
                <dd className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  Barangay Maahas, Los Baños, Laguna, Philippines
                </dd>
                <dd className="text-[10px] text-stone-500 mt-0.5 font-semibold text-amber-800">
                  ★ Landmark: Along national highway beside Los Baños boundary.
                </dd>
              </div>
            </div>
          </div>

          {/* Social media card */}
          <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">Follow Our Cook updates</h4>
            <p className="text-xs text-stone-500">We post daily meal availability lists, student promos, and seasonal Bibingka bakes on social media channels.</p>
            <div className="flex gap-3 text-xs font-bold text-amber-950">
              <span className="hover:underline cursor-pointer">@GKCafeByPrimo</span>
              <span className="text-stone-300">|</span>
              <span className="hover:underline cursor-pointer">#SteamingPrimoHeritage</span>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-1" />
        
        <div className="lg:col-span-6" id="contact-inquiry-form-card">
          <div className="rounded-2xl border border-stone-150/60 bg-white p-6 sm:p-8 shadow-sm">
            <h3 className="font-sans text-lg font-bold text-stone-900 mb-1">Submit an Inquiry</h3>
            <p className="text-xs text-stone-500 mb-6">Interested in offline partnerships? Fill out the brief contact ledger.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {status && (
                <div
                  className={`rounded-lg p-3 text-xs ${
                    status.success ? 'bg-emerald-50 text-emerald-950 border border-emerald-100' : 'bg-red-50 text-red-950 border border-red-105'
                  }`}
                >
                  {status.text}
                </div>
              )}

              <div className="space-y-1.5">
                <label htmlFor="inq-name" className="block text-xs font-semibold text-stone-700">Full Name</label>
                <input
                  type="text"
                  id="inq-name"
                  required
                  placeholder="e.g. Elena Ruiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="inq-email" className="block text-xs font-semibold text-stone-700">Email Address</label>
                  <input
                    type="email"
                    id="inq-email"
                    required
                    placeholder="elena@wedding.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="inq-phone" className="block text-xs font-semibold text-stone-700">Phone Number (Optional)</label>
                  <input
                    type="text"
                    id="inq-phone"
                    placeholder="0917XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="inq-subject" className="block text-xs font-semibold text-stone-700">What is this regarding?</label>
                <select
                  id="inq-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                >
                  <option value="order-inquiry">Order Status / Delivery Questions</option>
                  <option value="catering-booking">Catering Package Customization</option>
                  <option value="partnership">Business & Organizations Partnerships</option>
                  <option value="feedback">Cafe Feedback & Suggestions</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="inq-msg" className="block text-xs font-semibold text-stone-700">Message Content</label>
                <textarea
                  id="inq-msg"
                  required
                  rows={4}
                  placeholder="Provide precise details of your request so that Primo team can prioritize response..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2 text-xs outline-none focus:border-amber-700 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold py-3 text-xs shadow-md transition-all pt-3 flex items-center justify-center gap-2 cursor-pointer"
                id="submit-inquiry-btn"
              >
                <Send className="h-4 w-4" />
                <span>Submit Inquiry Ledger</span>
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Campus Map Embed Holder */}
      <section className="space-y-4" id="google-maps-placeholder">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="font-sans text-lg font-bold text-amber-950">Cafe & Catering Kitchen Location Map</h3>
            <p className="text-xs text-stone-500">We are located in Maahas, Los Baños, Laguna, offering strategic logistics support for client deliveries and catering setups.</p>
          </div>
          {showMap && (
            <button
              onClick={() => setShowMap(false)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors border border-stone-200 self-start cursor-pointer flex items-center gap-1.5"
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Show Address Info Card</span>
            </button>
          )}
        </div>
        
        {/* Map visual and container wrapper */}
        <div 
          onClick={() => { if (!showMap) setShowMap(true); }}
          className={`relative rounded-xl border-4 border-white shadow-lg h-96 w-full bg-stone-100 overflow-hidden transition-all duration-300 ${
            !showMap ? 'cursor-pointer group hover:border-amber-300 hover:shadow-xl' : ''
          }`}
          id="interactive-map-frame-container"
        >
          {showMap ? (
            <div className="w-full h-full relative" id="live-map-wrapper">
              <iframe
                title="GK Cafe By Primo Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Barangay%20Maahas,%20Los%20Ba%C3%B1os,%20Laguna,%20Philippines&t=&z=16&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
                className="w-full h-full rounded-md animate-fadeIn"
              />
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMap(false);
                  }}
                  className="rounded-lg bg-stone-900/90 hover:bg-stone-900 text-white font-bold px-3 py-1.5 text-[11px] transition-all flex items-center gap-1.5 shadow-md cursor-pointer backdrop-blur-xs"
                >
                  ✕ Close Live Map
                </button>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Barangay+Maahas,+Los+Banos,+Laguna,+Philippines"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-bold px-3 py-1.5 text-[11px] transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Open in Navigation App</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Background accent decor grid */}
              <div className="absolute inset-0 grayscale opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 text-center max-w-md p-6 space-y-4 m-auto h-full flex flex-col justify-center items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-800 text-white shadow-xl mx-auto group-hover:scale-110 group-hover:bg-amber-900 transition-all">
                  <MapPin className="h-6 w-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-sans text-base font-bold text-stone-900">GK Cafe By Primo Hub</h4>
                  <p className="text-xs text-stone-500 mt-1 font-semibold">Barangay Maahas, Los Baños, Laguna, Philippines</p>
                </div>
                
                <div className="border border-amber-200/50 rounded-lg p-3 bg-amber-50/70 text-left text-[11px] text-amber-950">
                  📍 <strong>Service coordinates:</strong> We cover home deliveries and event setups across Los Baños, Bay, with seamless scheduling. Our hot Barako and exquisite catering culinary dishes arrive fresh.
                </div>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 bg-amber-800 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-xs group-hover:scale-105 transition-all">
                    <Map className="h-3.5 w-3.5" />
                    <span>Tap on Map to load Interactive Live Map</span>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lower section FAQ accordion block */}
      <section className="border-t border-amber-100 pt-12 space-y-8" id="contact-faqs">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-amber-805 text-amber-800" />
          <h3 className="font-sans text-lg font-bold text-amber-950">Frequently Answered Questions FAQ</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faqs.map((f, idx) => (
            <div key={idx} className="space-y-2 rounded-xl bg-stone-50 p-5 border border-stone-100" id={`faq-${idx}`}>
              <h4 className="text-xs font-bold text-stone-900">{f.q}</h4>
              <p className="text-xs text-stone-500 leading-normal">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
