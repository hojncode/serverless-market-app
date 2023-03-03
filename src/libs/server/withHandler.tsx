import { AnyARecord } from "dns";
import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";
interface ConfigType {
  method: method[];
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

    // method가 일치 하지 않을때.
    if (req.method && !method.includes(req.method as any)) {
      return res.status(405).end();
    }
    // 세션값이 false (로그인되지 않았을때)
    if (isPrivate && !req.session.user) {
      return res
        .status(401)
        .json({ ok: false, error: "Error!!! Login ,Please" });
    }
    try {
      await handler(req, res);
      // console.log("hahahahah: this message is from `withHandler.tsx`");
    } catch (error) {
      // console.log("catch-error", error);
      return res.status(500).json({ error: "catch error" });
    }
  };
}
