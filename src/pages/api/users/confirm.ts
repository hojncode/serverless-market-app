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
  console.log("token!!", token);
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { user: true },
  });
  if (!foundToken) return res.status(404).end();
  // console.log("foundToken!!", foundToken);
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
}

export default withApiSession(
  withHandler({ method: ["POST"], handler, isPrivate: false })
);
