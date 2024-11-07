const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Middleware for serving static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Log to confirm the static folder setup
console.log(`Serving images from: ${path.join(__dirname, 'images')}`);

// Database connection
const connectDatabase = async () => {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dhanesh_db', // database name
  });
  return db;
};

const startServer = async () => {
  const db = await connectDatabase();

  // Get all categories
  app.get('/api/categories', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM categories');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get all subcategories
  app.get('/api/subcategories', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM subcategories');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get all sub_subcategories
  app.get('/api/sub_subcategories', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM sub_subcategories');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching sub_subcategories:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get all products
  app.get('/api/products', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM products');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get all pricelist
  app.get('/api/pricelist', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM pricelist');
      res.json(rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  // Get a single product by ID
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

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

// Call the function to start the server
startServer().catch((error) => {
  console.error('Error starting server:', error);
});
