import { order } from "../data/order";

export const findOrderById = (currentUserId: string) => {
  return order.find(({ userId }) => userId === currentUserId) || null;
};
