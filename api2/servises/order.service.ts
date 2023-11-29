import { findActiveCart } from "../repositories/cart.repository";

export const createNewOrder = async (currentUserId: string) => {
  const cart = await findActiveCart(currentUserId);
  console.log(cart.toJSON());

  return cart;
};
