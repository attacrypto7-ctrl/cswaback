import { t as cn } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-pill-DExz6KRY.js
var import_jsx_runtime = require_jsx_runtime();
var toneMap = {
	success: "bg-success/12 text-success border-success/30",
	warning: "bg-warning/12 text-warning border-warning/30",
	danger: "bg-destructive/12 text-destructive border-destructive/30",
	info: "bg-info/12 text-info border-info/30",
	muted: "bg-muted text-muted-foreground border-border"
};
function StatusPill({ label, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize", toneMap[tone]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current" }), label]
	});
}
function toneForLicense(status) {
	if (status === "aktif") return "success";
	if (status === "expired") return "warning";
	if (status === "revoked") return "danger";
	return "muted";
}
function toneForWa(status) {
	if (status === "tersambung") return "success";
	if (status === "memindai") return "info";
	return "danger";
}
//#endregion
export { toneForLicense as n, toneForWa as r, StatusPill as t };
