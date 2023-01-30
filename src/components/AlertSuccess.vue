<script setup>
import capitalize from 'capitalize';
import { useIndexStore } from '../stores';

</script>

<template>
	<div>
		<div @click="useIndexStore().actionSuccessMessage = null" class="alert alert-success alert-dismissible shadow border-success text-center">
			{{ capitalize(useIndexStore().actionSuccessMessage) ?? "Operasi berhasil!" }}
		</div>
	</div>
</template>