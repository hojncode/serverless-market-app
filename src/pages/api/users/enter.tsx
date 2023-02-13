import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest, //!!!!! req 의 인코딩 기준으로 인코딩 된다. 많은 next.js 개발자들이 놓치는 부분이다.
  res: NextApiResponse
) {
  console.log(req.body); // FrontEnd 에서 (여기서 enter.jsx) headers를 추가 해주어야 .email 을 BackEnd 에서 받을 수 있다.(headers 입력 안할 시, req.body 까지만 백에서 받을 수 있다)
  return res.status(200).end(); //  == res.json({ ok: true });
}

export default withHandler("POST", handler); // 첫번째 인자에 들어가는 값에따라 , 두번째 인자에 들어가는 함수에서 설정한 값의 페이지로 이동시킬 수 있다. (여기서는 , handler 에서 요청이 Post 이면 api/user/enter 접속시에 405 에러 페이지로 보내도록 설정함)
