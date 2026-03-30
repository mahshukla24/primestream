<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    jsonResponse(['success' => true, 'theme' => $_COOKIE['ps_theme'] ?? 'dark']);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$data = getJsonBody();
$theme = ((string) ($data['theme'] ?? 'dark')) === 'light' ? 'light' : 'dark';

setcookie('ps_theme', $theme, [
    'expires' => time() + (60 * 60 * 24 * 30),
    'path' => '/',
    'secure' => false,
    'httponly' => false,
    'samesite' => 'Lax',
]);

jsonResponse(['success' => true, 'theme' => $theme]);
