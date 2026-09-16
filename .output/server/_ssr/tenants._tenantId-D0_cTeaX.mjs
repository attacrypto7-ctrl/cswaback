import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tenants._tenantId-D0_cTeaX.js
var $$splitComponentImporter = () => import("./tenants._tenantId-C3UNBWjV.mjs");
var Route = createFileRoute("/admin/tenants/$tenantId")({
	head: () => ({ meta: [
		{ title: "Detail Tenant — Balasin Admin" },
		{
			name: "description",
			content: "Rincian nomor WhatsApp, pemakaian token, dan riwayat lisensi tenant."
		},
		{
			property: "og:title",
			content: "Detail Tenant — Balasin Admin"
		},
		{
			property: "og:description",
			content: "Rincian nomor WhatsApp, pemakaian, dan lisensi tenant."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
