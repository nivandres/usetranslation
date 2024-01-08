import {
  FollowWay,
  Keep,
  Node,
  Placeholder,
  ProcessNode,
  SearchWays,
  Size,
} from "./format";
import { BCP } from "./locales";
import { SplitString, StringArray, isArray } from "./utils";

type SearchFunction<
  AllowedTranslation extends BCP,
  MainTranslation extends AllowedTranslation,
  N extends Node,
  L extends AllowedTranslation,
  V extends Placeholder
> = <
  D extends StringArray<isArray<SearchWays<N>>>,
  T extends FollowWay<N, SplitString<D>>,
  E extends Placeholder
>(
  key?: D,
  variables?: Partial<V> & E
) => T extends Node
  ? Translator<AllowedTranslation, MainTranslation, T, L, V & E>
  : N;

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

type Translator<
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
    string & {
      use: U;
      do: U;
      base: P["base"];
      values: V;
      original: P["base"];
      query: L;
      from: MainTranslation;
      locales: AllowedTranslation[];
      heritage: H;
      child: string;
      set: U;
    }
  : P["base"] extends string
  ? // both
    string & {
      use: U;
      base: P["base"];
      children: P["children"] & keyof N;
      values: V;
      search: S;
      get: S;
      set: U;
      do: B;
      details: {
        base: P["base"];
        original: P["base"];
        children: P["children"] & keyof N;
        variables: V;
        values: V;
        search: S;
        get: S;
        do: B;
        use: U;
        set: U;
        fix: U;
        query: L;
        from: MainTranslation;
        locales: AllowedTranslation[];
        heritage: H;
        child: string;
      };
    }
  : // children
    S & {
      base: null
      use: S;
      children: P["children"] & keyof N;
      values: V;
      search: S;
      get: S;
      set: U;
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
    time: (
      time?: Date | number | string,
      format?: Size | Record<Size, Intl.DateTimeFormatOptions>,
      preferredLocale?: AllowedTranslation
    ) => string;
    intl: typeof Intl;
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
  // match: (
  //   lang: AllowedTranslation | string
  // ) => Translation<
  //   Tree,
  //   AllowedTranslation,
  //   MainTranslation,
  //   Variables
  // >[AllowedTranslation];
  use: <E extends Placeholder>(
    placeholder?: Partial<Variables> & E
  ) => Translation<Tree, AllowedTranslation, MainTranslation, Variables & E>;
  set: <E extends Placeholder>(
    placeholder?: Partial<Variables> & E
  ) => Translation<Tree, AllowedTranslation, MainTranslation, Variables & E>;
  fix: <E extends Placeholder>(
    placeholder?: Partial<Variables> & E
  ) => Translation<Tree, AllowedTranslation, MainTranslation, Variables & E>;
};

export type TranslationNode<N extends Node = Node, V extends Placeholder = Placeholder, A extends BCP = BCP, M extends A = A> = Translator<A,M,N,A,V>
