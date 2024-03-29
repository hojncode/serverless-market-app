import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import { dbNow } from "@/libs/server/timezone";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("req.session.user!!!", req.session.user);

  if (req.method === "GET") {
    const products = await client.product.findMany({
      //findMany 모든 데이터를 가져온다.
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      products,
    });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description, photoId },
      session: { user },
    } = req;
    console.log("에러어디냐!", photoId);
    /** 축약할 수 있다. 위 방법과 같다  */
    //   const { name, price, description } = req.body;
    //   const { user } = req.session;

    const now = dbNow();

    const product = await client.product.create({
      data: {
        createdAt: now,
        name,
        price: +price,
        description,
        image: photoId,
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
}
export default withApiSession(
  withHandler({ method: ["POST", "GET"], handler })
);
