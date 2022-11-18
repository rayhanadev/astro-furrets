import tailwind from './tailwind.config.mjs';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssFontpath from 'postcss-fontpath';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import tailwindcssNesting from 'tailwindcss/nesting/index.js';

const config = {
	plugins: [
		postcssImport(),
		postcssFontpath({
			formats: [
				{ type: 'woff2', ext: 'woff2' },
				{ type: 'truetype', ext: 'ttf' },
			],
		}),
		tailwindcssNesting(),
		tailwindcss({
			config: tailwind,
		}),
		autoprefixer(),
		...(process.env.NODE_ENV === 'production' ? [cssnano()] : []),
	],
};

export default config;
