export type ToastType = 'warning' | 'info' | 'success' | 'error';

export interface ToastConfig {
	position?: {
		top: number;
		right: number;
	};
	animation?: {
		fadeOut: number;
		fadeIn: number;
	};
}
