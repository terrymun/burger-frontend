import { DropPhoto32 } from '@carbon/icons-react';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { pluralize } from '../../framework/string';
import GenericFileUploadEntry from './FileUploadEntry';

/** @interface */
interface GenericInputFileProps {
	onChange?: (payload: File[]) => void;
	accept?: string;
	multiple?: boolean;
}

/** @method */
function GenericInputFile(props: GenericInputFileProps) {
	const [files, setFiles] = useState<File[]>([]);
	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (!e.target.files || !e.target.files[0]) return;

		if (props.multiple) {
			setFiles((currentFiles) => [
				...currentFiles,
				...Array.from(e.target.files!),
			]);
		} else {
			setFiles(() => [e.target.files![0]]);
		}
	};

	const [imagesDom, setImagesDom] = useState<ReactNode>();

	useEffect(() => {
		const removeFile = (i: number) => {
			const filesWithRemovedFile = [...files];
			filesWithRemovedFile.splice(i, 1);
			setFiles(filesWithRemovedFile);
		};

		const dom = Array.from(files).map((file, i) => {
			return (
				<li key={i} className="block mb-2">
					<GenericFileUploadEntry
						file={file}
						onCancel={() => removeFile(i)}
					/>
				</li>
			);
		});

		setImagesDom(dom);
		props.onChange && props.onChange(files);
	}, [files, props]);

	return (
		<div>
			{(props.multiple || (!props.multiple && files.length === 0)) && (
				<div
					className="
					relative rounded-md px-4 py-2 bg-opacity-40 border-0 outline-none w-full h-64 transition-all
					flex flex-col items-center justify-center gap-y-3 mb-3
					bg-gray-300 focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-opacity-60
					dark:bg-gray-500 dark:focus-within:ring-gray-300
				"
				>
					<DropPhoto32 className="w-10 h-10" />
					Drop or select{' '}
					{pluralize(
						props.multiple ? 2 : 1,
						'an image',
						'image(s)'
					)}{' '}
					to upload
					<input
						className="absolute top-0 left-0 opacity-0 w-full h-full"
						type="file"
						accept={props.accept ?? ''}
						multiple={props.multiple}
						onChange={onChange}
					/>
				</div>
			)}
			{!!imagesDom && (
				<ul
					className={`grid grid-cols-1${
						props.multiple || 'md:grid-cols-2 gap-3'
					}`}
				>
					{imagesDom}
				</ul>
			)}
		</div>
	);
}

export default GenericInputFile;
