import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest) {
  if (userAgent(req).isBot) {
    return new Response("You are Bot", { status: 403 });
  }
  const ua = userAgent(req); // 현재 버전에서 userAgent 가져오는 법.
  console.log("USERAGENT!!", ua);
  console.log(req.url);

  //  if (!req.url.includes("/api")) 으로 감싸는 이유 -> 로그인 되지않은 상태이기 때문에 api 정보를 요청할 필요가 없다(로그인되어야 유저의 api정보로 로그인유무를 파악하기 때문에)
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.has("carrotsession")) {
      // req.nextUrl.searchParams.set("from", req.nextUrl.pathname);
      req.nextUrl.pathname = "enter";
      return NextResponse.redirect(req.nextUrl);
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
