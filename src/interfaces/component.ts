import { ChangeEventHandler, FormEventHandler, ReactNode } from 'react';

/**
 * A component with children (aka slottable)
 * @interface
 */
export interface SlottableComponent {
	children: ReactNode;
}

/**
 * A component that can inherit className attribute/prop
 * @interface
 */
export interface ClassNameInheritableComponent {
	className: string;
}

/** @interface */
export interface TextLikeInputComponent<InputElement extends Element> {
	value: string;
	onChange: ChangeEventHandler<InputElement>;
	onInvalid?: FormEventHandler<InputElement>;
	autocomplete?: string;
	spellcheck?: boolean;
	placeholder?: string;
	required?: boolean;
}
