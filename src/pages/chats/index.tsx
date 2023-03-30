import Layout from "@/components/layout";
import type { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

const Chats: NextPage = () => {
  const { data } = useSWR(`/api/products`);
  console.log("data", data);
  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] py-10 ">
        {data?.products.map((productChat: any) => (
          <Link
            legacyBehavior
            href={`/chats/${productChat.id}`}
            key={productChat.id}
          >
            <a
              className="bg-white-50 my-2 flex cursor-pointer items-center space-x-3 px-4 py-3" //last:border-b-0 대신 divide 사용 - 마지막 div에 border 없애기
            >
              <div className="bg-white-300 h-10  w-10">
                <img
                  className="h-10 w-10 object-contain"
                  src={`https://imagedelivery.net/TdG7TK877WEVMND6U9bQvA/${productChat.image}/public`}
                />
              </div>
              <div>
                <p className=" text-gray-700">{productChat.name}</p>
                <p className="text-sm  text-gray-500">
                  {productChat.description}
                </p>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
