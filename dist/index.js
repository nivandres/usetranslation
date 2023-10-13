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
    const local = settings.defaultLocale && typeof settings.defaultLocale === 'string' ? settings.defaultLocale : Object.keys(locales)[0];
    const locale = locales[local];
    let query = settings.query || local;
    const genericPage = Object.keys(locale)[0];
    let getLocale = () => query;
    let setLocale = (locale) => query = locale;
    function translate(page, key, variables, prefferedLocale) {
        const l = prefferedLocale || getLocale();
        let translation = locales[l]?.[page]?.[key];
        const original = locale[page][key];
        if (!translation) {
            translation = settings.onNotTranslation ? settings.onNotTranslation(original, page, String(key), l, variables) : original;
        }
        let base = typeof translation == 'string' ? translation : translation.base;
        let placeholder = { ...(typeof translation == 'string' ? {} : translation.values), ...(variables || {}) };
        Object.keys(placeholder).forEach((key, index) => {
            base = base.replaceAll(`${r.init}${key}${r.end}`, String(placeholder[key]));
        });
        if (settings.onTranslation) {
            base = settings.onTranslation(base, { queryLanguage: l, queryPage: page, queryKey: String(key), original, placeholderVariables: placeholder });
        }
        return (settings.disableOutputDetails ? base : Object.assign(new Object(base), { from: local, to: l, query: l, page, key, original, variables: placeholder }));
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
        try {
            return new Intl.DateTimeFormat(prefferedLocale || getLocale(), option).format(date);
        }
        catch (e) {
            return (settings.onFail || (() => '⚠️'))(e);
        }
    }
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
        const t = {
            ...translations[page || genericPage],
            g: translations,
            time: time,
            intl: Intl,
        };
        return { t, tr: translate, g: t.g, pages: t.g };
    }
    const pages = Object.keys(locale);
    const page = pages[0];
    const allowedLocale = Object.keys(locales)[0];
    return { translate, time, useTranslation, pages, page, allowedLocale, genericPage, translation: useTranslation };
}
//# sourceMappingURL=index.js.map