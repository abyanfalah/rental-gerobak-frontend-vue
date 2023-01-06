import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({});
  const isAuthenticated = ref(false);
  const isAdmin = computed(() => {
    return user.value.access === "admin";
  });

  return {
    isAuthenticated,
    isAdmin,
    user,
  };
});
