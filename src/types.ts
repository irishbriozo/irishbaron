export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'hot-coffee' | 'iced-coffee' | 'kakanin' | 'bilao' | 'meals';
  image: string;
  available: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'student' | 'admin';
  idNumber?: string; // Student ID
  phone: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: 'customer' | 'student' | 'admin';
  phone: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'completed' | 'cancelled';
  type: 'pickup' | 'delivery';
  address?: string;
  notes?: string;
  createdAt: string;
}

export interface Reservation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  phone: string;
  date: string;
  time: string;
  guestsCount: number;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface CateringBooking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  phone: string;
  eventName: string;
  date: string;
  expectedGuests: number;
  packageId: string;
  packageName: string;
  notes?: string;
  address: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  active: boolean;
}
