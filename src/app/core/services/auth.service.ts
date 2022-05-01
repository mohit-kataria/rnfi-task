import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<object>;
	public currentUser: Observable<object>;
	public onboardingOneToken: string;
	public onboardingTwoToken: string;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject(
			JSON.parse(localStorage.getItem('authToken'))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue() {
		return this.currentUserSubject.value;
	}

	setUserToken(auth) {
		localStorage.setItem('authToken', JSON.stringify(auth));
		this.currentUserSubject.next(auth);
	}

	login(data) {
		return this.http
			.post(`https://rnfi.co.in/latest-backup/api/app/task/login/login`, data)
			.pipe(
				map((resp) => {
					if (resp['status']) {
						return {
							message: resp['message'],
							authToken: resp['authToken'],
							twostep: resp['twostep'],
						};
					} else {
						throw resp;
					}
				}),
				catchError((err) => {
					if (err) {
						return throwError(err);
					} else {
						return throwError('Something went wrong');
					}
				})
			);
	}

	verifyOtp(data) {
		return this.http
			.post(
				`https://rnfi.co.in/latest-backup/api/app/task/login/verifyOtp`,
				data
			)
			.pipe(
				map((resp) => {
					console.log('response', resp);

					if (resp['status']) {
						localStorage.setItem('userData', JSON.stringify(resp));

						return { message: resp['message'] };
					} else {
						throw resp;
					}
				}),
				catchError((err) => {
					if (err) {
						return throwError(err);
					} else {
						return throwError('Something went wrong');
					}
				})
			);
	}

	clearSessionStorage() {}

	logout() {
		localStorage.removeItem('authToken');
		localStorage.removeItem('userData');
		this.currentUserSubject.next(null);
	}
}
