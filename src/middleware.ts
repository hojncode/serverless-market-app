import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log("미들웨어다!!!");
  console.log(req.cookies);
}
