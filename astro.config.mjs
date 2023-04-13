import node from '@astrojs/node';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import critters from 'astro-critters';
import { astroImageTools } from 'astro-imagetools';
import robotsTxt from 'astro-robots-txt';
import webmanifest from 'astro-webmanifest';
import { defineConfig } from 'astro/config';
import serviceWorker from 'astrojs-service-worker';

import path from 'node:path';

import vite from './vite.config.mjs';

// https://astro.build/config
const baseUrl = `https://${process.env.REPL_SLUG.toLowerCase()}.${process.env.REPL_OWNER.toLowerCase()}.repl.co`;

export default defineConfig({
	vite,
	site: baseUrl,
	output: 'server',
	server: {
		port: 3000,
		host: true,
	},
	root: process.cwd(),
	srcDir: path.join(process.cwd(), 'app/'),
	publicDir: path.join(process.cwd(), 'app/public/'),
	outDir: path.join(process.cwd(), '_astro/'),
	build: {
		client: '_astro/client/',
		server: '_astro/server/',
		format: 'file',
		serverEntry: 'index.mjs',
		assets: 'assets',
	},
	adapter: node({
		mode: 'middleware',
	}),
	integrations: [
		serviceWorker(),
		tailwind({
			config: {
				path: './tailwind.config.mjs',
			},
		}),
		react(),
		partytown(),
		compress({
			logger: 1,
		}),
		sitemap({
			customPages: [`${baseUrl}/`],
		}),
		robotsTxt({
			policy: [
				{
					userAgent: '*',
					allow: '/',
					crawlDelay: 2,
				},
			],
		}),
		webmanifest({
			name: '<PROJECT_NAME>',
			short_name: '<PROJECT_NAME>',
			icon: './app/public/logo.svg',
			icons: [
				{
					src: './android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'any',
				},
				{
					src: './android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any',
				},
				{
					src: './maskable-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'maskable',
				},
			],
			description: '<PROJECT_DESCRIPTION>',
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
		critters({
			logger: 1,
		}),
	],
});
