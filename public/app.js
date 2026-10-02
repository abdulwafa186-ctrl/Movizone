const $ = s => document.querySelector(s), cards = $('#cards'), dialog = $('#details');
let meta;

async function get(url) { const response = await fetch(url); return response.json(); }
function safeUrl(value, fallback = '') {
 try { const url = new URL(value, window.location.origin); return ['http:', 'https:'].includes(url.protocol) ? url.href : fallback; } catch { return fallback; }
}
function image(src, alt) { const element = document.createElement('img'); element.src = safeUrl(src, '/posters/default.svg'); element.alt = `${alt} poster`; return element; }
function card(movie) {
 const article = document.createElement('article'); article.className = 'card'; article.dataset.id = movie.id;
 article.append(image(movie.poster, movie.title));
 const body = document.createElement('div'); body.className = 'card-body';
 const info = document.createElement('p'); info.textContent = `${movie.category} · ${movie.year}`;
 const title = document.createElement('h3'); title.textContent = movie.title;
 const language = document.createElement('span'); language.textContent = movie.language;
 body.append(info, title, language);
 const button = document.createElement('button'); button.setAttribute('aria-label', `View ${movie.title}`); button.textContent = 'View details →';
 article.append(body, button); return article;
}
function emptyState() {
 const empty = document.createElement('div'); empty.className = 'empty';
 const title = document.createElement('h3'); title.textContent = 'No titles found';
 const text = document.createElement('p'); text.textContent = 'Try changing your search or filters.';
 empty.append(title, text); return empty;
}
async function load() {
 const params = new URLSearchParams(), query = $('#search').value.trim(); if (query) params.set('q', query);
 ['category', 'language', 'year'].forEach(key => { if ($('#' + key).value) params.set(key, $('#' + key).value); });
 const movies = await get('/api/movies?' + params); cards.replaceChildren(...(movies.length ? movies.map(card) : [emptyState()]));
}
async function details(id) {
 const movie = await get('/api/movies/' + id), content = $('#detailContent'); content.replaceChildren(image(movie.poster, movie.title));
 const details = document.createElement('div'), eyebrow = document.createElement('p'), title = document.createElement('h2'), language = document.createElement('p'), description = document.createElement('p');
 eyebrow.className = 'eyebrow'; eyebrow.textContent = `${movie.category} · ${movie.year}`;
 title.textContent = movie.title; language.className = 'detail-lang'; language.textContent = movie.language; description.textContent = movie.description;
 details.append(eyebrow, title, language, description);
 const downloadUrl = safeUrl(movie.download_url);
 if (downloadUrl) { const link = document.createElement('a'); link.className = 'download'; link.target = '_blank'; link.rel = 'noopener'; link.href = downloadUrl; link.textContent = 'Authorized download ↗'; details.append(link); }
 else { const unavailable = document.createElement('p'); unavailable.className = 'unavailable'; unavailable.textContent = 'No authorized download is currently listed.'; details.append(unavailable); }
 content.append(details); dialog.showModal();
}
function addOptions(key, values) { const select = $('#' + key); for (const value of values) { const option = document.createElement('option'); option.value = value; option.textContent = value; select.append(option); } }
(async () => { meta = await get('/api/meta'); addOptions('category', meta.categories); addOptions('language', meta.languages); addOptions('year', meta.years); load(); })();
$('#searchBtn').onclick = load; $('#search').onkeydown = event => event.key === 'Enter' && load();
document.querySelectorAll('.categories button').forEach(button => button.onclick = () => { $('#category').value = button.dataset.cat; load(); $('#movies').scrollIntoView({ behavior: 'smooth' }); });
['category', 'language', 'year'].forEach(key => $('#' + key).onchange = load);
$('#clear').onclick = () => { ['category', 'language', 'year'].forEach(key => $('#' + key).value = ''); $('#search').value = ''; load(); };
cards.onclick = event => { const card = event.target.closest('.card'); if (card) details(card.dataset.id); };
$('.filter-toggle').onclick = () => { $('.filters').hidden = !$('.filters').hidden; }; $('.close').onclick = () => dialog.close(); $('.menu').onclick = () => document.querySelector('nav').classList.toggle('open');
