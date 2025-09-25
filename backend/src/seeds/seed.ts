import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { config } from '../lib/config';
import { UserModel } from '../models/user.model';

dotenv.config();

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log('DB connected');

    // Clear existing users (optional)
    await UserModel.deleteMany({});

    // Seed admin user
    const adminPasswordHash = await bcrypt.hash(config.SEED_ADMIN_PASSWORD, 10);

    const adminUser = await UserModel.create({
      name: 'Admin User',
      email: config.SEED_ADMIN_EMAIL,
      passwordHash: adminPasswordHash,
      isActive: true,
      role: 'admin',
      mustChangePassword: false,
    });

    console.log('Admin user created:', adminUser.email);

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
