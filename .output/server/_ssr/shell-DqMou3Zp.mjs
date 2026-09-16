import { i as __toESM } from "../_runtime.mjs";
import { n as handleLogout, t as getGoogleUser } from "./google-auth-nyx-VcMZ.mjs";
import { t as API_BASE } from "./api-client-CwhjhSev.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { K as ChevronDown, N as House, T as LogOut, i as UserPlus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-DqMou3Zp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardShell({ title, subtitle, items, footer, onLogout, onBackToHome }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [googleUser, setGoogleUser] = (0, import_react.useState)(null);
	const [imgError, setImgError] = (0, import_react.useState)(false);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const timeoutRef = (0, import_react.useRef)(null);
	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setIsOpen(true);
	};
	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, 200);
	};
	(0, import_react.useEffect)(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			setGoogleUser(getGoogleUser());
			setImgError(false);
		};
		sync();
		window.addEventListener("balasin:auth-changed", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("balasin:auth-changed", sync);
			window.removeEventListener("storage", sync);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		setImgError(false);
	}, [googleUser?.avatarUrl, googleUser?.picture]);
	const handleLogoutClick = () => {
		handleLogout();
		setGoogleUser(null);
		if (onLogout) onLogout();
	};
	const avatarSrc = googleUser?.avatarUrl || googleUser?.picture || null;
	const initials = googleUser ? googleUser.name.split(" ").map((p) => p.charAt(0).toUpperCase()).slice(0, 2).join("") || "?" : "?";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 md:flex",
			children: [
				googleUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mb-8",
					onMouseEnter: handleMouseEnter,
					onMouseLeave: handleMouseLeave,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "flex w-full cursor-pointer items-center gap-3 px-2 text-left transition-opacity hover:opacity-80 focus-visible:outline-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative shrink-0",
								children: [avatarSrc && !imgError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: avatarSrc,
									alt: "Google Profile",
									referrerPolicy: "no-referrer",
									onError: () => setImgError(true),
									className: "w-10 h-10 rounded-full object-cover border border-emerald-500/30"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex w-10 h-10 rounded-full items-center justify-center border border-emerald-500/30 bg-emerald-500/15 text-xs font-bold text-emerald-200",
									children: initials
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-background" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1 leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-semibold text-sidebar-foreground",
									children: googleUser.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-xs text-muted-foreground max-w-[130px]",
									children: googleUser.email
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground" })
						]
					}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-full left-0 pt-2 z-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-64 rounded-md border bg-popover p-1 shadow-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-2 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold leading-none",
										children: googleUser.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground truncate mt-1",
										children: googleUser.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "-mx-1 my-1 h-px bg-muted" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setIsOpen(false);
										window.open(`${API_BASE}/auth/google`, "google_oauth", "width=500,height=600,left=200,top=100");
									},
									className: "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }), "Tambahkan akun lain"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: handleLogoutClick,
									className: "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent text-red-600 focus:text-red-600 hover:text-red-600",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Log Out / Keluar"]
								})
							]
						})
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col gap-1",
					children: items.map((item) => {
						const active = pathname === item.to || item.to !== "/admin" && item.to !== "/app" && pathname.startsWith(item.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("size-4", active && "text-primary") }), item.label]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex flex-col gap-2.5 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						onClick: onBackToHome,
						className: "group flex w-full items-center justify-between rounded-xl border border-sky-500/30 bg-sky-950/30 px-3 py-2.5 text-xs font-semibold text-sky-200 transition-all duration-300 hover:translate-y-[-2px] hover:border-sky-400/80 hover:bg-sky-900/40 hover:shadow-[0_0_18px_rgba(56,189,248,0.35)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-4 text-sky-400 transition-transform duration-300 ease-out group-hover:-translate-x-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kembali ke beranda" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sky-400/60 transition-transform duration-300 ease-out group-hover:-translate-x-1",
							children: "←"
						})]
					}), footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-sidebar-border pt-2.5",
						children: footer
					}) : null]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 overflow-x-auto border-b border-border bg-sidebar px-3 py-2 md:hidden",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground",
					activeProps: { className: "bg-sidebar-accent text-sidebar-accent-foreground" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-3.5" }), item.label]
				}, item.to))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "surface-grid min-h-screen px-5 py-8 md:px-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
function PageHeader({ title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "mb-8 flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold text-foreground md:text-3xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 max-w-2xl text-sm text-muted-foreground",
			children: description
		})] }), action]
	});
}
//#endregion
export { PageHeader as n, DashboardShell as t };
