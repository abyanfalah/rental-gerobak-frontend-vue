<script setup>
import capitalize from 'capitalize';
import { useIndexStore } from '../stores';

</script>

<template>
	<div>
		<div @click="useIndexStore().actionErrorMessage = null" class="alert bg-danger text-white rounded-0 text-center alert-dismissible fixed-bottom w-100 m-0 shadow-lg">
			{{ capitalize(useIndexStore().actionErrorMessage) ?? "Terjadi kesalahan saat melakukan operasi!" }}
		</div>
	</div>
</template>