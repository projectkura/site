import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle,
	MarkdownCopyButton,
	ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { Banner } from "fumadocs-ui/components/banner";
import { getDocsMdxComponents } from "~/components/docs-mdx";
import { DocsRuntimeProvider } from "~/components/docs-runtime";
import browserCollections from "collections/browser";

type DocsContentProps = {
	lastUpdated?: string;
	markdownUrl: string;
	currentPath: string;
	currentUrl: string;
	pageMap: Record<string, string>;
	graph: {
		nodes: Array<{ path: string; title: string; url: string }>;
		edges: Array<{ from: string; to: string }>;
	};
};

const docsContentLoader = browserCollections.docs.createClientLoader({
	component: (document, props: DocsContentProps) => {
		const MDXContent = document.default;

		return (
			<DocsRuntimeProvider
				value={{
					currentPath: props.currentPath,
					currentUrl: props.currentUrl,
					markdownUrl: props.markdownUrl,
					pageMap: props.pageMap,
					graph: props.graph,
					toc: document.toc,
				}}
			>
				<DocsPage
					toc={document.toc}
					breadcrumb={{ enabled: true }}
					tableOfContent={{ style: "clerk" }}
					tableOfContentPopover={{ style: "clerk" }}
				>
					<DocsTitle>{document.frontmatter.title}</DocsTitle>
					<DocsDescription className="text-sm">
						{document.frontmatter.description}
					</DocsDescription>
					<div className="flex flex-row items-center gap-2 border-b pb-4">
						<MarkdownCopyButton markdownUrl={props.markdownUrl} />
						<ViewOptionsPopover markdownUrl={props.markdownUrl} />
					</div>
					<DocsBody>
						<MDXContent components={getDocsMdxComponents()} />
					</DocsBody>
				</DocsPage>
			</DocsRuntimeProvider>
		);
	},
});

const getDocsPage = createServerFn({ method: "GET" })
	.inputValidator((segments: string[]) => segments)
	.handler(async ({ data: segments }) => {
		const [{ stat }, { buildDocsGraph, resolveDocsPage, serializePageTree }] =
			await Promise.all([import("node:fs/promises"), import("~/lib/source")]);
		const resolved = resolveDocsPage(segments);

		if (!resolved) {
			throw notFound();
		}

		const graph = buildDocsGraph();
		const { docsSource } = await import("~/lib/source");
		const pageMap = Object.fromEntries(
			docsSource.getPages().map((page) => [page.path, page.url]),
		);
		const absolutePath = resolved.page.absolutePath;
		const lastUpdated = absolutePath
			? await stat(absolutePath)
					.then((file) => file.mtime.toISOString())
					.catch(() => undefined)
			: undefined;

		return {
			pagePath: resolved.page.path,
			pageUrl: resolved.page.url,
			currentPath: resolved.page.path,
			currentUrl: resolved.page.url,
			markdownUrl: resolved.markdownUrl,
			pageMap,
			graph,
			tree: await serializePageTree(),
			lastUpdated,
		};
	});

export const Route = createFileRoute("/docs/$")({
	loader: async ({ params }) => {
		const segments = params._splat?.split("/").filter(Boolean) ?? [];
		const result = await getDocsPage({ data: segments });
		await docsContentLoader.preload(result.pagePath);
		return result;
	},
	component: DocsRoute,
});

function DocsRoute() {
	const loaderData = Route.useLoaderData();
	const data = useFumadocsLoader(loaderData);

	return (
		<>
			<Banner variant="rainbow" id="kura-docs">
				Early Access — Documentation is actively evolving and may change without notice.
			</Banner>
			<DocsLayout
				tree={data.tree}
				themeSwitch={{ enabled: false }}
				nav={{
					title: ({ className, ...props }) => (
						<a
							{...props}
							className={`flex items-center gap-2 ${className ?? ""}`}
							href="/"
						>
							<img src="/favicon-96x96.png" alt="Kura" className="h-7 w-7" />
							<span className="font-display text-base font-extrabold tracking-tight text-white">
								Kura
							</span>
						</a>
					),
					url: "/",
					transparentMode: "none",
				}}
				links={[
					{
						text: "Discord",
						url: "https://discord.gg/jtctcY2pvs",
						type: "main",
						external: true,
					},
					{
						text: "Hosting",
						url: "https://billing.1of1servers.com/aff.php?aff=264",
						type: "main",
						external: true,
					},
				]}
				searchToggle={{ enabled: true }}
			>
				{docsContentLoader.useContent(loaderData.pagePath, {
					lastUpdated: loaderData.lastUpdated,
					markdownUrl: loaderData.markdownUrl,
					currentPath: loaderData.currentPath,
					currentUrl: loaderData.currentUrl,
					pageMap: loaderData.pageMap,
					graph: loaderData.graph,
				})}
			</DocsLayout>
		</>
	);
}
