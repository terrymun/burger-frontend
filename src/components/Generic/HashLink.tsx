import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { SlottableComponent } from '../../interfaces/component';

/** @interface */
interface GenericHashLinkProps extends SlottableComponent {
	href?: string;
}

/** @method */
function GenericHashLink(props: GenericHashLinkProps) {
	const location = useLocation();
	const [isActive, setIsActive] = useState<boolean>(
		location.hash === props.href
	);

	useEffect(() => {
		setIsActive(location.hash === props.href);
	}, [location, props]);

	return (
		<a
			className={`block py-2 px-4 border-b-2 transition-colors ${
				isActive
					? 'text-yellow-600 border-yellow-600 dark:text-yellow-400 dark:border-yellow-400'
					: 'border-transparent'
			}`}
			href={props.href || '#'}
		>
			{props.children}
		</a>
	);
}

export default GenericHashLink;
