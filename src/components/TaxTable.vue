<template>
  <section>
    <h2 class="text-2xl font-bold text-gray-800 mb-4">Impuestos</h2>
    <DataTable :columns="columns" :data="taxes" />
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import DataTable from "./DataTable.vue";
import { fetchTaxes } from "../services/apiServices";
import { Tax } from "../interfaces/interfaces";

export default defineComponent({
  name: "TaxTable",
  components: { DataTable },
  setup() {
    const taxes = ref<Tax[]>([]);

    const columns = ref([
      { name: "Código", key: "code" },
      { name: "Nombre", key: "name" },
      { name: "Porcentaje", key: "percentage" },
    ]);

    const loadTaxes = async () => {
      taxes.value = await fetchTaxes();
    };

    onMounted(loadTaxes);

    return {
      taxes,
      columns,
    };
  },
});
</script>
