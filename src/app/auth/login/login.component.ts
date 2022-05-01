import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/utils/toast';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	loading: boolean;
	submitted: boolean;

	get form() {
		return this.loginForm;
	}

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private toastService: ToastService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
			token: ['e090c25187ee2b3f9f1f8a02747356641', [Validators.required]],
		});
		this.submitted = false;
		this.loading = false;
	}

	ngOnInit(): void {
		this.authService.clearSessionStorage();
		console.log(this.router.parseUrl(this.router.url).queryParams.returnUrl);

		if (this.authService.currentUserValue && localStorage.getItem('userData')) {
			this.router.navigate(['/']);
		} else if (this.authService.currentUserValue) {
			this.logout();
		}
	}

	login() {
		this.submitted = true;
		if (this.loginForm.invalid) {
			return;
		}
		this.loading = true;
		const formData = new FormData();
		formData.append(
			'username',
			this.loginForm.controls.username.value.toString()
		);
		formData.append(
			'password',
			this.loginForm.controls.password.value.toString()
		);

		formData.append('token', this.loginForm.controls.token.value.toString());
		this.userLogin(formData);
	}

	userLogin(payload) {
		this.authService
			.login(payload)
			.pipe(first())
			.subscribe(
				({ message, twostep, authToken }) => {
					this.toastService.show({
						text: message,
						type: 'success',
					});
					this.loading = false;
					this.submitted = false;
					localStorage.setItem('authToken', JSON.stringify(authToken));

					if (twostep === 1) {
						this.router.navigate(['/auth/onboarding']);
					}
					this.routeRedirection(authToken);
				},
				(error) => {
					this.toastService.show({
						text: error.message,
						type: 'error',
					});
					this.loading = false;
					this.submitted = false;
				}
			);
	}

	routeRedirection(data) {
		let returnUrl = null;
		this.authService.setUserToken(data);
		if (this.router.parseUrl(this.router.url).queryParams.returnUrl) {
			returnUrl = this.router.parseUrl(this.router.url).queryParams.returnUrl;
			console.log(returnUrl);
		}
		if (returnUrl) {
			this.router.navigate(['/auth/onboarding'], {
				queryParams: { returnUrl: returnUrl },
			});
		} else {
			this.router.navigate(['/auth/onboarding']);
		}
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/auth/login']);
	}
}
