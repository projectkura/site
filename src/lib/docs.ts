export const DOCS_INTRO_SLUG = ["getting-started"] as const;

export function getDocsBaseUrl() {
	return "/docs";
}

export function getDocsHref(slugs: string[] = []) {
	return slugs.length > 0 ? `/docs/${slugs.join("/")}` : "/docs";
}

export function getDocsIntroHref() {
	return getDocsHref([...DOCS_INTRO_SLUG]);
}

export function getMarkdownHref(slugs: string[]) {
	return `/llms.mdx/docs/${slugs.join("/")}`;
}
