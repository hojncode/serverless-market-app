import { ProductWithCount } from "@/pages";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          image={record.product.image}
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          comments={1}
          hearts={record.product._count.favs}
        />
      ))}
    </>
  ) : null;
}
