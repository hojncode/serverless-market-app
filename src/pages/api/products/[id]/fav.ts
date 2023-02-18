//! 페이지 생성 이유: "/[id]/fav 로 url 을 보내기 위해 만듬. ""

import withHandler from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import client from "@/libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: Number(id),
      userId: user?.id,
    },
  }); // findFirst 는 findUnique 보다 넓은 조건으로 검색한다.(findUnique는 unique 키만 검색할 수 있다.)
  if (alreadyExists) {
    //삭제하고,
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    // 생성한다.
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  })
);

// 코드 전략
// 1. 데이터가 이미 db 에 존재하는지 확인.
// 2. 존재하지 않는다면 데이터를 새롭게 생성.
