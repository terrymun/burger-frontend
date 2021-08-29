// Asset imports
import './Header.css';

// Router imports
import { NavLink } from "react-router-dom";

// Component imports
import GenericIcon from '../Generic/Icon';
import LayoutContainer from '../Layout/Container';
import { CarbonIconType, Home16, LocationHeartFilled16, UserAvatarFilled24 } from '@carbon/icons-react';

// NOTE: User data should be populated by JWT and some kind of global state management system (e.g. Redux)
import { userData } from '../../constants/user';

/** @interface */
interface NavigationItem {
	path: string;
	title: string;
	text: string;
	icon?: CarbonIconType;
	textClassName?: string;
}

/** @method */
function AppHeader() {
	const items: NavigationItem[] = [{
		path: '/',
		title: 'Home',
		text: 'Home',
		icon: Home16,
		textClassName: 'hidden md:block'
	}, {
		path: '/discover',
		title: 'Discover',
		text: 'Discover',
		icon: LocationHeartFilled16,
	}];

	const listItems = items.map(({ path, title, text, textClassName, icon }) => {
		
		return (
			<li key={path} className="flex items-center">
				<NavLink
					exact
					to={path}
					title={title}
					activeClassName="is-active"
					className="py-6 mr-3 md:mr-6 lg:mr-9 flex justify-center items-center gap-1 uppercase font-bold text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-all">
					{!!icon && <GenericIcon name={icon} /> }
					<span className={textClassName ?? 'block'}>{text}</span>
				</NavLink>
			</li>
		);
	});

	return (
		<header className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-90">
			<LayoutContainer className="flex justify-between items-center">
				<ul className="list-none flex">
					{listItems}
				</ul>
				<NavLink
					exact
					to="/user"
					className="py-6 flex justify-center items-center gap-1 text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-all">
					<UserAvatarFilled24 />
					{userData.firstName}
				</NavLink>
			</LayoutContainer>
		</header>
	);
}

export default AppHeader;
