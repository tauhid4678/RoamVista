import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Tour from '../models/Tour.js';
import Booking from '../models/Booking.js';
import Contact from '../models/Contact.js';
import { SEED_USERS, SEED_TOURS } from './seedData.js';

export const importData = async () => {
  try {
    await connectDB();

    console.log('[Seeder] Cleaning existing collections...');
    await User.deleteMany();
    await Tour.deleteMany();
    await Booking.deleteMany();
    await Contact.deleteMany();

    console.log('[Seeder] Seeding users with bcrypt hashing...');
    const createdUsers = [];
    for (const u of SEED_USERS) {
      const user = await User.create(u);
      createdUsers.push(user);
    }
    console.log(`[Seeder] Created ${createdUsers.length} users (Admin: admin@roamvista.com, Traveler: traveler@roamvista.com).`);

    console.log('[Seeder] Seeding tours catalog...');
    const createdTours = await Tour.insertMany(SEED_TOURS);
    console.log(`[Seeder] Created ${createdTours.length} authentic expeditions.`);

    console.log('[Seeder] Seeding initial bookings...');
    const adminUser = createdUsers.find((u) => u.role === 'admin');
    const standardUser = createdUsers.find((u) => u.role === 'user');

    if (standardUser && createdTours.length > 0) {
      await Booking.create([
        {
          user: standardUser._id,
          tour: createdTours[0]._id,
          departureDate: '2026-11-15',
          guests: 2,
          totalPrice: createdTours[0].price * 2,
          contactName: standardUser.name,
          contactEmail: standardUser.email,
          status: 'Confirmed',
        },
        {
          user: standardUser._id,
          tour: createdTours[1]._id,
          departureDate: '2027-03-20',
          guests: 2,
          totalPrice: createdTours[1].price * 2,
          contactName: standardUser.name,
          contactEmail: standardUser.email,
          status: 'Confirmed',
        },
      ]);
      console.log('[Seeder] Created initial user bookings.');
    }

    console.log('[Seeder] Seeding initial customer inquiries...');
    await Contact.create([
      {
        name: 'Marcus Sterling',
        email: 'marcus@sterlingcapital.co.uk',
        subject: 'Custom Family Charter for Serengeti Great Migration',
        category: 'Custom Group Charter',
        message: 'Looking to organize a private 6-person family departure for August 2027. Please send available naturalist dates.',
        isRead: false,
      },
      {
        name: 'Clara Lindqvist',
        email: 'clara.lindqvist@nordictravel.se',
        subject: 'Inquiry regarding Patagonia high trail fitness expectations',
        category: 'Physical & Gear Preparation',
        message: 'Could your mountain team share altitude gain charts for the French Valley segment?',
        isRead: true,
      },
    ]);
    console.log('[Seeder] Created initial contact inquiries.');

    console.log('[Seeder] Database seeding completed successfully!');
    if (process.argv[1].endsWith('seeder.js')) {
      process.exit(0);
    }
  } catch (error) {
    console.error(`[Seeder Error] ${error.message}`);
    if (process.argv[1].endsWith('seeder.js')) {
      process.exit(1);
    }
  }
};

if (process.argv[1] && process.argv[1].endsWith('seeder.js')) {
  importData();
}

export default importData;
