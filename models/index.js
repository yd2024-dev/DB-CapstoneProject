const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: config.dialectOptions,
});

const db = {
  sequelize,
  Sequelize,
  Product: require('./product.js')(sequelize, DataTypes),
  ShoppingCart: require('./cart.js')(sequelize, DataTypes),
  CartItem: require('./cartItem.js')(sequelize, DataTypes),
  Order: require('./order.js')(sequelize, DataTypes),
};

// Define associations
db.CartItem.belongsTo(db.Product, { foreignKey: 'product_id' });
db.CartItem.belongsTo(db.ShoppingCart, { foreignKey: 'shopping_cart_id' });
db.Order.belongsTo(db.ShoppingCart, { foreignKey: 'shopping_cart_id' });

module.exports = db;
