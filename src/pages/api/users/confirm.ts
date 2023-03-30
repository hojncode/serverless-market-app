import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("req.session!!여기 세션이다!!!!", req.session);
  const { token } = req.body;
  const { cookies } = req;
  console.log("api/users/confirm/token!!", token);
  // res.setHeader("Content-Type", "text/html");
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
      // admin: true,
    };
    // res.setHeader("Content-Type", "text/html");
    await req.session.save();
    await client.token.deleteMany({
      where: {
        userId: foundToken.userId,
      },
    });
    // res.status(200).end();
    res.json({ ok: true });

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
  // res.setHeader("Content-Type", "text/html");

  res.json({ ok: true, checkCookie });
}

export default withApiSession(
  withHandler({ method: ["POST"], handler, isPrivate: false })
);
