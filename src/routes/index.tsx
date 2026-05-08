import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Check,
	Code2,
	Copy,
	Database,
	GitBranch,
	Layers,
	LayoutDashboard,
	Plug,
	Server,
	ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DiscordIcon, GithubIcon } from "~/components/icons";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Project Kura · A modern framework for FiveM" },
			{
				name: "description",
				content:
					"A from-scratch framework ecosystem for modern FiveM servers. Typed Lua APIs, a real PostgreSQL ORM, unified state, and server-authoritative anticheat, built for teams that have outgrown legacy patterns.",
			},
		],
	}),
	component: HomePage,
});

function HomePage() {
	useReveal();
	return (
		<main className="atmos relative min-h-screen overflow-hidden text-white antialiased">
			{/* Global atmosphere - drifting nebula glows behind everything */}
			<AtmosBackdrop />
			<Navbar />
			<Hero />
			<Features />
			<Philosophy />
			<Performance />
			<Install />
			<FinalCTA />
			<Footer />
		</main>
	);
}

/* ════════════════════════════════════════════════════════════
   REVEAL - IntersectionObserver with stagger support
   ════════════════════════════════════════════════════════════ */

function useReveal() {
	useEffect(() => {
		if (typeof window === "undefined") return;
		const els = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger]");
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) {
						const el = e.target as HTMLElement;

						// Stagger: set incremental delay on each child
						const gap = el.getAttribute("data-reveal-stagger");
						if (gap !== null) {
							const step = Number.parseFloat(gap) || 0.08;
							const children = el.children;
							for (let i = 0; i < children.length; i++) {
								(children[i] as HTMLElement).style.setProperty("--reveal-d", `${i * step}s`);
							}
						}

						el.classList.add("in-view");
						io.unobserve(el);
					}
				}
			},
			{ rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
		);
		for (const el of els) {
			io.observe(el);
		}
		return () => io.disconnect();
	}, []);
}

/* ════════════════════════════════════════════════════════════
   ATMOSPHERIC BACKDROP - drifting glows + grid + grain
   ════════════════════════════════════════════════════════════ */

function AtmosBackdrop() {
	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
			{/* One global atmospheric move: a masked technical grid plus a single
			   slow-drifting indigo glow. No stars, no second nebula, no per-section
			   halos competing for attention. */}
			<div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_75%)]" />
			<div
				className="glow-blob glow-drift"
				style={{
					top: "60%",
					left: "30%",
					width: "780px",
					height: "780px",
					background: "radial-gradient(circle, oklch(0.55 0.22 295 / 0.30), transparent 70%)",
				}}
			/>
		</div>
	);
}

/* ════════════════════════════════════════════════════════════
   NAVBAR - pill, dark glass
   ════════════════════════════════════════════════════════════ */

function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header className="fixed top-0 right-0 left-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
			<nav
				className={`flex h-14 w-full max-w-[1180px] items-center gap-2 rounded-full border px-2.5 pl-5 transition-all duration-700 ${
					scrolled
						? "border-white/[0.08] bg-[oklch(0.07_0.01_260/0.78)] shadow-[0_24px_60px_-26px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
						: "border-white/[0.06] bg-[oklch(0.07_0.01_260/0.45)] backdrop-blur-xl"
				}`}
			>
				<button
					type="button"
					onClick={() => {
						window.scrollTo({ top: 0, behavior: "smooth" });
					}}
					className="flex items-center gap-2 select-none"
				>
					<KuraMark />
					<span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-white">
						Kura
					</span>
				</button>

				<div className="ml-6 hidden items-center gap-1 md:flex">
					<NavLink href="#features">Features</NavLink>
					<NavLink href="#legacy-vs-kura">Why Kura</NavLink>
					<NavLink href="#install">Install</NavLink>
				</div>

				<div className="ml-auto flex items-center gap-1.5 sm:gap-2">
					<a
						href="https://github.com/projectkura"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
						className="pill pill-ghost-dark hidden h-9 w-9 sm:inline-flex"
					>
						<GithubIcon className="h-4 w-4" />
					</a>
					<a
						href="https://discord.gg/jtctcY2pvs"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Discord"
						className="pill pill-ghost-dark hidden h-9 w-9 sm:inline-flex"
					>
						<DiscordIcon className="h-4 w-4" />
					</a>
					<a
						href="https://billing.1of1servers.com/aff.php?aff=264"
						target="_blank"
						rel="noopener noreferrer"
						className="pill pill-ghost-dark hidden h-9 gap-1.5 px-3.5 text-[12.5px] sm:inline-flex"
					>
						<Server className="h-3.5 w-3.5" strokeWidth={1.75} />
						Hosting
					</a>
					<a
						href="https://orbit.walteria.net"
						target="_blank"
						rel="noopener noreferrer"
						className="pill pill-ghost-dark hidden h-9 gap-1.5 px-3.5 text-[12.5px] sm:inline-flex"
					>
						Orbit
						<ArrowUpRight className="h-3 w-3" strokeWidth={2} />
					</a>
					<a href="/docs" className="pill pill-paper h-9 gap-1.5 px-5 text-[13px] font-semibold">
						Read Docs
						<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
					</a>
				</div>
			</nav>
		</header>
	);
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<a
			href={href}
			className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/65 transition-colors duration-300 hover:bg-white/[0.05] hover:text-white"
		>
			{children}
		</a>
	);
}

function KuraMark() {
	return (
		<div className="relative">
			<svg
				viewBox="0 0 128 85"
				fill="white"
				className="relative z-10 h-3.5 w-auto"
				aria-hidden="true"
			>
				<path d="M42.6701 42.4973C66.2352 42.4973 85.3385 61.5248 85.3385 84.9963L128 84.9981V83.9012C127.414 37.6447 89.7302 0.291897 43.2192 0L0 0.00194852V85H42.6684L42.6701 42.4973Z" />
				<circle cx="118" cy="10" r="10" />
			</svg>
		</div>
	);
}

/* ════════════════════════════════════════════════════════════
   HERO - brand-first Kura introduction
   ════════════════════════════════════════════════════════════ */

function Hero() {
	const words = ["A", "framework", "for", "the", "next", "era"];
	const [gone, setGone] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > 40) setGone(true);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

		return (
		<section className="relative flex min-h-[84svh] items-center px-4 py-14 sm:py-18 lg:py-22">
			{/* Hero-local glow */}
			<div
				className="pointer-events-none absolute -top-24 -left-[5%] h-[500px] w-[700px]"
				aria-hidden="true"
				style={{
					background:
						"radial-gradient(ellipse at 40% 60%, oklch(0.55 0.22 295 / 0.2), transparent 70%)",
					filter: "blur(100px)",
				}}
			/>

			<div className="relative mx-auto w-full max-w-[1180px]">
				{/* Headline — word-by-word blur dissolve */}
				<h1 className="font-display text-[clamp(3.2rem,10vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.025em] text-white">
					{words.map((word, i) => (
						<span key={word} className="hero-word" style={{ "--i": i } as React.CSSProperties}>
							{word}{" "}
						</span>
					))}
					<span
						className="hero-word text-accent-cool"
						style={{ "--i": words.length } as React.CSSProperties}
					>
						of FiveM.
					</span>
				</h1>

				{/* Subline + CTAs */}
				<div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
					<p
						className="rise max-w-[32rem] text-[16px] leading-[1.7] text-white/50"
						style={{ animationDelay: "0.7s" }}
					>
						Typed Lua APIs, a real PostgreSQL ORM, unified state, and server-authoritative
						anticheat. Built from scratch for teams that have outgrown legacy patterns.
					</p>

					<div
						className="rise flex flex-wrap items-center gap-3"
						style={{ animationDelay: "0.85s" }}
					>
						<a href="/docs" className="pill pill-paper h-12 gap-2 px-6 text-[14px] font-semibold">
							Get started
							<ArrowRight className="h-4 w-4" strokeWidth={2.25} />
						</a>
						<a
							href="https://discord.gg/jtctcY2pvs"
							target="_blank"
							rel="noopener noreferrer"
							className="pill pill-ghost-dark h-12 gap-2 px-6 text-[14px]"
						>
							Join Community
						</a>
					</div>
				</div>

				{/* Hairline — draws left to right */}
				<div className="hero-line mt-14 h-px bg-gradient-to-r from-white/[0.14] via-white/[0.06] to-transparent sm:mt-20" />
			</div>

			{/* Scroll indicator — absolute, doesn't affect layout, gone forever once scrolled */}
			<div
				className={`pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center transition-opacity duration-700 sm:bottom-6 ${gone ? "opacity-0" : "opacity-100"}`}
				aria-hidden="true"
			>
				<div className="scroll-indicator flex flex-col items-center gap-1.5">
					<span className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
						Scroll
					</span>
					<svg
						width="16"
						height="24"
						viewBox="0 0 16 24"
						fill="none"
						className="text-white/30"
						role="img"
						aria-label="Scroll indicator"
					>
						<rect
							x="5.5"
							y="0.5"
							width="5"
							height="9"
							rx="2.5"
							stroke="currentColor"
							strokeWidth="1"
						/>
						<line
							x1="8"
							y1="3"
							x2="8"
							y2="5"
							stroke="currentColor"
							strokeWidth="1"
							strokeLinecap="round"
							className="scroll-dot"
						/>
						<path
							d="M3 16l5 5 5-5"
							stroke="currentColor"
							strokeWidth="1"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════
   PHILOSOPHY - what Kura leaves behind vs. how Kura works
   ════════════════════════════════════════════════════════════ */

function Philosophy() {
	const legacy = [
		"Raw SQL stitched into script logic",
		"A giant mutable player object passed everywhere",
		"Critical logic hidden behind client events",
		"A database schema nobody owns or fully understands",
		"State scattered across memory, statebags, and DB",
	];
	const kura = [
		{
			icon: <Database className="h-3.5 w-3.5" />,
			t: "A typed ORM with generated Lua types and versioned migrations",
		},
		{
			icon: <Layers className="h-3.5 w-3.5" />,
			t: "One state surface, consistent wherever it lives",
		},
		{
			icon: <ShieldCheck className="h-3.5 w-3.5" />,
			t: "Server-authoritative by default. No exceptions.",
		},
		{
			icon: <GitBranch className="h-3.5 w-3.5" />,
			t: "A schema defined in code, not discovered in prod",
		},
		{
			icon: <Plug className="h-3.5 w-3.5" />,
			t: "No loose events. Modules define what they accept",
		},
	];

	return (
		<section id="legacy-vs-kura" className="relative px-4 pt-24 pb-12 sm:pt-32">
			<div className="relative mx-auto max-w-[1180px]">
				<div className="mx-auto max-w-2xl text-center" data-reveal>
					<p className="text-[10.5px] font-semibold tracking-[0.22em] text-white/45 uppercase">
						Why Kura exists
					</p>
					<h2 className="font-display mt-4 text-[clamp(2rem,5vw,3.4rem)] leading-[1.02] font-medium tracking-[-0.04em] text-white">
						<span className="text-accent-grad">
							Most FiveM frameworks <br />
							were built for a simpler time.
						</span>
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.7] text-white/55">
						Kura starts over with a single goal:{" "}
						<span className="text-white/85">make the safe path the easy path.</span> No invisible
						side effects, no mystery state, no SQL where it doesn't belong.
					</p>
				</div>

				<div className="relative mt-16">
					<div className="pointer-events-none absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/[0.12] to-transparent lg:block" />
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
						<div className="relative pr-0 lg:pr-10" data-reveal>
							<div className="grid gap-4 border-b border-white/[0.07] pb-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
								<div>
									<p className="font-mono text-[10.5px] tracking-[0.18em] text-white/42 uppercase">
										Legacy
									</p>
									<h3 className="font-display mt-4 max-w-sm text-[24px] leading-[1.08] font-medium tracking-[-0.02em] text-white/84">
										Patterns that keep old frameworks fragile.
									</h3>
								</div>
							</div>
							<ol data-reveal-stagger="0.06">
								{legacy.map((item, index) => (
									<li
										key={item}
										className="grid gap-4 border-b border-white/[0.06] py-5 last:border-b-0"
									>
										<div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
											<span className="font-mono text-[10.5px] tracking-[0.12em] text-white/28">
												0{index + 1}
											</span>
											<p className="text-[14px] leading-[1.7] text-white/54 line-through decoration-white/12 decoration-1">
												{item}
											</p>
										</div>
									</li>
								))}
							</ol>
						</div>

						<div className="relative pl-0 lg:pl-10" data-reveal>
							<div className="relative grid gap-4 border-b border-white/[0.08] pb-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
								<div>
									<div className="flex items-center gap-2.5 text-white/92">
										<svg
											viewBox="0 0 128 85"
											fill="currentColor"
											className="h-3 w-auto"
											aria-hidden="true"
										>
											<path d="M42.6701 42.4973C66.2352 42.4973 85.3385 61.5248 85.3385 84.9963L128 84.9981V83.9012C127.414 37.6447 89.7302 0.291897 43.2192 0L0 0.00194852V85H42.6684L42.6701 42.4973Z" />
											<circle cx="118" cy="10" r="10" />
										</svg>
										<p className="font-mono text-[10.5px] tracking-[0.18em] uppercase">Kura</p>
									</div>
									<h3 className="font-display mt-4 max-w-sm text-[24px] leading-[1.08] font-medium tracking-[-0.02em] text-white">
										The safe path is built into the architecture.
									</h3>
								</div>
							</div>
							<ol data-reveal-stagger="0.06">
								{kura.map((row, index) => (
									<li
										key={row.t}
										className="grid gap-4 border-b border-white/[0.07] py-5 last:border-b-0"
									>
										<div className="grid gap-4 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:items-center">
											<span className="font-mono text-[10.5px] tracking-[0.12em] text-white/34">
												0{index + 1}
											</span>
											<span className="text-white/72">{row.icon}</span>
											<p className="text-[14px] leading-[1.7] text-white/84">{row.t}</p>
										</div>
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════
   FEATURES — KuraDB hero + capability index
   ════════════════════════════════════════════════════════════ */

function Features() {
	const surfaces = [
		{
			name: "KuraDB",
			icon: <Database className="h-4 w-4" strokeWidth={1.6} />,
			copy: "Schemas in TypeScript, versioned migrations, generated Lua types. Queries compose from typed operators, not raw SQL strings.",
		},
		{
			name: "Orbit",
			icon: <LayoutDashboard className="h-4 w-4" strokeWidth={1.6} />,
			copy: "Players, logs, moderation, and incident response in one live web console your team actually keeps open.",
		},
		{
			name: "Kura State",
			icon: <Layers className="h-4 w-4" strokeWidth={1.6} />,
			copy: "One typed surface for memory, statebags, and the database. Health, money, jobs, inventory: same interface everywhere.",
		},
		{
			name: "Modules",
			icon: <Plug className="h-4 w-4" strokeWidth={1.6} />,
			copy: "Typed APIs between modules. No shared globals, no guessing what another resource exports.",
		},
		{
			name: "Anticheat",
			icon: <ShieldCheck className="h-4 w-4" strokeWidth={1.6} />,
			copy: "Designed server-authoritative from the ground up. The client never holds authority it shouldn't have.",
		},
		{
			name: "Kura UI",
			icon: <Code2 className="h-4 w-4" strokeWidth={1.6} />,
			copy: "Beautiful UI components designed for FiveM, with a runtime that handles the hard parts.",
		},
	];

	return (
		<section id="features" className="relative px-4 pt-16 pb-24 sm:pt-24">
			<div className="relative mx-auto max-w-[1180px]">
				{/* Section header — asymmetric, left-aligned */}
				<div
					className="grid items-end gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16"
					data-reveal
				>
					<div>
						<h2 className="font-display mt-4 max-w-[16ch] text-[clamp(2rem,5vw,3.6rem)] leading-[1] font-medium tracking-[-0.04em] text-white">
							<span className="text-accent-grad">Every surface, built on purpose.</span>
						</h2>
					</div>
					<p className="max-w-md text-[15px] leading-[1.75] text-white/55 lg:justify-self-end">
						Every layer designed to work with the others. No legacy baggage, no inherited debt from
						frameworks that just grew over time.
					</p>
				</div>

				{/* ── 3-col × 2-row editorial grid: icon + inline-title body copy ── */}
				<div
					className="mt-20 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-16"
					data-reveal-stagger="0.07"
				>
					{surfaces.map((s) => (
						<div key={s.name} className="group">
							<span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.02] text-accent-cool transition-colors duration-500 group-hover:border-white/20">
								{s.icon}
							</span>
							<p className="mt-6 max-w-[34ch] text-[14.5px] leading-[1.7] text-white/55">
								<span className="font-semibold text-white">{s.name}.</span> {s.copy}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function _KuraSymbol({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 24 24"
			className={className}
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			role="img"
			aria-label="Kura symbol"
		>
			<circle cx="12" cy="12" r="3.4" />
			<path d="M12 2.6v3.4M12 18v3.4M2.6 12h3.4M18 12h3.4" />
			<path d="M5 5l2.4 2.4M16.6 16.6l2.4 2.4M19 5l-2.4 2.4M7.4 16.6L5 19" opacity="0.5" />
		</svg>
	);
}

/* ════════════════════════════════════════════════════════════
   PERFORMANCE - large numbers (no fake "hot reload" stat)
   ════════════════════════════════════════════════════════════ */

function Performance() {
	const stats = [
		{
			value: "<0.7",
			unit: "ms",
			label: "Server resmon",
			sub: "full framework tick across all active modules",
		},
		{
			value: "<0.5",
			unit: "ms",
			label: "Client resmon",
			sub: "complete client framework cost per frame",
		},
		{
			value: "~40",
			unit: "MB",
			label: "Memory usage",
			sub: "across production deployments",
		},
		{
			value: "~4",
			unit: "ms",
			label: "DB query latency",
			sub: "KuraDB to PostgreSQL execution, full round-trip",
		},
	];
	return (
		<section className="relative px-4 pt-28 pb-24 sm:pt-36">
			<div className="relative mx-auto max-w-[1180px]">
				<div className="grid items-end gap-10 lg:grid-cols-2" data-reveal>
					<div>
						<h2 className="font-display mt-4 max-w-xl text-[clamp(2rem,5vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em] text-white">
							<span className="text-accent-grad">Numbers that stay quiet under load.</span>
						</h2>
					</div>
					<p className="max-w-md text-[15px] leading-[1.75] text-white/55 lg:justify-self-end">
						Estimated targets from development builds, not verified production data. We'll update
						these as Kura ships and real numbers come in.
					</p>
				</div>

				<div className="mt-14" data-reveal>
					<div
						className="overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-white/[0.015]"
						data-reveal-stagger="0.09"
					>
						{stats.map((s, i) => (
							<div
								key={s.label}
								className={`group relative grid gap-4 px-6 py-6 transition-colors duration-500 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-10 sm:px-8 lg:grid-cols-[minmax(0,2fr)_auto_minmax(0,2fr)] lg:items-center ${
									i !== stats.length - 1 ? "border-b border-white/[0.06]" : ""
								}`}
							>
								<div
									className="pointer-events-none absolute inset-y-0 left-0 w-28 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
									style={{
										background: "linear-gradient(90deg, oklch(0.62 0.22 295 / 0.16), transparent)",
									}}
								/>
								<div className="relative">
									<p className="text-[11px] font-semibold tracking-[0.18em] text-white/40 uppercase">
										{s.label}
									</p>
									<p className="mt-2 max-w-sm text-[13px] leading-[1.65] text-white/50">{s.sub}</p>
								</div>
								<p className="font-display relative flex items-baseline gap-1 leading-none tracking-[-0.045em] text-white sm:justify-self-end lg:justify-self-center">
									<span className="text-[40px] font-medium sm:text-[54px]">{s.value}</span>
									<span className="text-[16px] font-medium text-white/50 sm:text-[20px]">
										{s.unit}
									</span>
								</p>
								<div className="relative hidden h-px bg-gradient-to-r from-white/[0.14] via-white/[0.05] to-transparent lg:block" />
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════
   INSTALL - midnight, hairline, recipe-first
   ════════════════════════════════════════════════════════════ */

function Install() {
	const [copied, setCopied] = useState(false);
	const url = "https://raw.githubusercontent.com/projectkura/txAdminRecipe/main/kura.yaml";
	const doCopy = () => {
		navigator.clipboard.writeText(url).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	const steps = [
		{
			n: "01",
			t: "Open txAdmin",
			d: "Start the server setup wizard and choose Remote URL Template as your deployment type.",
		},
		{
			n: "02",
			t: "Paste the recipe URL",
			d: "Drop in the Kura recipe and let the wizard fetch every module in order.",
		},
		{
			n: "03",
			t: "Deploy",
			d: "Your server spins up with everything configured. Follow the docs to take it further.",
		},
	];

	return (
		<section id="install" className="relative px-4 pt-28 pb-24 sm:pt-36">
			<div className="relative mx-auto max-w-[1180px]">
				{/* Section header — mirrors Performance / Features rhythm */}
				<div className="grid items-end gap-10 lg:grid-cols-2" data-reveal>
					<div>
						<h2 className="font-display mt-4 max-w-xl text-[clamp(2rem,5vw,3.6rem)] leading-[1] font-medium tracking-[-0.035em] text-white">
							<span className="text-accent-grad">
								From zero to server
								<br />
								in minutes.
							</span>
						</h2>
					</div>
					<p className="max-w-md text-[15px] leading-[1.75] text-white/55 lg:justify-self-end">
						You've spent enough time fighting your framework. Kura gets out of your way from minute
						one.
					</p>
				</div>

				{/* Recipe URL strip — the primary action sits on a hairline rail */}
				<div
					className="mt-14 overflow-hidden rounded-[2rem] border border-white/[0.07] bg-white/[0.015]"
					data-reveal
				>
					<div className="grid gap-4 px-5 py-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:px-6">
						<span className="font-mono text-[10.5px] tracking-[0.18em] text-white/40 uppercase">
							recipe.yaml
						</span>
						<code className="min-w-0 truncate font-mono text-[12.5px] text-white/75">{url}</code>
						<button
							type="button"
							onClick={doCopy}
							aria-live="polite"
							className="pill pill-paper h-10 gap-1.5 px-4 text-[12px] font-semibold"
						>
							{copied ? (
								<>
									<Check className="h-3.5 w-3.5" strokeWidth={2.5} />
									Copied
								</>
							) : (
								<>
									<Copy className="h-3.5 w-3.5" strokeWidth={2} />
									Copy URL
								</>
							)}
						</button>
					</div>

					{/* Steps rail — three rows, hairline-divided, mirroring Performance */}
					<ol className="border-t border-white/[0.06]" data-reveal-stagger="0.1">
						{steps.map((s, i) => (
							<li
								key={s.n}
								className={`group relative grid gap-5 px-5 py-6 transition-colors duration-500 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center sm:gap-8 sm:px-6 ${
									i !== steps.length - 1 ? "border-b border-white/[0.06]" : ""
								}`}
							>
								<div
									className="pointer-events-none absolute inset-y-0 left-0 w-32 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
									style={{
										background: "linear-gradient(90deg, oklch(0.62 0.22 295 / 0.14), transparent)",
									}}
								/>
								<span className="font-display relative inline-flex h-11 items-center text-[clamp(1.6rem,2.4vw,2rem)] font-medium tracking-[-0.035em] text-white/80">
									{s.n}
								</span>
								<div className="relative">
									<h3 className="text-[15.5px] font-semibold tracking-[-0.01em] text-white">
										{s.t}
									</h3>
									<p className="mt-1.5 max-w-xl text-[13.5px] leading-[1.7] text-white/55">{s.d}</p>
								</div>
							</li>
						))}
					</ol>
				</div>

				{/* Trailing CTAs — keep the docs as the obvious next step */}
				<div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
					<a href="/docs" className="pill pill-paper h-12 gap-2 px-6 text-[14px] font-semibold">
						Read the docs
						<ArrowRight className="h-4 w-4" strokeWidth={2.25} />
					</a>
					<a
						href="https://github.com/projectkura/txAdminRecipe"
						target="_blank"
						rel="noopener noreferrer"
						className="pill pill-ghost-dark h-12 gap-2 px-6 text-[14px]"
					>
						<GithubIcon className="h-4 w-4" />
						Recipe source
					</a>
				</div>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════
   FINAL CTA
   ════════════════════════════════════════════════════════════ */

function FinalCTA() {
	return (
		<section className="relative overflow-hidden px-4 py-32 lg:py-40">
			<div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

			<div className="relative mx-auto max-w-[1180px] text-center" data-reveal>
				<h2 className="font-display mx-auto max-w-[18ch] text-[clamp(2.4rem,7vw,5.4rem)] leading-[0.95] font-medium tracking-[-0.04em] text-white">
					<span className="text-accent-grad">Build the server you've always wanted.</span>
				</h2>
				<p className="mx-auto mt-7 max-w-lg text-[15.5px] leading-[1.7] text-white/55">
					Spin up Kura in minutes and start building. The docs have everything your team needs to
					hit the ground running.
				</p>
				<div className="mt-10 flex flex-wrap items-center justify-center gap-3">
					<a href="/docs" className="pill pill-paper h-12 gap-2 px-6 text-[14px] font-semibold">
						Get started
						<ArrowRight className="h-4 w-4" strokeWidth={2.25} />
					</a>
					<a
						href="https://github.com/projectkura"
						target="_blank"
						rel="noopener noreferrer"
						className="pill pill-ghost-dark h-12 gap-2 px-6 text-[14px]"
					>
						<GithubIcon className="h-4 w-4" />
						View on GitHub
					</a>
				</div>
			</div>
		</section>
	);
}

/* ════════════════════════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════════════════════════ */

function Footer() {
	return (
		<footer className="relative px-4 pb-12">
			<div className="mx-auto max-w-[1180px]">
				<div className="border-t border-white/[0.08] pt-10 sm:pt-12">
					<div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
						<div>
							<div className="flex items-center gap-2.5">
								<KuraMark />
								<span className="font-display text-[16px] font-semibold tracking-tight text-white">
									Kura
								</span>
							</div>
							<p className="mt-4 max-w-sm text-[14px] leading-[1.7] text-white/50">
								A modern framework for FiveM. Made by{" "}
								<a
									href="https://walteria.net"
									target="_blank"
									rel="noopener noreferrer"
									className="text-white/85 underline decoration-white/20 underline-offset-4 transition hover:decoration-white"
								>
									Walteria.net
								</a>
								.
							</p>
							<a
								href="/docs"
								className="pill pill-paper mt-7 h-10 gap-2 px-5 text-[13px] font-semibold"
							>
								Read Docs
								<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
							</a>
						</div>

						<div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
							<FooterCol
								title="Product"
								links={[
									{ l: "Features", h: "#features" },
									{ l: "Why Kura", h: "#legacy-vs-kura" },
									{ l: "Install", h: "#install" },
								]}
							/>
							<FooterCol
								title="Resources"
								links={[
									{ l: "Documentation", h: "/docs" },
									{ l: "GitHub", h: "https://github.com/projectkura", e: true },
									{
										l: "Hosting",
										h: "https://billing.1of1servers.com/aff.php?aff=264",
										e: true,
									},
								]}
							/>
							<FooterCol
								title="Project"
								links={[
									{ l: "Orbit", h: "https://orbit.walteria.net", e: true },
									{ l: "Discord", h: "https://discord.gg/jtctcY2pvs", e: true },
									{
										l: "Imprint",
										h: "https://rotationracing.eu/imprint",
										e: true,
									},
								]}
							/>
						</div>
					</div>

					<div className="mt-12 border-t border-white/[0.06] pt-8">
						<div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
							<div className="space-y-4">
								<p className="text-[11.5px] text-white/40">
									© {new Date().getFullYear()} Project Kura · All rights reserved.
								</p>
								<p className="max-w-sm text-[11.5px] leading-[1.65] text-white/46">
									Project Kura is owned, developed, and maintained by Walteria.net, part of
									RotationRacing.eu, with support from the wider community. Website by
									RotationRacing.eu.
								</p>
							</div>

							<div className="space-y-4 border-t border-white/[0.04] pt-5 md:border-t-0 md:pt-0">
								<p className="text-[11.5px] leading-[1.65] text-white/48">
									Licensed primarily under AGPL 3.0 and LGPL 3.0. Licensing may vary per product, so
									check each component before use.
								</p>
								<p className="text-[11.5px] leading-[1.65] text-white/48">
									Intended for entertainment and educational purposes only. Use at your own risk.
									Walteria.net assumes no liability for damages arising from use.
								</p>
								<p className="text-[11.5px] leading-[1.65] text-white/40">
									Not affiliated with Take-Two Interactive, Rockstar Games, Cfx.re, or other rights
									holders. All trademarks belong to their respective owners.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

function FooterCol({
	title,
	links,
}: {
	title: string;
	links: { l: string; h: string; e?: boolean }[];
}) {
	return (
		<div>
			<p className="text-[10.5px] font-semibold tracking-[0.2em] text-white/55 uppercase">
				{title}
			</p>
			<ul className="mt-5 space-y-3">
				{links.map((link) => (
					<li key={link.l}>
						<a
							href={link.h}
							target={link.e ? "_blank" : undefined}
							rel={link.e ? "noopener noreferrer" : undefined}
							className="text-[13.5px] text-white/70 transition hover:text-white"
						>
							{link.l}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
}
