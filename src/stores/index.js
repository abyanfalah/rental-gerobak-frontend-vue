import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", () => {
  const error = ref();
  const justLoggedIn = ref(false);

  const choosenUser = ref({});
  const choosenCustomer = ref({});
  const choosenRentCustomer = ref({});
  const choosenGerobak = ref({});
  const choosenGerobakList = ref([]);
  const choosenRent = ref({});

  const actionSuccessMessage = ref(null);
  const actionErrorMessage = ref(null);

  const isExistUnsavedChanges = ref(true);

  return {
    isExistUnsavedChanges,
    error,
    justLoggedIn,
    choosenUser,
    choosenCustomer,
    choosenGerobak,
    choosenGerobakList,
    choosenRent,
    choosenRentCustomer,
    actionSuccessMessage,
    actionErrorMessage,
  };
});
