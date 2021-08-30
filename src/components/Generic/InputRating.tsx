import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useState } from "react";
import GenericFormErrorMessage from "./FormErrorMessage";
import GenericRating, { RatingIconSize } from "./Rating";

/** @interface */
interface GenericInputRatingProps {
	value: number;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onInvalid?: FormEventHandler<HTMLInputElement>;
	required?: boolean;
	iconSize?: RatingIconSize
}

function GenericInputRating(props: GenericInputRatingProps) {
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
			<div className="relative w-min h-10 flex items-center justify-center">
				<GenericRating score={props.value} iconSize={props.iconSize}></GenericRating>
				<input
					className="absolute block z-10 top-0 h-full w-full opacity-0"
					type="range"
					value={props.value}
					required={props.required}
					onChange={onChange}
					onInvalid={onInvalid}
					step="1"
					min="1"
					max="5" />
			</div>
			{!!errorMessage && <GenericFormErrorMessage>{errorMessage}</GenericFormErrorMessage>}
		</>
	)
}

export default GenericInputRating;