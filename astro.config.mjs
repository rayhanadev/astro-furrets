import vite from './vite.config.mjs';
import node from '@astrojs/node';
import serviceWorker from 'astro-service-worker';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import webmanifest from 'astro-webmanifest';
import { astroImageTools } from 'astro-imagetools';
import { defineConfig } from 'astro/config';

// https://astro.build/config
const baseUrl = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`;

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
