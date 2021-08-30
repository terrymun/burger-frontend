// Component imports
import LayoutContainer from '../components/Layout/Container';
import GenericHeading from '../components/Generic/Heading';
import AppSearchForm from '../components/App/SearchForm';

/** @method */
function NotFound() {
	return (
		<LayoutContainer tag="section" className="py-6">
			<GenericHeading level={1}>
				Oh my <span className="text-gradient">burgers</span>!
			</GenericHeading>
			<p>
				We are unfortunately unable to locate the page you are looking
				for&mdash;the link might have expired or the page may have been
				moved.
			</p>
			<p>However, that does not stop you from looking for burgers:</p>
			<AppSearchForm />
		</LayoutContainer>
	);
}

export default NotFound;
