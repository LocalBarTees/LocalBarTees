<?php
/**
 * Simple Image Server - Debug Version
 * Put this file (image.php) in the same folder as your PNG files
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Simple image mapping - add all your mockup images here
$images = [
    'r3_logo' => 'R3 by LBT_sample.png',
    'blue_back' => 'blue_tshirt_back.png',
    'purple_back' => 'purple_tshirt_back.png',
    'red_womens_back' => 'red_womens_tshirt_back.png',
    'red_mens_back' => 'red_mens_tshirt_back.png',
    'black_front' => 'black_tshirt_front.png',
    'black_womens_back' => 'black_womens_tshirt_back.png',
    'black_mens_back' => 'black_mens_tshirt_back.png',
    'test' => 'test-image.png'  // Keep test image if needed
];

// Get the requested image ID
$id = $_GET['id'] ?? '';

// Debug output (remove this once working)
echo "<!-- DEBUG INFO:\n";
echo "Requested ID: " . $id . "\n";
echo "Current directory: " . __DIR__ . "\n";
echo "Available images: " . print_r($images, true) . "\n";
echo "Files in directory: " . print_r(scandir(__DIR__), true) . "\n";
echo "-->\n";

// Check if ID exists
if (empty($id) || !isset($images[$id])) {
    http_response_code(404);
    die('Image ID not found. Available IDs: ' . implode(', ', array_keys($images)));
}

// Get the filename
$filename = $images[$id];
$filepath = __DIR__ . '/' . $filename;

echo "<!-- Looking for file: " . $filepath . " -->\n";

// Check if file exists
if (!file_exists($filepath)) {
    http_response_code(404);
    die('File not found: ' . $filename . ' at path: ' . $filepath);
}

// Get file extension and set content type
$extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
$contentTypes = [
    'png' => 'image/png',
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'gif' => 'image/gif'
];

if (!isset($contentTypes[$extension])) {
    die('Unsupported file type: ' . $extension);
}

// Clear any previous output
if (ob_get_level()) {
    ob_end_clean();
}

// Set headers for better protection
header('Content-Type: ' . $contentTypes[$extension]);
header('Content-Length: ' . filesize($filepath));
header('Cache-Control: private, max-age=3600');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: no-referrer');

// Output the file
readfile($filepath);
exit;
?>