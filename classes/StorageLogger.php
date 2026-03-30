<?php

declare(strict_types=1);

final class StorageLogger
{
    public function __construct(private string $logFile)
    {
    }

    public function write(string $event, array $meta = []): void
    {
        $line = sprintf(
            "[%s] %s | %s\n",
            date('Y-m-d H:i:s'),
            $event,
            json_encode($meta, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
        );
        file_put_contents($this->logFile, $line, FILE_APPEND | LOCK_EX);
    }

    public function tail(int $lines = 20): array
    {
        if (!file_exists($this->logFile)) {
            return [];
        }

        $content = file($this->logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (!is_array($content)) {
            return [];
        }

        return array_slice($content, -$lines);
    }
}
