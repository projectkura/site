import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import mdx from "fumadocs-mdx/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import * as FumadocsConfig from "./source.config";

export default defineConfig(async () => ({
	server: {
		port: 3000,
	},
	resolve: {
		alias: {
			"~": path.resolve(import.meta.dirname, "./src"),
			collections: path.resolve(import.meta.dirname, "./.source"),
		},
	},
	plugins: [await mdx(FumadocsConfig), tanstackStart(), nitro(), tailwindcss(), viteReact()],
}));
