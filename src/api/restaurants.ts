import { sleep } from "../framework/generic";
import { haystackContainsNeedle } from "../framework/string";
import { RestaurantDatum } from "../interfaces/api";

/** @constant */
const basicRestaurantsData: RestaurantDatum[] = [{
	id: 'gourmet-burger-kitchen',
	name: 'Gourmet Burger Kitchen',
	description: 'Mouth-watering burgers with an exotic touch',
	address: 'Paradisgade 10, 8000 Aarhus, Denmark',
	coordinates: [10.209614542314284,56.16040213991721],
	businessHours: [{
		dayRange: [1, 5],
		timeRange: [
			{ hour: 13, minute: 0 },
			{ hour: 20, minute: 0 }
		]
	}, {
		dayRange: [6],
		timeRange: [
			{ hour: 11, minute: 30 },
			{ hour: 23, minute: 0 }
		]
	}, {
		dayRange: [0],
		timeRange: [
			{ hour: 11, minute: 30 },
			{ hour: 21, minute: 45 }
		]
	}],
	ratingCount: 1337,
	averageRatingScore: 4.1,
	image: '/images/restaurants/gourmet-burger-kitchen--640.jpeg'
}, {
	id: 'burger-bandits',
	name: 'Burger Bandits',
	description: 'Wallet-friendly budgets served with passion',
	address: 'Gammel Munkegade 1, 8000 Aarhus, Denmark',
	coordinates: [10.204117728842334,56.15894501260095],
	businessHours: [{
		dayRange: [1, 5],
		timeRange: [
			{ hour: 9, minute: 0 },
			{ hour: 22, minute: 0 }
		]
	}, {
		dayRange: [6],
		timeRange: [
			{ hour: 10, minute: 30 },
			{ hour: 20, minute: 30 }
		]
	}, {
		dayRange: [0],
		timeRange: [
			{ hour: 10, minute: 30 },
			{ hour: 20, minute: 0 }
		]
	}],
	ratingCount: 930,
	averageRatingScore: 4.7,
	image: '/images/restaurants/burger-bandits--640.jpeg'
}, {
	id: 'cafe-atrix',
	name: 'Cafe Atrix',
	description: 'American cuisine served with a French twist',
	address: 'Vestergade 46, 8000 Aarhus, Denmark',
	coordinates: [10.202368928457076,56.1575767610488],
	businessHours: [{
		dayRange: [1, 5],
		timeRange: [
			{ hour: 9, minute: 0 },
			{ hour: 22, minute: 0 }
		]
	}, {
		dayRange: [6],
		timeRange: [
			{ hour: 10, minute: 30 },
			{ hour: 20, minute: 30 }
		]
	}, {
		dayRange: [0],
		timeRange: [
			{ hour: 10, minute: 30 },
			{ hour: 20, minute: 0 }
		]
	}],
	ratingCount: 302,
	averageRatingScore: 4.2,
	image: '/images/restaurants/cafe-atrix--640.jpeg'
}, {
	id: 'saint-bernaise',
	name: 'Saint Bernaise',
	description: 'Burger meets haute cuisine',
	address: 'Rosensgade 12, 8000 Aarhus, Denmark',
	coordinates: [10.211312908232458,56.15760809936657],
	businessHours: [{
		dayRange: [1, 5],
		timeRange: [
			{ hour: 9, minute: 0 },
			{ hour: 22, minute: 0 }
		]
	}, {
		dayRange: [6],
		timeRange: [
			{ hour: 10, minute: 30 },
			{ hour: 20, minute: 30 }
		]
	}, {
		dayRange: [0],
		timeRange: [
			{ hour: 11, minute: 0 },
			{ hour: 20, minute: 0 }
		]
	}],
	ratingCount: 302,
	averageRatingScore: 3.9,
	image: '/images/restaurants/saint-bernaise--640.jpeg'
}, {
	id: 'golden-horn-bistro',
	name: 'Golden Horn Bistro',
	description: 'Bespoke burger crafted by artisan chefs',
	address: 'Åboulevarden 70, 8000 Aarhus, Denmark',
	coordinates: [10.205659839042028,56.15662517509338],
	businessHours: [{
		dayRange: [1, 5],
		timeRange: [
			{ hour: 9, minute: 0 },
			{ hour: 22, minute: 0 }
		]
	}, {
		dayRange: [6],
		timeRange: [
			{ hour: 10, minute: 30 },
			{ hour: 20, minute: 30 }
		]
	}, {
		dayRange: [0],
		timeRange: [
			{ hour: 11, minute: 30 },
			{ hour: 20, minute: 0 }
		]
	}],
	ratingCount: 575,
	averageRatingScore: 4.1,
	image: '/images/restaurants/golden-horn-bistro--640.jpeg'
}];

/** @method */
export async function getBasicRestaurantsData(query: string = ''): Promise<RestaurantDatum[]> {
	const filteredData = basicRestaurantsData.filter(entry => {
		if (!query) {
			return true;
		}

		return [
			haystackContainsNeedle(query, entry.name),
			haystackContainsNeedle(query, entry.description)
		].some(Boolean);
	});

	await sleep(1500);

	return filteredData;
}

/** @method */
export async function getRestaurant(id: string): Promise<RestaurantDatum> {
	try {
		const foundRestaurant = basicRestaurantsData.find(entry => entry.id === id);
		if (!foundRestaurant) throw new Error(`Restaurant with the ID ${id} cannot be found`);
		await sleep(1500);
		return foundRestaurant;
	} catch(e) {
		throw e;
	}
}