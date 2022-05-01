import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.authService.currentUserValue;
		console.log(currentUser);
		
		if (currentUser) {
			// authorised so return true
			return true;
		}

		// not logged in so redirect to login page with the return url
		this.router.navigate(['/auth/login'], {
			queryParams: { returnUrl: state.url },
		});
		return false;
	}
}
