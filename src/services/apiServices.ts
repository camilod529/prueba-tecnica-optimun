import axiosInstance from "../api/axiosInstance";
import { Category, Product, Tax, Meta } from "../interfaces/interfaces";

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
): Promise<{ products: Product[]; meta: Meta }> => {
  try {
    const response = await axiosInstance.get<{
      data: { products: Product[]; meta: Meta };
    }>("/product", {
      params: { page, limit },
    });
    return {
      products: response.data.data.products,
      meta: response.data.data.meta,
    };
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

export const createProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axiosInstance.post<{
      data: { newProduct: Product };
    }>("/product", {
      id_category: product.category_id,
      barcode: product.barcode,
      name: product.name,
      presentation: product.presentation,
      reference: product.reference,
      description: product.description,
      service: product.service,
      selling_price: product.selling_price,
      product_cost: product.product_cost,
      taxes: product.taxes.map((tax) => ({
        code: tax.code,
        name: tax.name,
        percentage: tax.percentage,
      })),
    });
    return response.data.data.newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await axiosInstance.put<{ product: Product }>(
      `/product/${product._id}`,
      {
        id_category: product.category_id,
        barcode: product.barcode,
        name: product.name,
        presentation: product.presentation,
        reference: product.reference,
        description: product.description,
        service: product.service,
        selling_price: product.selling_price,
        product_cost: product.product_cost,
        taxes: product.taxes.map((tax) => ({
          code: tax.code,
          name: tax.name,
          percentage: tax.percentage,
        })),
      }
    );
    return response.data.product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/product/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axiosInstance.get<{ data: { product: Product } }>(
      `/product/${id}`
    );
    return response.data.data.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
