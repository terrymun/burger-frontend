import { CarbonIconType } from '@carbon/icons-react';

/** @interface */
interface GenericIconProps {
	name: CarbonIconType;
}

/** @method */
function GenericIcon(props: GenericIconProps) {
	const Icon = props.name;

	return <>{Icon && <Icon />}</>;
}

export default GenericIcon;
