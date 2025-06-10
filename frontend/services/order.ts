import { OrderResponse } from "@/model/order";

export async function getOrders(params?: string): Promise<OrderResponse | any> {
  try {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_API_URL}/orders?${params}`
    );
    if (!request.ok) {
      const error = request;
      throw error;
    }
    const response = await request.json();
    return response as OrderResponse;
  } catch (error) {
    throw error;
  }
}
