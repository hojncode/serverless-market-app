//seed 는 가짜 데이터 를 만들어준다.
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(5).keys())].forEach(async (item) => {
    await client.stream.create({
      data: {
        cloudflareId: "uid",
        cloudflareUrl: "url",
        cloudflareKey: "streamKey",
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
    console.log(`${item}/5`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
