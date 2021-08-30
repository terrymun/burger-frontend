import { ChangeEvent, FormEvent, useState } from "react";

// Interface imports
import { TextLikeInputComponent } from "../../interfaces/component";

// Component imports
import GenericFormErrorMessage from "./FormErrorMessage";

/** @interface */
interface GenericInputTextProps extends TextLikeInputComponent<HTMLInputElement> {
	type?: 'text' | 'password' | 'search';
}

/** @method */
function GenericInputText(props: GenericInputTextProps) {
	const [errorMessage, setErrorMessage] = useState<string>('');

	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setErrorMessage('');
		props.onChange && props.onChange(e);
	};
	const onInvalid = (e: FormEvent<HTMLInputElement>): void => {
		setErrorMessage((e.target as HTMLInputElement).validationMessage);
		props.onInvalid && props.onInvalid(e);
	}
	
	return (
		<>
			<input
				className="
				block rounded-md px-4 py-2 bg-opacity-40 border-0 outline-none w-full transition-all
				bg-gray-300 focus:ring-2 focus:ring-gray-700 focus:ring-opacity-60
				dark:bg-gray-500 dark:focus:ring-gray-300
				invalid:ring-red-500 invalid:bg-red-100 invalid:text-red-500
				dark:invalid:ring-red-200 dark:invalid:bg-red-300 dark:invalid:text-red-700"
				type={props.type ?? 'text'}
				value={props.value}
				autoComplete={props.autocomplete ?? 'off'}
				spellCheck={props.spellcheck}
				placeholder={props.placeholder}
				required={props.required}
				onChange={onChange}
				onInvalid={onInvalid} />
			{!!errorMessage && <GenericFormErrorMessage>{errorMessage}</GenericFormErrorMessage>}
		</>
	);
}

export default GenericInputText;