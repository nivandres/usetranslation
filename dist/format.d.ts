import { valueof } from "./utils";
export declare const reserveKeys: readonly ["key", "page", "index", "global", "g", "t", "translate", "translator", "time", "tools", "translation", "default", "intl", "Intl", "tr", "variables", "details", "use", "search", "original", "heritage", "child", "get", "langs", "lang", "raw", "f", "t", "l", "p", "parent", "do", "go", "query", "heaven", "children", "fix", "variables", "setVariables", "values", "setValues", "from", "apply"];
export declare const invalidTranslationKeys: readonly ["key", "page", "index", "global", "g", "t", "translate", "translator", "time", "tools", "translation", "default", "intl", "Intl", "tr", "variables", "details", "use", "search", "original", "heritage", "child", "get", "langs", "lang", "raw", "f", "t", "l", "p", "parent", "do", "go", "query", "heaven", "children", "fix", "variables", "setVariables", "values", "setValues", "from", "apply"];
export type InvalidTranslationKeys = (typeof invalidTranslationKeys)[number];
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Base = string | number;
export type Key = string | number;
export type Placeholder = Record<string, Base | null | undefined>;
export type Node = Base | readonly Node[] | readonly [Node, ...Node[]] | ({
    readonly [key: Key]: Node;
} & {
    readonly values?: Placeholder;
    readonly base?: Base;
} & {});
export type Keep<T> = T extends Base ? Base : T extends [infer F, ...infer R] ? readonly [Keep<F>, ...Keep<R>] : {
    readonly [K in keyof T]: T[K] extends object ? Keep<T[K]> : T[K];
};
export interface SimpleNode {
    base?: string;
    children: string[];
    values: Placeholder;
}
export declare function processNode(node: Node, { values, process, }?: {
    values?: Placeholder;
    process?: boolean;
}): SimpleNode;
export type ReplacementParams = {
    init: string;
    end: string;
};
export type Replacement = string | ReplacementParams | [string, string] | `${string}x${string}` | boolean;
export declare const defaultReplacement: Replacement;
export declare const getReplacement: (r: Replacement) => ReplacementParams;
export type ProcessNode<N extends Node, V extends Placeholder = {}> = N extends object ? N extends readonly any[] ? {
    readonly node: N & Array<unknown>;
    readonly type: `object-array` & `object${string}`;
    readonly base?: undefined;
    readonly children: Exclude<keyof N, keyof any[]>;
    readonly values: V;
} : N extends Record<string, unknown> ? {
    readonly node: N & Record<string, unknown>;
    readonly type: `object-object` & `object${string}`;
    readonly base: N["base"] extends string | number ? N["base"] : undefined;
    readonly children: Exclude<keyof N, InvalidTranslationKeys | "base" | "values"> & keyof N;
    readonly values: V & (N["values"] extends Placeholder ? N["values"] : Placeholder) & Placeholder;
} : never : N extends string ? {
    readonly node: N & string;
    readonly type: `string`;
    readonly base: N;
    readonly children: never;
    readonly values: V;
} : never;
export type SearchWays<N extends Node, A extends any[] = [], P extends ProcessNode<N> = ProcessNode<N>> = P["children"] extends never ? A : valueof<{
    [C in P["children"]]: C extends keyof N ? N[C] extends Node ? SearchWays<N[C], A extends [...infer F] ? [...F, C] : [C]> | A : never : never;
}>;
export type FollowWay<N extends Node, W extends string[]> = W extends [
    infer F,
    ...infer R
] ? F extends keyof N ? N[F] extends Node ? R extends string[] ? FollowWay<N[F], R> : N : N : N : N;
