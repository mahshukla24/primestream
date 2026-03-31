<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$pdo = db();
$search = trim((string) ($_GET['q'] ?? ''));
$mood = normalize_mood((string) ($_GET['mood'] ?? get_mood_cookie()));
set_mood_cookie($mood);

$sql = '
    SELECT
        t.id,
        t.title,
        t.genre,
        t.mood,
        t.release_year,
        t.duration_min,
        t.imdb_rating,
        t.trailer_url,
        t.thumbnail_url,
        t.description,
        COALESCE(AVG(r.rating), 0) AS community_rating,
        COUNT(r.id) AS review_count
    FROM titles t
    LEFT JOIN reviews r ON r.title_id = t.id
    WHERE t.mood = :mood
';
$params = ['mood' => $mood];

if ($search !== '') {
    $sql .= ' AND (t.title LIKE :search OR t.genre LIKE :search OR t.description LIKE :search) ';
    $params['search'] = '%' . $search . '%';
}

$sql .= '
    GROUP BY t.id
    ORDER BY (0.7 * t.imdb_rating + 0.3 * COALESCE(NULLIF(AVG(r.rating), 0), t.imdb_rating)) DESC, t.title ASC
';

$stmt = $pdo->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();

$items = array_map(static function (array $row): array {
    $communityRaw = (float) $row['community_rating'];
    $community = $communityRaw > 0 ? round($communityRaw, 1) : null;
    $imdb = round((float) $row['imdb_rating'], 1);

    return [
        'id' => (int) $row['id'],
        'title' => $row['title'],
        'genre' => $row['genre'],
        'mood' => $row['mood'],
        'release_year' => (int) $row['release_year'],
        'duration_min' => (int) $row['duration_min'],
        'imdb_rating' => $imdb,
        'community_rating' => $community,
        'prime_score' => prime_score($imdb, $community),
        'review_count' => (int) $row['review_count'],
        'trailer_url' => $row['trailer_url'],
        'thumbnail_url' => $row['thumbnail_url'],
        'description' => $row['description'],
    ];
}, $rows);

json_response([
    'success' => true,
    'active_mood' => $mood,
    'items' => $items,
]);
