  // models/Order.js
  module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
    });
    return Order;
  };
