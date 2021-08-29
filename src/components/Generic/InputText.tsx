import { ChangeEventHandler } from "react";

/** @interface */
interface GenericInputTextProps {
	value: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
	type?: 'text' | 'password' | 'search';
	autocomplete?: string;
	spellcheck?: 'true' | 'false';
	placeholder?: string;
}

/** @method */
function GenericInputText(props: GenericInputTextProps) {
	const type = props.type ?? 'text';
	const autocomplete = props.autocomplete ?? 'off';
	const spellcheck = props.spellcheck ?? 'false';
	const placeholder = props.placeholder ?? '';

	return (
		<input
			className="rounded-md px-4 py-2 bg-gray-300 dark:bg-gray-500 bg-opacity-40 border-0 focus:outline-none focus:ring-2 focus:ring-gray-700 dark:focus:ring-gray-300 focus:ring-opacity-60 w-full"
			autoFocus
			type={type}
			value={props.value}
			autoComplete={autocomplete}
			spellCheck={spellcheck}
			placeholder={placeholder}
			onChange={props.onChange} />
	);
}

export default GenericInputText;