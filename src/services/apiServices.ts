import axiosInstance from "../api/axiosInstance";

export const fetchCategories = async () => {
  try {
    const response = await axiosInstance.get("/category");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get("/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchTaxes = async () => {
  try {
    const response = await axiosInstance.get("/tax");
    return response.data;
  } catch (error) {
    console.error("Error fetching taxes:", error);
    throw error;
  }
};
