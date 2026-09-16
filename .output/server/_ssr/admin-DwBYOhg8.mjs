import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as MessagesSquare, X as Building2, j as KeyRound, s as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { d as getLicenses, i as formatNumber, m as getTenants, n as daysLeft, r as formatDate } from "./api-RbxyrTLn.mjs";
import { t as StatCard } from "./stat-card-DC0iGpsc.mjs";
import { n as toneForLicense, t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DwBYOhg8.js
var import_jsx_runtime = require_jsx_runtime();
function AdminOverview() {
	const { data: tenants = [] } = useQuery({
		queryKey: ["tenants"],
		queryFn: getTenants
	});
	const { data: licenses = [] } = useQuery({
		queryKey: ["licenses"],
		queryFn: getLicenses
	});
	const aktif = licenses.filter((l) => l.status === "aktif");
	const segera = aktif.filter((l) => daysLeft(l.berakhir) <= 30);
	const totalChat = tenants.reduce((a, t) => a + t.chatBulanIni, 0);
	const suspendedCount = tenants.filter((t) => t.status === "suspend").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Ringkasan Platform",
			description: "Kondisi seluruh tenant, lisensi, dan pemakaian bulan ini."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total tenant",
					value: String(tenants.length),
					icon: Building2,
					hint: suspendedCount > 0 ? `${suspendedCount} tenant ditangguhkan` : "Semua aktif"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Lisensi aktif",
					value: String(aktif.length),
					icon: KeyRound,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Segera kedaluwarsa",
					value: String(segera.length),
					icon: TriangleAlert,
					tone: "warning",
					hint: "Dalam 30 hari ke depan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Chat bulan ini",
					value: formatNumber(totalChat),
					icon: MessagesSquare,
					hint: "Seluruh tenant"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-8 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Lisensi yang perlu diperhatikan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/licenses",
					className: "text-xs text-primary hover:underline",
					children: "Lihat semua"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tenant" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Kode" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Berakhir" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Sisa" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [licenses.slice().sort((a, b) => daysLeft(a.berakhir) - daysLeft(b.berakhir)).slice(0, 5).map((l) => {
				const sisa = daysLeft(l.berakhir);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-medium",
						children: l.tenantNama
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "font-mono text-xs text-muted-foreground",
						children: l.kode
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(l.berakhir) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: sisa < 0 ? "text-destructive" : sisa <= 30 ? "text-warning" : "",
						children: sisa < 0 ? `${Math.abs(sisa)} hari lewat` : `${sisa} hari`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
						label: l.status,
						tone: toneForLicense(l.status)
					}) })
				] }, l.id);
			}), licenses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 5,
				className: "py-8 text-center text-sm text-muted-foreground",
				children: "Belum ada data lisensi."
			}) })] })] })]
		})
	] });
}
//#endregion
export { AdminOverview as component };
