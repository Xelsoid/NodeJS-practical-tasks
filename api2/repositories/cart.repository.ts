import { randomUUID } from "crypto";
import { cart } from "../data/cart";
import { CartEntity } from "../schemas/cart.entity";
import { Cart } from "../dbinit";

export const findCartById = (currentUserId: string): CartEntity | null =>
  cart.find(({ userId }) => userId === currentUserId) || null;

const createCart = async (currentUserId) => {
  const newCart = await Cart.create({
    id: randomUUID(),
    userId: currentUserId,
    isDeleted: false,
    items: [],
  });
  return newCart;
};

export const deleteCart = async (currentUserId) => {
  const currentCart = await Cart.findOne({
    where: { userId: currentUserId, isDeleted: false },
  });
  if (currentCart) {
    currentCart.isDeleted = true;
    currentCart.save();
  }

  return currentCart;
};

export const findProductById = (currentUserId: string, productId: string) => {
  const currentCart = findCartById(currentUserId);
  if (!currentCart?.items) {
    return null;
  }
  const currentProduct = currentCart.items.find(
    ({ product }) => product.id === productId,
  );
  return currentProduct || null;
};

export const updateProduct = (currentUserId, existingProduct) => {
  const currentCart = findCartById(currentUserId);

  const productIndex = currentCart.items.findIndex(
    ({ product }) => product.id === existingProduct.product.id,
  );
  currentCart.items.splice(productIndex, 1, existingProduct);
  return currentCart;
};

export const addProduct = (currentUserId, product) => {
  const currentCart = findCartById(currentUserId);
  currentCart.items.push(product);
  return currentCart;
};
