<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

$pdo = db();

$users = (int) $pdo->query('SELECT COUNT(*) FROM users')->fetchColumn();
$titles = (int) $pdo->query('SELECT COUNT(*) FROM titles')->fetchColumn();
$reviews = (int) $pdo->query('SELECT COUNT(*) FROM reviews')->fetchColumn();
$watchlist = (int) $pdo->query('SELECT COUNT(*) FROM watchlist')->fetchColumn();
$journalEntries = (int) $pdo->query('SELECT COUNT(*) FROM mood_journal')->fetchColumn();

$uploadsDir = root_path('storage/uploads');
$exportsDir = root_path('storage/exports');
$auditLog = root_path('storage/review_audit.log');

$uploadedAvatars = 0;
if (is_dir($uploadsDir)) {
    $uploadedAvatars = count(array_values(array_filter(scandir($uploadsDir) ?: [], static function (string $entry): bool {
        return $entry !== '.' && $entry !== '..';
    })));
}

$exportsCount = 0;
if (is_dir($exportsDir)) {
    $exportsCount = count(array_values(array_filter(scandir($exportsDir) ?: [], static function (string $entry): bool {
        return $entry !== '.' && $entry !== '..';
    })));
}

$auditBytes = file_exists($auditLog) ? (int) filesize($auditLog) : 0;

json_response([
    'success' => true,
    'user' => auth_user(),
    'stats' => [
        'users' => $users,
        'titles' => $titles,
        'reviews' => $reviews,
        'watchlist' => $watchlist,
        'mood_journal_entries' => $journalEntries,
        'uploaded_avatars' => $uploadedAvatars,
        'exports_count' => $exportsCount,
        'audit_log_bytes' => $auditBytes,
    ],
]);
