<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$user = requireUser();
$userId = (int) $user['id'];
$service = new ContentService($pdo, $logger);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    jsonResponse(['success' => true, 'watchlist' => $service->userWatchlist($userId)]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$data = getJsonBody();
$contentId = (int) ($data['content_id'] ?? 0);
if ($contentId <= 0) {
    jsonResponse(['success' => false, 'message' => 'Invalid content id.'], 422);
}

$inWatchlist = $service->toggleWatchlist($userId, $contentId);
jsonResponse([
    'success' => true,
    'in_watchlist' => $inWatchlist,
    'message' => $inWatchlist ? 'Added to watchlist.' : 'Removed from watchlist.',
]);
