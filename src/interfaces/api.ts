/** @interface */
export interface TimestampHourAndMinute {
	hour: number;
	minute: number;
}

/** @interface */
export interface BusinessHours {
	dayRange: [number] | [number, number];
	timeRange: [TimestampHourAndMinute, TimestampHourAndMinute];
}

/** @interface */
export interface RestaurantDatum {
	id: string;
	name: string;
	description: string;
	businessHours: BusinessHours[];
	address: string;
	phone: string;
	coordinates: [number, number];
	ratingCount: number;
	averageRatingScore: number;
	image: string;
}

/** @interface */
export interface RestaurantReview {
	author: string;
	title: string;
	body: string;
	tasteRating: number;
	textureRating: number;
	presentationRating: number;
	restaurantId: string;
	restaurantName: string;
}

/** @interface */
export interface UserAdvancedData {
	reviews: RestaurantReview[];
}