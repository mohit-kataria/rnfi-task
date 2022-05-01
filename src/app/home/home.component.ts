import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/internal/operators/first';
import { UserService } from '../core/services/user.service';
import { ToastService } from '../core/utils/toast/toast.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	dynamicForm: FormGroup;
	outerKey: string[] = [];
	get form() {
		return this.dynamicForm;
	}

	constructor(
		private userService: UserService,
		private fb: FormBuilder,
		private toastService: ToastService
	) {
		const formData = new FormData();
		formData.append('token', 'e090c25187ee2b3f9f1f8a02747356641');
		formData.append('authToken', JSON.parse(localStorage.getItem('authToken')));

		this.getDynamicFormData(formData);
	}

	ngOnInit(): void {}

	getDynamicFormData(data) {
		this.userService
			.getFormData(data)
			.pipe(first())
			.subscribe(
				(data) => {
					if (data.statusCode == 200) {
						const outerKey = Object.keys(data.data[0]);
						this.outerKey = outerKey;
						this.dynamicForm;
						let outerObj = {};
						for (let i of outerKey) {
							let arr = [];
							for (let x of data.data[0][i]) {
								const innerKey = Object.keys(x);
								let innerObj = {};
								for (let y of innerKey) {
									innerObj[y] = x[y];
								}
								arr.push(this.fb.group(innerObj));
							}
							outerObj[i] = this.fb.array(arr);
						}
						this.dynamicForm = this.fb.group(outerObj);
						console.log(this.dynamicForm);
						// debugger
					}
				},
				(err) => {
					console.log(err);
				}
			);
	}

	originalOrder = (
		a: KeyValue<number, string>,
		b: KeyValue<number, string>
	): number => {
		return 0;
	};

	update() {
		console.log('update', this.dynamicForm);
		this.dynamicForm.value;
		const formData = new FormData();
		formData.append('token', 'e090c25187ee2b3f9f1f8a02747356641');
		formData.append('authToken', JSON.parse(localStorage.getItem('authToken')));
		formData.append('json', JSON.stringify(this.dynamicForm.value));
		this.updateDynamicFormData(formData);
	}

	updateDynamicFormData(data) {
		this.userService
			.updateFormData(data)
			.pipe(first())
			.subscribe(
				({ data, message, statusCode }) => {
					if (statusCode == 200) {
						this.toastService.show({
							text: message,
							type: 'success',
						});
					}
				},
				(err) => {
					console.log(err);
				}
			);
	}

	getType(value) {
		let typeNum = /^\d+$/.test(value.value);
		return typeNum ? 'number' : 'text';
	}
}
