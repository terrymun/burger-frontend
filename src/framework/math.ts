import { TimestampHourAndMinute } from '../interfaces/api';

/** @method */
export function clamp(
	n: number,
	min: number = -Infinity,
	max: number = +Infinity
): number {
	return Math.max(min, Math.min(n, max));
}

/** @method */
export function roundTo(n: number, step: number = 1): number {
	const factor = 1 / step;
	return Math.round(n * factor) / factor;
}

/** @method */
export function isValueWithinRange(
	value: number,
	range: [number] | [number, number]
): boolean {
	if (range.length === 1) {
		return value === range[0];
	} else {
		const [min, max] = [...range].sort((a, b) => a - b);
		return value >= min && value <= max;
	}
}

/** @method */
export function convertTimestampToMinutesFromMidnight(
	timestamp: TimestampHourAndMinute
): number {
	return timestamp.minute + timestamp.hour * 60;
}

/** @method */
export function generateRandomNumber(min: number, max: number) {
	return Math.random() * (max - min) + min;
}
