import { printErrors, scanURLs, validateFiles } from "next-validate-link";
import { searchSource } from "../src/lib/source";

const pages = searchSource.getPages();

const scanned = await scanURLs({
	preset: "tanstack-start",
	cwd: process.cwd(),
	populate: {
		"/docs/$": pages.map((page) => ({
			value: page.url
				.replace(/^\/docs\/?/, "")
				.split("/")
				.filter(Boolean),
		})),
	},
});

const files = await Promise.all(
	pages.map(async (page) => ({
		path: page.path,
		content: await page.data.getText("raw"),
		url: page.url,
	})),
);

const results = await validateFiles(files, {
	scanned,
	checkRelativePaths: "as-url",
	checkRelativeUrls: true,
	pathToUrl: (path) => pages.find((page) => page.path === path)?.url,
});

printErrors(results, true);
