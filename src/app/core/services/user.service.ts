import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpServerResponse } from '../interfaces/http.interface';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private httpClient: HttpClient) {}

	getFormData(data) {
		return this.httpClient
			.post(
				`https://paysprint.in/service-api/testangular/api/TestAngular/getDynamicform`,
				data
			)
			.pipe(
				map((resp) => {
					// console.log(resp);

					if (resp['status']) {
						return { statusCode: resp['statuscode'], data: resp['data'] };
					} else {
						throw resp;
					}
				}),
				catchError((err) => {
					if (err?.message) {
						return throwError(err.message);
					} else {
						return throwError('Something went wrong');
					}
				})
			);
	}

	updateFormData(data) {
		return this.httpClient
			.post(
				`https://paysprint.in/service-api/testangular/api/TestAngular/createDynamicform`,
				data
			)
			.pipe(
				map((resp) => {
					// console.log(resp);

					if (resp['status']) {
						return {
							statusCode: resp['statuscode'],
							message: resp['message'],
							data: resp['data'],
						};
					} else {
						throw resp;
					}
				}),
				catchError((err) => {
					if (err?.message) {
						return throwError(err.message);
					} else {
						return throwError('Something went wrong');
					}
				})
			);
	}
}
