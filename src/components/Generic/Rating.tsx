import { StarFilled16, StarHalf16 } from "@carbon/icons-react";
import { repeat } from "../../framework/generic";
import { clamp, roundTo } from "../../framework/math";

/** @interface */
interface GenericRatingProp {
	score: number;
}

/** @method */
function GenericRating(prop: GenericRatingProp) {
	const score = roundTo(clamp(prop.score, 0, 5), 0.5);
	const filledStarCount = Math.floor(score);
	const halfStarCount = Math.round(score - filledStarCount);
	const emptyStarCount = 5 - filledStarCount - halfStarCount;

	const filledStars = repeat<JSX.Element>(filledStarCount, (_, i) => (
		<span key={`filled_${i}`} className="text-yellow-400">
			<StarFilled16 key={i} />
		</span>
	));
	const halfStars = repeat<JSX.Element>(halfStarCount, (_, i) => (
		<span key={`half_${i}`} className="relative">
			<span className="text-yellow-400 absolute top-0 left-0">
				<StarHalf16 key={i} />
			</span>
			<span className="text-gray-300 dark:text-gray-600">
				<StarFilled16 key={i} />
			</span>
		</span>
	));
	const emptyStars = repeat<JSX.Element>(emptyStarCount, (_, i) => (
		<span key={`empty_${i}`} className="text-gray-300 dark:text-gray-600">
			<StarFilled16 key={i} />
		</span>
	));
	
	return (
		<div className="flex gap-x-0.5" title={`Average rating: ${score}`}>
			{filledStars}
			{halfStars}
			{emptyStars}
		</div>
	);
}

export default GenericRating;