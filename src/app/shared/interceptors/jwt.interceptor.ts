import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	authkey = 'test-angular-2021';
	constructor(private authService: AuthService, private router: Router) {
		console.log('hereeeeee', this.router.url);
	}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const currentUser = this.authService.currentUserValue;

		if (currentUser) {
			if (this.router.url == '/home') {
				request = request.clone({
					setHeaders: {
						Authkey: this.authkey,
					},
				});
			}
		}

		return next.handle(request);
	}
}
