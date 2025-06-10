import { Order } from "@/model/order";
import { updateOrder } from "./order";

type ReviewStateOptions = "A" | "R" | "P";

export default async function handleReviewBulkUpdate(
  orders: Order[]
  //   reviewState: ReviewStateOptions
) {
  const newOrders = orders.map((order) => {
    return {
      ...order,
      //   reviewState: reviewState,
      products: order.products?.map((product) => product.id),
    };
  });

  try {
    await Promise.all(newOrders.map((order) => updateOrder(order.id, order)));
  } catch (error) {
    throw Error;
  }
}
