import { AnimationEvent } from '@angular/animations';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
	toastAnimations,
	ToastAnimationState,
} from 'src/app/core/utils/toast/toast.animation';
import {
	ToastData,
	TOAST_CONFIG_TOKEN,
} from 'src/app/core/utils/toast/toast.config';
import { ToastConfig } from 'src/app/core/utils/toast/toast.interface';
import { ToastRef } from 'src/app/core/utils/toast/toast.ref';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
	animations: [toastAnimations.fadeToast],
})
export class ToastComponent implements OnInit, OnDestroy {
	animationState: ToastAnimationState = 'default';
	iconType: string;

	private intervalId: ReturnType<typeof setTimeout>;

	constructor(
		readonly data: ToastData,
		readonly ref: ToastRef,
		@Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
	) {
		this.iconType = data.type === 'success' ? 'done' : data.type;
	}

	ngOnInit() {
		this.intervalId = setTimeout(() => (this.animationState = 'closing'), 2000);
	}

	ngOnDestroy() {
		clearTimeout(this.intervalId);
	}

	close() {
		this.ref.close();
	}

	onFadeFinished(event: AnimationEvent) {
		const { toState } = event;
		const isFadeOut = (toState as ToastAnimationState) === 'closing';
		const itFinished = this.animationState === 'closing';

		if (isFadeOut && itFinished) {
			this.close();
		}
	}
}
