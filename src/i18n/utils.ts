import es from './es.json';
import en from './en.json';

export const languages = ['es', 'en'] as const;
export type Lang = (typeof languages)[number];

// El español es la referencia: si al inglés le falta una clave, TypeScript avisa
type Dictionary = typeof es;
const dictionaries: Record<Lang, Dictionary> = { es, en };

export function getDictionary(lang: Lang): Dictionary {
	return dictionaries[lang];
}

export function otherLang(lang: Lang): Lang {
	return lang === 'es' ? 'en' : 'es';
}

// Quita el prefijo de idioma: "/en/proyectos/" → "/proyectos/"
export function pathWithoutLang(pathname: string): string {
	return pathname.replace(/^\/en(?=\/|$)/, '') || '/';
}
