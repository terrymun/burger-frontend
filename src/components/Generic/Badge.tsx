import { ReactNode } from 'react';

/** @enum */
export enum BadgeType {
	PRIMARY,
	ASLEEP,
}

/** @enum */
export enum BadgeSize {
	SMALL,
	MEDIUM,
	LARGE,
}

/** @interface */
interface GenericBadgeProps {
	children: ReactNode;
	type?: BadgeType;
	size?: BadgeSize;
	className?: string;
}

/** @method */
function GenericBadge(props: GenericBadgeProps) {
	const classNames = (props.className ?? '').split(' ');
	classNames.push('overflow-hidden', 'font-bold');

	switch (props.size) {
		case BadgeSize.SMALL:
			classNames.push('px-3', 'py-1', 'rounded-md', 'text-sm');
			break;

		default:
			classNames.push('px-4', 'py-2', 'rounded-lg');
			break;
	}

	switch (props.type) {
		case BadgeType.PRIMARY:
			classNames.push('text-white', 'bg-yellow-500');
			break;

		case BadgeType.ASLEEP:
			classNames.push('text-white', 'bg-purple-800');
			break;

		default:
			classNames.push('text-white', 'bg-gray-500');
			break;
	}

	return <div className={classNames.join(' ')}>{props.children}</div>;
}

export default GenericBadge;
