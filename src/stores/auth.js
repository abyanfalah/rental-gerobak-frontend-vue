import { ref, computed } from "vue";
import { defineStore } from "pinia";

// TODO: get solution for proper auth state persitence
export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref({});
    const isAuthenticated = ref(false);
    const isAdmin = computed(() => {
      const access = user.value?.access ?? "user";
      return access.toLowerCase() === "admin";
    });

    return {
      isAuthenticated,
      isAdmin,
      user,
    };
  },
  {
    persist: true,
  }
);
