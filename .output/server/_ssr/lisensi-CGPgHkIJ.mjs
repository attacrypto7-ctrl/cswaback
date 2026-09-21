import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { B as Copy, W as CircleCheck, Y as CalendarClock, d as Smartphone, j as KeyRound, p as ShieldCheck, x as MessageSquare } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { c as getChatLogs, d as getLicenses, h as getWaNumbers, i as formatNumber, n as daysLeft, r as formatDate } from "./api-RbxyrTLn.mjs";
import { t as StatCard } from "./stat-card-DC0iGpsc.mjs";
import { t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./dialog-DIo89e4g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lisensi-CGPgHkIJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LisensiPage() {
	const { data: licenses = [] } = useQuery({
		queryKey: ["licenses"],
		queryFn: getLicenses
	});
	const { data: logs = [] } = useQuery({
		queryKey: ["chats"],
		queryFn: getChatLogs
	});
	const { data: waList = [] } = useQuery({
		queryKey: ["wa"],
		queryFn: getWaNumbers
	});
	const [inputKode, setInputKode] = (0, import_react.useState)("");
	const [dialogOpen, setDialogOpen] = (0, import_react.useState)(false);
	const activeLicense = licenses[0] ?? null;
	const sisaHari = activeLicense ? daysLeft(activeLicense.berakhir) : 0;
	const chatTerpakai = logs.length;
	const kuotaChat = activeLicense?.kuotaChat ?? 0;
	const persenKuota = kuotaChat > 0 ? Math.min(100, Math.round(chatTerpakai / kuotaChat * 100)) : 0;
	const copyLicense = () => {
		if (activeLicense) {
			navigator.clipboard?.writeText(activeLicense.kode);
			toast.success("Kode lisensi berhasil disalin!");
		}
	};
	const handleActivate = () => {
		if (!inputKode.trim()) {
			toast.error("Silakan masukkan kode lisensi.");
			return;
		}
		setDialogOpen(false);
		setInputKode("");
		toast.success("Lisensi berhasil diperbarui!", { description: "Masa berlaku dan kuota chat Anda telah diperpanjang." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Lisensi & Paket",
			description: "Informasi masa aktif lisensi bisnis Anda, penggunaan kuota pesan, dan aktivasi kode perpanjangan.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), " Masukkan Kode Lisensi"] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Aktivasi / Perpanjang Lisensi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Masukkan kode lisensi resmi yang Anda dapatkan dari tim Balasin atau penyedia layanan." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "kode-baru",
								children: "Kode Lisensi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "kode-baru",
								placeholder: "XXXX-XXXX-XXXX-XXXX",
								value: inputKode,
								onChange: (e) => setInputKode(e.target.value),
								className: "font-mono"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Format: 4 segmen alfanumerik. Kuota otomatis diperbarui setelah aktivasi."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setDialogOpen(false),
						children: "Batal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleActivate,
						children: "Aktivasi Sekarang"
					})] })
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Status Lisensi",
					value: activeLicense ? "Aktif" : "Tidak Aktif",
					icon: ShieldCheck,
					tone: activeLicense ? "success" : "danger",
					hint: activeLicense ? `Paket ${activeLicense.plan}` : "Belum ada paket aktif"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Sisa Masa Aktif",
					value: activeLicense ? `${sisaHari} Hari` : "-",
					icon: CalendarClock,
					hint: activeLicense ? `Hingga ${formatDate(activeLicense.berakhir)}` : "Perlu aktivasi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Kuota Chat Terpakai",
					value: kuotaChat > 0 ? `${persenKuota}%` : "0%",
					icon: MessageSquare,
					hint: kuotaChat > 0 ? `${formatNumber(chatTerpakai)} / ${formatNumber(kuotaChat)}` : "0 kuota"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Nomor WA Aktif",
					value: String(waList.length),
					icon: Smartphone,
					hint: "Nomor CS tersambung"
				})
			]
		}),
		activeLicense ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-6 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Detail Lisensi Aktif"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
						label: activeLicense.status,
						tone: "success"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Kode Lisensi:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
									className: "rounded bg-secondary px-2.5 py-1 font-mono text-xs text-foreground font-semibold",
									children: activeLicense.kode
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: copyLicense,
									title: "Salin kode",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Paket Langganan:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: activeLicense.plan
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Tanggal Aktivasi:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: formatDate(activeLicense.dibuat)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Berlaku Sampai:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: formatDate(activeLicense.berakhir)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Maksimal Pesan per Bulan:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-foreground",
								children: [formatNumber(kuotaChat), " pesan"]
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-6 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold",
						children: "Pemakaian Kuota Bulan Ini"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Chat Masuk & Dibalas:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: [
										formatNumber(chatTerpakai),
										" / ",
										formatNumber(kuotaChat)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: persenKuota,
								className: "h-3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Kuota akan direset otomatis pada tanggal 01 setiap bulannya."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-secondary/30 p-4 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: [
								"Fitur Paket ",
								activeLicense.plan,
								" Termasuk:"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-xs text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500" }), "Balas Chat Otomatis tak terbatas dalam kuota"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500" }), "Template Balas Iklan multi-langkah (teks & gambar)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500" }), "Dukungan nomor WhatsApp aktif"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-500" }), "Integrasi dokumen PDF & FAQ"]
								})
							]
						})]
					})
				]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel mt-8 flex flex-col items-center justify-center p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-12 text-muted-foreground opacity-30 mb-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "Belum Ada Lisensi Aktif"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground max-w-sm",
					children: "Silakan masukkan kode lisensi yang Anda peroleh dari tim Balasin untuk mengaktifkan fitur bot WhatsApp."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-4",
					onClick: () => setDialogOpen(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4" }), " Masukkan Kode Lisensi"]
				})
			]
		})
	] });
}
//#endregion
export { LisensiPage as component };
