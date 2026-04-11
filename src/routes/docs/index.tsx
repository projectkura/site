import { createFileRoute, redirect } from "@tanstack/react-router";
import { getDocsIntroHref } from "~/lib/docs";

export const Route = createFileRoute("/docs/")({
	beforeLoad: () => {
		throw redirect({
			to: getDocsIntroHref(),
		});
	},
});
