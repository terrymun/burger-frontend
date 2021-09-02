/** @interface */
interface UserPersonalData {
	firstName: string;
	lastName: string;
}

/** @constant */
// NOTE: User data should be populated by JWT and some kind of global state management system (e.g. Redux)
export const userPersonalData: UserPersonalData = {
	firstName: 'Terry',
	lastName: 'Mun',
};
