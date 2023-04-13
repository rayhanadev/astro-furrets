import caching, { privacy } from '@fastify/caching';
import compress from '@fastify/compress';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import middie from '@fastify/middie';
import Fastify from 'fastify';
import { LRUCache } from 'lru-cache'
// import serve from '@fastify/static';
import serve from 'serve-static';
import { customAlphabet } from 'nanoid';

import path from 'node:path';

import { directives } from './utils/csp.mjs';
import { handler as imageHandler } from './utils/imagetools.mjs';
import { handler as ssrHandler } from './utils/ssr.mjs';

const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 10);

const fastify = Fastify({
	logger: true,
	genReqId: (req) => req.headers['x-replit-user-name']
		? `${req.headers['x-replit-user-name'].toLowerCase()}-${nanoid()}`
		: `anon-${nanoid()}`,
});

const cache = new LRUCache({
	ttl: 1000 * 60 * 60 * 4,
	max: 50,
	maxSize: 5000,
});

const staticAssetsRoot = path.join(process.cwd(), '_astro/client');

fastify.addHook('preHandler', (request, reply, done) => {
	const username = request.headers['x-replit-user-name'];
	if (username) reply.header('x-request-id', username.toLowerCase());
	done();
});

await fastify
	.register(formbody, {})
	.register(cors, {})
	.register(helmet, {
		contentSecurityPolicy: {
			useDefaults: false,
			directives,
		},
		crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
		crossOriginResourcePolicy: { policy: 'same-site' },
		hsts: true,
		noSniff: true,
		originAgentCluster: true,
		ieNoOpen: true,
		permittedCrossDomainPolicies: true,
		xssFilter: true,
	})
	// .register(serve, {
	// 	root: staticAssetsRoot,
	// })
	.register(caching, {
		privacy: privacy.NOCACHE,
		expiresIn: 1000 * 60 * 60 * 4,
		cache: {
			get: (key) => cache.get(key),
			set: (key, value) => cache.set(key, value),
		},
		cacheSegment: 'fastify-cache',
	})
	.register(middie);

await fastify.use(serve(staticAssetsRoot));
await fastify.use(ssrHandler);
await fastify.use(imageHandler);

const start = async () => {
	try {
		await fastify.listen({ port: 8080, host: '0.0.0.0' });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
};

start();

async function closeServer(signal) {
	fastify.log.info(`Closing the server with the signal ${signal}`);
	await fastify.close();
	process.kill(process.pid, signal);
}

process.once('SIGINT', closeServer);
process.once('SIGTERM', closeServer);
