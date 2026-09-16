import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { h as Search } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { i as formatNumber, m as getTenants, r as formatDate } from "./api-RbxyrTLn.mjs";
import { t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tenants.index-D9gM8O90.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TenantsPage() {
	const { data: tenants = [] } = useQuery({
		queryKey: ["tenants"],
		queryFn: getTenants
	});
	const [q, setQ] = (0, import_react.useState)("");
	const hasil = tenants.filter((t) => `${t.nama} ${t.industri} ${t.email}`.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Tenant",
		description: "Semua bisnis yang terdaftar beserta pemakaian dan masa lisensinya.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute top-2.5 left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Cari nama atau industri...",
				className: "pl-9"
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Bisnis" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Paket" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nomor WA" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "min-w-44",
				children: "Pemakaian chat"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Lisensi berakhir" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [hasil.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/tenants/$tenantId",
				params: { tenantId: t.id },
				className: "font-medium hover:text-primary",
				children: t.nama
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					t.industri,
					" · ",
					t.email
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.plan }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.nomorWa }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: t.chatBulanIni / t.kuotaChat * 100,
				className: "h-1.5"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					formatNumber(t.chatBulanIni),
					" / ",
					formatNumber(t.kuotaChat)
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(t.lisensiBerakhir) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
				label: t.status,
				tone: t.status === "aktif" ? "success" : "danger"
			}) })
		] }, t.id)), hasil.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			colSpan: 6,
			className: "py-10 text-center text-sm text-muted-foreground",
			children: "Tidak ada tenant yang cocok."
		}) }) : null] })] })
	})] });
}
//#endregion
export { TenantsPage as component };
