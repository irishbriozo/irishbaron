import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Users } from 'lucide-react';

export default function About() {
  const coreValues = [
    {
      icon: <Target className="h-6 w-6 text-amber-800" />,
      title: 'Our Mission',
      description: 'To nourish our school community and the public with high-quality, authentic Filipino meals and freshly harvested Kapeng Barako coffee at pricing structures tailored for hard-working students.',
    },
    {
      icon: <Eye className="h-6 w-6 text-amber-800" />,
      title: 'Our Vision',
      description: 'To become the premier culinary cafe hub in Laguna, recognized for preserving Filipino heritage coffee culture and festive catering services combined with a modern digital experience.',
    },
    {
      icon: <Users className="h-6 w-6 text-amber-800" />,
      title: 'Our Heritage Team',
      description: 'Founded and run by Chef Primo and the GK Cafe culinary community, we employ local food artisans and support regional coffee bean cooperatives from the Highlands of Lipa and Batangas.',
    },
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
            Where We Are Located
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            GK Cafe By Primo started in late 2018. It is located inside the main campus of CMDI School in Bay, Laguna. Our founder Primo, saw a deep public desire for premium Batangas barako coffee.
          </p>
          <p className="text-base text-stone-600 leading-relaxed">
            With the backing of our community and local agricultural unions, we established our modern cafe in CMDI Main Bay Campus . Today, we bridge traditional coffee cups and family-sized catering platters with a modern online ordering platform.
          </p>
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
              alt="GK Cafe Interior Workspace"
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

    </div>
  );
}
