const express = require('express');
const router = express.Router();

let inventory = [
  { id: 1, name: 'Headphones', category: 'Electronics', stock: 100, price: 12 },
  { id: 2, name: 'Iphone', category: 'Electronics', stock: 20, price: 1500 },
  { id: 3, name: 'Laptop', category: 'Electronics', stock: 50, price: 1100 },
  { id: 4, name: 'Furniture', category: 'Home', stock: 10, price: 700 },
];

const orders = [
  { date: '2025-05-01', category: 'Electronics', orders: 15, revenue: 25000 },
  { date: '2025-05-02', category: 'Electronics', orders: 20, revenue: 30000 },
  { date: '2025-05-02', category: 'Home', orders: 5, revenue: 7000 },
  { date: '2025-05-03', category: 'Electronics', orders: 18, revenue: 28000 },
  // Add more data as needed for weekly/monthly/yearly trends
];

// GET inventory list
router.get('/', (req, res) => {
  res.json(inventory);
});

// POST update inventory
router.post('/update', (req, res) => {
  const { id, stock } = req.body;
  const product = inventory.find(item => item.id === id);
  if (product) {
    product.stock = stock;
    res.status(200).json({ message: 'Stock updated successfully', product });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST add new product
router.post('/add', (req, res) => {
  const { name, category, stock, price } = req.body;
  const newProduct = {
    id: inventory.length + 1,
    name,
    category,
    stock,
    price
  };
  inventory.push(newProduct);
  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

// New endpoint for dashboard data with filtering
router.get('/dashboard-data', (req, res) => {
  let { range = 'daily', category = '' } = req.query;

  let filteredOrders = category
    ? orders.filter(o => o.category.toLowerCase() === category.toLowerCase())
    : [...orders];

  res.json(filteredOrders);
});

module.exports = router;
