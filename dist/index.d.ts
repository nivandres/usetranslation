import { ISO } from "./locales";
type translationPlaceholder<Values extends string> = {
    readonly base: string;
    readonly values?: Record<Values, string | number>;
};
type TranslationValue<Values extends unknown> = string | translationPlaceholder<Values extends string ? Values : never>;
type JSONFix<K extends unknown, V extends any> = Record<K extends string ? K : never, V>;
type JSONStrict<F extends Record<any, any>> = {
    [P in keyof F]: {
        [K in keyof F[P]]: F[P][K];
    };
};
type JSONTranslation = {
    [p: string]: {
        [k: string]: TranslationValue<unknown>;
    };
};
type JSONFormat = JSONFix<unknown, JSONFix<unknown, unknown>>;
export declare function createTranslation<AllowedTranslations extends ISO, MainTranslation extends AllowedTranslations, QueryLanguage extends AllowedTranslations, Format extends JSONFormat, Translation extends JSONTranslation, Pages extends keyof Translation, DefinedPages extends string>(settings: {
    locales?: {
        [translation in AllowedTranslations]: JSONStrict<Format> & Translation & Record<DefinedPages, unknown>;
    };
    defaultLocale?: MainTranslation | Translation;
    replacement?: string | {
        init: string;
        end: string;
    };
    query?: QueryLanguage;
    disableOutputDetails?: boolean;
    onFail?: (e: unknown) => string;
    onNotTranslation?: (originalQuery: TranslationValue<any>, queryPage: Pages, queryKey: string, queryLanguage: AllowedTranslations, placeholderVariables?: Record<string, string | number>) => string;
    onTranslation?: (translatedString: string, details: {
        queryLanguage: AllowedTranslations;
        queryPage: Pages;
        queryKey: string;
        original: TranslationValue<any>;
        placeholderVariables?: Record<string, number | string>;
    }) => string;
    timeFormatOptions?: {
        [Format in 'xs' | 'sm' | 'md' | 'lg' | 'xl']: Record<string, any>;
    };
    state?: {
        setState: (locale: AllowedTranslations) => any;
        getState: () => AllowedTranslations;
    };
}): {
    translate: <P extends Pages, K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(page: P, key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
        readonly from: MainTranslation;
        readonly to: QueryLanguage;
        readonly query: QueryLanguage;
        readonly page: P;
        readonly key: K;
        readonly original: {
            base: string;
            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
        };
        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
    };
    time: (time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string;
    useTranslation: <Page extends Pages, Key extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][Page]>(page?: Page | undefined, fixedLocale?: AllowedTranslations, fixedVariables?: Record<string, string | number>) => {
        t: ((<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_1;
            readonly key: K_1;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
        }) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_2;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
        }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            };
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & string; } : never); })[Page] & {
            g: (<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_1;
                readonly key: K_1;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
            }) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_2;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_3;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & string; } : never); } & Function;
            time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                now: (() => string) & {
                    use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                };
            };
            intl: typeof Intl;
            locale: AllowedTranslations;
        };
        tr: <P extends Pages, K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(page: P, key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P;
            readonly key: K;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
        };
        g: (<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_1;
            readonly key: K_1;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
        }) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_2;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
        }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            };
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & string; } : never); };
        pages: (<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_1;
            readonly key: K_1;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
        }) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_2;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
        }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: {
                base: string;
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            };
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & string; } : never); };
        time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
            now: (() => string) & {
                use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
            };
        };
        useTime: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
            now: (() => string) & {
                use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
            };
        };
        intl: typeof Intl;
        i: typeof Intl;
        locale: AllowedTranslations;
        locales: AllowedTranslations[];
    };
    pages: Pages[];
    page: Pages;
    defaultLocale: MainTranslation;
    main: MainTranslation;
    locales: AllowedTranslations[];
    locale: AllowedTranslations;
    translations: { [locale in AllowedTranslations]: Translation; };
    genericPage: Pages;
    translation: (fixedLocale?: AllowedTranslations) => {
        useTranslation: (page?: Pages, fixedVariables?: Record<string, string | number>) => {
            t: ((<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_3;
                readonly key: K_4;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
            }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_5;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_1]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_6;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & string; } : never); })[Pages] & {
                g: (<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_3;
                    readonly key: K_4;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
                }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_5;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
                }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_1]: {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                } & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly query: QueryLanguage;
                        readonly page: P_4;
                        readonly key: K_6;
                        readonly original: {
                            base: string;
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                    };
                    values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                } & string; } : never); } & Function;
                time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                    now: (() => string) & {
                        use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                    };
                };
                intl: typeof Intl;
                locale: AllowedTranslations;
            };
            tr: <P extends Pages, K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(page: P, key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P;
                readonly key: K;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
            };
            g: (<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_3;
                readonly key: K_4;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
            }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_5;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_1]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_6;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & string; } : never); };
            pages: (<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_3;
                readonly key: K_4;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
            }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_5;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_1]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_6;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & string; } : never); };
            time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                now: (() => string) & {
                    use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                };
            };
            useTime: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                now: (() => string) & {
                    use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                };
            };
            intl: typeof Intl;
            i: typeof Intl;
            locale: AllowedTranslations;
            locales: AllowedTranslations[];
        };
    };
    getLocaleFromHeaders: (header: Headers) => AllowedTranslations;
    translationFromHeaders: (header: Headers) => {
        useTranslation: (page?: Pages, fixedVariables?: Record<string, string | number>) => {
            t: ((<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_3;
                readonly key: K_4;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
            }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_5;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_2]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_6;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & string; } : never); })[Pages] & {
                g: (<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_3;
                    readonly key: K_4;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
                }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_5;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
                }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_2]: {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                } & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly query: QueryLanguage;
                        readonly page: P_4;
                        readonly key: K_6;
                        readonly original: {
                            base: string;
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                    };
                    values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                } & string; } : never); } & Function;
                time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                    now: (() => string) & {
                        use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                    };
                };
                intl: typeof Intl;
                locale: AllowedTranslations;
            };
            tr: <P extends Pages, K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(page: P, key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P;
                readonly key: K;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
            };
            g: (<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_3;
                readonly key: K_4;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
            }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_5;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_2]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_6;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & string; } : never); };
            pages: (<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_3;
                readonly key: K_4;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
            }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_5;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_2]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_6;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & string; } : never); };
            time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                now: (() => string) & {
                    use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                };
            };
            useTime: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                now: (() => string) & {
                    use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                };
            };
            intl: typeof Intl;
            i: typeof Intl;
            locale: AllowedTranslations;
            locales: AllowedTranslations[];
        };
    };
    useTime: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
        now: (() => string) & {
            use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
        };
    };
    translationFromPathname: (pathname: string) => {
        useTranslation: (page?: Pages, fixedVariables?: Record<string, string | number>) => {
            t: ((<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_3;
                readonly key: K_4;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
            }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_5;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_3]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_6;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & string; } : never); })[Pages] & {
                g: (<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_3;
                    readonly key: K_4;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
                }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_5;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
                }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_3]: {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                } & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly query: QueryLanguage;
                        readonly page: P_4;
                        readonly key: K_6;
                        readonly original: {
                            base: string;
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                    };
                    values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                } & string; } : never); } & Function;
                time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                    now: (() => string) & {
                        use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                    };
                };
                intl: typeof Intl;
                locale: AllowedTranslations;
            };
            tr: <P extends Pages, K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(page: P, key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P;
                readonly key: K;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
            };
            g: (<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_3;
                readonly key: K_4;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
            }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_5;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_3]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_6;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & string; } : never); };
            pages: (<P_3 extends Pages, K_4 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3]>(page: P_3, key: K_4, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_3;
                readonly key: K_4;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_3][K_4]["values"] : string, string | number> : never;
            }) & { [P_4 in Pages]: (<K_5 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4]>(key: K_5, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_5;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_5]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] extends infer T_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4] ? { [K_6 in T_3]: {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_4;
                readonly key: K_6;
                readonly original: {
                    base: string;
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_4;
                    readonly key: K_6;
                    readonly original: {
                        base: string;
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_4][K_6]["values"] : string, string | number> : never;
            } & string; } : never); };
            time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                now: (() => string) & {
                    use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                };
            };
            useTime: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                now: (() => string) & {
                    use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                };
            };
            intl: typeof Intl;
            i: typeof Intl;
            locale: AllowedTranslations;
            locales: AllowedTranslations[];
        };
    };
};
export declare function getLocaleFromPathname<AllowedLocales extends ISO>(pathname: string, locales: AllowedLocales[]): AllowedLocales;
export declare function getLocaleFromHeaders<AllowedLocales extends ISO>(header: Headers, locales: AllowedLocales[]): AllowedLocales;
export {};
