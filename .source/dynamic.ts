// @ts-nocheck
/// <reference types="vite/client" />
import { dynamic } from "fumadocs-mdx/runtime/dynamic";
import * as Config from "../source.config";

const _create = await dynamic<
	typeof Config,
	import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
		DocData: {
			docs: {
				/**
				 * extracted references (e.g. hrefs, paths), useful for analyzing relationships between pages.
				 */
				extractedReferences: import("fumadocs-mdx").ExtractedReference[];
			};
		};
	}
>(
	Config,
	{ configPath: "source.config.ts", environment: "vite", outDir: ".source" },
	{ doc: { passthroughs: ["extractedReferences"] } },
);
