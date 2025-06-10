import { Order, ReviewState } from "@/model/order";
import { updateOrder } from "./order";

export default async function handleReviewBulkUpdate(
  orders: Order[],
  reviewState: ReviewState
) {
  const newOrders = orders.map((order) => {
    return {
      ...order,
      products: order.products?.map((product) => product.id),
      reviewState: reviewState,
    };
  });

  try {
    await Promise.all(newOrders.map((order) => updateOrder(order.id, order)));
  } catch (error) {
    throw Error;
  }
}
