import { Order, OrderResponse } from "@/model/order";

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

export async function updateOrder(
  id: number,
  payload: Omit<Order, "products"> & {
    products?: number[];
  }
): Promise<Order> {
  try {
    const request = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_API_URL}/orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!request.ok) {
      const error = await request.json();
      throw error;
    }
    const response = await request.json();
    return response as Order;
  } catch (error) {
    throw error;
  }
}
