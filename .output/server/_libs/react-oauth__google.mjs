import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "./@floating-ui/react-dom+[...].mjs";
//#region node_modules/@react-oauth/google/dist/index.esm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useLoadGsiScript(options = {}) {
	const { nonce, locale, onScriptLoadSuccess, onScriptLoadError } = options;
	const [scriptLoadedSuccessfully, setScriptLoadedSuccessfully] = (0, import_react.useState)(false);
	const onScriptLoadSuccessRef = (0, import_react.useRef)(onScriptLoadSuccess);
	onScriptLoadSuccessRef.current = onScriptLoadSuccess;
	const onScriptLoadErrorRef = (0, import_react.useRef)(onScriptLoadError);
	onScriptLoadErrorRef.current = onScriptLoadError;
	(0, import_react.useEffect)(() => {
		const scriptTag = document.createElement("script");
		scriptTag.src = "https://accounts.google.com/gsi/client";
		if (locale) scriptTag.src += `?hl=${locale}`;
		scriptTag.async = true;
		scriptTag.defer = true;
		scriptTag.nonce = nonce;
		scriptTag.onload = () => {
			var _a;
			setScriptLoadedSuccessfully(true);
			(_a = onScriptLoadSuccessRef.current) === null || _a === void 0 || _a.call(onScriptLoadSuccessRef);
		};
		scriptTag.onerror = () => {
			var _a;
			setScriptLoadedSuccessfully(false);
			(_a = onScriptLoadErrorRef.current) === null || _a === void 0 || _a.call(onScriptLoadErrorRef);
		};
		document.body.appendChild(scriptTag);
		return () => {
			document.body.removeChild(scriptTag);
		};
	}, [nonce]);
	return scriptLoadedSuccessfully;
}
var GoogleOAuthContext = (0, import_react.createContext)(null);
function GoogleOAuthProvider({ clientId, nonce, locale, onScriptLoadSuccess, onScriptLoadError, children }) {
	const scriptLoadedSuccessfully = useLoadGsiScript({
		nonce,
		onScriptLoadSuccess,
		onScriptLoadError,
		locale
	});
	const contextValue = (0, import_react.useMemo)(() => ({
		locale,
		clientId,
		scriptLoadedSuccessfully
	}), [clientId, scriptLoadedSuccessfully]);
	return import_react.createElement(GoogleOAuthContext.Provider, { value: contextValue }, children);
}
//#endregion
export { GoogleOAuthProvider as t };
