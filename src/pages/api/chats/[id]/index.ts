import { User } from "@prisma/client";
import { Stream } from ".prisma/client";
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
    body,
    session: { user },
  } = req;

  if (req.method === "GET") {
    const chats = await client.chat.findUnique({
      where: {
        id: Number(id),
      },
      //   include: {
      //     products: {
      //       select: {
      //         id: true,
      //         chat: true,
      //         user: {
      //           select: {
      //             avatar: true,
      //             id: true,
      //           },
      //         },
      //       },
      //     },
      //   },
    });

    res.json({ ok: true, chats });
  }
}

export default withApiSession(
  withHandler({
    method: ["POST", "GET"],
    handler,
  })
);
