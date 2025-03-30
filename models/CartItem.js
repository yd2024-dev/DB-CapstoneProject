  // models/CartItem.js
  module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
    return CartItem;
  };
