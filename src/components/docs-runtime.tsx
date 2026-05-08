import { Link } from "@tanstack/react-router";
import type { TOCItemType } from "fumadocs-core/toc";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type GraphNode = {
	path: string;
	title: string;
	url: string;
};

type GraphEdge = {
	from: string;
	to: string;
};

type DocsRuntimeValue = {
	currentPath: string;
	currentUrl: string;
	markdownUrl: string;
	pageMap: Record<string, string>;
	graph: {
		nodes: GraphNode[];
		edges: GraphEdge[];
	};
	toc: TOCItemType[];
};

const DocsRuntimeContext = createContext<DocsRuntimeValue | null>(null);

export function DocsRuntimeProvider({
	value,
	children,
}: {
	value: DocsRuntimeValue;
	children: ReactNode;
}) {
	return <DocsRuntimeContext.Provider value={value}>{children}</DocsRuntimeContext.Provider>;
}

function useDocsRuntime() {
	const value = useContext(DocsRuntimeContext);

	if (!value) {
		throw new Error("DocsRuntimeContext is missing.");
	}

	return value;
}

function splitHref(href: string) {
	const hashIndex = href.indexOf("#");
	const queryIndex = href.indexOf("?");
	const boundary =
		hashIndex === -1 ? queryIndex : queryIndex === -1 ? hashIndex : Math.min(hashIndex, queryIndex);

	return boundary === -1
		? { pathname: href, suffix: "" }
		: { pathname: href.slice(0, boundary), suffix: href.slice(boundary) };
}

function normalizePath(path: string) {
	const segments = path.split("/").filter(Boolean);
	const normalized: string[] = [];

	for (const segment of segments) {
		if (segment === ".") {
			continue;
		}

		if (segment === "..") {
			normalized.pop();
			continue;
		}

		normalized.push(segment);
	}

	return normalized.join("/");
}

function resolveRelativeDocHref(
	href: string,
	currentPath: string,
	pageMap: Record<string, string>,
) {
	if (
		href.startsWith("/") ||
		href.startsWith("#") ||
		href.startsWith("http://") ||
		href.startsWith("https://") ||
		href.startsWith("mailto:") ||
		href.startsWith("tel:")
	) {
		return href;
	}

	const { pathname, suffix } = splitHref(href);
	const currentSegments = currentPath.split("/").filter(Boolean);
	const currentDir = currentSegments.slice(0, -1).join("/");
	const targetPath = normalizePath(`${currentDir}/${pathname}`);

	return pageMap[targetPath] ? `${pageMap[targetPath]}${suffix}` : href;
}

export function DocsLink(props: React.ComponentProps<"a">) {
	const runtime = useDocsRuntime();
	const href = props.href
		? resolveRelativeDocHref(props.href, runtime.currentPath, runtime.pageMap)
		: props.href;

	if (href?.startsWith("/")) {
		return (
			<Link to={href} className={props.className}>
				{props.children}
			</Link>
		);
	}

	return <a {...props} href={href} />;
}

export function CurrentInlineTOC() {
	const runtime = useDocsRuntime();

	if (runtime.toc.length === 0) {
		return null;
	}

	return <InlineTOC items={runtime.toc} />;
}

export function DocsGraphView({ height = 260 }: { height?: number }) {
	const runtime = useDocsRuntime();
	const currentNode = runtime.graph.nodes.find((node) => node.path === runtime.currentPath);
	const linkedNodes = runtime.graph.nodes.filter((node) =>
		runtime.graph.edges.some(
			(edge) =>
				(edge.from === runtime.currentPath && edge.to === node.path) ||
				(edge.to === runtime.currentPath && edge.from === node.path),
		),
	);
	const orbitNodes = linkedNodes.length > 0 ? linkedNodes : runtime.graph.nodes.slice(0, 5);
	const centerX = 320;
	const centerY = height / 2;
	const radius = Math.min(130, height / 2 - 24);

	return (
		<div className="kura-docs-graph rounded-[1.35rem]">
			<div className="mb-4 flex items-center justify-between gap-4">
				<div>
					<p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
						Graph View
					</p>
					<p className="mt-2 text-sm text-text">
						Relationship preview for this page and its connected references.
					</p>
				</div>
			</div>
			<svg viewBox={`0 0 640 ${height}`} role="img" aria-label="Documentation graph">
				<defs>
					<linearGradient id="graph-edge" x1="0" x2="1">
						<stop offset="0%" stopColor="rgb(124 92 252 / 0.22)" />
						<stop offset="100%" stopColor="rgb(56 189 248 / 0.22)" />
					</linearGradient>
				</defs>
				{orbitNodes.map((node, index) => {
					const angle = (Math.PI * 2 * index) / Math.max(orbitNodes.length, 1) - Math.PI / 2;
					const x = centerX + Math.cos(angle) * radius;
					const y = centerY + Math.sin(angle) * radius;

					return (
						<g key={node.path}>
							<line
								x1={centerX}
								y1={centerY}
								x2={x}
								y2={y}
								stroke="url(#graph-edge)"
								strokeWidth="1.4"
							/>
							<circle cx={x} cy={y} r="10" fill="rgb(56 189 248 / 0.82)" />
							<text
								x={x}
								y={y + 26}
								textAnchor="middle"
								fill="rgb(205 205 224 / 0.78)"
								className="kura-docs-graph-label"
							>
								{node.title}
							</text>
						</g>
					);
				})}
				<circle cx={centerX} cy={centerY} r="18" fill="rgb(167 139 250 / 0.96)" />
				<text
					x={centerX}
					y={centerY + 38}
					textAnchor="middle"
					fill="white"
					className="kura-docs-graph-label"
				>
					{currentNode?.title ?? "Current Page"}
				</text>
			</svg>
		</div>
	);
}
