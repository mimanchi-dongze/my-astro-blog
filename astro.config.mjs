// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://mimanchi-dongze.github.io',
	base: '/my-astro-blog',
	integrations: [mdx(), sitemap()],
	i18n: {
		defaultLocale: 'zh-cn',
		locales: ['zh-cn', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
