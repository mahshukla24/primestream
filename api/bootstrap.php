<?php

declare(strict_types=1);

session_start();

require_once __DIR__ . '/../classes/Database.php';
require_once __DIR__ . '/../classes/StorageLogger.php';
require_once __DIR__ . '/../classes/AuthService.php';
require_once __DIR__ . '/../classes/ContentService.php';

header('Content-Type: application/json');

$pdo = Database::connection();
$logger = new StorageLogger(__DIR__ . '/../data/logs/user-actions.log');

authAndHelpers();

function authAndHelpers(): void
{
    if (!function_exists('jsonResponse')) {
        function jsonResponse(array $payload, int $statusCode = 200): void
        {
            http_response_code($statusCode);
            echo json_encode($payload, JSON_PRETTY_PRINT);
            exit;
        }
    }

    if (!function_exists('getJsonBody')) {
        function getJsonBody(): array
        {
            $raw = file_get_contents('php://input');
            if (!$raw) {
                return [];
            }

            $decoded = json_decode($raw, true);
            return is_array($decoded) ? $decoded : [];
        }
    }

    if (!function_exists('currentUser')) {
        function currentUser(): ?array
        {
            return $_SESSION['user'] ?? null;
        }
    }

    if (!function_exists('requireUser')) {
        function requireUser(): array
        {
            $user = currentUser();
            if (!$user) {
                jsonResponse(['success' => false, 'message' => 'Please sign in first.'], 401);
            }
            return $user;
        }
    }
}
