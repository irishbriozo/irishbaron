import { Product, Announcement, Order, Reservation, CateringBooking, Review } from './types';

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
    title: 'Festive Bilao Feast Platter Pack!',
    content: 'Perfect for family and office gatherings. Order of our standard and custom bilao assortments are prepared freshly on request!',
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
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600',
    includes: [
      'Unlimited flow of Hot Primo Barako Blend and Americano',
      'Mini Bilao Platter sampler (Lumpiang Shanghai and Pancit Canton)',
      'A dedicated barista for 2 hours',
      'Themed rustic wood setup',
    ],
  },
  {
    id: 'cat-deluxe',
    name: 'Heritage Merienda Feast',
    pricePerHead: 250,
    description: 'Ideal for birthdays, family reunions, and formal celebrations.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=600',
    includes: [
      'Hot & Iced Coffee Custom Bar (including Latte, Caramel Macchiato, and Brews)',
      'Choice of 2 Bilao Main Platters (Pancit Canton and Lumpiang Shanghai)',
      'Side of Crispy Veggie Lumpiang Platter',
      'Themed bamboo cart and coffee equipment presentation with staff (4 hours)',
    ],
  },
  {
    id: 'cat-grand',
    name: 'Primo Full Buffet Combo',
    pricePerHead: 380,
    description: 'Comprehensive catering ideal for major corporate launches, weddings, or large social functions.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600',
    includes: [
      'Premium Espresso and Ice Blender Bar (featuring cold brews, specialty syrups and lattes)',
      'Three premium assorted Bilao main platters (Pancit Canton, Palabok, Shanghai combo)',
      'Full assortment of sweet specialty beverages and extra coffee bar custom additions',
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
      { productId: 'hc-2', productName: 'Spanish Latte', price: 85, quantity: 2 }
    ],
    total: 170,
    status: 'pending',
    type: 'delivery',
    address: 'Purok 2, Barangay Maahas, Los Baños, Laguna, Philippines',
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
      { productId: 'bl-1', productName: 'Pancit Canton Bilao Fiesta', price: 450, quantity: 1 }
    ],
    total: 545,
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
    address: '22 Bonifacio Street, Bucal, Calamba, Laguna',
    notes: 'Include extra sweet & sour sauce cups.',
    createdAt: '2026-05-19T10:15:00Z',
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [];

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
    address: 'UP Los Baños Staff Housing, Los Baños, Laguna (near Bay boundary)',
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
    address: 'Elena Ruiz Residences, Barangay Maahas, Los Baños, Laguna, Philippines',
    status: 'accepted',
    createdAt: '2026-05-18T11:40:00Z',
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    itemId: 'hc-1',
    userName: 'Juan Dela Cruz',
    rating: 5,
    comment: 'The absolute best Barako coffee in Laguna! Bold, hot, and sweet enough.',
    createdAt: '2026-05-20T10:30:00Z'
  },
  {
    id: 'rev-2',
    itemId: 'hc-1',
    userName: 'Sophia Briozo',
    rating: 4,
    comment: 'Perfect pick-me-up before exams. Real rich flavor!',
    createdAt: '2026-05-21T08:15:00Z'
  },
  {
    id: 'rev-3',
    itemId: 'hc-2',
    userName: 'Maria Santos',
    rating: 5,
    comment: 'Super creamy Spanish Latte. The condensed milk is perfectly portioned.',
    createdAt: '2026-05-19T14:20:00Z'
  },
  {
    id: 'rev-4',
    itemId: 'ic-2',
    userName: 'Lester Alcantara',
    rating: 4,
    comment: 'Refreshing and rich. Perfect sweetness for a hot afternoon.',
    createdAt: '2026-05-21T11:45:00Z'
  },
  {
    id: 'rev-5',
    itemId: 'bl-1',
    userName: 'Eduardo G.',
    rating: 5,
    comment: 'Ordered this for our department meeting and everyone loved it. Pancit is loaded with toppings.',
    createdAt: '2026-05-18T12:00:00Z'
  },
  {
    id: 'rev-6',
    itemId: 'cat-deluxe',
    userName: 'Rene Imperial',
    rating: 5,
    comment: 'Amazing catering presentation! The rustic setup and staff were top-notch.',
    createdAt: '2026-05-20T17:30:00Z'
  },
  {
    id: 'rev-7',
    itemId: 'cat-grand',
    userName: 'Dr. Evelyn Martinez',
    rating: 5,
    comment: 'Sensational full-service espresso bar. Our symposium guests were thoroughly impressed!',
    createdAt: '2026-05-15T15:10:00Z'
  }
];
