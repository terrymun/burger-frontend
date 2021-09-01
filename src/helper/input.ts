/** @method */
export function getBaseInputClasses(
	isInvalid: boolean,
	additionalClasses: string[] = []
): string[] {
	const classes = [
		'block',
		'rounded-md',
		'px-4',
		'py-2',
		'bg-opacity-40',
		'border-0',
		'outline-none',
		'w-full',
		'transition-all',
		'focus:ring-opacity-60',
		'dark:placeholder-gray-100',
		...additionalClasses,
	];

	if (isInvalid) {
		classes.push(
			'ring-red-500',
			'bg-red-100',
			'text-red-500',
			'placeholder-red-500',
			'dark:ring-red-200',
			'dark:bg-red-300',
			'dark:text-red-700',
			'dark:placeholder-red-700'
		);
	} else {
		classes.push(
			'bg-gray-300',
			'focus:ring-2',
			'focus:ring-gray-700',
			'dark:bg-gray-500',
			'dark:focus:ring-gray-300'
		);
	}

	return classes;
}
