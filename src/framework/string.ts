/** @method */
export function pluralize(n: number; word: string, customPlural?: string): string {
	return n <= 1 ? word : (customPlural ?? `${word}s`);
}
