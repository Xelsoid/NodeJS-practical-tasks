import { randomUUID } from "crypto";
import { CartItemEntity } from "../schemas/cart.entity";
import { deleteCart, findActiveCart } from "../repositories/cart.repository";
import { getProductById } from "../repositories/product.repository";

const getCartItem = (cartItems, productId, cartId) => cartItems.find(({productId: pId, cartId: cId}) =>
  productId === pId && cartId === cId
);

export const calcCartTotal = (cartItems: CartItemEntity[] = []) =>
  cartItems?.reduce((acc, cartItem) => acc + cartItem.product.price * cartItem.count, 0);


export const getUserCartData = async (currentUserId: string) => {
  const currentCart = await findActiveCart(currentUserId);
  return currentCart;
};


export const updateUserCart = async (
  currentUserId: string,
  product: { productId: string; count: number },
) => {
  const {productId, count} = product;
  const isProductExists = await getProductById(productId);
  const activeCart = await findActiveCart(currentUserId);

  if(!activeCart || !isProductExists) return null;

  const cartItems = await activeCart.getCartItems();
  const currentCartItem = getCartItem(cartItems, productId, activeCart.id);

  if(currentCartItem) {
    currentCartItem.count = count;
    await currentCartItem.save();
  } else {
    await activeCart.createCartItem({
      id: randomUUID(),
      cartId: activeCart.id,
      productId,
      count
    });
  }

  await activeCart.reload();
  return activeCart;
};

export const deleteUserCart = (currentUserId: string) =>
  deleteCart(currentUserId);
