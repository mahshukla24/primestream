<?php
declare(strict_types=1);
session_start();

require_once __DIR__ . '/includes/bootstrap.php';

$initialMood = normalize_mood($_COOKIE['prime_mood'] ?? 'chill');
$user = auth_user();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prime Stream | Real-life Streaming Demo</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>
<body>
    <header class="topbar">
        <div class="brand">
            <span class="logo">PS</span>
            <div>
                <h1>Prime Stream</h1>
                <p>Localhost-ready digital streaming platform demo.</p>
            </div>
        </div>
        <div id="sessionPanel" class="session-panel">
            <?php if ($user): ?>
                <div class="user-pill">
                    <span><?= h($user['name']) ?></span>
                    <?php if (!empty($user['avatar_path'])): ?>
                        <img src="<?= h($user['avatar_path']) ?>" alt="avatar">
                    <?php endif; ?>
                </div>
                <button id="logoutBtn" class="btn-secondary">Logout</button>
            <?php else: ?>
                <span class="hint">Guest mode</span>
            <?php endif; ?>
        </div>
    </header>

    <main>
        <section class="controls glass">
            <div class="control-group">
                <label for="searchInput">Search titles</label>
                <input id="searchInput" type="text" placeholder="Try thriller, romance, skyline...">
            </div>
            <div class="control-group">
                <label>Mood Mix</label>
                <div class="mood-wrap">
                    <?php foreach (['chill', 'thrill', 'focus', 'family', 'romance'] as $mood): ?>
                        <button class="mood-btn <?= $initialMood === $mood ? 'active' : '' ?>" data-mood="<?= h($mood) ?>">
                            <?= ucfirst($mood) ?>
                        </button>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="control-group quick-actions">
                <button id="exportTrending" class="btn-primary">Export Trending JSON</button>
                <button id="refreshStats" class="btn-secondary">Refresh Stats</button>
            </div>
        </section>

        <section class="layout-grid">
            <section>
                <div id="catalog" class="catalog"></div>
            </section>

            <aside class="right-col">
                <div class="glass auth-card">
                    <h2>Account Zone</h2>
                    <?php if (!$user): ?>
                        <div class="tabs">
                            <button class="tab-btn active" data-tab="loginTab">Login</button>
                            <button class="tab-btn" data-tab="registerTab">Register</button>
                        </div>
                        <form id="loginTab" class="auth-form active">
                            <input name="identity" type="text" placeholder="Email or username" required>
                            <input name="password" type="password" placeholder="Password" required>
                            <button class="btn-primary" type="submit">Login</button>
                        </form>
                        <form id="registerTab" class="auth-form">
                            <input name="name" type="text" placeholder="Name" required>
                            <input name="email" type="email" placeholder="Email" required>
                            <input name="password" type="password" minlength="6" placeholder="Password" required>
                            <button class="btn-primary" type="submit">Create Account</button>
                        </form>
                    <?php else: ?>
                        <form id="avatarUploadForm" enctype="multipart/form-data" class="auth-form active">
                            <label>Upload profile image</label>
                            <input type="file" name="avatar" accept=".jpg,.jpeg,.png,.webp" required>
                            <button class="btn-primary" type="submit">Upload Avatar</button>
                        </form>
                    <?php endif; ?>
                </div>

                <div id="statsPanel" class="glass stats-card">
                    <h2>System Stats</h2>
                    <div class="stats-list"></div>
                </div>

                <div class="glass data-card">
                    <h2>Live Data Storage View</h2>
                    <p class="hint">Shows how data is stored in MySQL and files.</p>
                    <button id="refreshStorageView" class="btn-secondary">Refresh Data Storage View</button>

                    <div class="storage-viewer">
                        <div class="storage-block">
                            <h4>Users table</h4>
                            <pre id="usersDump" class="dump">Loading...</pre>
                        </div>
                        <div class="storage-block">
                            <h4>Reviews table</h4>
                            <pre id="reviewsDump" class="dump">Loading...</pre>
                        </div>
                        <div class="storage-block">
                            <h4>Files (exports + uploads)</h4>
                            <pre id="exportsDump" class="dump">Loading...</pre>
                        </div>
                        <div class="storage-block">
                            <h4>Review audit log (last lines)</h4>
                            <pre id="auditDump" class="dump">Loading...</pre>
                        </div>
                    </div>
                </div>
            </aside>
        </section>
    </main>

    <div id="toast" class="toast"></div>

    <div id="trailerModal" class="modal">
        <div class="modal-content">
            <button id="closeTrailer" class="close-btn" type="button">&times;</button>
            <div class="video-wrap">
                <iframe id="trailerFrame" src="" title="Trailer" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </div>

    <script>
        window.PRIME_STREAM_BOOT = {
            mood: "<?= h($initialMood) ?>",
            loggedIn: <?= $user ? 'true' : 'false' ?>
        };
    </script>
    <script src="assets/js/app.js"></script>
</body>
</html>
