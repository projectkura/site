import { createFromSource } from "fumadocs-core/search/server";
import { docsSource } from "./source";

export const docsSearchApi = createFromSource(docsSource, {
	buildIndex: async (page) => ({
		id: page.url,
		title:
			typeof page.data.title === "string"
				? page.data.title
				: page.slugs.at(-1)?.replaceAll("-", " ") ?? "Page",
		description: page.data.description,
		structuredData: page.data.structuredData,
		url: page.url,
	}),
});
