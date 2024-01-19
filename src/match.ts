import { match as m } from "@formatjs/intl-localematcher";
import { BCP, BCPList } from "./locales";
import Cookie from "js-cookie";
import Negotiator from "negotiator";

export const match = <A extends BCP[]>(
  l: (string | A[number] | undefined | null)[],
  langs: A = BCPList as A,
  main: A[number] = langs[0]
): A[number] => {
  try {
    const o = m(
      l.map((m) => lightFix(m)).filter((m) => !m["fallback" as keyof string]),
      [...langs, "ar-CO"],
      "ar-CO"
    );
    if (o === "ar-CO") return Object.assign(main, { fallback: true });
    return o as any;
  } catch (err) {
    return Object.assign(main, { fallback: true });
  }
};

export type Headers = Negotiator.Headers;

export function lightFix<A extends BCP[]>(
  str: string | A[number] | undefined | null,
  langs: A = BCPList as A,
  main: A[number] = langs[0]
): A[number] {
  return (
    langs.includes(str as A[number])
      ? str?.["fallback" as keyof string]
        ? Object.assign(str, { fallback: true })
        : (str as A[number])
      : Object.assign(main, { fallback: true })
  ) as A[number] & { fallback: boolean };
}

export function fixLang<A extends BCP[]>(
  str: string | A[number] | undefined | null,
  langs: A = BCPList as A,
  main: A[number] = langs[0]
): A[number] {
  const l = lightFix(str, langs, main);
  if (typeof l === "string") return l as A[number];
  return match(
    str?.trim().match(/[a-z]{2}(?:[-_][A-Z]{2})?|[A-Z]{2}/gm) || [],
    langs,
    main
  );
}

export function getLangFromHeaders<A extends BCP[]>(
  headers: Negotiator.Headers,
  langs: A = BCPList as A,
  main: A[number] = langs[0]
): A[number] {
  const l = new Negotiator({ headers }).languages();
  return match(l, langs, main);
}

export function getLangFromPathname<A extends BCP[]>(
  pathname: string | `${"" | "/"}${A[number]}${`/${string}` | ""}` | A[number],
  langs: A = BCPList as A,
  main: A[number] = langs[0]
) {
  return lightFix(
    match(
      pathname
        .replaceAll("_", "-")
        .split("/")
        .filter((a) => a),
      langs,
      main
    ),
    langs,
    main
  );
}

export function getLangFromList<A extends BCP[]>(
  list: (A[number] | string)[],
  langs: A = BCPList as A,
  main: A[number] = langs[0]
): A[number] {
  return match(
    list.map((e) => lightFix(e)),
    langs,
    main
  );
}

export function getLangFromRecord<A extends BCP[]>(
  record: Record<string, string | A[number]>,
  langs: A = BCPList as A,
  main: A[number] = langs[0]
): A[number] {
  return fixLang(JSON.stringify(record), langs, main);
}

export function getLangFromNavigator<A extends BCP[]>(
  langs: A = BCPList as A,
  main: A[number] = langs[0]
): A[number] {
  try {
    // @ts-ignore
    const n = window.navigator;
    // @ts-ignore
    let chosen = lightFix(
      langs.includes(n.language as any) ? n.language : "",
      langs,
      main
    );
    return chosen["fallback" as keyof string]
      ? match(n.languages as any, langs, main)
      : chosen;
  } catch (err) {
    return Object.assign(main, { fallback: true });
  }
}

export function getLangFromCookie<A extends BCP[]>(
  langs: A = BCPList as A,
  main: A[number] = langs[0]
): A[number] {
  try {
    return fixLang(Cookie.get("lang"), langs, main);
  } catch (err) {
    return Object.assign(main, { fallback: true });
  }
}
