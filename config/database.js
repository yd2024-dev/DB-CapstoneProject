const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables from .env

// Set up Sequelize with your database credentials
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;
