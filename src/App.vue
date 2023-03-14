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
	console.log("clearTimeout")
}

watch(() => [
		indexStore.actionSuccessMessage,
		indexStore.actionErrorMessage
], () => {
		
	if (indexStore.actionSuccessMessage !== null) {
		console.log("something is successfully done")
		alertSuccessTimeout = setTimeout(function () {
			indexStore.actionSuccessMessage = null;
			console.log("notif alert timeout. disappearing")
		}, 3000);
	} 

	if (indexStore.actionErrorMessage !== null) {
		console.log("some error occured")
		alertErrorTimeout = setTimeout(function () {
			indexStore.actionErrorMessage = null;
			console.log("notif alert timeout. disappearing")
		}, 3000);
	} 
});
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
