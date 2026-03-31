<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = require_login();

    $stmt = $pdo->prepare(
        'SELECT
            t.id AS title_id,
            t.title,
            t.genre,
            t.mood,
            t.release_year,
            t.duration_min,
            t.imdb_rating,
            t.thumbnail_url,
            t.trailer_url,
            w.created_at
         FROM watchlist w
         JOIN titles t ON t.id = w.title_id
         WHERE w.user_id = :user_id
         ORDER BY w.created_at DESC'
    );
    $stmt->execute(['user_id' => (int) $user['id']]);
    $items = $stmt->fetchAll();

    json_response([
        'success' => true,
        'items' => $items,
    ]);
}

if (!in_array($_SERVER['REQUEST_METHOD'], ['POST', 'DELETE'], true)) {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$user = require_login();
$payload = read_json_input();
$titleId = (int) ($payload['title_id'] ?? 0);
$action = (string) ($payload['action'] ?? '');

if ($titleId < 1) {
    json_response(['success' => false, 'message' => 'Invalid payload'], 422);
}

$checkTitle = $pdo->prepare('SELECT id FROM titles WHERE id = :id');
$checkTitle->execute(['id' => $titleId]);
if (!$checkTitle->fetch()) {
    json_response(['success' => false, 'message' => 'Title not found'], 404);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $action !== 'remove') {
    $stmt = $pdo->prepare(
        'INSERT INTO watchlist (user_id, title_id)
         VALUES (:user_id, :title_id)
         ON DUPLICATE KEY UPDATE created_at = created_at'
    );
    $stmt->execute([
        'user_id' => (int) $user['id'],
        'title_id' => $titleId,
    ]);

    json_response([
        'success' => true,
        'message' => 'Added to watchlist',
    ]);
}

$stmt = $pdo->prepare('DELETE FROM watchlist WHERE user_id = :user_id AND title_id = :title_id');
$stmt->execute([
    'user_id' => (int) $user['id'],
    'title_id' => $titleId,
]);

json_response([
    'success' => true,
    'message' => 'Removed from watchlist',
]);
