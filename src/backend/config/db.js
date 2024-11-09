const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createPool({
  host: 'localhost',          // Change to your host, e.g., localhost or your database server's IP
  user: 'root',      // Your MySQL username
  password: '',  // Your MySQL password
  database: 'dhanesh_db',     // Your database name (as per your previous messages)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the database connection
module.exports = db;