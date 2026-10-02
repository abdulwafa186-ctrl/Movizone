# MovieZone

MovieZone is a responsive, local-first movie catalogue for information and **legally authorized** download links. It includes a public discovery site, a cookie-protected administrator dashboard, SQLite persistence, sample fictional titles, poster URL/upload support, searching, and filters. It intentionally does not include video playback or streaming.

## Run locally

**Requirements:** Node.js 22.5+ (Node 24+ recommended because this project uses the built-in `node:sqlite` module). No external database server and no `npm install` are required.

```bash
cd MovieZone
cp .env.example .env # optional but strongly recommended
# Edit .env to set a unique ADMIN_USERNAME and ADMIN_PASSWORD
npm start
```

Then open [http://localhost:3000](http://localhost:3000). The SQLite database is created automatically at `data/moviezone.db`; it preserves movie data across refreshes and restarts. Uploaded poster files are stored under `uploads/`.

## Admin dashboard

Open [http://localhost:3000/admin.html](http://localhost:3000/admin.html). With no environment settings, the local development credentials are:

- Username: `admin`
- Password: `moviezone-admin`

For any shared or hosted deployment, create `.env` from `.env.example` and set a strong unique password before starting the server. From the dashboard you can add, edit, and delete titles, set category/language/year/descriptions, paste poster/download URLs, or upload an image poster (PNG, JPG, WEBP, or GIF, up to 5 MB).

## Hosting notes

Set `PORT`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` as environment variables on the host. Persist the `data/` and `uploads/` directories using the host's persistent volume mechanism. Use HTTPS and place the app behind a production reverse proxy before making it public.
