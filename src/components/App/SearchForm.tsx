import GenericInputText from '../Generic/InputText';
import GenericButton, { ButtonRole } from '../Generic/Button';
import { Search24 } from '@carbon/icons-react';

/** @method */
function AppSearchForm() {
	const searchButtonRole = ButtonRole.PRIMARY;
	return (
		<form>
				<div className="flex gap-1">
					<GenericInputText type="search" placeholder="Search for burgers" />
					<GenericButton role={searchButtonRole}>
						<Search24 />
					</GenericButton>
				</div>
			</form>
	);
}

export default AppSearchForm;
