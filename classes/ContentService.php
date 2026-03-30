<?php

declare(strict_types=1);

final class ContentService
{
    public function __construct(private PDO $pdo, private StorageLogger $logger)
    {
    }

    public function listContent(string $type = 'all', string $search = ''): array
    {
        $sql = 'SELECT c.id, c.title, c.type, c.genre, c.description, c.poster_url, c.trailer_url, c.runtime_minutes,
                       c.age_rating, c.release_year, c.exclusive_feature_tag,
                       COALESCE(ROUND(AVG(r.rating), 1), 0) AS avg_rating, COUNT(r.id) AS rating_count
                FROM content_items c
                LEFT JOIN ratings r ON r.content_id = c.id
                WHERE (:type = "all" OR c.type = :type_filter)
                  AND (:search = "" OR c.title LIKE :search_like OR c.genre LIKE :search_like)
                GROUP BY c.id
                ORDER BY c.release_year DESC, c.id DESC';

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([
            ':type' => $type,
            ':type_filter' => $type,
            ':search' => $search,
            ':search_like' => '%' . $search . '%',
        ]);

        return $stmt->fetchAll();
    }

    public function toggleWatchlist(int $userId, int $contentId): bool
    {
        $check = $this->pdo->prepare(
            'SELECT id FROM watchlist_items WHERE user_id = :user_id AND content_id = :content_id LIMIT 1'
        );
        $check->execute([':user_id' => $userId, ':content_id' => $contentId]);
        $row = $check->fetch();

        if ($row) {
            $remove = $this->pdo->prepare('DELETE FROM watchlist_items WHERE id = :id');
            $remove->execute([':id' => (int) $row['id']]);
            $this->logger->write('watchlist_remove', ['user_id' => $userId, 'content_id' => $contentId]);
            return false;
        }

        $add = $this->pdo->prepare(
            'INSERT INTO watchlist_items (user_id, content_id, status) VALUES (:user_id, :content_id, "watchlist")'
        );
        $add->execute([':user_id' => $userId, ':content_id' => $contentId]);
        $this->logger->write('watchlist_add', ['user_id' => $userId, 'content_id' => $contentId]);

        return true;
    }

    public function userWatchlist(int $userId): array
    {
        $stmt = $this->pdo->prepare('SELECT content_id FROM watchlist_items WHERE user_id = :user_id');
        $stmt->execute([':user_id' => $userId]);
        return $stmt->fetchAll();
    }

    public function saveRating(int $userId, int $contentId, int $rating): void
    {
        $stmt = $this->pdo->prepare(
            'INSERT INTO ratings (user_id, content_id, rating)
             VALUES (:user_id, :content_id, :rating)
             ON DUPLICATE KEY UPDATE rating = VALUES(rating), updated_at = CURRENT_TIMESTAMP'
        );
        $stmt->execute([
            ':user_id' => $userId,
            ':content_id' => $contentId,
            ':rating' => $rating,
        ]);

        $this->logger->write('rating_save', [
            'user_id' => $userId,
            'content_id' => $contentId,
            'rating' => $rating,
        ]);
    }

    public function userRatings(int $userId): array
    {
        $stmt = $this->pdo->prepare('SELECT content_id, rating FROM ratings WHERE user_id = :user_id');
        $stmt->execute([':user_id' => $userId]);
        return $stmt->fetchAll();
    }

    public function addRecentlyViewed(int $userId, int $contentId, string $title): void
    {
        $file = __DIR__ . '/../data/history/recently_viewed_' . $userId . '.json';
        $existing = [];

        if (file_exists($file)) {
            $decoded = json_decode((string) file_get_contents($file), true);
            if (is_array($decoded)) {
                $existing = $decoded;
            }
        }

        $existing[] = [
            'content_id' => $contentId,
            'title' => $title,
            'viewed_at' => date('Y-m-d H:i:s'),
        ];

        $trimmed = array_slice($existing, -20);
        file_put_contents($file, json_encode($trimmed, JSON_PRETTY_PRINT));

        $this->logger->write('viewed_mark', [
            'user_id' => $userId,
            'content_id' => $contentId,
            'title' => $title,
        ]);
    }

    public function recentlyViewed(int $userId): array
    {
        $file = __DIR__ . '/../data/history/recently_viewed_' . $userId . '.json';
        if (!file_exists($file)) {
            return [];
        }

        $decoded = json_decode((string) file_get_contents($file), true);
        if (!is_array($decoded)) {
            return [];
        }

        return array_reverse($decoded);
    }

    public function topRated(int $limit = 8): array
    {
        $stmt = $this->pdo->prepare(
            'SELECT c.id, c.title, c.type, c.genre, c.description, c.poster_url, c.trailer_url, c.runtime_minutes,
                    c.age_rating, c.release_year, c.exclusive_feature_tag,
                    ROUND(AVG(r.rating), 1) AS avg_rating, COUNT(r.id) AS rating_count
             FROM content_items c
             INNER JOIN ratings r ON r.content_id = c.id
             GROUP BY c.id
             HAVING COUNT(r.id) > 0
             ORDER BY avg_rating DESC, rating_count DESC
             LIMIT :limit'
        );
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}
