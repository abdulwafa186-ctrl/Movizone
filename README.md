# MovieZone

MovieZone is a responsive, local-first movie information website. It uses native ES modules/Web Components-style rendering and **IndexedDB**—no server database, streaming player, or fake authentication is included.

## Run it locally

**Requirement:** Node.js 18 or newer.

```bash
npm run build
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The included static server exposes the public catalogue at `/` and the separate local dashboard at `/admin.html`.

## What works

- Browse the seeded catalogue on phones, tablets, and desktop widths.
- Search titles, descriptions, languages, and categories; filter by category, language, and release year.
- Open a separate details page for every title.
- Open an **Authorized download** link only when the title has one. MovieZone does not include a video player.
- Add, edit, and delete titles from `/admin.html`.
- Use either a poster image URL or upload PNG, JPG, WEBP, or GIF posters up to 5 MB.

## Data and privacy

Movies and uploaded poster blobs are stored in the current browser's IndexedDB. They persist through refreshes and local server restarts, but are available **only in this browser profile on this device**. They are not shared with another person or device because MovieZone has no online backend.

The dashboard is deliberately labelled as a local browser dashboard. It has no login, and it must not be represented as secure administration or used for multi-user publishing.

Only add download URLs for content that you are legally authorized to distribute or link to.
