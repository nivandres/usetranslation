import { defaultReplacement, getReplacement, } from "./format";
export function filter(arr, unwanted = []) {
    return arr.filter((v) => {
        for (let i = 0; i < unwanted.length; i++) {
            if (v === unwanted[i]) {
                return false;
            }
        }
        return true;
    });
}
export function injectVariables(text, variables, replacement = defaultReplacement) {
    if (text === undefined) {
        return undefined;
    }
    const { init, end } = getReplacement(replacement);
    Object.keys(variables || {}).forEach((k) => {
        text = text.replaceAll(`${init}${k}${end}`, String(variables[k]) || "");
    });
    return text;
}
export function getValue(v, ...p) {
    return typeof v === "function" ? v(...p) : v;
}
//# sourceMappingURL=utils.js.map