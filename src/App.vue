<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import Sidebar from "./components/Sidebar.vue";
import router from "./router";
import ModalLogout from "./components/ModalLogout.vue";
import ModalError from "./components/ModalError.vue";
import ModalTaskSuccess from "./components/ModalTaskSuccess.vue";
import ModalPageLeave from "./components/ModalPageLeave.vue";
import AlertSuccess from "./components/AlertSuccess.vue";
import { useIndexStore } from "./stores";
import { watch } from "vue";

const indexStore = useIndexStore();
const authStore = useAuthStore();

watch(() => indexStore.actionSuccessMessage, () => {
	setTimeout(function () {
		indexStore.actionSuccessMessage = null;
		console.log("notif alert timeout. disappearing")
  }, 3000);
});


console.log("app.authStore.isAuthenticated =>", authStore.isAuthenticated);
console.log("success message: ",indexStore.actionSuccessMessage)
</script>

<template>
  <div id="mainContainer" class="container-fluid ps-0">
    <div class="row">
      <div v-if="!router.currentRoute.value.meta.isAuthPage" class="col-md-3 pe-0">
        <Sidebar v-if="authStore.isAuthenticated && !router.currentRoute.value.meta.isAuthPage" />
      </div>
      <div class="col ps-0">
        <div class="mt-3">
          <RouterView />
					
        </div>
      </div>
    </div>
  </div>
	
	<ModalLogout />
	<ModalError />
	<ModalTaskSuccess />
	<ModalPageLeave />
	<AlertSuccess class="fixed-bottom w-50 mx-auto" v-if="indexStore.actionSuccessMessage !== null" />
</template>
