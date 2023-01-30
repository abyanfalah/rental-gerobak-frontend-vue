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
				class="alert alert-success alert-dismissible fixed-bottom w-50 mx-auto "
				@click="indexStore.justLoggedIn = false"
				>
				Selamat datang {{ capitalize.words(authStore.user.name) }}!
			</div>
	</div>

</template>