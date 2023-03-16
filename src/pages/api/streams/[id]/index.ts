import { User } from "@prisma/client";
import { Stream } from ".prisma/client";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              avatar: true,
              id: true,
            },
          },
        },
      },
    },
    // select: {
    //!   // include 대신 select 사용시 true 값 적용된 튜플만 가져온다 (include는 모든것을 가져오기때문에 웹 상에서 보여지기 때문에 보안상 안좋다)
    //   id: true,
    //   createdAt: true,
    //   updatedAt: true,
    //   name: true,
    //   description: true,
    //   price: true,
    //   userId: true,
    //   cloudflareId: true,
    //   messages: {
    //     select: {
    //       id: true,
    //       message: true,
    //       user: {
    //         select: {
    //           avatar: true,
    //           id: true,
    //         },
    //       },
    //     },
    //   },
    // },
  });

  const isOwner = stream?.userId === user?.id;
  // 현재 스트리밍 유저와 로그인 유저가 일치 하지 않을경우.
  if (stream && !isOwner) {
    stream.cloudflareKey = "error - not allowed user";
    stream.cloudflareUrl = "error - not allowed user";
  }

  // const ownedStream = await client.stream.findUnique({
  //   where: {
  //     id: Number(id),
  //   },
  //   include: {
  //     messages: {
  //       select: {
  //         id: true,
  //         message: true,
  //         user: {
  //           select: {
  //             avatar: true,
  //             id: true,
  //           },
  //         },
  //       },
  //     },
  //   },
  // });
  res.json({ ok: true, stream });
}

export default withApiSession(
  withHandler({
    method: ["GET"],
    handler,
  })
);
