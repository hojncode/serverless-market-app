import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> /** { : Promise<any> } "confirm.tsx 의 withHandler("POST", handler) 가 에러 날 경우 넣어 줄것." */ {
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
