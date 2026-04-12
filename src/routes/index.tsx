import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
	Database,
	RefreshCw,
	LayoutDashboard,
	ShieldCheck,
	Blocks,
	ArrowRight,
	Copy,
	Check,
	Server,
} from "lucide-react";
import { DiscordIcon, GithubIcon } from "~/components/icons";
import "~/styles/app.css";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Project Kura | High Performance FiveM Server Core" },
			{
				name: "description",
				content:
					"Project Kura by Walteria.net. A high performance, feature-rich server core for FiveM on GTA 5 Enhanced. Built from the ground up with focus on security and stability.",
			},
		],
	}),
	component: HomePage,
});

function HomePage() {
	return (
		<>
			<Navbar />
			<Hero />
			<Features />
			<CodeShowcase />
			<Installation />
			<Footer />
		</>
	);
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════ */

function Navbar() {
	return (
		<nav className="fixed top-0 z-50 w-full bg-void/60 backdrop-blur-2xl">
			<div className="mx-auto flex h-14 max-w-[1200px] items-center px-6">
				{/* Logo */}
				<a href="/" className="flex items-center gap-2 select-none">
					<img src="/favicon-96x96.png" alt="Kura" className="h-7 w-7" />
					<span className="font-display text-base font-extrabold tracking-tight text-white">
						Kura
					</span>
				</a>

				{/* Left links */}
				<div className="hidden items-center gap-1 md:flex ml-8">
					<NavLink href="#features">Features</NavLink>
					<NavLink href="#install">Install</NavLink>
				</div>

				{/* Right */}
				<div className="ml-auto flex items-center gap-2">
					<a
						href="https://github.com/projectkura"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-muted transition hover:border-white/[0.12] hover:text-bright"
						aria-label="GitHub"
					>
						<GithubIcon className="h-4 w-4" />
					</a>
					<a
						href="https://discord.gg/jtctcY2pvs"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-text transition hover:border-white/[0.12] hover:text-bright"
					>
						<DiscordIcon className="h-3.5 w-3.5" />
						<span className="hidden sm:inline">Support</span>
					</a>
					<a
						href="https://billing.1of1servers.com/aff.php?aff=264"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-text transition hover:border-white/[0.12] hover:text-bright"
					>
						<Server className="h-3.5 w-3.5" strokeWidth={1.5} />
						<span className="hidden sm:inline">Hosting</span>
					</a>
					<a
						href="/docs"
						className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-accent-light"
					>
						Docs
					</a>
				</div>
			</div>
			<div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
		</nav>
	);
}

function NavLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	return (
		<a
			href={href}
			className="px-3 py-1.5 text-xs font-medium text-muted transition hover:text-bright"
		>
			{children}
		</a>
	);
}

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */

function Hero() {
	return (
		<section className="relative flex min-h-[100dvh] items-end overflow-hidden pb-24 sm:items-center sm:pb-0">
			{/* Atmosphere */}
			<div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
				<div className="absolute top-[-20%] left-1/2 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,var(--color-accent-glow)_0%,transparent_60%)] opacity-50" />
			</div>

			<div className="relative mx-auto w-full max-w-[1200px] px-6 pt-32 sm:pt-14">
				<div className="max-w-3xl">
					<p
						className="reveal text-xs font-semibold tracking-[0.25em] text-accent uppercase"
						style={{ animationDelay: "0.05s" }}
					>
						Project Kura
					</p>

					<h1
						className="reveal mt-5 font-[var(--font-hero)] text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-extrabold tracking-[-0.035em]"
						style={{ animationDelay: "0.15s", fontFamily: "var(--font-hero)" }}
					>
						<span className="text-white whitespace-nowrap">The server core</span>
						<br />
						<span className="text-white whitespace-nowrap">for FiveM, <span className="text-accent-light">rebuilt</span></span>
					</h1>

					<p
						className="reveal mt-8 max-w-md text-[15px] leading-[1.7] text-text"
						style={{ animationDelay: "0.3s" }}
					>
						A from the ground up framework for GTA 5 Enhanced.
						Performance, security, and stability without compromise.
					</p>

					<div
						className="reveal mt-10 flex flex-wrap items-center gap-3"
						style={{ animationDelay: "0.45s" }}
					>
						<a
							href="/docs"
							className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light hover:shadow-[0_0_32px_var(--color-accent-glow)]"
						>
							Get started
							<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
						</a>
						<a
							href="https://discord.gg/jtctcY2pvs"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] px-5 py-2.5 text-sm font-semibold text-bright transition hover:border-white/[0.12] hover:bg-white/[0.03]"
						>
							<DiscordIcon className="h-4 w-4 text-muted" />
							Join community
						</a>
					</div>

					<p
						className="reveal mt-16 text-[11px] font-medium tracking-widest text-muted/60 uppercase"
						style={{ animationDelay: "0.6s" }}
					>
						by{" "}
						<a
							href="https://walteria.net"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted/80 transition hover:text-bright"
						>
							Walteria.net
						</a>
					</p>
				</div>
			</div>

			{/* Scroll indicator */}
			<div
				className="reveal absolute bottom-8 left-1/2 -translate-x-1/2"
				style={{ animationDelay: "1s" }}
			>
				<div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/10 p-1">
					<div className="h-1.5 w-1 animate-bounce rounded-full bg-white/30" />
				</div>
			</div>
		</section>
	);
}

/* ═══════════════════════════════════════════════════════
   FEATURES — bento layout with icons, no card borders
   ═══════════════════════════════════════════════════════ */

function Features() {
	return (
		<section id="features" className="relative px-6 py-28 lg:py-36">
			<div className="mx-auto max-w-[1200px]">
				{/* Bento grid */}
				<div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.02] sm:grid-cols-2 lg:grid-cols-3">
					{/* KuraDB — spans 2 cols on lg */}
					<div className="group relative bg-void p-8 lg:col-span-2 lg:p-10">
						<Database className="mb-5 h-5 w-5 text-accent-light" strokeWidth={1.5} />
						<h3 className="font-display text-lg font-bold tracking-tight text-white">
							KuraDB
						</h3>
						<p className="mt-2.5 max-w-lg text-sm leading-[1.7] text-text">
							High performance asynchronous PostgreSQL wrapper with a typesafe
							Lua ORM. Connection pooling, migrations, and query optimization
							built in. Your game thread never waits.
						</p>
					</div>

					{/* State Replication */}
					<div className="group relative bg-void p-8 lg:p-10">
						<RefreshCw className="mb-5 h-5 w-5 text-sky" strokeWidth={1.5} />
						<h3 className="font-display text-lg font-bold tracking-tight text-white">
							State Replication
						</h3>
						<p className="mt-2.5 text-sm leading-[1.7] text-text">
							A reactive server-authoritative state layer that automatically
							synchronizes game data between server and clients using diff-based
							replication, eliminating manual event syncing.
						</p>
					</div>

					{/* Web Panel */}
					<div className="group relative bg-void p-8 lg:p-10">
						<LayoutDashboard className="mb-5 h-5 w-5 text-amber" strokeWidth={1.5} />
						<h3 className="font-display text-lg font-bold tracking-tight text-white">
							Web Panel
						</h3>
						<p className="mt-2.5 text-sm leading-[1.7] text-text">
							A responsive admin panel for managing player data, server
							configuration, and real-time analytics. Everything in one place.
						</p>
					</div>

					{/* Anticheat */}
					<div className="group relative bg-void p-8 lg:p-10">
						<ShieldCheck className="mb-5 h-5 w-5 text-rose" strokeWidth={1.5} />
						<h3 className="font-display text-lg font-bold tracking-tight text-white">
							Anticheat
						</h3>
						<p className="mt-2.5 text-sm leading-[1.7] text-text">
							Advanced cheat detection running at the core level. No third-party
							plugins, no compatibility issues. Protection that ships with the
							framework.
						</p>
					</div>

					{/* Architecture */}
					<div className="group relative bg-void p-8 lg:p-10">
						<Blocks className="mb-5 h-5 w-5 text-green" strokeWidth={1.5} />
						<h3 className="font-display text-lg font-bold tracking-tight text-white">
							Ground-up Architecture
						</h3>
						<p className="mt-2.5 text-sm leading-[1.7] text-text">
							Not a fork. Not a wrapper. A complete framework built from scratch
							for maximum performance and full control over every layer.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ═══════════════════════════════════════════════════════
   CODE SHOWCASE
   ═══════════════════════════════════════════════════════ */

function CodeShowcase() {
	return (
		<section className="relative px-6 py-28 lg:py-36">
			<div className="mx-auto max-w-[1200px]">
				<div className="grid items-start gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
					{/* Left */}
					<div className="lg:sticky lg:top-28">
						<p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
							Database
						</p>
						<h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Query with confidence
						</h2>
						<p className="mt-5 text-[15px] leading-[1.7] text-text">
							KuraDB gives you a Lua ORM that feels modern.
							Autocomplete, connection pooling, built-in migrations,
							and queries that never touch the game thread.
						</p>
						<ul className="mt-8 space-y-3.5">
							{[
								"Async, never blocks gameplay",
								"Full autocomplete and validation",
								"Automatic connection pooling",
								"Schema migrations included",
							].map((item) => (
								<li key={item} className="flex items-center gap-3 text-sm text-bright">
									<span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-accent/15">
										<Check className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
									</span>
									{item}
								</li>
							))}
						</ul>
					</div>

					{/* Right — code */}
					<div className="relative">
						<div className="overflow-hidden rounded-xl border border-white/[0.04] bg-deep shadow-2xl shadow-black/40">
							{/* Tab bar */}
							<div className="flex items-center gap-px border-b border-white/[0.04] bg-surface/50">
								<div className="border-b-2 border-accent px-4 py-2.5">
									<span className="font-mono text-[11px] font-medium text-bright">
										player.lua
									</span>
								</div>
								<div className="px-4 py-2.5">
									<span className="font-mono text-[11px] text-muted/40">
										schema.lua
									</span>
								</div>
							</div>

							{/* Code body */}
							<div className="flex">
								<div className="hidden border-r border-white/[0.03] py-6 pr-4 pl-5 font-mono text-[11px] leading-[2.1] text-muted/20 select-none sm:block">
									{Array.from({ length: 14 }, (_, i) => (
										<div key={i}>{String(i + 1).padStart(2, "\u2007")}</div>
									))}
								</div>
								<div className="overflow-x-auto py-6 pr-6 pl-5 sm:pl-5">
									<pre className="font-mono text-[12px] leading-[2.1]">
										<code>

										</code>
									</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function Line({ children, c }: { children: React.ReactNode; c?: string }) {
	return <div className={c ? `text-${c}` : undefined}>{children || "\u200B"}</div>;
}
function K({ children }: { children: React.ReactNode }) {
	return <span className="text-accent-light">{children}</span>;
}
function W({ children }: { children: React.ReactNode }) {
	return <span className="text-bright">{children}</span>;
}
function P({ children }: { children: React.ReactNode }) {
	return <span className="text-muted">{children}</span>;
}
function F({ children }: { children: React.ReactNode }) {
	return <span className="text-amber">{children}</span>;
}
function S({ children }: { children: React.ReactNode }) {
	return <span className="text-green">{children}</span>;
}
function G({ children }: { children: React.ReactNode }) {
	return <span className="text-sky">{children}</span>;
}
function N({ children }: { children: React.ReactNode }) {
	return <span className="text-rose">{children}</span>;
}

/* ═══════════════════════════════════════════════════════
   INSTALLATION
   ═══════════════════════════════════════════════════════ */

function Installation() {
	const [copied, setCopied] = useState(false);
	const url =
		"https://raw.githubusercontent.com/projectkura/txAdminRecipe/main/kura.yaml";

	const doCopy = () => {
		navigator.clipboard.writeText(url).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<section id="install" className="relative px-6 py-28 lg:py-36">
			<div className="mx-auto max-w-[1200px]">
				<div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
					<div>
						<p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
							Setup
						</p>
						<h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
							Running in minutes
						</h2>
						<p className="mt-5 text-[15px] leading-[1.7] text-text">
							Kura ships as a txAdmin recipe. Paste the URL,
							follow the wizard, and your server is ready.
						</p>
						<a
							href="/docs"
							className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light hover:shadow-[0_0_32px_var(--color-accent-glow)]"
						>
							Get Started
							<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
						</a>
					</div>

					<div className="space-y-px overflow-hidden rounded-xl border border-white/[0.04] bg-deep">
						<div className="border-b border-white/[0.04] p-6">
							<div className="flex items-baseline gap-4">
								<span className="font-mono text-xs text-accent/60">01</span>
								<div>
									<h3 className="text-sm font-semibold text-bright">
										Open txAdmin
									</h3>
									<p className="mt-1 text-sm text-text">
										Start the server setup wizard. Select
										"Remote URL Template" as deployment type.
									</p>
								</div>
							</div>
						</div>

						<div className="border-b border-white/[0.04] p-6">
							<div className="flex items-baseline gap-4">
								<span className="font-mono text-xs text-accent/60">02</span>
								<div className="min-w-0 flex-1">
									<h3 className="text-sm font-semibold text-bright">
										Paste the recipe URL
									</h3>
									<div className="mt-3 flex items-center gap-2 rounded-lg border border-white/[0.04] bg-surface/50 py-2.5 pr-2.5 pl-4">
										<code className="min-w-0 flex-1 truncate font-mono text-[12px] text-accent-light">
											{url}
										</code>
										<button
											type="button"
											onClick={doCopy}
											className="flex shrink-0 items-center gap-1.5 rounded-md bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-muted transition hover:bg-white/[0.08] hover:text-bright"
										>
											{copied ? (
												<>
													<Check className="h-3 w-3 text-green" strokeWidth={2.5} />
													<span className="text-green">Copied</span>
												</>
											) : (
												<>
													<Copy className="h-3 w-3" strokeWidth={1.5} />
													Copy
												</>
											)}
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="p-6">
							<div className="flex items-baseline gap-4">
								<span className="font-mono text-xs text-accent/60">03</span>
								<div>
									<h3 className="text-sm font-semibold text-bright">Deploy</h3>
									<p className="mt-1 text-sm text-text">
										Follow the wizard. Kura configures everything automatically.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */

function Footer() {
	return (
		<footer className="px-6 pb-12 pt-20">
			<div className="mx-auto max-w-[1200px]">
				<div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

				<div className="flex flex-col items-start justify-between gap-8 pt-12 sm:flex-row sm:items-center">
					<div>
						<span className="font-display text-base font-bold text-white">
							Kura<span className="text-accent">.</span>
						</span>
						<p className="mt-1 text-sm text-text">
							by{" "}
							<a
								href="https://walteria.net"
								target="_blank"
								rel="noopener noreferrer"
								className="text-bright underline decoration-border underline-offset-2 transition hover:decoration-accent"
							>
								Walteria.net
							</a>
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
						<a href="/docs" className="text-sm text-text transition hover:text-white">
							Docs
						</a>
						<a
							href="https://discord.gg/jtctcY2pvs"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-text transition hover:text-white"
						>
							Discord
						</a>
						<a
							href="https://billing.1of1servers.com/aff.php?aff=264"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-text transition hover:text-white"
						>
							Hosting
						</a>
						<a
							href="https://github.com/projectkura"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-text transition hover:text-white"
						>
							GitHub
						</a>
						<a
							href="https://rotationracing.eu/imprint"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-text underline decoration-border underline-offset-2 transition hover:text-white hover:decoration-accent"
						>
							Imprint
						</a>
					</div>
				</div>

				<div className="mt-8 max-w-4xl space-y-3 text-xs leading-6 text-muted">
					<p>
						© {new Date().getFullYear()} Project Kura. This website is not affiliated with or
						endorsed by Take-Two Interactive, Rockstar Games, Rockstar North, Cfx.re, or any
						other rights holders. All trademarks belong to their respective owners. Project Karu
						Labs provides original scripts for educational and entertainment purposes.
					</p>
					<p>
						Project Kura is part of Walteria.net, which is owned by{" "}
						<a
							href="https://rotationracing.eu"
							target="_blank"
							rel="noopener noreferrer"
							className="text-bright underline decoration-border underline-offset-2 transition hover:decoration-accent"
						>
							rotationracing.eu
						</a>
						. Website made by{" "}
						<a
							href="https://rotationracing.eu"
							target="_blank"
							rel="noopener noreferrer"
							className="text-bright underline decoration-border underline-offset-2 transition hover:decoration-accent"
						>
							rotationracing.eu
						</a>
						.
					</p>
				</div>
			</div>
		</footer>
	);
}

