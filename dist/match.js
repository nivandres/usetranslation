import { match as m } from "@formatjs/intl-localematcher";
import { BCPList } from "./locales";
import Negotiator from "negotiator";
export const match = (l, langs = BCPList, main = langs[0]) => {
    try {
        const o = m(l.map((m) => lightFix(m)).filter((m) => !m.fallback), [...langs, "ar-CO"], "ar-CO");
        if (o === "ar-CO")
            return Object.assign(main, { fallback: true });
        return o;
    }
    catch (err) {
        return Object.assign(main, { fallback: true });
    }
};
export function lightFix(str, langs = BCPList, main = langs[0]) {
    return (langs.includes(str)
        ? str?.["fallback"]
            ? Object.assign(str, { fallback: true })
            : str
        : Object.assign(main, { fallback: true }));
}
export function fixLang(str, langs = BCPList, main = langs[0]) {
    const l = lightFix(str, langs, main);
    if (typeof l === "string")
        return l;
    return match(str?.trim().match(/[a-z]{2}(?:[-_][A-Z]{2})?|[A-Z]{2}/gm) || [], langs, main);
}
export function getLangFromHeaders(headers, langs = BCPList, main = langs[0]) {
    const l = new Negotiator({ headers }).languages();
    return match(l, langs, main);
}
export function getLangFromPathname(pathname, langs = BCPList, main = langs[0]) {
    return lightFix(match(pathname
        .replaceAll("_", "-")
        .split("/")
        .filter((a) => a), langs, main), langs, main);
}
export function getLangFromList(list, langs = BCPList, main = langs[0]) {
    return match(list.map((e) => lightFix(e)), langs, main);
}
export function getLangFromRecord(record, langs = BCPList, main = langs[0]) {
    return fixLang(JSON.stringify(record), langs, main);
}
export function getLangFromNavigator(langs = BCPList, main = langs[0]) {
    try {
        // @ts-ignore
        const n = window.navigator;
        // @ts-ignore
        let chosen = lightFix(langs.includes(n.language) ? n.language : "", langs, main);
        return chosen.fallback ? match(n.languages, langs, main) : chosen;
    }
    catch (err) {
        return Object.assign(main, { fallback: true });
    }
}
//# sourceMappingURL=match.js.map