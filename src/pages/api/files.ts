import { Post } from "@prisma/client";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //     curl -X POST \
  //   "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/images/v1" \
  //   -H "Authorization: Bearer <API_TOKEN>" \
  //   -F file=@./<YOUR_IMAGE.IMG>

  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_FLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUD_FLARE_TOKEN}`,
        },
      }
    )
  ).json();
  console.log("response!!!", response);
  res.json({
    ok: true,
    ...response.result,
  });
}

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
