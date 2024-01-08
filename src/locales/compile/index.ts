import { LocaleList } from "..";
import fs from "fs";

export * from "./bcp";
export * from "./iso";

const PATH = "./src/locales/compile/";

export function getISORawList() {
  return LocaleList.map((l) => `"${l.code}"`).join(" | ");
}

export function getBCPRawList() {
  return LocaleList.map((l) => [
    l.code,
    ...l.region.map((r) => `${l.code}-${r}`),
  ])
    .flat()
    .map((b) => `"${b}"`)
    .join(" | ");
}

try {
  fs.writeFileSync(PATH + "iso.ts", `export type ISO = ` + getISORawList());
  fs.writeFileSync(PATH + "bcp.ts", `export type BCP = ` + getBCPRawList());
} catch (err) {
  console.log("Cannot compile here");
}
