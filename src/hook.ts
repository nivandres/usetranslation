import React, { Dispatch, useEffect, useState } from "react";
import { BCP } from "./locales";
import { match } from "@formatjs/intl-localematcher";
import { IsDefined } from "./utils";

const lskey = `nivandres-use-translation[npm]/locale-language-selection`;

export type SetState<T extends unknown = unknown> = Dispatch<React.SetStateAction<T>>;

export type FixFunction<
  A extends BCP = unknown & BCP,
  O extends unknown = unknown,
  M extends A = A
> = <
  T extends string | string[] | undefined,
  S extends SetState<A> | undefined,
  R extends O | undefined
>(
  string?: T,
  hookReturn?: R,
  stateHandler?: S
) => IsDefined<
  T,
  IsDefined<R, A & { value: A; setValue?: S; return?: R }, A>,
  M
>;

export type HookFunction<
  Ot extends unknown = any,
  At extends BCP = unknown & BCP,
  Mt extends At = At
> = <A extends At, M extends Mt, O extends Ot>(
  langs: A[],
  main: A,
  fix: FixFunction<A, O>,
  prev?: null | A
) =>
  | A
  | [A]
  | [A, SetState<A>]
  | [A, SetState<A>, O]
  | { value: A; setValue?: SetState<A>; return?: O };

export function SetStaticState(l: string | SetState<string>) {
  // @ts-ignore
  const lang = typeof l === "string" ? l : l(localStorage.getItem(lskey));
  try {
    // @ts-ignore
    return localStorage.setItem(lskey, String(lang));
  } catch (err) {
    return false;
  }
}

export const useLangHook: HookFunction = (langs, main, fix) => {
  const [lang, setLang] = useState(main);

  useEffect(() => {
    let chosen = "";
    try {
      // @ts-ignore
      const pathname = location.pathname.split("/");
      langs.map((l) => {
        // @ts-ignore
        chosen = pathname.includes(l) ? l : "";
      });

      if (!chosen) {
        // @ts-ignore
        const l = String(localeStorage.getItem(lskey));
        chosen = pathname.includes(l) ? l : "";
      }

      if (!chosen) {
        // @ts-ignore
        document.cookie.split(";").forEach((c) => {
          if (c.includes("transl") || c.includes("local")) {
            chosen = match(
              (c.split("=")[1] || (main as string)).match(
                /([a-z]{2}|[a-zA-Z]{2}[-_][a-zA-Z]{2}|[a-z]{2}(|[-_ ])[A-Z][a-zA-Z])/gm
              ) || [],
              langs,
              main
            );
          }
        });
      }

      if (!chosen) {
        // @ts-ignore
        const n = window.navigator;
        // @ts-ignore
        chosen = langs.includes(n.language) ? n.language : "";
        // @ts-ignore
        chosen = match(n.languages as string, langs, main);
      }
    } catch (e) {
      chosen = main;
    }
    setLang(fix(chosen));
  }, []);

  return [lang, setLang];
};
// export function createTranslationHook<
//   Tree extends Node,
//   AllowedTranslation extends BCP,
//   MainTranslation extends AllowedTranslation,
//   Variables extends Placeholder,
//   V extends Placeholder
// >(
//   translation: Translation<
//     Tree,
//     AllowedTranslation,
//     MainTranslation,
//     Variables
//   >,
//   configuration?: HookConfiguration<
//     AllowedTranslation,
//     MainTranslation,
//     Variables,
//     V
//   >
// ): TranslationHook<Tree, AllowedTranslation, MainTranslation, Variables, V> {

//   const useTranslation = createUseTranslation(translation, configuration)
//   const getTranslation = createGetTranslation(translation, configuration)

//   const arr = [useTranslation, getTranslation];

//   // @ts-ignore
//   return Object.assign(arr, {
//     useTranslation,
//     getTranslation,
//     rsc: Object.assign(getTranslation, {
//       useTranslation: getTranslation,
//     }),
//     t: translation[translation.main]
//   }) as any;
// }

// function createGetTranslation(
//   translation: any,
//   configuration?: any
// ) {
//   return (
//     variables?: Placeholder
//   ) => {

//     const values: Placeholder = {
//       ...(configuration?.variables || {}),
//       ...(variables || {}),
//     } as any;
//     const lang: string = configuration?.default || translation.main;

//     const t = translation.use(values);

//     const arr = [t[lang], t[lang].time, Intl];

//     // @ts-ignore
//     let d = Object.assign(arr as CleanArray<typeof arr>, {
//       ...t,
//       t: t[lang],
//       time: t[lang].time,
//       intl: Intl,
//     });

//     let l = {} as any;

//     translation.langs.forEach((lang: string) => {
//       l[lang] = Object.assign(t[lang], {
//         t: t[lang],
//       });
//     });

//     return Object.assign(d, l)
//   };
// }

// function createUseTranslation(
//   translation: any,
//   configuration?: any
// ) {

//   return <E extends Placeholder>(
//     variables?: Placeholder
//   ) => {
//     const hook = configuration?.static
//       ? undefined
//       : configuration?.hook || useLangHook;
//     const main = (configuration?.default ||
//       translation.main);

//     let lang: string = main;
//     let setLang: Dispatch<React.SetStateAction<string>> = (v) =>
//       (lang = main);

//     const [values, setValues] = useState<
//      Placeholder
//     >({
//       ...(configuration?.variables || {}),
//       ...(variables || {}),
//     } as any);

//     if (hook != undefined) {
// @ts-ignore
//       const h = hook(translation.langs, main);
//       // @ts-ignore
//       lang = (h?.value || h?.[0] || h || lang) as AllowedTranslation;
//       // @ts-ignore
//       setLang = (h?.setValue || h?.[1] || setLang) as any;
//     } else {
//       [lang, setLang] = useState(
//         configuration?.default || translation.main
//       );
//     }

//     const t = translation.use(values);

//     const arr = [t[lang], setLang, setValues];

//     // @ts-ignore
//     let d = Object.assign(arr, {
//       ...t,
//       t: t[lang],
//       time: t[lang].time,
//       setLang,
//       setVariables: setValues,
//     });

//     let l = {} as any;

//     translation.langs.forEach((lang: string) => {
//       l[lang] = Object.assign(t[lang], {
//         t: t[lang],
//         setLang,
//       });
//     });

//     return Object.assign(d, l) as any
//   };
// }
