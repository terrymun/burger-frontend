import { Close24, DropPhoto32 } from "@carbon/icons-react";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";

/** @interface */
interface GenericInputFileProps {
	onChange?: (payload: File[]) => void;
	accept?: string;
}

/** @method */
function GenericInputFile(props: GenericInputFileProps) {
	const [files, setFiles] = useState<File[]>([]);
	const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
		if (e.target.files && e.target.files[0]) setFiles(currentFiles => [...currentFiles, e.target.files![0]]);
	}

	const [imagesDom, setImagesDom] = useState<ReactNode>();	

	useEffect(() => {
		const removeFile = (i: number) => {
			const filesWithRemovedFile = [...files];
			filesWithRemovedFile.splice(i, 1);
			setFiles(filesWithRemovedFile);
		}

		const dom = Array.from(files).map((file, i) => {
			const src = URL.createObjectURL(file);
			return (
				<li key={i} className="
					flex gap-x-3 h-16 items-center overflow-hidden rounded-md hover:shadow-md bg-opacity-40 transition-all
					bg-gray-300	dark:bg-gray-500
				">
					<img src={src} alt={file.name} title={file.name} className="block h-full w-auto" />
					<div className="font-monospace text-xs flex-grow">
						{file.name}
					</div>
					<button
						type="button"
						onClick={() => removeFile(i)}
						title={`Delete image ${file.name}`}
						className="w-16 h-16 flex items-center justify-center hover:text-red-500 dark:hover:text-red-300 transition-colors">
						<Close24 />
					</button>
				</li>
			);
		});

		setImagesDom(dom);
		props.onChange && props.onChange(files);
	}, [files, props]);

	return (
		<div>
			<div className="
				relative rounded-md px-4 py-2 bg-opacity-40 border-0 outline-none w-full h-64 transition-all
				flex flex-col items-center justify-center gap-y-3 mb-3
				bg-gray-300 focus-within:ring-2 focus-within:ring-gray-700 focus-within:ring-opacity-60
				dark:bg-gray-500 dark:focus-within:ring-gray-300
			">
				<DropPhoto32 className="w-10 h-10" />
				Drop or select image to upload
				<input className="absolute top-0 left-0 opacity-0 w-full h-full" type="file" accept={props.accept ?? ''} onChange={onChange} />
			</div>
			{!!imagesDom && (
				<ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{imagesDom}
				</ul>
			)}
		</div>
	)
}

export default GenericInputFile;