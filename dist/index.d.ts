import { ISO } from "./locales";
type translationPlaceholder<Values extends string> = {
    readonly base: string | string[];
    readonly values?: Record<Values, string | number>;
};
type TranslationValue<Values extends unknown> = string | string[] | translationPlaceholder<Values extends string ? Values : never>;
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
export declare function createTranslation<AllowedTranslations extends ISO, MainTranslation extends AllowedTranslations, QueryLanguage extends AllowedTranslations, Format extends JSONFormat, Translation extends JSONTranslation, Pages extends string>(settings: {
    locales?: {
        [translation in AllowedTranslations]: JSONStrict<Format> & Translation & Record<Pages, unknown>;
    };
    defaultLocale?: MainTranslation | Translation;
    replacement?: string | {
        init: string;
        end: string;
    };
    query?: QueryLanguage;
    disableOutputDetails?: boolean;
    onFail?: (e: unknown) => string;
    onNotTranslation?: (originalQuery: TranslationValue<any>, queryPage: Pages, queryKey: string, queryLanguage: AllowedTranslations, placeholderVariables?: Record<string, string | number>) => string | string[];
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
    time: (time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string;
    pages: Pages[];
    page: Pages;
    defaultLocale: MainTranslation;
    main: MainTranslation;
    locales: AllowedTranslations[];
    locale: AllowedTranslations;
    translations: { [locale in AllowedTranslations]: Translation; };
    translation: (fixedLocale?: AllowedTranslations) => {
        useTranslation: <P extends Pages>(page?: P | undefined, fixedVariables?: Record<string, string | number>, prefferedLocale?: AllowedTranslations) => {
            t: (<K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P;
                    readonly key: K;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P] ? { [K_1 in T]: (({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K_1;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K_1;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P;
                    readonly key: K_1;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K_1;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
            }) & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]) extends string[] ? {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P;
                    readonly key: K_1;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
                } & (string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P;
                    readonly key: K_1;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
                } & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly page: P;
                        readonly key: K_1;
                        readonly original: {
                            base: string | string[];
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
                    };
                })[] : string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P;
                    readonly key: K_1;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
            } & string; } : never) & {
                g: (<P_1 extends P, K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]) extends string[] ? {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_1;
                    readonly key: K_2;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
                } & (string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_1;
                    readonly key: K_2;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
                } & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly page: P_1;
                        readonly key: K_2;
                        readonly original: {
                            base: string | string[];
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
                    };
                })[] : string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_1;
                    readonly key: K_2;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
                }) & { [P_2 in Pages]: (<K_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_3, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]) extends string[] ? {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_3;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
                } & (string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_3;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
                } & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly page: P_2;
                        readonly key: K_3;
                        readonly original: {
                            base: string | string[];
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
                    };
                })[] : string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_3;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
                }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_4 in T_1]: (({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]) extends string[] ? {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                } & (string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                } & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly page: P_2;
                        readonly key: K_4;
                        readonly original: {
                            base: string | string[];
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                    };
                })[] : string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                }) & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]) extends string[] ? {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly page: P_2;
                        readonly key: K_4;
                        readonly original: {
                            base: string | string[];
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                    } & (string & {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly page: P_2;
                        readonly key: K_4;
                        readonly original: {
                            base: string | string[];
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                    } & {
                        use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                            readonly from: MainTranslation;
                            readonly to: QueryLanguage;
                            readonly page: P_2;
                            readonly key: K_4;
                            readonly original: {
                                base: string | string[];
                                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                            };
                            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                        };
                    })[] : string & {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly page: P_2;
                        readonly key: K_4;
                        readonly original: {
                            base: string | string[];
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                    };
                    values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                } & string; } : never); } & Function;
                time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                    now: (() => string) & {
                        use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                    };
                };
                intl: typeof Intl;
                locale: AllowedTranslations;
            };
            g: (<P_1 extends P, K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_1;
                readonly key: K_2;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_1;
                readonly key: K_2;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_1;
                    readonly key: K_2;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_1;
                readonly key: K_2;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
            }) & { [P_2 in Pages]: (<K_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_3, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_3;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_4 in T_1]: (({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            }) & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]) extends string[] ? {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                } & (string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                } & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly page: P_2;
                        readonly key: K_4;
                        readonly original: {
                            base: string | string[];
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                    };
                })[] : string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            } & string; } : never); };
            time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                now: (() => string) & {
                    use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                };
            };
            intl: typeof Intl;
            i: typeof Intl;
            locale: AllowedTranslations;
            locales: AllowedTranslations[];
            types: {
                allowedLocale: AllowedTranslations;
                pages: Pages[];
                page: Pages;
            };
        };
    };
    useTime: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
        now: (() => string) & {
            use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
        };
    };
    translationFromCallback: (callback: () => AllowedTranslations) => <P extends Pages>(page?: P | undefined, fixedVariables?: Record<string, string | number>, prefferedLocale?: AllowedTranslations) => {
        t: (<K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]) extends string[] ? {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P;
            readonly key: K;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
        } & (string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P;
            readonly key: K;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
        } & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
            };
        })[] : string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P;
            readonly key: K;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
        }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P] extends infer T_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P] ? { [K_1 in T_2]: (({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]) extends string[] ? {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P;
            readonly key: K_1;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
        } & (string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P;
            readonly key: K_1;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
        } & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K_1;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
            };
        })[] : string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P;
            readonly key: K_1;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
        }) & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K_1;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K_1;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P;
                    readonly key: K_1;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P;
                readonly key: K_1;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
            };
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K_1]["values"] : string, string | number> : never;
        } & string; } : never) & {
            g: (<P_1 extends P, K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_1;
                readonly key: K_2;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_1;
                readonly key: K_2;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_1;
                    readonly key: K_2;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_1;
                readonly key: K_2;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
            }) & { [P_2 in Pages]: (<K_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_3, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_3;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_4 in T_3]: (({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            }) & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]) extends string[] ? {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                } & (string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                } & {
                    use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                        readonly from: MainTranslation;
                        readonly to: QueryLanguage;
                        readonly page: P_2;
                        readonly key: K_4;
                        readonly original: {
                            base: string | string[];
                            values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                        };
                        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                    };
                })[] : string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                };
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            } & string; } : never); } & Function;
            time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
                now: (() => string) & {
                    use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
                };
            };
            intl: typeof Intl;
            locale: AllowedTranslations;
        };
        g: (<P_1 extends P, K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]) extends string[] ? {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P_1;
            readonly key: K_2;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
        } & (string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P_1;
            readonly key: K_2;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
        } & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_1;
                readonly key: K_2;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
            };
        })[] : string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P_1;
            readonly key: K_2;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_2]["values"] : string, string | number> : never;
        }) & { [P_2 in Pages]: (<K_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_3, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]) extends string[] ? {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & (string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            };
        })[] : string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        }) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T_3 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_4 in T_3]: (({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]) extends string[] ? {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P_2;
            readonly key: K_4;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
        } & (string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P_2;
            readonly key: K_4;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
        } & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            };
        })[] : string & {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly page: P_2;
            readonly key: K_4;
            readonly original: {
                base: string | string[];
                values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
            };
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
        }) & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["base"] : { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]) extends string[] ? {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            } & (string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            } & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => string & {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_4;
                    readonly original: {
                        base: string | string[];
                        values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                    };
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
                };
            })[] : string & {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly page: P_2;
                readonly key: K_4;
                readonly original: {
                    base: string | string[];
                    values: Record<keyof ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never), string>;
                };
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
            };
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_4]["values"] : string, string | number> : never;
        } & string; } : never); };
        time: ((time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => string) & {
            now: (() => string) & {
                use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => string;
            };
        };
        intl: typeof Intl;
        i: typeof Intl;
        locale: AllowedTranslations;
        locales: AllowedTranslations[];
        types: {
            allowedLocale: AllowedTranslations;
            pages: Pages[];
            page: Pages;
        };
    };
    getLocaleFromHeaders: (header: Headers) => AllowedTranslations;
    getLocaleFromPathname: (pathname: string) => AllowedTranslations;
    types: {
        allowedLocale: AllowedTranslations;
        pages: Pages[];
        page: Pages;
    };
};
export declare function getLocaleFromPathname<AllowedLocales extends ISO>(pathname: string, locales: AllowedLocales[]): AllowedLocales;
export declare function getLocaleFromHeaders<AllowedLocales extends ISO>(header: Headers, locales: AllowedLocales[]): AllowedLocales;
export {};
