import { BCP } from "./locales";
import { Size } from "./format";

export function createTimeFunction<A extends BCP>(
  lang: A,
  defaultSettings: Record<Size, Intl.DateTimeFormatOptions> = {} as any,
  onFail: (e: unknown, required: true) => string = () => "XX:XX"
) {
  return (
    time: Date | number | string | undefined,
    format: Size | Record<Size, Intl.DateTimeFormatOptions> = "md",
    preferredLocale: A = lang
  ) => {
    if (!time) return "--:--";
    let date: Date;
    if (Number.isNaN(Number(time))) {
      date = new Date(time as string);
    } else {
      date = new Date(Number(time));
    }

    let option: Intl.DateTimeFormatOptions =
      typeof format !== "string" ? (format as Intl.DateTimeFormatOptions) : {};

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
    } catch (e: unknown) {
      return onFail(e, true);
    }
  };
}

export type TimeFunction<A extends BCP> = ReturnType<typeof createTimeFunction<A>>;