// POST create new product or multiple products
exports.createProduct = async (req, res) => {
  try {
    const data = req.body;

    // If it's an array of products
    if (Array.isArray(data)) {
      const validProducts = data.filter(p => p.name && p.price); // Validate each item
      if (validProducts.length === 0) {
        return res.status(400).json({ message: 'Each product must have name and price' });
      }

      const newProducts = await Product.insertMany(validProducts);
      return res.status(201).json(newProducts);
    }

    // If it's a single product
    const { name, description, price, image } = data;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and Price are required' });
    }

    const newProduct = new Product({ name, description, price, image });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
