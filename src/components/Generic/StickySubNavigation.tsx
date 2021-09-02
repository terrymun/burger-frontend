import { useEffect, useState } from 'react';
import { SlottableComponent } from '../../interfaces/component';
import LayoutContainer from '../Layout/Container';

/** @interface */
interface GenericStickySubNavigationProps extends SlottableComponent {}

/** @method */
function GenericStickySubNavigation(props: GenericStickySubNavigationProps) {
	const [spacingTop, setSpacingTop] = useState<number>(0);

	useEffect(() => {
		setSpacingTop(
			(document.querySelector('#root > main > header') as HTMLElement)!
				.offsetHeight
		);
		document.documentElement.style.setProperty(
			'--scroll-padding-top',
			'128px'
		);
	}, []);

	return (
		<nav
			className="sticky top-0 block lg:hidden bg-opacity-90 z-10"
			style={{
				paddingTop: spacingTop,
				marginTop: -spacingTop,
			}}
		>
			<div
				className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-50 transition-colors"
				style={{
					boxShadow: 'inset 0 -2px 0px rgba(156,156,156,0.2)',
				}}
			>
				<LayoutContainer>{props.children}</LayoutContainer>
			</div>
		</nav>
	);
}

export default GenericStickySubNavigation;
