const mongoose = require('mongoose');
require('dotenv').config();
const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/topify');
    console.log('Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists. Updating password...');
      existingAdmin.password = 'admin123';
      await existingAdmin.save();
      console.log('Admin password updated successfully!');
    } else {
      console.log('Creating new admin...');
      const admin = new Admin({
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin created successfully!');
    }

    console.log('\nAdmin Credentials:');
    console.log('Email: admin@gmail.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
