<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$type = (string) ($_GET['type'] ?? 'all');
$search = trim((string) ($_GET['search'] ?? ''));

$service = new ContentService($pdo, $logger);
$allowed = ['all', 'movie', 'tv_show', 'cartoon'];
if (!in_array($type, $allowed, true)) {
    $type = 'all';
}

jsonResponse([
    'success' => true,
    'items' => $service->listContent($type, $search),
    'top_rated' => $service->topRated(),
]);
