import { i as __toESM } from "../_runtime.mjs";
import { o as logout } from "./api-client-CwhjhSev.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as Outlet, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as LayoutDashboard, D as Lock, O as LoaderCircle, R as Eye, X as Building2, Z as Bot, g as ScrollText, j as KeyRound, r as User, z as EyeOff } from "../_libs/lucide-react.mjs";
import { t as DashboardShell } from "./shell-DqMou3Zp.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CgbBXfWw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/admin",
		label: "Ringkasan",
		icon: LayoutDashboard
	},
	{
		to: "/admin/tenants",
		label: "Tenant",
		icon: Building2
	},
	{
		to: "/admin/licenses",
		label: "Lisensi",
		icon: KeyRound
	},
	{
		to: "/admin/audit",
		label: "Catatan Aktivitas",
		icon: ScrollText
	}
];
function AdminLayout() {
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
	const [showLogin, setShowLogin] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			if (sessionStorage.getItem("balasin_admin_auth") === "true") setIsAuthenticated(true);
			else setShowLogin(true);
		} catch {
			setShowLogin(true);
		}
	}, []);
	if (!isAuthenticated && showLogin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, { onLogin: () => setIsAuthenticated(true) });
	if (!isAuthenticated) return null;
	const handleLogout = () => {
		try {
			sessionStorage.removeItem("balasin_admin_auth");
		} catch {}
		try {
			logout();
		} catch {}
		setIsAuthenticated(false);
		setShowLogin(true);
	};
	const handleBackToHome = () => {
		try {
			sessionStorage.removeItem("balasin_admin_auth");
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		title: "Balasin Admin",
		subtitle: "Panel platform",
		items,
		onLogout: handleLogout,
		onBackToHome: handleBackToHome,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app",
				className: "group flex w-full items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-3 py-2.5 text-xs font-semibold text-emerald-100 transition-all duration-300 hover:border-emerald-400/80 hover:bg-emerald-900/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.4),0_0_10px_rgba(16,185,129,0.2)] hover:transform hover:translate-y-[-2px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent",
					children: "Beralih ke tenant"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "transition-transform duration-300 ease-out group-hover:translate-x-1.5",
					children: "→"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: handleLogout,
				className: "text-xs text-muted-foreground hover:text-foreground",
				children: "Keluar →"
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
function AdminLogin({ onLogin }) {
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			try {
				sessionStorage.setItem("balasin_admin_auth", "true");
			} catch {}
			setIsLoading(false);
			onLogin();
		}, 1500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0f14] px-4 font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-[-10%] left-[-10%] h-[50%] w-[50%] animate-pulse rounded-full bg-emerald-500/10 blur-[120px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] animate-pulse rounded-full bg-emerald-500/10 blur-[120px] [animation-delay:2s]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "backdrop-blur-md bg-slate-900/60 border border-emerald-500/20 shadow-2xl rounded-2xl overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center text-center mb-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-14 items-center justify-center rounded-2xl bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)] mb-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-8 text-[#0a0f14]" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-2xl font-bold tracking-tight text-white mb-2",
										children: "Balasin Admin Panel"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-emerald-500/70",
										children: "Otorisasi diperlukan untuk mengakses sistem"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit,
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "username",
											className: "text-xs font-semibold uppercase tracking-wider text-emerald-500/50 ml-1",
											children: "Username"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative group",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-emerald-500/30 group-focus-within:text-emerald-500 transition-colors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "username",
												type: "text",
												placeholder: "admin",
												required: true,
												value: username,
												onChange: (e) => setUsername(e.target.value),
												className: "bg-black/40 border-emerald-500/10 pl-10 focus-visible:ring-emerald-500 focus-visible:border-emerald-500/50 text-white placeholder:text-white/10"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "password",
											className: "text-xs font-semibold uppercase tracking-wider text-emerald-500/50 ml-1",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative group",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-emerald-500/30 group-focus-within:text-emerald-500 transition-colors" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "password",
													type: showPassword ? "text" : "password",
													placeholder: "••••••••",
													required: true,
													value: password,
													onChange: (e) => setPassword(e.target.value),
													className: "bg-black/40 border-emerald-500/10 pl-10 pr-10 focus-visible:ring-emerald-500 focus-visible:border-emerald-500/50 text-white placeholder:text-white/10"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setShowPassword(!showPassword),
													className: "absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500/30 hover:text-emerald-500 transition-colors",
													children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: isLoading,
										className: "w-full relative overflow-hidden h-11 bg-emerald-500 hover:bg-emerald-400 text-[#0a0f14] font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all group active:scale-[0.98]",
										children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Masuk ke Panel Admin", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" })] })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/",
									className: "group flex items-center gap-2 text-xs font-semibold text-sky-200 transition-all duration-300 hover:text-sky-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-8 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-950/30 shadow-[0_0_10px_rgba(56,189,248,0.1)] transition-all group-hover:-translate-x-1 group-hover:border-sky-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]",
										children: "←"
									}), "Kembali ke beranda"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app",
									className: "group flex items-center gap-2 text-xs font-semibold text-emerald-200 transition-all duration-300 hover:text-emerald-400",
									children: ["Dashboard Tenant →", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-950/30 shadow-[0_0_10px_rgba(16,185,129,0.1)] transition-all group-hover:translate-x-1 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]",
										children: "→"
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-emerald-500/5 py-4 px-8 border-t border-emerald-500/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-center text-emerald-500/40 uppercase tracking-[0.2em]",
							children: "Secure Encryption Active • v2.4.0"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      ` })
		]
	});
}
//#endregion
export { AdminLayout as component };
