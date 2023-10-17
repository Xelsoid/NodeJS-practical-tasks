import { cart } from "../data/cart";
import { CartEntity } from "../schemas/cart.entity";

export const findCartById = (currentUserId: string): CartEntity | null =>
  cart.find(({ userId }) => userId === currentUserId) || null;

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

export const deleteCart = (currentUserId) => {
  const currentCart = findCartById(currentUserId);
  currentCart.isDeleted = true;
  return currentCart;
};
