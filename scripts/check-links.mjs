// Comprueba los enlaces del sitio ya compilado (carpeta dist/).
// Uso: npm run build && npm run check:links
//
// - Enlaces internos: el archivo de destino debe existir.
// - Anclas (#seccion): el id debe existir en la página de destino.
// - Enlaces externos y mailto: solo se listan, para revisarlos a mano.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, dirname, posix } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

function htmlFiles(dir) {
	return readdirSync(dir).flatMap((name) => {
		const full = join(dir, name);
		if (statSync(full).isDirectory()) return htmlFiles(full);
		return name.endsWith('.html') ? [full] : [];
	});
}

// Ruta web de una página: dist/en/index.html → /en/
function urlPathOf(file) {
	const rel = '/' + relative(DIST, file).replaceAll('\\', '/');
	return rel.replace(/index\.html$/, '');
}

// Archivo de dist que sirve una ruta web
function fileFor(pathname) {
	const clean = decodeURIComponent(pathname);
	const candidates = clean.endsWith('/')
		? [join(DIST, clean, 'index.html')]
		: [join(DIST, clean), join(DIST, clean + '.html'), join(DIST, clean, 'index.html')];
	return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

const idsCache = new Map();
function idsIn(file) {
	if (!idsCache.has(file)) {
		const html = readFileSync(file, 'utf8');
		idsCache.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
	}
	return idsCache.get(file);
}

const errors = [];
const external = new Set();
const pages = htmlFiles(DIST);

for (const file of pages) {
	const html = readFileSync(file, 'utf8');
	const pagePath = urlPathOf(file);
	const links = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);

	for (const link of links) {
		if (/^(https?:|mailto:|tel:)/.test(link)) {
			external.add(link);
			continue;
		}

		const [pathPart, hash] = link.split('#');
		const target = pathPart === '' ? pagePath : posix.resolve(posix.dirname(pagePath + 'x'), pathPart);
		const targetFile = pathPart === '' ? file : fileFor(target);

		if (!targetFile) {
			errors.push(`${pagePath}: no existe ${link}`);
		} else if (hash && targetFile.endsWith('.html') && !idsIn(targetFile).has(hash)) {
			errors.push(`${pagePath}: no existe el ancla #${hash} en ${urlPathOf(targetFile)}`);
		}
	}
}

console.log(`Páginas revisadas: ${pages.map(urlPathOf).join(', ')}`);
console.log(`\nEnlaces externos (revisar a mano):\n  ${[...external].sort().join('\n  ')}`);

if (errors.length) {
	console.error(`\n✗ ${errors.length} enlace(s) roto(s):\n  ${errors.join('\n  ')}`);
	process.exit(1);
}
console.log('\n✓ Ningún enlace interno roto');
