import { randomUUID } from "crypto";
import { CartItemEntity } from "../schemas/cart.entity";
import {
  findCartById,
  deleteCart,
  findCartsInDB,
} from "../repositories/cart.repository";
import {getProductById} from "../repositories/product.repository";

const getActiveCart = (carts) => carts?.carts?.find(({isDeleted}) => !isDeleted);

const getCartItem = (cartItems, productId, cartId) => cartItems.find(({productId: pId, cartId: cId}) =>
  productId === pId && cartId === cId
);

export const returnUserCartData = async (currentUserId: string) => {
  const currentCart = await findCartById(currentUserId);
  if (!currentCart) return null;

  const cart = { ...currentCart };
  delete cart?.userId;
  delete cart?.isDeleted;
  return cart;
};

export const returnCartTotal = (cartItems: CartItemEntity[] = []) =>
  cartItems?.reduce((acc, cartItem) => acc + cartItem.product.price * cartItem.count, 0);

export const updateUserCart = async (
  currentUserId: string,
  product: { productId: string; count: number },
) => {
  const {productId, count} = product;
  const isProductExists = await getProductById(productId);
  const carts = await findCartsInDB(currentUserId);

  const activeCart = getActiveCart(carts);

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
