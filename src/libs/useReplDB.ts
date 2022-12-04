export const get = async (key: string): Promise<unknown> => {
	const res = await fetch(`${import.meta.env.REPLIT_DB_URL}/${key}`, {
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
	const res = await fetch(`${import.meta.env.REPLIT_DB_URL}`, {
		method: 'POST',
		mode: 'no-cors',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: `${encodeURIComponent(key)}=${encodeURIComponent(
			JSON.stringify(value),
		)}`,
	});
};
