import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";
import Pagination from "@/components/pagination";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
  rowCnt: {
    _all: number;
  };
}

const Streams: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>();
  const { data } = useSWR<StreamsResponse>(`/api/streams?page=${page}`);
  useEffect(() => {
    console.log("rendering check");
    if (router?.query?.page) {
      setPage(Number(router?.query?.page.toString()));
    }
  }, [page, router]);
  console.log("data!!!!!!!!!", data);
  return (
    <Layout hasTabBar title="라이브">
      <div className="space-y-4 divide-y-[1px]">
        {data?.streams?.map((stream) => (
          <Link legacyBehavior key={stream.id} href={`/streams/${stream.id}`}>
            <a className="block px-4 pt-4">
              {/* Thumbnail */}
              <div className="relative aspect-video w-full rounded-md  bg-slate-300 shadow-sm">
                <Image
                  className="absolute rounded-md bg-orange-500"
                  fill
                  src={``}
                  // src={`https://${stream.cloudflareId}.cloudflarestream.com/${stream.cloudflareUrl}/thumbnails/thumbnail.jpg?time=1s&height=270`}
                  alt=""
                />
              </div>
              <h1 className="mt-2 text-2xl font-bold text-gray-900">
                {stream.name}
              </h1>
            </a>
          </Link>
        ))}
        <Pagination nowPage={page} dataSize={data?.rowCnt?._all!} />
        <FloatingButton href="/streams/create">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Streams;
