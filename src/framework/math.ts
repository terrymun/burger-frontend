/** @method */
export function clamp(n: number, min: number = -Infinity, max: number = +Infinity): number {
	return Math.max(min, Math.min(n, max));
}
