<script setup>
import capitalize from 'capitalize';
import { useIndexStore } from '../stores';

</script>

<template>
	<div>
		<div @click="indexStore.actionSuccessMessage = null" class="alert alert-success alert-dismissible shadow border-success text-center fs-5">
			{{ capitalize(useIndexStore().actionSuccessMessage) ?? "Operasi berhasil!" }}
		</div>
	</div>
</template>