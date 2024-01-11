import { useState } from "react";
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
import {
  Translation,
  UseHook,
  GetHook,
  LocaleList,
  LocaleDetail,
} from "./types";
import { createTimeFunction } from "./functions";
import { HookFunction, SetStaticState, useLangHook } from "./hook";
import { injectVariables } from "./utils";
import { match } from "@formatjs/intl-localematcher";

function s(p: string[], t: any) {
  const k = p.shift();
  if (k === undefined || [...reserveKeys, "base", "values"].includes(k)) {
    return t;
  } else if (t[k]) {
    return s(p, t[k]);
  } else {
    return t;
  }
}

export function createTranslation<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  Tree extends Node,
  Variables extends Placeholder
>(
  {
    locales,
    defaultLocale: main,
    replacement,
    variables,
    timeFormatOptions,
    onNotTranslated,
    onFail,
    hook: hook_function,
    static: static_hook,
    debug,
  }: {
    locales: {
      [translation in AllowedTranslation]: Keep<Tree>;
    };
    defaultLocale?:
      | MainTranslation
      | Exclude<
          Keep<Tree>,
          AllowedTranslation | MainTranslation | Base | string
        >;
    variables?: Variables;
    replacement?: Replacement;
    static?: boolean;
    hook?: HookFunction<AllowedTranslation, MainTranslation>;
    timeFormatOptions?: Record<Size, Intl.DateTimeFormatOptions>;
    onFail?: <R extends boolean>(
      e: unknown,
      required: R
    ) => R extends true ? string : undefined | void;
    onNotTranslated?: (
      queryString: string,
      queryLanguage: AllowedTranslation,
      variables: Placeholder
    ) => string;
    debug?: boolean;
  },
  hook?: HookFunction<AllowedTranslation, MainTranslation>
) {
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
          ? onNotTranslated(r.base, heritage.lang, values)
          : undefined) ||
        r.base,
      values,
      replacement
    );

    const useV = (variables: Placeholder) => {
      const { parent, child, values } = heritage;
      return (parent[child] = traverse(translated, original, {
        ...heritage,
        values: { ...heritage.values, ...values, ...variables },
      }));
    };

    const use = heritage.god
      ? (variables: Placeholder) => {
          let nd = {} as any;
          langs.forEach((l) => {
            nd[l] = translation[l].use(variables);
          });

          return (translation = Object.assign(useV(variables), nd));
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
        let nd = {} as any;
        langs.forEach((l) => {
          nd[l] = s(
            path,
            variables ? translation[l].use(variables) : translation[l]
          );
        });
        return Object.assign(nd[heritage.lang], nd);
      }
      return s(path, variables ? use(variables) : d);
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
      set: use,
      go: search,
      path: search,
      find: search,
      f: search,
      intl: Intl,
      Intl: Intl,
      langs,
      t: d,
      g: translation,
      local: heritage.parent,
      locale: translation.localeList[heritage.lang],
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
      onFail
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
  });

  translation = Object.assign(translation[ref], translation);
  const t = translation as Translation<
    Tree,
    AllowedTranslation,
    MainTranslation,
    Variables
  >;

  function f (s: any, r: any, h: any) {
    if (s) {
      let m = ref;
      try {
        m =
          (match(
            (typeof s === "string" ? [s] : s).flat().flat(),
            langs,
            ref
          ) as any) || ref;
      } catch (err) {
        (onFail as any || (() => {}))(err, false);
      }
      if (r) {
        let st = SetStaticState
        let o = typeof r === 'function' ? (st=r||st) && h : (st=h||st) && r;
        return Object.assign(m, {
          value: m,
          setValue: st,
          dependencies: o,
        })
      } else {
        return m;
      }
    } else {
      return ref;
    }
  }
  

  const useTranslation: UseHook<AllowedTranslation, Tree, Variables> = (
    path,
    default_variables
  ) => {
    let h: [AllowedTranslation, Function, any] = [ref, SetStaticState, {}];
    if (!static_hook) {
      const u =
        ((hook || hook_function || useLangHook) as any)(
          Object.assign(f, { langs, main: ref, fix: f, prev: null, stateHandler: SetStaticState }),
          langs,
          ref,
          SetStaticState,
          null,
          f
        ) || ref;
      if (typeof u === "string") {
        h[0] = u as any;
      } else if (typeof u === "object") {
        h[0] = u.value || u[0] || h[0];
        h[1] = u.setValue || u[1] || h[1];
        h[2] = u.dependencies || u.hook || u[2] || u[1] || h[2];
      }
    }
    const [values, setValues] = useState<Placeholder>({
      ...(variables || {}),
      ...(default_variables || {}),
    });
    const [lang, setLang] = static_hook
      ? (useState<AllowedTranslation>(ref) as any)
      : h;

    SetStaticState(lang);
    // @ts-ignore
    t[lang] = t[lang] || t[ref];
    // @ts-ignore
    t[lang].heaven();
    const tr = path // @ts-ignore
      ? (t[lang as any].search(
          path,
          default_variables ? values : undefined
        ) as any)
      : // @ts-ignore
        (t[lang as any].use(default_variables ? values : undefined) as any);

    return Object.assign(
      [tr, setLang, setValues, h[2]],
      Object.fromEntries(
        Object.entries(tr).filter(([key]) => !Number.isInteger(key))
      ) as any,
      {
        setLang,
        setValues,
        dependencies: h[2],
      }
    ) as any;
  };

  const getTranslation: GetHook<AllowedTranslation, Tree, Variables> = (
    path,
    default_variables
  ) => {
    const values: Placeholder = {
      ...(variables || {}),
      ...(default_variables || {}),
    };
    const tr = path
      ? // @ts-ignore
        (t.search(path, default_variables ? values : undefined) as any)
      : // @ts-ignore
        (t.use(default_variables ? values : undefined) as any);
    return Object.assign(
      [tr, tr.time, Intl] as any,
      Object.fromEntries(
        Object.entries(tr as any).filter(([key]) => !Number.isInteger(key))
      ) as any
    ) as any;
  };

  return {
    t,
    translation: t,
    useTranslation,
    getTranslation,
    rsc: { useTranslation: getTranslation },
    langs,
    main: ref,
    list: translation.localeList as Record<
      AllowedTranslation,
      LocaleDetail<AllowedTranslation>
    >,
    locales: translation.locales as LocaleList<AllowedTranslation>,
  };
}
