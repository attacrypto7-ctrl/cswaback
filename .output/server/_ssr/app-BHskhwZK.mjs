import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as MessagesSquare, Y as CalendarClock, d as Smartphone, f as ShieldQuestionMark } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { c as getChatLogs, d as getLicenses, h as getWaNumbers, i as formatNumber } from "./api-RbxyrTLn.mjs";
import { t as StatCard } from "./stat-card-DC0iGpsc.mjs";
import { r as toneForWa, t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-BHskhwZK.js
var import_jsx_runtime = require_jsx_runtime();
function TenantOverview() {
	const { data: numbers = [] } = useQuery({
		queryKey: ["wa"],
		queryFn: getWaNumbers
	});
	const { data: logs = [] } = useQuery({
		queryKey: ["chats"],
		queryFn: getChatLogs
	});
	const { data: licenses = [] } = useQuery({
		queryKey: ["licenses"],
		queryFn: getLicenses
	});
	const activeLicense = licenses[0] ?? null;
	const connectedNumbers = numbers.filter((n) => n.status === "tersambung").length;
	const totalChat = logs.length;
	const perluManusia = logs.filter((l) => l.status === "perlu manusia").length;
	const kuotaChat = activeLicense?.kuotaChat ?? 0;
	const persenKuota = kuotaChat > 0 ? Math.min(100, Math.round(totalChat / kuotaChat * 100)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Ringkasan",
			description: "Kondisi bot WhatsApp Anda hari ini.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/uji-coba",
					children: "Uji coba bot"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Nomor tersambung",
					value: `${connectedNumbers} / ${numbers.length}`,
					icon: Smartphone,
					tone: "success"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Chat hari ini",
					value: formatNumber(totalChat),
					icon: MessagesSquare,
					hint: "Total chat masuk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Perlu ditangani manusia",
					value: String(perluManusia),
					icon: ShieldQuestionMark,
					tone: "warning"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Sisa lisensi",
					value: activeLicense ? "Aktif" : "-",
					icon: CalendarClock,
					hint: activeLicense ? `Paket ${activeLicense.plan}` : "Belum ada lisensi"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Status nomor WhatsApp"
					}),
					numbers.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: numbers.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-secondary/40 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: n.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-xs text-muted-foreground",
								children: n.nomor
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: n.terakhirAktif
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									label: n.status,
									tone: toneForWa(n.status)
								})]
							})]
						}, n.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground",
						children: "Belum ada nomor WhatsApp yang terhubung."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app/whatsapp",
							children: "Kelola koneksi →"
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Kuota chat bulan ini"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-3xl font-semibold",
						children: formatNumber(totalChat)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: kuotaChat > 0 ? `dari kuota ${formatNumber(kuotaChat)} chat` : "Belum ada kuota aktif"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: persenKuota,
						className: "mt-4 h-2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Balas Chat Otomatis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: logs.filter((l) => l.kanal === "Chat").length })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Balas Iklan Otomatis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: logs.filter((l) => l.kanal === "Iklan").length })]
						})]
					})
				]
			})]
		})
	] });
}
//#endregion
export { TenantOverview as component };
