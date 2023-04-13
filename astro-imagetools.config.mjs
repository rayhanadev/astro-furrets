import { defineConfig } from 'astro-imagetools/config';

export default defineConfig({
	placeholder: 'tracedSVG',
	format: ['webp', 'jpg'],
	fallbackFormat: 'png',
	includeSourceFormat: false,
	cacheDir: '_astro/imagetools/',
	assetFileNames: 'assets/[name]@[width].[hash][extname]',
});
