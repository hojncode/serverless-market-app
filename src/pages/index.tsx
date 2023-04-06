import Layout from "../components/layout";
import type { NextPage } from "next";
import Item from "@/components/item";
import FloatingButton from "@/components/floating-button";
import useUser from "@/libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";

export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

interface ConfirmCookie {
  ok: boolean;
  checkCookie: boolean;
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");
  // const { mutate } = useSWR(`/api/users/logout`);
  // const { mutate } = useSWR<ConfirmCookie>(`/api/confirm`);
  const [sendLogout] = useMutation(`/api/cookie`);

  // const [cookies, setCookie, removeCookie] = useCookies([""]);
  // console.log("Home/data!!!", data);
  // console.log("Home/user!!!", user);
  // console.log("Home/isLoading!!!", isLoading);
  const onClickLogOut = (e: any) => {
    console.log("onClickLogOut");
    // mutate((prev) => prev && { ...prev, checkCookie: !prev.checkCookie });
    sendLogout({});
    // mutate(event);
    // sendLogout(event);
    // req.session.destroy();
  };

  return (
    <Layout hasTabBar title="홈">
      <Head>
        <title>홈:Home</title>
      </Head>
      {isLoading ? (
        "로딩중..."
      ) : (
        <div className="flex flex-col space-y-5 divide-y ">
          <form>
            <button onClick={onClickLogOut}>로그아웃</button>
          </form>
          {data?.products?.map((product) => (
            <Item
              image={product.image}
              id={product.id}
              key={product.id}
              title={product.name}
              price={product.price}
              comments={1} //?
              hearts={product._count.favs}
            />
          ))}
          <FloatingButton href="/products/upload">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </FloatingButton>
        </div>
      )}
    </Layout>
  );
};

export default Home;
