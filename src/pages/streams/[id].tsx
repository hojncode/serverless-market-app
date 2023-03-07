import Layout from "@/components/layout";
import Message from "@/components/message";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { Stream } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}
interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}
interface StreamResponse {
  ok: true;
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const StreamS: NextPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const { data, mutate } = useSWR<StreamResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null,
    {
      refreshInterval: 1000, // 현재 상태에서는 serverless와 next.js만 사용중이기때문에 실시간 채팅이 아니다 따라서, refreshInterval를 추가하여 1초마다 갱신되는 데이터값을 가져와서 실시간 처럼 보이게한다.
    }
  );
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(
    `/api/streams/${router.query.id}/messages`
  );
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          stream: {
            ...prev.stream,
            messages: [
              ...prev.stream.messages,
              {
                id: Date.now(),
                message: form.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    );
    sendMessage(form); // 최종적으로 입력한 메세지를 실제 db에 저장함.
  };
  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  });
  return (
    <Layout canGoBack>
      <div className="space-y-4 py-10  px-4">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.stream?.name}
          </h1>
          <span className="mt-3 block text-2xl text-gray-900">
            ₩{data?.stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="h-[50vh] space-y-4 overflow-y-scroll py-10  px-4 pb-16">
            {data?.stream.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reversed={message.user.id === user?.id} // user?.id는 useUser에서 오는 것.message.user.id가 현재 내가 작성한 메세지의 내 아이디값이기 때문에 따라서 내가 쓴 메세지는 화면 오른쪽에 붙는다.
              />
            ))}
            <div ref={scrollRef} />
          </div>
          <div className="fixed inset-x-0 bottom-0  bg-white py-2">
            <form
              onSubmit={handleSubmit(onValid)}
              className="relative mx-auto flex w-full  max-w-md items-center"
            >
              <input
                {...register("message", { required: true })}
                type="text"
                className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StreamS;

// legacy ===
// import type { NextPage } from "next";

// const LiveDetail: NextPage = () => {
//   return (
//     <div className="space-y-4 py-10 px-4">
//       <div className="aspect-video w-full rounded-md bg-slate-300 shadow-md" />
//       <h3 className=" mt-2 text-2xl font-semibold text-gray-800 ">
//         Let`s try market
//       </h3>
//       <div className="mt-10 h-[50vh] space-y-4 overflow-y-scroll  py-16 px-4">
//         {/* {메세지들} */}
//         <div className="flex items-start space-x-2">
//           <div className="h-8 w-8 rounded-full bg-slate-500" />
//           <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
//             <p>Hi how much are you selling them for?</p>
//           </div>
//         </div>
//         <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
//           <div className="h-8 w-8 rounded-full bg-slate-500" />
//           <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
//             <p> I want ￦20,000</p>
//           </div>
//         </div>

//         <div className="flex items-start space-x-2">
//           <div className="h-8 w-8 rounded-full bg-slate-500" />
//           <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
//             <p>Hi how much are you selling them for?</p>
//           </div>
//         </div>
//         <div className="flex flex-row-reverse items-start space-x-2 space-x-reverse">
//           <div className="h-8 w-8 rounded-full bg-slate-500" />
//           <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
//             <p> I want ￦20,000</p>
//           </div>
//         </div>
//       </div>
//       <div className="fixed inset-x-0 bottom-2  mx-auto w-full max-w-md">
//         {/*left-0 right-0 는 inset-x-0 과 같다. - 중앙 정렬을 하는 방법.*/}
//         <div className="relative flex items-center">
//           <input
//             type="text"
//             className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
//           />
//           <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
//             <button className="flex cursor-pointer items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
//               &rarr;
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveDetail;
