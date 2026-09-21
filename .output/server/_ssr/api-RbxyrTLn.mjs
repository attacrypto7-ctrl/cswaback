import { i as getToken, n as apiFetch } from "./api-client-CwhjhSev.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-RbxyrTLn.js
var tenants = [];
var licenses = [];
var waNumbers = [];
var knowledgeDocs = [];
var faqItems = [];
var adTemplates = [];
var chatLogs = [];
var auditLog = [];
var chatHarian = [];
var pemakaianToken = [];
var pertanyaanTeratas = [];
/**
* Daftar mesin AI yang bisa dipilih tenant. Ini konfigurasi model, bukan data contoh dummy.
*/
var aiEngines = [
	{
		id: "deepseek-v4-flash",
		nama: "DeepSeek V4 Flash",
		catatan: "Paling hemat — default"
	},
	{
		id: "gemini-3.5-flash-lite",
		nama: "Gemini 3.5 Flash-Lite",
		catatan: "Latensi rendah"
	},
	{
		id: "claude-haiku-4.5",
		nama: "Claude Haiku 4.5",
		catatan: "Akurasi tertinggi"
	},
	{
		id: "gpt-5.6-luna",
		nama: "GPT-5.6 Luna",
		catatan: "Opsi tengah"
	}
];
/**
* Lapisan data tiruan. Jika token ada (user sudah login), panggil API asli.
* Jika belum login, gunakan data tiruan lokal.
*/
var delay = (value, ms = 120) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
function isLoggedIn() {
	try {
		return getToken() !== null;
	} catch {
		return false;
	}
}
async function safeFetch(path, fallback) {
	try {
		return await apiFetch(path);
	} catch {
		return fallback;
	}
}
var getTenants = () => {
	if (isLoggedIn()) return safeFetch("/admin/tenants", tenants);
	return delay(tenants);
};
var getTenant = (id) => {
	if (isLoggedIn()) return safeFetch(`/admin/tenants/${id}`, tenants.find((t) => t.id === id) ?? null);
	return delay(tenants.find((t) => t.id === id) ?? null);
};
var getLicenses = () => {
	if (isLoggedIn()) return safeFetch("/admin/licenses", licenses);
	return delay(licenses);
};
var getLicensesByTenant = (tenantId) => {
	if (isLoggedIn()) return safeFetch(`/admin/licenses?tenantId=${tenantId}`, licenses.filter((l) => l.tenantId === tenantId));
	return delay(licenses.filter((l) => l.tenantId === tenantId));
};
var getWaNumbers = () => {
	if (isLoggedIn()) return safeFetch("/whatsapp/numbers", waNumbers);
	return delay(waNumbers);
};
var getKnowledgeDocs = () => {
	if (isLoggedIn()) return safeFetch("/knowledge/docs", knowledgeDocs);
	return delay(knowledgeDocs);
};
var getFaqItems = () => {
	if (isLoggedIn()) return safeFetch("/knowledge/faq", faqItems);
	return delay(faqItems);
};
var getAdTemplates = () => {
	if (isLoggedIn()) return safeFetch("/ad-templates", adTemplates);
	return delay(adTemplates);
};
var getChatLogs = () => {
	if (isLoggedIn()) return safeFetch("/chat/logs?limit=100", chatLogs);
	return delay(chatLogs);
};
var getAuditLog = () => {
	if (isLoggedIn()) return safeFetch("/admin/audit?limit=100", auditLog);
	return delay(auditLog);
};
var getAnalytics = () => {
	if (isLoggedIn()) return safeFetch("/analytics/overview", {
		chatHarian,
		pemakaianToken,
		pertanyaanTeratas
	});
	return delay({
		chatHarian,
		pemakaianToken,
		pertanyaanTeratas
	});
};
var formatNumber = (n) => new Intl.NumberFormat("id-ID").format(n);
var formatDate = (iso) => new Date(iso).toLocaleDateString("id-ID", {
	day: "2-digit",
	month: "short",
	year: "numeric"
});
var daysLeft = (iso) => Math.ceil((new Date(iso).getTime() - (/* @__PURE__ */ new Date("2026-09-13")).getTime()) / 864e5);
//#endregion
export { getAdTemplates as a, getChatLogs as c, getLicenses as d, getLicensesByTenant as f, getWaNumbers as h, formatNumber as i, getFaqItems as l, getTenants as m, daysLeft as n, getAnalytics as o, getTenant as p, formatDate as r, getAuditLog as s, aiEngines as t, getKnowledgeDocs as u };
