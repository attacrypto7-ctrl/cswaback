//#region node_modules/.nitro/vite/services/ssr/assets/api-client-CwhjhSev.js
/**
* URL service backend `api` (tanpa trailing slash).
* Local:      VITE_API_URL=http://localhost:3000/api
* Railway:    VITE_API_URL=https://<service-api>.up.railway.app/api
*/
var API_BASE = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
}["VITE_API_URL"] || "http://localhost:3000/api";
var TOKEN_KEY = "balasin_token";
var ROLE_KEY = "balasin_role";
var TENANT_KEY = "balasin_tenant";
function getToken() {
	try {
		return localStorage.getItem(TOKEN_KEY);
	} catch {
		return null;
	}
}
function getRole() {
	try {
		return localStorage.getItem(ROLE_KEY) ?? null;
	} catch {
		return null;
	}
}
function saveSession(token, role, tenantId) {
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(ROLE_KEY, role);
	if (tenantId) localStorage.setItem(TENANT_KEY, tenantId);
	else localStorage.removeItem(TENANT_KEY);
}
function clearSession() {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(ROLE_KEY);
	localStorage.removeItem(TENANT_KEY);
}
var ApiError = class extends Error {
	status;
	constructor(status, message) {
		super(message);
		this.status = status;
	}
};
/** Fetch JSON ke backend. Otomatis pasang Bearer token + tendang ke /masuk saat 401. */
async function apiFetch(path, opts = {}) {
	const headers = {};
	let payload;
	if (opts.body instanceof FormData) payload = opts.body;
	else if (opts.body !== void 0) {
		headers["Content-Type"] = "application/json";
		payload = JSON.stringify(opts.body);
	}
	if (opts.auth !== false) {
		const token = getToken();
		if (token) headers["Authorization"] = `Bearer ${token}`;
	}
	const reqInit = {
		method: opts.method ?? "GET",
		headers
	};
	if (payload !== void 0) reqInit.body = payload;
	const res = await fetch(`${API_BASE}${path}`, reqInit);
	if (res.status === 401 && opts.auth !== false) {
		clearSession();
		if (typeof window !== "undefined" && !window.location.pathname.startsWith("/masuk")) window.location.assign("/masuk");
		throw new ApiError(401, "Sesi berakhir, silakan masuk lagi");
	}
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		let message = `Request gagal (${res.status})`;
		try {
			const json = JSON.parse(text);
			if (typeof json?.message === "string") message = json.message;
			else if (Array.isArray(json?.message)) message = json.message.join(", ");
		} catch {
			if (text) message = text.slice(0, 200);
		}
		throw new ApiError(res.status, message);
	}
	if (res.status === 204) return void 0;
	const text = await res.text();
	return text ? JSON.parse(text) : void 0;
}
async function login(email, password) {
	const res = await apiFetch("/auth/login", {
		method: "POST",
		auth: false,
		body: {
			email,
			password
		}
	});
	const role = res.tenantId ? "tenant" : "admin";
	saveSession(res.accessToken, role, res.tenantId);
	return res;
}
function logout() {
	clearSession();
	window.location.assign("/masuk");
}
//#endregion
export { login as a, getToken as i, apiFetch as n, logout as o, getRole as r, saveSession as s, API_BASE as t };
