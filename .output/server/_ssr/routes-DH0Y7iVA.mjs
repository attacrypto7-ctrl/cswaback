import { i as __toESM } from "../_runtime.mjs";
import { n as handleLogout, r as saveGoogleUser, t as getGoogleUser } from "./google-auth-nyx-VcMZ.mjs";
import { s as saveSession, t as API_BASE } from "./api-client-CwhjhSev.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { K as ChevronDown, L as FileText, R as Eye, T as LogOut, Z as Bot, i as UserPlus, p as ShieldCheck, t as Zap, x as MessageSquare, y as QrCode, z as EyeOff } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-DIo89e4g.mjs";
import { t as AmbientBackground } from "./ambient-background-zlH3T5ma.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DH0Y7iVA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fitur = [
	{
		icon: MessageSquare,
		judul: "Balas Chat Otomatis",
		teks: "AI menjawab berdasarkan dokumen dan FAQ yang Anda unggah, dengan gaya bahasa sendiri."
	},
	{
		icon: Zap,
		judul: "Balas Iklan Otomatis",
		teks: "Jawaban template presisi untuk chat dari iklan, konsisten dan aman untuk brand."
	},
	{
		icon: QrCode,
		judul: "Koneksi WhatsApp via QR",
		teks: "Pindai QR dari dashboard, pantau status sambungan tiap nomor secara langsung."
	},
	{
		icon: FileText,
		judul: "Basis Pengetahuan",
		teks: "Unggah PDF atau tulis FAQ manual, lengkap dengan riwayat versi."
	},
	{
		icon: ShieldCheck,
		judul: "Lisensi & Kuota",
		teks: "Kode lisensi per tenant dengan masa berlaku, kuota chat, dan pencabutan instan."
	},
	{
		icon: Bot,
		judul: "Uji Coba Bot",
		teks: "Coba kualitas jawaban di dashboard sebelum bot dipakai ke pelanggan asli."
	}
];
function Landing() {
	const [showLogin, setShowLogin] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [isError, setIsError] = (0, import_react.useState)(false);
	const [isShaking, setIsShaking] = (0, import_react.useState)(false);
	const [oauthError, setOauthError] = (0, import_react.useState)(null);
	const [googleUser, setGoogleUser] = (0, import_react.useState)(null);
	const [avatarError, setAvatarError] = (0, import_react.useState)(false);
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const timeoutRef = (0, import_react.useRef)(null);
	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		setIsOpen(true);
	};
	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setIsOpen(false);
		}, 200);
	};
	(0, import_react.useEffect)(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			setGoogleUser(getGoogleUser());
			setAvatarError(false);
		};
		sync();
		window.addEventListener("balasin:auth-changed", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("balasin:auth-changed", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		setAvatarError(false);
	}, [googleUser?.avatarUrl, googleUser?.picture]);
	(0, import_react.useEffect)(() => {
		const handler = (event) => {
			try {
				if (event.data?.type === "GOOGLE_AUTH_SUCCESS") {
					const { token, user } = event.data;
					setOauthError(null);
					try {
						saveSession(token, "tenant");
						saveGoogleUser({
							...user,
							avatarUrl: user.avatarUrl ?? user.picture ?? null,
							picture: user.picture || user.avatarUrl || ""
						});
					} catch {
						setOauthError("Gagal menyimpan sesi, coba lagi");
						return;
					}
					toast.success("Berhasil masuk dengan Google");
					setShowLogin(false);
				}
				if (event.data?.type === "GOOGLE_AUTH_ERROR") {
					const msg = event.data?.message || "Autentikasi Google gagal";
					setOauthError(msg);
					toast.error(msg);
				}
			} catch {
				setOauthError("Terjadi kesalahan saat memproses login Google");
			}
		};
		window.addEventListener("message", handler);
		return () => window.removeEventListener("message", handler);
	}, []);
	const handleGoogleClick = () => {
		setOauthError(null);
		try {
			if (!window.open(`${API_BASE}/auth/google`, "google_oauth", "width=500,height=600,left=200,top=100")) {
				setOauthError("Popup diblokir browser. Izinkan popup untuk login Google.");
				toast.error("Popup diblokir browser");
			}
		} catch {
			setOauthError("Gagal membuka login Google. Coba lagi.");
			toast.error("Gagal membuka login Google");
		}
	};
	const handleManualLogin = (e) => {
		e.preventDefault();
		if (!email || !password || !email.includes("@") || password.length < 6) {
			setIsError(true);
			setIsShaking(true);
			setTimeout(() => setIsShaking(false), 500);
			return;
		}
		setIsError(false);
		setIsShaking(true);
		setTimeout(() => {
			setIsShaking(false);
			setIsError(true);
		}, 300);
	};
	const avatarSrc = googleUser?.avatarUrl || googleUser?.picture || null;
	const initials = googleUser ? googleUser.name.split(" ").map((p) => p.charAt(0).toUpperCase()).slice(0, 2).join("") || "?" : "?";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmbientBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-grid min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 text-lg font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" })
					}), "Balasin"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3",
					children: googleUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						onMouseEnter: handleMouseEnter,
						onMouseLeave: handleMouseLeave,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "flex cursor-pointer items-center gap-2.5 rounded-full border border-border bg-card/50 p-1 pr-3 transition-colors hover:bg-accent focus-visible:outline-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative flex size-8 shrink-0",
									children: avatarSrc && !avatarError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: avatarSrc,
										alt: "Profile",
										referrerPolicy: "no-referrer",
										onError: () => setAvatarError(true),
										className: "size-8 rounded-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-8 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary",
										children: initials
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden text-sm font-medium sm:inline-block",
									children: googleUser.name.split(" ")[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3.5 text-muted-foreground" })
							]
						}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-full right-0 pt-2 z-50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-56 rounded-md border bg-popover p-1 shadow-md",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-2 py-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold",
											children: googleUser.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-muted-foreground truncate",
											children: googleUser.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "-mx-1 my-1 h-px bg-muted" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setIsOpen(false);
											setShowLogin(true);
										},
										className: "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "mr-2 size-4" }), "Tambahkan akun lain"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => handleLogout(),
										className: "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent text-red-600 focus:text-red-600 hover:text-red-600",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 size-4" }), "Log Out / Keluar"]
									})
								]
							})
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setShowLogin(true),
						className: "cursor-pointer rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(16,185,129,0.35)] will-change-transform active:translate-y-0",
						children: "Masuk"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: showLogin,
				onOpenChange: setShowLogin,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
              }
              .shake-animation {
                animation: shake 0.5s ease-in-out;
              }
            ` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							className: "items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-center text-xl font-medium",
								children: "Masuk dengan Akun Google Anda"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "text-center text-sm",
								children: "Lanjutkan ke Balasin"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleManualLogin,
							className: `space-y-4 pt-2 ${isShaking ? "shake-animation" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										className: "text-xs text-muted-foreground",
										children: "Email atau Nomor Telepon Google"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										type: "text",
										placeholder: "Email atau nomor telepon",
										value: email,
										onChange: (e) => {
											setEmail(e.target.value);
											if (isError) setIsError(false);
										},
										className: isError ? "border-red-500 focus-visible:ring-red-500" : ""
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "password",
											className: "text-xs text-muted-foreground",
											children: "Kata Sandi / Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "password",
												type: showPassword ? "text" : "password",
												placeholder: "Masukkan kata sandi",
												value: password,
												onChange: (e) => {
													setPassword(e.target.value);
													if (isError) setIsError(false);
												},
												className: isError ? "border-red-500 focus-visible:ring-red-500" : ""
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setShowPassword(!showPassword),
												className: "cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
												children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
											})]
										}),
										isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-red-500 text-xs mt-1 leading-tight",
											children: "Email dan password tidak valid, pastikan akun google anda terdaftar di google"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleGoogleClick,
									className: "cursor-pointer w-full flex items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										className: "size-4 shrink-0",
										viewBox: "0 0 24 24",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												fill: "#4285F4",
												d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												fill: "#34A853",
												d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												fill: "#FBBC05",
												d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												fill: "#EA4335",
												d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lanjutkan dengan Google" })]
								}),
								oauthError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-amber-600 dark:text-amber-400 text-xs leading-tight rounded-md border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 px-3 py-2",
									children: oauthError
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "cursor-pointer w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium",
									children: "Lanjut / Masuk"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-6 pt-14 pb-20 text-center transform-gpu [contain:layout_style_paint]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground",
						children: "Pratinjau antarmuka — data masih contoh"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl will-change-[transform,opacity]",
						children: [
							"Customer service ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-brand",
								children: "WhatsApp"
							}),
							" yang membalas sendiri"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-5 max-w-xl text-base text-muted-foreground",
						children: "Satu platform untuk banyak bisnis: sambungkan nomor WhatsApp, unggah FAQ, dan AI menjawab pelanggan 24 jam dengan jawaban yang Anda kendalikan."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "cta-button",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app",
								children: "Lihat Dashboard Tenant"
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto grid max-w-6xl auto-rows-fr gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3",
				children: fitur.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "flex h-full min-h-[215px] cursor-pointer flex-col panel feature-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "feature-icon flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-base font-semibold",
							children: f.judul
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: f.teks
						})
					]
				}, f.judul))
			})
		]
	})] });
}
//#endregion
export { Landing as component };
