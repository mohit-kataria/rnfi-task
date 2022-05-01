import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService, private router: Router) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err) => {
				let handled = false;

				if (err instanceof HttpErrorResponse) {
					if (err.error instanceof ErrorEvent) {
						console.error('Error Event');
					} else {
						switch (err.status) {
							case 401: // login
								this.authService.logout();
								this.router.navigateByUrl('/auth/login');
								handled = true;
								break;
							case 403: // forbidden
								this.router.navigateByUrl('/auth/login');
								handled = true;
								break;
						}
					}
				} else {
					console.error('Other Errors');
				}

				const error = err.error.message || err.statusText;

				if (handled) {
					return of(error);
				} else {
					return throwError(error);
				}
			})
		);
	}
}
