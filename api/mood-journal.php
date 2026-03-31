<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

$pdo = db();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user = require_login();
    $stmt = $pdo->prepare(
        'SELECT id, mood, note, created_at
         FROM mood_journal
         WHERE user_id = :user_id
         ORDER BY id DESC
         LIMIT 20'
    );
    $stmt->execute(['user_id' => (int) $user['id']]);
    $entries = $stmt->fetchAll();

    foreach ($entries as &$entry) {
        $entry['id'] = (int) $entry['id'];
    }
    unset($entry);

    json_response([
        'success' => true,
        'entries' => $entries,
    ]);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$user = require_login();
$payload = read_json_input();
$mood = normalize_mood((string) ($payload['mood'] ?? ''));
$note = trim((string) ($payload['note'] ?? ''));

if ($note === '') {
    json_response(['success' => false, 'message' => 'Note is required'], 422);
}

if (strlen($note) > 280) {
    json_response(['success' => false, 'message' => 'Note should be <= 280 characters'], 422);
}

$stmt = $pdo->prepare(
    'INSERT INTO mood_journal (user_id, mood, note)
     VALUES (:user_id, :mood, :note)'
);
$stmt->execute([
    'user_id' => (int) $user['id'],
    'mood' => $mood,
    'note' => $note,
]);

json_response([
    'success' => true,
    'message' => 'Mood journal saved',
]);
