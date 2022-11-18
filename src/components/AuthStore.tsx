import { useStore } from '@nanostores/react';
import user, { setUser } from '@stores/Auth';
import type { User } from '@stores/Auth';
import React, { useEffect } from 'react';

interface AuthStoreProps {
	user: User;
}

const AuthStore = ({ user }: AuthStoreProps) => {
	useEffect(() => {
		setUser(user);
	}, [user]);

	return null;
};

export default AuthStore;

export const useUser = (config?: { update?: boolean }) => {
	const $user = useStore(user);

	useEffect(() => {
		(async () => {
			if (config?.update) {
				const newUser = await fetch('/__replauthuser').then((res) =>
					res.json(),
				);

				setUser(newUser);
			}
		})();
	}, []);

	return $user;
};
