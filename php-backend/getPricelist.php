<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$conn = new mysqli("154.41.233.204", "u723981255_jeet", "Dhaneshco@123", "u723981255_dhanesh_db");

if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error); // Log connection error
    die("Connection failed: " . $conn->connect_error);
} else {
    error_log("Database connection successful."); // Log successful connection
}

// Query to fetch pricelist
$query = "SELECT id, file_name, file_path, uploaded_at FROM pricelist";
$result = $conn->query($query);

if (!$result) {
    error_log("Query failed: " . $conn->error); // Log if query fails
}

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
    error_log("Fetched row: " . json_encode($row)); // Log each fetched row
}

echo json_encode($data); // Send data as JSON response

$conn->close();
?>
