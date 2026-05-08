import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Banner } from "fumadocs-ui/components/banner";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { GithubInfo } from "fumadocs-ui/components/github-info";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { CurrentInlineTOC, DocsGraphView, DocsLink } from "./docs-runtime";

export function getDocsMdxComponents() {
	return {
		...defaultMdxComponents,
		a: DocsLink,
		Accordions,
		Accordion,
		Banner,
		File,
		Files,
		Folder,
		GithubInfo,
		ImageZoom,
		InlineTOC: CurrentInlineTOC,
		GraphView: DocsGraphView,
		Step,
		Steps,
		Tab,
		Tabs,
		TabsContent,
		TabsList,
		TabsTrigger,
		TypeTable,
	};
}
