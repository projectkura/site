export interface SearchScopeConfig {
	description: string;
	defaultLimit?: number;
}

export interface DocsShellConfig {
	links: Array<{
		text: string;
		url: string;
		external?: boolean;
	}>;
	search: SearchScopeConfig;
}
