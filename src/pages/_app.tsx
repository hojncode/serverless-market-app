import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto w-full max-w-lg">
      {/* max-w-lg 는 모바일 사이즈 고정 시킴. (반응형) */}
      <Component {...pageProps} />
    </div>
  );
}
