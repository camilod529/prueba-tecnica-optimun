import { defineStore } from "pinia";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct as deleteProductApi,
} from "../services/apiServices";
import { Product } from "../interfaces/interfaces";
import { formatDate } from "../helpers/dateFormat";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [] as Product[],
    currentPage: 1,
    limit: 10,
    totalPages: 1,
    totalProducts: 0,
  }),
  actions: {
    async loadProducts() {
      console.log("Cargando productos...");
      console.log(this.currentPage, this.limit);

      try {
        const response = await fetchProducts(this.currentPage, this.limit);
        this.products = response.products;
        this.totalPages = response.meta.totalPages;
        this.totalProducts = response.meta.totalProducts;

        this.products.forEach((product) => {
          if (!product.createdAt || !product.updatedAt) return;
          product.createdAt = formatDate(product.createdAt);
          product.updatedAt = formatDate(product.updatedAt);
        });
        console.log(this.products);
        console.log(this.currentPage, this.totalPages);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    },
    async createProduct(product: Product) {
      await createProduct(product);
      await this.loadProducts();
    },
    async updateProduct(product: Product) {
      await updateProduct(product);
      await this.loadProducts();
    },
    async deleteProduct(product: Product) {
      if (!product._id) return;
      await deleteProductApi(product._id);
      await this.loadProducts();
    },
    nextPage() {
      console.log(this.currentPage, this.totalPages);
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.loadProducts();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.loadProducts();
      }
    },
  },
});
