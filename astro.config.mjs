// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Dirección pública del sitio: se usa para URLs canónicas, hreflang y sitemap
	site: 'https://micheldiazc.github.io',

	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
		routing: {
			// Español en "/" e inglés en "/en/"
			prefixDefaultLocale: false,
		},
	},
});
