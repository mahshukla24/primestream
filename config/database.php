<?php

declare(strict_types=1);

return [
    'host' => getenv('PRIMESTREAM_DB_HOST') ?: '127.0.0.1',
    'port' => (int) (getenv('PRIMESTREAM_DB_PORT') ?: 3306),
    'name' => getenv('PRIMESTREAM_DB_NAME') ?: 'primestream_plus',
    'user' => getenv('PRIMESTREAM_DB_USER') ?: 'root',
    'pass' => getenv('PRIMESTREAM_DB_PASS') !== false ? (string) getenv('PRIMESTREAM_DB_PASS') : '',
    'charset' => 'utf8mb4',
];
