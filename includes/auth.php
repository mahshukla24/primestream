<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';

function current_user(): ?array
{
    if (!isset($_SESSION['user_id'])) {
        return null;
    }

    $stmt = db()->prepare('SELECT id, name, email, avatar_path, created_at FROM users WHERE id = :id');
    $stmt->execute(['id' => (int) $_SESSION['user_id']]);
    $user = $stmt->fetch();

    return $user ?: null;
}

function auth_user(): ?array
{
    return current_user();
}

function require_login(): array
{
    $user = current_user();
    if ($user === null) {
        json_response(['error' => 'Authentication required.'], 401);
    }

    return $user;
}

function login_user(int $userId): array
{
    $_SESSION['user_id'] = $userId;
    session_regenerate_id(true);
    return require_login();
}

function set_logged_in_user_id(int $userId): array
{
    return login_user($userId);
}

function require_auth(?PDO $unused = null): array
{
    return require_login();
}

function logout_user(): void
{
    $_SESSION = [];
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }
}
