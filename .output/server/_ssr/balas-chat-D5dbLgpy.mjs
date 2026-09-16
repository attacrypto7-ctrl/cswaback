import { i as __toESM } from "../_runtime.mjs";
import { n as apiFetch } from "./api-client-CwhjhSev.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/balas-chat-D5dbLgpy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
var tingkatAi = [
	{
		id: "hemat",
		nama: "Hemat",
		catatan: "Cepat & murah, cocok untuk chat sehari-hari"
	},
	{
		id: "seimbang",
		nama: "Seimbang",
		catatan: "Lebih pintar, biaya sedang"
	},
	{
		id: "akurat",
		nama: "Paling Akurat",
		catatan: "Paling teliti, untuk jawaban yang harus presisi"
	}
];
function AutoChatPage() {
	const [aktif, setAktif] = (0, import_react.useState)(true);
	const [namaBot, setNamaBot] = (0, import_react.useState)("");
	const [instruksi, setInstruksi] = (0, import_react.useState)("");
	const [ambang, setAmbang] = (0, import_react.useState)([60]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Balas Chat Otomatis",
		description: "Bot menjawab chat biasa berdasarkan dokumen dan FAQ yang Anda unggah.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm",
				children: aktif ? "Menyala" : "Mati"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: aktif,
				onCheckedChange: (v) => {
					setAktif(v);
					toast.success(`Balas Chat Otomatis ${v ? "dinyalakan" : "dimatikan"}`);
				}
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_340px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "panel space-y-6 p-6",
			onSubmit: async (e) => {
				e.preventDefault();
				try {
					await apiFetch("/bot/settings", {
						method: "PUT",
						body: {
							namaBot,
							instruksi,
							ambang: ambang[0],
							aktif
						}
					});
					toast.success("Pengaturan berhasil disimpan");
				} catch (err) {
					toast.error(err instanceof Error ? err.message : "Gagal menyimpan");
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "nama-bot",
						children: "Nama bot"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "nama-bot",
						placeholder: "Contoh: Asisten CS",
						value: namaBot,
						onChange: (e) => setNamaBot(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "gaya",
						children: "Gaya bahasa & instruksi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "gaya",
						rows: 6,
						placeholder: "Contoh: Sapa pelanggan dengan sopan. Gunakan Bahasa Indonesia ramah, maksimal 3 kalimat. Jika info tidak ada di FAQ, tawarkan bantuan admin.",
						value: instruksi,
						onChange: (e) => setInstruksi(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Tingkat kepintaran bot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							defaultValue: "hemat",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: tingkatAi.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: m.id,
								children: [
									m.nama,
									" — ",
									m.catatan
								]
							}, m.id)) })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bahasa balasan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							defaultValue: "id",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "id",
									children: "Bahasa Indonesia"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "auto",
									children: "Ikuti bahasa pelanggan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "en",
									children: "English"
								})
							] })]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
							"Seberapa cepat bot minta bantuan Anda — ",
							ambang[0],
							"%"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							value: ambang,
							onValueChange: setAmbang,
							max: 100,
							step: 5
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Kalau bot ragu-ragu menjawab, chat otomatis ditandai untuk Anda ambil alih. Makin tinggi angkanya, makin cepat bot menyerah dan minta bantuan."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 rounded-lg border border-border bg-secondary/40 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: ["Kirim sapaan pembuka otomatis", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: ["Berhenti membalas setelah admin masuk percakapan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: ["Simpan transkrip percakapan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: "Simpan pengaturan"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "panel h-fit p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold",
				children: "Cara kerja"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "mt-4 space-y-4 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: "1. Chat masuk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pesan pelanggan diterima dari nomor WhatsApp yang tersambung." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: "2. Cari jawaban di data Anda"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sistem mencari info yang paling cocok dari FAQ/dokumen yang sudah diunggah." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: "3. AI menyusun jawaban"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Jawaban dibuat hanya dari info tadi, mengikuti gaya bahasa Anda." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: "4. Kirim atau minta bantuan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Kalau bot kurang yakin, chat dialihkan ke Anda, bukan dijawab asal-asalan." })] })
				]
			})]
		})]
	})] });
}
//#endregion
export { AutoChatPage as component };
