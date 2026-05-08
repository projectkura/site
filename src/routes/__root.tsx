/// <reference types="vite/client" />

import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { RootProvider } from "fumadocs-ui/provider/tanstack";
import type { ReactNode } from "react";
import { DocsSearchDialog } from "~/components/docs-search";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				title: "Project Kura | High Performance FiveM Server Core",
			},
			{
				name: "description",
				content:
					"Project Kura by Walteria.net. A high performance, feature-rich server core for FiveM on GTA 5 Enhanced. Built from the ground up with focus on security and stability.",
			},
			{ name: "theme-color", content: "#050508" },
			{ name: "apple-mobile-web-app-title", content: "Kura" },
			{ property: "og:type", content: "website" },
			{
				property: "og:title",
				content: "Project Kura | High Performance FiveM Server Core",
			},
			{
				property: "og:description",
				content:
					"A high performance, feature-rich server core for FiveM on GTA 5 Enhanced. Built from the ground up with focus on security and stability.",
			},
			{ property: "og:site_name", content: "Project Kura" },
			{ name: "twitter:card", content: "summary_large_image" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
			{ rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "shortcut icon", href: "/favicon.ico" },
			{ rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
			{ rel: "manifest", href: "/site.webmanifest" },
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-background text-foreground antialiased">
				<RootProvider
					search={{
						enabled: true,
						SearchDialog: DocsSearchDialog,
						links: [
							["Getting Started", "/docs/getting-started"],
							["Installation", "/docs/installation"],
							["Reference", "/docs/reference"],
						],
					}}
					theme={{ enabled: false }}
				>
					{children}
				</RootProvider>
				<Scripts />
			</body>
		</html>
	);
}
