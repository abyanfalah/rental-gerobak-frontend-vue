<script setup>
import { useIndexStore } from "../stores/index"
const indexStore = useIndexStore()



</script>

<template>
	<div class="modal" data-bs-backdrop="static" id="modalError" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-body">
					{{ indexStore.error }}
				</div>
			</div>
		</div>
	</div>
</template>