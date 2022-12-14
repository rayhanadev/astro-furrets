import node from '@astrojs/node';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import { astroImageTools } from 'astro-imagetools';
import robotsTxt from 'astro-robots-txt';
import serviceWorker from 'astro-service-worker';
import webmanifest from 'astro-webmanifest';
import { defineConfig } from 'astro/config';

import vite from './vite.config.mjs';

// https://astro.build/config
const baseUrl = `https://${process.env.REPL_SLUG.toLowerCase()}.${process.env.REPL_OWNER.toLowerCase()}.repl.co`;

export default defineConfig({
	vite,
	site: baseUrl,
	output: 'server',
	server: { port: 3000, host: true },
	adapter: node({ mode: 'middleware' }),
	integrations: [
		// serviceWorker(),
		tailwind({
			config: { path: './tailwind.config.mjs' },
		}),
		react(),
		partytown(),
		compress(),
		sitemap({
			customPages: [`${baseUrl}/`],
		}),
		robotsTxt(),
		webmanifest({
			name: 'New Astro Furrets Project! 🎉',
			short_name: 'Astro Furrets',
			icon: './public/logo.svg',
			icons: [
				{
					src: './public/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: './public/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
			description: 'A project made with Astro Furrets! 🎉',
			lang: 'en-US',
			start_url: '/',
			theme_color: '#14131E',
			background_color: '#14131E',
			display: 'standalone',
			config: {
				outfile: 'manifest.json',
				indent: '',
				eol: '',
				insertManifestLink: false,
			},
		}),
		astroImageTools,
	],
});
