<?php
declare(strict_types=1);

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function read_json_input(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function normalize_mood(?string $mood): string
{
    $allowed = ['chill', 'thrill', 'focus', 'family', 'romance'];
    if ($mood === null) {
        return 'chill';
    }

    $normalized = strtolower(trim($mood));
    return in_array($normalized, $allowed, true) ? $normalized : 'chill';
}

function set_mood_cookie(string $mood): string
{
    $normalized = normalize_mood($mood);
    setcookie('prime_mood', $normalized, time() + (86400 * 30), '/');
    return $normalized;
}

function get_mood_cookie(): string
{
    $current = $_COOKIE['prime_mood'] ?? 'chill';
    return normalize_mood($current);
}

function prime_score(float $imdb, ?float $community): float
{
    if ($community === null || $community <= 0) {
        return round($imdb, 1);
    }

    return round(($imdb * 0.7) + ($community * 0.3), 1);
}

function root_path(string $relative = ''): string
{
    $base = dirname(__DIR__);
    return $relative === '' ? $base : $base . DIRECTORY_SEPARATOR . $relative;
}

function storage_path(string $relative = ''): string
{
    $base = root_path('storage');
    return $relative === '' ? $base : $base . DIRECTORY_SEPARATOR . $relative;
}

function append_audit_log(string $line): void
{
    $file = storage_path('review_audit.log');
    $dir = dirname($file);
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }

    file_put_contents($file, '[' . date('c') . '] ' . $line . PHP_EOL, FILE_APPEND | LOCK_EX);
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
