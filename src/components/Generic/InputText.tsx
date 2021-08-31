import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

// Interface imports
import { TextLikeInputComponent } from '../../interfaces/component';

// Helper imports
import { getBaseInputClasses } from '../../helper/input';

// Component imports
import GenericFormErrorMessage from './FormErrorMessage';

/** @interface */
interface GenericInputTextProps
	extends TextLikeInputComponent<HTMLInputElement> {
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
	};

	const classNames = useMemo(() => {
		return getBaseInputClasses(!!errorMessage, ['resize-y']);
	}, [errorMessage]);

	return (
		<>
			<input
				className={classNames.join(' ')}
				type={props.type ?? 'text'}
				value={props.value}
				autoComplete={props.autocomplete ?? 'off'}
				spellCheck={props.spellcheck}
				placeholder={props.placeholder}
				required={props.required}
				autoFocus={props.autofocus}
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

export default GenericInputText;
