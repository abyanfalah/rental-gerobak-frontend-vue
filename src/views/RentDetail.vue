<script setup>
import { onBeforeMount, ref } from 'vue';
import rentService from '../service/modules/rentService';

const props = defineProps(['id'])
const rent = ref({})

async function getRent() {
	try {
		rent.value = (await rentService.getById(props.id)).data.data
		console.log(rent.value)
	}catch (err) {
		console.error(err)
	}
}


onBeforeMount(() => {
	getRent()
})
</script>

<template>
	{{ rent }}
	<div>
		<h1>Detail penyewaan</h1>
		<div class="container-fluid">
			<div class="row">
				<div class="col">
					<div class="row">
						<div class="col">
							<small class="text-muted">
								Penyewa
							</small>
						</div>
					</div>
					<div class="row">
						<div class="col">
							<span class="fs-3">{{ rent.customer }}</span>
						</div>
					</div>
				</div>
				<div class="col">
					<span class="text-muted">ID: </span>
					{{ rent.id }}
				</div>
			</div>
		</div>
	</div>
</template>