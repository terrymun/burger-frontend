import GenericHeading from '../components/GenericHeading/GenericHeading';
import LayoutContainer from '../components/LayoutContainer';

// NOTE: User data should be populated by JWT and some kind of global state management system (e.g. Redux)
import { userData } from '../constants/user';

/** @method */
function Discover() {
	const layoutContainerTagName = 'article';
	return (
		<LayoutContainer tag={layoutContainerTagName} className="py-6">
			<GenericHeading level={1}>Hello, <span className="text-gradient">{userData.firstName}</span>!</GenericHeading>
			<p>Manage your personal data here.</p>
		</LayoutContainer>
	);
}

export default Discover;