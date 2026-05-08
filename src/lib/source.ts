import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import { getDocsBaseUrl, getMarkdownHref } from "./docs";

const sourceDefinition = docs.toFumadocsSource();

export const docsSource = loader(sourceDefinition, {
	baseUrl: getDocsBaseUrl(),
});

export function resolveDocsPage(segments: string[]) {
	const page = docsSource.getPage(segments);

	if (!page) {
		return undefined;
	}

	return {
		page,
		markdownUrl: getMarkdownHref(segments),
	};
}

export function serializePageTree() {
	return docsSource.serializePageTree(docsSource.getPageTree());
}

export function buildDocsGraph() {
	const pages = docsSource.getPages();

	const nodes = pages.map((page) => ({
		path: page.path,
		title:
			typeof page.data.title === "string"
				? page.data.title
				: (page.slugs.at(-1)?.replaceAll("-", " ") ?? "Page"),
		url: page.url,
	}));

	const edges = pages.flatMap((page) => {
		const refs =
			(page.data as { extractedReferences?: Array<{ href: string }> }).extractedReferences ?? [];

		return refs
			.map((reference) =>
				docsSource.getPageByHref(reference.href, {
					dir: page.path,
				}),
			)
			.filter((target): target is NonNullable<typeof target> => target !== undefined)
			.map((target) => ({
				from: page.path,
				to: target.page.path,
			}));
	});

	return { nodes, edges };
}
