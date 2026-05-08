import { createFileRoute } from "@tanstack/react-router";
import { resolveDocsPage } from "~/lib/source";

export const Route = createFileRoute("/llms.mdx/docs/$")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const segments = params._splat?.split("/").filter(Boolean) ?? [];
				const resolved = resolveDocsPage(segments);

				if (!resolved) {
					return new Response("Not Found", { status: 404 });
				}

				const title =
					typeof resolved.page.data.title === "string"
						? resolved.page.data.title
						: (resolved.page.slugs.at(-1)?.replaceAll("-", " ") ?? "Page");
				const content = await resolved.page.data.getText("processed");

				return new Response(
					[`# ${title}`, `Canonical URL: ${resolved.page.url}`, "", content].join("\n"),
					{
						headers: {
							"content-type": "text/plain; charset=utf-8",
						},
					},
				);
			},
		},
	},
});
