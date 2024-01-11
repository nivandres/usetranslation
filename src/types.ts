import React from "react";
import {
  FollowWay,
  Keep,
  Node,
  Placeholder,
  ProcessNode,
  SearchWays,
  Size,
} from "./format";
import { TimeFunction } from "./functions";
import { BCP, LocaleFromBCP } from "./locales";
import {
  SplitString,
  StringArray,
  isArray,
  CleanArray,
  IsDefined,
} from "./utils";
import { SetState } from "./hook";

export type LocaleDetail<L extends BCP = BCP> = LocaleFromBCP<L> & {
  position: number;
  lang: L;
  locale: L;
};

export type LocaleList<A extends BCP = BCP> = LocaleDetail<A>[];

type SearchFunction<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  N extends Node,
  L extends AllowedTranslation,
  V extends Placeholder
> = <D extends StringArray<isArray<SearchWays<N>>>, E extends Placeholder>(
  path?: D,
  variables?: Partial<V> & E
) => Translator<
  AllowedTranslation,
  MainTranslation,
  FollowWay<N, SplitString<D>>,
  L,
  V & E
>;

type Use<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  N extends Node,
  L extends AllowedTranslation,
  V extends Placeholder
> = <
  D extends StringArray<isArray<SearchWays<N>>>,
  E extends Placeholder,
  T extends FollowWay<N, SplitString<D>>
>(
  p?: D | (Partial<V> & E),
  values?: Partial<V> & E
) => T extends Node
  ? Translator<AllowedTranslation, MainTranslation, T, L, V & E>
  : N;

export type Translator<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  N extends Node,
  L extends AllowedTranslation,
  H extends Placeholder,
  P extends ProcessNode<N> = ProcessNode<N>,
  V extends Placeholder = P["values"] & H,
  U extends Function = <E extends Placeholder>(
    placeholder?: Partial<V> & E
  ) => Translator<AllowedTranslation, MainTranslation, N, L, V & E>,
  B extends Function = Use<AllowedTranslation, MainTranslation, N, L, V>,
  S extends Function = SearchFunction<
    AllowedTranslation,
    MainTranslation,
    N,
    L,
    V
  >
> = {
  [C in P["children"]]: C extends keyof N
    ? N[C] extends Node
      ? Translator<AllowedTranslation, MainTranslation, N[C], L, V>
      : never
    : never;
} & (P["children"] extends never
  ? // base
    string &
      React.ReactNode & {
        use: U;
        do: U;
        base: P["base"];
        values: V;
        original: P["base"];
        query: L;
        from: MainTranslation;
        locales: AllowedTranslation[];
        raw: string | undefined;
        heritage: H;
        child: string;
        set: U;
      }
  : P["base"] extends string
  ? // both
    string &
      React.ReactNode & {
        use: U;
        base: P["base"];
        children: P["children"][];
        values: V;
        search: S;
        get: S;
        set: U;
        go: S;
        path: S;
        find: S;
        do: B;
        details: {
          base: P["base"];
          original: P["base"];
          children: P["children"][];
          variables: V;
          values: V;
          search: S;
          get: S;
          raw: string | undefined;
          go: S;
          path: S;
          do: B;
          use: U;
          set: U;
          fix: U;
          query: L;
          from: MainTranslation;
          langs: AllowedTranslation[];
          heritage: H;
          child: string;
        };
      }
  : // children
    S & {
      base: null & React.ReactNode;
      use: S;
      children: P["children"][];
      values: V;
      search: S;
      get: S;
      go: S;
      path: S;
      set: U;
      find: S;
      do: B;
    });

export type Translation<
  Tree extends Node = Node,
  AllowedTranslation extends BCP = BCP,
  MainTranslation extends AllowedTranslation = AllowedTranslation,
  Variables extends Placeholder = Placeholder
> = {
  [K in AllowedTranslation]: Translator<
    AllowedTranslation,
    MainTranslation,
    Keep<Tree>,
    K,
    Variables
  > & {
    t: Translator<
      AllowedTranslation,
      MainTranslation,
      Keep<Tree>,
      K,
      Variables
    >;
    g: Translation<Tree, AllowedTranslation, MainTranslation, Variables>;
    time: TimeFunction<AllowedTranslation>;
    locales: LocaleList<AllowedTranslation>;
    intl: typeof Intl;
    fix: <E extends Placeholder>(
      variables?: E & Partial<Variables>
    ) => Translator<
      AllowedTranslation,
      MainTranslation,
      Keep<Tree>,
      K,
      Variables
    >;
  };
} & {
  time: (
    time?: Date | number | string,
    format?: Size | Record<Size, Intl.DateTimeFormatOptions>,
    preferredLocale?: AllowedTranslation
  ) => string;
  intl: typeof Intl;
  langs: AllowedTranslation[];
  main: MainTranslation;
  locales: LocaleList<AllowedTranslation>;
  // match: (
  //   lang: AllowedTranslation | string
  // ) => Translation<
  //   Tree,
  //   AllowedTranslation,
  //   MainTranslation,
  //   Variables
  // >[AllowedTranslation];
  t: Translator<
    AllowedTranslation,
    MainTranslation,
    Keep<Tree>,
    MainTranslation,
    Variables
  >;
  use: <E extends Placeholder>(
    placeholder?: Partial<Variables> & E
  ) => Translation<Tree, AllowedTranslation, MainTranslation, Variables & E>;
  set: <E extends Placeholder>(
    placeholder?: Partial<Variables> & E
  ) => Translation<Tree, AllowedTranslation, MainTranslation, Variables & E>;
  fix: <E extends Placeholder>(
    placeholder?: Partial<Variables> & E
  ) => Translation<Tree, AllowedTranslation, MainTranslation, Variables & E>;
  search: <
    D extends StringArray<isArray<SearchWays<Tree>>>,
    W extends FollowWay<Tree, SplitString<D>>,
    E extends Placeholder
  >(
    path?: D,
    variables?: Partial<Variables> & E
  ) => Translation<W, AllowedTranslation, MainTranslation, E & Variables>;
};

export type TranslationNode<
  N extends Node = Node,
  V extends Placeholder = Placeholder,
  A extends BCP = BCP,
  M extends A = A
> = Translator<A, M, N, A, V>;

export type UseArr<
  T extends any,
  A extends string,
  V extends Placeholder,
  O extends unknown
> = CleanArray<[T, SetState<A>, SetState<Partial<V> & Placeholder>, O]>;

export type GetArr<T extends any, A extends BCP> = CleanArray<
  [T, TimeFunction<A>, typeof Intl]
>;

export type UseHook<
  A extends BCP,
  N extends Node,
  V extends Placeholder,
  O extends any
> = <
  D extends StringArray<isArray<SearchWays<N>>> | undefined,
  W extends FollowWay<N, SplitString<D extends string ? D : "">>,
  E extends Placeholder,
  T extends Translation<IsDefined<D, W, N>, A, A, E & V>
>(
  path?: D,
  variables?: Partial<V> & E
) => UseArr<Translator<A, A, W, A, V & E>, A, E & V, O> &
  T & {
    setLang: SetState<A>;
    setValue: SetState<Partial<E & V> & Placeholder>;
    hook: O;
  };

export type GetHook<A extends BCP, N extends Node, V extends Placeholder> = <
  D extends StringArray<isArray<SearchWays<N>>> | undefined,
  W extends FollowWay<N, SplitString<D extends string ? D : "">>,
  E extends Placeholder,
  T extends Translation<IsDefined<D, W, N>, A, A, E & V>
>(
  path?: D,
  variables?: Partial<V> & E
) => GetArr<Translator<A, A, W, A, V & E>, A> & T;
