import { products } from "../data/products";

export const getAllProducts = () => products;

export const getProductById = (productId: string) =>
  products.find(({ id }) => id === productId);
