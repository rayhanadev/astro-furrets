/// <reference types="astro/client" />

declare module 'astro-imagetools/components';

interface ImportMetaEnv {
	// Replit Env
	readonly REPL_ID: string;
	readonly REPL_SLUG: string;
  readonly REPL_OWNER: string;
  readonly REPLIT_DB_URL: string;

	// Analytics
	readonly UMAMI_ANALYTICS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}