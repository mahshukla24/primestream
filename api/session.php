<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

jsonResponse([
    'success' => true,
    'user' => currentUser(),
    'theme' => $_COOKIE['ps_theme'] ?? 'dark',
    'last_user' => $_COOKIE['ps_last_user'] ?? null,
]);
