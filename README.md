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

## 1) Setup in XAMPP

1. Copy this project folder into:

   - `C:/xampp/htdocs/primestream` (Windows)
   - `/opt/lampp/htdocs/primestream` (Linux XAMPP)

2. Start **Apache** and **MySQL** from XAMPP Control Panel.

3. Open phpMyAdmin and run `database.sql` (import or SQL tab).

4. Visit:
   - `http://localhost/primestream/`

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
