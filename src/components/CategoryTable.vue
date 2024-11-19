<template>
  <section>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Categorías</h2>
    <DataTable :columns="columns" :data="categories" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "./DataTable.vue";
import { fetchCategories } from "../services/apiServices";
import { Category } from "../interfaces/interfaces";

export default defineComponent({
  name: "CategoryTable",
  components: { DataTable },
  setup() {
    const categories = ref<Category[]>([]);

    const columns = ref([
      { name: "Nombre", key: "name" },
      { name: "Fecha de creacion", key: "createdAt" },
      { name: "Fecha de actualizacion", key: "updatedAt" },
    ]);

    const loadCategories = async () => {
      categories.value = await fetchCategories();
    };

    onMounted(loadCategories);

    return {
      categories,
      columns,
    };
  },
});
</script>
