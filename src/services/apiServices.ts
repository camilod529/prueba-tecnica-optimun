import axiosInstance from "../api/axiosInstance";

interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

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

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/product");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchTaxes = async () => {
  try {
    const response = await axiosInstance.get("/tax");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching taxes:", error);
    throw error;
  }
};
