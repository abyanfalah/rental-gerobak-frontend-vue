<script setup>
import { ref } from "vue";
import customerService from "../service/modules/customerService";
import { useIndexStore } from "../stores/index"

const emit = defineEmits(['customerAddSuccess', 'customerAddFailed'])

const name = ref("")
const address = ref("")
const phone = ref("")

async function addCustomer() {
	const data = {
		name: name.value,
		address: address.value,
		phone: phone.value
	}

	try { 
		await customerService.create(data)
		emit('customerAddSuccess')
		useIndexStore().actionSuccessMessage = "customer tersimpan!"

	} catch (err) {
		console.error(err)
	}

	name.value = ""
	address.value = ""
	phone.value = ""
}

</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalCustomerAdd" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header bg-success text-white fw-bold">Customer baru</div>
				<div class="modal-body">
					<form @submit.prevent="addCustomer" class="p-3">

						<div class="mb-3">
							<label class="form-label">Nama</label>
							<input 
								v-model="name" 
								type="text" 
								class="form-control" 
								required
								>
							<!-- <div  class="text-danger" v-if="!isValidName">nama harus diisi!</div> -->
						</div>

						<div class="mb-3">
							<label class="form-label">Alamat</label>
							<input 
								v-model="address" 
								type="text" 
								class="form-control" 
								required
								>
							<!-- <div  class="text-danger" v-if="!isValidName">nama harus diisi!</div> -->
						</div>

						<div class="mb-3">
							<label class="form-label">Telepon</label>
							<input 
								v-model="phone" 
								type="text" 
								class="form-control" 
								required
								>
							<!-- <div  class="text-danger" v-if="!isValidName">nama harus diisi!</div> -->
						</div>

						<div class="d-block text-end">
							<button type="button" class="btn btn-danger me-1" data-bs-dismiss="modal">Batal</button>

							<!-- TODO: find a way to do validation before closing modal -->
							<button type="submit" class="btn btn-success" data-bs-dismiss="modal">Simpan</button>
						</div>

				
					</form>
				</div>
				</div>
		</div>
	</div>
</template>