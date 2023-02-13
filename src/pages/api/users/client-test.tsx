import client from "@/libs/server/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  client.user.create({
    data: {
      email: "hi",
      name: "hi2",
    },
  });
  res.json({
    ok: true,
  });
}
