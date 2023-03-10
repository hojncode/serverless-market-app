import { Stream } from "./../../../../node_modules/.prisma/client/index.d";
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
    body: { name, price, description },
    query: { page },
  } = req;
  console.log("price!!!", typeof price);

  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price: +price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      stream,
    });
  } else if (req.method === "GET") {
    const streamCount = await client.stream.count();
    const streams = await client.stream.findMany({
      take: 10,
      skip: (+page! - 1) * 10,
    });
    res.json({ ok: true, streams, pages: Math.ceil(streamCount / 10) });
  }
}

export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    handler,
  })
);
