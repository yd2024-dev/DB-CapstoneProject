const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();  // Ensure dotenv is loaded

// Retrieve DATABASE_URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL;

// Initialize Sequelize with the DATABASE_URL
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  ssl: {
    require: true,  // If your database requires SSL
    rejectUnauthorized: false,  // This can be set to false if SSL certificate validation is not required
  },
});

const db = {
  sequelize,
  Sequelize,
  Product: require('./Product.js')(sequelize, DataTypes),
  ShoppingCart: require('./ShoppingCart.js')(sequelize, DataTypes),
  CartItem: require('./CartItem.js')(sequelize, DataTypes),
  Order: require('./Order.js')(sequelize, DataTypes),
};

// Define associations
db.CartItem.belongsTo(db.Product, { foreignKey: 'product_id' });
db.CartItem.belongsTo(db.ShoppingCart, { foreignKey: 'shopping_cart_id' });
db.Order.belongsTo(db.ShoppingCart, { foreignKey: 'shopping_cart_id' });

module.exports = db;
