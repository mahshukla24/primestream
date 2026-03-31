<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$pdo = db();

$users = $pdo->query('SELECT id, name, email, avatar_path, created_at FROM users ORDER BY id DESC LIMIT 20')->fetchAll();
$titles = $pdo->query('SELECT id, title, genre, mood, imdb_rating, created_at FROM titles ORDER BY id DESC LIMIT 20')->fetchAll();
$reviews = $pdo->query(
    'SELECT r.id, r.title_id, r.user_id, r.rating, r.review_text, r.created_at, u.name AS user_name, t.title AS title_name
     FROM reviews r
     JOIN users u ON u.id = r.user_id
     JOIN titles t ON t.id = r.title_id
     ORDER BY r.id DESC
     LIMIT 30'
)->fetchAll();

$exportDir = storage_path('exports');
$uploadDir = storage_path('uploads');
$auditPath = storage_path('review_audit.log');

$exportFiles = [];
if (is_dir($exportDir)) {
    foreach (array_values(array_filter(scandir($exportDir) ?: [], static function (string $entry): bool {
        return $entry !== '.' && $entry !== '..';
    })) as $file) {
        $full = $exportDir . DIRECTORY_SEPARATOR . $file;
        $exportFiles[] = [
            'name' => $file,
            'size_bytes' => is_file($full) ? (int) filesize($full) : 0,
            'path' => 'storage/exports/' . $file,
        ];
    }
}

$uploadFiles = [];
if (is_dir($uploadDir)) {
    foreach (array_values(array_filter(scandir($uploadDir) ?: [], static function (string $entry): bool {
        return $entry !== '.' && $entry !== '..';
    })) as $file) {
        $full = $uploadDir . DIRECTORY_SEPARATOR . $file;
        $uploadFiles[] = [
            'name' => $file,
            'size_bytes' => is_file($full) ? (int) filesize($full) : 0,
            'path' => 'storage/uploads/' . $file,
        ];
    }
}

$auditPreview = '';
if (is_file($auditPath)) {
    $lines = file($auditPath, FILE_IGNORE_NEW_LINES);
    if (is_array($lines)) {
        $slice = array_slice($lines, -10);
        $auditPreview = implode("\n", $slice);
    }
}

json_response([
    'success' => true,
    'database' => [
        'users' => $users,
        'titles' => $titles,
        'reviews' => $reviews,
    ],
    'files' => [
        'exports' => $exportFiles,
        'uploads' => $uploadFiles,
        'review_audit_log_path' => 'storage/review_audit.log',
        'review_audit_log_preview' => $auditPreview,
    ],
]);
