import { ref, computed } from "vue";
import { defineStore } from "pinia";
import userService from "../service/modules/userService";

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

    const userImageUrl = computed(() =>
      userService.userImageUrl(user.value.id)
    );

    return {
      isAuthenticated,
      isAdmin,
      user,
      userImageUrl,
    };
  },
  {
    persist: true,
  }
);
