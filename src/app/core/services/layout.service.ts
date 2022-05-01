import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LayoutService {
	private isSidenavOpenSource$: BehaviorSubject<boolean>;
	private showHeaderSource$: BehaviorSubject<boolean>;
	private isSearchBarVisibleSource$: BehaviorSubject<boolean>;
	private isHeaderSolidSource$: BehaviorSubject<boolean>;
	private areNavLinksVisible$: BehaviorSubject<boolean>;
	private showFooterSource$: BehaviorSubject<boolean>;
	private isLoginVisible$: BehaviorSubject<boolean>;
	private planRoute$: BehaviorSubject<string>;
	private hideMenuItemForStudent$: BehaviorSubject<boolean>;

	constructor() {
		this.isSidenavOpenSource$ = new BehaviorSubject(false);
		this.showHeaderSource$ = new BehaviorSubject(true);
		this.isSearchBarVisibleSource$ = new BehaviorSubject(false);
		this.isHeaderSolidSource$ = new BehaviorSubject(false);
		this.areNavLinksVisible$ = new BehaviorSubject(true);
		this.showFooterSource$ = new BehaviorSubject(true);
		this.isLoginVisible$ = new BehaviorSubject(true);
		this.planRoute$ = new BehaviorSubject('subscription/individual');
		this.hideMenuItemForStudent$ = new BehaviorSubject(false);
	}

	public isSidenavOpen() {
		return this.isSidenavOpenSource$.asObservable();
	}

	public isHeaderVisible() {
		return this.showHeaderSource$.asObservable();
	}

	public isSearchBarVisible() {
		return this.isSearchBarVisibleSource$.asObservable();
	}

	public isHeaderSolid() {
		return this.isHeaderSolidSource$.asObservable();
	}

	public areNavLinksVisible() {
		return this.areNavLinksVisible$.asObservable();
	}

	public toggleSidenav() {
		this.isSidenavOpenSource$.next(!this.isSidenavOpenSource$.getValue());
	}

	public hideHeader() {
		this.showHeaderSource$.next(false);
	}

	public showHeader() {
		this.showHeaderSource$.next(true);
	}

	public showSearchBar() {
		this.isSearchBarVisibleSource$.next(true);
	}

	public hideSearchBar() {
		this.isSearchBarVisibleSource$.next(false);
	}

	public showSolidHeader() {
		this.isHeaderSolidSource$.next(true);
	}

	public hideSolidHeader() {
		this.isHeaderSolidSource$.next(false);
	}

	public showNavLinks() {
		this.areNavLinksVisible$.next(true);
	}

	public hideNavLinks() {
		this.areNavLinksVisible$.next(false);
	}

	public isFooterVisible() {
		return this.showFooterSource$.asObservable();
	}

	public hideFooter() {
		this.showFooterSource$.next(false);
	}

	public showFooter() {
		this.showFooterSource$.next(true);
	}

	public loginVisible() {
		return this.isLoginVisible$.asObservable();
	}

	public hideLogin() {
		this.isLoginVisible$.next(false);
	}

	public showLogin() {
		this.isLoginVisible$.next(true);
	}

	public toggleLoginMenu() {
		this.isLoginVisible$.next(!this.isLoginVisible$.getValue());
	}

	public getPlanRoute() {
		return this.planRoute$.asObservable();
	}

	public updatePlanRoute(route) {
		this.planRoute$.next(route);
	}

	public getPlanRouteValue() {
		return this.planRoute$.value;
	}

	public menuItemforStudentVisible() {
		return this.hideMenuItemForStudent$.asObservable();
	}

	public hidemenuitems() {
		this.hideMenuItemForStudent$.next(false);
	}

	public showmenuItems() {
		this.hideMenuItemForStudent$.next(true);
	}
}
