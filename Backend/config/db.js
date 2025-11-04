// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MERN Blog MongoDB Connected Successfully...');
  } catch (error) {
    console.error('MERN Blog MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
