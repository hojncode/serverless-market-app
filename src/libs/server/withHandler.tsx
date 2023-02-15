import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: "GET" | "POST" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  method,
  isPrivate = true,
  handler,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> /** { : Promise<any> } "confirm.tsx 의 withHandler("POST", handler) 가 에러 날 경우 넣어 줄것." */ {
    // res.json({ hello: true });
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res
        .status(401)
        .json({ ok: false, error: "Error!!! Login ,Please" });
    }
    try {
      await handler(req, res);
      console.log("hahahahah: this message is from `withHandler.tsx`");
    } catch (error) {
      console.log("catch-error", error);
      return res.status(500).json({ error: "catch error" });
    }
  };
}
