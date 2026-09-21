import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as MessagesSquare, U as CircleQuestionMark, V as Coins, c as TrendingUp } from "../_libs/lucide-react.mjs";
import { n as PageHeader } from "./shell-DqMou3Zp.mjs";
import { i as formatNumber, o as getAnalytics } from "./api-RbxyrTLn.mjs";
import { t as StatCard } from "./stat-card-DC0iGpsc.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as CartesianGrid, r as YAxis, s as Bar, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analitik-D_eM6bdD.js
var import_jsx_runtime = require_jsx_runtime();
function AnalitikPage() {
	const { data } = useQuery({
		queryKey: ["analytics"],
		queryFn: getAnalytics
	});
	const chatHarian = data?.chatHarian ?? [];
	const pemakaianToken = data?.pemakaianToken ?? [];
	const pertanyaanTeratas = data?.pertanyaanTeratas ?? [];
	const totalChatMingguan = chatHarian.reduce((a, c) => a + c.chat, 0);
	const totalGagalMingguan = chatHarian.reduce((a, c) => a + c.gagal, 0);
	const totalToken = pemakaianToken.reduce((a, c) => a + c.token, 0);
	const suksesPersen = totalChatMingguan > 0 ? Math.round((totalChatMingguan - totalGagalMingguan) / totalChatMingguan * 100) : 0;
	const maxPertanyaan = pertanyaanTeratas[0]?.jumlah || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Analitik & Performa",
			description: "Pantau volume chat masuk, efisiensi balasan otomatis AI, dan topik yang paling sering ditanyakan pelanggan."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total Chat Minggu Ini",
					value: formatNumber(totalChatMingguan),
					icon: MessagesSquare,
					hint: "Volume chat masuk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Tingkat Balas Otomatis",
					value: totalChatMingguan > 0 ? `${suksesPersen}%` : "-",
					icon: TrendingUp,
					tone: "success",
					hint: "Dijawab tuntas oleh bot"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Pemakaian Token",
					value: totalToken > 0 ? `${totalToken.toFixed(1)} Juta` : "0",
					icon: Coins,
					hint: "Penggunaan model AI"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Topik Pertanyaan",
					value: String(pertanyaanTeratas.length),
					icon: CircleQuestionMark,
					hint: "Teridentifikasi berulang"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Volume Chat 7 Hari Terakhir"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Jumlah chat dijawab bot vs dialihkan ke admin"
					})]
				}), chatHarian.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chatHarian,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									opacity: .15
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "hari",
									tick: { fontSize: 12 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 12 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									backgroundColor: "hsl(var(--card))",
									borderColor: "hsl(var(--border))",
									borderRadius: "8px",
									fontSize: "12px"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "chat",
									name: "Chat Berhasil",
									fill: "#10b981",
									radius: [
										4,
										4,
										0,
										0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "gagal",
									name: "Perlu Manusia",
									fill: "#f59e0b",
									radius: [
										4,
										4,
										0,
										0
									]
								})
							]
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-72 items-center justify-center text-sm text-muted-foreground",
					children: "Belum ada data aktivitas chat."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "Tren Pemakaian Token (Juta Token)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Akumulasi pemakaian model AI"
					})]
				}), pemakaianToken.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-72 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: pemakaianToken,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "colorToken",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "5%",
										stopColor: "#0ea5e9",
										stopOpacity: .8
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "95%",
										stopColor: "#0ea5e9",
										stopOpacity: 0
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									opacity: .15
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "bulan",
									tick: { fontSize: 12 }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: { fontSize: 12 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									backgroundColor: "hsl(var(--card))",
									borderColor: "hsl(var(--border))",
									borderRadius: "8px",
									fontSize: "12px"
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									dataKey: "token",
									name: "Token (Juta)",
									stroke: "#0ea5e9",
									fillOpacity: 1,
									fill: "url(#colorToken)"
								})
							]
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-72 items-center justify-center text-sm text-muted-foreground",
					children: "Belum ada riwayat penggunaan token."
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel mt-6 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Pertanyaan Paling Sering Diajukan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Bisa digunakan untuk memperkaya data FAQ dan materi promosi."
				}),
				pertanyaanTeratas.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 space-y-4",
					children: pertanyaanTeratas.map((p, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-foreground",
								children: [
									index + 1,
									". ",
									p.pertanyaan
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [formatNumber(p.jumlah), " kali"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: p.jumlah / maxPertanyaan * 100,
							className: "h-2"
						})]
					}, p.pertanyaan))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: "Belum ada data pertanyaan yang terhimpun."
				})
			]
		})
	] });
}
//#endregion
export { AnalitikPage as component };
