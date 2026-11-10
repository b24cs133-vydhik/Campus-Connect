# Campus Connect (KITSW)

Static site, no build step or dependencies.

- index.html: page structure
- style.css: styling and light/dark theme
- script.js: campus data (array `L`), search, map, Google Maps links

Run: open index.html, or deploy the folder to Netlify, Vercel or GitHub Pages.

## Data
Edit `L` in script.js. Blocks, departments and facilities are team-supplied and need on-campus verification.
GPS coordinates are NOT verified; Google Maps links go to the campus as a whole until `lat`/`lng` are added.

## Not included
Login, QR navigation, admin panel, announcements, marketplace, lost and found (need a backend such as Supabase).

Campus Connect is a student project, not an official KITSW website.
