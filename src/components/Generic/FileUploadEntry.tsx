import { Close24 } from '@carbon/icons-react';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { generateRandomNumber } from '../../framework/math';
import GenericProgress from './Progress';

/** @interface */
interface GenericFileUploadEntryProps {
	file: File;
	onCancel: MouseEventHandler<HTMLButtonElement>;
}

/** @method */
function GenericFileUploadEntry(props: GenericFileUploadEntryProps) {
	const src = URL.createObjectURL(props.file);
	const [uploadedRatio, setUploadedRatio] = useState<number>(0);
	const requestRef = useRef<number>();
	const previousTimeRef = useRef<number>();

	const tick: FrameRequestCallback = (time) => {
		if (previousTimeRef.current !== undefined) {
			const deltaTime = time - previousTimeRef.current;

			/*
			 * NOTE: The increment is arbitrarily determined and based on file size
			 * This mimics a non-deterministic upload progress of files
			 */
			setUploadedRatio(
				(prev) =>
					prev +
					deltaTime *
						generateRandomNumber(
							1 / props.file.size,
							500 / props.file.size
						)
			);
		}
		previousTimeRef.current = time;

		if (uploadedRatio < 1) requestRef.current = requestAnimationFrame(tick);
	};

	useEffect(() => {
		requestRef.current = window.requestAnimationFrame(tick);
		return () => window.cancelAnimationFrame(requestRef.current!);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className="
				flex gap-x-3 h-16 items-center overflow-hidden rounded-md hover:shadow-md bg-opacity-40 transition-all relative
				bg-gray-300	dark:bg-gray-500
			"
		>
			<img
				src={src}
				alt={props.file.name}
				title={props.file.name}
				className="block h-full w-16 select-none object-contain bg-checkerboard"
			/>
			<div className="font-monospace text-xs flex-grow">
				{props.file.name}
			</div>
			<button
				type="button"
				onClick={props.onCancel}
				title={`Delete image ${props.file.name}`}
				className="w-16 h-16 flex items-center justify-center hover:text-red-500 dark:hover:text-red-300 transition-colors"
			>
				<Close24 />
			</button>
			<div className="absolute bottom-0 w-full">
				<GenericProgress value={uploadedRatio}></GenericProgress>
			</div>
		</div>
	);
}

export default GenericFileUploadEntry;
