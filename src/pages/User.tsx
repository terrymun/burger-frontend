import GenericHeading from '../components/Generic/Heading';
import LayoutContainer from '../components/Layout/Container';

// NOTE: User data should be populated by JWT and some kind of global state management system (e.g. Redux)
import { userData } from '../constants/user';

/** @method */
function Discover() {
	return (
		<LayoutContainer tag="article" className="py-6">
			<GenericHeading level={1}>Hello, <span className="text-gradient">{userData.firstName}</span>!</GenericHeading>
			<p>Manage your personal data here.</p>
		</LayoutContainer>
	);
}

export default Discover;