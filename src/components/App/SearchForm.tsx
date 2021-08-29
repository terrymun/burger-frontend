import GenericInputText from '../Generic/InputText';
import GenericButton, { ButtonRole } from '../Generic/Button';
import { Search24 } from '@carbon/icons-react';
import { useHistory } from 'react-router';
import { FormEvent, useState } from 'react';

/** @interface */
interface AppSearchFormProps {
	query?: string;
}

/** @method */
function AppSearchForm(props: AppSearchFormProps) {
	const searchButtonRole = ButtonRole.PRIMARY;

	const [query, setQuery] = useState(props.query ?? '');

	const history = useHistory();
	const submit = (e: FormEvent) => {
		e.preventDefault();
		history.push({
			pathname: '/discover',
			search: `?q=${query}`
		});
	};

	return (
		<form onSubmit={submit}>
				<div className="flex gap-1">
					<GenericInputText type="search" placeholder="Search for burgers" value={query} onChange={e => setQuery(e.target.value)} />
					<GenericButton role={searchButtonRole} type="submit">
						<Search24 />
					</GenericButton>
				</div>
			</form>
	);
}

export default AppSearchForm;
