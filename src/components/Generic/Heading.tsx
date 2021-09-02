// Framework imports
import { clamp } from '../../framework/math';

// Interface imports
import {
	ClassNameInheritableComponent,
	SlottableComponent,
} from '../../interfaces/component';

/** @interface */
interface GenericHeadingProps
	extends SlottableComponent,
		Partial<ClassNameInheritableComponent> {
	level: 1 | 2 | 3 | 4 | 5 | 6;
	id?: string;
}

/** @constant */
const textSizeClassName = {
	'1': 'text-5xl md:text-7xl',
	'2': 'text-3xl md:text-4xl',
	'3': 'text-2xl md:text-3xl',
	'4': 'text-xl md:text-2xl',
	'5': 'text-lg md:text-xl',
	'6': 'text-lg md:text-lg',
};

/** @method */
function GenericHeading(props: GenericHeadingProps) {
	const { level } = props;
	const HeadingTag = `h${clamp(level, 1, 6)}` as keyof JSX.IntrinsicElements;
	const classNames = [
		...(props.className ?? '').split(' '),
		'font-bold',
		'leading-tight',
		'md:leading-tight',
		'mb-3',
		textSizeClassName[level],
	].join(' ');

	return (
		<HeadingTag className={classNames} id={props.id}>
			{props.children}
		</HeadingTag>
	);
}

export default GenericHeading;
