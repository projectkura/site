import { createFileRoute } from "@tanstack/react-router";
import { docsSource } from "~/lib/source";

export const Route = createFileRoute("/llms.txt")({
	server: {
		handlers: {
			GET: () => {
				const pages = docsSource.getPages();

				const lines = [
					"# Kura Documentation",
					"Use these URLs when you need concise, navigable documentation references.",
					"",
					...pages.map((page) => {
						const title =
							typeof page.data.title === "string"
								? page.data.title
								: (page.slugs.at(-1)?.replaceAll("-", " ") ?? "Page");
						const description = page.data.description ? `: ${page.data.description}` : "";

						return `- [${title}](${page.url})${description}`;
					}),
				];

				return new Response(lines.join("\n"), {
					headers: {
						"content-type": "text/plain; charset=utf-8",
					},
				});
			},
		},
	},
});
