import { withIronSessionApiRoute } from "iron-session/next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.session.user);
  //   const profile = JSON.stringify(
  //     await client.user.findUnique({
  //       where: { id: req.session.user?.id },
  //     })
  //   );
  //   console.log(profile);
  //   //   res.status(200).end();

  //   const updatedData = JSON.stringify(profile, (_key, value) => {
  //     typeof value === "bigint" ? (value = value.toString()) : value.toString();
  //   });

  res.json({
    ok: true,
  });
}

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotsession",
  password: "0980008801230323122301fdfefafsdafsafsadfs",
}); // 첫번째 인자에 들어가는 값에따라 , 두번째 인자에 들어가는 함수에서 설정한 값의 페이지로 이동시킬 수 있다. (여기서는 , handler 에서 요청이 Post 이면 api/user/enter 접속시에 405 에러 페이지로 보내도록 설정함)
