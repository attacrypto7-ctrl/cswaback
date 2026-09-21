import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { H as CloudUpload, L as FileText, P as History, b as Plus, l as Trash2 } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { l as getFaqItems, r as formatDate, u as getKnowledgeDocs } from "./api-RbxyrTLn.mjs";
import { t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pengetahuan-Bgj3tzXG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function labelStatusDokumen(status) {
	if (status === "terindeks" || status === "siap_dipakai") return "Siap dipakai";
	if (status === "memproses" || status === "sedang_diproses") return "Sedang diproses";
	return "Gagal diproses";
}
function KnowledgePage() {
	const { data: docs = [] } = useQuery({
		queryKey: ["docs"],
		queryFn: getKnowledgeDocs
	});
	const { data: faqs = [] } = useQuery({
		queryKey: ["faqs"],
		queryFn: getFaqItems
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Basis Pengetahuan",
		description: "Semakin lengkap isinya, semakin jarang bot menjawab 'tidak tahu'."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "dokumen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: "dokumen",
				children: "Dokumen"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: "faq",
				children: "FAQ Manual"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "dokumen",
				className: "mt-6 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel flex flex-col items-center gap-3 border-dashed p-10 text-center",
					onClick: () => toast.info("Unggahan masih simulasi pada tahap ini"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Tarik berkas ke sini atau klik untuk memilih"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "PDF atau teks, maksimal 20 MB per berkas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							children: "Pilih berkas"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Nama" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Tipe" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Ukuran" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Versi" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Diperbarui" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
							className: "text-right",
							children: "Aksi"
						})
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "flex items-center gap-2 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-muted-foreground" }), d.nama]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: d.tipe }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: d.ukuran }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: ["v", d.versi] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: formatDate(d.diperbarui) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							label: labelStatusDokumen(d.status),
							tone: d.status === "terindeks" ? "success" : d.status === "memproses" ? "info" : "danger"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
							className: "text-right whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => toast.info(`Riwayat versi ${d.nama}`),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => toast.warning(`${d.nama} dihapus`),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})]
						})
					] }, d.id)), docs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 7,
						className: "py-10 text-center text-sm text-muted-foreground",
						children: "Belum ada dokumen yang diunggah. Unggah file PDF atau berkas teks di atas."
					}) })] })] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "faq",
				className: "mt-6 grid gap-6 lg:grid-cols-[1fr_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel divide-y divide-border",
					children: [faqs.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: f.pertanyaan
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: f.jawaban
						})]
					}, f.id)), faqs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-sm text-muted-foreground",
						children: "Belum ada FAQ manual. Tambahkan pertanyaan dan jawaban umum lewat form di samping."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "panel h-fit space-y-4 p-5",
					onSubmit: (e) => {
						e.preventDefault();
						toast.success("FAQ ditambahkan (contoh)");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold",
							children: "Tambah FAQ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "tanya",
								children: "Pertanyaan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "tanya",
								placeholder: "Contoh: Apakah bisa kirim hari ini?"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "jawab",
								children: "Jawaban"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "jawab",
								rows: 4,
								placeholder: "Tulis jawaban yang ingin bot sampaikan"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Simpan FAQ"]
						})
					]
				})]
			})
		]
	})] });
}
//#endregion
export { KnowledgePage as component };
