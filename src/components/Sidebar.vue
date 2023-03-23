<script setup>
import capitalize from "capitalize";
import { computed } from "vue";
import router from "../router";
import userService from "../service/modules/userService";
import { useIndexStore } from "../stores";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const userImageUrl = authStore.userImageUrl;


// function getCurrentRouteName() {
// 	return router.currentRoute.value.name ?? ''
// };
</script>

<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark position-fixed h-100"
    style="width: 280px"
  >
    <router-link to="/" class="text-white text-center mb-4">
      <i class="bi-minecart display-1 me-3"></i>
    </router-link>

		

    <div class="nav nav-pills flex-column mb-auto text-white">
			<RouterLink to="/rent/new" 
				class="nav-link " 
				active-class="bg-success text-white"
				>
        	<i class="bi-plus-square-fill"></i>
        	Rental baru
      </RouterLink>
			
      <RouterLink to="/dashboard" class="nav-link" active-class="active">
        <i class="bi-eye"></i>
        Dashboard
      </RouterLink>

      <RouterLink to="/rent" class="nav-link" active-class="active">
        <i class="bi-clipboard2-data-fill"></i>
        Rental
      </RouterLink>

      <RouterLink to="/user" class="nav-link" active-class="active">
        <i class="bi-person-fill"></i>
        User
      </RouterLink>

      <RouterLink to="/customer" class="nav-link" active-class="active">
        <i class="bi-person-lines-fill"></i>
        Customer
      </RouterLink>

      <RouterLink to="/gerobak" class="nav-link" active-class="active">
        <i class="bi-minecart-loaded"></i>
        Gerobak
      </RouterLink>

			<!-- TODO: Delete this -->
			<div class="nav-item">
				<button 
					class="btn btn-success mb-3" 
					@click="useIndexStore().actionSuccessMessage = 'test success message'"
				>
					Invoke success action
				</button>
				<button 
					class="btn btn-danger mb-3" 
					@click="useIndexStore().actionErrorMessage = 'test error message'"
				>
					Invoke error action
				</button>
			</div>

			<RouterLink to="/testpage" class="nav-link" active-class="active">
        <i class="bi-gear-wide"></i>
        Testpage
      </RouterLink>

    </div>

    <hr />
    <div class="dropdown">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        id="dropdownUser1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >	
        <!-- TODO: add user image -->
				<div class="d-flex justify-content-around align-items-center">
					<img :src="userImageUrl" class="rounded-circle" width="45">
					<strong v-if="authStore.user" class="mx-1">{{ capitalize.words(authStore.user.name) }}</strong>
				</div>
      </a>
      <ul
        class="dropdown-menu dropdown-menu-dark text-small shadow"
        aria-labelledby="dropdownUser1"
      >
        <li><RouterLink to="/me" class="dropdown-item">Profil</RouterLink></li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modalLogout">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import url("../assets/sidebars.css");

.nav a {
  color: white;
}
</style>
