<script setup>
import customerService from "../service/modules/customerService";
import { useIndexStore } from "../stores/index"

const emit = defineEmits(['customerDeleteSuccess', 'customerDeleteFailed'])

const indexStore = useIndexStore()

async function deleteCustomer() {
	const response = await customerService.delete(indexStore.choosenCustomer.id)
	console.log(response)
	if (response.status == 200) {
		console.log("success, go refresh")
		emit('customerDeleteSuccess')
	} else {
		// TODO: use proper modal (use modal error if u can)
		alert("customer delete failed")
	}
}


</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalCustomerDelete" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header bg-danger text-white fw-bold">Hapus customer?</div>
				<div class="modal-body">
					<p>Customer dengan data berikut akan dihapus. Data masih dapat di recover oleh admin.</p>
					<div class="px-5">
						<div class="row bg-light">
							<div class="col text-muted">Nama</div>
							<div class="col fw-bold">{{ indexStore.choosenCustomer.name }}</div>
						</div>
						<div class="row">
							<div class="col text-muted">Alamat</div>
							<div class="col fw-bold">{{ indexStore.choosenCustomer.address }}</div>
						</div>
					</div>
					
				</div>
				<div class="modal-footer border-0">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteCustomer">Ya, hapus</button>
				</div>
			</div>
		</div>
	</div>
</template>