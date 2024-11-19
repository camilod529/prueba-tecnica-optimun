<template>
  <section>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Productos</h2>
    <button
      @click="openCreateModal"
      class="mb-4 px-4 py-2 bg-green-500 text-white rounded"
    >
      Crear Producto
    </button>
    <DataTable :columns="columns" :data="products" :hasActions="true">
      <template #name="{ row }">
        <a
          @click.prevent="viewProductDetails(row._id)"
          href="#"
          class="text-blue-500 hover:underline"
        >
          {{ row.name }}
        </a>
      </template>
      <template #actions="{ row }">
        <button
          @click="openEditModal(row)"
          class="px-2 py-1 bg-yellow-500 text-white rounded"
        >
          Editar
        </button>
        <button
          @click="deleteProduct(row)"
          class="px-2 py-1 bg-red-500 text-white rounded ml-2"
        >
          Eliminar
        </button>
      </template>
    </DataTable>
    <!-- Paginación -->
    <div class="flex justify-between items-center mt-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded"
        :class="
          currentPage === 1
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-700'
        "
      >
        Anterior
      </button>
      <span>Página {{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="products.length < limit"
        class="px-4 py-2 rounded"
        :class="
          products.length < limit
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-700'
        "
      >
        Siguiente
      </button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "./DataTable.vue";
import {
  fetchProducts,
  deleteProduct as deleteProductApi,
} from "../services/apiServices";
import { formatDate } from "../helpers/dateFormat";
import { Product } from "../interfaces/interfaces";

export default defineComponent({
  name: "ProductTable",
  components: { DataTable },
  props: {
    openCreateModal: {
      type: Function,
      required: true,
    },
    openEditModal: {
      type: Function,
      required: true,
    },
    viewProductDetails: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const products = ref<Product[]>([]);
    const currentPage = ref(1);
    const limit = ref(10);

    const columns = ref([
      { name: "Nombre", key: "name" },
      { name: "Precio", key: "selling_price" },
      { name: "Categoría", key: "category.name" },
      { name: "Fecha de creacion", key: "createdAt" },
      { name: "Fecha de actualizacion", key: "updatedAt" },
    ]);

    const loadProducts = async () => {
      products.value = await fetchProducts(currentPage.value, limit.value);
      products.value.forEach((product) => {
        product.createdAt = formatDate(product.createdAt);
        product.updatedAt = formatDate(product.updatedAt);
      });
    };

    const nextPage = async () => {
      currentPage.value++;
      await loadProducts();
    };

    const prevPage = async () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        await loadProducts();
      }
    };

    const deleteProduct = async (product: Product) => {
      await deleteProductApi(product._id);
      await loadProducts();
    };

    onMounted(loadProducts);

    return {
      products,
      columns,
      currentPage,
      limit,
      nextPage,
      prevPage,
      deleteProduct,
    };
  },
});
</script>
