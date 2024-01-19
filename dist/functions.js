import { useEffect, useState } from "react";
export function createTimeFunction(lang, defaultSettings = {}, onFail = () => "XX:XX", defaultCurrentTime) {
    const t = (time, format = "md", preferredLocale = lang) => {
        if (!time)
            return "--:--";
        let date;
        if (Number.isNaN(Number(time))) {
            date = new Date(time);
        }
        else {
            date = new Date(Number(time));
        }
        let option = typeof format !== "string" ? format : {};
        switch (format) {
            case "xs":
                option = defaultSettings?.xs || {
                    minute: "2-digit",
                    second: "2-digit",
                };
                break;
            case "sm":
                option = defaultSettings?.sm || {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                };
                break;
            case "md":
                option = defaultSettings?.md || {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    day: "numeric",
                    month: "2-digit",
                };
                break;
            case "lg":
                option = defaultSettings?.lg || {
                    dateStyle: "long",
                };
                break;
            case "xl":
                option = defaultSettings?.xl || {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: false,
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                };
                break;
            default:
                break;
        }
        // Narrow Space Problem ' ' with SSR.
        try {
            return new Intl.DateTimeFormat(preferredLocale || lang, option)
                .format(date)
                .replaceAll(" ", " ");
        }
        catch (e) {
            return onFail(e, true);
        }
    };
    return Object.assign(t, {
        use: (format = "md", preferredLocale = lang) => {
            return t(Date.now(), format, preferredLocale);
        },
        useNow: (interval = undefined, format = "md", preferredLocale = lang) => {
            const [time, setTime] = useState(defaultCurrentTime || new Date(1704999999999));
            useEffect(() => {
                let loop;
                if (interval) {
                    loop = setInterval(() => {
                        setTime(new Date());
                    }, interval);
                }
                else {
                    setTime(new Date());
                }
                return () => {
                    if (loop)
                        clearInterval(loop);
                };
            }, [interval]);
            return t(time, format, preferredLocale);
        },
    });
}
//# sourceMappingURL=functions.js.map