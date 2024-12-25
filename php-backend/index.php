<?php
header("Content-Type: application/json");

// Simulate data fetching from a database
$data = [
    ['id' => 1, 'name' => 'Product 1', 'description' => 'Description for Product 1'],
    ['id' => 2, 'name' => 'Product 2', 'description' => 'Description for Product 2'],
    ['id' => 3, 'name' => 'Product 3', 'description' => 'Description for Product 3'],
];

echo json_encode($data);