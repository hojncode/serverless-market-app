import { User } from "@prisma/client";
import { Stream } from "./../../../../node_modules/.prisma/client/index.d";
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
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: Number(id),
    },
  });

  res.json({ ok: true, stream });
}

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
