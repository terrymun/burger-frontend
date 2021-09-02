import { sleep } from "../framework/generic";
import { UserAdvancedData } from "../interfaces/api";
import { restaurantData } from "./restaurants";

/** @method */
export async function getUserData(): Promise<UserAdvancedData> {
	await sleep(1000);

	const data = {
		reviews: [{
			author: 'Terry Mun',
			title: 'Amazing burger',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum augue purus, at posuere velit facilisis ac. In accumsan fringilla gravida. Sed vulputate dictum mauris, et iaculis erat finibus vel.',
			tasteRating: 4,
			textureRating: 5,
			presentationRating: 5,
			restaurantId: 'gourmet-burger-kitchen',
		}, {
			author: 'Terry Mun',
			title: 'Could be better',
			body: 'Fusce a fringilla velit. Donec eget dolor eros. Sed et mauris non enim rutrum venenatis. Praesent varius risus nec ipsum mollis, eu efficitur massa facilisis.',
			tasteRating: 2,
			textureRating: 5,
			presentationRating: 1,
			restaurantId: 'cafe-atrix',
		}]
	}

	// Merge in data from `restaurants.ts`
	data.reviews = data.reviews.map(review => {
		return {
			...review,
			restaurantName: restaurantData.find(restaurant => restaurant.id === review.restaurantId)!.name
		}
	}) as UserAdvancedData['reviews'];

	return data as UserAdvancedData;
}