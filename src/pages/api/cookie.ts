import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // console.log("req.session!!", req.session);
  const { token } = req.body;
  const { cookies } = req;
  let checkCookie = true;
  if (req.method === "POST") {
    if (Object.keys(cookies).length === 0) {
      !checkCookie;
      console.log("checkCookie!!", checkCookie);
      console.log("쿠키없어어");
    } else {
      console.log("쿠키있다!!");
      await req.session.destroy();
    }
  }
  res.json({ ok: true, checkCookie });
}

export default withApiSession(
  withHandler({ method: ["POST", "GET"], handler, isPrivate: false })
);
