import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

// Component imports
import {
	CheckmarkOutline32,
	InformationFilled16,
	ProgressBarRound32,
} from '@carbon/icons-react';
import AppReviewCard, { GroupedBy } from '../components/App/ReviewCard';
import GenericButton, { ButtonRole } from '../components/Generic/Button';
import GenericFormControlGroup from '../components/Generic/FormControl';
import GenericFormErrorMessage from '../components/Generic/FormErrorMessage';
import GenericFormFieldset from '../components/Generic/FormFieldset';
import GenericHeading from '../components/Generic/Heading';
import GenericInputFile from '../components/Generic/InputFile';
import GenericInputText from '../components/Generic/InputText';
import LayoutContainer from '../components/Layout/Container';

// NOTE: User data should be populated by JWT and some kind of global state management system (e.g. Redux)
import { getUserData } from '../api/user';
import { userPersonalData } from '../constants/user';
import { sleep } from '../framework/generic';
import { RestaurantReview } from '../interfaces/api';
import GenericStickySubNavigation from '../components/Generic/StickySubNavigation';
import GenericHashLink from '../components/Generic/HashLink';

/** @enum */
enum UserDataPostingState {
	NONE,
	IN_PROGRESS,
	DONE,
	ALREADY_DONE,
}

/** @method */
function Discover() {
	const [hasFetchedUserData, setHasFetchedUserData] =
		useState<boolean>(false);
	const [firstName, setFirstName] = useState<string>(
		userPersonalData.firstName
	);
	const [lastName, setLastName] = useState<string>(userPersonalData.lastName);
	const [currentPassword, setCurrentPassword] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repeatPassword, setRepeatPassword] = useState<string>('');
	const formElement = useRef<HTMLFormElement>(null);
	const [imageFiles, setImageFiles] = useState<File[]>([]);
	const [isFormValid, setIsFormValid] = useState<boolean>(true);

	const [reviews, setReviews] = useState<RestaurantReview[]>([]);

	useEffect(() => {
		getUserData().then((data) => {
			setReviews(data.reviews);

			setHasFetchedUserData(true);
		});
	}, []);

	const reviewsDom = useMemo(() => {
		return reviews.map((review, i) => {
			return (
				<li key={i} className="mb-8">
					<AppReviewCard
						review={review}
						groupedBy={GroupedBy.AUTHOR}
					/>
				</li>
			);
		});
	}, [reviews]);

	const passwordsMatch = useMemo(() => {
		return password === repeatPassword;
	}, [password, repeatPassword]);

	const passwordsAreEmpty = useMemo(() => {
		return password === '' && repeatPassword === '';
	}, [password, repeatPassword]);

	const isPasswordValid = useMemo(() => {
		return currentPassword
			? !passwordsAreEmpty && passwordsMatch
			: passwordsAreEmpty && passwordsMatch;
	}, [currentPassword, passwordsAreEmpty, passwordsMatch]);

	const [userDataPostingState, setUserDataPostingState] =
		useState<UserDataPostingState>(UserDataPostingState.NONE);
	const updateUser = async (e: FormEvent | MouseEvent) => {
		e.preventDefault();

		if (!formElement.current) return;

		const _isFormValid =
			formElement.current.checkValidity() && isPasswordValid;
		setIsFormValid(_isFormValid);
		if (!_isFormValid) {
			return;
		}

		console.info({
			firstName,
			lastName,
			imageFiles,
			currentPassword,
			password,
			repeatPassword,
		});

		// NOTE: Simulates the submission of review
		setUserDataPostingState(UserDataPostingState.IN_PROGRESS);
		await sleep(1500);
		setUserDataPostingState(UserDataPostingState.DONE);
		await sleep(1500);
		setUserDataPostingState(UserDataPostingState.ALREADY_DONE);
	};

	return (
		<>
			<GenericStickySubNavigation>
				<ul className="flex">
					<li className="flex-grow text-center">
						<GenericHashLink href="#you">You</GenericHashLink>
					</li>
					<li className="flex-grow text-center">
						<GenericHashLink href="#reviews">
							Reviews
						</GenericHashLink>
					</li>
				</ul>
			</GenericStickySubNavigation>
			<LayoutContainer tag="article" className="py-6">
				<GenericHeading level={1}>
					Hello, <span className="text-gradient">{firstName}</span>!
				</GenericHeading>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-y-16 md:gap-x-16">
					{!hasFetchedUserData && (
						<>
							<div className="rounded-md md:col-span-3 h-80 animate-pulse bg-gray-400 transition-colors"></div>
							<div className="hidden md:block md:col-span-2 rounded-md h-80 animate-pulse bg-gray-400 transition-colors"></div>
						</>
					)}
					{hasFetchedUserData && (
						<>
							<form
								ref={formElement}
								onSubmit={updateUser}
								className="relative md:col-span-3"
							>
								<GenericHeading level={2} id="you">
									Your data
								</GenericHeading>
								{userDataPostingState ===
									UserDataPostingState.IN_PROGRESS && (
									<div className="absolute inset-0 flex flex-col items-center justify-center gap-y-3">
										<ProgressBarRound32 className="w-12 h-12 animate-spin" />
										Updating user data, please wait&hellip;
									</div>
								)}
								{userDataPostingState ===
									UserDataPostingState.DONE && (
									<div className="absolute inset-0 flex flex-col items-center justify-center gap-y-3 text-green-500">
										<CheckmarkOutline32 className="w-12 h-12" />
										User data successfully updated!
									</div>
								)}
								<div
									className={
										(userDataPostingState !==
											UserDataPostingState.NONE &&
										userDataPostingState !==
											UserDataPostingState.ALREADY_DONE
											? 'opacity-30 pointer-events-none filter blur-sm'
											: 'opacity-100') + ' transition-all'
									}
								>
									<GenericFormFieldset legend="Profile">
										<GenericFormControlGroup label="First name">
											<GenericInputText
												value={firstName}
												onChange={(e) =>
													setFirstName(e.target.value)
												}
												required
											></GenericInputText>
										</GenericFormControlGroup>
										<GenericFormControlGroup label="Last name">
											<GenericInputText
												value={lastName}
												onChange={(e) =>
													setLastName(e.target.value)
												}
											></GenericInputText>
										</GenericFormControlGroup>
										<GenericFormControlGroup label="Profile photo">
											<GenericInputFile
												accept="image/*"
												onChange={(e) =>
													setImageFiles(e)
												}
											/>
										</GenericFormControlGroup>
									</GenericFormFieldset>

									<GenericFormFieldset legend="Security">
										<div className="flex gap-x-1 items-center text-sm mb-4 text-blue-500">
											<InformationFilled16 />
											Leave fields empty if you do not
											want to change your password
										</div>
										<GenericFormControlGroup label="Current password">
											<GenericInputText
												type="password"
												placeholder="Current password"
												autocomplete="current-password"
												value={currentPassword}
												isInvalid={
													!isFormValid &&
													(!passwordsMatch ||
														(!currentPassword &&
															passwordsMatch))
												}
												onChange={(e) =>
													setCurrentPassword(
														e.target.value
													)
												}
											></GenericInputText>
										</GenericFormControlGroup>
										<GenericFormControlGroup label="New password">
											<GenericInputText
												type="password"
												placeholder="New password"
												autocomplete="new-password"
												value={password}
												isInvalid={
													!isFormValid &&
													(!passwordsMatch ||
														(!!currentPassword &&
															!password))
												}
												onChange={(e) =>
													setPassword(e.target.value)
												}
											></GenericInputText>
										</GenericFormControlGroup>
										<GenericFormControlGroup label="Confirm new password">
											<GenericInputText
												type="password"
												placeholder="Confirm new password"
												autocomplete="new-password"
												value={repeatPassword}
												isInvalid={
													!isFormValid &&
													(!passwordsMatch ||
														(!!currentPassword &&
															!repeatPassword))
												}
												onChange={(e) =>
													setRepeatPassword(
														e.target.value
													)
												}
											></GenericInputText>
											{!isFormValid && !isPasswordValid && (
												<div className="mb-4">
													{passwordsAreEmpty ? (
														<GenericFormErrorMessage>
															New passwords are
															empty
														</GenericFormErrorMessage>
													) : (
														''
													)}
													{!passwordsMatch ? (
														<GenericFormErrorMessage>
															New passwords do not
															match
														</GenericFormErrorMessage>
													) : (
														''
													)}
													{!passwordsMatch ||
													(!currentPassword &&
														passwordsMatch) ? (
														<GenericFormErrorMessage>
															Current password is
															not provided
														</GenericFormErrorMessage>
													) : (
														''
													)}
												</div>
											)}
										</GenericFormControlGroup>
									</GenericFormFieldset>

									<GenericFormControlGroup>
										<GenericButton
											role={ButtonRole.PRIMARY}
											onClick={updateUser}
										>
											Submit
										</GenericButton>
									</GenericFormControlGroup>
								</div>
							</form>

							<div className="md:col-span-2">
								<GenericHeading level={2} id="reviews">
									Recent reviews
								</GenericHeading>
								<ul>{reviewsDom}</ul>
							</div>
						</>
					)}
				</div>
			</LayoutContainer>
		</>
	);
}

export default Discover;
