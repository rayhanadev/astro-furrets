import { handler as ssrHandler } from './dist/server/entry.mjs';
import { handler as imageHandler } from './utils/imagetools.mjs';
import { morgan } from '@ts-koa/koa-morgan';
import Koa from 'koa';
import m from 'koa-connect';
import helmet from 'koa-helmet';
import serve from 'koa-static';
import path from 'node:path';

const app = new Koa();

app.use(morgan(':status :method :url - :response-time ms'));

app.use(helmet.xssFilter());

app.use(serve(path.join(process.cwd(), 'dist/', 'client/')));

app.use(m(ssrHandler));
app.use(m(imageHandler));

app.listen(3000);
