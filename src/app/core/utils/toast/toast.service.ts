import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Inject, Injectable, Injector } from '@angular/core';
import { ToastComponent } from 'src/app/core/utils/toast/toast.component';
import {
	ToastData,
	TOAST_CONFIG_TOKEN,
} from 'src/app/core/utils/toast/toast.config';
import { ToastConfig } from 'src/app/core/utils/toast/toast.interface';
import { ToastRef } from 'src/app/core/utils/toast/toast.ref';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private lastToast: ToastRef;

	constructor(
		private overlay: Overlay,
		private parentInjector: Injector,
		@Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig
	) {}

	show(data: ToastData) {
		const positionStrategy = this.getPositionStrategy();
		const overlayRef = this.overlay.create({ positionStrategy });

		const toastRef = new ToastRef(overlayRef);
		this.lastToast = toastRef;

		const injector = this.getInjector(data, toastRef, this.parentInjector);
		const toastPortal = new ComponentPortal(ToastComponent, null, injector);

		overlayRef.attach(toastPortal);

		return toastRef;
	}

	getPositionStrategy() {
		return this.overlay
			.position()
			.global()
			.top(this.getPosition())
			.right(this.toastConfig.position.right + 'px');
	}

	getPosition() {
		const lastToastIsVisible = this.lastToast && this.lastToast.isVisible();
		const position = lastToastIsVisible
			? this.lastToast.getPosition().bottom
			: this.toastConfig.position.top;

		return position + 'px';
	}

	getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
		const tokens = new WeakMap();

		tokens.set(ToastData, data);
		tokens.set(ToastRef, toastRef);

		return new PortalInjector(parentInjector, tokens);
	}
	// private subject = new Subject<any>();
	// private keepAfterRouteChange = false;

	// constructor(private router: Router) {
	// 	// clear alert messages on route change unless 'keepAfterRouteChange' flag is true
	// 	this.router.events.subscribe((event) => {
	// 		if (event instanceof NavigationStart) {
	// 			if (this.keepAfterRouteChange) {
	// 				// only keep for a single route change
	// 				this.keepAfterRouteChange = false;
	// 			} else {
	// 				// clear alert message
	// 				this.clear();
	// 			}
	// 		}
	// 	});
	// }

	// getAlert(): Observable<any> {
	// 	return this.subject.asObservable();
	// }

	// success(message: string, keepAfterRouteChange = false) {
	// 	this.keepAfterRouteChange = keepAfterRouteChange;
	// 	this.subject.next({ type: 'success', text: message });
	// }

	// error(message: string, keepAfterRouteChange = false) {
	// 	this.keepAfterRouteChange = keepAfterRouteChange;
	// 	this.subject.next({ type: 'error', text: message });
	// }

	// clear() {
	// 	// clear by calling subject.next() without parameters
	// 	this.subject.next();
	// }
}
