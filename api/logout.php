<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'message' => 'Method not allowed'], 405);
}

session_unset();
session_destroy();

json_response([
    'ok' => true,
    'message' => 'Logged out successfully',
]);
