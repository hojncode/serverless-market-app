import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiResponse, NextApiRequest } from "next";
import client from "@/libs/server/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body,
    query: { id },
    session: { user },
  } = req;
  console.log(body);

  const chatMsg = await client.chat.create({
    data: {
      chatMessage: body.inputMessage,
      user: {
        connect: {
          id: user?.id,
        },
      },
      products: {
        connect: {
          id: Number(id),
        },
      },
    },
  });

  res.json({ ok: true, chatMsg });
}

export default withApiSession(
  withHandler({
    method: ["POST"],
    handler,
  })
);
