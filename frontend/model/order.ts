import { BaseHookResponse } from "./hook";
import { ApiBaseResponseFormat } from "./responseFormat";

export enum ReviewState {
  APPROVED = "A",
  REJECTED = "R",
  PENDING = "P",
}

interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  reviewState: ReviewState;
  status: boolean;
  products?: {
    id: number;
    name: string;
    description: string;
    status: boolean;
  }[];
}

export type OrderResponse = ApiBaseResponseFormat<Order>;

export type OrderHookType = BaseHookResponse<OrderResponse>;
