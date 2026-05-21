import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('order-inquiry');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ success: boolean; text: string } | null>(null);

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
      q: 'Do you deliver off-campus?',
      a: 'We primary deliver inside CMDI campus borders (including student dormitories, study halls, and faculty rooms). However, we can accommodate off-campus catering service bundles or large Bilao orders across Biñan and Sta. Rosa Laguna with advance appointments.',
    },
    {
      q: 'How do I claim my student discount?',
      a: 'Simply register an account and toggle the "Enrolled Student" button with your student ID. During checkout, our order engine will apply a 10% discount automatically on all coffee items! You may be asked to present your physical Student ID card upon pick-up validation.',
    },
    {
      q: 'What is your lead time for Bilao fiesta packages?',
      a: 'Since we prepare all bilao noodle spreads (Pancit Canton, Palabok) and deep fried Lumpiang Shanghai rolls fresh at Chef Primo kitchen, please order at least 2 hours prior to your desired pickup or delivery time.',
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
              Connect with GK Coffee
            </h2>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Have customized meal package requirements? Booking questions? Or student community event inquiries? Write to our team or locate our campus kitchen.
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
                <dd className="text-sm text-stone-600 mt-0.5 font-semibold underline">gkcoffee.primo@canteen.com</dd>
                <dd className="text-[10px] text-stone-500 mt-0.5">Expect average email replies in under 3 hours.</dd>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-805 shrink-0 border border-amber-100">
                <MapPin className="h-5 w-5 text-amber-800" />
              </div>
              <div>
                <dt className="text-xs font-bold text-stone-900 uppercase">Canteen Kitchen Address</dt>
                <dd className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                  GK College Canteen, CMDI Boulevard, Brgy. San Antonio, Biñan, Laguna, Philippines
                </dd>
                <dd className="text-[10px] text-stone-500 mt-0.5 font-semibold text-amber-800">
                  ★ Landmark: Direct main level across school sports stadium entrance.
                </dd>
              </div>
            </div>
          </div>

          {/* Social media card */}
          <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">Follow Our Cook updates</h4>
            <p className="text-xs text-stone-500">We post daily meal availability lists, student promos, and seasonal Bibingka bakes on social media channels.</p>
            <div className="flex gap-3 text-xs font-bold text-amber-950">
              <span className="hover:underline cursor-pointer">@GKCoffeeByPrimo</span>
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
                  <option value="reservation-question">Table Reservation Schedule</option>
                  <option value="partnership">School Organization Partnership</option>
                  <option value="feedback">Canteen Feedback & Complaints</option>
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
        <h3 className="font-sans text-lg font-bold text-amber-950">Kitchen Coordinates on Campus Map</h3>
        <p className="text-xs text-stone-500">We are placed adjacent to the student center, offering seamless pickup access to residents of general dormitories.</p>
        
        {/* Clean visual graphic container of map, since direct maps might require keys */}
        <div className="relative rounded-xl border-4 border-white shadow-lg h-96 w-full bg-stone-100 flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 grayscale opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 text-center max-w-md p-6 space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-800 text-white shadow-xl mx-auto">
              <MapPin className="h-6 w-6 animate-bounce" />
            </div>
            <div>
              <h4 className="font-sans text-base font-bold text-stone-900">GK Coffee By Primo Kitchen Hub</h4>
              <p className="text-xs text-stone-500 mt-1">CMDI Campus, Barangay San Antonio, Biñan City, Laguna</p>
            </div>
            
            <div className="border border-amber-200/50 rounded-lg p-3 bg-amber-50/70 text-left text-[11px] text-amber-950">
              📍 <strong>Delivery limits:</strong> Deliveries are executed by our internal canteen student-riders. We cover all university wings, library study cells, and grounds with <strong>zero delivery fees</strong> for active members.
            </div>
          </div>
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
