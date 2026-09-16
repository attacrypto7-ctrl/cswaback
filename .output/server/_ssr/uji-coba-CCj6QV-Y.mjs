import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { Z as Bot, _ as RotateCcw, m as Send, r as User, u as Sparkles } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { a as getAdTemplates, l as getFaqItems, t as aiEngines, u as getKnowledgeDocs } from "./api-RbxyrTLn.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/uji-coba-CCj6QV-Y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UjiCobaPage() {
	const { data: docs = [] } = useQuery({
		queryKey: ["docs"],
		queryFn: getKnowledgeDocs
	});
	const { data: faqs = [] } = useQuery({
		queryKey: ["faqs"],
		queryFn: getFaqItems
	});
	const { data: ads = [] } = useQuery({
		queryKey: ["ads"],
		queryFn: getAdTemplates
	});
	const [engine, setEngine] = (0, import_react.useState)("deepseek-v4-flash");
	const [kanal, setKanal] = (0, import_react.useState)("chat");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSend = () => {
		if (!input.trim()) return;
		const userText = input.trim();
		const now = (/* @__PURE__ */ new Date()).toLocaleTimeString("id-ID", {
			hour: "2-digit",
			minute: "2-digit"
		});
		const userMsg = {
			id: `u-${Date.now()}`,
			sender: "user",
			text: userText,
			time: now
		};
		setMessages((prev) => [...prev, userMsg]);
		setInput("");
		setLoading(true);
		setTimeout(() => {
			let botResponse = "Maaf, saya belum menemukan jawaban dari dokumen atau FAQ yang tersedia. Chat ini akan dialihkan ke admin.";
			let source = "Fallback / Belum Ada Data";
			let confidence = .4;
			const lower = userText.toLowerCase();
			if (kanal === "iklan") {
				const matchedAd = ads.find((t) => t.mode === "exact" ? lower === t.pertanyaan.toLowerCase() : lower.includes(t.pertanyaan.toLowerCase()) || t.pertanyaan.toLowerCase().includes(lower));
				if (matchedAd) {
					botResponse = matchedAd.jawaban;
					source = `Template Iklan: "${matchedAd.pertanyaan}"`;
					confidence = .98;
				}
			} else {
				const matchedFaq = faqs.find((f) => lower.includes(f.pertanyaan.toLowerCase()) || f.pertanyaan.toLowerCase().includes(lower));
				if (matchedFaq) {
					botResponse = matchedFaq.jawaban;
					source = `FAQ: "${matchedFaq.pertanyaan}"`;
					confidence = .95;
				} else if (lower.includes("halo") || lower.includes("hai") || lower.includes("pagi") || lower.includes("siang") || lower.includes("malam")) {
					botResponse = "Halo! Ada yang bisa kami bantu hari ini?";
					source = "Sapaan Otomatis";
					confidence = .99;
				}
			}
			const botMsg = {
				id: `b-${Date.now()}`,
				sender: "bot",
				text: botResponse,
				source,
				confidence,
				time: (/* @__PURE__ */ new Date()).toLocaleTimeString("id-ID", {
					hour: "2-digit",
					minute: "2-digit"
				})
			};
			setMessages((prev) => [...prev, botMsg]);
			setLoading(false);
		}, 500);
	};
	const resetChat = () => {
		setMessages([]);
		toast.info("Percakapan uji coba dibersihkan.");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Uji Coba Bot",
		description: "Simulasikan percakapan pelanggan untuk memastikan respons AI dan template jawaban sudah akurat.",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outline",
			size: "sm",
			onClick: resetChat,
			disabled: messages.length === 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Bersihkan Obrolan"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[300px_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel space-y-5 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Pengaturan Simulasi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Mesin AI (Backend)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: engine,
							onValueChange: setEngine,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: aiEngines.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m.id,
								children: m.nama
							}, m.id)) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: aiEngines.find((e) => e.id === engine)?.catatan
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Skenario Masuk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: kanal,
						onValueChange: (v) => setKanal(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "chat",
							children: "Chat Pelanggan (FAQ & RAG)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "iklan",
							children: "Chat dari Iklan (Template Terikat)"
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-secondary/30 p-3 text-xs text-muted-foreground space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 font-medium text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-primary" }), " Info Pengetahuan Aktif"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"• ",
							docs.length,
							" Dokumen terindeks"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"• ",
							faqs.length,
							" FAQ Manual"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"• ",
							ads.length,
							" Template Balas Iklan"
						] })
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel flex h-[580px] flex-col overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between border-b border-border bg-secondary/20 px-5 py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold",
							children: "Bot Asisten"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-muted-foreground",
							children: "Status: Siap Uji Coba"
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-4 overflow-y-auto p-5",
					children: [messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col items-center justify-center text-center text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-10 opacity-30 mb-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Mulai Percakapan Simulasi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs max-w-xs mt-1",
								children: "Kirim pesan di bawah untuk menguji respons bot berdasarkan basis pengetahuan Anda."
							})
						]
					}) : messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`,
						children: [
							m.sender === "bot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.sender === "user" ? "bg-primary text-primary-foreground rounded-tr-none" : "bg-secondary text-foreground rounded-tl-none border border-border"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: m.text }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center justify-between gap-3 text-[10px] opacity-70",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: m.time }), m.confidence !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Keyakinan: ",
											Math.round(m.confidence * 100),
											"%"
										] })]
									}),
									m.source && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 border-t border-border/40 pt-1 text-[10px] text-primary",
										children: ["Sumber: ", m.source]
									})
								]
							}),
							m.sender === "user" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5" })
							})
						]
					}, m.id)), loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3.5 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Bot sedang memproses jawaban..." })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border bg-card p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							handleSend();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: input,
							onChange: (e) => setInput(e.target.value),
							placeholder: "Ketik pesan simulasi...",
							disabled: loading
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading || !input.trim(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
						})]
					})
				})
			]
		})]
	})] });
}
//#endregion
export { UjiCobaPage as component };
