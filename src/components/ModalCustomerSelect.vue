<script setup>
import { useIndexStore } from '../stores';
import customerService from '../service/modules/customerService';
import { onMounted, ref } from 'vue';
import capitalize from 'capitalize';

const indexStore = useIndexStore()
const customerList = ref({})
const previouslyChoosenCustomer = ref({})
const choosenCustomer = ref({})



onMounted(async () => {
	customerList.value = (await customerService.getAll()).data.data
})

</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalCustomerSelect">
		<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header bg-primary text-white shadow-sm">
					<h5 class="modal-title">Pilih penyewa</h5>
				</div>
				<div class="modal-body">
					
					<table class="table table-sm table-hover table-bordered">
							<thead>
								<tr>
									<th>#</th>
									<th>Nama</th>
									<th>Alamat</th>
									<th>Telpon</th>
								</tr>
							</thead>

							<tbody class="pt-5">
								<tr  
									@click="choosenCustomer = customer" 
									v-for="(customer, index) in customerList"
									:class="{'bg-primary text-white' : choosenCustomer.id === customer.id }"
									>
									<td>{{ ++index }}</td>
									<td>{{ capitalize.words(customer.name) }}</td>
									<td>{{ capitalize.words(customer.address) }}</td>
									<td>{{ customer.phone }}</td>
								</tr>

							</tbody>
						</table>
				</div>
				<div class="modal-footer border-0 d-block shadow-lg">
					<div class="row">
						<div class="col px-0">
							<input type="text" placeholder="Ketik disini untuk mencari ..." autofocus class="form-control mb-3" id="searchCustomerInput">
						</div>
						<div class="col-3 text-end px-0">
							<button 
								type="button" 
								class="btn me-3 px-3" 
								:class="!choosenCustomer.id ? 'disabled btn-secondary' : 'btn-primary'"
								data-bs-dismiss="modal"
								@click="indexStore.choosenRentCustomer = choosenCustomer"
								>
								Pilih
							</button>
							<button 
								type="button" 
								class="btn btn-secondary" 
								data-bs-dismiss="modal"
								@click="choosenCustomer = indexStore.choosenRentCustomer"
								>
									Batal
							</button>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>