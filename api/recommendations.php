<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$pdo = db();
$user = auth_user();

$mood = normalize_mood((string) ($_GET['mood'] ?? get_mood_cookie()));
set_mood_cookie($mood);

$userId = $user ? (int) $user['id'] : 0;
$watchlistIds = [];
if ($userId > 0) {
    $watchStmt = $pdo->prepare('SELECT title_id FROM watchlist WHERE user_id = :user_id');
    $watchStmt->execute(['user_id' => $userId]);
    $watchlistIds = array_map('intval', array_column($watchStmt->fetchAll(), 'title_id'));
}

$journalMoods = [];
if ($userId > 0) {
    $journalStmt = $pdo->prepare(
        'SELECT mood
         FROM mood_journal
         WHERE user_id = :user_id
         ORDER BY created_at DESC
         LIMIT 5'
    );
    $journalStmt->execute(['user_id' => $userId]);
    $journalMoods = array_map('strval', array_column($journalStmt->fetchAll(), 'mood'));
}

$moodPriority = [];
foreach ($journalMoods as $jm) {
    if (!isset($moodPriority[$jm])) {
        $moodPriority[$jm] = 0;
    }
    $moodPriority[$jm] += 1;
}
if (!isset($moodPriority[$mood])) {
    $moodPriority[$mood] = 0;
}
$moodPriority[$mood] += 2;

arsort($moodPriority);
$topMoods = array_slice(array_keys($moodPriority), 0, 2);
if (count($topMoods) === 0) {
    $topMoods = [$mood];
}

$placeholders = implode(',', array_fill(0, count($topMoods), '?'));
$recSql = "
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
    WHERE t.mood IN ($placeholders)
    GROUP BY t.id
    ORDER BY (0.7 * t.imdb_rating + 0.3 * COALESCE(NULLIF(AVG(r.rating), 0), t.imdb_rating)) DESC
    LIMIT 8
";
$recStmt = $pdo->prepare($recSql);
$recStmt->execute($topMoods);
$rows = $recStmt->fetchAll();

$recommendations = [];
foreach ($rows as $row) {
    $titleId = (int) $row['id'];
    if (in_array($titleId, $watchlistIds, true)) {
        continue;
    }

    $communityRaw = (float) $row['community_rating'];
    $community = $communityRaw > 0 ? round($communityRaw, 1) : null;
    $imdb = round((float) $row['imdb_rating'], 1);

    $recommendations[] = [
        'id' => $titleId,
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
}

$surprise = null;
if (count($recommendations) > 0) {
    $surprise = $recommendations[array_rand($recommendations)];
}

json_response([
    'success' => true,
    'active_mood' => $mood,
    'top_moods' => $topMoods,
    'reason' => 'Based on your recent mood journal and active mood.',
    'items' => array_slice($recommendations, 0, 6),
    'surprise_pick' => $surprise,
]);
