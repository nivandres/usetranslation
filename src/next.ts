import { NextRequest, NextResponse } from "next/server";
import { getLangFromPathname, getLangFromHeaders } from "./match";
import { BCP, BCPList } from "./locales";
import { redirect } from "next/navigation";

export const middlewareConfig = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

export function LayoutMiddleware(
  param: string[] | string | undefined,
  langs: BCP[] = BCPList,
  redirectFunction: (pathname: string) => any = redirect
) {
  const params = typeof param == "string" ? [param] : [...(param || [])];
  if (params.length > 1) {
    redirectFunction(`/${params[0]}`);
  }
  if (params[0] && !langs.includes(params[0] as any)) {
    redirectFunction(`/`);
  }
}

export type MiddlewareConfig<A extends BCP = BCP, M extends A = A> = {
  langs?: A[];
  main?: M;
  rootPath?: "force" | "optional" | boolean;
  checkCookie?: boolean;
};

export function TranslationMiddleware<A extends BCP, M extends A>(
  request: NextRequest,
  {
    langs = BCPList as A[],
    main = langs[0] as M,
    rootPath = false,
    checkCookie = false,
  }: MiddlewareConfig<A, M>
) {
  const storedLang = !!request.cookies.get("lang");
  let { pathname } = request.nextUrl;
  let lang = getLangFromPathname(pathname, langs, main) as (A | M) & {
    fallback: boolean;
  };

  let chosenPath: string = pathname;

  if (lang.fallback) {
    if (storedLang && !rootPath) {
      pathname = `/${lang}${pathname}`;
    } else if (!storedLang) {
      lang = getLangFromHeaders(
        {
          "accept-language": request.headers.get("accept-language") || main,
        },
        langs,
        main
      ) as any;
      if (lang != main) {
        pathname = `/${lang}${pathname}`;
      }
    }
  } else if (lang == main && rootPath && rootPath != "optional") {
    pathname = pathname
      .split("/")
      .filter((r) => r != main)
      .join("/");
  }

  let response: NextResponse<unknown>;

  if (pathname != chosenPath) {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    response = NextResponse.redirect(url) as any;
  } else {
    if (checkCookie && request.cookies.get("lang")?.value != lang) {
      response = NextResponse.redirect(request.nextUrl.clone());
    } else {
      response = NextResponse.next() as any;
    }
  }
  response.cookies.set("lang", lang);
  return Object.assign(response, { lang, pathname: chosenPath });
}

export function createMiddleware<A extends BCP, M extends A>({
  langs = BCPList as A[],
  main = langs[0] as M,
  rootPath,
  checkCookie,
}: MiddlewareConfig<A, M>) {
  return {
    config: middlewareConfig,
    middleware: (request: NextRequest) =>
      TranslationMiddleware(request, { langs, main, rootPath, checkCookie }),
    layout: (
      param: string | string[] | undefined,
      redirectFunction: (pathname: string) => any = redirect
    ) => LayoutMiddleware(param, langs, redirectFunction),
  };
}
