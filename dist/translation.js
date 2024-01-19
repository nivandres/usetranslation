import { useMemo, useState } from "react";
import { processNode, reserveKeys, } from "./format";
import { getLocaleFromBCP } from "./locales";
import { createTimeFunction } from "./functions";
import { setStaticState, getStaticState, resolveLangHook, useLangHook, tryToRefresh, } from "./hook";
import { injectVariables, getValue } from "./utils";
import { fixLang, lightFix } from "./match";
function s(p, t) {
    const k = p.shift();
    if (k === undefined || [...reserveKeys, "base", "values"].includes(k)) {
        return t;
    }
    else if (t[k]) {
        return s(p, t[k] || {});
    }
    else {
        return t || {};
    }
}
export function createTranslation({ locales, mainLocale: main, replacement, variables, timeFormatOptions, onNotTranslated, onFail, useHook: Hook_function, apply, defaultTime, static: static_hook, debug, getLang: getL, setLang: setL, }, Hook) {
    variables = (variables || {});
    const langs = Object.keys(locales);
    const reference = (!main
        ? locales[langs[0]]
        : typeof main == "string"
            ? locales[main]
            : main);
    let ref = typeof main === "string"
        ? main
        : (langs.find((l) => (locales[l] == reference ? true : false)) ||
            "unknown");
    let translation = {
        langs,
        ref,
        main: ref,
        times: {},
        localeList: {},
        locales: [],
    };
    function traverse(translated, original, heritage) {
        const r = processNode(original);
        const n = processNode(translated);
        let d = {};
        const values = { ...r.values, ...n.values, ...heritage.values };
        const children = n.children;
        const base = injectVariables(n.base ||
            (onNotTranslated && r.base
                ? onNotTranslated(r.base, heritage.lang, r.base.length, values)
                : undefined) ||
            r.base, values, replacement);
        const useV = function Use(variables) {
            const { parent, child, values } = heritage;
            return (parent[child] = traverse(translated, original, {
                ...heritage,
                values: { ...heritage.values, ...values, ...variables },
            }));
        };
        const use = heritage.god
            ? function (variables) {
                const nd = {};
                langs
                    .filter((a) => a != ref)
                    .forEach((l) => {
                    nd[l] = translation[l].use(variables);
                    nd[l].t = nd[l];
                });
                const ld = useV(variables);
                ld.t = ld;
                return (translation = Object.assign(ld, nd, { [ref]: ld }));
            }
            : useV;
        const search = (...req) => {
            let variables = undefined;
            let relativeDirection;
            if (typeof req[req.length - 1] === "object" &&
                !Array.isArray(req[req.length])) {
                variables = req.pop();
            }
            if (req.length - 1) {
                relativeDirection = req;
            }
            else {
                relativeDirection = req[0];
            }
            let path = [];
            if (typeof relativeDirection === "string") {
                path = relativeDirection.split("/").filter((a) => a);
            }
            else if (typeof relativeDirection === "object" &&
                Array.isArray(relativeDirection)) {
                path = relativeDirection;
            }
            else {
                return d;
            }
            if (heritage.god) {
                const nd = {};
                langs
                    .filter((a) => a != ref)
                    .forEach((l) => {
                    nd[l] = s(path.flat(), translation[l]).set(variables);
                    nd[l].t = nd[l];
                });
                const ld = s(path, d).set(variables);
                ld.t = ld;
                return Object.assign(ld, nd, { [ref]: ld });
            }
            return s(path, d).set(variables);
        };
        const C = ({ values, path, }) => {
            return search(path, values)?.base;
        };
        const details = {
            base: base ?? null,
            raw: n.base,
            values,
            children,
            search,
            get: search,
            s: search,
            use: search,
            u: use,
            fix: use,
            do: search,
            upperCase: base?.toUpperCase(),
            lowerCase: base?.toLowerCase(),
            C,
            FC: C,
            set: use,
            go: search,
            lang: heritage.lang,
            path: search,
            find: search,
            f: search,
            intl: Intl,
            apply: (...params) => apply?.(base || "", ...params),
            Intl: Intl,
            langs,
            t: d,
            g: translation,
            local: heritage.parent,
            locale: translation.localeList[heritage.lang],
            parent: heritage.parent,
            p: heritage.parent,
            l: heritage.parent,
            time: translation.times[heritage.lang],
            setVariables: use,
            variables: values,
            original: r.base || "",
            query: heritage.lang,
            from: ref,
            locales: translation.locales,
            heritage: heritage.values,
            child: heritage.child,
            heaven: () => (heritage.god = true),
        };
        d = Object.assign((base ?? search), {
            ...details,
            details,
        });
        children.map((c) => {
            // @ts-ignore
            d[c] = traverse(translated[c] || original[c], original[c], {
                values,
                parent: d,
                child: c,
                lang: heritage.lang,
            });
            d[c].t = d[c];
        });
        return d;
    }
    langs.map((lang) => {
        translation.times[lang] = createTimeFunction(lang, timeFormatOptions, onFail, defaultTime);
        let detail = Object.assign(getLocaleFromBCP(lang), {
            lang,
            locale: lang,
        });
        translation.localeList[lang] = detail;
        translation.locales.push(detail);
        translation[lang] = traverse(locales[lang], reference, {
            values: { ...(variables || {}) },
            parent: translation,
            child: lang,
            god: ref === lang ? true : undefined,
            lang,
        });
        translation[lang].g = translation;
        translation[lang].t = translation[lang];
        translation[lang].T = translation[lang];
    });
    translation = Object.assign(translation[ref], translation);
    const t = translation;
    const doTranslation = (path, predeterminated_variables, selected_language) => {
        const lang = lightFix(selected_language, langs, ref);
        // @ts-ignore
        t[lang] = t[lang] || t[ref];
        // @ts-ignore
        t[lang].heaven();
        const tr = path // @ts-ignore
            ? t[lang].search(path, predeterminated_variables)
            : // @ts-ignore
                t[lang].use(default_variables ? values : undefined);
        return Object.fromEntries(Object.entries(tr).filter(([key]) => !Number.isInteger(key)));
    };
    const useTranslation = (path, defaultVariables, preferredLang) => {
        const staticLang = useMemo(() => {
            let r;
            try {
                r = getL?.();
            }
            catch (err) {
                onFail?.(err, false);
            }
            r ||= getStaticState();
            return lightFix(preferredLang || r, langs);
        }, []);
        const [lang, setHookLang, dependencies] = resolveLangHook((Hook || Hook_function || static_hook
            ? () => useState(staticLang)
            : useLangHook), langs, staticLang);
        const [values, setValues] = useState({
            ...(variables || {}),
            ...(defaultVariables || {}),
        });
        const setLang = (va) => {
            const v = lightFix(va);
            try {
                setStaticState(v);
                setHookLang(v);
                setL?.(v);
            }
            catch (err) {
                return err;
            }
        };
        return Object.assign([lang, setLang, setValues, dependencies], doTranslation(path, values, lang), {
            lang,
            setLang,
            setValues,
            dependencies,
        });
    };
    const setLang_ = (value, refresh = true) => {
        const v = lightFix(getValue(value, getStaticState() || ref));
        try {
            setStaticState(v);
            setL?.(v);
        }
        catch (err) { }
        tryToRefresh(refresh);
    };
    const getTranslation = (path, defaultVariables, preferredLang) => {
        let staticLang;
        try {
            staticLang = getL?.();
        }
        catch (err) {
            onFail?.(err, false);
        }
        staticLang ||= getStaticState();
        staticLang = lightFix(staticLang, langs);
        const lang = preferredLang || staticLang;
        const setLang = setLang_;
        const setValues = () => { };
        const dependencies = [{}];
        const values = {
            ...(variables || {}),
            ...(defaultVariables || {}),
        };
        return Object.assign([lang, setLang, setValues, dependencies], doTranslation(path, values, lang), {
            lang,
            setLang,
            setValues,
            dependencies,
        });
    };
    return {
        t,
        translation: t,
        useTranslation,
        getTranslation,
        langs,
        lang: langs[0],
        main: ref,
        list: translation.localeList,
        locales: translation.locales,
        time: createTimeFunction(ref, timeFormatOptions, onFail, defaultTime),
        setLang: setLang_,
        T: t,
        fix: (str) => fixLang(str, langs, ref),
    };
}
//# sourceMappingURL=translation.js.map