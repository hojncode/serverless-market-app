import Layout from "@/components/layout";
import type { NextPage } from "next";
import Link from "next/link";

const Chats: NextPage = () => {
  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] py-10">
        {[...Array(7)].map((_, i) => (
          <Link legacyBehavior href={`/chats/${i}`} key={i}>
            <a
              className="flex cursor-pointer items-center space-x-3 px-4 py-3" //last:border-b-0 대신 divide 사용 - 마지막 div에 border 없애기
            >
              <div className="h-10 w-10 rounded-full bg-slate-300" />
              <div>
                <p className=" text-gray-700">Steve Jebs</p>
                <p className="text-sm  text-gray-500">
                  See you tomorrow in the corner at 2pm~
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
