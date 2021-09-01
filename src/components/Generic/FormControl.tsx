import { ReactNode, useCallback, useState } from 'react';

// Interface imports
import { SlottableComponent } from '../../interfaces/component';

/** @interface */
interface GenericFormControlGroupProps extends SlottableComponent {
	label?: ReactNode;
}

let i = 0;

/** @method */
function GenericFormControlGroup(props: GenericFormControlGroupProps) {
	const [id] = useState(`input-${i++}`);
	const inputWrapperElement = useCallback(
		(node) => {
			if (!node) return;

			const inputLikeElement = node.querySelector(
				'input, textarea, select'
			);
			if (!inputLikeElement) return;

			inputLikeElement.id = id;
		},
		[id]
	);

	return (
		<div className="mb-4 block lg:flex lg:gap-x-3">
			<label
				htmlFor={id}
				className="block py-2 lg:flex-grow-0 lg:w-48 lg:text-right cursor-pointer"
			>
				{props.label}
			</label>
			<div className="lg:flex-grow" ref={inputWrapperElement}>
				{props.children}
			</div>
		</div>
	);
}

export default GenericFormControlGroup;
