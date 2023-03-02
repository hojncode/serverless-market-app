import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("req.session.user!!!", req.session.user);

  const {
    session: { user },
  } = req;

  const favs = await client.fav.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });

  res.json({
    ok: true,
    favs,
  });
}
export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
