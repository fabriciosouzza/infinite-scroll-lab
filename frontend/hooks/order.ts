import { Order, OrderResponse } from "@/model/order";
import { QueryParams, TParams } from "@/model/query";
import { getOrders } from "@/services/order";
import useSWR from "swr";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

export function useOrders({
  query = [],
  order = [],
  pagination = [],
}: QueryParams) {
  const allParams: TParams = query.concat(order, pagination);

  const aggregatedParams = new URLSearchParams(allParams).toString();

  const cacheKey = `/api/orders?${aggregatedParams}`;
  const { data, error, isLoading, mutate } = useSWR<OrderResponse | any>(
    cacheKey,
    () => getOrders(aggregatedParams)
  );
  return {
    data,
    isLoading,
    error,
    mutate,
    cacheKey,
  };
}

export function useOrdersInfinite() {
  const getKey: SWRInfiniteKeyLoader = (
    pageIndex,
    previousPageData: OrderResponse | null
  ) => {
    if (previousPageData && !previousPageData.meta.hasNextPage) {
      return null;
    }

    const paginationParams: TParams = [
      ["page", `${pageIndex + 1}`],
      ["page_size", `${50}`],
    ];

    const allParams = new URLSearchParams(paginationParams).toString();

    return `/api/orders?${allParams}`;
  };

  const fetcher = (url: string) => {
    const params = url.split("?")[1] || "";
    return getOrders(params);
  };

  const { data, error, isLoading, size, setSize, mutate } =
    useSWRInfinite<OrderResponse>(getKey, fetcher, {
      revalidateFirstPage: false,
    });

  const orders: Order[] = data ? data.flatMap((page) => page.data) : [];

  const isFetchingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const hasNextPage = data && data[data.length - 1]?.meta?.hasNextPage === true;

  const loadMore = () => {
    if (!isFetchingMore && hasNextPage) {
      setSize(size + 1);
    }
  };

  return {
    orders,
    error,
    isLoading,
    isFetchingMore,
    hasNextPage,
    loadMore,
    mutate,
  };
}
