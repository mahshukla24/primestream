<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

$user = requireUser();
$userId = (int) $user['id'];
$service = new ContentService($pdo, $logger);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    jsonResponse(['success' => true, 'ratings' => $service->userRatings($userId)]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$data = getJsonBody();
$contentId = (int) ($data['content_id'] ?? 0);
$rating = (int) ($data['rating'] ?? 0);

if ($contentId <= 0 || $rating < 1 || $rating > 5) {
    jsonResponse(['success' => false, 'message' => 'Rating must be between 1 and 5.'], 422);
}

$service->saveRating($userId, $contentId, $rating);
jsonResponse(['success' => true, 'message' => 'Rating saved successfully.']);
