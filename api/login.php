<?php
declare(strict_types=1);

require_once __DIR__ . '/../includes/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

$payload = read_json_input();
$identity = trim((string) ($payload['identity'] ?? ''));
$password = (string) ($payload['password'] ?? '');

if ($identity === '' || $password === '') {
    json_response(['success' => false, 'message' => 'Identity and password are required'], 422);
}

$pdo = db();
$stmt = $pdo->prepare('SELECT id, name, email, password_hash, avatar_path FROM users WHERE email = :identity OR name = :identity LIMIT 1');
$stmt->execute(['identity' => $identity]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, (string) $user['password_hash'])) {
    json_response(['success' => false, 'message' => 'Invalid credentials'], 401);
}

login_user((int) $user['id']);

json_response([
    'success' => true,
    'message' => 'Login successful',
    'user' => [
        'id' => (int) $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'avatar_path' => $user['avatar_path'],
    ],
]);
