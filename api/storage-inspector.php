<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$user = requireUser();

$tables = ['users', 'content_items', 'watchlist_items', 'ratings'];
$counts = [];
foreach ($tables as $table) {
    $stmt = $pdo->query('SELECT COUNT(*) FROM ' . $table);
    $counts[$table] = (int) $stmt->fetchColumn();
}

$recentUsers = $pdo->query('SELECT id, name, email, created_at FROM users ORDER BY id DESC LIMIT 5')->fetchAll();
$recentRatings = $pdo->query(
    'SELECT r.user_id, r.content_id, r.rating, r.updated_at, c.title
     FROM ratings r
     INNER JOIN content_items c ON c.id = r.content_id
     ORDER BY r.updated_at DESC
     LIMIT 5'
)->fetchAll();

$logger = new StorageLogger(__DIR__ . '/../data/logs/user-actions.log');

jsonResponse([
    'success' => true,
    'inspected_by' => $user['name'] ?? 'unknown',
    'counts' => $counts,
    'recent_users' => $recentUsers,
    'recent_ratings' => $recentRatings,
    'file_logs' => $logger->tail(10),
]);
