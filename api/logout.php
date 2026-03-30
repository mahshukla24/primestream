<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$auth = new AuthService($pdo, $logger);
$auth->logout();
jsonResponse(['success' => true, 'message' => 'Logged out successfully.']);
