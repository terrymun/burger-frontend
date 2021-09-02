import { Link } from 'react-router-dom';

// Component imports
import {
	FingerprintRecognition16,
	Restaurant16,
	Sight16,
	Taste16,
	User16,
} from '@carbon/icons-react';
import GenericHeading from '../Generic/Heading';
import GenericRating from '../Generic/Rating';

// Interface imports
import { RestaurantReview } from '../../interfaces/api';

/** @interface */
interface AppReviewCardProps {
	review: RestaurantReview;
	isCondensed?: boolean;
	groupedBy: GroupedBy;
}

/** @enum */
export enum GroupedBy {
	AUTHOR,
	RESTAURANT,
}

/** @method */
function AppReviewCard(props: AppReviewCardProps) {
	const {
		restaurantId,
		restaurantName,
		title,
		body,
		tasteRating,
		textureRating,
		presentationRating,
		author,
	} = props.review;
	return (
		<Link
			to={`/restaurant/${restaurantId}`}
			title={`Visit ${restaurantName}`}
			className="block rounded-md overflow-hidden bg-white dark:bg-gray-800 transition-all shadow-md hover:shadow-lg duration-300"
		>
			<article>
				<header className="text-gray-700 dark:text-gray-200 transition-colors px-6 pt-4 mb-4">
					<GenericHeading level={5}>
						<span className="italic">&ldquo;{title}&rdquo;</span>
					</GenericHeading>
					<div className="flex gap-x-1 items-center">
						{props.groupedBy === GroupedBy.AUTHOR && (
							<>
								<User16 />
								{author}
							</>
						)}
						{props.groupedBy === GroupedBy.RESTAURANT && (
							<>
								<Restaurant16 />
								{restaurantName}
							</>
						)}
						<span className="flex-grow"></span>
						<GenericRating
							score={
								(tasteRating +
									textureRating +
									presentationRating) /
								3
							}
						/>
					</div>
				</header>
				<section
					className={`text-gray-500 dark:text-gray-300 px-6 mb-4 ${
						!!props.isCondensed && 'line-clamp-3'
					}`}
				>
					{body}
				</section>
				<footer className="px-6 py-3 bg-gray-100 dark:bg-gray-600 dark:bg-opacity-40 text-gray-400 dark:text-gray-400 transition-colors text-sm">
					<ul className="flex justify-between items-center flex-wrap gap-4">
						<li className="flex flex-col items-center justify-start mx-auto flex-grow">
							<GenericRating score={tasteRating} />
							<span className="flex items-center gap-x-0.5 mt-2">
								<Taste16 /> Taste
							</span>
						</li>
						<li className="flex flex-col items-center justify-start mx-auto flex-grow">
							<GenericRating score={textureRating} />
							<span className="flex items-center gap-x-0.5 mt-2">
								<FingerprintRecognition16 /> Texture
							</span>
						</li>
						<li className="flex flex-col items-center justify-start mx-auto flex-grow">
							<GenericRating score={presentationRating} />
							<span className="flex items-center gap-x-0.5 mt-2">
								<Sight16 /> Presentation
							</span>
						</li>
					</ul>
				</footer>
			</article>
		</Link>
	);
}

export default AppReviewCard;
