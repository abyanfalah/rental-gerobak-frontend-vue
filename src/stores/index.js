import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", () => {
  const error = ref();

  return {
    error,
  };
});
