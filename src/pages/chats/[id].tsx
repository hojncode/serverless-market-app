import ChatMessage from "@/components/chat-message";
import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { register } from "ts-node";
import products from "../api/products";

interface ProductChatMsg {
  id: number;
  chatMessage: string;
  user: {
    avatar?: string;
    id: number;
  };
}
interface ProductWithChat extends Product {
  chat: ProductChatMsg[];
}
interface ProductResponse {
  ok: true;
  product: ProductWithChat;
  isLiked?: Boolean;
  relatedProducts?: [];
}
interface ChatMsgForm {
  inputMessage: string;
}

const ChatDetail: NextPage = () => {
  const { register, handleSubmit, reset } = useForm<ChatMsgForm>();
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<ProductResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null,
    { revalidateOnFocus: false }
  );
  console.log(data);
  const [sendChatMsg, { loading }] = useMutation(
    `/api/chats/${router.query.id}/chatmsg`
  );

  const onValid = (form: ChatMsgForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          product: {
            ...prev.product,
            chat: [
              ...prev.product.chat,
              {
                id: Date.now(),
                chatMessage: form.inputMessage,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false // false 를 추가해야 메세지 입력후 바로 화면에 출력된다.
    );
    sendChatMsg(form);
  };

  return (
    <Layout canGoBack title="Steve">
      <div className="space-y-4 py-10 px-4 pb-16">
        {data?.product?.chat.map((chatMsg) => (
          <ChatMessage
            key={chatMsg.id}
            message={chatMsg.chatMessage}
            reversed={chatMsg.user.id === user?.id}
            avatarUrl={chatMsg.user.avatar}
          />
        ))}
        <form
          onSubmit={handleSubmit(onValid)}
          className="fixed inset-x-0 bottom-0  bg-white py-2"
        >
          <div className="relative mx-auto flex w-full  max-w-md items-center">
            <input
              {...register("inputMessage", { required: true })}
              type="text"
              className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
