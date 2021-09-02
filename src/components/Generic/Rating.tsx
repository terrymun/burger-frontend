// Component imports
import {
	StarFilled16,
	StarHalf16,
	StarFilled32,
	StarHalf32,
	CarbonIconType,
	StarHalf24,
	StarFilled24,
} from '@carbon/icons-react';

// Framework imports
import { repeat } from '../../framework/generic';
import { clamp, roundTo } from '../../framework/math';

/** @enum */
export enum RatingIconSize {
	SMALL,
	MEDIUM,
	LARGE,
}

/** @interface */
interface GenericRatingProp {
	score: number;
	iconSize?: RatingIconSize;
}

/** @method */
function GenericRating(prop: GenericRatingProp) {
	const score = roundTo(clamp(prop.score, 0, 5), 0.5);
	const iconSize = prop.iconSize ?? RatingIconSize.SMALL;

	let FilledIcon: CarbonIconType;
	let HalfFilledIcon: CarbonIconType;
	switch (iconSize) {
		case RatingIconSize.SMALL:
			FilledIcon = StarFilled16;
			HalfFilledIcon = StarHalf16;
			break;

		case RatingIconSize.LARGE:
			FilledIcon = StarFilled32;
			HalfFilledIcon = StarHalf32;
			break;

		default:
			FilledIcon = StarFilled24;
			HalfFilledIcon = StarHalf24;
	}

	const filledStarCount = Math.floor(score);
	const halfStarCount = Math.round(score - filledStarCount);
	const emptyStarCount = 5 - filledStarCount - halfStarCount;

	const filledStars = repeat<JSX.Element>(filledStarCount, (_, i) => (
		<span key={`filled_${i}`} className="text-yellow-400">
			<FilledIcon key={i} />
		</span>
	));
	const halfStars = repeat<JSX.Element>(halfStarCount, (_, i) => (
		<span key={`half_${i}`} className="relative">
			<span className="text-yellow-400 absolute top-0 left-0">
				<HalfFilledIcon key={i} />
			</span>
			<span className="text-gray-300 dark:text-gray-600 transition-colors">
				<FilledIcon key={i} />
			</span>
		</span>
	));
	const emptyStars = repeat<JSX.Element>(emptyStarCount, (_, i) => (
		<span
			key={`empty_${i}`}
			className="text-gray-300 dark:text-gray-600 transition-colors"
		>
			<FilledIcon key={i} />
		</span>
	));

	return (
		<div className="flex gap-x-0.5 w-min" title={`Rating: ${score}`}>
			{filledStars}
			{halfStars}
			{emptyStars}
		</div>
	);
}

export default GenericRating;
