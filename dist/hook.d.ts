import React, { Dispatch } from "react";
import { BCP } from "./locales";
export type SetState<T extends unknown = unknown> = Dispatch<React.SetStateAction<T>>;
export type HookFunction<At extends BCP = never, Mt extends At = At> = <A extends At, M extends Mt>(fix: (str: At | string) => At & {
    fallback?: boolean;
}, langs: A[], main: A, prev?: null) => At | string | [At | string] | [At | string, SetState<At>] | [At | string, SetState<At> | undefined, any[]] | {
    value: At | string;
    stateHandler?: SetState<At>;
    dependencies?: any[];
};
export declare function setStaticState(l: string | SetState<string>): any;
export declare function getStaticState(): any;
export declare function tryToRefresh(o?: boolean): unknown;
export declare const useLangHook: HookFunction;
export declare function resolveLangHook(hook: HookFunction, langs: BCP[], ref: BCP): any;
