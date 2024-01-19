import { Node, Keep, Placeholder, Replacement, Size, Base } from "./format";
import { BCP } from "./locales";
import { Translation, LocaleList, LocaleDetail, DoTranslation } from "./types";
import { HookFunction, SetState } from "./hook";
import { PValue, CleanArray } from "./utils";
export declare function createTranslation<AllowedTranslation extends BCP, MainTranslation extends AllowedTranslation, Tree extends Node, Variables extends Placeholder, Apply extends (input: string, ...params: any) => string>({ locales, mainLocale: main, replacement, variables, timeFormatOptions, onNotTranslated, onFail, useHook: Hook_function, apply, defaultTime, static: static_hook, debug, getLang: getL, setLang: setL, }: {
    locales: {
        [translation in AllowedTranslation]: Keep<Tree>;
    };
    mainLocale?: MainTranslation | Exclude<Keep<Tree>, AllowedTranslation | MainTranslation | Base | string>;
    defaultTime?: Date;
    variables?: Variables;
    replacement?: Replacement;
    static?: boolean;
    apply?: Apply;
    getLang?: () => AllowedTranslation;
    setLang?: (lang: AllowedTranslation) => void;
    useHook?: HookFunction<AllowedTranslation, MainTranslation>;
    timeFormatOptions?: Record<Size, Intl.DateTimeFormatOptions>;
    onFail?: <R extends boolean>(e: unknown, required: R) => R extends true ? string : undefined | void;
    onNotTranslated?: (queryString: string, queryLanguage: AllowedTranslation, length: number, variables: Placeholder) => string;
    debug?: boolean;
}, Hook?: HookFunction<AllowedTranslation, MainTranslation>): {
    t: Translation<Tree, AllowedTranslation, MainTranslation, Variables>;
    translation: Translation<Tree, AllowedTranslation, MainTranslation, Variables>;
    useTranslation: DoTranslation<AllowedTranslation, MainTranslation, Tree, Variables, CleanArray<[AllowedTranslation, SetState<AllowedTranslation>, SetState<Variables & Placeholder>, any[]]> & {
        lang: AllowedTranslation;
        setLang: SetState<AllowedTranslation>;
        setValues: SetState<Variables & Placeholder>;
        dependencies: any[];
    }>;
    getTranslation: DoTranslation<AllowedTranslation, MainTranslation, Tree, Variables, CleanArray<[AllowedTranslation, SetState<AllowedTranslation>, SetState<Variables & Placeholder>, any[]]> & {
        lang: AllowedTranslation;
        setLang: SetState<AllowedTranslation>;
        setValues: SetState<Variables & Placeholder>;
        dependencies: any[];
    }>;
    langs: AllowedTranslation[];
    lang: AllowedTranslation;
    main: MainTranslation;
    list: Record<AllowedTranslation, LocaleDetail<AllowedTranslation>>;
    locales: LocaleList<AllowedTranslation>;
    time: ((time: string | number | Date | undefined, format?: Size | Intl.DateTimeFormatOptions, preferredLocale?: any) => string) & {
        use: any;
        useNow: any;
    };
    setLang: (value: PValue<AllowedTranslation>, refresh?: boolean) => void;
    T: Translation<Tree, AllowedTranslation, MainTranslation, Variables>;
    fix: (str?: string | AllowedTranslation) => AllowedTranslation & {
        fallback?: boolean | undefined;
    };
};
