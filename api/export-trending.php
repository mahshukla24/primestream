<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$pdo = db();
$user = require_auth($pdo);

$stmt = $pdo->query(
    'SELECT
        t.id,
        t.title,
        t.genre,
        t.mood,
        t.imdb_rating,
        COALESCE(AVG(r.rating), 0) AS community_rating,
        COUNT(r.id) AS review_count
     FROM titles t
     LEFT JOIN reviews r ON r.title_id = t.id
     GROUP BY t.id
     ORDER BY review_count DESC, t.imdb_rating DESC
     LIMIT 10'
);

$rows = $stmt->fetchAll();
$titles = [];
foreach ($rows as $row) {
    $community = (float) $row['community_rating'];
    $imdb = (float) $row['imdb_rating'];

    $titles[] = [
        'id' => (int) $row['id'],
        'title' => (string) $row['title'],
        'genre' => (string) $row['genre'],
        'mood' => (string) $row['mood'],
        'imdb_rating' => round($imdb, 1),
        'community_rating' => round($community, 1),
        'prime_score' => prime_score($imdb, $community > 0 ? $community : null),
        'review_count' => (int) $row['review_count'],
    ];
}

$exportData = [
    'generated_at' => date(DATE_ATOM),
    'generated_by' => [
        'id' => (int) $user['id'],
        'name' => (string) $user['name'],
        'email' => (string) $user['email'],
    ],
    'titles' => $titles,
];

$exportDir = root_path('storage/exports');
if (!is_dir($exportDir)) {
    mkdir($exportDir, 0775, true);
}

$filename = 'trending_' . date('Ymd_His') . '.json';
$fullPath = $exportDir . DIRECTORY_SEPARATOR . $filename;
$json = json_encode($exportData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

if ($json === false || file_put_contents($fullPath, $json) === false) {
    json_response(['success' => false, 'message' => 'Failed to write export file'], 500);
}

json_response([
    'success' => true,
    'message' => 'Trending exported',
    'file_url' => 'storage/exports/' . $filename,
    'entries' => count($titles),
]);
