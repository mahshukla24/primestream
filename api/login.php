<?php

declare(strict_types=1);

require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$data = getJsonBody();
$email = trim((string) ($data['email'] ?? ''));
$password = (string) ($data['password'] ?? '');

$auth = new AuthService($pdo, $logger);
$result = $auth->login($email, $password);
jsonResponse($result, $result['success'] ? 200 : 401);
