import { t as cn } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stat-card-DC0iGpsc.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, hint, icon: Icon, tone = "default" }) {
	const toneClass = {
		default: "text-primary bg-primary/10",
		success: "text-success bg-success/10",
		warning: "text-warning bg-warning/10",
		danger: "text-destructive bg-destructive/10"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex size-8 items-center justify-center rounded-lg", toneClass),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-2xl font-semibold tracking-tight text-foreground",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
//#endregion
export { StatCard as t };
