import React, { useContext, useMemo } from "react";
import {
  Node,
  Keep,
  Placeholder,
  processNode,
  Replacement,
  reserveKeys,
  Size,
  Base,
} from "./format";
import { BCP, getLocaleFromBCP } from "./locales";
import { Translation, LocaleList, LocaleDetail, DoTranslation } from "./types";
import { createTimeFunction } from "./functions";
import {
  HookFunction,
  SetState,
  setStaticLang,
  getStaticLang,
  resolveLangHook,
  useLangHook,
  tryToRefresh,
} from "./hook";
import { injectVariables, PValue, getValue, CleanArray } from "./utils";
import { fixLang, lightFix } from "./match";

type ENV = "client" | "server" | "both";

function s(p: string[], t: any) {
  const k = p.shift();
  if (k === undefined || [...reserveKeys, "base", "values"].includes(k)) {
    return t;
  } else if (t[k]) {
    return s(p, t[k] || {});
  } else {
    return t || {};
  }
}

interface Props<
  AllowedTranslation extends BCP = BCP,
  Variables extends Placeholder = Placeholder
> {
  children?: React.ReactNode;
  onlyClient?: boolean;
  initialLang?: AllowedTranslation;
  variables?: Placeholder & Partial<Variables>;
  onLangChange?: (lang: AllowedTranslation, prev: AllowedTranslation) => void;
  useHook?: HookFunction<AllowedTranslation>;
  static?: boolean;
  refreshOnChange?: boolean;
}

export function createTranslation<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  Tree extends Node,
  Variables extends Placeholder,
  Apply extends (input: string, ...params: any) => string
>(
  {
    locales,
    mainLocale: main,
    replacement,
    variables,
    timeFormatOptions,
    onNotTranslated,
    onFail,
    useHook: Hook_function,
    apply,
    defaultTime,
    getStaticLang: getL,
    setStaticLang: setL,
    refreshOnChange,
  }: {
    locales: {
      [translation in AllowedTranslation]: Keep<Tree>;
    };
    mainLocale?:
      | MainTranslation
      | Exclude<
          Keep<Tree>,
          AllowedTranslation | MainTranslation | Base | string
        >;
    defaultTime?: Date;
    variables?: Variables;
    replacement?: Replacement;
    refreshOnChange?: boolean;
    apply?: Apply;
    getStaticLang?: (details: {
      fix: (str?: string | AllowedTranslation) => AllowedTranslation;
      langs: AllowedTranslation[];
      main: AllowedTranslation;
      initial: AllowedTranslation;
    }) => AllowedTranslation;
    setStaticLang?: (lang: AllowedTranslation, refresh?: boolean) => void;
    useHook?: HookFunction<AllowedTranslation>;
    timeFormatOptions?: Record<Size, Intl.DateTimeFormatOptions>;
    onFail?: <R extends boolean>(
      e: unknown,
      required: R
    ) => R extends true ? string : undefined | void;
    onNotTranslated?: (
      queryString: string,
      queryLanguage: AllowedTranslation,
      length: number,
      variables: Placeholder
    ) => string;
    debug?: boolean;
  },
  Hook?: HookFunction<AllowedTranslation>
) {
  variables = (variables || {}) as any;
  const langs = Object.keys(locales) as AllowedTranslation[];
  const reference = (
    !main
      ? locales[langs[0]]
      : typeof main == "string"
      ? locales[main as MainTranslation]
      : main
  ) as Tree;
  let ref: MainTranslation =
    typeof main === "string"
      ? (main as MainTranslation)
      : ((langs.find((l) => (locales[l] == reference ? true : false)) ||
          "unknown") as MainTranslation);

  let translation = {
    langs,
    ref,
    main: ref,
    times: {},
    localeList: {},
    locales: [],
  } as any;

  function traverse<N extends Node>(
    translated: Keep<N>,
    original: Keep<N>,
    heritage: {
      values: Placeholder;
      parent: any;
      child: string;
      god?: boolean;
      lang: AllowedTranslation;
    }
  ) {
    const r = processNode(original);
    const n = processNode(translated);
    let d: any = {};

    const values = { ...r.values, ...n.values, ...heritage.values };
    const children = n.children;
    const base = injectVariables(
      n.base ||
        (onNotTranslated && r.base
          ? onNotTranslated(r.base, heritage.lang, r.base.length, values)
          : undefined) ||
        r.base,
      values,
      replacement
    );

    const useV = function Use(variables: Placeholder) {
      const { parent, child, values } = heritage;
      return (parent[child] = traverse(translated, original, {
        ...heritage,
        values: { ...heritage.values, ...values, ...variables },
      }));
    };

    const use = heritage.god
      ? function Use(variables: Placeholder) {
          const nd = {} as any;
          langs
            .filter((a) => a != ref)
            .forEach((l) => {
              nd[l] = translation[l].use(variables);
              nd[l].t = nd[l];
            });
          const ld = useV(variables);
          nd[heritage.lang] = ld;
          ld.t = ld;
          return Object.assign(ld, nd, { [ref]: ld });
        }
      : useV;

    const search = (...req: any[]) => {
      let variables: any = undefined;
      let relativeDirection: string | string[];
      if (
        typeof req[req.length - 1] === "object" &&
        !Array.isArray(req[req.length])
      ) {
        variables = req.pop();
      }
      if (req.length - 1) {
        relativeDirection = req;
      } else {
        relativeDirection = req[0];
      }
      let path: string[] = [];
      if (typeof relativeDirection === "string") {
        path = relativeDirection.split("/").filter((a) => a);
      } else if (
        typeof relativeDirection === "object" &&
        Array.isArray(relativeDirection)
      ) {
        path = relativeDirection;
      } else {
        return d;
      }
      if (heritage.god) {
        const nd = {} as any;
        langs
          .filter((a) => a != ref)
          .forEach((l) => {
            nd[l] = s(path.flat(), translation[l]).set(variables);
            nd[l].t = nd[l];
          });
        const ld = s(path, d).set(variables);
        nd[heritage.lang] = ld;
        ld.t = ld;
        return Object.assign(ld, nd, { [ref]: ld });
      }
      return s(path, d).set(variables);
    };

    const C: React.FC<{ values: Placeholder; path: string }> = ({
      values,
      path,
    }) => {
      return search(path, values)?.base;
    };

    const details = {
      base: base ?? null,
      raw: n.base,
      values,
      children,
      search,
      get: search,
      s: search,
      use: search,
      u: use,
      fix: use,
      do: search,
      upperCase: base?.toUpperCase(),
      lowerCase: base?.toLowerCase(),
      C,
      FC: C,
      set: use,
      go: search,
      lang: heritage.lang,
      path: search,
      find: search,
      f: search,
      intl: Intl,
      apply: (...params: any[]) => apply?.((base as string) || "", ...params),
      Intl: Intl,
      langs,
      t: d,
      g: translation,
      local: heritage.parent,
      locale: translation?.localeList?.[heritage?.lang],
      parent: heritage.parent,
      p: heritage.parent,
      l: heritage.parent,
      time: translation.times[heritage.lang],
      setVariables: use,
      variables: values,
      original: r.base || "",
      query: heritage.lang,
      from: ref,
      locales: translation.locales,
      heritage: heritage.values,
      child: heritage.child,
      heaven: () => (heritage.god = true),
    };

    d = Object.assign((base ?? search) as unknown as object, {
      ...details,
      details,
    });

    children.map((c) => {
      // @ts-ignore
      d[c] = traverse(translated[c] || original[c], original[c], {
        values,
        parent: d,
        child: c,
        lang: heritage.lang,
      });
      d[c].t = d[c];
    });

    return d;
  }

  langs.map((lang) => {
    translation.times[lang] = createTimeFunction(
      lang,
      timeFormatOptions,
      onFail,
      defaultTime
    );
    let detail = Object.assign(getLocaleFromBCP(lang), {
      lang,
      locale: lang,
    });
    translation.localeList[lang] = detail;
    translation.locales.push(detail);
    translation[lang] = traverse(locales[lang] as any, reference as any, {
      values: { ...(variables || {}) },
      parent: translation,
      child: lang,
      god: ref === lang ? true : undefined,
      lang,
    });
    translation[lang].g = translation;
    translation[lang].t = translation[lang];
    translation[lang].T = translation[lang];
  });

  translation = Object.assign(translation[ref], translation);
  const t = translation as Translation<
    Tree,
    AllowedTranslation,
    MainTranslation,
    Variables
  >;

  const fix = (str?: string | AllowedTranslation) => fixLang(str, langs, ref);

  const setLang_ = (
    value: PValue<AllowedTranslation>,
    refresh: boolean = true
  ) => {
    const v = lightFix(
      getValue(value, (getStaticLang() || ref) as any) || getStaticLang()
    );
    try {
      setStaticLang(v);
      setL?.(v as any, refresh);
    } catch (err) {
      onFail?.(err, false);
    }
    tryToRefresh(refresh);
  };

  const getLang_: () => AllowedTranslation = () =>
    lightFix(
      (getL || getStaticLang)?.({
        fix: fix,
        langs: langs,
        main: ref,
        initial: getStaticLang() as any,
      }) || getStaticLang(),
      langs,
      ref
    );

  const doTranslation: any = (
    path: string,
    default_variables: object,
    selected_language: string
  ) => {
    const lang = lightFix(selected_language, langs, ref);
    // @ts-ignore
    t[lang] = t[lang] || t[ref];
    // @ts-ignore
    t[lang].heaven();
    const tr = path // @ts-ignore
      ? (t[lang as any].search(path, default_variables) as any)
      : // @ts-ignore
        (t[lang as any].use(
          default_variables ? default_variables : undefined
        ) as any);

    return Object.fromEntries(
      Object.entries(tr).filter(([key]) => !Number.isInteger(key))
    ) as any;
  };

  type THook = DoTranslation<
    AllowedTranslation,
    MainTranslation,
    Tree,
    Variables,
    CleanArray<
      [
        AllowedTranslation,
        SetState<AllowedTranslation>,
        SetState<Variables & Placeholder>,
        any[]
      ]
    > & {
      lang: AllowedTranslation;
      setLang: (value: PValue<AllowedTranslation>, refresh?: boolean) => void;
      setValues: SetState<Variables & Placeholder>;
      dependencies: any[];
    }
  >;

  const getTranslation: THook = (path, defaultVariables, preferredLang) => {
    const lang: AllowedTranslation = preferredLang || getLang_();
    const setLang = setLang_;
    const setValues = () => {};
    const dependencies = [{}];
    const values = {
      ...(variables || {}),
      ...(defaultVariables || {}),
    };
    return Object.assign(
      [lang, setLang, setValues, dependencies],
      doTranslation(path, values, lang),
      {
        lang,
        setLang,
        setValues,
        dependencies,
      }
    ) as any;
  };

  let useTranslation: THook;
  let TranslationProvider: React.FC<Props<AllowedTranslation, Variables>>;

  try {
    const TranslationContext = React.createContext<{
      lang: () => AllowedTranslation;
      setLang: SetState<AllowedTranslation>;
      setValues: SetState<Placeholder>;
      dependencies: any[];
      t: any;
    }>({
      lang: getLang_,
      setLang: setLang_ as any,
      setValues: () => {},
      dependencies: [{}],
      t,
    });

    TranslationProvider = function TProvider({
      children,
      initialLang,
      variables: defaultVariables,
      onlyClient,
      onLangChange,
      useHook: clientHook,
      static: static_hook,
      refreshOnChange: refresh,
    }) {
      const staticLang: AllowedTranslation = useMemo(() => {
        let r: any;
        try {
          r = getStaticLang() || ref;
          r =
            getL?.({ fix: fix, langs: langs, main: ref, initial: r || ref }) ||
            r;
        } catch (err) {
          onFail?.(err, false);
        }
        return lightFix(initialLang || r, langs) as any;
      }, [initialLang]);

      const [lang, setLang, dependencies] = resolveLangHook(
        (clientHook || Hook || Hook_function || static_hook
          ? function useDefault() {
              return React.useState(staticLang);
            }
          : useLangHook) as any,
        langs,
        staticLang
      );

      const [values, setValues] = React.useState<Placeholder & Variables>({
        ...(variables || {}),
        ...(defaultVariables || {}),
      } as any);

      const tr = doTranslation(undefined, values, lang);

      return React.createElement(
        TranslationContext.Provider,
        {
          value: {
            lang: () => lang,
            setLang: (
              va: PValue<AllowedTranslation>,
              r: boolean = (refresh ?? refreshOnChange) || false
            ) => {
              const v = getValue(va, lang);
              setLang(v);
              onLangChange?.(v, lang);
              setLang_(v, r);
            },
            setValues: setValues as any,
            dependencies,
            t: tr,
          },
        },
        children
      );
    };

    useTranslation = (path, defaultVariables, preferredLang) => {
      const { lang, setValues, setLang, t, dependencies } =
        useContext(TranslationContext);

      const tr = t.search(path, defaultVariables)[preferredLang || "t"];

      return Object.assign([lang, setLang, setValues, dependencies], tr, {
        lang,
        setLang,
        setValues,
        dependencies,
      }) as any;
    };
  } catch (err) {
    // @ts-ignore
    TranslationProvider = function RSCFakeProvider({ children }) {
      return children;
    };
    // @ts-ignore
    useTranslation = getTranslation;
  }

  return {
    t,
    translation: t,
    useTranslation,
    getTranslation,
    langs,
    lang: langs[0],
    main: ref,
    list: translation.localeList as Record<
      AllowedTranslation,
      LocaleDetail<AllowedTranslation>
    >,
    locales: translation.locales as LocaleList<AllowedTranslation>,
    time: createTimeFunction(ref, timeFormatOptions, onFail, defaultTime),
    setLang: setLang_,
    getLang: getLang_,
    TranslationProvider,
    T: t,
    fix,
  };
}

type a = Parameters<(xd: number) => string>;
