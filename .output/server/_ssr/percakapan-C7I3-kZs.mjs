import { i as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { R as Eye, S as MessagesSquare, a as UserCheck, h as Search, x as MessageSquare } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { c as getChatLogs } from "./api-RbxyrTLn.mjs";
import { t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/percakapan-C7I3-kZs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function toneForChatStatus(status) {
	if (status === "terjawab") return "success";
	if (status === "perlu manusia") return "warning";
	return "info";
}
function PercakapanPage() {
	const { data: logs = [] } = useQuery({
		queryKey: ["chats"],
		queryFn: getChatLogs
	});
	const [q, setQ] = (0, import_react.useState)("");
	const [filterKanal, setFilterKanal] = (0, import_react.useState)("semua");
	const [filterStatus, setFilterStatus] = (0, import_react.useState)("semua");
	const [selectedChat, setSelectedChat] = (0, import_react.useState)(null);
	const filteredLogs = logs.filter((log) => {
		const matchQuery = `${log.kontak} ${log.nomor} ${log.pesanTerakhir} ${log.balasan}`.toLowerCase().includes(q.toLowerCase());
		const matchKanal = filterKanal === "semua" || log.kanal.toLowerCase() === filterKanal.toLowerCase();
		const matchStatus = filterStatus === "semua" || log.status === filterStatus;
		return matchQuery && matchKanal && matchStatus;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Riwayat Chat",
			description: "Pantau balasan bot dan segera tangani percakapan yang ditandai butuh bantuan manusia."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex flex-wrap items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-64 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute top-2.5 left-3 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Cari pesan, kontak, atau nomor WA...",
						className: "pl-9"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: filterKanal,
					onValueChange: setFilterKanal,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-36",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Semua Kanal" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "semua",
							children: "Semua Kanal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "chat",
							children: "Chat Biasa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "iklan",
							children: "Chat Iklan"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: filterStatus,
					onValueChange: setFilterStatus,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-44",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Semua Status" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "semua",
							children: "Semua Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "terjawab",
							children: "Terjawab Bot"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "perlu manusia",
							children: "Perlu Manusia"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "diambil alih",
							children: "Diambil Alih"
						})
					] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "panel overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Kontak" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Kanal" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "max-w-xs",
					children: "Pesan Pelanggan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "max-w-xs",
					children: "Balasan Terakhir"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Waktu" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Aksi"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [filteredLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-foreground",
					children: log.kontak
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-muted-foreground",
					children: log.nomor
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "font-normal",
					children: log.kanal
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "max-w-xs truncate text-xs text-foreground",
					children: [
						"\"",
						log.pesanTerakhir,
						"\""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "max-w-xs truncate text-xs text-muted-foreground",
					children: log.balasan
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "font-mono text-xs text-muted-foreground whitespace-nowrap",
					children: log.waktu
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					label: log.status,
					tone: toneForChatStatus(log.status)
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right whitespace-nowrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => setSelectedChat(log),
							title: "Lihat Detail",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" })
						}), log.status === "perlu manusia" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => toast.success(`Percakapan ${log.kontak} dialihkan ke WhatsApp Admin`),
							title: "Ambil Alih",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-3.5" }), " Ambil Alih"]
						})]
					})
				})
			] }, log.id)), filteredLogs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
				colSpan: 7,
				className: "py-12 text-center text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesSquare, { className: "mx-auto mb-2 size-8 opacity-40" }), "Tidak ada data percakapan yang sesuai."]
			}) })] })] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!selectedChat,
			onOpenChange: (open) => !open && setSelectedChat(null),
			children: selectedChat && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-lg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-5 text-primary" }),
						"Percakapan dengan ",
						selectedChat.kontak
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					selectedChat.nomor,
					" · Kanal ",
					selectedChat.kanal,
					" · Jam ",
					selectedChat.waktu
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-secondary/30 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Pesan Pelanggan:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-medium",
								children: selectedChat.pesanTerakhir
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-primary/5 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-primary",
									children: "Balasan Bot:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										"Tingkat Keyakinan: ",
										Math.round(selectedChat.keyakinan * 100),
										"%"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-foreground",
								children: selectedChat.balasan
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Status saat ini:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									label: selectedChat.status,
									tone: toneForChatStatus(selectedChat.status)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => {
									toast.success("Percakapan berhasil diambil alih.");
									setSelectedChat(null);
								},
								children: "Buka di WhatsApp Web"
							})]
						})
					]
				})]
			})
		})
	] });
}
//#endregion
export { PercakapanPage as component };
