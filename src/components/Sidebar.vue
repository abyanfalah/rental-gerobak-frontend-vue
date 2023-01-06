<script setup>
import userService from '../service/modules/userService';

async function logout() {
	try {
		const response = await userService.logout()
		console.log(response)
	} catch (err) {
		console.error(err)
	}
}

</script>

<template>
		 <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark position-fixed h-100" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
      <span class="fs-4">Sidebar</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li>
				<RouterLink to="/dashboard" class="nav-link text-white">
					<i class="bi-eye"></i>
					Dashboard
				</RouterLink>
      </li>

			<li>
				<RouterLink to="/rent" class="nav-link text-white">
					<i class="bi-clipboard2-data-fill"></i>
					Rental
				</RouterLink>
      </li>

			<li>
				<RouterLink to="/user" class="nav-link text-white">
					<i class="bi-person-fill"></i>
					User
				</RouterLink>
      </li>

			<li>
				<RouterLink to="/customer" class="nav-link text-white">
					<i class="bi-person-lines-fill"></i>
					Customers
				</RouterLink>
      </li>

			<li>
				<RouterLink to="/gerobak" class="nav-link text-white">
					<i class="bi-minecart-loaded"></i>
					Gerobak
				</RouterLink>
      </li>
    
   
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
      	<li><a class="dropdown-item" href="#">Profil</a></li>
        <li><hr class="dropdown-divider"></li>
        <li>
					<button class="dropdown-item">Logout</button>
				</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
	.router-link-active{
		color: red;
	}
</style>