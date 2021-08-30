/** @interface */
interface UserData {
	firstName: string;
}

/** @constant */
// NOTE: User data should be populated by JWT and some kind of global state management system (e.g. Redux)
export const userData: UserData = {
	firstName: 'Terry',
};
