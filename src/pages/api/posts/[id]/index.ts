import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  console.log("req!!!");
  const post = await client.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          answer: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wondering: true,
        },
      },
    },
  });
  console.log("post!!!", post);

  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: Number(id),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  if (!post) {
    res.status(404).end();
  } //:::::이 구문을 만들어줘서 post 의 존재가 없으면 에러페이지를 띄워줘야한다(유저를 믿지마라...) //? 미완성.-> 프론트페이지에서는 어떻게 에러페이지를 띄워야하는지 ? 여기서는 백엔드에서만 404 페이지 연결됨.

  res.json({
    ok: true,
    post,
    isWondering,
  });
}

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
