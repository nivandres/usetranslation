import { useRouter } from "next/router";
import { HookFunction } from "../../hook";
import { getValue } from "../../utils";

/**
 * Not tested
 */
export const useNextRouter: HookFunction = ({ fix }) => {
  const router = useRouter();
  return [
    fix(router?.locale),
    (v) => {
      router.push(`${getValue(v, router.locale)}${router.pathname}`);
    },
    [router],
  ];
};