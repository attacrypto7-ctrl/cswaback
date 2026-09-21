import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as Plus, o as Unplug, v as RefreshCw, y as QrCode } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { h as getWaNumbers } from "./api-RbxyrTLn.mjs";
import { r as toneForWa, t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/whatsapp-Blouf50D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QrPlaceholder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto grid size-52 grid-cols-11 gap-0.5 rounded-xl bg-foreground p-3",
		children: Array.from({ length: 121 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: (i * 7 + i % 5 * 13) % 3 === 0 ? "rounded-[1px] bg-background" : "" }, i))
	});
}
function WhatsappPage() {
	const { data: numbers = [] } = useQuery({
		queryKey: ["wa"],
		queryFn: getWaNumbers
	});
	const [qrOpen, setQrOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Koneksi WhatsApp",
			description: "Satu tenant bisa punya beberapa nomor CS. Pindai QR dari ponsel yang memegang nomor tersebut.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setQrOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Tambah nomor"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [numbers.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "panel p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: n.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-muted-foreground",
							children: n.nomor
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							label: n.status,
							tone: toneForWa(n.status)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: ["Terakhir aktif: ", n.terakhirAktif]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3 rounded-lg border border-border bg-secondary/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: ["Balas Chat Otomatis", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								defaultChecked: n.autoChat,
								onCheckedChange: (v) => toast.success(`Balas Chat Otomatis ${v ? "dinyalakan" : "dimatikan"} untuk ${n.label}`)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: ["Balas Iklan Otomatis", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								defaultChecked: n.autoIklan,
								onCheckedChange: (v) => toast.success(`Balas Iklan Otomatis ${v ? "dinyalakan" : "dimatikan"} untuk ${n.label}`)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => setQrOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-3.5" }), " Pindai ulang"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => toast.info("Menyambungkan ulang sesi..."),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }), " Sambung ulang"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => toast.warning(`${n.label} diputuskan`),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unplug, { className: "size-3.5" }), " Putuskan"]
							})
						]
					})
				]
			}, n.id)), numbers.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel col-span-full flex flex-col items-center justify-center p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-10 text-muted-foreground opacity-40 mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-foreground",
						children: "Belum ada nomor WhatsApp tersambung"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground max-w-sm",
						children: "Klik tombol \"Tambah nomor\" di atas untuk menghubungkan nomor WhatsApp bisnis Anda lewat QR code."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-4",
						size: "sm",
						onClick: () => setQrOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Hubungkan Sekarang"]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: qrOpen,
			onOpenChange: setQrOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Pindai QR untuk menyambungkan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Buka WhatsApp → Perangkat Tertaut → Tautkan Perangkat, lalu arahkan kamera ke kode di bawah. QR contoh ini menyegar otomatis tiap 30 detik saat sistem sudah tersambung." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrPlaceholder, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-muted-foreground",
					children: "Menunggu pemindaian... status akan berubah otomatis."
				})
			] })
		})
	] });
}
//#endregion
export { WhatsappPage as component };
