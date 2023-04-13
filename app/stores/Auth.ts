import { atom } from 'nanostores';

export interface User {
	id?: string;
	name?: string;
	roles?: string[];
	teams?: string[];
	bio?: string;
	url?: string;
	profileImage?: string;
}

const user = atom<User>({});
export default user;

export const setUser = (newUser: User) => {
	user.set({ ...user.get(), ...newUser });
};
