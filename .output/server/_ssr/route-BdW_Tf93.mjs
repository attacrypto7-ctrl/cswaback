import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as LayoutDashboard, I as FlaskConical, J as ChartColumn, S as MessagesSquare, d as Smartphone, j as KeyRound, k as Library, w as Megaphone, x as MessageSquare } from "../_libs/lucide-react.mjs";
import { t as DashboardShell } from "./shell-DqMou3Zp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-BdW_Tf93.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/app",
		label: "Ringkasan",
		icon: LayoutDashboard
	},
	{
		to: "/app/whatsapp",
		label: "Koneksi WhatsApp",
		icon: Smartphone
	},
	{
		to: "/app/pengetahuan",
		label: "Basis Pengetahuan",
		icon: Library
	},
	{
		to: "/app/balas-chat",
		label: "Balas Chat Otomatis",
		icon: MessageSquare
	},
	{
		to: "/app/balas-iklan",
		label: "Balas Iklan Otomatis",
		icon: Megaphone
	},
	{
		to: "/app/percakapan",
		label: "Riwayat Chat",
		icon: MessagesSquare
	},
	{
		to: "/app/uji-coba",
		label: "Uji Coba Bot",
		icon: FlaskConical
	},
	{
		to: "/app/analitik",
		label: "Analitik",
		icon: ChartColumn
	},
	{
		to: "/app/lisensi",
		label: "Lisensi",
		icon: KeyRound
	}
];
function TenantLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		title: "Balasin",
		subtitle: "Dashboard Tenant",
		items
	});
}
//#endregion
export { TenantLayout as component };
