import { clamp } from '../../framework/math';

/** @interface */
interface GenericProgressProp {
	value: number;
}

/** @method */
function GenericProgress(props: GenericProgressProp) {
	return <progress value={clamp(props.value, 0, 1)}></progress>;
}

export default GenericProgress;
