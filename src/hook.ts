import React, { Dispatch, useEffect, useState } from "react";
import { Node, Placeholder } from "./format";
import { BCP } from "./locales";
import { Translation } from "./types";
import { match } from "@formatjs/intl-localematcher";
import { set } from "js-cookie";
import { CleanArray } from "./utils";
import { createTimeFunction } from "./functions";
import { createTranslation } from "./translation";

export type TranslationHook<
  Tree extends Node,
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  Variables extends Placeholder,
  V extends Placeholder,
  T extends Translation<
    Tree,
    AllowedTranslation,
    MainTranslation,
    Variables
  > = Translation<Tree, AllowedTranslation, MainTranslation, Variables>,
  Use extends Function = <E extends Placeholder>(
    variables: E & Partial<Variables> & Partial<V>
  ) => CleanArray<
    [
      AllowedTranslation,
      Dispatch<React.SetStateAction<AllowedTranslation>>,
      Dispatch<
        React.SetStateAction<
          Partial<E> & Partial<Variables> & Partial<V> & Placeholder
        >
      >
    ]
  > &
    T & {
      t: T[AllowedTranslation];
      time: ReturnType<typeof createTimeFunction>;
      setLang: Dispatch<React.SetStateAction<AllowedTranslation>>;
      setVariables: Dispatch<
        React.SetStateAction<
          Partial<E> & Partial<Variables> & Partial<V> & Placeholder
        >
      >;
    },
  Get extends Function = <E extends Placeholder>(
    variables: E & Partial<Variables> & Partial<V>
  ) => CleanArray<
    [AllowedTranslation, ReturnType<typeof createTimeFunction>, typeof Intl]
  > &
    T & {
      t: T[AllowedTranslation];
      time: ReturnType<typeof createTimeFunction>;
      intl: typeof Intl;
    }
> = CleanArray<[Use, Get]> & {
  rsc: { useTranslation: Get };
  useTranslation: Use;
  getTranslation: Get;
  t: T[MainTranslation];
};


export type HookFunction<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation
> = <
  S extends string | `${string}-${string}` | AllowedTranslation,
  T extends Dispatch<React.SetStateAction<S>>
>(
  langs: AllowedTranslation[],
  main: MainTranslation,
  prev?: never
) =>
  | undefined
  | S
  | [S, T]
  | {
      value: S;
      setValue?: T;
    };

export type HookConfiguration<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  Variables extends Placeholder,
  V extends Placeholder
> = {
  variables?: V & Partial<Variables>;
  default?: AllowedTranslation;
  static?: boolean;
  hook?: HookFunction<AllowedTranslation, MainTranslation>;
};

export function useLangHook<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation
>(
  langs: AllowedTranslation[],
  // @ts-ignore
  main: MainTranslation = langs[0],
  prev?: AllowedTranslation
) {
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
        document.cookie.split(";").forEach((c) => {
          if (c.includes("transl") || c.includes("local")) {
            chosen = match(
              (c.split("=")[1] || (main as string)).match(
                /([a-z]{2}|[a-zA-Z]{2}[-_][a-zA-Z]{2}|[a-z]{2}(|[-_ ])[A-Z][a-zA-Z])/gm
              ),
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
  }, []);

  useEffect(() => {
    set("nivandres-use-translation", String(lang));
  }, [lang]);

  return [lang, setLang];
}

export function createTranslationHook<
  Tree extends Node,
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  Variables extends Placeholder,
  V extends Placeholder
>(
  translation: Translation<
    Tree,
    AllowedTranslation,
    MainTranslation,
    Variables
  >,
  configuration?: HookConfiguration<
    AllowedTranslation,
    MainTranslation,
    Variables,
    V
  >
): TranslationHook<Tree, AllowedTranslation, MainTranslation, Variables, V> {

  const useTranslation = createUseTranslation(translation, configuration)
  const getTranslation = createGetTranslation(translation, configuration)

  const arr = [useTranslation, getTranslation];

  // @ts-ignore
  return Object.assign(arr, {
    useTranslation,
    getTranslation,
    rsc: Object.assign(getTranslation, {
      useTranslation: getTranslation,
    }),
    t: translation[translation.main]
  }) as any;
}

function createGetTranslation(
  translation: any,
  configuration?: any
) {
  return (
    variables?: Placeholder
  ) => {
    const hook = configuration?.static
      ? undefined
      : configuration?.hook || useLangHook;
    const main = (configuration?.default ||
      translation.main) as string;

    const values: Placeholder = {
      ...(configuration?.variables || {}),
      ...(variables || {}),
    } as any;
    const lang: string = configuration?.default || translation.main;

    const t = translation.use(values);

    const arr = [t[lang], t[lang].time, Intl];

    // @ts-ignore
    let d = Object.assign(arr as CleanArray<typeof arr>, {
      ...t,
      t: t[lang],
      time: t[lang].time,
      intl: Intl,
    });

    let l = {} as any;

    translation.langs.forEach((lang: string) => {
      l[lang] = Object.assign(t[lang], {
        t: t[lang],
      });
    });

    return Object.assign(d, l)
  };
}

function createUseTranslation(
  translation: any,
  configuration?: any
) {

  return <E extends Placeholder>(
    variables?: Placeholder
  ) => {
    const hook = configuration?.static
      ? undefined
      : configuration?.hook || useLangHook;
    const main = (configuration?.default ||
      translation.main);

    let lang: string = main;
    let setLang: Dispatch<React.SetStateAction<string>> = (v) =>
      (lang = main);

    const [values, setValues] = useState<
     Placeholder
    >({
      ...(configuration?.variables || {}),
      ...(variables || {}),
    } as any);

    if (hook != undefined) {
      // @ts-ignore
      const h = hook(translation.langs, main);
      // @ts-ignore
      lang = (h?.value || h?.[0] || h || lang) as AllowedTranslation;
      // @ts-ignore
      setLang = (h?.setValue || h?.[1] || setLang) as any;
    } else {
      [lang, setLang] = useState(
        configuration?.default || translation.main
      );
    }

    const t = translation.use(values);

    const arr = [t[lang], setLang, setValues];

    // @ts-ignore
    let d = Object.assign(arr, {
      ...t,
      t: t[lang],
      time: t[lang].time,
      setLang,
      setVariables: setValues,
    });

    let l = {} as any;

    translation.langs.forEach((lang: string) => {
      l[lang] = Object.assign(t[lang], {
        t: t[lang],
        setLang,
      });
    });

    return Object.assign(d, l) as any
  };
}
