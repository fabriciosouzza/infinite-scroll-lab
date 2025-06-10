import { OrderResponse } from "@/model/order";
import { QueryParams, TParams } from "@/model/query";
import { getOrders } from "@/services/order";
import useSWR from "swr";

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
