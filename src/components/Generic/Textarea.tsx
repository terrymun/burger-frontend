import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

// Interface imports
import { TextLikeInputComponent } from '../../interfaces/component';

// Helper imports
import { getBaseInputClasses } from '../../helper/input';

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

	const classNames = useMemo(() => {
		return getBaseInputClasses(!!errorMessage, ['resize-y']);
	}, [errorMessage]);

	return (
		<>
			<textarea
				className={classNames.join(' ')}
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
