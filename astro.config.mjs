// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://indentier.github.io',
	integrations: [
		starlight({
			title: 'Indentier',
			favicon: '/icon.svg',
			logo: { src: './src/assets/icon.svg', alt: 'Indentier' },
			head: [
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', href: '/icon.png' } },
			],
			description:
				"A silly formatter that hides {, }, ;, and trailing , in the right margin — letting curly-brace languages pretend they're Python or Ruby.",
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/indentier/indentier' },
				{ icon: 'npm', label: 'npm', href: 'https://www.npmjs.com/package/indentier' },
			],
			editLink: {
				baseUrl: 'https://github.com/indentier/indentier.github.io/edit/main/',
			},
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				ja: { label: '日本語', lang: 'ja' },
			},
			sidebar: [
				{ label: 'Getting Started', translations: { ja: 'はじめに' }, slug: 'getting-started' },
				{ label: 'Configuration', translations: { ja: '設定' }, slug: 'configuration' },
				{ label: 'Modes', translations: { ja: 'モード' }, slug: 'modes' },
				{ label: 'Plugins', translations: { ja: 'プラグイン' }, slug: 'plugins' },
				{
					label: 'Reference',
					translations: { ja: 'リファレンス' },
					items: [
						{ label: 'CLI', slug: 'reference/cli' },
						{ label: 'API', slug: 'reference/api' },
					],
				},
			],
		}),
	],
});

