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
