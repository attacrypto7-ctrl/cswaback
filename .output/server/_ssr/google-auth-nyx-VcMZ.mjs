//#region node_modules/.nitro/vite/services/ssr/assets/google-auth-nyx-VcMZ.js
function saveGoogleUser(user) {
	const normalized = {
		...user,
		avatarUrl: user.avatarUrl ?? user.picture ?? null,
		picture: user.picture || user.avatarUrl || ""
	};
	localStorage.setItem("balasin_google_user", JSON.stringify(normalized));
	try {
		window.dispatchEvent(new Event("balasin:auth-changed"));
	} catch {}
	try {
		const tenantsRaw = localStorage.getItem("balasin_tenants_cache");
		if (tenantsRaw) {
			const tenants = JSON.parse(tenantsRaw);
			const idx = tenants.findIndex((t) => t.email === normalized.email);
			if (idx >= 0) {
				tenants[idx].avatarUrl = normalized.avatarUrl;
				localStorage.setItem("balasin_tenants_cache", JSON.stringify(tenants));
			}
		}
	} catch {}
}
function getGoogleUser() {
	try {
		const data = localStorage.getItem("balasin_google_user");
		if (!data) return null;
		const parsed = JSON.parse(data);
		return {
			name: parsed.name,
			email: parsed.email,
			picture: parsed.picture || parsed.avatarUrl || "",
			avatarUrl: parsed.avatarUrl ?? parsed.picture ?? null
		};
	} catch {
		return null;
	}
}
function handleLogout() {
	try {
		localStorage.removeItem("balasin_token");
	} catch {}
	try {
		localStorage.removeItem("balasin_role");
	} catch {}
	try {
		localStorage.removeItem("balasin_tenant");
	} catch {}
	try {
		localStorage.removeItem("balasin_google_user");
	} catch {}
	try {
		localStorage.removeItem("balasin_tenants_cache");
	} catch {}
	try {
		sessionStorage.removeItem("balasin_admin_auth");
	} catch {}
	try {
		window.dispatchEvent(new Event("balasin:auth-changed"));
	} catch {}
}
//#endregion
export { handleLogout as n, saveGoogleUser as r, getGoogleUser as t };
