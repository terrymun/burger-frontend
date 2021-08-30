import {
	convertTimestampToMinutesFromMidnight,
	isValueWithinRange,
} from '../framework/math';
import { BusinessHours } from '../interfaces/api';

/** @method */
export function isRestaurantOpen(businessHours: BusinessHours[]): boolean {
	const now = new Date();
	const currentDay = now.getDay();
	const currentHour = now.getHours();
	const currentMinute = now.getMinutes();

	const matchingDayRange = businessHours.find((entry) =>
		isValueWithinRange(currentDay, entry.dayRange)
	);
	if (!matchingDayRange) return false;

	const opensAt = convertTimestampToMinutesFromMidnight(
		matchingDayRange.timeRange[0]
	);
	const closesAt = convertTimestampToMinutesFromMidnight(
		matchingDayRange.timeRange[1]
	);
	const currentTime = currentMinute + currentHour * 60;

	return isValueWithinRange(currentTime, [opensAt, closesAt]);
}
