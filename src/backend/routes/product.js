const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// GET route for fetching all products
router.get('/products', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM products'); // Query to select all products
    res.json(rows); // Send the fetched products as JSON
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route for fetching a single product by ID
router.get('/products/:id', async (req, res) => {
  const productId = req.params.id; // Get the product ID from the request parameters
  try {
    const [rows] = await db.promise().query('SELECT * FROM products WHERE product_id = ?', [productId]); // Fetch the product by ID
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' }); // Handle case where product is not found
    }
    res.json(rows[0]); // Send the fetched product as JSON
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route for fetching all categories
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM categories'); // Fetch categories
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route for fetching all subcategories
router.get('/subcategories', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM subcategories'); // Fetch subcategories
    res.json(rows);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route for fetching all sub-subcategories
router.get('/sub_subcategories', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM sub_subcategories'); // Fetch sub-subcategories
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sub_subcategories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router
module.exports = router;
