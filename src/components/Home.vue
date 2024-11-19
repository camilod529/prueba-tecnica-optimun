<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Resumen -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white shadow-md rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Categorías</h3>
        <p class="text-3xl font-bold text-blue-500">{{ stats.categories }}</p>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Productos</h3>
        <p class="text-3xl font-bold text-blue-500">{{ stats.products }}</p>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Impuestos</h3>
        <p class="text-3xl font-bold text-blue-500">{{ stats.taxes }}</p>
      </div>
    </div>

    <!-- Tablas -->
    <div class="space-y-8">
      <!-- Tabla Categorías -->
      <section>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Categorías</h2>
        <DataTable :columns="categoryColumns" :data="categories" />
      </section>

      <!-- Tabla Productos -->
      <section>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Productos</h2>
        <DataTable :columns="productColumns" :data="products" />
      </section>

      <!-- Tabla Taxes -->
      <section>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Impuestos</h2>
        <DataTable :columns="taxColumns" :data="taxes" />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "./DataTable.vue";
import {
  fetchCategories,
  fetchProducts,
  fetchTaxes,
} from "../services/apiServices.ts";
import { formatDate } from "../helpers/dateFormat";

export default defineComponent({
  name: "Home",
  components: { DataTable },
  setup() {
    const stats = ref({ categories: 0, products: 0, taxes: 0 });
    const categories = ref([]);
    const products = ref([]);
    const taxes = ref([]);

    const categoryColumns = ref([
      { name: "Nombre", key: "name" },
      { name: "Fecha de creacion", key: "createdAt" },
      { name: "Fecha de actualizacion", key: "updatedAt" },
    ]);
    const productColumns = ref([
      { name: "Nombre", key: "name" },
      { name: "Precio", key: "selling_price" },
      { name: "Categoría", key: "category.name" }, // Updated key to access nested property
      { name: "Fecha de creacion", key: "createdAt" },
      { name: "Fecha de actualizacion", key: "updatedAt" },
    ]);
    const taxColumns = ref([
      { name: "Código", key: "code" },
      { name: "Nombre", key: "name" },
      { name: "Porcentaje", key: "percentage" },
    ]);

    onMounted(async () => {
      categories.value = await fetchCategories();
      products.value = await fetchProducts(1, 10); // Example: page 1, limit 10
      taxes.value = await fetchTaxes();

      stats.value = {
        categories: categories.value.length,
        products: products.value.length,
        taxes: taxes.value.length,
      };

      categories.value.forEach((category) => {
        category.createdAt = formatDate(category.createdAt);
        category.updatedAt = formatDate(category.updatedAt);
      });

      products.value.forEach((product) => {
        product.createdAt = formatDate(product.createdAt);
        product.updatedAt = formatDate(product.updatedAt);
      });
    });

    return {
      stats,
      categories,
      products,
      taxes,
      categoryColumns,
      productColumns,
      taxColumns,
    };
  },
});
</script>
