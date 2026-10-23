// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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

	integrations: [
		sitemap({
			// La 404 no debe aparecer en buscadores
			filter: (page) => !page.includes('/404'),
			// Relaciona cada página con su versión en el otro idioma
			i18n: {
				defaultLocale: 'es',
				locales: { es: 'es', en: 'en' },
			},
		}),
	],
});
