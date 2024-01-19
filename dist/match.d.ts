import { BCP } from "./locales";
import Negotiator from "negotiator";
export declare const match: <A extends import("./locales/compile").BCP[]>(l: (string | A[number] | undefined)[], langs?: A, main?: A[number]) => A[number] & {
    fallback?: boolean | undefined;
};
export type Headers = Negotiator.Headers;
export declare function lightFix<A extends BCP[]>(str: string | A[number] | undefined, langs?: A, main?: A[number]): A[number] & {
    fallback?: boolean;
};
export declare function fixLang<A extends BCP[]>(str: string | A[number] | undefined, langs?: A, main?: A[number]): A[number] & {
    fallback?: boolean;
};
export declare function getLangFromHeaders<A extends BCP[]>(headers: Negotiator.Headers, langs?: A, main?: A[number]): A[number] & {
    fallback?: boolean;
};
export declare function getLangFromPathname<A extends BCP[]>(pathname: string | `${"" | "/"}${A[number]}${`/${string}` | ""}` | A[number], langs?: A, main?: A[number]): A[number] & {
    fallback?: boolean | undefined;
};
export declare function getLangFromList<A extends BCP[]>(list: (A[number] | string)[], langs?: A, main?: A[number]): A[number] & {
    fallback?: boolean;
};
export declare function getLangFromRecord<A extends BCP[]>(record: Record<string, string | A[number]>, langs?: A, main?: A[number]): A[number] & {
    fallback?: boolean;
};
export declare function getLangFromNavigator<A extends BCP[]>(langs?: A, main?: A[number]): A[number] & {
    fallback?: boolean;
};
