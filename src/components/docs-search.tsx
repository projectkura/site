import { useDocsSearch } from "fumadocs-core/search/client";
import {
	SearchDialog,
	SearchDialogClose,
	SearchDialogContent,
	SearchDialogFooter,
	SearchDialogHeader,
	SearchDialogIcon,
	SearchDialogInput,
	SearchDialogList,
	SearchDialogListItem,
	SearchDialogOverlay,
	type SharedProps,
} from "fumadocs-ui/components/dialog/search";

export function DocsSearchDialog(props: SharedProps) {
	const search = useDocsSearch({
		type: "fetch",
		allowEmpty: false,
	});
	const items = search.query.data === "empty" ? [] : search.query.data;

	return (
		<SearchDialog
			{...props}
			search={search.search}
			onSearchChange={search.setSearch}
			isLoading={search.query.isLoading}
		>
			<SearchDialogOverlay />
			<SearchDialogContent>
				<SearchDialogHeader>
					<SearchDialogIcon />
					<SearchDialogInput placeholder="Search documentation..." />
					<SearchDialogClose />
				</SearchDialogHeader>
				<SearchDialogList
					items={items}
					Empty={() => (
						<div className="px-4 py-10 text-center text-sm text-fd-muted-foreground">
							No results found.
						</div>
					)}
					Item={({ item, onClick }) => <SearchDialogListItem item={item} onClick={onClick} />}
				/>
				<SearchDialogFooter />
			</SearchDialogContent>
		</SearchDialog>
	);
}
