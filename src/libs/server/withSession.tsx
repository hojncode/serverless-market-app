import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  secure: true,
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!, // COOKIE_PASSWORD! ---> ! 붙이는 이유는 환경변수에서 가져와야하는데 undefined 일 수 있기때문에 !를 붙여서 무조건 값이 있다고 타입 설정을 해둔다.
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
