/** @method */
export function getDayOfWeekFromNumber(n: number): string {
	if (n > 6 || n < 0) {
		console.warn(`[datetime.ts] Invalid value of "${n}" detected. It needs to be in the range of 0 through 6`);
		return '';
	}

	return ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'][n] ?? '';
}
