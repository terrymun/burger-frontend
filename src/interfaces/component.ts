import { ReactNode } from "react";

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
