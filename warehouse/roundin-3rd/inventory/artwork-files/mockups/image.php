<?php
/**
 * Simple Image Server - Debug Version
 * Put this file (image.php) in the same folder as your PNG file
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Simple image mapping
$images = [
    'r3_logo' => 'R3 by LBT_sample.png',
    'test' => 'test-image.png'  // Add a test image if needed
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

// Set headers
header('Content-Type: ' . $contentTypes[$extension]);
header('Content-Length: ' . filesize($filepath));
header('Cache-Control: private, max-age=3600');

// Output the file
readfile($filepath);
exit;
?>