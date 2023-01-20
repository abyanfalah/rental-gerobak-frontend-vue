<script setup>
import capitalize from "capitalize";
import { onBeforeMount, onMounted, ref } from "vue";
import customerService from "../service/modules/customerService";
import dateTimeService from "../service/modules/dateTimeService";
import { useIndexStore } from "../stores";
import ModalCustomerDelete from "../components/ModalCustomerDelete.vue"

const getDateTime = dateTimeService.getReadableDateTime
const indexStore = useIndexStore()

const customerList = ref();
const error = ref(false)
const choosenCustomer = ref({})

async function getCustomer() {
  try {
    const response = await customerService.getAll();
		error.value = false
    customerList.value = response.data.data;
  } catch (err) {
    console.error(err);
		error.value = true
  }
}

function showCustomer(customer) {
	choosenCustomer.value = customer
	indexStore.choosenCustomer = customer
}

onBeforeMount(() => {
  getCustomer();
});
</script>

<template>
	<div>
		<div class="row">
			<div class="col">
				<h1>Tabel customer</h1>
			</div>
			<div class="col text-end">
				<RouterLink class="btn btn-success shadow-sm" to="/customer">
					Tambah customer baru
					<i class="bi-plus"></i>
				</RouterLink>
			</div>
		</div>

		<div class="row">

			<!-- customer table column -->
			<div class="col-md-6">
				<div class="card">
					<div class="card-body">
						<p class="text-center muted" v-if="error">Error: cannot fetch data.</p>
						<table v-else class="table table-sm table-hover">
							<thead>
								<tr>
									<th>#</th>
									<th>Nama</th>
									<th>Telpon</th>
								</tr>
							</thead>

							<tbody>
								<tr @click="showCustomer(customer)" v-for="(customer, index) in customerList">
									<td>{{ ++index }}</td>
									<td>{{ capitalize.words(customer.name) }}</td>
									<td>{{ customer.phone }}</td>
								</tr>
								
								<tr class="">
									<td colspan="3">
										<RouterLink class="btn btn-success d-block" to="/customer/registration">
											Tambah customer baru
											<i class="bi-plus"></i>
										</RouterLink>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- customer detail column -->
			<div class="col-md-6">
				<div class="card sticky-top" v-if="choosenCustomer.id">
					<div class="card-header d-flex justify-content-around">
						Detail customer
						<small class="ms-auto">
							<button class="btn-close" @click="choosenCustomer = {}"></button>
						</small>
					</div>
					<div class="card-body p-4">
						<div class="row mb-3">
							<div class="col-md-4 text-muted">ID</div>
							<div class="col"><small>{{ choosenCustomer.id }}</small></div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Nama</div>
							<div class="col">{{ choosenCustomer.name }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Alamat</div>
							<div class="col">{{ choosenCustomer.address }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Telepon</div>
							<div class="col">{{ choosenCustomer.phone }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Dibuat</div>
							<div class="col">{{ getDateTime(choosenCustomer.created_at).full() }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Update terakhir</div>
							<div class="col">{{ choosenCustomer.updated_at ? getDateTime(choosenCustomer.updated_at).full() : '-' }}</div>
						</div>

						<div class="row">
							<div class="col text-end">
								<button class="btn btn-warning ms-1" data-bs-toggle="modal" data-bs-target="#modalCustomerEdit">
									<i class="bi-pencil"></i>
									Edit
								</button>

								<button class="btn btn-danger ms-1" data-bs-toggle="modal" data-bs-target="#modalCustomerDelete">
									<i class="bi-trash"></i>
									Hapus
								</button>

								
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>

	<div v-if="choosenCustomer.id">
		{{ choosenCustomer }}
	</div>


	<ModalCustomerDelete @customer-delete-success="getCustomer"/>
</template>