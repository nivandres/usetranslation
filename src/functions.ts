import { BCP } from "./locales";
import { Size } from "./format";
import React from "react";

export function createTimeFunction<A extends BCP>(
  lang: A,
  defaultSettings: Record<Size, Intl.DateTimeFormatOptions> = {} as any,
  onFail: (e: unknown, required: true) => string = () => "XX:XX",
  defaultCurrentTime: Date | undefined
) {
  const t = (
    time: Date | number | string | undefined,
    format: Size | Intl.DateTimeFormatOptions = "md",
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

  const n = (
    format: Size | Intl.DateTimeFormatOptions = "md",
    preferredLocale: A = lang
  ) => {
    return t(Date.now(), format, preferredLocale);
  };

  return Object.assign(t, {
    use: n,
    now: n,
    useNow: (
      interval: number | undefined = undefined,
      format: Size | Intl.DateTimeFormatOptions = "md",
      preferredLocale: A = lang
    ) => {
      const [time, setTime] = React.useState(
        defaultCurrentTime || new Date(1704999999999)
      );
      React.useEffect(() => {
        let loop: NodeJS.Timeout;
        if (interval) {
          loop = setInterval(() => {
            setTime(new Date());
          }, interval);
        } else {
          setTime(new Date());
        }
        return () => {
          if (loop) clearInterval(loop);
        };
      }, [interval]);
      return t(time, format, preferredLocale);
    },
  });
}

export type TimeFunction<A extends BCP = BCP> = ReturnType<
  typeof createTimeFunction<A>
>;
