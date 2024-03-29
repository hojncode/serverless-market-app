import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.session!!여기 세션이다!!!!", req.session);
  const { token } = req.body;
  const { cookies } = req;
  console.log("api/users/confirm/token!!", token);
  if (req.method === "POST") {
    const foundToken = await client.token.findUnique({
      where: {
        payload: token,
      },
      // include: { user: true },
    });
    if (!foundToken) return res.status(404).end();
    console.log("foundToken!!", foundToken);
    req.session.user = {
      id: foundToken.userId,
    };
    await req.session.save();
    await client.token.deleteMany({
      where: {
        userId: foundToken.userId,
      },
    });
    // res.status(200).end();
    res.json({ ok: true });
    return;

    // req.session.user = {
    //   id: 230,

    // };
    // await req.session.save();
  }

  let checkCookie = false;
  if (req.method === "GET") {
    if (Object.keys(cookies).length === 0) {
      console.log("쿠키없어어");
    } else {
      console.log("쿠키있다!!");
      checkCookie = true;
      // await req.session.destroy();
    }
  }

  res.json({ ok: true, checkCookie });
}

export default withApiSession(
  withHandler({ method: ["POST"], handler, isPrivate: false })
);
