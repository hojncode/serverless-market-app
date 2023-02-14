import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest, //!!!!! req 의 인코딩 기준으로 인코딩 된다. 많은 next.js 개발자들이 놓치는 부분이다.
  res: NextApiResponse
) {
  const { phone, email } = req.body; //? phone 에 Int 최댓값(2147483647)보다 크게 입력하면 오류가 발생한다.

  /**방법 3. payload 로 정리. */
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "Anonymous",
      ...payload,
    },
    update: {},
  });
  console.log(user);

  /**방법 2. Es6 문법으로 정리. */
  // const user = await client.user.upsert({
  //   where: {
  //     ...(phone ? { phone: +phone } : {}),
  //     ...(email ? { email } : {}),
  //     // && 사용시.
  //     // ...(phone && { phone: +phone }),
  //     // ...(phone && { email }),
  //   },
  //   create: {
  //     name: "Anonymous",
  //     ...(phone ? { phone: +phone } : {}),
  //     ...(email ? { email } : {}),
  //   },
  //   update: {},
  // });
  // console.log(user);

  /**방법 1. {if 문으로 작성.} */
  // let user;
  // if (phone) {
  //   user = await client.user.upsert({
  //     where: {
  //       phone: +phone,
  //     },
  //     create: {
  //       name: "Anonymouse",
  //       phone: +phone,
  //     },
  //     update: {},
  //   });
  // } else if (email) {
  //   user = await client.user.upsert({
  //     where: {
  //       email,
  //     },
  //     create: {
  //       name: "Anonymouse",
  //       email,
  //     },
  //     update: {},
  //   });
  // }

  /**{legacy} */
  // if (email) {
  //   user = await client.user.findUnique({
  //     where: {
  //       email,
  //     },
  //   });
  //   if (user) console.log("found it.");
  //   if (!user) {
  //     console.log("Did not find. Will create.");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         email,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }
  // if (phone) {
  //   user = await client.user.findUnique({
  //     where: {
  //       phone: +phone,
  //     },
  //   });
  //   if (user) console.log("found it.");
  //   if (!user) {
  //     console.log("Did not find. Will create.");
  //     user = await client.user.create({
  //       data: {
  //         name: "Anonymous",
  //         phone: +phone,
  //       },
  //     });
  //   }
  //   console.log(user);
  // }

  console.log("req", req.body); // FrontEnd 에서 (여기서 enter.jsx) headers를 추가 해주어야 .email 을 BackEnd 에서 받을 수 있다.(headers 입력 안할 시, req.body 까지만 백에서 받을 수 있다)
  return res.status(200).end(); //  == res.json({ ok: true });
}

export default withHandler("POST", handler); // 첫번째 인자에 들어가는 값에따라 , 두번째 인자에 들어가는 함수에서 설정한 값의 페이지로 이동시킬 수 있다. (여기서는 , handler 에서 요청이 Post 이면 api/user/enter 접속시에 405 에러 페이지로 보내도록 설정함)
