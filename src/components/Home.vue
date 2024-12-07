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
      <CategoryTable />
      <ProductTable
        :openCreateModal="openCreateModal"
        :openEditModal="openEditModal"
        :viewProductDetails="viewProductDetails"
      />
      <TaxTable />
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
            <label class="block text-gray-700">
              Nombre <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">
              Código de Barras <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.barcode"
              type="text"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">
              Presentación <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.presentation"
              type="text"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">
              Referencia <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.reference"
              type="text"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">
              Descripción <span class="text-red-500">*</span>
            </label>
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
            <label class="block text-gray-700">
              Precio de Venta <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.selling_price"
              type="number"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">
              Costo del Producto <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.product_cost"
              type="number"
              class="w-full px-4 py-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">
              Categoría <span class="text-red-500">*</span>
            </label>
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
            <label class="block text-gray-700">
              Impuestos <span class="text-red-500">*</span>
            </label>
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
import { useProductStore } from "../stores/productStore";
import CategoryTable from "./CategoryTable.vue";
import ProductTable from "./ProductTable.vue";
import TaxTable from "./TaxTable.vue";
import Modal from "./Modal.vue";
import {
  fetchCategories,
  getProductById,
  fetchTaxes,
} from "../services/apiServices";
import { formatDate } from "../helpers/dateFormat";
import { Product } from "../interfaces/interfaces";
import { showAlert } from "../utils/alerts";

export default defineComponent({
  name: "Home",
  components: { CategoryTable, ProductTable, TaxTable, Modal },
  setup() {
    const productStore = useProductStore();
    const stats = ref({ categories: 0, products: 0, taxes: 0 });
    const categories = ref([]);
    const taxes = ref([]);

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

    const openCreateModal = () => {
      modalType.value = "product";
      modalTitle.value = "Crear Producto";
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

    const openEditModal = (item) => {
      modalType.value = "product";
      modalTitle.value = "Editar Producto";
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
      try {
        if (modalType.value === "product") {
          // Validation checks
          if (
            !form.value.name ||
            !form.value.barcode ||
            !form.value.presentation ||
            !form.value.reference ||
            !form.value.description ||
            form.value.selling_price <= 0 ||
            form.value.product_cost <= 0 ||
            !form.value.category_id ||
            form.value.taxes.length === 0
          ) {
            showAlert(
              "Error",
              "Por favor complete todos los campos obligatorios",
              "error"
            );
            return;
          }

          if (form.value._id) {
            await productStore.updateProduct(form.value);
            showAlert(
              "Producto actualizado",
              "El producto ha sido actualizado con éxito",
              "success"
            );
          } else {
            await productStore.createProduct(form.value);
            showAlert(
              "Producto creado",
              "El producto ha sido creado con éxito",
              "success"
            );
          }
        }
      } catch (error) {
        showAlert(
          "Error",
          "Ocurrio un problema al guardar/actualizar el producto, por favor intentelo nuevamente",
          "error"
        );
      }
      closeModal();
    };

    const deleteProduct = async (product) => {
      await productStore.deleteProduct(product);
    };

    onMounted(async () => {
      categories.value = await fetchCategories();
      taxes.value = await fetchTaxes();

      stats.value = {
        categories: categories.value.length,
        products: productStore.totalProducts,
        taxes: taxes.value.length,
      };

      categories.value.forEach((category) => {
        category.createdAt = formatDate(category.createdAt);
        category.updatedAt = formatDate(category.updatedAt);
      });
    });

    return {
      stats,
      categories,
      taxes,
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
