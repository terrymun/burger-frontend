import { ClassNameInheritableComponent, SlottableComponent } from "../../interfaces/component";

/** @interface */
interface LayoutContainerProps extends Partial<SlottableComponent>, Partial<ClassNameInheritableComponent> {
	tag?: string;
}

/**
 * Returns a sensible maximum container size for non-bleeding content
 * See this as a Bootstrap equivalent of the `.container` class
 * @method
 */
function LayoutContainer(props: LayoutContainerProps) {
	const TagName = (props.tag ?? 'div') as keyof JSX.IntrinsicElements;
	const defaultClassNames = 'px-6 md:max-w-3xl md:px-16 lg:max-w-6xl md:mx-auto';
	const classNames = [...(props.className ?? '').split(' '), ...defaultClassNames.split(' ')].join(' ');

	return (
		<TagName className={classNames}>
			{props.children}
		</TagName>
	)
}

export default LayoutContainer;