<?php
declare(strict_types=1);
session_start();
require_once __DIR__ . '/includes/helpers.php';

$initialMood = normalize_mood($_COOKIE['prime_mood'] ?? 'chill');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prime Stream | Mood-first Streaming</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>
<body>
    <header class="topbar">
        <div class="brand">
            <span class="logo">PS</span>
            <div>
                <h1>Prime Stream</h1>
                <p>Mood-first streaming, not copy-paste streaming.</p>
            </div>
        </div>
        <div id="sessionPanel" class="session-panel"></div>
    </header>

    <main>
        <section class="controls glass">
            <div class="control-group">
                <label for="searchInput">Search titles</label>
                <input id="searchInput" type="text" placeholder="Try: thriller, drama, skyline...">
            </div>
            <div class="control-group">
                <label>Mood Mix</label>
                <div class="mood-wrap">
                    <?php
                    $moods = ['chill', 'thrill', 'focus', 'family', 'romance'];
                    foreach ($moods as $mood):
                    ?>
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
            <div class="left-col">
                <div id="catalog" class="catalog"></div>
            </div>

            <aside class="right-col">
                <div class="glass auth-card">
                    <h2>Account Zone</h2>
                    <div class="tabs">
                        <button class="tab-btn active" data-tab="loginTab">Login</button>
                        <button class="tab-btn" data-tab="registerTab">Register</button>
                    </div>
                    <form id="loginTab" class="auth-form active">
                        <input name="email" type="email" placeholder="Email" required>
                        <input name="password" type="password" placeholder="Password" required>
                        <button class="btn-primary" type="submit">Login</button>
                    </form>
                    <form id="registerTab" class="auth-form">
                        <input name="name" type="text" placeholder="Name" required>
                        <input name="email" type="email" placeholder="Email" required>
                        <input name="password" type="password" minlength="6" placeholder="Password" required>
                        <button class="btn-primary" type="submit">Create Account</button>
                    </form>
                    <form id="avatarUploadForm" class="hidden" enctype="multipart/form-data">
                        <label>Upload profile image</label>
                        <input type="file" name="avatar" accept=".jpg,.jpeg,.png,.webp">
                        <button class="btn-primary" type="submit">Upload Avatar</button>
                    </form>
                </div>

                <div id="statsPanel" class="glass stats-card">
                    <h2>System Stats</h2>
                    <div class="stats-list"></div>
                </div>
            </aside>
        </section>
    </main>

    <div id="toast" class="toast"></div>

    <div id="trailerModal" class="modal">
        <div class="modal-content">
            <button id="closeTrailer" class="close-btn">&times;</button>
            <div class="video-wrap">
                <iframe id="trailerFrame" src="" title="Trailer" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    </div>

    <script>
        window.PRIME_STREAM_BOOT = {
            mood: "<?= h($initialMood) ?>"
        };
    </script>
    <script src="assets/js/app.js"></script>
</body>
</html>
