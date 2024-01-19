import { useEffect, useState } from "react";
import { getValue } from "./utils";
import { getLangFromPathname, lightFix, fixLang, getLangFromNavigator, } from "./match";
const lskey = `nivandres-use-translation[npm]/locale-language-selection`;
export function setStaticState(l) {
    // @ts-ignore
    const lang = typeof l === "string" ? l : l(localStorage.getItem(lskey));
    try {
        // @ts-ignore
        return localStorage.setItem(lskey, String(lang));
    }
    catch (err) {
        return false;
    }
}
export function getStaticState() {
    try {
        // @ts-ignore
        return localStorage.getItem(lskey) || null;
    }
    catch (err) {
        return null;
    }
}
export function tryToRefresh(o) {
    if (!o)
        return;
    try {
        // @ts-ignore
        location.reload();
    }
    catch (err) {
        return err;
    }
}
export const useLangHook = (fix, langs, main) => {
    const [lang, setLang] = useState(main);
    useEffect(() => {
        let chosen = lightFix(main);
        try {
            if (chosen.fallback) {
                // @ts-ignore
                chosen = getLangFromPathname(location.pathname, langs, main);
            }
            if (chosen.fallback) {
                // @ts-ignore
                chosen = lightFix(String(localeStorage.getItem(lskey)), langs, main);
            }
            if (chosen.fallback) {
                chosen = fixLang(
                // @ts-ignore
                (document.cookie || "")
                    .split(";")
                    .filter((c) => c.includes("local") ||
                    c.includes("transl") ||
                    c.includes("lang"))
                    .join(""), langs, main);
            }
            if (chosen.fallback) {
                chosen = getLangFromNavigator(langs, main);
            }
        }
        catch (e) {
            chosen = main;
        }
        setLang(fix(chosen));
    }, []);
    return [
        lang,
        (value) => {
            let v = getValue(value);
            setStaticState(v);
            setLang(v);
        },
    ];
};
export function resolveLangHook(hook, langs, ref) {
    let h = [ref, setStaticState, [{}]];
    const u = hook(fixLang, langs, ref, null) || ref;
    if (typeof u === "string") {
        h[0] = u;
    }
    else if (typeof u === "object") {
        h[0] = u.value || u[0] || h[0];
        h[1] = u.stateHandler || u[1] || h[1];
        h[2] = u.dependencies || u.hook || u[2] || u[1] || h[2];
    }
    return h;
}
//# sourceMappingURL=hook.js.map