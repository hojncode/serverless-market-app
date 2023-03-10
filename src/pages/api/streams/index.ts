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
  } = req;
  console.log("price!!!", typeof price);

  let page =
    req.query.page && req.query.page !== undefined ? +req.query?.page : 1;
  let skip: number = (page - 1) * 10;
  if (!skip) {
    skip = 1;
  }
  const rowCnt = await client.stream.count({
    select: {
      _all: true,
    },
  });

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
    const streams = await client.stream.findMany({
      take: 10,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json({ ok: true, streams, rowCnt });
  }
}

export default withApiSession(
  withHandler({
    method: ["GET", "POST"],
    handler,
  })
);
