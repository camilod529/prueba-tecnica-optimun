<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
      <h2 class="text-2xl mb-4">{{ title }}</h2>
      <slot></slot>
      <div class="flex justify-end mt-4">
        <button @click="close" class="px-4 py-2 bg-gray-300 rounded mr-2">
          Cancelar
        </button>
        <button
          @click="confirm"
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  emits: ["close", "confirm"],
  setup(props, { emit }) {
    const close = () => emit("close");
    const confirm = () => emit("confirm");

    return { close, confirm };
  },
});
</script>
