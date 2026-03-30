<?php

declare(strict_types=1);

final class AuthService
{
    public function __construct(private PDO $pdo, private StorageLogger $logger)
    {
    }

    public function register(string $name, string $email, string $password): array
    {
        $name = trim($name);
        $email = strtolower(trim($email));

        if ($name === '' || $email === '' || $password === '') {
            return ['success' => false, 'message' => 'Name, email, and password are required.'];
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'message' => 'Invalid email format.'];
        }
        if (strlen($password) < 6) {
            return ['success' => false, 'message' => 'Password must be at least 6 characters.'];
        }

        $check = $this->pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
        $check->execute([':email' => $email]);
        if ($check->fetch()) {
            return ['success' => false, 'message' => 'Email already registered.'];
        }

        $stmt = $this->pdo->prepare(
            'INSERT INTO users (name, email, password_hash) VALUES (:name, :email, :password_hash)'
        );
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':password_hash' => password_hash($password, PASSWORD_DEFAULT),
        ]);

        $userId = (int) $this->pdo->lastInsertId();
        $this->logger->write('register', ['user_id' => $userId, 'email' => $email]);

        return ['success' => true, 'message' => 'Registration successful. Please sign in.'];
    }

    public function login(string $email, string $password): array
    {
        $email = strtolower(trim($email));
        if ($email === '' || $password === '') {
            return ['success' => false, 'message' => 'Email and password are required.'];
        }

        $stmt = $this->pdo->prepare('SELECT id, name, email, password_hash FROM users WHERE email = :email LIMIT 1');
        $stmt->execute([':email' => $email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, (string) $user['password_hash'])) {
            return ['success' => false, 'message' => 'Invalid credentials.'];
        }

        $_SESSION['user'] = [
            'id' => (int) $user['id'],
            'name' => (string) $user['name'],
            'email' => (string) $user['email'],
        ];

        setcookie('ps_last_user', (string) $user['name'], [
            'expires' => time() + (60 * 60 * 24 * 30),
            'path' => '/',
            'secure' => false,
            'httponly' => false,
            'samesite' => 'Lax',
        ]);

        $this->logger->write('login', ['user_id' => (int) $user['id']]);

        return [
            'success' => true,
            'message' => 'Login successful.',
            'user' => $_SESSION['user'],
        ];
    }

    public function logout(): void
    {
        $userId = (int) ($_SESSION['user']['id'] ?? 0);
        if ($userId > 0) {
            $this->logger->write('logout', ['user_id' => $userId]);
        }

        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params['path'],
                $params['domain'],
                (bool) $params['secure'],
                (bool) $params['httponly']
            );
        }
        session_destroy();
    }
}
