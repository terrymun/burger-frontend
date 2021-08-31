// Interfacre imports
import { MouseEventHandler } from 'react';
import { SlottableComponent } from '../../interfaces/component';

/** @enum */
export enum ButtonRole {
	PRIMARY,
	SECONDARY,
}

/** @interface */
interface GenericButtonProps extends SlottableComponent {
	type?: 'button' | 'submit';
	role?: ButtonRole;
	disabled?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

/** @method */
function GenericButton(props: GenericButtonProps) {
	const type = props.type ?? 'button';
	const role = props.role ?? ButtonRole.SECONDARY;

	const buttonColorClassNames =
		'flex items-center gap-2 rounded-md px-4 py-2 border-0 focus:outline-none focus:ring-2 disabled:opacity-50 select-none'.split(
			' '
		);
	switch (role) {
		case ButtonRole.PRIMARY:
			buttonColorClassNames.push(
				'bg-yellow-500',
				'text-white',
				'focus:ring-yellow-500',
				'focus:ring-opacity-25'
			);
			break;

		case ButtonRole.SECONDARY:
		default:
			buttonColorClassNames.push('bg-gray-500', 'text-white');
			break;
	}

	return (
		<button
			type={type}
			className={buttonColorClassNames.join(' ')}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
}

export default GenericButton;
