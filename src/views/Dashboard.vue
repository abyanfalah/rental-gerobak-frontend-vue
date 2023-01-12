<script setup>
import { capitalize, onMounted } from 'vue';
import { useIndexStore } from '../stores';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const indexStore = useIndexStore()


onMounted(function () {
	setTimeout(function () {
		indexStore.justLoggedIn = false;
	}, 5000)
})
</script>

<template>
  <h1>Dashboard</h1>
	<div v-if="indexStore.justLoggedIn" class="alert alert-success d-flex flex-row justify-content-between">
		Welcome {{ capitalize(authStore.user.name) }}
		<button class="btn-close" data-bs-dismiss="alert" @click="indexStore.justLoggedIn = false"></button>
	</div>
</template>
