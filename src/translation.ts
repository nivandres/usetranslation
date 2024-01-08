import {
  Node,
  Keep,
  Placeholder,
  processNode,
  Replacement,
  reserveKeys,
  Size,
} from "./format";
import { createTimeFunction } from "./functions";
import { BCP } from "./locales";
import { Translation } from "./types";
import { injectVariables, valueof } from "./utils";

export function createTranslation<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  Tree extends Node,
  Variables extends Placeholder
>({
  locales,
  main,
  replacement,
  variables,
  timeFormatOptions,
  onNotTranslated,
  onFail,
}: {
  locales: {
    [translation in AllowedTranslation]: Keep<Tree>;
  };
  main?: MainTranslation | Tree;
  variables?: Variables;
  replacement?: Replacement;
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
}) {
  let translation = {} as any;
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

  function traverse<N extends Node>(
    translated: Keep<N>,
    original: Keep<N>,
    heritage: {
      values: Placeholder;
      parent: any;
      child: string;
      lang: AllowedTranslation;
    }
  ) {
    const r = processNode(original);
    const n = processNode(translated);

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

    const use = (variables: Placeholder) => {
      const { parent, child, values } = heritage;
      return (parent[child] = traverse(translated, original, {
        ...heritage,
        values: { ...heritage.values, ...values, ...variables },
      }));
    };

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
      return s(path, variables ? use(variables) : d);
    };

    let d: any;

    const details = {
      base: base ?? null,
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
      setVariables: use,
      variables: values,
      original: r.base || "",
      query: heritage.lang,
      from: ref,
      locales: langs,
      heritage: heritage.values,
      child: heritage.child,
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
    });

    return d;
  }

  langs.map((lang) => {
    translation[lang] = traverse(locales[lang] as any, reference as any, {
      values: { ...(variables || {}) },
      parent: translation,
      child: lang,
      lang,
    });
    translation[lang].time = createTimeFunction(
      lang,
      timeFormatOptions,
      onFail
    );
    translation[lang].intl = Intl;
    translation[lang].Intl = Intl;
  });

  translation = Object.assign(translation, translation[ref]);
  translation.langs = langs;

  return translation as Translation<
    Tree,
    AllowedTranslation,
    MainTranslation,
    Variables
  >;
}
