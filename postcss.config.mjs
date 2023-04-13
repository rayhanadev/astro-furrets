import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssFontpath from 'postcss-fontpath';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import tailwindcssNesting from 'tailwindcss/nesting/index.js';

import tailwind from './tailwind.config.mjs';

const config = {
	plugins: [
		postcssImport(),
		postcssFontpath({
			formats: [{ type: 'woff2', ext: 'woff2' }],
		}),
		tailwindcssNesting(),
		tailwindcss({
			config: tailwind,
		}),
		autoprefixer(),
		cssnano(),
	],
};

export default config;
