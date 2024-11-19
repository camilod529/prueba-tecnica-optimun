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
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <span>Total de productos: {{ totalProducts }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded"
        :class="
          currentPage === totalPages
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
import { defineComponent, computed, onMounted } from "vue";
import { useProductStore } from "../stores/productStore";
import DataTable from "./DataTable.vue";
import { deleteProduct } from "../services/apiServices";
import { showConfirmationAlert, showAlert } from "../utils/alerts";

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
    const productStore = useProductStore();

    const columns = computed(() => [
      { name: "Nombre", key: "name" },
      { name: "Precio", key: "selling_price" },
      { name: "Categoría", key: "category.name" },
      { name: "Fecha de creación", key: "createdAt" },
      { name: "Fecha de actualización", key: "updatedAt" },
    ]);
    const products = computed(() => productStore.products);
    const currentPage = computed(() => productStore.currentPage);
    const totalPages = computed(() => productStore.totalPages);
    const totalProducts = computed(() => productStore.totalProducts);

    const deleteProduct = async (product) => {
      const confirmation = await showConfirmationAlert(
        "Eliminar Producto",
        "¿Estás seguro de eliminar este producto?",
        "warning"
      );

      if (confirmation.isConfirmed) {
        await productStore.deleteProduct(product);
        if (products.value.length === 0 && currentPage.value > 1) {
          productStore.prevPage();
        }
        showAlert(
          "Producto eliminado",
          "El producto ha sido eliminado con éxito",
          "success"
        );
      }
    };

    onMounted(() => {
      productStore.loadProducts();
    });

    return {
      columns,
      products,
      currentPage,
      totalPages,
      totalProducts,
      nextPage: productStore.nextPage,
      prevPage: productStore.prevPage,
      deleteProduct,
    };
  },
});
</script>
