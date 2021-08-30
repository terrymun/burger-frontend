/** @method */
function AppBlankRestaurantCard() {
	return (
		<article className="rounded-md overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
			<div className="animate-pulse flex flex-col h-96">
				<div className="w-full h-64 flex-grow-0 relative bg-gray-500 dark:bg-gray-300" />
				<header className="px-6 py-4 flex-grow">
					<div className="w-1/3 h-6 mb-3 bg-gray-200 dark:bg-gray-600" />
					<div className="w-full h-6 bg-gray-200 dark:bg-gray-600" />
				</header>
				<footer className="h-10 bg-gray-100 dark:bg-gray-600 dark:bg-opacity-40 flex-grow-0"></footer>
			</div>
		</article>
	);
}

export default AppBlankRestaurantCard;
