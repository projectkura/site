import { cn } from "~/lib/utils";
import {
	CircleCheck,
	CircleX,
	Info,
	Lightbulb,
	TriangleAlert,
} from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type CalloutType = "info" | "warn" | "error" | "success" | "warning" | "idea";

interface CalloutContainerProps extends ComponentProps<"div"> {
	/**
	 * @defaultValue info
	 */
	type?: CalloutType;
	/**
	 * Force an icon
	 */
	icon?: ReactNode;
}

function Callout({
	children,
	title,
	...props
}: {
	title?: ReactNode;
} & Omit<CalloutContainerProps, "title">) {
	return (
		<CalloutContainer {...props}>
			{title && <CalloutTitle>{title}</CalloutTitle>}
			<CalloutDescription>{children}</CalloutDescription>
		</CalloutContainer>
	);
}

function resolveAlias(type: string): string {
	if (type === "warn") return "warning";
	if (type === "tip") return "info";
	return type;
}

function CalloutContainer({
	type: inputType = "info",
	icon,
	children,
	className,
	style,
	...props
}: CalloutContainerProps) {
	const type = resolveAlias(inputType);
	const iconClass = "size-5 -me-0.5 fill-(--callout-color) text-fd-card";

	return (
		<div
			className={cn(
				"flex gap-2 my-4 rounded-xl border bg-fd-card p-3 ps-1 text-sm text-fd-card-foreground shadow-md",
				className
			)}
			style={{
				"--callout-color": `var(--color-fd-${type}, var(--color-fd-muted))`,
				...style,
			}}
			{...props}
		>
			{/* Left accent bar with matching border-radius */}
			<div
				role="none"
				className="w-0.5 bg-(--callout-color)/50 rounded-l-xl"
			/>
			{icon ??
				{
					info: <Info className={iconClass} />,
					warning: <TriangleAlert className={iconClass} />,
					error: <CircleX className={iconClass} />,
					success: <CircleCheck className={iconClass} />,
					idea: (
						<Lightbulb className="size-5 -me-0.5 fill-(--callout-color) text-(--callout-color)" />
					),
				}[type]}
			<div className="flex flex-col gap-2 min-w-0 flex-1">{children}</div>
		</div>
	);
}

function CalloutTitle({
	children,
	className,
	...props
}: ComponentProps<"p">) {
	return (
		<p className={cn("font-medium my-0!", className)} {...props}>
			{children}
		</p>
	);
}

function CalloutDescription({
	children,
	className,
	...props
}: ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"text-fd-muted-foreground prose-no-margin empty:hidden",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export { Callout, CalloutContainer, CalloutDescription, CalloutTitle };
export type { CalloutContainerProps, CalloutType };
