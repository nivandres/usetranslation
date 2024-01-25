import React, { Dispatch, SetStateAction } from "react";
import { BCP } from "./locales";
import { IsDefined, PValue, getValue } from "./utils";
import {
  getLangFromPathname,
  lightFix,
  fixLang,
  getLangFromNavigator,
  match,
} from "./match";
import Cookie from "js-cookie";

const lskey = `nivandres-use-translation[npm]/locale-language-selection`;

export type SetState<T extends unknown = unknown> = Dispatch<
  React.SetStateAction<T>
>;

export type HookFunction<A extends BCP = unknown & BCP> = (detail: {
  fix: (str: A | string | undefined | null) => A;
  langs: A[];
  main: A;
  initial: A;
}) =>
  | string
  | [string]
  | [string, SetState<A>]
  | [string, SetState<A> | undefined, any[]]
  | { value: string; stateHandler?: SetState<A>; dependencies?: any[] };

export function setStaticLang(l: string | SetState<string>) {
  // @ts-ignore
  const lang = typeof l === "string" ? l : l(localStorage.getItem(lskey));
  try {
    // @ts-ignore
    return localStorage.setItem(lskey, String(lang));
  } catch (err) {
    return false;
  }
}

export function getStaticLang() {
  try {
    // @ts-ignore
    return localStorage.getItem(lskey) || null;
  } catch (err) {
    return null;
  }
}

export function tryToRefresh(o?: boolean) {
  if (!o) return;
  try {
    // @ts-ignore
    location.reload();
  } catch (err) {
    return err;
  }
}

export const useLangHook: HookFunction = ({
  fix,
  langs,
  main,
  initial: prev,
}) => {
  const [lang, setLang] = React.useState(prev || main);

  React.useEffect(() => {
    let chosen: any = lightFix(prev, langs, main);
    try {

      if (chosen.fallback) {
        // @ts-ignore
        chosen = getLangFromPathname(location.pathname, langs, main);
      }

      if (chosen.fallback) {
        chosen = fixLang(Cookie.get("lang"));
      }

      if (chosen.fallback) {
        // @ts-ignore
        chosen = fixLang(location.search || "", langs, main);
      }

      if (chosen.fallback) {
        // @ts-ignore
        chosen = lightFix(String(localStorage.getItem(lskey)), langs, main);
      }

      if (chosen.fallback) {
        chosen = fixLang(
          // @ts-ignore
          (document.cookie || "")
            .split(";")
            .filter((c: string) => c.match(/(lang|trans|local)/gi))
            .join(""),
          langs as any,
          main
        );
      }

      if (chosen.fallback) {
        chosen = getLangFromNavigator(langs as any, main);
      }
    } catch (e) {
      chosen = main as any;
    }
    setLang(fix(chosen));
  }, []);

  return [lang, setLang];
};

export function resolveLangHook(
  hook: HookFunction,
  langs: BCP[],
  ref: BCP,
  prev?: BCP
) {
  let h = [ref, setStaticLang, [{}]];
  const u =
    (hook({
      fix: (s) => fixLang(s, langs, ref) as any,
      langs: langs as any,
      main: ref as any,
      initial: prev as any,
    }) as any) || ref;
  if (typeof u === "string") {
    h[0] = u as any;
  } else if (typeof u === "object") {
    h[0] = u.value || u[0] || h[0];
    h[1] = u.stateHandler || u[1] || h[1];
    h[2] = u.dependencies || u.hook || u[2] || u[1] || h[2];
  }
  return h as any;
}

export function restoreLocalStorageLang() {
  try {
    // @ts-ignore
    localStorage.removeItem(lskey);
  } catch (err) {
    return err;
  }
}

export function setLocalStorageLang(lang: BCP) {
  try {
    // @ts-ignore
    localStorage.setItem(lskey, lang);
  } catch (err) {
    return err;
  }
}

export function setCookieLang(lang: BCP, expires: number = 17) {
  try {
    Cookie.set("lang", lang, { expires });
  } catch (err) {
    return err;
  }
}

export function setPathnameLang(lang: BCP) {
  try {
  } catch (err) {
    return err;
  }
}

export function setSearchParamLang(lang: BCP) {
  try {
    // @ts-ignore
    const url = new URL(location.href);
    // @ts-ignore
    url.searchParams.set("lang", lang);
    // @ts-ignore
    location.replace(url);
  } catch (err) {
    return err;
  }
}
