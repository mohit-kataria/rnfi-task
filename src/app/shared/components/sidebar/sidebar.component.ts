import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	@Input() currentUser;
	constructor(
		public layoutService: LayoutService,
		private authService: AuthService,
		private router: Router
	) {
		// this.currentUser = this.authService.currentUserValue;
	}

	ngOnInit(): void {}

	logout() {
		this.layoutService.toggleSidenav();
		this.layoutService.toggleLoginMenu();
		this.authService.logout();
		this.currentUser = null;
		this.layoutService.showmenuItems();
		this.router.navigate(['/']);
	}
}
