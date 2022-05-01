import { Component, OnInit, HostListener } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout.service';
import { Navlink } from 'src/app/core/interfaces/layout.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Input() currentUser;
	navLinks: Array<Navlink>;
	login = true;

	constructor(
		public layoutService: LayoutService,
		public authService: AuthService,
		private router: Router,
		public deviceService: DeviceDetectorService
	) {}

	ngOnInit(): void {
		console.log(this.currentUser, 'ffffffffffff');
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/auth/login']);
	}
}
