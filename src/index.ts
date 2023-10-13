import { ISO } from "./locales";

type translationPlaceholder<Values extends string> = {
    readonly base: string,
    readonly values?: Record<Values, string | number>
}

type TranslationValue<Values extends unknown> = string | translationPlaceholder<Values extends string ? Values : never>

type JSONFix<K extends unknown, V extends any> = Record<K extends string ? K : never, V>
type JSONStrict<F extends Record<any, any>> = {
    [P in keyof F]: {
        [K in keyof F[P]]: F[P][K]
    }
}

type JSONTranslation = {
    [p: string]: {
        [k: string]: TranslationValue<unknown>
    }
}

type JSONFormat = JSONFix<unknown, JSONFix<unknown, unknown>>

export function createTranslation
    <
        AllowedTranslations extends ISO,
        MainTranslation extends AllowedTranslations,
        QueryLanguage extends AllowedTranslations,
        Format extends JSONFormat,
        Translation extends JSONTranslation,
        Pages extends keyof Translation,
        DefinedPages extends string

    >
    (
        settings: {

            locales?: {
                [translation in AllowedTranslations]: JSONStrict<Format> & Translation & Record<DefinedPages, unknown>
            },
            defaultLocale?: MainTranslation | Translation

            replacement?: string | {
                init: string,
                end: string
            }

            query?: QueryLanguage

            disableOutputDetails?: boolean

            onFail?: (e: unknown) => any
            onNotTranslation?: (originalQuery: TranslationValue<any>, queryPage: Pages, queryKey: string, queryLanguage: AllowedTranslations, placeholderVariables?: Record<string, string | number>) => string
            onTranslation?: (translatedString: string, details: { queryLanguage: AllowedTranslations, queryPage: Pages, queryKey: string, original: TranslationValue<any>, placeholderVariables?: Record<string, number | string> }) => string

            timeFormatOptions?: {
                [Format in 'xs' | 'sm' | 'md' | 'lg' | 'xl']: Record<string, any>
            }

            state?: {
                setState: (locale: AllowedTranslations) => any
                getState: () => AllowedTranslations
            }

        }
    ) {

    let r: { init: string, end: string } = {
        init: '{',
        end: '}'
    }
    if (settings.replacement) {
        if (typeof settings.replacement === 'string') {
            const match = settings.replacement.match(/x/);
            if (match) {
                const [init, end] = settings.replacement.split('x');
                r.init = init;
                r.end = end;
            } else if (settings.replacement.length % 2 === 0) {
                r.init = settings.replacement.slice(0, settings.replacement.length / 2);
                r.end = settings.replacement.slice(settings.replacement.length / 2);
            }
        } else {
            r.init = settings.replacement.init;
            r.end = settings.replacement.end;
        }
    }

    const locales = settings.locales as { [locale in AllowedTranslations]: Translation };
    type Locales = keyof typeof locales
    const local = settings.defaultLocale && typeof settings.defaultLocale === 'string' ? settings.defaultLocale as MainTranslation : Object.keys(locales)[0] as MainTranslation
    type Local = typeof local
    const locale = locales[local]
    type Locale = typeof locale

    let query: AllowedTranslations = settings.query || local
    type JSON = Locale

    type Keys<P extends Pages> = keyof Locale[P]

    const genericPage = Object.keys(locale)[0] as Pages
    type GenericPage = Pages
    type GenericKey = Keys<GenericPage>

    type placeholder<P extends Pages, K extends Keys<P>> =
        JSON[P][K] extends TranslationValue<any> ?
        (Record<JSON[P][K] extends translationPlaceholder<any> ? keyof JSON[P][K]['values'] : string, string | number>)
        : never

    type genericPlaceholder = placeholder<GenericPage, GenericKey>

    let getLocale = () => query
    let setLocale = (locale: AllowedTranslations) => query = locale

    if (settings.state) {
        getLocale = settings.state.getState
        setLocale = (locale: AllowedTranslations) => { query = locale; return settings.state?.setState(locale) }
    }

    type translationQuery<P extends Pages, K extends Keys<P>> = string | {
        readonly base: string
        readonly values?: placeholder<P, K>
    }
    type translatedString<QueryPage extends Pages, QueryKey extends Keys<QueryPage>> = {
        readonly from: MainTranslation,
        readonly to: QueryLanguage,
        readonly query: QueryLanguage,
        readonly page: QueryPage,
        readonly key: QueryKey,
        readonly original: { base: string, values: Record<keyof placeholder<QueryPage, QueryKey>, string> }
        readonly variables: placeholder<QueryPage, QueryKey>
    }

    function translate<P extends Pages, K extends Keys<P>>(page: P, key: K, variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations) {
        const l = prefferedLocale || getLocale();
        let translation = locales[l]?.[page]?.[key] as (translationQuery<P, K> | undefined)
        const original = locale[page][key] as translationQuery<P, K>
        if (!translation) {
            translation = settings.onNotTranslation ? settings.onNotTranslation(original, page, String(key), l, variables) : original
        }
        let base: string = typeof translation == 'string' ? translation : translation.base;
        let placeholder: Record<string, string | number> = { ...(typeof translation == 'string' ? {} : translation.values), ...(variables || {}) };
        Object.keys(placeholder).forEach((key: string, index: number) => {
            base = base.replaceAll(`${r.init}${key}${r.end}`, String(placeholder[key]))
        })
        if (settings.onTranslation) {
            base = settings.onTranslation(base, { queryLanguage: l, queryPage: page, queryKey: String(key), original, placeholderVariables: placeholder })
        }
        return (settings.disableOutputDetails ? base : Object.assign(new Object(base), { from: local, to: l, query: l, page, key, original: typeof original == 'string' ? { base: original, values: {} } : original, variables: placeholder })) as translatedString<P, K>
    }

    function time(time: Date | number | string | undefined, format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: ISO) {
        if (!time) return '🕑';
        let date: Date;
        // @ts-ignore
        if (Number(time) != NaN) {
            date = new Date(time as string);
        } else {
            date = new Date(Number(time));
        }

        format = format || 'md'

        let option: Record<string, any> = typeof format != 'string' ? format : {}

        switch (format) {
            case 'xs':
                option = settings.timeFormatOptions?.xs || {
                    minute: '2-digit',
                    second: '2-digit',
                }
                break;
            case 'sm':
                option = settings.timeFormatOptions?.sm || {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }
                break;
            case 'md':
                option = settings.timeFormatOptions?.md || {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    day: 'numeric',
                    month: '2-digit'
                }
                break;
            case 'lg':
                option = settings.timeFormatOptions?.lg || {
                    dateStyle: 'long'
                }
                break;
            case 'xl':
                option = settings.timeFormatOptions?.xl || {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false,
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }
                break;
        }

        // Narrow Space Problem ' ' with SSR.
        try { return new Intl.DateTimeFormat(prefferedLocale || getLocale(), option).format(date).replaceAll(' ', ' '); } catch (e: unknown) { return (settings.onFail || (() => '⚠️'))(e) }

    }

    function useTranslation<Page extends Pages, Key extends Keys<Page>>(page?: Page, fixedLocale?: AllowedTranslations, fixedVariables?: Record<string, string | number>) {

        setLocale(fixedLocale || query);
        const Variables = fixedVariables || {}
        const P = page || genericPage

        type TranslationPage<P extends Pages> = {
            <K extends Keys<P>>(key: K, variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations): translatedString<P, K>
        } & {
                [K in Keys<P>]: translatedString<P, K> & {
                    use: (variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations) => translatedString<P, K>,
                    values: placeholder<P, K>
                } & string
            }

        type TranslationGlobal = {
            <P extends Page, K extends Keys<P>>(page: P, key: K, variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations): translatedString<P, K>
        } & {
                [P in Pages]: TranslationPage<P>
            }

        type Translation = TranslationGlobal[Page] & {
            g: TranslationGlobal & Function,
            time: typeof time,
            intl: typeof Intl,
            locale: AllowedTranslations
        }

        let translations: any = new Object(translate)

        Object.keys(locale).forEach((p) => {

            const page = p as Pages

            translations[page] = new Object(
                <K extends Keys<typeof page>>(
                    key: K,
                    variables?: placeholder<typeof page, K>,
                    prefferedLocale?: AllowedTranslations
                ) => {
                    return translate(page, key, { ...Variables as placeholder<typeof page, K>, ...variables }, prefferedLocale);
                }
            )

            Object.keys(locale[page]).forEach((k) => {

                const key = k as Keys<typeof page>

                const value = locales[getLocale()][page][key];

                translations[page][key] = Object.assign(
                    translate(page, key, Variables as placeholder<typeof page, typeof key>) as any,
                    {
                        use: (variables: placeholder<typeof page, typeof key>, prefferedLocale?: AllowedTranslations) => translate(page, key, { ...Variables as placeholder<typeof page, typeof key>, ...variables }, prefferedLocale),
                        values: typeof value != 'string' ? value.values : {}
                    }
                )

            })

        })
        const g: TranslationGlobal = { ...translations }

        const t: Translation = Object.assign(translations[P], {
            g, time, intl: Intl
        })

        return { t, tr: translate, g: t.g, pages: t.g, time, i: Intl, locale: getLocale() }

    }

    function translation(fixedLocale?: AllowedTranslations) {
        setLocale(fixedLocale || query);
        return {
            useTranslation: (page?: Pages, fixedVariables?: Record<string, string | number>) => useTranslation(page, fixedLocale || query, fixedVariables)
        }
    }

    function fromHeaders(header: Headers) {
        let list = {
        } as Record<string, number>
        const keys = Object.keys(locales).map(l => { list[l] = 0; return l }) as any[]

        header.get('accept-language')?.toLowerCase().split(';').map(a => a.includes(',') ? keys.map(k => a.includes(k.toLowerCase()) ? list[k]++ : '') : a.split(',').map(b => keys.map(k => b.includes(k.toLowerCase()) ? list[k] = list[k] + 0.5 : '')))

        header.get('referer')?.split('/')[3].toLowerCase().split('0').map(a => keys.map(k => a.includes(k.toLowerCase()) ? list[k]++ : ''))

        header.get('cookie')?.split(';').filter(c => c.match(/(locale|LOCALE|lang)/gi)).map(a => a.split('=')[1].toLowerCase().split('0').map(b => keys.map(k => b.includes(k.toLowerCase()) ? list[k]++ : '')))

        // get the most used locale
        Object.keys(list).map((k, i) => keys[i] = { locale: k, count: list[k] })

        return keys.sort((a, b) => b.count - a.count)[0]?.locale as AllowedTranslations
    }

    function translationFromHeaders(header: Headers) {
        return translation(fromHeaders(header))
    }

    const pages = Object.keys(locale) as Pages[]
    const page = pages[0] as Pages

    const localeList = Object.keys(locales) as AllowedTranslations[]
    const allowedLocale = localeList[0] as AllowedTranslations

    return { translate, time, useTranslation, pages, page, defaultLocale: local, main: local, locales: localeList, locale: allowedLocale, translations: locales, genericPage, translation, fromHeaders }

}