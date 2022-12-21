import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

import postcss from './postcss.config.mjs';

export default defineConfig({
	envPrefix: ['PUBLIC_', 'REPLIT_', 'REPL_'],
	ssr: {
		noExternal: [
			'astro-google-fonts-optimizer',
			'astro-imagetools/components',
			'astro-seo',
		],
	},
	css: { postcss },
	plugins: [
		AutoImport({
			resolvers: [
				IconsResolver({
					prefix: 'Icon',
					extension: 'jsx',
				}),
			],
		}),
		Icons({
			compiler: 'jsx',
			jsx: 'react',
		}),
		Icons({
			compiler: 'astro',
		}),
	],
});
