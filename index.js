require('dotenv').config();
:contentReference[oaicite:10]{index=10}

:contentReference[oaicite:11]{index=11}

:contentReference[oaicite:12]{index=12}
  :contentReference[oaicite:13]{index=13}
  :contentReference[oaicite:14]{index=14}
    :contentReference[oaicite:15]{index=15}
      :contentReference[oaicite:16]{index=16}
      :contentReference[oaicite:17]{index=17}
    :contentReference[oaicite:18]{index=18}
  :contentReference[oaicite:19]{index=19}
:contentReference[oaicite:20]{index=20}

const express = require('express');
const bodyParser = require('body-parser');
const { Product, ShoppingCart, CartItem, Order, sequelize } = require('./models'); // Ensure you import sequelize

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// 1. Browse Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// 2. Add Product to Shopping Cart
app.post('/api/shopping_cart/:customerId/items', async (req, res) => {
  const { customerId } = req.params;
  const { productId, quantity } = req.body;
  try {
    let shoppingCart = await ShoppingCart.findOne({ where: { customer_id: customerId } });
    if (!shoppingCart) {
      shoppingCart = await ShoppingCart.create({ customer_id: customerId });
    }
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }
    const subtotal = product.price * quantity;
    const cartItem = await CartItem.create({
      shopping_cart_id: shoppingCart.id,
      product_id: productId,
      quantity,
      subtotal,
    });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to shopping cart' });
  }
});

// 3. List Shopping Cart Items
app.get('/api/shopping_cart/:customerId/items', async (req, res) => {
  const { customerId } = req.params;
  try {
    const shoppingCart = await ShoppingCart.findOne({ where: { customer_id: customerId } });
    if (!shoppingCart) {
      return res.status(404).json({ error: 'Shopping cart not found' });
    }
    const cartItems = await CartItem.findAll({ where: { shopping_cart_id: shoppingCart.id } });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve shopping cart items' });
  }
});

// 4. Remove Product from Shopping Cart
app.delete('/api/shopping_cart/:customerId/items/:itemId', async (req, res) => {
  const { customerId, itemId } = req.params;
  try {
    const shoppingCart = await ShoppingCart.findOne({ where: { customer_id: customerId } });
    if (!shoppingCart) {
      return res.status(404).json({ error: 'Shopping cart not found' });
    }
    const cartItem = await CartItem.findOne({ where: { id: itemId, shopping_cart_id: shoppingCart.id } });
    if (!cartItem) {
      return res.status(404).json({ error: 'Shopping cart item not found' });
    }
    await cartItem.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from shopping cart' });
  }
});

// 5. Create Order from Shopping Cart
app.post('/api/shopping_cart/:customerId/order', async (req, res) => {
  const { customerId } = req.params;
  try {
    const shoppingCart = await ShoppingCart.findOne({ where: { customer_id: customerId } });
    if (!shoppingCart) {
      return res.status(404).json({ error: 'Shopping cart not found' });
    }
    const cartItems = await CartItem.findAll({ where: { shopping_cart_id: shoppingCart.id } });
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Shopping cart is empty' });
    }
    const totalAmount = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    const order = await Order.create({
      shopping_cart_id: shoppingCart.id,
      total_amount,
      status: 'pending',
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Sync Database and Start Server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
