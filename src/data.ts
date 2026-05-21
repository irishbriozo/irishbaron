import { Product, Announcement, Order, Reservation, CateringBooking } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // Hot Coffee
  {
    id: 'hc-1',
    name: 'Primo Barako Blend',
    description: 'Rich, bold, and intense traditional Batangas Barako coffee sweetened just right.',
    price: 65,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'hc-2',
    name: 'Spanish Latte',
    description: 'Double espresso with textured fresh milk and a sweet hit of condensed milk.',
    price: 85,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'hc-3',
    name: 'Creamy Capuccino',
    description: 'Espresso top-coated with standard deep frothy milk microfoam and cocoa dust.',
    price: 80,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'hc-4',
    name: 'Classic Americano',
    description: 'Rich signature espresso shots combined with piping hot purified water.',
    price: 55,
    category: 'hot-coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
    available: true,
  },

  // Iced Coffee
  {
    id: 'ic-1',
    name: 'Iced Primo Latte',
    description: 'Chilled premium espresso over milk and ice, finished with signature syrup.',
    price: 90,
    category: 'iced-coffee',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'ic-2',
    name: 'Iced Caramel Macchiato',
    description: 'Iced espresso with creamy milk and rich buttery caramel drizzle on top.',
    price: 95,
    category: 'iced-coffee',
    image: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'ic-3',
    name: 'Matcha Espresso Duo',
    description: 'Layered premium Japanese Uji matcha and signature strong espresso over cold milk.',
    price: 110,
    category: 'iced-coffee',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'ic-4',
    name: 'Choco Fudge Cold Brew',
    description: 'Smooth cold-steeped coffee poured with a dark, house-made chocolate fudge milk block.',
    price: 100,
    category: 'iced-coffee',
    image: 'https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=600',
    available: false, // Set one unavailable to demonstrate filter state toggle
  },

  // Kakanin
  {
    id: 'kk-1',
    name: 'Primo Special Bibingka',
    description: 'Clay-oven baked sweet rice cake topped with fresh salted egg, cheese, and grated coconut.',
    price: 75,
    category: 'kakanin',
    image: 'https://images.unsplash.com/photo-1608039783021-6116a558f0c5?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'kk-2',
    name: 'Puto Bumbong',
    description: 'Traditional purple glutinous rice steamed in bamboo tubes, served with muscovado sugar.',
    price: 80,
    category: 'kakanin',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'kk-3',
    name: 'Creamy Leche Flan',
    description: '菲律宾 traditional rich and silky egg custard baked over a sweet dark caramel glaze layer.',
    price: 120,
    category: 'kakanin',
    image: 'https://images.unsplash.com/photo-1528975604071-b4daaf306d88?auto=format&fit=crop&q=80&w=600',
    available: true,
  },

  // Bilao Food Packages (Filipino Style)
  {
    id: 'bl-1',
    name: 'Pancit Canton Bilao Fiesta',
    description: 'Savory stir-fried noodles overflowing with fresh meat, crisp local vegetables and calamansi squeeze.',
    price: 450,
    category: 'bilao',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'bl-2',
    name: 'Palabok Overload Bilao',
    description: 'Rice noodles draped in deep-orange shrimp sauce, loaded with pork cracklings, garlic, and egg.',
    price: 480,
    category: 'bilao',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'bl-3',
    name: 'Lumpiang Shanghai Bilao',
    description: '40 pieces of crispy deep-fried golden pork spring rolls served with a pot of sweet & sour sauce.',
    price: 350,
    category: 'bilao',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=600',
    available: true,
  },

  // Meals
  {
    id: 'ml-1',
    name: 'Sizzling Pork Sisig with Egg',
    description: 'Minced pork cheek seasoned with citrus, onions, chili served on hot plate with a fresh sunny egg.',
    price: 110,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'ml-2',
    name: 'Chicken Inasal Rice Bowl',
    description: 'Charcoal-grilled marinated chicken thigh cooked in annatto garlic oil, served with garlic rice.',
    price: 115,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'ml-3',
    name: 'Classic Pork Adobo Rice Bowl',
    description: 'Tender pork cubes slow-stewed in vinegar, soy sauce, garlic, and aromatic bay leaves.',
    price: 105,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1608198072124-386f926686e3?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Student Discount Everyday!',
    content: 'Calling all students! Present your valid school ID on order pickup to get an extra 10% off on all hot and iced coffee drinks.',
    date: '2026-05-20',
    active: true,
  },
  {
    id: 'ann-2',
    title: 'Weekend Catering Slot Available',
    content: 'We still have 2 open slots for full-service event catering bookings on May 30th and 31st. Contact us to reserve your customized barako cart!',
    date: '2026-05-19',
    active: true,
  },
  {
    id: 'ann-3',
    title: 'Special Puto Bumbong is Back!',
    content: 'Due to popular demand, our heritage clay-steamed purple rice kakanin is now available on our permanent daily menu.',
    date: '2026-05-18',
    active: true,
  },
];

export const CATERING_PACKAGES = [
  {
    id: 'cat-std',
    name: 'Barako Coffeetime package',
    pricePerHead: 150,
    description: 'Perfect for small office meetings or mini-gatherings.',
    includes: [
      'Unlimited flow of Hot Primo Barako Blend and Americano',
      'Assorted mini Filipino kakanin (Bibingka slices and Leche flan)',
      'A dedicated barista for 2 hours',
      'Themed rustic wood setup',
    ],
  },
  {
    id: 'cat-deluxe',
    name: 'Heritage Merienda Feast',
    pricePerHead: 250,
    description: 'Ideal for birthdays, family reunions, and formal celebrations.',
    includes: [
      'Hot & Iced Coffee Custom Bar (including Latte, Caramel Macchiato, and Brews)',
      'Choice of 2 Bilao Main Platters (Pancit Canton and Lumpiang Shanghai)',
      'Full serving of clay-oven special Puto Bumbong and Leche Flan cups',
      'Themed bamboo cart and coffee equipment presentation with staff (4 hours)',
    ],
  },
  {
    id: 'cat-grand',
    name: 'Primo Full Buffet Combo',
    pricePerHead: 380,
    description: 'Comprehensive catering ideal for major corporate launches, weddings, or large social functions.',
    includes: [
      'Premium Espresso and Ice Blender Bar (featuring cold brews, specialty syrups and lattes)',
      'Choice of 3 main meals with hot-steamed rice (Sisig, Chicken Inasal, Beef Caldereta)',
      'Full assortment of sweet traditional Filipino rice cakes (Kakanin platters)',
      'Complete dining buffet tables, table chairs, premium service staff & linens (5 hours)',
    ],
  },
];

// Preloaded mock data for Admin visualization
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-9481',
    userId: 'cust-1',
    userName: 'Juan Dela Cruz',
    userEmail: 'juan@customer.com',
    userRole: 'customer',
    phone: '09171234567',
    items: [
      { productId: 'hc-2', productName: 'Spanish Latte', price: 85, quantity: 2 },
      { productId: 'kk-1', productName: 'Primo Special Bibingka', price: 75, quantity: 1 }
    ],
    total: 245,
    status: 'pending',
    type: 'delivery',
    address: 'Block 4 Lot 12, Golden Hills Subdivision, Biñan, Laguna',
    notes: 'Please keep the coffee extra hot.',
    createdAt: '2026-05-20T14:30:00Z',
  },
  {
    id: 'ORD-9482',
    userId: 'stud-1',
    userName: 'Sophia Briozo',
    userEmail: 'sophia@student.edu',
    userRole: 'student',
    phone: '09187654321',
    items: [
      { productId: 'ic-2', productName: 'Iced Caramel Macchiato', price: 95, quantity: 1 },
      { productId: 'ml-1', productName: 'Sizzling Pork Sisig with Egg', price: 110, quantity: 1 }
    ],
    total: 205,
    status: 'preparing',
    type: 'pickup',
    notes: 'ID student discount applied. Will pick up after my 4 PM class.',
    createdAt: '2026-05-21T02:00:00Z',
  },
  {
    id: 'ORD-9483',
    userId: 'cust-2',
    userName: 'Maria Santos',
    userEmail: 'maria@customer.com',
    userRole: 'customer',
    phone: '09054433221',
    items: [
      { productId: 'bl-1', productName: 'Pancit Canton Bilao Fiesta', price: 450, quantity: 1 },
      { productId: 'bl-3', productName: 'Lumpiang Shanghai Bilao', price: 350, quantity: 1 }
    ],
    total: 800,
    status: 'completed',
    type: 'delivery',
    address: '15 Rizal Street, Barangay Central, Santa Rosa, Laguna',
    notes: 'Include extra sweet & sour sauce cups.',
    createdAt: '2026-05-19T10:15:00Z',
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'RES-3021',
    userId: 'cust-1',
    userName: 'Juan Dela Cruz',
    userEmail: 'juan@customer.com',
    phone: '09171234567',
    date: '2026-05-25',
    time: '13:00',
    guestsCount: 4,
    notes: 'We prefer a table near the glass window if possible.',
    status: 'pending',
    createdAt: '2026-05-20T16:45:00Z',
  },
  {
    id: 'RES-3022',
    userId: 'stud-1',
    userName: 'Sophia Briozo',
    userEmail: 'sophia@student.edu',
    phone: '09187654321',
    date: '2026-05-22',
    time: '11:30',
    guestsCount: 2,
    notes: 'Student study group discussion reservation.',
    status: 'accepted',
    createdAt: '2026-05-21T01:00:00Z',
  }
];

export const INITIAL_CATERING_BOOKINGS: CateringBooking[] = [
  {
    id: 'CAT-5501',
    userId: 'cust-3',
    userName: 'Rene Imperial',
    userEmail: 'rene@company.com',
    phone: '09228889900',
    eventName: 'Fintech Corp Midyear Review Seminars',
    date: '2026-06-12',
    expectedGuests: 50,
    packageId: 'cat-deluxe',
    packageName: 'Heritage Mer Merienda Feast',
    notes: 'Needs setup prepared by 1:30 PM. Coffee bar must run until 6 PM.',
    address: '3/F Boardroom, Pioneer Business Center, Pasig City',
    status: 'pending',
    createdAt: '2026-05-20T08:00:00Z',
  },
  {
    id: 'CAT-5502',
    userId: 'cust-4',
    userName: 'Elena Ruiz',
    userEmail: 'elena@wedding.com',
    phone: '09361112233',
    eventName: 'Ruiz Family Diamond Anniversary',
    date: '2026-05-28',
    expectedGuests: 120,
    packageId: 'cat-grand',
    packageName: 'Primo Full Buffet Combo',
    notes: 'Gold and brown linens requested. Buffet setup at garden veranda.',
    address: 'Villa Elena Heritage Garden, Calamba, Laguna',
    status: 'accepted',
    createdAt: '2026-05-18T11:40:00Z',
  }
];
