import {
  Placeholder,
  Replacement,
  defaultReplacement,
  getReplacement,
} from "./format";

export type Filter<T extends readonly any[], U> = {
  [K in keyof T]: T[K] extends U ? T[K] : never;
}[number];

export type FilterExclude<T extends readonly any[], U> = {
  [K in keyof T]: T[K] extends U ? never : T[K];
}[number];

export function filter<T extends readonly unknown[], E extends unknown>(
  arr: T,
  unwanted: readonly E[] = []
): FilterExclude<T, E>[] {
  return arr.filter((v) => {
    for (let i = 0; i < unwanted.length; i++) {
      if (v === (unwanted[i] as any)) {
        return false;
      }
    }
    return true;
  }) as FilterExclude<T, E>[];
}

export function injectVariables<S extends string | undefined>(
  text: S,
  variables?: Placeholder,
  replacement: Replacement = defaultReplacement
): S {
  if (text === undefined) {
    return undefined as any;
  }
  const { init, end } = getReplacement(replacement);
  Object.keys(variables || {}).forEach((k) => {
    text = (text as string).replaceAll(
      `${init}${k}${end}`,
      String((variables as any)[k]) || ""
    ) as any;
  });
  return text as any;
}

export type ShiftElement<A extends any[]> = A extends [infer _, ...infer Rest]
  ? Rest
  : never;

export type valueof<O extends object> = O extends Record<any, infer V>
  ? V
  : never;

export type StringArray<
  A extends string[],
  S extends string = "/"
> = A extends [infer F, ...infer R]
  ? F extends string | number
    ? `${F}${R extends [string, ...any[]] ? `${S}${StringArray<R, S>}` : ""}`
    : ""
  : "";

export type SplitString<
  S extends string,
  D extends string = "/"
> = S extends `${infer T}${D}${infer U}` ? [T, ...SplitString<U, D>] : [S];

export type isArray<A extends any> = A extends any[] ? A : never;

export type CleanArray<
  A extends readonly any[],
  K extends keyof A = Exclude<keyof A & string, `${number}` & keyof A>
> = Omit<A, K>;

export type IsDefined<
  T extends unknown | undefined,
  Def extends any = true,
  Undef extends any = false
> = undefined extends T ? Undef : Def;
