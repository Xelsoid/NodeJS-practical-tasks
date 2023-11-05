import {
  getAllProducts,
  getProductById,
} from "../repositories/product.repository";

export const returnProductsList = async () => {
  const products = await getAllProducts();
  return products;
};

export const returnProductById = async (productId) => {
  const product = await getProductById(productId);
  return product;
};
