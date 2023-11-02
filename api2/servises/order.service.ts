import { findOrderById } from "../repositories/order.repository";

export const createNewOrder = (currentUserId: string) =>
  findOrderById(currentUserId);
