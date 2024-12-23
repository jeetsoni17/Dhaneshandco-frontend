const express = require('express');
const os = require('os'); // Import the OS module to get network interfaces
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Get the local network IP address or fallback to localhost
const getIPAddress = () => {
  const networkInterfaces = os.networkInterfaces();
  for (let interfaceName in networkInterfaces) {
    for (let net of networkInterfaces[interfaceName]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost'; // Fallback to localhost if no external IP is found
};

const ipAddress = getIPAddress(); // Get the actual IP address
console.log(`Server is running on http://${ipAddress}:${PORT}`);

const corsOptions = {
  origin: '*', // Adjust to match your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Middleware
app.use(cors(corsOptions)); // Enable CORS
app.use(express.json()); // Parse JSON payloads

// Serve static images and pricelist files
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/pricelist', express.static(path.join(__dirname, 'pricelist')));

// Log for confirming static folder setup
console.log(`Serving images from: ${path.join(__dirname, 'images')}`);
console.log(`Serving pricelist files from: ${path.join(__dirname, 'pricelist')}`);

// Database connection pool setup for better performance
const pool = mysql.createPool({
  host: '154.41.233.204', // Database host
  user: 'u723981255_jeet', // MySQL username
  password: 'Dhaneshco@123', // MySQL password
  database: 'u723981255_dhanesh_db', // Database name
  waitForConnections: true,
  connectionLimit: 10, // Number of concurrent connections
  queueLimit: 0,
});

// Function to execute queries safely with connection pooling
const executeQuery = async (query, params = []) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.query(query, params);
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    if (connection) connection.release(); // Release the connection back to the pool
  }
};

// Routes

// Route: Fetch all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await executeQuery('SELECT * FROM categories');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Route: Fetch all subcategories
app.get('/api/subcategories', async (req, res) => {
  try {
    const subcategories = await executeQuery('SELECT * FROM subcategories');
    res.json(subcategories);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({ message: 'Error fetching subcategories' });
  }
});

// Route: Fetch all sub-subcategories
app.get('/api/sub_subcategories', async (req, res) => {
  try {
    const subSubcategories = await executeQuery('SELECT * FROM sub_subcategories');
    res.json(subSubcategories);
  } catch (error) {
    console.error('Error fetching sub-subcategories:', error);
    res.status(500).json({ message: 'Error fetching sub-subcategories' });
  }
});

// Route: Fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await executeQuery('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Route: Fetch pricelist data
app.get('/api/pricelist', async (req, res) => {
  try {
    const pricelist = await executeQuery('SELECT * FROM pricelist');
    res.json(pricelist);
  } catch (error) {
    console.error('Error fetching pricelist:', error);
    res.status(500).json({ message: 'Error fetching pricelist' });
  } 
});

// Route: Fetch a single product by ID
app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await executeQuery('SELECT * FROM products WHERE product_id = ?', [productId]);
    if (product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Route: Download a pricelist file by ID
app.get('/api/pricelist/download/:id', async (req, res) => {
  const fileId = req.params.id;
  try {
    const [file] = await executeQuery('SELECT file_name, file_path FROM pricelist WHERE id = ?', [fileId]);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    const filePath = path.join(__dirname, 'pricelist', file.file_path);
    if (fs.existsSync(filePath)) {
      res.download(filePath, file.file_name);
    } else {
      res.status(404).json({ message: 'File does not exist on the server' });
    }
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ message: 'Error downloading file' });
  }
});

// Start the server and bind to the actual IP address or localhost
app.listen(PORT, ipAddress, () => {
  console.log(`Server is running on http://${ipAddress}:${PORT}`);
});