const mongoose = require('mongoose');
const logger = require('../utils/logger.util');
const { mongoURI } = require('../config/db.config');

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
