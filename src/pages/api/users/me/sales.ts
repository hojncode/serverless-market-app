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

  //TODO : enum 을 활용해서 아래 코드를 완성하기 -
  // client.record.findMany({
  //     where: {
  //         userId: user?.id,
  //         kind:""
  //     }
  // })

  const sales = await client.sale.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });

  res.json({
    ok: true,
    sales,
  });
}
export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
