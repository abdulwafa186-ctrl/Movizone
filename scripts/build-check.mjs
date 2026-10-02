import { readFile, access } from 'node:fs/promises';
for (const file of ['index.html', 'admin.html', 'movie.html', 'src/main.js', 'src/movie.js', 'src/admin.js', 'src/db.js', 'public/styles.css']) await access(file);
for (const file of ['index.html', 'admin.html', 'movie.html']) { const html = await readFile(file, 'utf8'); if (!html.includes('type="module"')) throw new Error(`${file} needs a module entry point`); }
console.log('MovieZone static build check passed.');
