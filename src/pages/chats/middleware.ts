import type { NextRequest, NextFetchEvent } from "next/server";
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log("챗 미들웨어");
}
