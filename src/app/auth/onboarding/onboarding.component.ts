import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastService } from 'src/app/core/utils/toast';

@Component({
	selector: 'app-onboarding',
	templateUrl: './onboarding.component.html',
	styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
	loginForm: FormGroup;
	loading: boolean;
	submitted: boolean;
	returnUrl: string = '/';

	get form() {
		return this.loginForm;
	}

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private toastService: ToastService,
		private router: Router,
		public deviceService: DeviceDetectorService
	) {
		if (this.router.parseUrl(this.router.url).queryParams.returnUrl) {
			this.returnUrl = this.router.parseUrl(
				this.router.url
			).queryParams.returnUrl;
		}
		if (!localStorage.getItem('authToken')) {
			this.router.navigate(['/auth/login']);
		} else if (localStorage.getItem('userData')) {
			this.router.navigate(['/']);
		} else {
		}
		this.loginForm = this.fb.group({
			otp: ['', [Validators.required]],
			token: ['e090c25187ee2b3f9f1f8a02747356641', [Validators.required]],
		});
		this.submitted = false;
		this.loading = false;
	}

	ngOnInit(): void {}

	login() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;

		const formData = new FormData();
		formData.append('otp', this.loginForm.controls.otp.value.toString());
		formData.append('authToken', JSON.parse(localStorage.getItem('authToken')));
		formData.append('token', this.loginForm.controls.token.value.toString());
		this.otpVerify(formData);
	}

	otpVerify(payload) {
		this.authService
			.verifyOtp(payload)
			.pipe(first())
			.subscribe(
				({ message }) => {
					this.toastService.show({
						text: message,
						type: 'success',
					});
					this.loading = false;
					this.submitted = false;
					this.router.navigateByUrl(this.returnUrl);
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
}
