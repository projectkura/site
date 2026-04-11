import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { createGenerator, remarkAutoTypeTable } from "fumadocs-typescript";

const generator = createGenerator();

export const docs = defineDocs({
	dir: "content/docs",
	docs: {
		postprocess: {
			includeProcessedMarkdown: true,
			extractLinkReferences: true,
		},
	},
});

export default defineConfig({
	mdxOptions: {
		remarkPlugins: (plugins) => [
			...plugins,
			[
				remarkAutoTypeTable,
				{
					generator,
				},
			],
		],
	},
});
