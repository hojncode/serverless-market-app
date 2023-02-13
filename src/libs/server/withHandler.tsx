import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    // res.json({ hello: true });
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await fn(req, res);
      console.log("hahahahah: this message is req-get");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
