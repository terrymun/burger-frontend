import { clamp } from '../../framework/math';
import { ClassNameInheritableComponent, SlottableComponent } from '../../interfaces/component';

/** @interface */
interface GenericHeadingProps extends SlottableComponent, Partial<ClassNameInheritableComponent> {
	level: 1 | 2 | 3 | 4 | 5 | 6
}

/** @constant */
const textSizeClassName = {
	'1': 'text-5xl md:text-7xl',
	'2': 'text-4xl md:text-6xl',
	'3': 'text-3xl md:text-5xl',
	'4': 'text-2xl md:text-4xl',
	'5': 'text-xl md:text-3xl',
	'6': 'text-lg md:text-2xl'
}

/** @method */
function GenericHeading(props: GenericHeadingProps) {
	const { level } = props;
	const HeadingTag = `h${clamp(level, 1, 6)}` as keyof JSX.IntrinsicElements;
	const classNames = [...(props.className ?? '').split(' '), 'font-bold', 'leading-tight', 'md:leading-tight', 'mb-3', textSizeClassName[level]].join(' ');

	return (
		<HeadingTag className={classNames}>{props.children}</HeadingTag>
	)
}

export default GenericHeading;