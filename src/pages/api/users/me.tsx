import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("req.session.user!!!", req.session.user);

  //   if (!req.session.user) {
  //     res.json({ ok: true });
  //   }

  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  console.log(profile);
  //   res.status(200).end();
  res.json({
    ok: true,
    profile,
  });
}
export default withApiSession(withHandler({ method: ["GET"], handler }));
