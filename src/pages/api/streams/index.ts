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

  if (req.method === "POST") {
    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_FLARE_STREAM_API_TOKEN}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CLOUD_FLARE_TOKEN}`,
          },
          body: `{"meta": {"name":${name}},"recording": { "mode": "automatic","timeoutSeconds": 10 }}`,
        }
      )
    ).json();
    console.log("streams/response!!!", { uid, rtmps: { streamKey, url } });
    const stream = await client.stream.create({
      data: {
        cloudflareId: "uid",
        cloudflareUrl: "url",
        cloudflareKey: "streamKey",
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
    let page =
      req.query.page && req.query.page !== undefined ? +req.query?.page : 1;
    let skip: number = (page - 1) * 10 + 1;
    if (!skip) {
      skip = 1;
    }
    const rowCnt = await client.stream.count({
      select: {
        _all: true,
      },
    });
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
