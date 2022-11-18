import type { User } from '@stores/Auth';
import type { AstroGlobal } from 'astro';

const getUserInfo = (req: Request): User | null => {
	const { headers } = req;
	const user: User = {
		id: headers.get('x-replit-user-id') || null,
		name: headers.get('x-replit-user-name') || null,
		bio: headers.get('x-replit-user-bio') || null,
		profileImage: headers.get('x-replit-user-profile-image') || null,
		url: headers.get('x-replit-user-url') || null,
		roles: headers.get('x-replit-user-roles').split(',') || null,
		teams: headers.get('x-replit-user-teams').split(',') || null,
	};

	return user;
};

export const getUser = ({
	client,
	server,
}: {
	client?: AstroGlobal;
	server?: Request;
}): User | null => {
	if (client) {
		try {
			return getUserInfo(client.request);
		} catch (error: any) {
			return null;
		}
	}

	if (server) {
		try {
			return getUserInfo(server);
		} catch (error: any) {
			return null;
		}
	}
};

export const redirectUser = (loginPage: string) => {
	return new Response(null, {
		status: 302,
		headers: {
			Location: loginPage.startsWith('/') ? loginPage : `/${loginPage}`,
		},
	});
};

export const authUser = (authed?: () => void) => {
	const height = 500;
	const width = 350;
	const left = screen.width / 2 - width / 2;
	const top = screen.height / 2 - height / 2;

	const authWindow = window.open(
		'https://replit.com/auth_with_repl_site?domain=' + location.host,
		'_blank',
		`modal=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`,
	);

	const onAuthComplete = (event: MessageEvent) => {
		if (event.data !== 'auth_complete') {
			return;
		}

		window.removeEventListener('message', onAuthComplete);

		authWindow.close();

		if (authed && typeof authed === 'function') authed();
		else location.reload();
	};

	window.addEventListener('message', onAuthComplete);
};
