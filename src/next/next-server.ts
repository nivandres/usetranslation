import { lightFix } from "../match";
import { NextServerCookies } from "../translation";
import { cookies as cooks } from "next/headers";

export function getNextLang(cookies: NextServerCookies = cooks) {
  return lightFix(cookies().get("lang")?.value);
}

export const getServerLang = getNextLang;
export const getCookieLang = getNextLang;
export const LANG = getNextLang;
