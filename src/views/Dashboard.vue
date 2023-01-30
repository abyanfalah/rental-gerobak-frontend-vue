<script setup>
import { capitalize, onMounted } from 'vue';
import AlertWelcome from '../components/AlertWelcome.vue';
import { useIndexStore } from '../stores';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const indexStore = useIndexStore()

if (indexStore.justLoggedIn) {
	setTimeout(function () {
		indexStore.justLoggedIn = false;
	}, 2500)
}
</script>

<template>
  <h1>Dashboard</h1>



	

	<AlertWelcome />
</template>
