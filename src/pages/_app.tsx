import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 1500,
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="mx-auto w-full max-w-xl">
        {/* max-w-lg 는 모바일 사이즈 고정 시킴. (반응형) */}
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
