import { useHistory, useParams } from 'react-router';
import { FormEvent, useEffect, useRef, useState } from 'react';

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
	ProgressBarRound32,
	Sight20,
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
	const [isReviewValid, setIsReviewValid] = useState<boolean>(false);
	useEffect(() => {
		const isFormValid = formElement.current?.checkValidity() ?? false;
		setIsReviewValid(
			isFormValid &&
				tasteRating > 0 &&
				textureRating > 0 &&
				presentationRating > 0
		);
	}, [
		reviewTitle,
		reviewBody,
		tasteRating,
		textureRating,
		presentationRating,
	]);

	const [reviewPostingState, setReviewPostingState] =
		useState<ReviewPostingState>(ReviewPostingState.NONE);
	const submitReview = async (e: FormEvent): Promise<void> => {
		e.preventDefault();

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
					<div className="h-96 relative flex flex-col items-center justify-center text-white">
						<div className="w-full h-full absolute inset-0 bg-gray-800 animate-pulse"></div>
						<ProgressBarRound32 className="w-12 h-12 animate-spin relative" />
						<p className="text-white relative">
							Loading restaurant data&hellip;
						</p>
					</div>
				) : (
					<div className="h-96 relative bg-gray-800">
						{!!restaurant && (
							<>
								<img
									className="absolute w-full h-full object-cover opacity-50"
									src={restaurant.image}
									alt={restaurant.name}
									title={restaurant.name}
								/>
								<div className="absolute w-full h-full flex flex-col items-center justify-center text-white">
									<GenericHeading level={1}>
										{restaurant.name}
									</GenericHeading>
									<p>{restaurant.description}</p>
								</div>
							</>
						)}
					</div>
				)}
			</header>
			{isFetching && (
				<>
					<LayoutContainer tag="section" className="py-12">
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
							<div className="rounded-md h-64 animate-pulse bg-gray-200 dark:bg-gray-600"></div>
							<div className="rounded-md col-span-2 h-64 animate-pulse bg-gray-200 dark:bg-gray-600"></div>
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
									<span>{restaurant.address}</span>
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
													placeholder="An attention-grabbing title"
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
											<div className="block lg:flex lg:justify-between mb-6">
												<label className="flex lg:flex-col">
													<div className="py-2 cursor-pointer flex-grow lg:order-2 flex gap-1 items-center justify-end lg:justify-center mr-3 lg:mr-0">
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
													<div className="py-2 cursor-pointer flex-grow lg:order-2 flex gap-1 items-center justify-end lg:justify-center mr-3 lg:mr-0">
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
													<div className="py-2 cursor-pointer flex-grow lg:order-2 flex gap-1 items-center justify-end lg:justify-center mr-3 lg:mr-0">
														<Sight20 />
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
											<GenericFormControlGroup label="Photo(s)">
												<GenericInputFile
													accept="image/*"
													onChange={(e) =>
														setImageFiles(e)
													}
												/>
											</GenericFormControlGroup>
										</GenericFormFieldset>
										<div className="mt-3">
											<GenericButton
												role={ButtonRole.PRIMARY}
												disabled={!isReviewValid}
												type="submit"
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
