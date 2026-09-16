import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as MessageSquarePlus, F as GripVertical, M as ImagePlus, b as Plus, l as Trash2 } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { a as getAdTemplates, i as formatNumber } from "./api-RbxyrTLn.mjs";
import { t as StatusPill } from "./status-pill-DExz6KRY.mjs";
import { a as TableHeader, i as TableHead, n as TableBody, o as TableRow, r as TableCell, t as Table } from "./table-C0WYWEQX.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Switch } from "./switch-Cn1w-cIH.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/balas-iklan-E9Q9aMAz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function buatId() {
	return Math.random().toString(36).slice(2, 10);
}
function ambilLangkah(t) {
	if (Array.isArray(t.langkah) && t.langkah.length > 0) return t.langkah;
	if (t.jawaban) return [{
		id: "0",
		tipe: "teks",
		isiTeks: t.jawaban
	}];
	return [];
}
function ambilCaraMencocokkan(t) {
	if (t.caraMencocokkan) return t.caraMencocokkan;
	return t.mode === "exact" ? "sama_persis" : "boleh_mirip";
}
function AutoAdsPage() {
	const { data: templatesMentah = [] } = useQuery({
		queryKey: ["ads"],
		queryFn: getAdTemplates
	});
	const [aktif, setAktif] = (0, import_react.useState)(true);
	const templates = templatesMentah.map((t) => ({
		...t,
		langkah: ambilLangkah(t),
		caraMencocokkan: ambilCaraMencocokkan(t)
	}));
	const [pertanyaan, setPertanyaan] = (0, import_react.useState)("");
	const [caraMencocokkan, setCaraMencocokkan] = (0, import_react.useState)("boleh_mirip");
	const [langkahBaru, setLangkahBaru] = (0, import_react.useState)([{
		id: buatId(),
		tipe: "teks",
		isiTeks: ""
	}]);
	function tambahLangkahTeks() {
		setLangkahBaru((prev) => [...prev, {
			id: buatId(),
			tipe: "teks",
			isiTeks: ""
		}]);
	}
	function tambahLangkahGambar() {
		setLangkahBaru((prev) => [...prev, {
			id: buatId(),
			tipe: "gambar"
		}]);
	}
	function hapusLangkah(id) {
		setLangkahBaru((prev) => prev.filter((l) => l.id !== id));
	}
	function ubahTeksLangkah(id, isiTeks) {
		setLangkahBaru((prev) => prev.map((l) => l.id === id && l.tipe === "teks" ? {
			...l,
			isiTeks
		} : l));
	}
	function ubahGambarLangkah(id, file) {
		setLangkahBaru((prev) => prev.map((l) => l.id === id && l.tipe === "gambar" ? {
			...l,
			namaGambar: file?.name
		} : l));
	}
	function resetForm() {
		setPertanyaan("");
		setCaraMencocokkan("boleh_mirip");
		setLangkahBaru([{
			id: buatId(),
			tipe: "teks",
			isiTeks: ""
		}]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Balas Iklan Otomatis",
		description: "Untuk chat dari iklan, balasan harus persis sama setiap kali. Anda bisa mengatur beberapa pesan berurutan, misalnya: penjelasan, nomor transfer, lalu foto bukti rekening.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm",
				children: aktif ? "Menyala" : "Mati"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
				checked: aktif,
				onCheckedChange: (v) => {
					setAktif(v);
					toast.success(`Balas Iklan Otomatis ${v ? "dinyalakan" : "dimatikan"}`);
				}
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_380px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Daftar pertanyaan & balasan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground",
					children: [templates.length, " pertanyaan"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Pertanyaan dari pelanggan" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Balasan (berurutan)" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Cara mencocokkan" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Dipakai" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "text-right",
					children: "Aksi"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableBody, { children: [templates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "max-w-[220px] align-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: t.pertanyaan
					}), !t.aktif ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 inline-block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							label: "nonaktif",
							tone: "muted"
						})
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "max-w-sm align-top",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "space-y-1.5",
						children: t.langkah.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-medium text-muted-foreground",
								children: i + 1
							}), l.tipe === "teks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: l.isiTeks
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3" }),
									" ",
									l.namaGambar ?? "Gambar"
								]
							})]
						}, l.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "align-top",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
						label: t.caraMencocokkan === "sama_persis" ? "Sama persis" : "Boleh mirip",
						tone: t.caraMencocokkan === "sama_persis" ? "info" : "warning"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
					className: "align-top",
					children: [formatNumber(t.dipakai), "x"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-right align-top",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						className: "text-destructive",
						onClick: () => toast.warning("Pertanyaan dihapus"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
					})
				})
			] }, t.id)), templates.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
				colSpan: 5,
				className: "py-10 text-center text-sm text-muted-foreground",
				children: "Belum ada template balasan iklan. Buat template baru lewat formulir di samping."
			}) })] })] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "panel space-y-4 p-5",
				onSubmit: (e) => {
					e.preventDefault();
					toast.success("Pertanyaan & balasan ditambahkan (contoh)");
					resetForm();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Tambah pertanyaan baru"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "t-tanya",
							children: "Pertanyaan dari pelanggan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "t-tanya",
							placeholder: "Contoh: Cara donasi gimana?",
							value: pertanyaan,
							onChange: (e) => setPertanyaan(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cara mencocokkan pertanyaan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: caraMencocokkan,
							onValueChange: (v) => setCaraMencocokkan(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "sama_persis",
								children: "Harus sama persis"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "boleh_mirip",
								children: "Boleh mirip-mirip saja"
							})] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Balasan (dikirim berurutan, boleh lebih dari satu)" }),
							langkahBaru.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-2 rounded-lg border border-border bg-secondary/40 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "mt-2 size-4 shrink-0 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-medium text-muted-foreground",
											children: ["Pesan ke-", i + 1]
										}), l.tipe === "teks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											rows: 2,
											placeholder: "Tulis isi pesan ini",
											value: l.isiTeks,
											onChange: (e) => ubahTeksLangkah(l.id, e.target.value)
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "file",
												accept: "image/*",
												onChange: (e) => ubahGambarLangkah(l.id, e.target.files?.[0])
											}), l.namaGambar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: ["Terpilih: ", l.namaGambar]
											}) : null]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "ghost",
										className: "text-destructive",
										onClick: () => hapusLangkah(l.id),
										disabled: langkahBaru.length === 1,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									})
								]
							}, l.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									onClick: tambahLangkahTeks,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, { className: "size-3.5" }), " Tambah pesan teks"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									onClick: tambahLangkahGambar,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-3.5" }), " Tambah gambar"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Simpan pertanyaan & balasan"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel space-y-3 p-5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Bila tidak ada yang cocok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3",
						children: ["Biarkan AI menjawab", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, { defaultChecked: true })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "AI hanya boleh memilih dari daftar balasan di atas dan tidak boleh membuat jawaban baru sendiri. Jika tetap tidak ada yang cocok, chat dialihkan ke Anda."
					})
				]
			})]
		})]
	})] });
}
//#endregion
export { AutoAdsPage as component };
