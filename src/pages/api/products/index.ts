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
    body: { name, price, description },
    session: { user },
  } = req;
  /** 축약할 수 있다. 위 방법과 같다  */
  //   const { name, price, description } = req.body;
  //   const { user } = req.session;

  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "xx",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    ok: true,
    product,
  });
}
export default withApiSession(withHandler({ method: "POST", handler }));
