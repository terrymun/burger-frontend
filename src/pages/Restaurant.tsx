import { useHistory, useParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';

// API imports
import { RestaurantDatum } from '../interfaces/api';
import { getRestaurant } from '../api/restaurants';

// Framework imports
import { getDayOfWeekFromNumber } from '../framework/datetime';

// Component imports
import {
	AsleepFilled16,
	CheckmarkOutline32,
	FingerprintRecognition20,
	Location20,
	LocationStar24,
	Phone20,
	ProgressBarRound32,
	View20,
	StarReview20,
	Taste20,
	Time20,
} from '@carbon/icons-react';
import LayoutContainer from '../components/Layout/Container';
import GenericHeading from '../components/Generic/Heading';
import GenericTextarea from '../components/Generic/Textarea';
import GenericInputText from '../components/Generic/InputText';
import GenericFormControlGroup from '../components/Generic/FormControl';
import GenericButton, { ButtonRole } from '../components/Generic/Button';
import GenericFormFieldset from '../components/Generic/FormFieldset';
import GenericInputRating from '../components/Generic/InputRating';
import GenericRating, { RatingIconSize } from '../components/Generic/Rating';
import GenericInputFile from '../components/Generic/InputFile';
import { sleep } from '../framework/generic';
import { Link } from 'react-router-dom';
import {
	getHumanReadableHoursAndMinutesFromTimestamp,
	pluralize,
} from '../framework/string';
import { isRestaurantOpen } from '../helper/restaurant';
import GenericBadge, {
	BadgeSize,
	BadgeType,
} from '../components/Generic/Badge';
import GenericFormErrorMessage from '../components/Generic/FormErrorMessage';

/** @enum */
enum ReviewPostingState {
	NONE,
	IN_PROGRESS,
	DONE,
	ALREADY_DONE,
}

/** @method */
function Restaurant() {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();

	const [restaurant, setRestaurant] = useState<RestaurantDatum | null>(null);
	const [isFetching, setIsFetching] = useState<boolean>(true);
	useEffect(() => {
		setRestaurant(null);
		setIsFetching(true);

		getRestaurant(id).then(
			(data) => {
				setRestaurant(data);
				setIsFetching(false);
			},
			() => history.push('/404')
		);
	}, [id, history]);

	const openingHours = restaurant?.businessHours.map(
		({ dayRange, timeRange }, i) => {
			return (
				<li key={i} className="flex justify-between">
					<span>
						{getDayOfWeekFromNumber(dayRange[0])}
						{!!dayRange[1] && (
							<>&ndash;{getDayOfWeekFromNumber(dayRange[1])}</>
						)}
					</span>

					<span className="text-gray-500">
						{getHumanReadableHoursAndMinutesFromTimestamp(
							timeRange[0]
						)}
						&ndash;
						{getHumanReadableHoursAndMinutesFromTimestamp(
							timeRange[1]
						)}
					</span>
				</li>
			);
		}
	);

	const formElement = useRef<HTMLFormElement>(null);
	const [reviewTitle, setReviewTitle] = useState<string>('');
	const [reviewBody, setReviewBody] = useState<string>('');
	const [tasteRating, setTasteRating] = useState<number>(0);
	const [textureRating, setTextureRating] = useState<number>(0);
	const [presentationRating, setPresentationRating] = useState<number>(0);
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [isReviewValid, setIsReviewValid] = useState<boolean>(true);

	const [reviewPostingState, setReviewPostingState] =
		useState<ReviewPostingState>(ReviewPostingState.NONE);
	const submitReview = async (): Promise<void> => {
		const isFormValid = formElement.current?.checkValidity() ?? false;
		const _isReviewValid =
			isFormValid &&
			tasteRating > 0 &&
			textureRating > 0 &&
			presentationRating > 0;
		setIsReviewValid(_isReviewValid);
		if (!_isReviewValid) return;

		// NOTE: A form data object can be constructed from this and dispatched to our endpoint
		console.info({
			reviewTitle,
			reviewBody,
			tasteRating,
			textureRating,
			presentationRating,
			imageFiles,
		});

		// NOTE: Simulates the submission of review
		setReviewPostingState(ReviewPostingState.IN_PROGRESS);
		await sleep(1500);
		setReviewPostingState(ReviewPostingState.DONE);
		await sleep(1500);
		setReviewPostingState(ReviewPostingState.ALREADY_DONE);
	};

	return (
		<article>
			<header>
				{isFetching ? (
					<div className="h-80 relative flex flex-col items-center justify-center text-gray-800 dark:text-gray-100 transition-colors">
						<div className="w-full h-full absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse transition-colors"></div>
						<ProgressBarRound32 className="w-12 h-12 animate-spin relative" />
						<p className="relative">
							Loading restaurant data&hellip;
						</p>
					</div>
				) : (
					<div className="h-80 relative bg-gray-100 dark:bg-gray-800 transition-colors">
						{!!restaurant && (
							<>
								<img
									className="absolute w-full h-full object-cover opacity-25"
									src={restaurant.image}
									alt={restaurant.name}
									title={restaurant.name}
								/>
								<LayoutContainer
									className="h-full relative flex flex-col items-center justify-center text-gray-800 dark:text-gray-100 transition-colors"
									tag="section"
								>
									<GenericHeading level={1}>
										{restaurant.name}
									</GenericHeading>
									<p className="mt-0">
										{restaurant.description}
									</p>
								</LayoutContainer>
							</>
						)}
					</div>
				)}
			</header>
			{isFetching && (
				<>
					<LayoutContainer tag="section" className="py-12">
						<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
							<div className="rounded-md h-64 animate-pulse bg-gray-200 dark:bg-gray-600 transition-colors"></div>
							<div className="hidden lg:block rounded-md col-span-2 h-64 animate-pulse bg-gray-200 dark:bg-gray-600 transition-colors"></div>
						</div>
					</LayoutContainer>
				</>
			)}
			{!!restaurant && (
				<>
					<LayoutContainer tag="section" className="py-12">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
							<aside>
								<GenericHeading level={2}>About</GenericHeading>

								{/* Reviews */}
								<div
									className="grid grid-cols-2 gap-y-4 gap-x-4"
									style={{ gridTemplateColumns: 'auto 1fr' }}
								>
									<div className="flex gap-2 items-center self-start">
										<StarReview20 />
										<span>Accolades</span>
									</div>
									<div className="flex justify-between items-center">
										<GenericRating
											score={
												restaurant.averageRatingScore
											}
										/>
										<span className="text-gray-500 text-sm">
											{restaurant.ratingCount}{' '}
											{pluralize(
												restaurant.ratingCount,
												'review'
											)}
										</span>
									</div>

									{/* Opening hours */}
									<div className="flex gap-2 items-center self-start">
										<Time20 />
										<span>Hours</span>
									</div>
									<div>
										{!isRestaurantOpen(
											restaurant.businessHours
										) && (
											<GenericBadge
												size={BadgeSize.SMALL}
												type={BadgeType.SLEEP}
												className="mb-2 inline-flex gap-x-1 items-center"
											>
												<AsleepFilled16 />
												Closed
											</GenericBadge>
										)}
										<ul>{openingHours}</ul>
									</div>

									{/* Address */}
									<div className="flex gap-2 items-center self-start">
										<Location20 />
										<span>Address</span>
									</div>
									<a
										className="underline"
										target="_blank"
										rel="noreferrer"
										href={`https://www.google.com/maps/place/${encodeURIComponent(
											restaurant.address
										)}/`}
									>
										{restaurant.address}
									</a>

									{/* Phone */}
									<div className="flex gap-2 items-center self-start">
										<Phone20 />
										<span>Phone</span>
									</div>
									<a
										className="underline"
										href={`tel:${restaurant.phone}/`}
									>
										{restaurant.phone}
									</a>
								</div>
							</aside>

							{reviewPostingState ===
								ReviewPostingState.ALREADY_DONE && (
								<div className="lg:col-span-2">
									<GenericHeading level={2}>
										Thanks for sharing!
									</GenericHeading>
									<p>
										Your review will be available shortly.
										While you wait, do you want to check out
										other burger joints in town?
									</p>
									<Link
										className="
										inline-flex items-center gap-1 rounded-md px-4 py-2 border-0 focus:outline-none focus:ring-2
										bg-yellow-500 text-white focus:ring-yellow-500 focus:ring-opacity-25
										"
										to="/discover"
									>
										<LocationStar24 />
										Yes please!
									</Link>
								</div>
							)}
							{reviewPostingState !==
								ReviewPostingState.ALREADY_DONE && (
								<form
									className="lg:col-span-2 relative"
									ref={formElement}
									onSubmit={submitReview}
								>
									{reviewPostingState ===
										ReviewPostingState.IN_PROGRESS && (
										<div className="absolute inset-0 flex flex-col items-center justify-center gap-y-3">
											<ProgressBarRound32 className="w-12 h-12 animate-spin" />
											Posting review, please wait&hellip;
										</div>
									)}
									{reviewPostingState ===
										ReviewPostingState.DONE && (
										<div className="absolute inset-0 flex flex-col items-center justify-center gap-y-3 text-green-500">
											<CheckmarkOutline32 className="w-12 h-12" />
											Review successfully posted!
										</div>
									)}
									<GenericHeading level={2}>
										Share the experience
									</GenericHeading>
									<div
										className={
											(reviewPostingState !==
											ReviewPostingState.NONE
												? 'opacity-30 pointer-events-none filter blur-sm'
												: 'opacity-100') +
											' transition-all'
										}
									>
										<GenericFormFieldset legend="Overview">
											<GenericFormControlGroup label="Title">
												<GenericInputText
													value={reviewTitle}
													onChange={(e) =>
														setReviewTitle(
															e.target.value
														)
													}
													placeholder="An optional but attention-grabbing title"
													required={true}
												/>
											</GenericFormControlGroup>
											<GenericFormControlGroup label="Experience">
												<GenericTextarea
													value={reviewBody}
													onChange={(e) =>
														setReviewBody(
															e.target.value
														)
													}
													placeholder="Share your experience"
													required={true}
												/>
											</GenericFormControlGroup>
										</GenericFormFieldset>

										<GenericFormFieldset legend="The Burger">
											<div className="block lg:flex lg:justify-between">
												<label className="flex lg:flex-col">
													<div className="py-2 cursor-pointer flex-grow lg:order-2 flex gap-1 items-center justify-start lg:justify-center mr-3 lg:mr-0">
														<Taste20 />
														Taste
													</div>
													<GenericInputRating
														iconSize={
															RatingIconSize.LARGE
														}
														value={tasteRating}
														onChange={(e) =>
															setTasteRating(
																+e.target.value
															)
														}
														required={true}
													/>
												</label>
												<label className="flex lg:flex-col">
													<div className="py-2 cursor-pointer flex-grow lg:order-2 flex gap-1 items-center justify-start lg:justify-center mr-3 lg:mr-0">
														<FingerprintRecognition20 />
														Texture
													</div>
													<GenericInputRating
														iconSize={
															RatingIconSize.LARGE
														}
														value={textureRating}
														onChange={(e) =>
															setTextureRating(
																+e.target.value
															)
														}
														required={true}
													/>
												</label>
												<label className="flex lg:flex-col">
													<div className="py-2 cursor-pointer flex-grow lg:order-2 flex gap-1 items-center justify-start lg:justify-center mr-3 lg:mr-0">
														<View20 />
														Presentation
													</div>
													<GenericInputRating
														iconSize={
															RatingIconSize.LARGE
														}
														value={
															presentationRating
														}
														onChange={(e) =>
															setPresentationRating(
																+e.target.value
															)
														}
														required={true}
													/>
												</label>
											</div>
											{!isReviewValid &&
												(!tasteRating ||
													!textureRating ||
													!presentationRating) && (
													<div className="flex justify-center">
														<GenericFormErrorMessage>
															Please select a
															rating for all
															categories
														</GenericFormErrorMessage>
													</div>
												)}
											<div className="mt-6">
												<GenericFormControlGroup label="Photo(s)">
													<GenericInputFile
														accept="image/*"
														onChange={(e) =>
															setImageFiles(e)
														}
													/>
												</GenericFormControlGroup>
											</div>
										</GenericFormFieldset>
										<div className="mt-3">
											<GenericButton
												role={ButtonRole.PRIMARY}
												type="button"
												onClick={submitReview}
											>
												Submit
											</GenericButton>
										</div>
									</div>
								</form>
							)}
						</div>
					</LayoutContainer>
				</>
			)}
		</article>
	);
}

export default Restaurant;
