export interface HttpServerResponse<T> {
	data: T;
	statusCode: number;
	count: any;
	message?: string;
}
