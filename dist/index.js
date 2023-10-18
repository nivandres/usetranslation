export function createTranslation(settings) {
    let r = {
        init: '{',
        end: '}'
    };
    if (settings.replacement) {
        if (typeof settings.replacement === 'string') {
            const match = settings.replacement.match(/x/);
            if (match) {
                const [init, end] = settings.replacement.split('x');
                r.init = init;
                r.end = end;
            }
            else if (settings.replacement.length % 2 === 0) {
                r.init = settings.replacement.slice(0, settings.replacement.length / 2);
                r.end = settings.replacement.slice(settings.replacement.length / 2);
            }
        }
        else {
            r.init = settings.replacement.init;
            r.end = settings.replacement.end;
        }
    }
    const locales = settings.locales;
    const allowedLocales = Object.keys(locales);
    // type Locales = keyof typeof locales
    const local = settings.defaultLocale && typeof settings.defaultLocale === 'string' ? settings.defaultLocale : allowedLocales[0];
    // type Local = typeof local
    const locale = locales[local];
    const pages = Object.keys(locale);
    const page = pages[0];
    const localeList = Object.keys(locales);
    const allowedLocale = localeList[0];
    let query = settings.query || local;
    const types = {
        allowedLocale: allowedLocale,
        pages: pages,
        page: page,
    };
    let getLocale = () => query;
    let setLocale = (locale) => query = locale;
    if (settings.state) {
        getLocale = settings.state.getState;
        setLocale = (locale) => { query = locale; return settings.state?.setState(locale); };
    }
    function translate(page, key, variables, prefferedLocale) {
        const l = prefferedLocale || getLocale();
        let translation = locales[l]?.[page]?.[key];
        const original = locale[page][key];
        if (!translation) {
            translation = settings.onNotTranslation ? settings.onNotTranslation(original, page, String(key), l, variables) : original;
        }
        let translationContent = typeof translation == 'object' && !Array.isArray(translation) ? translation.base : translation;
        let base = typeof translationContent == 'string' ? [translationContent] : translationContent;
        let placeholder = { ...(typeof translation == 'string' ? {} : translation.values), ...(variables || {}) };
        Object.keys(placeholder).forEach((key, index) => {
            base = base.map(v => v.replaceAll(`${r.init}${key}${r.end}`, String(placeholder[key])));
        });
        if (settings.onTranslation) {
            base = base.map(v => settings.onTranslation ? settings.onTranslation(v, { queryLanguage: l, queryPage: page, queryKey: String(key), original, placeholderVariables: placeholder }) : v);
        }
        let output = base;
        if (!settings.disableOutputDetails) {
            output = base.map(v => Object.assign(new Object(v), {
                from: local, raw: v, to: l, query: l, page, key, original: typeof original == 'object' ? original : { base: original }, variables: placeholder
            }));
            if (base.length > 1) {
                output = output.map((v, i) => Object.assign(new Object(v), {
                    use: (variables, prefferedLocale) => {
                        return translate(page, key, { ...placeholder, ...variables }, prefferedLocale)[i];
                    }
                }));
            }
        }
        if (base.length > 1) {
            return Object.assign(output, {
                from: local, raw: base[0], to: l, query: l, page, key, original: typeof original == 'object' ? original : { base: original }, variables: placeholder
            });
        }
        else {
            return output[0];
        }
    }
    function time(time, format, prefferedLocale) {
        if (!time)
            return '🕑';
        let date;
        // @ts-ignore
        if (Number(time) != NaN) {
            date = new Date(time);
        }
        else {
            date = new Date(Number(time));
        }
        format = format || 'md';
        let option = typeof format != 'string' ? format : {};
        switch (format) {
            case 'xs':
                option = settings.timeFormatOptions?.xs || {
                    minute: '2-digit',
                    second: '2-digit',
                };
                break;
            case 'sm':
                option = settings.timeFormatOptions?.sm || {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                };
                break;
            case 'md':
                option = settings.timeFormatOptions?.md || {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                    day: 'numeric',
                    month: '2-digit'
                };
                break;
            case 'lg':
                option = settings.timeFormatOptions?.lg || {
                    dateStyle: 'long'
                };
                break;
            case 'xl':
                option = settings.timeFormatOptions?.xl || {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false,
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                };
                break;
        }
        // Narrow Space Problem ' ' with SSR.
        try {
            return new Intl.DateTimeFormat(prefferedLocale || getLocale(), option).format(date).replaceAll(' ', ' ');
        }
        catch (e) {
            return (settings.onFail || (() => '⚠️'))(e);
        }
    }
    const useTime = Object.assign(time, { now: Object.assign(() => time(Date.now(), 'md'), { use: (format, prefferedLocale) => time(Date.now(), format, prefferedLocale) }) });
    function useTranslation(page, fixedLocale, fixedVariables) {
        setLocale(fixedLocale || query);
        const Variables = fixedVariables || {};
        let translations = new Object(translate);
        Object.keys(locale).forEach((p) => {
            const page = p;
            translations[page] = new Object((key, variables, prefferedLocale) => {
                return translate(page, key, { ...Variables, ...variables }, prefferedLocale);
            });
            Object.keys(locale[page]).forEach((k) => {
                const key = k;
                const value = locales[getLocale()][page][key];
                translations[page][key] = Object.assign(translate(page, key, Variables), {
                    use: (variables, prefferedLocale) => translate(page, key, { ...Variables, ...variables }, prefferedLocale),
                    values: typeof value != 'string' ? value.values : {}
                });
            });
        });
        const g = translations;
        const t = Object.assign(translations[page], {
            g, time: useTime, intl: Intl, locale: getLocale()
        });
        return { t, g, time: useTime, intl: Intl, i: Intl, locale: getLocale(), locales: allowedLocales, types };
    }
    function translation(fixedLocale) {
        setLocale(fixedLocale || query);
        return {
            useTranslation: (page, fixedVariables) => useTranslation(page, fixedLocale || query, fixedVariables)
        };
    }
    function fromHeaders(header) {
        return getLocaleFromHeaders(header, allowedLocales);
    }
    function fromPathname(pathname) {
        return getLocaleFromPathname(pathname, allowedLocales);
    }
    // function translationFromHeaders(header: Headers) {
    //     return translation(fromHeaders(header))
    // }
    function translationFromCallback(callback) {
        return (page, fixedVariables, prefferedLocale) => {
            return translation(prefferedLocale || callback()).useTranslation(page, fixedVariables);
        };
    }
    // async function translationFromAsyncCallback(callback: () => Promise<AllowedTranslations>) {
    //     return async <P extends Pages>(page?: P, fixedVariables?: Record<string,string|number>,prefferedLocale?: AllowedTranslations)=>{
    //         return translation(prefferedLocale || await callback()).useTranslation<P>(page, fixedVariables)
    //     }
    // }
    return { time, pages, page, defaultLocale: local, main: local, locales: localeList, locale: allowedLocale, translations: locales, translation, useTime, translationFromCallback, getLocaleFromHeaders: fromHeaders, getLocaleFromPathname: fromPathname, types };
}
export function getLocaleFromPathname(pathname, locales) {
    const lang = pathname.split('/')[1];
    const local = lang.split('-')[0].toLowerCase();
    if (locales.includes(local))
        return local;
    return locales[0];
}
export function getLocaleFromHeaders(header, locales) {
    let list = {};
    const keys = locales.map(l => { list[l] = 0; return l; });
    header.get('accept-language')?.toLowerCase().split(';').map(a => a.includes(',') ? keys.map(k => a.includes(k.toLowerCase()) ? list[k]++ : '') : a.split(',').map(b => keys.map(k => b.includes(k.toLowerCase()) ? list[k] = list[k] + 0.5 : '')));
    header.get('referer')?.split('/')[3].toLowerCase().split('0').map(a => (a.split('-')[0].length == 2) && keys.map(k => a.includes(k.toLowerCase()) ? list[k] = list[k] + 2 : ''));
    header.get('cookie')?.split(';').filter(c => c.match(/(locale|LOCALE|lang)/gi)).map(a => a.split('=')[1].toLowerCase().split('0').map(b => keys.map(k => b.includes(k.toLowerCase()) ? list[k]++ : '')));
    // get the most used locale
    Object.keys(list).map((k, i) => keys[i] = { locale: k, count: list[k] });
    return keys.sort((a, b) => b.count - a.count)[0]?.locale;
}
//# sourceMappingURL=index.js.map