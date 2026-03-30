<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$user = requireUser();
$userId = (int) $user['id'];
$service = new ContentService($pdo, $logger);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    jsonResponse(['success' => true, 'recent' => $service->recentlyViewed($userId)]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$data = getJsonBody();
$contentId = (int) ($data['content_id'] ?? 0);
$title = trim((string) ($data['title'] ?? 'Unknown'));
if ($contentId <= 0) {
    jsonResponse(['success' => false, 'message' => 'Invalid content id.'], 422);
}

$service->addRecentlyViewed($userId, $contentId, $title);
jsonResponse(['success' => true, 'message' => 'Saved to recently viewed.']);
