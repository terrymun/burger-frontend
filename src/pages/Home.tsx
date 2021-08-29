import GenericHeading from '../components/GenericHeading/GenericHeading';

/** @method */
function Home() {
	return (
		<article>
			<header className="text-center h-screen flex flex-col justify-center relative px-6">
				<div className="absolute inset-0 opacity-10">
					<img className="w-full h-full object-cover" srcSet="
							/images/peter-dawn-sxZ_Ca6MkWM-unsplash--640.jpeg 640w,
							/images/peter-dawn-sxZ_Ca6MkWM-unsplash--1920.jpeg 1920w"
						sizes="(max-width: 640px) 640px,
										1920px"
						src="/images/peter-dawn-sxZ_Ca6MkWM-unsplash--640.jpeg"
						alt="The definitive guide to burgers" />
				</div>
				<div className="relative">
					<GenericHeading level={1}>Burger Frontend</GenericHeading>
					<p>The <strong className="text-gradient">definitive guide</strong> to amazing burgers no matter where you are.</p>
				</div>
			</header>
		</article>
	);
}

export default Home;
