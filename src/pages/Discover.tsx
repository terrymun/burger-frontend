import GenericHeading from '../components/GenericHeading/GenericHeading';
import LayoutContainer from '../components/LayoutContainer';

/** @method */
function User() {
	return (
		<LayoutContainer tag="article" className="py-6">
			<GenericHeading level={1}>Discover <span className="text-gradient">burgers</span></GenericHeading>
			<p>Find the next hottest burger restaurant in town. Your next burger experience awaits you:</p>
		</LayoutContainer>
	);
}

export default User;