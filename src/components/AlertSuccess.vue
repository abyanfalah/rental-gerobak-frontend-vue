<script setup>
import capitalize from 'capitalize';
import { useIndexStore } from '../stores';

</script>

<template>
	<div>
		<div @click="useIndexStore().actionSuccessMessage = null" class="alert bg-success text-white rounded-0 text-center alert-dismissible fixed-bottom w-100 m-0 shadow-lg">
			{{ capitalize(useIndexStore().actionSuccessMessage) ?? "Operasi berhasil!" }}
		</div>
	</div>
</template>