import { TimestampHourAndMinute } from '../interfaces/api';

/** @method */
export function pluralize(
	n: number,
	word: string,
	customPlural?: string
): string {
	return n <= 1 ? word : customPlural ?? `${word}s`;
}

/** @method */
export function haystackContainsNeedle(
	needle: string,
	haystack: string,
	isCaseSensitive: boolean = false
): boolean {
	if (isCaseSensitive) {
		return haystack.includes(needle);
	}

	return haystack.toLowerCase().includes(needle.toLowerCase());
}

/** @method */
export function getHumanReadableHoursAndMinutesFromTimestamp(
	t: TimestampHourAndMinute
): string {
	return `${t.hour.toString().padStart(2, '0')}.${t.minute
		.toString()
		.padStart(2, '0')}`;
}
