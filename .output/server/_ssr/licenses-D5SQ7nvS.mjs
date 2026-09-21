import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { B as Copy, b as Plus } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { d as getLicenses, i as formatNumber, m as getTenants, n as daysLeft, r as formatDate } from "./api-RbxyrTLn.mjs";
import { n as toneForLicense, t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DIo89e4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/licenses-D5SQ7nvS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LicensesPage() {
	const { data: licenses = [] } = useQuery({
		queryKey: ["licenses"],
		queryFn: getLicenses
	});
	const { data: tenants = [] } = useQuery({
		queryKey: ["tenants"],
		queryFn: getTenants
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Lisensi",
		description: "Kode lisensi mengikat tenant, masa berlaku, dan kuota chat per bulan.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Buat lisensi"] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Buat lisensi baru" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Kode akan dibuat otomatis dan bisa langsung dibagikan ke tenant." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tenant" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								defaultValue: tenants[0]?.id ?? "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Pilih tenant" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: tenants.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t.id,
									children: t.nama
								}, t.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Paket" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									defaultValue: "Growth",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "Starter",
											children: "Starter"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "Growth",
											children: "Growth"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "Scale",
											children: "Scale"
										})
									] })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "kuota",
									children: "Kuota chat / bulan"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "kuota",
									type: "number",
									defaultValue: 1e4
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "berakhir",
								children: "Berlaku sampai"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "berakhir",
								type: "date",
								defaultValue: "2027-03-31"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => setOpen(false),
					children: "Batal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setOpen(false);
						toast.success("Lisensi dibuat (contoh)", { description: "BARU-7HQ2-2027-AZ55 siap dibagikan ke tenant." });
					},
					children: "Buat lisensi"
				})] })
			] })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Kode" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tenant" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Paket" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Kuota" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Berakhir" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
				className: "text-right",
				children: "Aksi"
			})
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [licenses.map((l) => {
			const sisa = daysLeft(l.berakhir);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs",
					children: l.kode
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-medium",
					children: l.tenantNama
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: l.plan }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [formatNumber(l.kuotaChat), "/bln"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [formatDate(l.berakhir), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-xs text-muted-foreground",
					children: sisa < 0 ? `lewat ${Math.abs(sisa)} hari` : `sisa ${sisa} hari`
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					label: l.status,
					tone: toneForLicense(l.status)
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => toast.success("Kode lisensi disalin"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), " Salin"]
					})
				})
			] }, l.id);
		}), licenses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
			colSpan: 7,
			className: "py-10 text-center text-sm text-muted-foreground",
			children: "Belum ada lisensi yang dibuat. Klik \"Buat lisensi\" di atas untuk menambahkan lisensi baru."
		}) })] })] })
	})] });
}
//#endregion
export { LicensesPage as component };
