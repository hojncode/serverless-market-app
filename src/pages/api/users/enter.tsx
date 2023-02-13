import client from "@/libs/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest, //!!!!! req 의 인코딩 기준으로 인코딩 된다. 많은 next.js 개발자들이 놓치는 부분이다.
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(401).end();
  }
  console.log(req.body.email); // FrontEnd 에서 (여기서는 enter.jsx) headers를 추가 해주어야 .email 을 BackEnd 에서 받을 수 있다.(headers 입력 안할 시, req.body 까지만 백에서 받을 수 있다)
  res.status(200).end();
}
