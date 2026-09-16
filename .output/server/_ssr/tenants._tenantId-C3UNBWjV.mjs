import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Q as ArrowLeft, S as MessagesSquare, V as Coins, d as Smartphone } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { f as getLicensesByTenant, h as getWaNumbers, i as formatNumber, p as getTenant, r as formatDate } from "./api-RbxyrTLn.mjs";
import { t as StatCard } from "./stat-card-DC0iGpsc.mjs";
import { n as toneForLicense, r as toneForWa, t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Route } from "./tenants._tenantId-D0_cTeaX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tenants._tenantId-C3UNBWjV.js
var import_jsx_runtime = require_jsx_runtime();
function TenantDetail() {
	const { tenantId } = Route.useParams();
	const { data: tenant } = useQuery({
		queryKey: ["tenant", tenantId],
		queryFn: () => getTenant(tenantId)
	});
	const { data: licenses = [] } = useQuery({
		queryKey: ["licenses", tenantId],
		queryFn: () => getLicensesByTenant(tenantId)
	});
	const { data: numbers = [] } = useQuery({
		queryKey: ["wa"],
		queryFn: getWaNumbers
	});
	if (!tenant) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Memuat data tenant..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/admin/tenants",
			className: "mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Kembali ke daftar tenant"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: tenant.nama,
			description: `${tenant.industri} · ${tenant.email} · bergabung ${formatDate(tenant.bergabung)}`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
				label: tenant.status,
				tone: tenant.status === "aktif" ? "success" : "danger"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Nomor WhatsApp",
					value: String(tenant.nomorWa),
					icon: Smartphone
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Chat bulan ini",
					value: formatNumber(tenant.chatBulanIni),
					icon: MessagesSquare,
					hint: `Kuota ${formatNumber(tenant.kuotaChat)}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Token terpakai",
					value: `${(tenant.tokenBulanIni / 1e6).toFixed(2)} jt`,
					icon: Coins,
					tone: "warning"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-8 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "px-5 py-4 text-sm font-semibold",
				children: "Nomor WhatsApp terhubung"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Label" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nomor" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Terakhir aktif" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: numbers.slice(0, tenant.nomorWa).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: n.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs",
					children: n.nomor
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					label: n.status,
					tone: toneForWa(n.status)
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-muted-foreground",
					children: n.terakhirAktif
				})
			] }, n.id)) })] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-6 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "px-5 py-4 text-sm font-semibold",
				children: "Riwayat lisensi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Kode" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Paket" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Dibuat" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Berakhir" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: licenses.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs",
					children: l.kode
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.plan }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(l.dibuat) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(l.berakhir) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					label: l.status,
					tone: toneForLicense(l.status)
				}) })
			] }, l.id)) })] })]
		})
	] });
}
//#endregion
export { TenantDetail as component };
