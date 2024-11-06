const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// GET route for fetching all products
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM products'); // Query to select all products
    res.json(rows); // Send the fetched products as JSON
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route for fetching a single product by ID
app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id; // Get the product ID from the request parameters
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [productId]); // Fetch the product by ID
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' }); // Handle case where product is not found
    }
    res.json(rows[0]); // Send the fetched product as JSON
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Example routes for categories and subcategories

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all subcategories
router.get('/subcategories', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM subcategories');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all sub_subcategories
router.get('/sub_subcategories', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM sub_subcategories');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching sub_subcategories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Export the router
module.exports = router;
