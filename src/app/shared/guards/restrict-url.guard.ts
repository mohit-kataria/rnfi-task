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
export class RestrictUrlGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.authService.currentUserValue;
		if (currentUser) {
			// To be done in future as per the routing.
			return true;
		} else {
			return true;
		}
	}
}
