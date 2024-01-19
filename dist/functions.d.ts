import { BCP } from "./locales";
import { Size } from "./format";
export declare function createTimeFunction<A extends BCP>(lang: A, defaultSettings: Record<Size, Intl.DateTimeFormatOptions> | undefined, onFail: ((e: unknown, required: true) => string) | undefined, defaultCurrentTime: Date | undefined): ((time: Date | number | string | undefined, format?: Size | Intl.DateTimeFormatOptions, preferredLocale?: A) => string) & {
    use: (format?: Size | Intl.DateTimeFormatOptions, preferredLocale?: A) => string;
    useNow: (interval?: number | undefined, format?: Size | Intl.DateTimeFormatOptions, preferredLocale?: A) => string;
};
export type TimeFunction<A extends BCP = BCP> = ReturnType<typeof createTimeFunction<A>>;
