export interface SiteConfig {
	author: string;
	description: string;
	lang: string;
	ogLocale: string;
	title: string;
}

export interface PaginationLink {
	srLabel?: string;
	text?: string;
	url: string;
}

export interface SiteMeta {
	description?: string | undefined;
	ogImage?: string | undefined;
	title: string;
}


export interface Author {
	name: string;
	photo: string;
	type: string;
	url: string;
}