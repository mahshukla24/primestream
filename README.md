# PrimeStream+ Dynamic Website (XAMPP Ready)

This project upgrades your old static Prime Stream into a dynamic streaming platform using:

- **Frontend:** HTML, CSS, JavaScript, **jQuery**
- **Backend:** **PHP (OOP concepts using classes/objects)**
- **Concepts covered:** sessions, cookies, file handling, classes/objects, API endpoints
- **Database:** MySQL via **XAMPP**

## Features implemented

- Movies, TV Shows, Cartoons sections
- Beautiful modern UI with dark/light theme
- Sign In / Register
- Session-based authentication
- Cookie-based theme + last-user memory
- Ratings system (1-5 stars)
- Add/Remove Watchlist
- Watch trailer modal
- Recently viewed tracking via file handling (`data/history/*.json`)
- Storage inspector panel showing DB + file logs
- Exclusive differentiation ideas from Amazon Prime included in UI

## 1) Run in XAMPP

1. Copy this project into your XAMPP `htdocs`, e.g.:
   - `C:\xampp\htdocs\primestream`
2. Start **Apache** and **MySQL** in XAMPP Control Panel.
3. Create DB tables:
   - Open `http://localhost/phpmyadmin`
   - Import `database/schema.sql`
4. Open project:
   - `http://localhost/primestream/`

## 2) Database details

Default DB config is in `config/database.php`:

- host: `127.0.0.1`
- port: `3306`
- name: `primestream_plus`
- user: `root`
- pass: `` (empty)

You can override with env vars if needed:
`PRIMESTREAM_DB_HOST`, `PRIMESTREAM_DB_PORT`, `PRIMESTREAM_DB_NAME`, `PRIMESTREAM_DB_USER`, `PRIMESTREAM_DB_PASS`.

## 3) Project structure

- `index.php` - UI layout
- `assets/css/style.css` - design
- `assets/js/app.js` - jQuery frontend logic
- `classes/` - PHP OOP classes
  - `Database.php`
  - `AuthService.php`
  - `ContentService.php`
  - `StorageLogger.php`
- `api/` - backend endpoints for frontend AJAX
- `database/schema.sql` - schema + seed data
- `data/logs/user-actions.log` - file handling logs
- `data/history/recently_viewed_<user_id>.json` - per-user recently viewed history

## 4) How data is stored (for your teacher demo)

- **MySQL tables:**
  - `users`
  - `content_items`
  - `watchlist_items`
  - `ratings`
- **Server files (file handling concept):**
  - User action log in `data/logs/user-actions.log`
  - Recently viewed list per user in `data/history/`
- **Session:**
  - Logged-in user is stored in PHP `$_SESSION['user']`
- **Cookies:**
  - `ps_theme` (dark/light)
  - `ps_last_user` (last signed in name)

## 5) Exclusive ideas to further differentiate from Amazon Prime

1. AI Mood Match + quick mood selector
2. Storyline switch cards for selected titles
3. Family quest/learning points for kids content
4. Smart recap cards before next episode
5. Group watch classroom mode for project presentations

