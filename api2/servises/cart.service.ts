import { CartEntity, CartItemEntity } from "../schemas/cart.entity";
import {
  findCartById,
  findProductById,
  addProduct,
  updateProduct,
  deleteCart,
} from "../repositories/cart.repository";

export const returnUserCartData = (currentUserId: string) => {
  const currentCart = findCartById(currentUserId);
  if (!currentCart) return null;

  const cart = { ...currentCart };
  delete cart?.userId;
  delete cart?.isDeleted;
  return cart;
};

export const returnCartTotal = (items: CartItemEntity[]) => {
  return items.reduce((acc, item) => {
    return acc + item.product.price * item.count;
  }, 0);
};

export const updateUserCart = (currentUserId: string, product) => {
  const { productId, count, title, description, price } = product;
  const existingProduct = findProductById(currentUserId, productId);

  if (existingProduct && count) {
    existingProduct.count = count;
    return updateProduct(currentUserId, existingProduct);
  }

  if (!existingProduct && title && description && price && count && productId) {
    //create new product
    const product = {
      product: {
        id: productId,
        title,
        description,
        price,
      },
      count,
    };
    return addProduct(currentUserId, product);
  }

  return null;
};

export const deleteUserCart = (currentUserId: string) => {
  return deleteCart(currentUserId);
};
