const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createPool({
  host: '154.41.233.204',          // Change to your host, e.g., localhost or your database server's IP
  user: 'u723981255_jeet',      // Your MySQL username
  password: 'Dhaneshco@123',  // Your MySQL password
  database: 'u723981255_dhanesh_db',     // Your database name (as per your previous messages)
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the database connection
module.exports = db;