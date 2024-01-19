import { FormatList } from "./locales";
import { CleanArray, filter, valueof } from "./utils";

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
] as const;

export const invalidTranslationKeys = reserveKeys;

export type InvalidTranslationKeys = (typeof invalidTranslationKeys)[number];

export type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type Base = string | number;
export type Key = string | number;
export type Placeholder = Record<string, Base | null | undefined>;

export type Node =
  | Base
  | readonly Node[]
  | readonly [Node, ...Node[]]
  | ({
      readonly [key: Key]: Node;
    } & {
      readonly values?: Placeholder;
      readonly base?: Base;
      // readonly fallback?: Base;
    } & {
      // [N in InvalidTranslationKeys]?: never;
    });

export type Keep<T> = T extends Base
  ? Base
  : T extends [infer F, ...infer R]
  ? readonly [Keep<F>, ...Keep<R>]
  : {
      readonly [K in keyof T]: T[K] extends object ? Keep<T[K]> : T[K];
    };

// export type Check<T extends object> = valueof<{
//   [K in keyof T]: K extends InvalidTranslationKeys ? true : never;
// }> extends true
//   ? never
//   : T;

// export type Review<T extends any> = T extends object
//   ? T extends any[]
//     ? T
//     : Check<T>
//   : T;

export interface SimpleNode {
  base?: string;
  children: string[];
  values: Placeholder;
}

export function processNode(
  node: Node,
  {
    values,
    process,
  }: {
    values?: Placeholder;
    process?: boolean;
  } = {
    values: {},
    process: true,
  }
): SimpleNode {
  let processedNode = {
    values: { ...(values || {}) },
    children: [],
  } as SimpleNode;
  if (typeof node === "string") {
    processedNode.base = node;
  }
  if (typeof node === "object") {
    if (Array.isArray(node)) {
      if (process)
        processedNode.children = Object.keys(node)
          .map((c) => String(c))
          .filter((a) => a);
    } else {
      if (typeof node["base" as any] === "string")
        processedNode.base = node["base" as any] as string;
      if (typeof node["values" as any] === "object")
        processedNode.values = {
          ...processedNode.values,
          ...(node["values" as any] as Placeholder),
        };
      if (process)
        processedNode.children = filter(Object.keys(node), [
          ...reserveKeys,
          "base",
          "values",
        ] as const);
    }
  }
  return processedNode;
}

export type ReplacementParams = { init: string, end: string };

export type Replacement =
  | string
  | ReplacementParams
  | [string, string]
  | `${string}x${string}`
  | boolean;

export const defaultReplacement: Replacement = { init: "{", end: "}" };

export const getReplacement = (r: Replacement): ReplacementParams => {
  let init, end;
  switch (true) {
    case typeof r === "number" || typeof r == "bigint":
      r = String(r);
    case typeof r === "string":
      r = r as string;
      const m = r.length / 2;
      init = r.slice(0, m);
      end = r.slice(-m);
      break;
    case typeof r === "object" && Array.isArray(r):
      init = r[0 as keyof typeof r] || "Symbol()";
      end = r[1 as keyof typeof r] || "Symbol()";
      break;
    case typeof r === "object" && !Array.isArray(r):
      init = (r as ReplacementParams).init;
      end = (r as ReplacementParams).end;
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

export type ProcessNode<
  N extends Node,
  V extends Placeholder = {}
> = N extends object
  ? N extends readonly any[]
    ? {
        readonly node: N & Array<unknown>;
        readonly type: `object-array` & `object${string}`;
        readonly base?: undefined;
        readonly children: Exclude<keyof N, keyof any[]>;
        readonly values: V;
      }
    : N extends Record<string, unknown>
    ? {
        readonly node: N & Record<string, unknown>;
        readonly type: `object-object` & `object${string}`;
        readonly base: N["base"] extends string | number
          ? N["base"]
          : undefined;
        readonly children: Exclude<
          keyof N,
          InvalidTranslationKeys | "base" | "values"
        > &
          keyof N;
        readonly values: V &
          (N["values"] extends Placeholder ? N["values"] : Placeholder) &
          Placeholder;
      }
    : never
  : N extends string
  ? {
      readonly node: N & string;
      readonly type: `string`;
      readonly base: N;
      readonly children: never;
      readonly values: V;
    }
  : never;

export type SearchWays<
  N extends Node,
  A extends any[] = [],
  P extends ProcessNode<N> = ProcessNode<N>
> = P["children"] extends never
  ? A
  : valueof<{
      [C in P["children"]]: C extends keyof N
        ? N[C] extends Node
          ? SearchWays<N[C], A extends [...infer F] ? [...F, C] : [C]> | A
          : never
        : never;
    }>;

export type FollowWay<N extends Node, W extends string[]> = W extends [
  infer F,
  ...infer R
]
  ? F extends keyof N
    ? N[F] extends Node
      ? R extends string[]
        ? FollowWay<N[F], R>
        : N
      : N
    : N
  : N;
