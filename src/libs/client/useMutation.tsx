import { type } from "os";
import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  //   const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState<undefined | any>(undefined);
  //   const [error, setError] = useState<undefined | any>(undefined);
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" || "text/html",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {})) // response 에 에러가 없으면 catch의 에러는 보이지 않는다.
      .then((data) => setState((prev) => ({ ...prev, data, loading: false }))) // .then((json)=> setData(json)) 과 같음 (축약)
      .catch((error) =>
        setState((prev) => ({ ...prev, error, loading: false }))
      )
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
