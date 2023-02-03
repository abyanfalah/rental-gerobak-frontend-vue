<script setup>
import capitalize from 'capitalize';
import { useIndexStore } from '../stores';
import { useAuthStore } from '../stores/auth';


const indexStore = useIndexStore()
const authStore = useAuthStore()
</script>

<template>
	<div>
			<div 
				v-if="indexStore.justLoggedIn"
				class="alert bg-success text-white rounded-0 text-center alert-dismissible fixed-bottom w-100 m-0"
				@click="indexStore.justLoggedIn = false"
				>
				Selamat datang {{ capitalize.words(authStore.user.name) }}!
			</div>
	</div>

</template>