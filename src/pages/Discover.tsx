import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';
import { getBasicRestaurantsData } from '../api/restaurants';
import AppBlankRestaurantCard from '../components/App/BlankRestaurantCard';
import AppRestaurantCard from '../components/App/RestaurantCard';
import AppSearchForm from '../components/App/SearchForm';
import GenericHeading from '../components/Generic/Heading';
import LayoutContainer from '../components/Layout/Container';
import { pluralize } from '../framework/string';
import { BasicRestaurantDatum } from '../interfaces/api';

/** @method */
function User() {
	const location = useLocation();
	const query = useMemo(() => {
		const parsedQueryString = new URLSearchParams(location.search);
		return parsedQueryString.get('q') ?? '';
	}, [location]);

	const [restaurants, setRestaurants] = useState<BasicRestaurantDatum[]>([]);
	const [isFetching, setIsFetching] = useState<boolean>(true);

	useEffect(() => {
		setRestaurants([]);
		setIsFetching(true);

		getBasicRestaurantsData(query).then((data) => {
			setRestaurants(data);
			setIsFetching(false);
		});
	}, [query]);

	const getRestaurantDom = (restaurant: BasicRestaurantDatum) => {
		return (
			<AppRestaurantCard key={restaurant.name} restaurant={restaurant} />
		);
	}

	return (
		<LayoutContainer tag="article" className="py-6">
			<GenericHeading level={1}>Discover <span className="text-gradient">burgers</span></GenericHeading>
			<p>Find the next hottest burger restaurant in town. Your next burger experience eagerly awaits you.</p>
			<AppSearchForm query={query} />
			<section className="mt-6">
				{(isFetching) && (
					<>
						<GenericHeading level={2}>Please hold for burger&hellip;</GenericHeading>
						<div className="grid grid-cols-1 grid-flow-row-dense sm:grid-cols-2 xl:grid-cols-3 gap-8">
							<AppBlankRestaurantCard />
							<div className="hidden sm:block"><AppBlankRestaurantCard /></div>
							<div className="hidden xl:block"><AppBlankRestaurantCard /></div>
						</div>
					</>
				)}
				{(!isFetching && !!restaurants.length) && (
					<>
						<GenericHeading level={2}>
							Showing {restaurants.length} delicious {pluralize(restaurants.length, 'result')}
							{!!query && <span>for &ldquo;<span className="text-gradient">{query}</span>&rdquo;</span>}
						</GenericHeading>
						<div className="grid grid-cols-1 grid-flow-row-dense sm:grid-cols-2 xl:grid-cols-3 gap-8">
							{restaurants.map(restaurant => getRestaurantDom(restaurant))}
						</div>
					</>
				)}
				{!!(query && !isFetching && !restaurants.length) && (
					<>
						<GenericHeading level={2}>Whoops!</GenericHeading>
						<p>Looks like your search returned no results. Try again with another keyword?</p>
					</>
				)}
			</section>
		</LayoutContainer>
	);
}

export default User;