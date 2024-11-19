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

export const createProduct = async (product: Product): Promise<Product> => {
  console.log(product.category_id);
  console.log(product.taxes);
  console.log(typeof product.service);
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

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/product/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
