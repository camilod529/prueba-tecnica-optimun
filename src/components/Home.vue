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
        <button
          @click="openCreateModal('product')"
          class="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Crear Producto
        </button>
        <DataTable
          :columns="productColumns"
          :data="products"
          :hasActions="true"
        >
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
              @click="openEditModal('product', row)"
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

      <!-- Tabla Taxes -->
      <section>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Impuestos</h2>
        <DataTable :columns="taxColumns" :data="taxes" />
      </section>
    </div>

    <!-- Modal -->
    <Modal
      :visible="isModalVisible"
      :title="modalTitle"
      @close="closeModal"
      @confirm="confirmModal"
    >
      <div v-if="modalType === 'product'">
        <!-- Formulario para crear/editar productos -->
        <form @submit.prevent="saveProduct">
          <div class="mb-4">
            <label class="block text-gray-700">Nombre</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Código de Barras</label>
            <input
              v-model="form.barcode"
              type="text"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Presentación</label>
            <input
              v-model="form.presentation"
              type="text"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Referencia</label>
            <input
              v-model="form.reference"
              type="text"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Descripción</label>
            <textarea
              v-model="form.description"
              class="w-full px-4 py-2 border rounded"
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Servicio</label>
            <input v-model="form.service" type="checkbox" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Precio de Venta</label>
            <input
              v-model="form.selling_price"
              type="number"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Costo del Producto</label>
            <input
              v-model="form.product_cost"
              type="number"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Categoría</label>
            <select
              v-model="form.category_id"
              class="w-full px-4 py-2 border rounded"
            >
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Impuestos</label>
            <select
              v-model="form.taxes"
              multiple
              class="w-full px-4 py-2 border rounded"
            >
              <option v-for="tax in taxes" :key="tax._id" :value="tax">
                {{ tax.name }} ({{ tax.percentage }}%)
              </option>
            </select>
          </div>
        </form>
      </div>
      <div v-else-if="modalType === 'productDetails'">
        <!-- Información adicional del producto -->
        <div v-if="productDetails">
          <p><strong>Nombre:</strong> {{ productDetails.name }}</p>
          <p><strong>Código de Barras:</strong> {{ productDetails.barcode }}</p>
          <p>
            <strong>Presentación:</strong> {{ productDetails.presentation }}
          </p>
          <p><strong>Referencia:</strong> {{ productDetails.reference }}</p>
          <p><strong>Descripción:</strong> {{ productDetails.description }}</p>
          <p>
            <strong>Servicio:</strong>
            {{ productDetails.service ? "Sí" : "No" }}
          </p>
          <p>
            <strong>Precio de Venta:</strong> {{ productDetails.selling_price }}
          </p>
          <p>
            <strong>Costo del Producto:</strong>
            {{ productDetails.product_cost }}
          </p>
          <p><strong>Categoría:</strong> {{ productDetails.category.name }}</p>
          <p><strong>Impuestos:</strong></p>
          <ul>
            <li v-for="tax in productDetails.taxes" :key="tax._id">
              {{ tax.name }} ({{ tax.percentage }}%)
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No se encontró información del producto.</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "./DataTable.vue";
import Modal from "./Modal.vue";
import {
  fetchCategories,
  fetchProducts,
  fetchTaxes,
  createProduct,
  updateProduct,
  deleteProduct as deleteProductApi,
  getProductById,
} from "../services/apiServices";
import { formatDate } from "../helpers/dateFormat";
import { Product } from "../interfaces/interfaces";

export default defineComponent({
  name: "Home",
  components: { DataTable, Modal },
  setup() {
    const stats = ref({ categories: 0, products: 0, taxes: 0 });
    const categories = ref([]);
    const products = ref([]);
    const taxes = ref([]);

    const currentPage = ref(1);
    const limit = ref(10);

    const categoryColumns = ref([
      { name: "Nombre", key: "name" },
      { name: "Fecha de creacion", key: "createdAt" },
      { name: "Fecha de actualizacion", key: "updatedAt" },
    ]);
    const productColumns = ref([
      { name: "Nombre", key: "name" },
      { name: "Precio", key: "selling_price" },
      { name: "Categoría", key: "category.name" },
      { name: "Fecha de creacion", key: "createdAt" },
      { name: "Fecha de actualizacion", key: "updatedAt" },
    ]);
    const taxColumns = ref([
      { name: "Código", key: "code" },
      { name: "Nombre", key: "name" },
      { name: "Porcentaje", key: "percentage" },
    ]);

    const isModalVisible = ref(false);
    const modalTitle = ref("");
    const modalType = ref("");
    const form = ref({
      id: null,
      name: "",
      barcode: "",
      presentation: "",
      reference: "",
      description: "",
      service: false,
      selling_price: 0,
      product_cost: 0,
      category_id: null,
      taxes: [],
    });

    const productDetails = ref<Product | null>(null);

    const loadProducts = async () => {
      products.value = await fetchProducts(currentPage.value, limit.value);
      products.value.forEach((product) => {
        product.createdAt = formatDate(product.createdAt);
        product.updatedAt = formatDate(product.updatedAt);
      });
    };

    const openCreateModal = (type) => {
      modalType.value = type;
      modalTitle.value = `Crear ${
        type.charAt(0).toUpperCase() + type.slice(1)
      }`;
      form.value = {
        id: null,
        name: "",
        barcode: "",
        presentation: "",
        reference: "",
        description: "",
        service: false,
        selling_price: 0,
        product_cost: 0,
        category_id: null,
        taxes: [],
      };
      isModalVisible.value = true;
    };

    const openEditModal = (type, item) => {
      modalType.value = type;
      modalTitle.value = `Editar ${
        type.charAt(0).toUpperCase() + type.slice(1)
      }`;
      form.value = {
        ...item,
        category_id: item.category._id,
        taxes: item.taxes.map((tax) => ({
          code: tax.code,
          name: tax.name,
          percentage: tax.percentage,
        })),
      };
      isModalVisible.value = true;
    };

    const viewProductDetails = async (id: string) => {
      modalType.value = "productDetails";
      modalTitle.value = "Detalles del Producto";
      productDetails.value = await getProductById(id);
      isModalVisible.value = true;
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    const confirmModal = async () => {
      if (modalType.value === "product") {
        if (form.value._id) {
          await updateProduct(form.value);
        } else {
          await createProduct(form.value);
        }
        await loadProducts();
      }
      closeModal();
    };

    const deleteProduct = async (product) => {
      await deleteProductApi(product._id);
      await loadProducts();
    };

    onMounted(async () => {
      categories.value = await fetchCategories();
      await loadProducts();
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
    });

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

    return {
      stats,
      categories,
      products,
      taxes,
      categoryColumns,
      productColumns,
      taxColumns,
      currentPage,
      limit,
      nextPage,
      prevPage,
      isModalVisible,
      modalTitle,
      modalType,
      form,
      productDetails,
      openCreateModal,
      openEditModal,
      viewProductDetails,
      closeModal,
      confirmModal,
      deleteProduct,
    };
  },
});
</script>
