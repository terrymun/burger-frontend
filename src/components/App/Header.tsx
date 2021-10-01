// Asset imports
import './Header.scss';

// Router imports
import { NavLink, NavLinkProps } from 'react-router-dom';

// Component imports
import GenericIcon from '../Generic/Icon';
import LayoutContainer from '../Layout/Container';
import {
	AsleepFilled16,
	CarbonIconType,
	Home24,
	LightFilled16,
	LocationStar24,
	UserAvatarFilled24,
} from '@carbon/icons-react';

// NOTE: User data should be populated by JWT and some kind of global state management system (e.g. Redux)
import { userPersonalData } from '../../constants/user';
import { useEffect, useState } from 'react';

/** @interface */
interface NavigationItem {
	path: string;
	title: string;
	text: string;
	icon?: CarbonIconType;
	textClassName?: string;
	isActive: NavLinkProps['isActive'];
}

/** @method */
function AppHeader() {
	const [shouldUseDarkTheme, setShouldUseDarkTheme] = useState(
		window.localStorage.getItem('hasUserManuallyToggledDarkTheme') !== null
			? window.localStorage.getItem('hasUserManuallyToggledDarkTheme') ===
					'true'
			: window.matchMedia('(prefers-color-scheme: dark)').matches
	);
	const toggleDarkTheme = () => {
		window.localStorage.setItem(
			'hasUserManuallyToggledDarkTheme',
			!shouldUseDarkTheme ? 'true' : 'false'
		);
		setShouldUseDarkTheme(!shouldUseDarkTheme);
	};
	useEffect(() => {
		document.documentElement.classList.toggle('dark', shouldUseDarkTheme);
		document
			.querySelector('#theme-color')
			?.setAttribute(
				'content',
				shouldUseDarkTheme ? '#111827' : '#F9FAFB'
			);
	});

	const items: NavigationItem[] = [
		{
			path: '/',
			title: 'Home',
			text: 'Home',
			icon: Home24,
			textClassName: 'hidden md:block',
			isActive: (match) => {
				return !!match;
			},
		},
		{
			path: '/discover',
			title: 'Discover',
			text: 'Discover',
			icon: LocationStar24,
			isActive: (match, location) => {
				return (
					!!match || location.pathname.indexOf('/restaurant/') !== -1
				);
			},
		},
	];

	const listItems = items.map(
		({ path, title, text, textClassName, icon, isActive }) => {
			return (
				<li key={path} className="flex items-center">
					<NavLink
						exact
						to={path}
						title={title}
						isActive={isActive}
						activeClassName="is-active"
						className="py-6 mr-3 md:mr-6 lg:mr-9 flex justify-center items-center gap-1 uppercase font-bold text-sm hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors"
					>
						{!!icon && <GenericIcon name={icon} />}
						<span className={textClassName ?? 'block'}>{text}</span>
					</NavLink>
				</li>
			);
		}
	);

	return (
		<header className="sticky top-0 z-20 bg-gray-50 dark:bg-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-90 transition-colors">
			<LayoutContainer className="flex justify-between items-center">
				<ul className="list-none flex">{listItems}</ul>
				<ul className="list-none flex">
					<li className="flex items-center">
						<NavLink
							exact
							to="/user"
							activeClassName="is-active"
							className="py-6 flex justify-center items-center gap-1 text-sm md:text-base hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors"
						>
							<UserAvatarFilled24 />
							<span>
								<span className="hidden sm:inline-block">
									Hello,&nbsp;
								</span>
								<strong>{userPersonalData.firstName}</strong>
							</span>
						</NavLink>
					</li>
					<li className="flex items-center">
						<button
							className="flex items-center contents-center p-2 rounded-md ml-6 transition-colors
								bg-yellow-500 text-gray-800 dark:bg-purple-800 dark:text-gray-100
								focus:ring-yellow-500 dark:focus:ring-purple-600
								border-0 focus:outline-none focus:ring-2 focus:ring-opacity-25"
							title="Toggle light/dark theme"
							onClick={toggleDarkTheme}
						>
							{!shouldUseDarkTheme && <LightFilled16 />}
							{shouldUseDarkTheme && <AsleepFilled16 />}
						</button>
					</li>
				</ul>
			</LayoutContainer>
		</header>
	);
}

export default AppHeader;
