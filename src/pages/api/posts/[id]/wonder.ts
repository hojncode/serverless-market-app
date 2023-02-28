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
  console.log("session!!!", user);

  const alreadyExists = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: Number(id),
    },
    select: {
      id: true,
    },
  });

  if (alreadyExists) {
    await client.wondering.delete({
      //delete 할 경우에는 무조건 unique 키를 사용해야한다.
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  })
);
