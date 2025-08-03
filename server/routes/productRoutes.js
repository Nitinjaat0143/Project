const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one or multiple new products
router.post('/', async (req, res) => {
  const data = req.body;

  try {
    // If array => multiple products
    if (Array.isArray(data)) {
      const validProducts = data.filter(p => p.name && p.price);
      if (validProducts.length === 0) {
        return res.status(400).json({ message: 'Each product must have name and price' });
      }

      const inserted = await Product.insertMany(validProducts);
      return res.status(201).json(inserted);
    }

    // Single product case
    const { name, description, price, image } = data;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and Price are required' });
    }

    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json(product);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
