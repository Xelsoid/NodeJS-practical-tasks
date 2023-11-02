import {
  getAllProducts,
  getProductById,
} from "../repositories/product.repository";

export const returnProductsList = () => getAllProducts();

export const returnProductById = (productId) => getProductById(productId);
