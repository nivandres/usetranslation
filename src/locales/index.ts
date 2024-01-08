// @ts-ignore
import LOCALES from "./list";

import * as Bundle from "./compile";

import { Filter } from "../utils";

export type Locales = typeof LOCALES;

export type Locale = Locales[number];

export const defaultLocale = {
  code: "en",
  name: "English",
  native: "English",
  rtl: false,
  flag: "🇺🇸",
  country: "United States",
  region: ["US"],
};

export type LocaleDetail = typeof defaultLocale;
export type LocaleParam = Partial<LocaleDetail>;

export type LocaleOf<L extends LocaleParam> = Filter<Locales, L>;

export type ISO = Locale["code"];

// export type ISO = Bundle.ISO

export type ISOOf<L extends LocaleParam> = LocaleOf<L>["code"];

export type LocaleFromISO<I extends ISO> = LocaleOf<{ readonly code: I }>;

export type Region = Locale["region"][number];

export type RegionsFromISO<I extends ISO> = RegionOf<{ readonly code: I }>;

export type LocalesFromRegion<R extends Region> = {
  [K in keyof Locales]: Locales[K] extends Locale
    ? R extends Locales[K]["region"][number]
      ? Locales[K]
      : never
    : never;
}[number];

export type RegionOf<L extends LocaleParam> = LocaleOf<L>["region"][number];

export type BCPSample<
  I extends string = string,
  R extends string = string
> = `${I}${"" | `-${R}`}`;
export type BCPFormat<
  I extends ISO = ISO,
  R extends Region = Region
> = BCPSample<I, R>;

export type BCPFromLocale<L extends Locale> = BCPFormat<
  L["code"],
  L["region"][number]
>;
export type BCPOf<L extends LocaleParam> = BCPFromLocale<LocaleOf<L>>;

//! Not compiled way to get BCP types

//? export type PreBCP<T extends readonly any[]> = {
//?   [K in keyof T]: T[K] extends Locale ? BCPFromLocale<T[K]> : never;
//? }[number];

//? export type BCP = PreBCP<Locales>;

export type BCP = Bundle.BCP;

export type LocaleFromBCP<B extends BCP> = B extends `${infer I}-${infer R}`
  ? I extends ISO
    ? R extends RegionsFromISO<I>
      ? LocaleFromISO<I>
      : never
    : R extends Region
    ? LocalesFromRegion<R>
    : never
  : B extends ISO
  ? LocaleFromISO<B>
  : never;

export type Format = BCP | Region;

export const LocaleList = LOCALES;

export const ISOList = LocaleList.map((l) => l.code);

export const RegionList = LocaleList.map((l) => l.region).flat();

export const BCPList = LOCALES.map((l) => [
  l.code,
  ...l.region.map((r) => `${l.code}-${r}`),
]).flat() as BCP[];

export const FormatList: Format[] = [...BCPList, ...RegionList];

export function getISOFromBCP(bcp: BCP): ISO {
  return bcp.split("-")[0] as ISO;
}

export function getRegionFromBCP(bcp: BCP): Region {
  return (bcp.split("-")[1] as Region) || "";
}

export function getLocaleFromISO(iso: ISO): Locale {
  return LOCALES.find((l) => l.code === iso) as Locale;
}

export function getLocaleFromBCP(bcp: BCP): Locale {
  return getLocaleFromISO(getISOFromBCP(bcp));
}

export function getLocalesFromRegion(region: Region): Locale[] {
  return LOCALES.filter((l: Locale) =>
    l.region.includes(region as never)
  ) as Locale[];
}
