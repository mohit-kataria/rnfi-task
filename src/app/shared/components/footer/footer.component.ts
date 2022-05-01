import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LayoutService } from 'src/app/core/services/layout.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
	constructor(
		public layoutService: LayoutService,
		private router: Router,
		public deviceService: DeviceDetectorService
	) {}

	ngOnInit(): void {}
}
