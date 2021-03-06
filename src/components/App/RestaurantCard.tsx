import { Link } from 'react-router-dom';

// Helper imports
import { isRestaurantOpen } from '../../helper/restaurant';

// API imports
import { RestaurantDatum } from '../../interfaces/api';

// Component imports
import { AsleepFilled24, UserMultiple16 } from '@carbon/icons-react';
import GenericHeading from '../Generic/Heading';
import GenericRating from '../Generic/Rating';
import GenericBadge, { BadgeSize, BadgeType } from '../Generic/Badge';

/** @interface */
interface AppRestaurantCardProps {
	restaurant: RestaurantDatum;
}

/** @method */
function AppRestaurantCard(props: AppRestaurantCardProps) {
	const { restaurant } = props;
	const to = `/restaurant/${restaurant.id}`;
	let classNames =
		'rounded-md overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl flex flex-col transition-all duration-300 transform hover:scale-105 active:scale-100';

	if (restaurant.averageRatingScore > 4.5) {
		classNames += ' md:col-span-2';
	}

	const isOpen = isRestaurantOpen(restaurant.businessHours);

	return (
		<Link to={to} className={classNames}>
			<article>
				<div className="w-full h-64 flex-grow-0 relative">
					<img
						src={restaurant.image}
						title={restaurant.name}
						alt={restaurant.description}
						className="object-cover w-full h-full"
					/>
					{restaurant.averageRatingScore > 4.5 && (
						<div className="absolute top-5 left-5">
							<GenericBadge
								size={BadgeSize.SMALL}
								type={BadgeType.PRIMARY}
								className="uppercase flex gap-x-1"
							>
								<UserMultiple16 />
								Popular
							</GenericBadge>
						</div>
					)}
					{!isOpen && (
						<div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white font-bold transition-colors">
							<AsleepFilled24 className="mb-2" />
							Closed
						</div>
					)}
				</div>
				<header className="px-6 py-4 text-gray-700 dark:text-gray-200 flex-grow transition-colors">
					<GenericHeading level={5}>{restaurant.name}</GenericHeading>
					<span className="text-gray-500 dark:text-gray-300 line-clamp-none md:line-clamp-1">
						{restaurant.description}
					</span>
				</header>
				<footer className="px-6 py-3 bg-gray-100 dark:bg-gray-600 dark:bg-opacity-40 text-gray-400 dark:text-gray-400 flex-grow-0 transition-colors">
					<GenericRating score={restaurant.averageRatingScore} />
				</footer>
			</article>
		</Link>
	);
}

export default AppRestaurantCard;
