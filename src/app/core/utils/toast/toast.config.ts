import { InjectionToken, TemplateRef } from '@angular/core';
import {
	ToastConfig,
	ToastType,
} from 'src/app/core/utils/toast/toast.interface';

export class ToastData {
	type: ToastType;
	text?: string;
	template?: TemplateRef<any>;
	templateContext?: {};
}

export const defaultToastConfig: ToastConfig = {
	position: {
		top: 20,
		right: 20,
	},
	animation: {
		fadeOut: 1000,
		fadeIn: 300,
	},
};

export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');
