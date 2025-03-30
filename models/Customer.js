const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'Users', // Explicitly setting the table name to match the DB schema
  timestamps: false,  // Assuming no created_at/updated_at fields in the Users table
});

module.exports = Customer;

