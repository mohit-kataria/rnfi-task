import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'customer-web';

	urlsForHidingHeader: Array<string>;
	urlsForSolidHeader: Array<string>;
	urlsForEnablingSearchBar: Array<string>;
	urlsForHidingNavLinks: Array<string>;
	urlsForHidingFooter: Array<string>;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		public authService: AuthService,
		public deviceService: DeviceDetectorService
	) {
		this.urlsForHidingHeader = ['/auth/'];
		this.urlsForSolidHeader = [];
		this.urlsForEnablingSearchBar = [];
		this.urlsForHidingNavLinks = [];
		this.urlsForHidingFooter = ['^(?:/auth)(?:(/[^/]+){1})$'];

		this.authService.clearSessionStorage();
	}

	ngOnInit() {
		this.router.events.forEach((event) => {
			if (event instanceof NavigationStart) {
				if (this.urlsForHidingHeader.some((url) => event.url.match(url))) {
					this.layoutService.hideHeader();
					this.layoutService.hideFooter();
				} else {
					this.layoutService.showHeader();
					this.layoutService.showFooter();
				}

				if (this.urlsForSolidHeader.some((url) => event.url.match(url))) {
					this.layoutService.showSolidHeader();
				} else {
					this.layoutService.hideSolidHeader();
				}

				if (this.urlsForEnablingSearchBar.some((url) => event.url.match(url))) {
					this.layoutService.showSearchBar();
				} else {
					this.layoutService.hideSearchBar();
				}

				if (this.urlsForHidingNavLinks.some((url) => event.url.match(url))) {
					this.layoutService.hideNavLinks();
				} else {
					this.layoutService.showNavLinks();
				}
				if (this.authService.currentUserValue) {
					this.layoutService.hideLogin();
				} else {
					this.layoutService.showLogin();
				}
				if (this.urlsForHidingFooter.some((url) => event.url.match(url))) {
					this.layoutService.hideFooter();
				} else {
					this.layoutService.showFooter();
				}
			}
		});
	}
}
