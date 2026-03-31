<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$user = require_auth(db());

if (!isset($_FILES['avatar'])) {
    json_response(['error' => 'Avatar file is required'], 422);
}

$file = $_FILES['avatar'];

if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
    json_response(['error' => 'File upload failed'], 422);
}

if (($file['size'] ?? 0) > 2 * 1024 * 1024) {
    json_response(['error' => 'File too large (max 2MB)'], 422);
}

$allowed = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
];

$mime = mime_content_type((string) $file['tmp_name']);
if (!isset($allowed[$mime])) {
    json_response(['error' => 'Only JPG, PNG, WEBP allowed'], 422);
}

$uploadDir = root_path('storage/uploads');
if (!is_dir($uploadDir) && !mkdir($uploadDir, 0775, true) && !is_dir($uploadDir)) {
    json_response(['error' => 'Cannot create upload directory'], 500);
}

$filename = sprintf('avatar_u%d_%s.%s', (int) $user['id'], bin2hex(random_bytes(8)), $allowed[$mime]);
$fullPath = $uploadDir . DIRECTORY_SEPARATOR . $filename;

if (!move_uploaded_file((string) $file['tmp_name'], $fullPath)) {
    json_response(['error' => 'Could not save uploaded file'], 500);
}

$relative = 'storage/uploads/' . $filename;
$stmt = db()->prepare('UPDATE users SET avatar_path = :avatar WHERE id = :id');
$stmt->execute([
    'avatar' => $relative,
    'id' => (int) $user['id'],
]);

json_response([
    'success' => true,
    'message' => 'Avatar uploaded successfully',
    'avatar_path' => $relative,
]);
