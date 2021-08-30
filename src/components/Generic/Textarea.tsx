import { ChangeEvent, FormEvent, useState } from 'react';

// Interface imports
import { TextLikeInputComponent } from '../../interfaces/component';

// Component imports
import GenericFormErrorMessage from './FormErrorMessage';

/** @interface */
interface GenericTextareaProps
	extends TextLikeInputComponent<HTMLTextAreaElement> {
	rows?: number;
}

/** @method */
function GenericTextarea(props: GenericTextareaProps) {
	const [errorMessage, setErrorMessage] = useState<string>('');

	const onChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
		setErrorMessage('');
		props.onChange && props.onChange(e);
	};
	const onInvalid = (e: FormEvent<HTMLTextAreaElement>): void => {
		setErrorMessage((e.target as HTMLTextAreaElement).validationMessage);
		props.onInvalid && props.onInvalid(e);
	};

	return (
		<>
			<textarea
				className="
					block rounded-md px-4 py-2 bg-opacity-40 border-0 outline-none w-full transition-all resize-y
					bg-gray-300 focus:ring-2 focus:ring-gray-700 focus:ring-opacity-60
					dark:bg-gray-500 dark:focus:ring-gray-300
					invalid:ring-red-500 invalid:bg-red-100 invalid:text-red-500
					dark:invalid:ring-red-200 dark:invalid:bg-red-300 dark:invalid:text-red-700"
				rows={props.rows ?? 4}
				value={props.value}
				autoComplete={props.autocomplete ?? 'off'}
				spellCheck={props.spellcheck}
				placeholder={props.placeholder}
				required={props.required}
				onChange={onChange}
				onInvalid={onInvalid}
			/>
			{!!errorMessage && (
				<GenericFormErrorMessage>
					{errorMessage}
				</GenericFormErrorMessage>
			)}
		</>
	);
}

export default GenericTextarea;
