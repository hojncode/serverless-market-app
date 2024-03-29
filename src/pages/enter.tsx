import Button from "@/components/button";
import Input from "@/components/input";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
interface EnterForm {
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
}

export default function Enter() {
  const [enter, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/enter");
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirm");
  const { register, watch, handleSubmit, reset } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();
  const [method, setMethod] = useState<"email" | "phone">("email");
  // const { data: tdd, isValidating } = useSWR(`api/users/confirm`);
  // // console.log("tdd", tdd);
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };

  const onValid = (onValidForm: EnterForm) => {
    if (loading) return;
    console.log("NOW~!~!~!~!");
    enter(onValidForm);
    // fetch("/api/users/enter", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // }).then(() => {
    //   setSubmitting(false);
    // });
  };

  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
    console.log("validForm!!", validForm, tokenLoading);
  };
  /** useRouter */
  const router = useRouter();

  /** useEffect */
  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
      console.log("쿠키저장됨");
    }
    return;
  }, [tokenData, router]);
  // useEffect(() => {
  //   if (tdd?.checkCookie) {
  //     router.push("/");
  //   } else return;
  // }, [tdd, router, isValidating]);

  return (
    <div className="mt-16 px-4">
      <h3 className="text-center text-3xl font-bold">Login</h3>
      <div className="mt-8">
        {data?.ok ? (
          <form
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className="mt-8 flex flex-col space-y-4"
          >
            <Input
              register={tokenRegister("token", {
                required: true,
              })} // 여기에 이것을 추가할 수 있는 이유는, Input 컴포넌트에 `[key: string]: any;` 을 넣어주었기에 가능하다.
              name="token"
              label="Confirmation Token"
              type="number"
              required
            />

            <Button text={loading ? "Loading" : "Confirm Token"} />
          </form>
        ) : (
          <>
            {/* div */}
            <div className="flex flex-col items-center">
              <h5 className="text-sm font-medium text-gray-500">
                Choose Eamil or Phone
              </h5>
              <div className="mt-8 grid w-full grid-cols-2 gap-16 border-b">
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "email"
                      ? "  border-orange-500 text-orange-400"
                      : "border-transparent text-gray-500"
                  )}
                  // 위에 처럼 클래스 명을 join 을 이용해서 깔끔하게 입력할 수 있다.
                  //   className={` "pb-4 font-medium" ${
                  //     method === "email"
                  //       ? "border-b-2  border-orange-500 text-orange-400"
                  //       : ""
                  //   }`}

                  onClick={onEmailClick}
                >
                  Email
                </button>
                <button
                  className={cls(
                    "border-b-2 pb-4 font-medium",
                    method === "phone"
                      ? "  border-orange-500 text-orange-400"
                      : "border-transparent text-gray-500"
                  )}
                  onClick={onPhoneClick}
                >
                  Phone
                </button>
              </div>
            </div>
            {/* form */}
            <form
              onSubmit={handleSubmit(onValid)}
              className="mt-8 flex flex-col space-y-4"
            >
              {method === "email" ? (
                <Input
                  register={register("email", {
                    required: true,
                  })} // 여기에 이것을 추가할 수 있는 이유는, Input 컴포넌트에 `[key: string]: any;` 을 넣어주었기에 가능하다.
                  name="email"
                  label="Email address"
                  type="email"
                  required
                />
              ) : null}
              {method === "phone" ? (
                <Input
                  register={register("phone")}
                  name="phone"
                  label="Phone number"
                  type="number"
                  kind="phone"
                  required
                />
              ) : null}
              {method === "email" ? (
                <Button text={loading ? "Loading..." : "Get login link"} />
              ) : null}
              {method === "phone" ? (
                <Button text={loading ? "Loading" : "Get one-time password"} />
              ) : null}
            </form>
          </>
        )}

        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center text-sm text-gray-500">
              <span className=" bg-white">Or enter with</span>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
