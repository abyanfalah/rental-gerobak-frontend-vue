<script setup>
import { ref } from 'vue';
import router from '../router';
import authService from '../service/modules/authService'
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const username = ref("")
const password = ref("")

async function login() {
authStore.isAuthenticated = true;
			router.push("/dashboard")

	// try {
	// 	const response = await authService.login(username.value, password.value)
	// 	if (response.status == 200) {
	// 		authStore.isAuthenticated = true;
	// 		router.push("/dashboard")
	// 	}
	// }
	// catch(err) {
	// 	console.error(err)
	// }
}	
</script>

<template>
	<div class="mt-5 text-center">
		<div class="text-center my-5">
			<h1 class="display-1"><i class="bi-cart"></i></h1>
			<h1>Rental gerobak</h1>
		</div>

		<form @submit.prevent="login" class="form-signin">
			<h1 class="h3 mb-3 font-weight-normal">Login</h1>
			<input v-model="username" type="text" class="form-control" placeholder="Username" required autofocus>
			<input v-model="password" type="password"  class="form-control" placeholder="Password" required>
		
			<button class="btn btn-primary w-100" type="submit">Login</button>
		</form>

	</div>
</template>

<style scoped>
	@import '../assets/signin.css';

	.bd-placeholder-img {
		font-size: 1.125rem;
		text-anchor: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	@media (min-width: 768px) {
		.bd-placeholder-img-lg {
			font-size: 3.5rem;
		}
	}
</style>