// This is necessary to keep an up-to-date ReplDB url
// because ReplDB urls change every so often.
const getReplDBUrl = async (): Promise<string> => {
	if(import.meta.env.DEV) {
		return import.meta.env.REPLIT_DB_URL;
	};

	const memoizedFetch = async (): Promise<string> => {
		const cachedReplitDbUrl = sessionStorage.getItem('REPLIT_DB_URL');
		if(cachedReplitDbUrl) return cachedReplitDbUrl;

		const { url } = await fetch(`${import.meta.env.SITE}/db`)
			.then((res) => res.json());

		sessionStorage.setItem('REPLIT_DB_URL', url);
		return url;
	};
	
	return await memoizedFetch();
};

export const list = async (): Promise<void> => {
	const REPLDB_URL = await getReplDBUrl();
	await fetch(`${REPLDB_URL}/`, {
		method: 'GET',
		mode: 'no-cors',
	});
};

export const get = async (key: string): Promise<unknown> => {
	const REPLDB_URL = await getReplDBUrl();
	const res = await fetch(`${REPLDB_URL}/${key}`, {
		method: 'GET',
		mode: 'no-cors',
	});
	
	if (res.status === 429) throw new Error('Ratelimited');

	const encoded = await res.text();

	if (!encoded) return null;

	let value = decodeURIComponent(encoded);

	try {
		value = JSON.parse(value);
	} catch {
		throw new SyntaxError(`Failed to parse value of ${key}.`);
	}

	if (value === null || value === undefined) return null;

	return value;
};

export const set = async (key: string, value: any): Promise<void> => {
	const REPLDB_URL = await getReplDBUrl();
	await fetch(`${REPLDB_URL}`, {
		method: 'POST',
		mode: 'no-cors',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: `${encodeURIComponent(key)}=${encodeURIComponent(
			JSON.stringify(value),
		)}`,
	});
};

export const del = async (key: string): Promise<void> => {
	const REPLDB_URL = await getReplDBUrl();
	await fetch(`${REPLDB_URL}/${key}`, {
		method: 'DELETE',
		mode: 'no-cors',
	});
};
