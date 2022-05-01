import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ToastComponent } from 'src/app/core/utils/toast/toast.component';
import {
	defaultToastConfig,
	TOAST_CONFIG_TOKEN,
} from 'src/app/core/utils/toast/toast.config';

@NgModule({
	imports: [OverlayModule, MatIconModule, FlexLayoutModule],
	declarations: [ToastComponent],
	entryComponents: [ToastComponent],
})
export class ToastModule {
	public static forRoot(
		config = defaultToastConfig
	): ModuleWithProviders<ToastModule> {
		return {
			ngModule: ToastModule,
			providers: [
				{
					provide: TOAST_CONFIG_TOKEN,
					useValue: { ...defaultToastConfig, ...config },
				},
			],
		};
	}
}
