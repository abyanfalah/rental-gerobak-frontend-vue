<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import Sidebar from './components/Sidebar.vue'

const authStore = useAuthStore();

console.log("isAuthenticated =>", authStore.isAuthenticated)

</script>

<template>
	<div class="container-fluid ps-0">
		<div class="row bg-light">
			<div v-if="authStore.isAuthenticated" class="col-md-3 pe-0">
				<Sidebar />
			</div>
			<div class="col ps-0">
				<div class="mt-3 ">
					<RouterView />
				</div>
			</div>
		</div>
	</div>
</template>