import { randomUUID } from "crypto";
import { CartEntity } from "../schemas/cart.entity";
import { Cart } from "../dbinit";

export const findCartById = async (
  currentUserId: string,
  isDeleted = false,
): Promise<CartEntity | null> => {
  const cart = await Cart.findOne({
    where: { userId: currentUserId, isDeleted: false },
  });
  return cart;
};

const createNewCart = async (currentUserId) => {
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

export const findProductById = async (
  currentUserId: string,
  productId: string,
) => {
  const currentCart = await findCartById(currentUserId);
  if (!currentCart?.items) {
    return null;
  }
  const currentProduct = currentCart.items.find(
    ({ product }) => product.id === productId,
  );
  return currentProduct || null;
};

export const updateProduct = async (currentUserId, existingProduct) => {
  const currentCart = await findCartById(currentUserId);

  const productIndex = currentCart.items.findIndex(
    ({ product }) => product.id === existingProduct.product.id,
  );
  currentCart.items.splice(productIndex, 1, existingProduct);
  return currentCart;
};

export const addProduct = async (currentUserId, product) => {
  const currentCart = await findCartById(currentUserId);
  currentCart.items.push(product);
  return currentCart;
};
