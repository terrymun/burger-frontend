import { useMemo } from 'react';
import { useLocation } from 'react-router';
import AppSearchForm from '../components/App/SearchForm';
import GenericHeading from '../components/Generic/Heading';
import LayoutContainer from '../components/Layout/Container';

/** @method */
function User() {
	const location = useLocation();
	const query = useMemo(() => {
		const parsedQueryString = new URLSearchParams(location.search);
		return parsedQueryString.get('q') ?? '';
	}, [location]);

	return (
		<LayoutContainer tag="article" className="py-6">
			<GenericHeading level={1}>Discover <span className="text-gradient">burgers</span></GenericHeading>
			<p>Find the next hottest burger restaurant in town. Your next burger experience awaits you:</p>
			{!query && <AppSearchForm />}
			{query && (
				<GenericHeading level={2}>Showing results for &ldquo;<span className="text-gradient">{query}</span>&rdquo;</GenericHeading>
			)}
		</LayoutContainer>
	);
}

export default User;