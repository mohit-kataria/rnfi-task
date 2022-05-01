import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpServerResponse } from 'src/app/core/interfaces/http.interface';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserAgentService {
	private currentDeviceSubject: BehaviorSubject<any>;
	public currentDevice: Observable<any>;

	constructor() {
		this.currentDeviceSubject = new BehaviorSubject<any>(navigator.userAgent);
		this.currentDevice = this.currentDeviceSubject.asObservable();
	}

	public get currentDeviceValue(): any {
		return this.currentDeviceSubject.value;
	}
}
