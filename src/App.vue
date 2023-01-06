<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginVue from './views/Login.vue';

import Sidebar from './components/Sidebar.vue'


</script>

<template>
	<div class="container-fluid ps-0">
		<div class="row bg-light">
			<div class="col-md-3 pe-0">
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