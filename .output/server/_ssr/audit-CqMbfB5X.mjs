import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { s as getAuditLog } from "./api-RbxyrTLn.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-CqMbfB5X.js
var import_jsx_runtime = require_jsx_runtime();
function AuditPage() {
	const { data: entries = [] } = useQuery({
		queryKey: ["audit"],
		queryFn: getAuditLog
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Catatan Aktivitas",
		description: "Siapa mengubah apa dan kapan — penting untuk platform yang menjual akses."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
		className: "panel divide-y divide-border",
		children: [entries.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-wrap items-center justify-between gap-2 px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-medium",
				children: [
					e.aksi,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: ["— ", e.target]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: e.aktor
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted-foreground",
				children: e.waktu
			})]
		}, e.id)), entries.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "py-10 text-center text-sm text-muted-foreground",
			children: "Belum ada catatan aktivitas admin."
		})]
	})] });
}
//#endregion
export { AuditPage as component };
