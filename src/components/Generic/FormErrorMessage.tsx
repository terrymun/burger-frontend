// Interface imports
import { WarningFilled16 } from "@carbon/icons-react";
import { SlottableComponent } from "../../interfaces/component";

/** @interfae */
interface GenericFormErrorMessageProps extends SlottableComponent {};

/** @method */
function GenericFormErrorMessage(props: GenericFormErrorMessageProps) {
	return (
		<aside className="text-sm text-red-500 dark:text-red-400 flex gap-1 items-center mt-2">
			<WarningFilled16 />
			{props.children}
		</aside>
	);
}

export default GenericFormErrorMessage;