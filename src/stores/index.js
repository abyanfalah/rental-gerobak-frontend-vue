import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", () => {
  const error = ref();
  const justLoggedIn = ref(false);
  const choosenUser = ref({});

  return {
    error,
    justLoggedIn,
    choosenUser,
  };
});
