<?php

declare(strict_types=1);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PrimeStream+ Dynamic Platform</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
</head>
<body data-theme="dark">
<header class="topbar">
    <div>
        <h1>PrimeStream<span>+</span></h1>
        <p class="subtitle">Movies, TV Shows, Cartoons with modern dynamic features</p>
    </div>
    <div class="top-actions">
        <button id="themeToggle" class="btn ghost">Toggle Theme</button>
        <button id="openAuth" class="btn primary">Sign In / Register</button>
        <button id="logoutBtn" class="btn danger hidden">Logout</button>
    </div>
</header>

<section class="difference">
    <h2>How it is different from Amazon Prime</h2>
    <ul>
        <li><strong>AI Mood Match:</strong> recommendations by your mood + genre preference.</li>
        <li><strong>Storyline Switch:</strong> choose story-path highlights while watching trailers.</li>
        <li><strong>Family Quest:</strong> kid-safe cartoon tasks and progress points.</li>
        <li><strong>Smart Recap Cards:</strong> quick recall cards before continuing episodes.</li>
    </ul>
</section>

<main>
    <aside class="sidebar card">
        <h3>Browse</h3>
        <div class="tabs">
            <button class="tab active" data-tab="all">All</button>
            <button class="tab" data-tab="movie">Movies</button>
            <button class="tab" data-tab="tv_show">TV Shows</button>
            <button class="tab" data-tab="cartoon">Cartoons</button>
            <button class="tab" data-tab="watchlist">My Watchlist</button>
            <button class="tab" data-tab="ratings">Top Rated</button>
        </div>

        <h3>Search</h3>
        <input id="searchInput" type="text" placeholder="Search by title or genre">
    </aside>

    <section class="content card">
        <div class="content-header">
            <h2 id="sectionTitle">Trending Now</h2>
            <p id="sessionInfo">Guest mode</p>
        </div>
        <div id="contentGrid" class="grid"></div>
    </section>

    <section class="storage card">
        <h3>Storage Inspector (XAMPP Demo)</h3>
        <p>Shows what is stored in MySQL + server file logs.</p>
        <button id="refreshStorage" class="btn ghost">Refresh Storage</button>
        <pre id="storageOutput">Sign in and click refresh.</pre>
    </section>
</main>

<div id="trailerModal" class="modal hidden">
    <div class="modal-body">
        <button id="closeTrailer" class="close">&times;</button>
        <h3 id="trailerTitle">Trailer</h3>
        <iframe
            id="trailerFrame"
            src=""
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
    </div>
</div>

<div id="authModal" class="modal hidden">
    <div class="modal-body auth">
        <button id="closeAuth" class="close">&times;</button>
        <h3>Account Access</h3>
        <div class="auth-tabs">
            <button class="auth-tab active" data-form="loginForm">Sign In</button>
            <button class="auth-tab" data-form="registerForm">Register</button>
        </div>

        <form id="loginForm" class="auth-form">
            <input id="loginEmail" type="email" placeholder="Email" required>
            <input id="loginPassword" type="password" placeholder="Password" required>
            <button type="submit" class="btn primary">Sign In</button>
        </form>

        <form id="registerForm" class="auth-form hidden">
            <input id="registerName" type="text" placeholder="Full name" required>
            <input id="registerEmail" type="email" placeholder="Email" required>
            <input id="registerPassword" type="password" minlength="6" placeholder="Password (min 6 chars)" required>
            <button type="submit" class="btn primary">Create Account</button>
        </form>

        <p id="authMessage"></p>
    </div>
</div>

<script src="assets/js/app.js"></script>
</body>
</html>
