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
export declare function createTranslation<AllowedTranslations extends ISO, MainTranslation extends AllowedTranslations, Format extends JSONFormat, Translation extends JSONTranslation, Pages extends keyof Translation, QueryLanguage extends AllowedTranslations, disabledDetails extends boolean>(settings: {
    locales?: {
        [translation in AllowedTranslations]: JSONStrict<Format> & Translation & Record<Pages, unknown>;
    };
    defaultLocale?: MainTranslation | Format;
    replacement?: string | {
        init: string;
        end: string;
    };
    query?: QueryLanguage;
    disableOutputDetails?: disabledDetails;
    onFail?: (e: unknown) => any;
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
}): {
    translate: <P extends Pages, K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(page: P, key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
        readonly from: MainTranslation;
        readonly to: QueryLanguage;
        readonly query: QueryLanguage;
        readonly page: P;
        readonly key: K;
        readonly original: string;
        readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
    } & string;
    time: (time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => any;
    useTranslation: <Page extends Pages, Key extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][Page]>(page?: Page | undefined, fixedLocale?: QueryLanguage, fixedVariables?: Record<string, string | number>) => {
        t: ((<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_1;
            readonly key: K_1;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
        } & string) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_2;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
        } & string) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: (disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & string) & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & string;
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        }; } : never); })[Page] & {
            g: (<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_1;
                readonly key: K_1;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
            } & string) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_2;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
            } & string) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: (disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & string) & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_3;
                    readonly original: string;
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
                } & string;
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            }; } : never); };
            time: (time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => any;
            intl: typeof Intl;
        };
        tr: <P extends Pages, K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(page: P, key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P;
            readonly key: K;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
        } & string;
        g: (<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_1;
            readonly key: K_1;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
        } & string) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_2;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
        } & string) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: (disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & string) & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & string;
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        }; } : never); };
        pages: (<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_1;
            readonly key: K_1;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
        } & string) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_2;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
        } & string) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: (disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & string) & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & string;
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        }; } : never); };
    };
    pages: Pages[];
    page: Pages;
    allowedLocale: AllowedTranslations;
    genericPage: Pages;
    translation: <Page extends Pages, Key extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][Page]>(page?: Page | undefined, fixedLocale?: QueryLanguage, fixedVariables?: Record<string, string | number>) => {
        t: ((<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_1;
            readonly key: K_1;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
        } & string) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_2;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
        } & string) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: (disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & string) & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & string;
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        }; } : never); })[Page] & {
            g: (<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_1;
                readonly key: K_1;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
            } & string) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_2;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
            } & string) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: (disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & string) & {
                use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                    readonly from: MainTranslation;
                    readonly to: QueryLanguage;
                    readonly query: QueryLanguage;
                    readonly page: P_2;
                    readonly key: K_3;
                    readonly original: string;
                    readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
                } & string;
                values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            }; } : never); };
            time: (time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) => any;
            intl: typeof Intl;
        };
        tr: <P extends Pages, K extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P]>(page: P, key: K, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P;
            readonly key: K;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P][K]["values"] : string, string | number> : never;
        } & string;
        g: (<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_1;
            readonly key: K_1;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
        } & string) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_2;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
        } & string) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: (disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & string) & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & string;
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        }; } : never); };
        pages: (<P_1 extends Page, K_1 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1]>(page: P_1, key: K_1, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_1;
            readonly key: K_1;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_1][K_1]["values"] : string, string | number> : never;
        } & string) & { [P_2 in Pages]: (<K_2 extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2]>(key: K_2, variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_2;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_2]["values"] : string, string | number> : never;
        } & string) & (keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] extends infer T extends keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2] ? { [K_3 in T]: (disabledDetails extends true ? string : {
            readonly from: MainTranslation;
            readonly to: QueryLanguage;
            readonly query: QueryLanguage;
            readonly page: P_2;
            readonly key: K_3;
            readonly original: string;
            readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        } & string) & {
            use: (variables?: ({ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never) | undefined, prefferedLocale?: AllowedTranslations) => disabledDetails extends true ? string : {
                readonly from: MainTranslation;
                readonly to: QueryLanguage;
                readonly query: QueryLanguage;
                readonly page: P_2;
                readonly key: K_3;
                readonly original: string;
                readonly variables: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
            } & string;
            values: { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends TranslationValue<any> ? Record<{ [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3] extends translationPlaceholder<any> ? keyof { [locale in AllowedTranslations]: Translation; }[MainTranslation][P_2][K_3]["values"] : string, string | number> : never;
        }; } : never); };
    };
};
export {};
