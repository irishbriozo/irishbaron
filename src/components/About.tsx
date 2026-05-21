import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, Target, Eye, Users, Network, Compass, GitFork, 
  ArrowRight, CheckCircle, Clock, ShoppingCart, ShieldCheck, 
  UserCheck, Settings, Layers, HelpCircle, CornerDownRight, 
  Check, Activity, MapPin, Phone, HelpCircle as HelpIcon
} from 'lucide-react';

export default function About() {
  const [archTab, setArchTab] = useState<'sitemap' | 'flowchart'>('sitemap');
  const [selectedFlowStep, setSelectedFlowStep] = useState<number>(1);

  const coreValues = [
    {
      icon: <Target className="h-6 w-6 text-amber-800" />,
      title: 'Our Mission',
      description: 'To nourish our school community and the public with high-quality, authentic Filipino meals and freshly harvested Kapeng Barako coffee at pricing structures tailored for hard-working students.',
    },
    {
      icon: <Eye className="h-6 w-6 text-amber-800" />,
      title: 'Our Vision',
      description: 'To become the premier school canteen hub in Laguna, recognized for preserving Filipino culinary heritage (Kakanin and Bilao feasts) combined with a modern digital canteen workspace experience.',
    },
    {
      icon: <Users className="h-6 w-6 text-amber-800" />,
      title: 'Our Heritage Team',
      description: 'Founded and ran by Chef Primo and the GK Canteen culinary community, we employ local students and support regional coffee bean cooperatives from the Highlands of Lipa and Batangas.',
    },
  ];

  // Flow Chart Steps Data
  const flowSteps = [
    {
      id: 1,
      title: '1. Browse & Add Menu Item',
      actor: 'Guest or Student',
      summary: 'Explore drinks, meals & kakanin. Filters dynamically.',
      stateImpact: '`cart` state triggers; opens reactive basket',
      fileSource: '/src/components/Services.tsx',
      details: 'When custom cards are clicked, the `onAddToCart` prop dispatches a copy of the Product structure with quantity: 1 inside React state. The checkout side drawer is automatically toggled visible for high interactive feedback.'
    },
    {
      id: 2,
      title: '2. Register & Verify Domain',
      actor: 'Client Session',
      summary: 'Student accounts check automatically for coupons.',
      stateImpact: '`currentUser` is populated & verified',
      fileSource: '/src/components/LoginRegister.tsx',
      details: 'The system validates account roles. Enrolling with a valid ID Number and matching the @student.edu domain triggers isStudent to compute instant cash savings of 10% on Batangas coffee products in your tray.'
    },
    {
      id: 3,
      title: '3. Choose Fulfillment & Pay',
      actor: 'User Checkout',
      summary: 'Select Counter Pick-up or local dorm delivery.',
      stateImpact: 'Totals calculated (adds ₱35 flat delivery fee)',
      fileSource: '/src/components/CartModal.tsx',
      details: 'Specify GCash QR, cash on delivery (COD) or counter payment. Optional culinary instructions or room coordinates are appended onto order specifications before sending to main canteen queues.'
    },
    {
      id: 4,
      title: '4. Place Stateful Order',
      actor: 'System Router',
      summary: 'Generates ORD-XXXX document id with pending code.',
      stateImpact: 'Appends to local React state array `orders`',
      fileSource: '/src/App.tsx',
      details: 'Compiles cart list items, computes precise subtotal, discounts, and dispatch fees. Emits stateful order update and synchronizes data with localStorage to retain continuity upon tab refreshes.'
    },
    {
      id: 5,
      title: '5. Chef Primo Live Pipelines',
      actor: 'Canteen Cook (Admin)',
      summary: 'Accept, process, and complete online queues.',
      stateImpact: '`orders` object status transition',
      fileSource: '/src/components/AdminDashboard.tsx',
      details: 'Chef Primo interacts with the active pipeline monitors. Can transition state from "pending" to "processing" to "dispatched" or "completed". Real-time indicators automatically react to change.'
    },
    {
      id: 6,
      title: '6. Food Handed Over',
      actor: 'Fulfilled Success',
      summary: 'Freshly steamed heritage eats are collected/delivered.',
      stateImpact: 'Orders archived; user cart reset to blank',
      fileSource: '/src/components/Footer.tsx',
      details: 'Customer is called for pickup or courier drops off the Batangas coffees to their school room. High customer satisfaction and heritage culinary tradition preserved!'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20 pb-20" id="about-view-root">
      
      {/* 1. BRAND STORY INTRO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="about-intro-grid">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-850">
            Our Background & Roots
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-amber-950 sm:text-4xl">
            From a Humble Cart to a Digital Campus Sanctuary
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            GK Coffee By Primo started in late 2018 with a single, handcrafted wooden cart parked near the college gates. Our founder, Chef Primo, saw that students struggled to find home-cooked, affordable meals and authentic Batangas barako coffee between classes.
          </p>
          <p className="text-base text-stone-600 leading-relaxed">
            With the backing of the school cooperative and local coffee farming unions, we expanded into the university canteen. Today, we bridge traditional Filipino soul-food like premium Bibingka rice-cake and large festive Bilao noodle spreads with quick-service digital ordering tools.
          </p>
          
          <div className="flex items-center space-x-4 border-l-4 border-amber-800 pl-4 py-1 bg-amber-50/50 pr-4 rounded-r-xl">
            <Award className="h-10 w-10 text-amber-800 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-950">A Canteen Approved Standard</p>
              <p className="text-xs text-stone-500">Certified by city sanitation standards, student committees, and agricultural unions.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
          id="about-visuals-wrapper"
        >
          <div className="absolute -inset-1 rounded-2xl bg-amber-200/50 blur-lg" />
          <div className="relative overflow-hidden rounded-xl border border-stone-150 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
              alt="GK Coffee Canteen Interior Workspace"
              className="w-full h-80 object-cover sm:h-96"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. VALUES GRID */}
      <section className="bg-amber-50/30 rounded-2xl p-8 sm:p-12 border border-amber-100" id="about-values">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h3 className="font-sans text-2xl font-bold tracking-tight text-stone-900">
            What Drives Chef Primo
          </h3>
          <p className="text-xs text-stone-500">
            Guided by three pillars of school hospitality, local produce, and food safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-amber-100 bg-white p-6 shadow-xs relative overflow-hidden flex flex-col items-start gap-4"
              id={`value-card-${idx}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                {val.icon}
              </div>
              <div>
                <h4 className="font-sans text-lg font-bold text-stone-900 mb-2">{val.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{val.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MEET THE FOUNDER PANEL */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="meet-owners">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative overflow-hidden rounded-xl bg-stone-100 border-4 border-white shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600"
              alt="Chef Primo Owner of GK Canteen"
              className="w-full h-[400px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 inset-x-0 bg-stone-950/80 p-4 text-center text-white">
              <h4 className="font-sans text-base font-bold">Chef Primo G. Kison</h4>
              <p className="text-xs text-amber-400">Founder & Chief Kitchen Operator</p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-7 space-y-6">
          <span className="font-mono text-xs font-bold uppercase text-amber-800">The Canteen Pioneer</span>
          <h2 className="font-sans text-2xl font-bold tracking-tight text-amber-950 sm:text-3xl">A Message from Chef Primo</h2>
          <blockquote className="border-l-4 border-amber-800 pl-4 text-stone-600 italic text-sm leading-relaxed">
            &ldquo;When a student walks into GK Coffee, we are not just selling them a cup of Barako coffee; we are fueling their late-night exam prep, their research projects, and providing them a warm space that feels like home. Our kakanin (traditional rice cakes) is cooked slowly using clean firewood techniques we learned from our grandparents. Thank you for supporting our digital canteen. Padayon!&rdquo;
          </blockquote>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-xl bg-amber-50 p-4 border border-amber-100">
              <span className="block text-2xl font-bold text-amber-950">5+ Years</span>
              <span className="text-[10px] uppercase text-stone-500 font-semibold tracking-wider">Campus Hospitality</span>
            </div>
            <div className="rounded-xl bg-amber-50 p-4 border border-amber-100">
              <span className="block text-2xl font-bold text-amber-950">10k+ Orders</span>
              <span className="text-[10px] uppercase text-stone-500 font-semibold tracking-wider">Served & Dispatched</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISUAL SITEMAP & FLOW CHART (INTERACTIVE SYSTEM BLUEPRINTS) */}
      <section className="border-t border-stone-200 pt-16 space-y-12" id="interactive-blueprints">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-850">
            Developer Documentation (HTML Code Specs)
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-stone-900">
            Interactive App Architecture & Flows
          </h2>
          <p className="text-xs text-stone-500">
            Explore the sitemap hierarchy structure and the step-by-step user checkout lifecycle model embedded within Chef Primo’s application. Click the tabs below to toggle blueprints.
          </p>

          {/* Tab selectors */}
          <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 mt-4">
            <button
              onClick={() => setArchTab('sitemap')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                archTab === 'sitemap'
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <Network className="h-4 w-4" />
              <span>Sitemap Tree Diagram</span>
            </button>
            <button
              onClick={() => setArchTab('flowchart')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                archTab === 'flowchart'
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <GitFork className="h-4 w-4" />
              <span>User Journey Flow Chart</span>
            </button>
          </div>
        </div>

        {/* --- BLUEPRINT CONTAINER CONTROLLERS --- */}
        {archTab === 'sitemap' ? (
          <div className="space-y-8 animate-fadeIn" id="sitemap-visual-diagram">
            
            {/* Legend banner */}
            <div className="rounded-xl bg-stone-900 text-stone-200 p-4 max-w-4xl mx-auto flex flex-wrap gap-6 justify-center text-xs divide-x divide-stone-800">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-500 shrink-0" />
                <span className="font-semibold text-stone-300">Public Pages</span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <span className="h-3 w-3 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-semibold text-stone-300">Auth Guard Overlay / State Controls</span>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <span className="h-3 w-3 rounded-full bg-red-500 shrink-0" />
                <span className="font-semibold text-stone-300">Admin Controls (Role: admin)</span>
              </div>
            </div>

            {/* Sitemap Nodes Tree Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              {/* Main App Root Core */}
              <div className="md:col-span-3 rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 text-center p-5 relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-white border border-stone-200 rounded-md text-[9px] font-mono text-stone-500">Root Node</div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Layers className="h-5.5 w-5.5 text-stone-700" />
                  <h3 className="font-sans text-sm font-bold text-stone-850">main.tsx &lt;App /&gt; Controller</h3>
                </div>
                <p className="text-[11px] text-stone-500 mt-1 max-w-sm mx-auto">
                  Serves as state repository. Restores user login, shopping baskets, and orders history utilizing client localStorage.
                </p>
              </div>

              {/* NODE 1: Public Interface Routes */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50/20 p-5 space-y-4 relative shadow-xs">
                <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-amber-500" />
                <div className="flex items-center gap-2">
                  <Compass className="h-4.5 w-4.5 text-amber-800" />
                  <h4 className="font-sans text-xs font-bold text-amber-950 uppercase tracking-wide">1. Public Navigation Tabs</h4>
                </div>
                <div className="space-y-3 text-[11px]">
                  <div className="rounded-lg bg-white border border-amber-100 p-2.5">
                    <strong className="block text-stone-800 text-[11.5px] font-semibold">Home View (Home.tsx)</strong>
                    <span className="text-stone-500 block leading-snug">Renders Batangas Barako hero banners, dynamic billboard notice feeds, and bestselling drinks add-to-cart buttons.</span>
                  </div>
                  <div className="rounded-lg bg-white border border-amber-100 p-2.5">
                    <strong className="block text-stone-800 text-[11.5px] font-semibold">Services View (Services.tsx)</strong>
                    <span className="text-stone-500 block leading-snug">Main catalog grid containing filters (All, Coffee, Meals, Kakanin), reservations, and table booker modules.</span>
                  </div>
                  <div className="rounded-lg bg-white border border-amber-100 p-2.5">
                    <strong className="block text-stone-800 text-[11.5px] font-semibold">Contact View (Contact.tsx)</strong>
                    <span className="text-stone-500 block leading-snug">Canteen schedules, GPS coordinates, interactive messaging forms, and cooking FAQs.</span>
                  </div>
                </div>
              </div>

              {/* NODE 2: Auth guard overlays & global state containers */}
              <div className="rounded-2xl border border-emerald-250 bg-emerald-50/10 p-5 space-y-4 relative shadow-xs">
                <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-emerald-500" />
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4.5 w-4.5 text-emerald-800" />
                  <h4 className="font-sans text-xs font-bold text-emerald-950 uppercase tracking-wide">2. Overlays & Session Core</h4>
                </div>
                <div className="space-y-3 text-[11px]">
                  <div className="rounded-lg bg-white border border-emerald-100 p-2.5">
                    <strong className="block text-stone-800 text-[11.5px] font-semibold">Auth Gateway (LoginRegister.tsx)</strong>
                    <span className="text-stone-500 block leading-snug">Registers credentials. Simulates university domain roles with instant pre-filled testing buttons.</span>
                  </div>
                  <div className="rounded-lg bg-white border border-emerald-100 p-2.5">
                    <strong className="block text-stone-800 text-[11.5px] font-semibold">Checkout Basket (CartModal.tsx)</strong>
                    <span className="text-stone-500 block leading-snug">Dynamic basket drawer interface that checks student coupons and computes delivery fees.</span>
                  </div>
                  <div className="rounded-lg bg-white border border-emerald-100 p-2.5">
                    <strong className="block text-emerald-950 font-bold">10% Off Student Logic</strong>
                    <span className="text-stone-500 block leading-snug">Checks: currentUser.role === &apos;student&apos; and coffee categories to deduct savings.</span>
                  </div>
                </div>
              </div>

              {/* NODE 3: Admin Console Control Panel */}
              <div className="rounded-2xl border border-red-200 bg-red-50/10 p-5 space-y-4 relative shadow-xs">
                <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-red-500" />
                <div className="flex items-center gap-2">
                  <Settings className="h-4.5 w-4.5 text-red-800" />
                  <h4 className="font-sans text-xs font-bold text-red-950 uppercase tracking-wide">3. Admin Workspace Queues</h4>
                </div>
                <div className="space-y-3 text-[11px]">
                  <div className="rounded-lg bg-white border border-red-100 p-2.5 border-l-2 border-l-red-500">
                    <strong className="block text-stone-800 text-[11.5px] font-semibold">Active Orders Monitor</strong>
                    <span className="text-stone-500 block leading-snug">Accept, dispatch, and complete incoming pickup and door delivery orders seamlessly.</span>
                  </div>
                  <div className="rounded-lg bg-white border border-red-100 p-2.5">
                    <strong className="block text-stone-800 text-[11.5px] font-semibold">Table Reservations Log</strong>
                    <span className="text-stone-500 block leading-snug">Approve or request adjustment for incoming client dining booking requests.</span>
                  </div>
                  <div className="rounded-lg bg-white border border-red-100 p-2.5">
                    <strong className="block text-stone-800 text-[11.5px] font-semibold">Corporate Catering Contracts</strong>
                    <span className="text-stone-500 block leading-snug">Administer festive kakanin and Bilao feasts assigned for collegiate events.</span>
                  </div>
                  <div className="rounded-lg bg-white border border-red-100 p-2.5">
                    <strong className="block text-stone-800 text-[11.5px] font-semibold">Menu Inventories & Bulletin Editor</strong>
                    <span className="text-stone-500 block leading-snug">Edit pricing, availability of foods, or publish city-wide announcements.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn" id="user-journey-routing-flowchart">
            
            {/* Modular Flow Chart Pipeline stepper progress */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              {flowSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setSelectedFlowStep(step.id)}
                  className={`relative p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between items-center h-28 ${
                    selectedFlowStep === step.id
                      ? 'bg-amber-850 bg-amber-800 text-white border-amber-900 shadow-lg scale-102 ring-2 ring-amber-400 ring-offset-2'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider block opacity-90 font-bold">{step.actor}</span>
                  <div className="text-[11.5px] font-bold leading-tight my-1.5">{step.title.split('. ')[1]}</div>
                  <div className={`h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9.5px] font-bold ${
                    selectedFlowStep === step.id ? 'bg-amber-100 text-amber-950' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {step.id}
                  </div>
                </button>
              ))}
            </div>

            {/* Display area of the selected step specs */}
            {(() => {
              const currentStepObj = flowSteps.find(s => s.id === selectedFlowStep)!;
              return (
                <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative overflow-hidden" id="flow-step-detail-card">
                  {/* Accent design back */}
                  <div className="absolute top-0 right-0 h-16 w-16 bg-amber-100/30 rounded-bl-3xl flex items-center justify-center text-amber-800 font-extrabold font-mono text-xl">
                    {currentStepObj.id}
                  </div>

                  <div className="md:col-span-12 border-b border-stone-100 pb-3">
                    <span className="font-mono text-[10px] text-amber-800 uppercase tracking-widest block font-bold">Currently Inspecting</span>
                    <h3 className="font-sans text-xl font-bold text-stone-900 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-amber-800 animate-pulse" />
                      <span>{currentStepObj.title}</span>
                    </h3>
                  </div>

                  {/* Left segment details */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">Operational Action Describe</span>
                      <p className="text-sm font-semibold text-stone-850 leading-relaxed">{currentStepObj.summary}</p>
                    </div>

                    <div className="space-y-1 bg-stone-50 rounded-xl p-4 border border-stone-150/70">
                      <span className="text-[10px] uppercase font-mono font-bold text-amber-850 tracking-wider block mb-1">State Machine Hook Code Details</span>
                      <p className="text-xs text-stone-600 leading-relaxed">{currentStepObj.details}</p>
                    </div>
                  </div>

                  {/* Right segment metadata */}
                  <div className="md:col-span-5 space-y-3.5 bg-amber-50/20 border border-amber-100 rounded-xl p-5">
                    <h4 className="font-sans text-xs font-bold text-amber-950 uppercase tracking-wider">System Specifications</h4>
                    
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] block font-bold text-stone-400 uppercase">Trigger Actor</span>
                        <span className="font-semibold text-stone-800">{currentStepObj.actor}</span>
                      </div>
                      <div>
                        <span className="text-[10px] block font-bold text-stone-400 uppercase">File Engine Scope</span>
                        <span className="font-mono text-[10.5px] font-semibold text-amber-900 bg-white border border-amber-200 px-1 py-0.5 rounded-sm block truncate" title={currentStepObj.fileSource}>
                          {currentStepObj.fileSource}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-amber-200/50 pt-3">
                      <span className="text-[10px] block font-bold text-stone-400 uppercase mb-1">Reactive State Variables</span>
                      <span className="font-mono text-[11px] block bg-stone-900 text-stone-200 p-2 rounded-lg font-bold">
                        {currentStepObj.stateImpact}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })()}

          </div>
        )}
      </section>

    </div>
  );
}
