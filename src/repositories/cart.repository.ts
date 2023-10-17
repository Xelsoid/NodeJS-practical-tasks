import { cart } from "../data/cart";
import { CartEntity } from "../schemas/cart.entity";

export const findCartById = (currentUserId: string): CartEntity | null => {
  return cart.find(({ userId }) => userId === currentUserId) || null;
};

export const findProductById = (currentUserId: string, productId: string) => {
  const cart = findCartById(currentUserId);
  if (!cart?.items) {
    return null;
  }
  const product = cart.items.find(({ product }) => {
    return product.id === productId;
  });
  return product || null;
};

export const updateProduct = (currentUserId, existingProduct) => {
  const cart = findCartById(currentUserId);

  const productIndex = cart.items.findIndex(({ product }) => {
    return product.id === existingProduct.product.id;
  });
  cart.items.splice(productIndex, 1, existingProduct);
  return cart;
};

export const addProduct = (currentUserId, product) => {
  const cart = findCartById(currentUserId);
  cart.items.push(product);
  return cart;
};

export const deleteCart = (currentUserId) => {
  const cart = findCartById(currentUserId);
  cart.isDeleted = true;
  return cart;
};
