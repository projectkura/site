import { createFileRoute } from "@tanstack/react-router";
import { docsSource } from "~/lib/source";

export const Route = createFileRoute("/llms-full.txt")({
	server: {
		handlers: {
			GET: async () => {
				const sections = await Promise.all(
					docsSource.getPages().map(async (page) => {
						const title =
							typeof page.data.title === "string"
								? page.data.title
								: page.slugs.at(-1)?.replaceAll("-", " ") ?? "Page";

						return [
							`# ${title}`,
							`Source: ${page.url}`,
							"",
							await page.data.getText("processed"),
						].join("\n");
					}),
				);

				return new Response(sections.join("\n\n---\n\n"), {
					headers: {
						"content-type": "text/plain; charset=utf-8",
					},
				});
			},
		},
	},
});
