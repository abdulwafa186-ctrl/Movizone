const DB_NAME = 'moviezone-local';
const STORE = 'movies';
const categories = ['Bollywood', 'Hollywood', 'South Indian', 'Web Series'];
const seedMovies = [
  { title: 'The Last Horizon', description: 'A resourceful cartographer races across a shifting desert world to find the city her mother mapped decades ago.', year: 2026, language: 'English', category: 'Hollywood', poster: '/public/posters/horizon.svg', downloadUrl: 'https://archive.org/' },
  { title: 'Monsoon Letters', description: 'Two strangers exchange anonymous letters during one unforgettable Mumbai monsoon.', year: 2025, language: 'Hindi', category: 'Bollywood', poster: '/public/posters/monsoon.svg', downloadUrl: 'https://archive.org/' },
  { title: 'Iron Temple', description: 'An archaeologist returns to her coastal hometown when an ancient lighthouse begins to signal again.', year: 2024, language: 'Tamil', category: 'South Indian', poster: '/public/posters/temple.svg', downloadUrl: 'https://archive.org/' },
  { title: 'Echoes of Tomorrow', description: 'A small team discovers that their forgotten voice notes can alter one day in the future.', year: 2026, language: 'English', category: 'Web Series', poster: '/public/posters/echoes.svg', downloadUrl: 'https://archive.org/' },
  { title: 'Paper Kingdom', description: 'A charming illustrator learns that the worlds in his sketchbook are quietly becoming real.', year: 2023, language: 'Malayalam', category: 'South Indian', poster: '/public/posters/paper.svg', downloadUrl: 'https://archive.org/' },
  { title: 'Midnight Atlas', description: 'A late-night radio host follows a constellation of callers toward an unexpected reunion.', year: 2025, language: 'Hindi', category: 'Bollywood', poster: '/public/posters/atlas.svg', downloadUrl: 'https://archive.org/' }
];
function open() { return new Promise((resolve, reject) => { const req = indexedDB.open(DB_NAME, 1); req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true }); req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); }); }
async function transaction(mode, action) { const db = await open(); return new Promise((resolve, reject) => { const tx = db.transaction(STORE, mode); const result = action(tx.objectStore(STORE)); tx.oncomplete = () => { db.close(); resolve(result); }; tx.onerror = () => { db.close(); reject(tx.error); }; }); }
export async function ensureSeeded() { if ((await allMovies()).length) return; await transaction('readwrite', store => seedMovies.forEach(movie => store.add({ ...movie, createdAt: Date.now() }))); }
export async function allMovies() { const db = await open(); return new Promise((resolve, reject) => { const req = db.transaction(STORE).objectStore(STORE).getAll(); req.onsuccess = () => { db.close(); resolve(req.result.sort((a, b) => b.createdAt - a.createdAt)); }; req.onerror = () => { db.close(); reject(req.error); }; }); }
export async function movieById(id) { const db = await open(); return new Promise((resolve, reject) => { const req = db.transaction(STORE).objectStore(STORE).get(Number(id)); req.onsuccess = () => { db.close(); resolve(req.result); }; req.onerror = () => { db.close(); reject(req.error); }; }); }
export async function saveMovie(movie) { const payload = { ...movie, year: Number(movie.year), createdAt: movie.createdAt || Date.now() }; await transaction('readwrite', store => movie.id ? store.put(payload) : store.add(payload)); }
export async function deleteMovie(id) { await transaction('readwrite', store => store.delete(Number(id))); }
export { categories };
