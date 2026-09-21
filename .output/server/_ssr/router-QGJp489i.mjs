import { i as __toESM } from "../_runtime.mjs";
import { t as getGoogleUser } from "./google-auth-nyx-VcMZ.mjs";
import { i as getToken, r as getRole } from "./api-client-CwhjhSev.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, k as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$18 } from "./tenants._tenantId-D0_cTeaX.mjs";
import { t as GoogleOAuthProvider } from "../_libs/react-oauth__google.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-QGJp489i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-2FBUwh81.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error("TANSTACK_ROOT_ERROR:", error);
	if (error?.stack) console.error("TANSTACK_ROOT_ERROR_STACK:", error.stack);
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				error?.message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 max-h-32 overflow-auto rounded bg-destructive/10 p-2 text-left font-mono text-xs text-destructive",
					children: error.message
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							reset();
							window.location.reload();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Balasin — Platform CS AI WhatsApp Multi-Tenant" },
			{
				name: "description",
				content: "Hubungkan WhatsApp bisnis Anda ke AI yang membalas chat pelanggan otomatis dari FAQ sendiri."
			},
			{
				name: "author",
				content: "Balasin"
			},
			{
				property: "og:title",
				content: "Balasin — Platform CS AI WhatsApp"
			},
			{
				property: "og:description",
				content: "Balas chat pelanggan otomatis dengan AI yang paham data bisnis Anda."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/chatbot_wa.png",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "id",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	const googleClientId = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/"
	}["VITE_GOOGLE_CLIENT_ID"] || "placeholder";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleOAuthProvider, {
		clientId: googleClientId,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
			client: queryClient,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-center",
				richColors: true
			})]
		})
	});
}
var $$splitComponentImporter$16 = () => import("./routes-DH0Y7iVA.mjs");
var Route$16 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Balasin — CS AI WhatsApp untuk Banyak Bisnis" },
		{
			name: "description",
			content: "Platform multi-tenant untuk membalas chat WhatsApp pelanggan secara otomatis dengan AI dan FAQ bisnis Anda sendiri."
		},
		{
			property: "og:title",
			content: "Balasin — CS AI WhatsApp untuk Banyak Bisnis"
		},
		{
			property: "og:description",
			content: "Sambungkan WhatsApp lewat QR, unggah FAQ, dan biarkan AI menjawab pelanggan 24 jam dengan jawaban yang Anda kendalikan."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./route-CgbBXfWw.mjs");
var Route$15 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./route-BdW_Tf93.mjs");
var Route$14 = createFileRoute("/app")({
	beforeLoad: () => {
		try {
			if (!getGoogleUser()) throw redirect({ to: "/" });
		} catch (e) {
			if (e && typeof e === "object" && "statusCode" in e) throw e;
			return;
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./masuk-CtQ2ZzrO.mjs");
var Route$13 = createFileRoute("/masuk")({
	beforeLoad: () => {
		if (getToken()) {
			const role = getRole();
			throw redirect({ to: role === "admin" ? "/admin" : "/app" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin-DwBYOhg8.mjs");
var Route$12 = createFileRoute("/admin/")({
	head: () => ({ meta: [
		{ title: "Ringkasan Platform — Balasin Admin" },
		{
			name: "description",
			content: "Pantau tenant, lisensi, dan volume chat seluruh platform."
		},
		{
			property: "og:title",
			content: "Ringkasan Platform — Balasin Admin"
		},
		{
			property: "og:description",
			content: "Pantau tenant, lisensi, dan volume chat platform."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./audit-CqMbfB5X.mjs");
var Route$11 = createFileRoute("/admin/audit")({
	head: () => ({ meta: [
		{ title: "Catatan Aktivitas — Balasin Admin" },
		{
			name: "description",
			content: "Riwayat tindakan admin: pembuatan lisensi, pencabutan, dan perubahan masa berlaku."
		},
		{
			property: "og:title",
			content: "Catatan Aktivitas — Balasin Admin"
		},
		{
			property: "og:description",
			content: "Riwayat tindakan admin pada lisensi dan tenant."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./licenses-D5SQ7nvS.mjs");
var Route$10 = createFileRoute("/admin/licenses")({
	head: () => ({ meta: [
		{ title: "Lisensi — Balasin Admin" },
		{
			name: "description",
			content: "Buat, tinjau, dan cabut kode lisensi tenant beserta masa berlaku dan kuotanya."
		},
		{
			property: "og:title",
			content: "Lisensi — Balasin Admin"
		},
		{
			property: "og:description",
			content: "Buat dan kelola kode lisensi tenant."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./app-BHskhwZK.mjs");
var Route$9 = createFileRoute("/app/")({
	head: () => ({ meta: [
		{ title: "Ringkasan Bot — Dashboard Balasin" },
		{
			name: "description",
			content: "Status bot WhatsApp, sisa lisensi, dan chat yang perlu ditangani manusia."
		},
		{
			property: "og:title",
			content: "Ringkasan Bot — Dashboard Balasin"
		},
		{
			property: "og:description",
			content: "Status bot WhatsApp dan chat yang perlu ditangani."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./analitik-D_eM6bdD.mjs");
var Route$8 = createFileRoute("/app/analitik")({
	head: () => ({ meta: [
		{ title: "Analitik — Dashboard Balasin" },
		{
			name: "description",
			content: "Statistik pesan, efisiensi AI, dan pertanyaan terpopuler dari pelanggan."
		},
		{
			property: "og:title",
			content: "Analitik — Dashboard Balasin"
		},
		{
			property: "og:description",
			content: "Statistik pesan dan efisiensi AI bot."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./balas-chat-D5dbLgpy.mjs");
var Route$7 = createFileRoute("/app/balas-chat")({
	head: () => ({ meta: [
		{ title: "Balas Chat Otomatis — Dashboard Balasin" },
		{
			name: "description",
			content: "Atur gaya bahasa, mesin AI, dan ambang alih ke manusia untuk balasan chat otomatis."
		},
		{
			property: "og:title",
			content: "Balas Chat Otomatis — Dashboard Balasin"
		},
		{
			property: "og:description",
			content: "Atur gaya bahasa dan mesin AI untuk balasan chat otomatis."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./balas-iklan-E9Q9aMAz.mjs");
var Route$6 = createFileRoute("/app/balas-iklan")({
	head: () => ({ meta: [
		{ title: "Balas Iklan Otomatis — Dashboard Balasin" },
		{
			name: "description",
			content: "Atur pertanyaan dari iklan Facebook dan rangkaian balasan (teks & gambar) yang dikirim persis sama tiap kali."
		},
		{
			property: "og:title",
			content: "Balas Iklan Otomatis — Dashboard Balasin"
		},
		{
			property: "og:description",
			content: "Rangkaian balasan teks & gambar untuk chat dari iklan."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./lisensi-CGPgHkIJ.mjs");
var Route$5 = createFileRoute("/app/lisensi")({
	head: () => ({ meta: [
		{ title: "Lisensi Tenant — Dashboard Balasin" },
		{
			name: "description",
			content: "Informasi masa berlaku paket, kuota chat, dan status aktivasi lisensi Anda."
		},
		{
			property: "og:title",
			content: "Lisensi Tenant — Dashboard Balasin"
		},
		{
			property: "og:description",
			content: "Informasi lisensi dan kuota bot WhatsApp."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./pengetahuan-Bgj3tzXG.mjs");
var Route$4 = createFileRoute("/app/pengetahuan")({
	head: () => ({ meta: [
		{ title: "Basis Pengetahuan — Dashboard Balasin" },
		{
			name: "description",
			content: "Unggah dokumen dan tulis FAQ yang jadi sumber jawaban bot WhatsApp Anda."
		},
		{
			property: "og:title",
			content: "Basis Pengetahuan — Dashboard Balasin"
		},
		{
			property: "og:description",
			content: "Unggah dokumen dan tulis FAQ sumber jawaban bot."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./percakapan-C7I3-kZs.mjs");
var Route$3 = createFileRoute("/app/percakapan")({
	head: () => ({ meta: [
		{ title: "Riwayat Chat — Dashboard Balasin" },
		{
			name: "description",
			content: "Pantau percakapan bot dengan pelanggan dan ambil alih jika diperlukan."
		},
		{
			property: "og:title",
			content: "Riwayat Chat — Dashboard Balasin"
		},
		{
			property: "og:description",
			content: "Pantau log percakapan WhatsApp pelanggan."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./uji-coba-CCj6QV-Y.mjs");
var Route$2 = createFileRoute("/app/uji-coba")({
	head: () => ({ meta: [
		{ title: "Uji Coba Bot — Dashboard Balasin" },
		{
			name: "description",
			content: "Simulasi percakapan dengan bot AI Anda sebelum dihubungkan ke WhatsApp pelanggan asli."
		},
		{
			property: "og:title",
			content: "Uji Coba Bot — Dashboard Balasin"
		},
		{
			property: "og:description",
			content: "Simulasi percakapan bot AI."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./whatsapp-Blouf50D.mjs");
var Route$1 = createFileRoute("/app/whatsapp")({
	head: () => ({ meta: [
		{ title: "Koneksi WhatsApp — Dashboard Balasin" },
		{
			name: "description",
			content: "Sambungkan nomor WhatsApp lewat QR code dan pantau statusnya secara langsung."
		},
		{
			property: "og:title",
			content: "Koneksi WhatsApp — Dashboard Balasin"
		},
		{
			property: "og:description",
			content: "Sambungkan nomor WhatsApp lewat QR code dan pantau statusnya."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./tenants.index-D9gM8O90.mjs");
var Route = createFileRoute("/admin/tenants/")({
	head: () => ({ meta: [
		{ title: "Daftar Tenant — Balasin Admin" },
		{
			name: "description",
			content: "Kelola seluruh bisnis yang memakai platform CS AI."
		},
		{
			property: "og:title",
			content: "Daftar Tenant — Balasin Admin"
		},
		{
			property: "og:description",
			content: "Kelola seluruh bisnis yang memakai platform CS AI."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var AdminRouteRoute = Route$15.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$17
});
var AppRouteRoute = Route$14.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$17
});
var MasukRoute = Route$13.update({
	id: "/masuk",
	path: "/masuk",
	getParentRoute: () => Route$17
});
var AdminIndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRouteRoute
});
var AdminAuditRoute = Route$11.update({
	id: "/audit",
	path: "/audit",
	getParentRoute: () => AdminRouteRoute
});
var AdminLicensesRoute = Route$10.update({
	id: "/licenses",
	path: "/licenses",
	getParentRoute: () => AdminRouteRoute
});
var AppIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRouteRoute
});
var AppAnalitikRoute = Route$8.update({
	id: "/analitik",
	path: "/analitik",
	getParentRoute: () => AppRouteRoute
});
var AppBalasChatRoute = Route$7.update({
	id: "/balas-chat",
	path: "/balas-chat",
	getParentRoute: () => AppRouteRoute
});
var AppBalasIklanRoute = Route$6.update({
	id: "/balas-iklan",
	path: "/balas-iklan",
	getParentRoute: () => AppRouteRoute
});
var AppLisensiRoute = Route$5.update({
	id: "/lisensi",
	path: "/lisensi",
	getParentRoute: () => AppRouteRoute
});
var AppPengetahuanRoute = Route$4.update({
	id: "/pengetahuan",
	path: "/pengetahuan",
	getParentRoute: () => AppRouteRoute
});
var AppPercakapanRoute = Route$3.update({
	id: "/percakapan",
	path: "/percakapan",
	getParentRoute: () => AppRouteRoute
});
var AppUjiCobaRoute = Route$2.update({
	id: "/uji-coba",
	path: "/uji-coba",
	getParentRoute: () => AppRouteRoute
});
var AppWhatsappRoute = Route$1.update({
	id: "/whatsapp",
	path: "/whatsapp",
	getParentRoute: () => AppRouteRoute
});
var AdminTenantsIndexRoute = Route.update({
	id: "/tenants/",
	path: "/tenants/",
	getParentRoute: () => AdminRouteRoute
});
var AdminRouteRouteChildren = {
	AdminAuditRoute,
	AdminLicensesRoute,
	AdminIndexRoute,
	AdminTenantsTenantIdRoute: Route$18.update({
		id: "/tenants/$tenantId",
		path: "/tenants/$tenantId",
		getParentRoute: () => AdminRouteRoute
	}),
	AdminTenantsIndexRoute
};
var AdminRouteRouteWithChildren = AdminRouteRoute._addFileChildren(AdminRouteRouteChildren);
var AppRouteRouteChildren = {
	AppAnalitikRoute,
	AppBalasChatRoute,
	AppBalasIklanRoute,
	AppLisensiRoute,
	AppPengetahuanRoute,
	AppPercakapanRoute,
	AppUjiCobaRoute,
	AppWhatsappRoute,
	AppIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRouteRoute: AdminRouteRouteWithChildren,
	AppRouteRoute: AppRouteRoute._addFileChildren(AppRouteRouteChildren),
	MasukRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
