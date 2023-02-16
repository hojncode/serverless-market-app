import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("(/api/products/[id])!!!", req.query); // 프론트에 router.query가 있는것처럼 , 여기 백에도 req.query 가 있다.
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      id: Number(id), // +id.toString() 으로 하면 타입 undefined로 오류가 나온다.
    },
    include: {
      // user 정보를 가져오기 위해 include를 사용.
      user: {
        select: {
          // select 사용으로 선택한 정보만 가져옴.
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  console.log("product!!!", product);
  res.json({ ok: true, product });
}
export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
