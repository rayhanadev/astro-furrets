import postcss from './postcss.config.mjs';
import { defineConfig } from 'vite';

export default defineConfig({
	ssr: {
		noExternal: [
			'astro-google-fonts-optimizer',
			'astro-imagetools/components',
			'astro-seo',
		],
	},
	css: { postcss },
});
