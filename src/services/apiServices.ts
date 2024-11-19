import axiosInstance from "../api/axiosInstance";
import { Category, Product, Tax } from "../interfaces/interfaces";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<{ categories: Category[] }>(
      "/category"
    );
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchProducts = async (
  page: number,
  limit: number
): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<{ data: { products: Product[] } }>(
      "/product",
      {
        params: { page, limit },
      }
    );

    return response.data.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchTaxes = async (): Promise<Tax[]> => {
  try {
    const response = await axiosInstance.get<{ body: Tax[] }>("/tax");

    return response.data.body;
  } catch (error) {
    console.error("Error fetching taxes:", error);
    throw error;
  }
};
