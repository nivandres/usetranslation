import { Placeholder, Replacement } from "./format";
export type Filter<T extends readonly any[], U> = {
    [K in keyof T]: T[K] extends U ? T[K] : never;
}[number];
export type FilterExclude<T extends readonly any[], U> = {
    [K in keyof T]: T[K] extends U ? never : T[K];
}[number];
export declare function filter<T extends readonly unknown[], E extends unknown>(arr: T, unwanted?: readonly E[]): FilterExclude<T, E>[];
export declare function injectVariables<S extends string | undefined>(text: S, variables?: Placeholder, replacement?: Replacement): S;
export type ShiftElement<A extends any[]> = A extends [infer _, ...infer Rest] ? Rest : never;
export type valueof<O extends object> = O extends Record<any, infer V> ? V : never;
export type StringArray<A extends string[], S extends string = "/"> = A extends [infer F, ...infer R] ? F extends string | number ? `${F}${R extends [string, ...any[]] ? `${S}${StringArray<R, S>}` : ""}` : "" : "";
export type SplitString<S extends string, D extends string = "/"> = S extends `${infer T}${D}${infer U}` ? [T, ...SplitString<U, D>] : [S];
export type isArray<A extends any> = A extends any[] ? A : never;
export type CleanArray<A extends readonly any[], K extends keyof A = Exclude<keyof A & string, `${number}` & keyof A>> = Omit<A, K>;
export type IsDefined<T extends unknown | undefined, Def extends any = true, Undef extends any = false> = undefined extends T ? Undef : Def;
export type Value<T extends any = any, O extends any[] = never[]> = T | ((v: T, ...p: O) => T);
export type UValue<T extends any = any, O extends any = never> = Value<T, [O]>;
export type PValue<T extends any = any> = Value<T, [T]>;
export declare function getValue<T extends any, O extends any[]>(v: Value<T, O>, ...p: O): T;
