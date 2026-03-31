<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$payload = read_json_input();
$name = trim((string) ($payload['name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));
$password = (string) ($payload['password'] ?? '');

if ($name === '' || $email === '' || $password === '') {
    json_response(['error' => 'Name, email and password are required'], 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(['error' => 'Invalid email format'], 422);
}

if (strlen($password) < 6) {
    json_response(['error' => 'Password must be at least 6 characters'], 422);
}

$pdo = db();
$stmt = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
$stmt->execute(['email' => $email]);
if ($stmt->fetch()) {
    json_response(['error' => 'Email already registered'], 409);
}

$insert = $pdo->prepare(
    'INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash)'
);
$insert->execute([
    'name' => $name,
    'email' => $email,
    'password_hash' => password_hash($password, PASSWORD_DEFAULT),
]);

$userId = (int) $pdo->lastInsertId();
$user = login_user($userId);

json_response([
    'success' => true,
    'message' => 'Registration successful',
    'user' => $user,
], 201);
