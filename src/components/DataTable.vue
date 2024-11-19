<template>
  <div class="bg-white shadow-md rounded-lg overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {{ column.name }}
          </th>
          <th
            v-if="hasActions"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="row in data" :key="row.id">
          <td
            v-for="column in columns"
            :key="column.key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
          >
            <slot :name="column.key" :row="row">
              {{ getNestedValue(row, column.key) }}
            </slot>
          </td>
          <td
            v-if="hasActions"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
          >
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DataTable",
  props: {
    columns: {
      type: Array as PropType<Array<{ name: string; key: string }>>,
      required: true,
    },
    data: {
      type: Array as PropType<Array<Record<string, any>>>,
      required: true,
    },
    hasActions: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getNestedValue(obj: Record<string, any>, key: string) {
      return key.split(".").reduce((nestedObj, keyPart) => {
        return nestedObj ? nestedObj[keyPart] : "";
      }, obj);
    },
  },
});
</script>
