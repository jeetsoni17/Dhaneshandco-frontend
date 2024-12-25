<?php
$conn = new mysqli("localhost", "u723981255_jeet", "Dhaneshco@123", "u723981255_dhanesh_db");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = intval($_GET['id']); // Get file ID from request

$query = "SELECT file_path, file_name FROM pricelist WHERE id = $id";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $file = "pricelist/" . $row['file_path']; // Path to the file

    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $row['file_name'] . '"');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    } else {
        echo "File not found.";
    }
} else {
    echo "Invalid file ID.";
}

$conn->close();
?>
