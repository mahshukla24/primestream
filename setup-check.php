<?php
declare(strict_types=1);

require_once __DIR__ . '/includes/helpers.php';
require_once __DIR__ . '/includes/db.php';

$checks = [];
$dbOk = false;
$dbMessage = '';

try {
    $pdo = db();
    $dbOk = true;
    $dbMessage = 'Connected to MySQL and selected database `primestream`.';
} catch (Throwable $e) {
    $dbMessage = $e->getMessage();
}

$checks[] = [
    'label' => 'PHP version',
    'ok' => version_compare(PHP_VERSION, '8.0.0', '>='),
    'detail' => PHP_VERSION,
];

$checks[] = [
    'label' => 'PDO MySQL extension',
    'ok' => extension_loaded('pdo_mysql'),
    'detail' => extension_loaded('pdo_mysql') ? 'Loaded' : 'Not loaded',
];

$checks[] = [
    'label' => 'MySQL database connection',
    'ok' => $dbOk,
    'detail' => $dbMessage,
];

$storageDirs = [
    'storage',
    'storage/uploads',
    'storage/exports',
];

foreach ($storageDirs as $dir) {
    $abs = __DIR__ . DIRECTORY_SEPARATOR . $dir;
    $checks[] = [
        'label' => 'Directory exists: ' . $dir,
        'ok' => is_dir($abs),
        'detail' => $abs,
    ];

    if (is_dir($abs)) {
        $checks[] = [
            'label' => 'Directory writable: ' . $dir,
            'ok' => is_writable($abs),
            'detail' => is_writable($abs) ? 'Writable' : 'Not writable',
        ];
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prime Stream Setup Check</title>
    <style>
        body { font-family: Arial, sans-serif; background: #0d1325; color: #eef1ff; margin: 0; }
        .wrap { max-width: 900px; margin: 24px auto; padding: 0 16px; }
        .card { background: #161f3f; border: 1px solid #2e3d77; border-radius: 12px; padding: 16px; margin-bottom: 14px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 10px; border-bottom: 1px solid #2a376d; }
        .ok { color: #64e0a8; font-weight: bold; }
        .bad { color: #ff8a8a; font-weight: bold; }
        a { color: #8ac7ff; }
    </style>
</head>
<body>
    <div class="wrap">
        <h1>Prime Stream Localhost Setup Check</h1>
        <div class="card">
            <p>Use this page during demo to prove your localhost/XAMPP environment is configured correctly.</p>
            <p>Main site: <a href="index.php">index.php</a></p>
        </div>

        <div class="card">
            <table>
                <thead>
                    <tr>
                        <th>Check</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($checks as $check): ?>
                        <tr>
                            <td><?= h($check['label']) ?></td>
                            <td class="<?= $check['ok'] ? 'ok' : 'bad' ?>"><?= $check['ok'] ? 'PASS' : 'FAIL' ?></td>
                            <td><?= h((string) $check['detail']) ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
