import { ISO } from "./locales";

type translationPlaceholder<Values extends string> = {
    readonly base: string | string[],
    readonly values?: Record<Values, string | number>
}

type TranslationValue<Values extends unknown> = string | string[] | translationPlaceholder<Values extends string ? Values : never>

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
        Pages extends string,
    >
    (
        settings: {

            locales?: {
                [translation in AllowedTranslations]: JSONStrict<Format> & Translation & Record<Pages, unknown>
            },
            defaultLocale?: MainTranslation | Translation

            replacement?: string | {
                init: string,
                end: string
            }

            query?: QueryLanguage

            disableOutputDetails?: boolean

            onFail?: (e: unknown) => string
            onNotTranslation?: (originalQuery: TranslationValue<any>, queryPage: Pages, queryKey: string, queryLanguage: AllowedTranslations, placeholderVariables?: Record<string, string | number>) => string | string[]
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
    const allowedLocales = Object.keys(locales) as AllowedTranslations[]
    // type Locales = keyof typeof locales
    const local = settings.defaultLocale && typeof settings.defaultLocale === 'string' ? settings.defaultLocale as MainTranslation : allowedLocales[0] as MainTranslation
    // type Local = typeof local
    const locale = locales[local]
    type Locale = typeof locale

    const pages = Object.keys(locale) as Pages[]
    const page = pages[0] as Pages

    const localeList = Object.keys(locales) as AllowedTranslations[]
    const allowedLocale = localeList[0]

    let query: AllowedTranslations = settings.query || local
    type JSON = Locale

    type Keys<P extends Pages> = keyof Locale[P]

    const types = {
        allowedLocale: allowedLocale,
        pages: pages,
        page: page,
    }

    type placeholder<P extends Pages, K extends Keys<P>> =
        JSON[P][K] extends TranslationValue<any> ?
        (Record<JSON[P][K] extends translationPlaceholder<any> ? keyof JSON[P][K]['values'] : string, string | number>)
        : never

    let getLocale = () => query
    let setLocale = (locale: AllowedTranslations) => query = locale

    if (settings.state) {
        getLocale = settings.state.getState
        setLocale = (locale: AllowedTranslations) => { query = locale; return settings.state?.setState(locale) }
    }

    // type translationQuery<P extends Pages, K extends Keys<P>> = string[] | string | {
    //     readonly base: string | string[],
    //     readonly values?: placeholder<P, K>
    // }

    type translatedDetails <QueryPage extends Pages, QueryKey extends Keys<QueryPage>> = {
        readonly from: MainTranslation,
        readonly to: QueryLanguage,
        readonly page: QueryPage,
        readonly key: QueryKey,
        readonly original: { base: string | string[], values: Record<keyof placeholder<QueryPage, QueryKey>, string> }
        readonly variables: placeholder<QueryPage, QueryKey>
    }

    type translatedString <QueryPage extends Pages, QueryKey extends Keys<QueryPage>> = string & translatedDetails<QueryPage, QueryKey>

    type translatedQuery<P extends Pages, K extends Keys<P>> = ( JSON[P][K] extends translationPlaceholder<any> ? JSON[P][K]['base'] : JSON[P][K] ) extends string[] ? translatedDetails<P,K> & (translatedString<P,K> & { use: (variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations) => translatedString<P, K> })[] : translatedString<P,K> 

    function translate<P extends Pages, K extends Keys<P>>(page: P, key: K, variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations): translatedQuery<P,K> {
        const l = prefferedLocale || getLocale();
        let translation = locales[l]?.[page]?.[key] as any
        const original = locale[page][key] as any ?? { base: key, values: {} }
        if (!translation) {
            translation = settings.onNotTranslation ? settings.onNotTranslation(original, page, String(key), l, variables) : original
        }
        let translationContent = typeof translation == 'object' && !Array.isArray(translation) ? translation.base : translation
        let base: string[] = typeof translationContent == 'string' ? [translationContent] : translationContent;
        let placeholder: Record<string, string | number> = { ...(typeof translation == 'string' ? {} : translation.values), ...(variables || {}) };
        Object.keys(placeholder).forEach((key: string, index: number) => {
            base = base.map ( v => v.replaceAll(`${r.init}${key}${r.end}`, String(placeholder[key])) )  
        })
        if (settings.onTranslation) {
            base = base.map ( v => settings.onTranslation ? settings.onTranslation(v, { queryLanguage: l, queryPage: page, queryKey: String(key), original, placeholderVariables: placeholder }) : v )
        }
        let output: any = base
        if (!settings.disableOutputDetails) {
            output = base.map ( v => Object.assign(new Object(v), {
                from: local, raw: v, to: l, query: l, page, key, original: typeof original == 'object' ? original : {base:original}, variables: placeholder
            }) )
            if (base.length > 1) {
                output = output.map ( (v:any, i: number) => Object.assign(new Object(v),{
                    use: (variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations) => {
                        return translate(page, key, { ...placeholder, ...variables } as placeholder<P,K>, prefferedLocale)[i];
                    }
                }))
            }
        }
        if (base.length > 1) {
            return Object.assign(output, {
                from: local, raw: base[0], to: l, query: l, page, key, original: typeof original == 'object' ? original : {base:original}, variables: placeholder
            })
        } else {
            return output[0]
        }
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

    const useTime = Object.assign(time, { now: Object.assign(() => time(Date.now(), 'md'), { use: (format?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | Record<string, any>, prefferedLocale?: AllowedTranslations) => time(Date.now(), format, prefferedLocale) }) })

    type TranslationPage<P extends Pages> = {
        <K extends Keys<P>>(key: K, variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations): translatedQuery<P, K>
    } & {
            [K in Keys<P>]: translatedQuery<P, K> & {
                use: (variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations) => translatedQuery<P, K>,
                values: placeholder<P, K>
            } & string
        }

    type TranslationGlobal<Page extends Pages> = {
        <P extends Page, K extends Keys<P>>(page: P, key: K, variables?: placeholder<P, K>, prefferedLocale?: AllowedTranslations): translatedQuery<P, K>
    } & {
            [P in Pages]: TranslationPage<P>
        }

    type Translations<Page extends Pages> = TranslationPage<Page> & {
        g: TranslationGlobal<Page> & Function,
        time: typeof useTime,
        intl: typeof Intl,
        locale: AllowedTranslations
    }

    type useTranslationOutput<Page extends Pages> = {
        t: Translations<Page>,
        // tr: typeof translate,
        g: TranslationGlobal<Page>,
        // pages: TranslationGlobal<Page>,
        time: typeof useTime,
        // useTime: typeof useTime,
        intl: typeof Intl,
        i: typeof Intl,
        locale: AllowedTranslations,
        locales: AllowedTranslations[],
        types: typeof types
    }

    function useTranslation<Page extends Pages/*, Key extends Keys<Page>*/>(page?: Page, fixedLocale?: AllowedTranslations, fixedVariables?: Record<string, string | number>): useTranslationOutput<Page> {
        setLocale(fixedLocale || query);
        const Variables = fixedVariables || {}

        let translations: any = new Object(translate)
        
        Object.keys(locale).forEach((p) => {
        
            const page = p as Pages
            if (page === 'default') return;

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
        const g: any = translations
        const t: any = Object.assign(translations[page], {
            g, time: useTime, intl: Intl, locale: getLocale()
        })
       
        return { t, g, time: useTime, intl: Intl, i: Intl, locale: getLocale(), locales: allowedLocales, types }

    }

    type translationOutput = {
        useTranslation: <P extends Pages>(page?: P, fixedVariables?: Record<string, string | number>, prefferedLocale?: AllowedTranslations) => useTranslationOutput<P>
    }

    function translation(fixedLocale?: AllowedTranslations): translationOutput {
        setLocale(fixedLocale || query);
        return {
            useTranslation: <Page extends Pages>(page?: Page, fixedVariables?: Record<string, string | number>): useTranslationOutput<Page> => useTranslation(page, fixedLocale || query, fixedVariables)
        }
    }

    function fromHeaders(header: Headers) {
        return getLocaleFromHeaders(header, allowedLocales)
    }

    function fromPathname(pathname: string) {
        return getLocaleFromPathname(pathname, allowedLocales)
    }

    // function translationFromHeaders(header: Headers) {
    //     return translation(fromHeaders(header))
    // }

    function translationFromCallback(callback: () => AllowedTranslations): translationOutput['useTranslation'] {
        return <P extends Pages>(page?: P, fixedVariables?: Record<string,string|number>,prefferedLocale?: AllowedTranslations)=>{
            return translation(prefferedLocale || callback()).useTranslation<P>(page, fixedVariables)
        } 
    }

    // async function translationFromAsyncCallback(callback: () => Promise<AllowedTranslations>) {
    //     return async <P extends Pages>(page?: P, fixedVariables?: Record<string,string|number>,prefferedLocale?: AllowedTranslations)=>{
    //         return translation(prefferedLocale || await callback()).useTranslation<P>(page, fixedVariables)
    //     }
    // }


    return { time, pages, page, defaultLocale: local, main: local, locales: localeList, locale: allowedLocale, translations: locales,  translation, useTime, translationFromCallback,getLocaleFromHeaders: fromHeaders, getLocaleFromPathname: fromPathname, types }

}

export function getLocaleFromPathname<AllowedLocales extends ISO>(pathname: string, locales: AllowedLocales[]): AllowedLocales {
    const lang = pathname.split('/')[1]
    const local = lang.split('-')[0].toLowerCase() as AllowedLocales
    if (locales.includes(local)) return local
    return locales[0]
}

export function getLocaleFromHeaders<AllowedLocales extends ISO>(header: Headers, locales: AllowedLocales[]): AllowedLocales {

    let list = {
    } as Record<string, number>
    const keys = locales.map(l => { list[l] = 0; return l }) as any[]

    header.get('accept-language')?.toLowerCase().split(';').map(a => a.includes(',') ? keys.map(k => a.includes(k.toLowerCase()) ? list[k]++ : '') : a.split(',').map(b => keys.map(k => b.includes(k.toLowerCase()) ? list[k] = list[k] + 0.5 : '')))

    header.get('referer')?.split('/')[3].toLowerCase().split('0').map(a => (a.split('-')[0].length == 2) && keys.map(k => a.includes(k.toLowerCase()) ? list[k] = list[k] + 2 : ''))

    header.get('cookie')?.split(';').filter(c => c.match(/(locale|LOCALE|lang)/gi)).map(a => a.split('=')[1].toLowerCase().split('0').map(b => keys.map(k => b.includes(k.toLowerCase()) ? list[k]++ : '')))

    // get the most used locale
    Object.keys(list).map((k, i) => keys[i] = { locale: k, count: list[k] })

    return keys.sort((a, b) => b.count - a.count)[0]?.locale as AllowedLocales

}