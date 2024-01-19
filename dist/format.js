import { filter } from "./utils";
export const reserveKeys = [
    "key",
    "page",
    "index",
    "global",
    "g",
    "t",
    "translate",
    "translator",
    "time",
    "tools",
    "translation",
    "default",
    "intl",
    "Intl",
    "tr",
    "variables",
    "details",
    "use",
    "search",
    "original",
    "heritage",
    "child",
    "get",
    "langs",
    "lang",
    "raw",
    "f",
    "t",
    "l",
    "p",
    "parent",
    "do",
    "go",
    "query",
    "heaven",
    "children",
    "fix",
    "variables",
    "setVariables",
    "values",
    "setValues",
    "from",
    "apply",
];
export const invalidTranslationKeys = reserveKeys;
export function processNode(node, { values, process, } = {
    values: {},
    process: true,
}) {
    let processedNode = {
        values: { ...(values || {}) },
        children: [],
    };
    if (typeof node === "string") {
        processedNode.base = node;
    }
    if (typeof node === "object") {
        if (Array.isArray(node)) {
            if (process)
                processedNode.children = Object.keys(node)
                    .map((c) => String(c))
                    .filter((a) => a);
        }
        else {
            if (typeof node["base"] === "string")
                processedNode.base = node["base"];
            if (typeof node["values"] === "object")
                processedNode.values = {
                    ...processedNode.values,
                    ...node["values"],
                };
            if (process)
                processedNode.children = filter(Object.keys(node), [
                    ...reserveKeys,
                    "base",
                    "values",
                ]);
        }
    }
    return processedNode;
}
export const defaultReplacement = { init: "{", end: "}" };
export const getReplacement = (r) => {
    let init, end;
    switch (true) {
        case typeof r === "number" || typeof r == "bigint":
            r = String(r);
        case typeof r === "string":
            r = r;
            const m = r.length / 2;
            init = r.slice(0, m);
            end = r.slice(-m);
            break;
        case typeof r === "object" && Array.isArray(r):
            init = r[0] || "Symbol()";
            end = r[1] || "Symbol()";
            break;
        case typeof r === "object" && !Array.isArray(r):
            init = r.init;
            end = r.end;
            break;
        case typeof r === "boolean":
            init = r ? "Symbol()" : defaultReplacement.init;
            end = r ? "Symbol()" : defaultReplacement.end;
            break;
        default:
            init = defaultReplacement.init;
            end = defaultReplacement.end;
            break;
    }
    return { init: String(init || '{'), end: String(end || '}') };
};
//# sourceMappingURL=format.js.map