globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/chatbot_wa.png": {
		"type": "image/png",
		"etag": "\"16456-Up06fQLcQLw6ayqJsrltc/tGEk4\"",
		"mtime": "2026-09-14T07:09:27.899Z",
		"size": 91222,
		"path": "../public/chatbot_wa.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-09-13T07:10:06.340Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/assets/admin-CQqj0uZO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b77-2gvMFNvA8WAg5S7/3hUsgpEJOms\"",
		"mtime": "2026-09-16T06:58:51.943Z",
		"size": 2935,
		"path": "../public/assets/admin-CQqj0uZO.js"
	},
	"/assets/ambient-background-BqPdUk9w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28-A7TdxAUxQf0OShgKK1L3eNS1z6Q\"",
		"mtime": "2026-09-16T06:58:51.968Z",
		"size": 40,
		"path": "../public/assets/ambient-background-BqPdUk9w.js"
	},
	"/assets/analitik-Co6sZn1D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d9ff-8v9DH0C+t477N9QkX82HBhoMUgk\"",
		"mtime": "2026-09-16T06:58:52.001Z",
		"size": 383487,
		"path": "../public/assets/analitik-Co6sZn1D.js"
	},
	"/assets/api-client-KcuIL4gr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"942d-O3/oIzu9C7c4GCdO5JPxpga0JNI\"",
		"mtime": "2026-09-16T06:58:52.053Z",
		"size": 37933,
		"path": "../public/assets/api-client-KcuIL4gr.js"
	},
	"/assets/api-Cwf696Ko.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2583-nZ5fHMsQAtcgVmTYeSw6S7q5lII\"",
		"mtime": "2026-09-16T06:58:52.033Z",
		"size": 9603,
		"path": "../public/assets/api-Cwf696Ko.js"
	},
	"/assets/app-j0XZhNsG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f62-boaww7vptfiO0Tkf7YhR0aSmMsU\"",
		"mtime": "2026-09-16T06:58:52.109Z",
		"size": 3938,
		"path": "../public/assets/app-j0XZhNsG.js"
	},
	"/assets/balas-chat-Cyg4Ry9L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bd9-K6dYCrd1QXQM9PgIf4ls1yDQZpg\"",
		"mtime": "2026-09-16T06:58:52.132Z",
		"size": 15321,
		"path": "../public/assets/balas-chat-Cyg4Ry9L.js"
	},
	"/assets/audit-BVmb_qQ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"439-AKQlXpgVTdpFtloGRHg1cpmf758\"",
		"mtime": "2026-09-16T06:58:52.118Z",
		"size": 1081,
		"path": "../public/assets/audit-BVmb_qQ_.js"
	},
	"/assets/bot-DgVf_5r7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d-YJGYyGywlp89T95cYs3arAveNfE\"",
		"mtime": "2026-09-16T06:58:52.249Z",
		"size": 317,
		"path": "../public/assets/bot-DgVf_5r7.js"
	},
	"/assets/building-2-Bvz1yHIg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-ONxlEAhR5znC+fNGw9ldeEaMXLQ\"",
		"mtime": "2026-09-16T06:58:52.279Z",
		"size": 372,
		"path": "../public/assets/building-2-Bvz1yHIg.js"
	},
	"/assets/balas-iklan-Bh8p6gbc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"209b-zEn6uyy1goypG5isi9mw13x7bqQ\"",
		"mtime": "2026-09-16T06:58:52.213Z",
		"size": 8347,
		"path": "../public/assets/balas-iklan-Bh8p6gbc.js"
	},
	"/assets/button-2FnrQP0I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"783-ojLaRo1O9Stp9qgcH7XOUiQfNsQ\"",
		"mtime": "2026-09-16T06:58:52.300Z",
		"size": 1923,
		"path": "../public/assets/button-2FnrQP0I.js"
	},
	"/assets/calendar-clock-B4tHWtpi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f-HFmiyFkwsoN0Nb3fhiwUpW1QYeA\"",
		"mtime": "2026-09-16T06:58:52.333Z",
		"size": 367,
		"path": "../public/assets/calendar-clock-B4tHWtpi.js"
	},
	"/assets/coins-BPhc8xQv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112-cD2kgJYNgerX2yTfmxkWQo0iFsE\"",
		"mtime": "2026-09-16T06:58:52.375Z",
		"size": 274,
		"path": "../public/assets/coins-BPhc8xQv.js"
	},
	"/assets/copy-DdcoiGF6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-ozuVBaw3WP/Lx2SZnItWHXZ5lOc\"",
		"mtime": "2026-09-16T06:58:52.387Z",
		"size": 225,
		"path": "../public/assets/copy-DdcoiGF6.js"
	},
	"/assets/dist-BQd8ctpu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166a-nVjWzbejWaOGNG3/139MVpCZAdw\"",
		"mtime": "2026-09-16T06:58:52.531Z",
		"size": 5738,
		"path": "../public/assets/dist-BQd8ctpu.js"
	},
	"/assets/dist-6aKBBXvA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6e0-0oyuUEqJKfELEH9K18wCxqzRdQ8\"",
		"mtime": "2026-09-16T06:58:52.434Z",
		"size": 1760,
		"path": "../public/assets/dist-6aKBBXvA.js"
	},
	"/assets/dialog-B3Dzi1AH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a94-Vj2kcy+TPlWerVWoCQ973cESTq4\"",
		"mtime": "2026-09-16T06:58:52.411Z",
		"size": 6804,
		"path": "../public/assets/dialog-B3Dzi1AH.js"
	},
	"/assets/dist-C3_8fEey.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d66-wQifN4oho2pbbHqLHnk5NwIP8QI\"",
		"mtime": "2026-09-16T06:58:52.553Z",
		"size": 3430,
		"path": "../public/assets/dist-C3_8fEey.js"
	},
	"/assets/dist-ClYUPytA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c97-X5oiHW9gNGnwxCaQR9Pdi1dkg1o\"",
		"mtime": "2026-09-16T06:58:52.618Z",
		"size": 7319,
		"path": "../public/assets/dist-ClYUPytA.js"
	},
	"/assets/dist-CSHEonEN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27e-Kl7U66eiPdICyHHI2zYWIM/K1c4\"",
		"mtime": "2026-09-16T06:58:52.586Z",
		"size": 638,
		"path": "../public/assets/dist-CSHEonEN.js"
	},
	"/assets/es2015-B2IiMYgP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57d6-IZ2atxSzAKjeJd/d49eH7dDela8\"",
		"mtime": "2026-09-16T06:58:52.743Z",
		"size": 22486,
		"path": "../public/assets/es2015-B2IiMYgP.js"
	},
	"/assets/eye-DQD0I8CX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f5-2lAjCgKaye+L++pt3EG6SsF8hs0\"",
		"mtime": "2026-09-16T06:58:52.913Z",
		"size": 245,
		"path": "../public/assets/eye-DQD0I8CX.js"
	},
	"/assets/eye-off-Cou9D4Pf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a3-6iIpgSKo90ebxa5xe+fsI09MeAA\"",
		"mtime": "2026-09-16T06:58:52.937Z",
		"size": 419,
		"path": "../public/assets/eye-off-Cou9D4Pf.js"
	},
	"/assets/file-text-gJOW0v1L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"176-9ke4bMeBtGGNM0zUrmPx8Zq4fw0\"",
		"mtime": "2026-09-16T06:58:52.951Z",
		"size": 374,
		"path": "../public/assets/file-text-gJOW0v1L.js"
	},
	"/assets/index-Dc_jmf2f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f631-v8fr1J1Id9CWTWqT1lGKMwsFgNo\"",
		"mtime": "2026-09-16T06:58:51.911Z",
		"size": 390705,
		"path": "../public/assets/index-Dc_jmf2f.js"
	},
	"/assets/input-weVtuG8Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-lYMkUj7SWHKpz4JtWUPzm3gLtSo\"",
		"mtime": "2026-09-16T06:58:52.971Z",
		"size": 620,
		"path": "../public/assets/input-weVtuG8Q.js"
	},
	"/assets/key-round-G4mwDByj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"158-O0btIb22iZfExHXxRbtHH0MQbYs\"",
		"mtime": "2026-09-16T06:58:53.013Z",
		"size": 344,
		"path": "../public/assets/key-round-G4mwDByj.js"
	},
	"/assets/label-BKwqth0I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ce-JLFjgjIE/n2YGnEMcY/DFsCuemo\"",
		"mtime": "2026-09-16T06:58:53.079Z",
		"size": 718,
		"path": "../public/assets/label-BKwqth0I.js"
	},
	"/assets/layout-dashboard-DEyhDv-X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"154-VUEB5R55H5IvAh14eMQ6K2gfF5U\"",
		"mtime": "2026-09-16T06:58:53.149Z",
		"size": 340,
		"path": "../public/assets/layout-dashboard-DEyhDv-X.js"
	},
	"/assets/licenses-B29KkD5K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff8-cPmm/HmiurUoeXdh57Cye83J2YQ\"",
		"mtime": "2026-09-16T06:58:53.176Z",
		"size": 4088,
		"path": "../public/assets/licenses-B29KkD5K.js"
	},
	"/assets/message-square-6AF3nxUy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"de-NOHpgjb4tVJZx8xcV5eQjoNP5No\"",
		"mtime": "2026-09-16T06:58:53.811Z",
		"size": 222,
		"path": "../public/assets/message-square-6AF3nxUy.js"
	},
	"/assets/messages-square-DMsFaYl6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"162-wk2pwV6gw131sIlfb/eOl3BA31k\"",
		"mtime": "2026-09-16T06:58:53.980Z",
		"size": 354,
		"path": "../public/assets/messages-square-DMsFaYl6.js"
	},
	"/assets/masuk-Bp9cd_-x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a37-WYWntYnG7klLPwPEDopFdZMfJqY\"",
		"mtime": "2026-09-16T06:58:53.614Z",
		"size": 2615,
		"path": "../public/assets/masuk-Bp9cd_-x.js"
	},
	"/assets/lisensi-SUEaEoeJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cbf-Cpp/On4NSwZWg+qvE+M7/hTEv2s\"",
		"mtime": "2026-09-16T06:58:53.389Z",
		"size": 7359,
		"path": "../public/assets/lisensi-SUEaEoeJ.js"
	},
	"/assets/percakapan-cgXQmruO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a7f-d2xG0HCc4S5NrCmJQE4EXMsj6gs\"",
		"mtime": "2026-09-16T06:58:54.227Z",
		"size": 6783,
		"path": "../public/assets/percakapan-cgXQmruO.js"
	},
	"/assets/plus-D_muo-aw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e-/SToIrowEb4Ivzr+Tozvs1sAXDY\"",
		"mtime": "2026-09-16T06:58:54.269Z",
		"size": 142,
		"path": "../public/assets/plus-D_muo-aw.js"
	},
	"/assets/pengetahuan-DgZP6WKM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30c1-fnS5Q8VgPRleEhWeAcaj4VFo+0I\"",
		"mtime": "2026-09-16T06:58:54.209Z",
		"size": 12481,
		"path": "../public/assets/pengetahuan-DgZP6WKM.js"
	},
	"/assets/progress-B2ZFHXv3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ef-euiYI1xIlpyZUxEDClkVnjZCdQc\"",
		"mtime": "2026-09-16T06:58:54.302Z",
		"size": 2287,
		"path": "../public/assets/progress-B2ZFHXv3.js"
	},
	"/assets/qr-code-Ciz4XTuY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-nHfBvWnuaM1KN5v7kH+X7Edm6KQ\"",
		"mtime": "2026-09-16T06:58:54.387Z",
		"size": 639,
		"path": "../public/assets/qr-code-Ciz4XTuY.js"
	},
	"/assets/route-qS5VXe0N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70c-fDI5UgTZbw6CLSXhixHwr9+OAxI\"",
		"mtime": "2026-09-16T06:58:54.448Z",
		"size": 1804,
		"path": "../public/assets/route-qS5VXe0N.js"
	},
	"/assets/route-dy31t7sf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ef0-Gsk+At8d2ddGr2HA4m/24MBW5Qs\"",
		"mtime": "2026-09-16T06:58:54.427Z",
		"size": 7920,
		"path": "../public/assets/route-dy31t7sf.js"
	},
	"/assets/routes-DNOyZSk0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c80-Gj2B3AVuS78XaXQXLd4cog0xF6g\"",
		"mtime": "2026-09-16T06:58:54.490Z",
		"size": 11392,
		"path": "../public/assets/routes-DNOyZSk0.js"
	},
	"/assets/search-BgoB9XBl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-hTGekbEts2TsMtIRVAbtPkfyQN4\"",
		"mtime": "2026-09-16T06:58:54.516Z",
		"size": 163,
		"path": "../public/assets/search-BgoB9XBl.js"
	},
	"/assets/shield-check-Bnf8iOZe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-jJAqBniPLMsbtV6rhK44z0IDD6Y\"",
		"mtime": "2026-09-16T06:58:54.565Z",
		"size": 309,
		"path": "../public/assets/shield-check-Bnf8iOZe.js"
	},
	"/assets/select-DbGml6QY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bb60-8afyffSQpMOLvwlwrnIvygckyb8\"",
		"mtime": "2026-09-16T06:58:54.537Z",
		"size": 47968,
		"path": "../public/assets/select-DbGml6QY.js"
	},
	"/assets/shell-LxqYcXza.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1889-q9Z93/5ArFvdLhJCRgj6e4B6TMk\"",
		"mtime": "2026-09-16T06:58:54.550Z",
		"size": 6281,
		"path": "../public/assets/shell-LxqYcXza.js"
	},
	"/assets/smartphone-DLappVvZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba-kLylyVUtp95oJPoNa+kwy7u/yeQ\"",
		"mtime": "2026-09-16T06:58:54.580Z",
		"size": 186,
		"path": "../public/assets/smartphone-DLappVvZ.js"
	},
	"/assets/stat-card-B4m3j2ug.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"357-LMG8jRCz0jVJbALmeKB0oXQqaEI\"",
		"mtime": "2026-09-16T06:58:54.596Z",
		"size": 855,
		"path": "../public/assets/stat-card-B4m3j2ug.js"
	},
	"/assets/status-pill-Cwy51Lgi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"340-/tEmSfuJx0KtWXCbNoPHe8LOvD8\"",
		"mtime": "2026-09-16T06:58:54.614Z",
		"size": 832,
		"path": "../public/assets/status-pill-Cwy51Lgi.js"
	},
	"/assets/styles-2FBUwh81.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1840b-911GUa7ksS16fIfdtzW3+g+W0dE\"",
		"mtime": "2026-09-16T06:58:54.984Z",
		"size": 99339,
		"path": "../public/assets/styles-2FBUwh81.css"
	},
	"/assets/switch-rwXTNG4P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f8-rUIqNdiHvgKcml+EbO4wlNLLGlU\"",
		"mtime": "2026-09-16T06:58:54.637Z",
		"size": 4344,
		"path": "../public/assets/switch-rwXTNG4P.js"
	},
	"/assets/table-yY4q3e9n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"66b-Han2pydrLsIaFKSCSdNrAyKe3Kk\"",
		"mtime": "2026-09-16T06:58:54.660Z",
		"size": 1643,
		"path": "../public/assets/table-yY4q3e9n.js"
	},
	"/assets/tenants.index-Cke4b-0J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"920-aoLrD5HIMZwKSfZdXEfEptoBHnc\"",
		"mtime": "2026-09-16T06:58:54.732Z",
		"size": 2336,
		"path": "../public/assets/tenants.index-Cke4b-0J.js"
	},
	"/assets/tenants._tenantId-as4CP5kg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c84-I8tPiYKF1w/kVtrfyVDLFvvZYOQ\"",
		"mtime": "2026-09-16T06:58:54.691Z",
		"size": 3204,
		"path": "../public/assets/tenants._tenantId-as4CP5kg.js"
	},
	"/assets/textarea-95xZ81Re.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"206-VvKFGQDyHwbJFIET1WY2wn81AoU\"",
		"mtime": "2026-09-16T06:58:54.743Z",
		"size": 518,
		"path": "../public/assets/textarea-95xZ81Re.js"
	},
	"/assets/trash-2-CzuT7b7o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d-T0E1RUkwZihsz5vc74OhYdQELgY\"",
		"mtime": "2026-09-16T06:58:54.750Z",
		"size": 317,
		"path": "../public/assets/trash-2-CzuT7b7o.js"
	},
	"/assets/user-BLwwnIML.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b9-EW2oHiskgJeaEKgu+jsPkmkDy9M\"",
		"mtime": "2026-09-16T06:58:54.835Z",
		"size": 185,
		"path": "../public/assets/user-BLwwnIML.js"
	},
	"/assets/uji-coba--tjAWFi_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d21-mVLZuxkgnZtPvp9pthpRMF4Md+M\"",
		"mtime": "2026-09-16T06:58:54.811Z",
		"size": 7457,
		"path": "../public/assets/uji-coba--tjAWFi_.js"
	},
	"/assets/user-plus-C8Vuvpsj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21d-bdmLuogKymW09hK6tgukzEShQRI\"",
		"mtime": "2026-09-16T06:58:54.850Z",
		"size": 541,
		"path": "../public/assets/user-plus-C8Vuvpsj.js"
	},
	"/assets/utils-BPQ_dfDP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70b1-5oDZhoVjyHURU7hArxDXBPpbIgU\"",
		"mtime": "2026-09-16T06:58:54.880Z",
		"size": 28849,
		"path": "../public/assets/utils-BPQ_dfDP.js"
	},
	"/assets/whatsapp-C1VYyq3h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1237-KI5BhJXIGQK39bLEMdttJSc9/1M\"",
		"mtime": "2026-09-16T06:58:54.950Z",
		"size": 4663,
		"path": "../public/assets/whatsapp-C1VYyq3h.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_alBrKo = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_alBrKo
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
