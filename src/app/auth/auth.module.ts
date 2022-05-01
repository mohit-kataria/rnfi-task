import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { OnboardingComponent } from './onboarding/onboarding.component';

@NgModule({
	declarations: [LoginComponent, OnboardingComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		FlexLayoutModule,
		MatButtonModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		HttpClientModule,
		MatRadioModule,
		MatTooltipModule,
		MatStepperModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatAutocompleteModule,
	],
})
export class AuthModule {}
