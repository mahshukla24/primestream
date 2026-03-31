# Prime Stream

Prime Stream is a demo digital streaming platform built with:

- PHP (sessions, cookies, file handling, REST-style APIs)
- MySQL (XAMPP `phpMyAdmin`)
- jQuery (interactive frontend)
- HTML/CSS/JS

It is designed as an "Amazon Prime + Netflix style" project with extra features that make it feel different:

- Mood-based browsing ("Mood Mix")
- IMDb + community combined "Prime Score"
- Trailer modal playback
- User auth with session handling
- Review and rating system
- File handling examples:
  - Avatar upload (`storage/uploads/`)
  - Trending export JSON (`storage/exports/`)
  - Review audit log (`storage/review_audit.log`)

## 1) Setup in XAMPP (localhost)

1. Copy this project folder into:

   - `C:/xampp/htdocs/primestream` (Windows)
   - `/opt/lampp/htdocs/primestream` (Linux XAMPP)

2. Start **Apache** and **MySQL** from XAMPP Control Panel.

3. Open phpMyAdmin and run `database.sql` (import or SQL tab).

4. Visit:
   - Main site: `http://localhost/primestream/`
   - Setup check page: `http://localhost/primestream/setup-check.php`

## 2) Default Database Credentials

These are configured in `includes/db.php`:

- host: `127.0.0.1`
- db: `primestream`
- user: `root`
- pass: `` (empty)

Change them there if your XAMPP setup is different.

## 3) Core Features Implemented

- Register/Login/Logout with secure password hashing
- Session-based authentication
- Cookie-based mood preference (remembers user mood lane)
- Catalog API with search + mood filter
- Review API with per-title community ratings
- Prime Score calculation (`70% IMDb + 30% community`)
- Trailer playback modal
- Avatar upload endpoint (PHP file upload handling)
- Export trending titles to JSON file
- Stats panel showing records in DB and storage info
- Live storage viewer panel to show real DB rows and stored files

## 4) Important Directories

- `api/` -> backend endpoints
- `includes/` -> reusable PHP modules (db/auth/helpers)
- `assets/` -> CSS/JS
- `storage/uploads/` -> uploaded avatars
- `storage/exports/` -> exported trending data
- `storage/review_audit.log` -> file audit trail for reviews

## 5) Notes

- This project is a learning/demo implementation for college-level full-stack concepts.
- Use HTTPS and stronger production-grade hardening before any real deployment.

## 6) How to show "data is stored" in your viva/demo

1. Open `http://localhost/primestream/setup-check.php` and show all checks PASS.
2. Register a user in the app.
3. Submit a review on any title.
4. Upload avatar image.
5. Click **Export Trending JSON**.
6. Open the **Live Data Storage** panel in the right column and click **Refresh Data Storage View**.
   - It shows:
     - rows from `users`, `titles`, `reviews` tables
     - uploaded files in `storage/uploads`
     - exported JSON files in `storage/exports`
     - latest lines from `storage/review_audit.log`
