<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import router from "./router";

import Sidebar from "./components/Sidebar.vue";

import ModalLogout from "./components/ModalLogout.vue";
import ModalError from "./components/ModalError.vue";
import ModalTaskSuccess from "./components/ModalTaskSuccess.vue";
import ModalPageLeave from "./components/ModalPageLeave.vue";

import AlertSuccess from "./components/AlertSuccess.vue";
import AlertError from "./components/AlertError.vue";

import { useIndexStore } from "./stores";
import { watch } from "vue";

const indexStore = useIndexStore();
const authStore = useAuthStore();

let alertSuccessTimeout, alertErrorTimeout;
function killTimeout() {
	clearTimeout(alertSuccessTimeout)
	clearTimeout(alertErrorTimeout)
}

// success message watcher
watch(() => indexStore.actionSuccessMessage, () => {
	if (!indexStore.actionSuccessMessage) return 

	killTimeout()
	indexStore.actionErrorMessage = null
	alertSuccessTimeout = setTimeout(() => {
		indexStore.actionSuccessMessage = null
	}, 3000)
})

// error message watcher
watch(() => indexStore.actionErrorMessage, () => {
	if (!indexStore.actionErrorMessage) return

	killTimeout()
	indexStore.actionSuccessMessage = null
	alertErrorTimeout = setTimeout(() => {
		indexStore.actionErrorMessage = null
	}, 3000)
})

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

	<AlertSuccess @click="killTimeout()" class="fixed-bottom w-50 mx-auto" v-if="indexStore.actionSuccessMessage !== null" />
	<AlertError @click="killTimeout()" class="fixed-bottom w-50 mx-auto" v-if="indexStore.actionErrorMessage !== null" />
</template>
