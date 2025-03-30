module.exports = (sequelize, DataTypes) => {
    const ShoppingCart = sequelize.define('ShoppingCart', {
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
      },
    });
  
    ShoppingCart.associate = function (models) {
      // Associations can be defined here
      ShoppingCart.hasMany(models.CartItem, {
        foreignKey: 'shopping_cart_id',
        as: 'items',
      });
      ShoppingCart.hasOne(models.Order, {
        foreignKey: 'shopping_cart_id',
        as: 'order',
      });
    };
  
    return ShoppingCart;
  };
  