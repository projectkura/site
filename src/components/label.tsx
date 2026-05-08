"use client";

import * as React from "react";

import { cn } from "~/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
	const hasControl = Boolean(props.htmlFor) || React.Children.count(props.children) > 0;

	return (
		<label
			data-slot="label"
			htmlFor={props.htmlFor}
			aria-label={!hasControl ? "label" : undefined}
			className={cn(
				"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
