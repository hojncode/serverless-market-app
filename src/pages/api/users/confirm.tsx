import { withIronSessionApiRoute } from "iron-session/next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // console.log("req.session!!", req.session);
  const { token } = req.body;
  console.log("token!!", token);
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true },
  });
  // if (!exists) res.status(404).end();
  // console.log("exists!!", exists);
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();
  res.status(200).end();
}
export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsession",
  password: "0980008801230323122301fdfefafsdafsafsadfs",
}); // 첫번째 인자에 들어가는 값에따라 , 두번째 인자에 들어가는 함수에서 설정한 값의 페이지로 이동시킬 수 있다. (여기서는 , handler 에서 요청이 Post 이면 api/user/enter 접속시에 405 에러 페이지로 보내도록 설정함)
