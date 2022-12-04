const contentSecurityPolicy = {
	defaultSrc: ["'self'"], // default-src 'self';
	fontSrc: ["'self'"], // font-src 'self';
	imgSrc: ['*', 'data:'], // img-src * data:;
	mediaSrc: ['*'], // media-src *;
	manifestSrc: ["'self'"], // manifest-src 'self';
	objectSrc: ["'none'"], // object-src 'none';
	childSrc: [
		"'self'",
		'*.furret.codes',
		'furret.codes',
		'*.replit.com',
		'replit.com',
		'*.repl.it',
		'repl.it',
	], // child-src 'self' *.furret.codes furret.codes *.replit.com replit.com *.repl.it repl.it;
	frameSrc: [
		"'self'",
		'*.furret.codes',
		'furret.codes',
		'*.replit.com',
		'replit.com',
		'*.repl.it',
		'repl.it',
	], // frame-src 'self' *.furret.codes furret.codes *.replit.com replit.com *.repl.it repl.it;
	connectSrc: [
		"'self'",
		'*.furret.codes',
		'furret.codes',
		'*.replit.com',
		'replit.com',
		'*.repl.it',
		'repl.it',
	], // connect-src 'self' *.furret.codes furret.codes *.replit.com replit.com *.repl.it repl.it;
	scriptSrc: [
		"'unsafe-inline'",
		"'self'",
		'*.furret.codes',
		'furret.codes',
		'*.replit.com',
		'replit.com',
		'*.repl.it',
		'repl.it',
		'*.repl.co',
		'https:',
	], // script-src 'unsafe-inline' 'self' *.furret.codes furret.codes *.replit.com replit.com *.repl.co https:;
	workerSrc: [
		"'unsafe-inline'",
		"'self'",
		'*.furret.codes',
		'furret.codes',
		'*.replit.com',
		'replit.com',
		'*.repl.it',
		'repl.it',
		'*.repl.co',
		'https:',
	], // worker-src 'unsafe-inline' 'self' *.furret.codes furret.codes *.replit.com replit.com *.repl.co https:;
	styleSrc: ['*', "'unsafe-inline'"], // style-src * 'unsafe-inline';
	frameAncestors: [
		"'self'",
		'*.furret.codes',
		'furret.codes',
		'*.replit.com',
		'replit.com',
		'*.repl.it',
		'repl.it',
		'*.repl.co',
	], // frame-ancestors 'self' *.furret.codes furret.codes *.replit.com replit.com *.repl.co https:;
	baseUri: ["'self'"],
	upgradeInsecureRequests: [], // upgrade-insecure-requests;
};

export default contentSecurityPolicy;
