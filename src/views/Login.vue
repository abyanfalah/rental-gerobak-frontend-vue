<script setup>
import { ref } from "vue";
import router from "../router";
import authService from "../service/modules/authService";
import { useIndexStore } from "../stores";
import { useAuthStore } from "../stores/auth";


const authStore = useAuthStore();
const indexStore = useIndexStore();

const username = ref("admin");
const password = ref("admin");
const errorMessage = ref()

async function login() {
  try {
    const response = await authService.login(username.value, password.value);
		console.log("login success")
		authStore.isAuthenticated = true;
		authStore.user = response.data.userdata;

		indexStore.justLoggedIn = true;
		router.push("/dashboard");
	
	} catch (err) {
		console.error("authService.login catch =>",err)


		if (err.response) {
			console.log(err.response.status)
			switch (err.response.status) {
				case 400: errorMessage.value = "Kredensial tidak valid";
					break;
				case 500: errorMessage.value = "Terjadi error pada server. Bersihkan cache browser, log out dari komputer. Bila masih terjadi error, hubungi admin.";
					break;
	
				default: errorMessage.value = err.message;
			}
		} else {
			errorMessage.value = err.code
		}

	}
}
</script>

<template>
  <div class="mt-5 text-center">
    <div class="text-center my-3">
      <h1 class="display-1"><i class="bi-minecart-loaded"></i></h1>
      <h1>Rental gerobak</h1>
    </div>

    <form @submit.prevent="login" class="form-signin">

      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <input
        v-model="username"
        type="text"
        class="form-control"
        placeholder="Username"
        required
        autofocus

      />
      <input
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Password"
        required
      />

      <button class="btn btn-primary w-100" type="submit">Login</button>

		<div v-if="errorMessage" @click="errorMessage = null" class="alert bg-danger text-white rounded-0 mt-3 fixed-bottom bottom-0 m-0">{{ errorMessage }}</div>
			 
    </form>
  </div>
</template>

<style scoped>
@import "../assets/signin.css";

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
