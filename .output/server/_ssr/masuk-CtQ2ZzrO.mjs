import { i as __toESM } from "../_runtime.mjs";
import { a as login } from "./api-client-CwhjhSev.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { E as LogIn, Z as Bot } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AmbientBackground } from "./ambient-background-zlH3T5ma.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/masuk-CtQ2ZzrO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MasukPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [sibuk, setSibuk] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		if (!email.trim()) {
			toast.error("Masukkan email terlebih dahulu");
			return;
		}
		setSibuk(true);
		try {
			const res = await login(email.trim(), password);
			toast.success("Berhasil masuk");
			navigate({ to: res.tenantId ? "/app" : "/admin" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Gagal masuk");
		} finally {
			setSibuk(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmbientBackground, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "surface-grid flex min-h-screen items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-sm space-y-6 p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base font-bold",
						children: "Balasin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Masuk ke dashboard"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								placeholder: "nama@bisnis.id",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								autoComplete: "email"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "password",
									children: "Kata sandi"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									placeholder: "••••••••",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									autoComplete: "current-password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Akun tenant dibuat saat pendaftaran; akun admin dibuat lewat seed database."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "w-full",
							disabled: sibuk,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-4" }),
								" ",
								sibuk ? "Memeriksa..." : "Masuk"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-foreground",
						children: "← Kembali ke beranda"
					})
				})
			]
		})
	})] });
}
//#endregion
export { MasukPage as component };
