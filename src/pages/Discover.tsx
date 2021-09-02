import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

// API imports
import { getBasicRestaurantsData } from '../api/restaurants';
import { RestaurantDatum } from '../interfaces/api';

// Framework imports
import { pluralize } from '../framework/string';

// Component imports
import { FaceDizzy32 } from '@carbon/icons-react';
import AppSearchForm from '../components/App/SearchForm';
import GenericHeading from '../components/Generic/Heading';
import LayoutContainer from '../components/Layout/Container';
import AppRestaurantCard from '../components/App/RestaurantCard';
import AppBlankRestaurantCard from '../components/App/BlankRestaurantCard';

/** @method */
function User() {
	const location = useLocation();
	const query = useMemo(() => {
		const parsedQueryString = new URLSearchParams(location.search);
		return parsedQueryString.get('q') ?? '';
	}, [location]);

	const [restaurants, setRestaurants] = useState<RestaurantDatum[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);

	const focusSearchField = () => {
		(
			document.querySelector('input[type="search"]') as HTMLInputElement
		)?.focus();
	};

	useEffect(() => {
		setRestaurants([]);
		setIsFetching(true);

		if (!query) focusSearchField();

		getBasicRestaurantsData(query).then((data) => {
			setRestaurants(data);
			setIsFetching(false);

			if (data.length === 0) focusSearchField();
		});
	}, [query]);

	const getRestaurantDom = (restaurant: RestaurantDatum) => {
		return (
			<AppRestaurantCard key={restaurant.name} restaurant={restaurant} />
		);
	};

	return (
		<LayoutContainer tag="article" className="py-6">
			<GenericHeading level={1}>
				Discover <span className="text-gradient">burgers</span>
			</GenericHeading>
			<p>
				Find the next hottest burger restaurant in town. Your next
				burger experience eagerly awaits you.
			</p>
			<AppSearchForm query={query} />
			<section className="mt-6">
				{isFetching && (
					<>
						<GenericHeading level={2}>
							Please hold for burger&hellip;
						</GenericHeading>
						<div className="grid grid-cols-1 grid-flow-row-dense sm:grid-cols-2 xl:grid-cols-3 gap-8">
							<AppBlankRestaurantCard />
							<div className="hidden sm:block">
								<AppBlankRestaurantCard />
							</div>
							<div className="hidden xl:block">
								<AppBlankRestaurantCard />
							</div>
						</div>
					</>
				)}
				{!isFetching && !!restaurants.length && (
					<>
						<GenericHeading level={2} className="mt-4">
							Showing {restaurants.length} delicious{' '}
							{pluralize(restaurants.length, 'result')}{' '}
							{!!query && (
								<span>
									for &ldquo;
									<span className="text-gradient">
										{query}
									</span>
									&rdquo;
								</span>
							)}
						</GenericHeading>
						<div className="grid grid-cols-1 grid-flow-row-dense sm:grid-cols-2 xl:grid-cols-3 gap-8 mt-4">
							{restaurants.map((restaurant) =>
								getRestaurantDom(restaurant)
							)}
						</div>
					</>
				)}
				{!!(query && !isFetching && !restaurants.length) && (
					<div className="text-center py-10">
						<FaceDizzy32 className="w-16 h-16 mx-auto" />
						<GenericHeading level={2}>Whoops!</GenericHeading>
						<p>
							Looks like your search returned no results. Try
							again with another keyword?
						</p>
					</div>
				)}
			</section>
		</LayoutContainer>
	);
}

export default User;
