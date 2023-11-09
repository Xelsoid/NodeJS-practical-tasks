import { randomUUID } from "crypto";
import { Cart ,User, CartItem, Product } from "../dbinit";

export const findCartById = async (
  currentUserId: string,
  isDeleted = false,
) => {
  const cart = await Cart.findOne({
    where: { userId: currentUserId, isDeleted },
  });
  return cart;
};

const createNewCart = async (currentUserId: string) => {
  const newCart = await Cart.create({
    id: randomUUID(),
    userId: currentUserId,
    isDeleted: false,
    items: [],
  });
  return newCart;
};

export const deleteCart = async (currentUserId: string) => {
  const currentCart = await Cart.findOne({
    where: { userId: currentUserId, isDeleted: false },
  });
  if (currentCart) {
    currentCart.isDeleted = true;
    currentCart.save();
  }

  return currentCart;
};

export const findCartsInDB = async (currentUserId: string) => {
  const userCarts = await User.findByPk(currentUserId, {
    include: [{
      model: Cart,
      include: [{
        model: CartItem,
        include:[{
          model: Product
        }]
      }]
    }]
  });
  return userCarts;
};

export const findProductById = async (
  currentUserId: string,
  productId: string,
) => {
  const currentCart = await findCartById(currentUserId);
  if (!currentCart?.items) {
    return null;
  }
  const currentProduct = currentCart.items.find(({ id }) => id === productId);

  return currentProduct || null;
};

export const updateProduct = async (currentUserId: string, existingProduct) => {
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
