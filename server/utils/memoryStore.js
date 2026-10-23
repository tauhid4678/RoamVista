import bcrypt from 'bcryptjs';
import { SEED_USERS, SEED_TOURS } from './seedData.js';

class MemoryStore {
  constructor() {
    this.users = [];
    this.tours = [];
    this.bookings = [];
    this.contacts = [];
    this.init();
  }

  async init() {
    // Hash passwords for seed users
    this.users = await Promise.all(
      SEED_USERS.map(async (u, idx) => ({
        _id: 'usr_' + (idx + 100),
        id: 'usr_' + (idx + 100),
        name: u.name,
        email: u.email.toLowerCase(),
        password: await bcrypt.hash(u.password, 10),
        role: u.role,
        avatar: u.avatar,
        phone: u.phone,
        bio: u.bio,
        createdAt: new Date().toISOString(),
      }))
    );

    // Load tours with generated IDs
    this.tours = SEED_TOURS.map((t, idx) => ({
      ...t,
      _id: 'tour_' + (idx + 100),
      id: t.slug || 'tour_' + (idx + 100),
      createdAt: new Date(Date.now() - idx * 86400000).toISOString(),
    }));

    // Seed initial bookings
    this.bookings = [
      {
        _id: 'bk_101',
        id: 'BK-9021',
        user: this.users[1] ? this.users[1]._id : 'usr_101',
        tour: this.tours[0],
        departureDate: '2026-11-15',
        guests: 2,
        totalPrice: this.tours[0].price * 2,
        contactName: 'Elena Rostova',
        contactEmail: 'traveler@roamvista.com',
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'bk_102',
        id: 'BK-8742',
        user: this.users[1] ? this.users[1]._id : 'usr_101',
        tour: this.tours[1],
        departureDate: '2027-03-20',
        guests: 2,
        totalPrice: this.tours[1].price * 2,
        contactName: 'Elena Rostova',
        contactEmail: 'traveler@roamvista.com',
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      },
    ];

    // Seed initial contacts
    this.contacts = [
      {
        _id: 'cnt_101',
        name: 'Marcus Sterling',
        email: 'marcus@sterlingcapital.co.uk',
        subject: 'Custom Family Charter for Serengeti Great Migration',
        category: 'Custom Group Charter',
        message: 'Looking to organize a private 6-person family departure for August 2027. Please send available naturalist dates.',
        isRead: false,
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'cnt_102',
        name: 'Clara Lindqvist',
        email: 'clara.lindqvist@nordictravel.se',
        subject: 'Inquiry regarding Patagonia high trail fitness expectations',
        category: 'Physical & Gear Preparation',
        message: 'Could your mountain team share altitude gain charts for the French Valley segment?',
        isRead: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }

  // Tours methods
  findTours({ search, category, maxPrice, minRating, duration, sort, page = 1, limit = 8 }) {
    let result = [...this.tours];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      result = result.filter((t) => t.category === category);
    }

    if (maxPrice) {
      result = result.filter((t) => t.price <= Number(maxPrice));
    }

    if (minRating && minRating !== 'All') {
      result = result.filter((t) => t.rating >= Number(minRating));
    }

    if (duration === 'short') {
      result = result.filter((t) => t.durationDays <= 7);
    } else if (duration === 'medium') {
      result = result.filter((t) => t.durationDays >= 8 && t.durationDays <= 10);
    } else if (duration === 'long') {
      result = result.filter((t) => t.durationDays >= 11);
    }

    // Sort
    if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'duration') {
      result.sort((a, b) => a.durationDays - b.durationDays);
    } else {
      result.sort((a, b) => (b.isFeatured ? 1 : -1));
    }

    const total = result.length;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    const paginated = result.slice(skip, skip + limitNum);

    return {
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      count: paginated.length,
      data: paginated,
    };
  }

  findTourById(id) {
    return this.tours.find((t) => t._id === id || t.id === id || t.slug === id);
  }

  createTour(data) {
    const newTour = {
      ...data,
      _id: 'tour_' + Date.now(),
      id: (data.title || 'tour').toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString(),
    };
    this.tours.unshift(newTour);
    return newTour;
  }

  updateTour(id, data) {
    const idx = this.tours.findIndex((t) => t._id === id || t.id === id || t.slug === id);
    if (idx === -1) return null;
    this.tours[idx] = { ...this.tours[idx], ...data };
    return this.tours[idx];
  }

  deleteTour(id) {
    const idx = this.tours.findIndex((t) => t._id === id || t.id === id || t.slug === id);
    if (idx === -1) return false;
    this.tours.splice(idx, 1);
    return true;
  }

  // Users methods
  findUserByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find((u) => u._id === id || u.id === id);
  }

  async createUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = {
      _id: 'usr_' + Date.now(),
      id: 'usr_' + Date.now(),
      name: data.name,
      email: data.email.toLowerCase(),
      password: hashedPassword,
      role: data.role || 'user',
      avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      phone: data.phone || '',
      bio: data.bio || '',
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, data) {
    const user = this.findUserById(id);
    if (!user) return null;
    Object.assign(user, data);
    return user;
  }

  deleteUser(id) {
    const idx = this.users.findIndex((u) => u._id === id || u.id === id);
    if (idx === -1) return false;
    this.users.splice(idx, 1);
    return true;
  }

  // Bookings methods
  findBookings(userId) {
    let list = this.bookings;
    if (userId) {
      list = list.filter((b) => b.user === userId || b.user?._id === userId);
    }
    return list;
  }

  createBooking(data) {
    const tour = this.findTourById(data.tourId) || this.tours[0];
    const newBooking = {
      _id: 'bk_' + Date.now(),
      id: 'BK-' + Math.floor(1000 + Math.random() * 9000),
      user: data.userId,
      tour,
      departureDate: data.departureDate,
      guests: Number(data.guests),
      totalPrice: tour.price * Number(data.guests),
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  cancelBooking(id) {
    const b = this.bookings.find((item) => item._id === id || item.id === id);
    if (!b) return null;
    b.status = 'Cancelled';
    return b;
  }

  // Contacts
  createContact(data) {
    const newContact = {
      _id: 'cnt_' + Date.now(),
      ...data,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    this.contacts.unshift(newContact);
    return newContact;
  }

  findContacts() {
    return this.contacts;
  }

  toggleContactRead(id) {
    const c = this.contacts.find((item) => item._id === id);
    if (!c) return null;
    c.isRead = !c.isRead;
    return c;
  }
}

export const memoryStore = new MemoryStore();
export default memoryStore;
