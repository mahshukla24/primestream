<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $titleId = (int) ($_GET['title_id'] ?? 0);
    if ($titleId < 1) {
        json_response(['ok' => false, 'message' => 'title_id is required.'], 422);
    }

    $stmt = $pdo->prepare(
        'SELECT r.id, r.rating, r.review_text, r.created_at, u.name AS reviewer_name
         FROM reviews r
         JOIN users u ON u.id = r.user_id
         WHERE r.title_id = :title_id
         ORDER BY r.created_at DESC'
    );
    $stmt->execute(['title_id' => $titleId]);
    $reviews = $stmt->fetchAll();

    foreach ($reviews as &$review) {
        $review['id'] = (int) $review['id'];
        $review['rating'] = (float) $review['rating'];
    }
    unset($review);

    json_response(['ok' => true, 'reviews' => $reviews]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'message' => 'Method not allowed.'], 405);
}

$user = require_login();
$payload = read_json_input();
$titleId = (int) ($payload['title_id'] ?? 0);
$rating = round((float) ($payload['rating'] ?? 0), 1);
$reviewText = trim((string) ($payload['review_text'] ?? ''));

if ($titleId < 1 || $rating < 1.0 || $rating > 10.0 || $reviewText === '') {
    json_response(['ok' => false, 'message' => 'Invalid review payload.'], 422);
}

$titleCheck = $pdo->prepare('SELECT id FROM titles WHERE id = :id');
$titleCheck->execute(['id' => $titleId]);
if (!$titleCheck->fetch()) {
    json_response(['ok' => false, 'message' => 'Title not found.'], 404);
}

$upsert = $pdo->prepare(
    'INSERT INTO reviews (user_id, title_id, rating, review_text)
     VALUES (:user_id, :title_id, :rating, :review_text)
     ON DUPLICATE KEY UPDATE rating = VALUES(rating), review_text = VALUES(review_text)'
);
$upsert->execute([
    'user_id' => (int) $user['id'],
    'title_id' => $titleId,
    'rating' => $rating,
    'review_text' => $reviewText,
]);

append_audit_log(sprintf(
    'review user=%d title=%d rating=%.1f chars=%d',
    (int) $user['id'],
    $titleId,
    $rating,
    strlen($reviewText)
));

json_response(['ok' => true, 'message' => 'Review saved.']);
