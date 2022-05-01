import { Injectable } from '@angular/core';
import { Adapter } from 'src/app/core/adapter';

export class User {
	constructor(
		public id: number,
		public firstName: string,
		public lastName: string,
		public email: string,
		public mobile: number,
		public token: string,
	) {}
}

export class ResetAccount {
	constructor(public resetLink: string) {}
}

@Injectable({
	providedIn: 'root',
})
export class UserAdapter implements Adapter<User> {
	adapt(user: any): User {
		return new User(
			user.id,
			user.first_name,
			user.last_name,
			user.email,
			user.phone,
			user.token,
		);
	}
}

@Injectable({
	providedIn: 'root',
})
export class ResetAccountAdapter implements Adapter<ResetAccount> {
	adapt(resetAccount: any): ResetAccount {
		return new ResetAccount(resetAccount.resetLink);
	}
}
