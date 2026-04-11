import { createFileRoute } from "@tanstack/react-router";
import { docsSearchApi } from "~/lib/search-api";

export const Route = createFileRoute("/api/search")({
	server: {
		handlers: {
			GET: ({ request }) => docsSearchApi.GET(request),
		},
	},
});
