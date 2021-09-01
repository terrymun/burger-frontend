import { ChangeEventHandler } from 'react';
import GenericRating, { RatingIconSize } from './Rating';

/** @interface */
interface GenericInputRatingProps {
	value: number;
	onChange: ChangeEventHandler<HTMLInputElement>;
	required?: boolean;
	iconSize?: RatingIconSize;
}

/** @method */
function GenericInputRating(props: GenericInputRatingProps) {
	return (
		<>
			<div className="relative w-min h-10 flex items-center justify-center">
				<GenericRating
					score={props.value}
					iconSize={props.iconSize}
				></GenericRating>
				<input
					className="absolute block z-10 top-0 h-full w-full opacity-0"
					type="range"
					value={props.value}
					required={props.required}
					onChange={props.onChange}
					step="1"
					min="1"
					max="5"
				/>
			</div>
		</>
	);
}

export default GenericInputRating;
