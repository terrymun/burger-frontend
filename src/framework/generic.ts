/** @method */
export function sleep(duration: number = 0): Promise<void> {
	return new Promise<void>((resolve) => window.setTimeout(resolve, duration));
}

/** @method */
export function repeat<T = any>(
	length: number,
	callback: (value: T, index: number, arr: T[]) => any
): T[] {
	return (Array.from({ length }) as any[]).map(callback);
}
