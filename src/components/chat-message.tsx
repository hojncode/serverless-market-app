import { cls } from "../libs/client/utils";
import useSWR from "swr";
import useUser from "@/libs/client/useUser";
interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function ChatMessage({
  message,
  avatarUrl,
  reversed,
}: MessageProps) {
  const { user } = useUser();
  // console.log("useresra21313", user);
  return (
    <div
      className={cls(
        "flex  items-start",
        reversed ? "flex-row-reverse space-x-reverse" : "space-x-2"
      )}
    >
      <div className="mx-2 h-8 w-8 rounded-full bg-slate-400">
        <img
          src={`https://imagedelivery.net/TdG7TK877WEVMND6U9bQvA/${user?.avatar}/avatar`}
        />
      </div>
      <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
        <p>{message}</p>
      </div>
    </div>
  );
}
