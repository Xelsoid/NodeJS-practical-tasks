import { findOrderById } from "../repositories/order.repository";
import { calcCartTotal } from "./cart.service";

const normalizeOrderData = (orderData) => {
  const { id, order } = orderData;
  const { payment, delivery, cart } =order;
  const { cartItems } = cart;
  const items = cartItems?.map((cartItem) => {
    const { product, count } = cartItem;
    return {
      product,
      count
    };
  });

  const cartTotal = calcCartTotal(items);

  return {
    "id": id,
    "userId": order.userId,
    "cartId": cart.id,
    "items": items,
    "payment": {
      "type": payment.type,
      "address": payment.address,
      "creditCard": payment.creditCard,
    },
    "delivery": {
      "type": delivery.type,
      "address": delivery.address,
    },
    "comments": order.comments,
    "status": order.status,
    "total": cartTotal
  };
};

export const createNewOrder = async (currentUserId: string) => {
  const cart = await findOrderById(currentUserId);
  const orderData = cart.toJSON();
  return normalizeOrderData(orderData);
};
