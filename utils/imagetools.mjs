import { middleware } from 'astro-imagetools/ssr';
import stream from 'node:stream';

export const handler = async (req, res, next) => {
	const buffer = await middleware(req, res);
	const bufferStream = new stream.PassThrough();
	bufferStream.end(buffer);

	if (buffer) bufferStream.pipe(res);
};
