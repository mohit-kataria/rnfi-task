export type NavLinkType = 'simple' | 'outline' | 'solid';

export interface Navlink {
	name: string;
	type: NavLinkType;
	link: string;
}
