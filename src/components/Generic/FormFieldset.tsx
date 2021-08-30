import { ReactNode } from 'react';

/** @interfae */
interface GenericFormFieldsetProps {
	legend?: ReactNode;
	children?: ReactNode;
}

/** @method */
function GenericFormFieldset(props: GenericFormFieldsetProps) {
	return (
		<fieldset>
			{!!props.legend && (
				<legend className="legend font-bold uppercase flex w-full items-center justify-center mb-3 gap-3 text-gray-500">
					<div className="h-0.5 bg-gray-500 bg-opacity-25 w-full flex-1"></div>
					{props.legend}
					<div className="h-0.5 bg-gray-500 bg-opacity-25 w-full flex-1"></div>
				</legend>
			)}
			{props.children}
		</fieldset>
	);
}

export default GenericFormFieldset;
