<script setup>
import capitalize from "capitalize";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import customerService from "../service/modules/customerService";
import dateTimeService from "../service/modules/dateTimeService";
import { useIndexStore } from "../stores";
import ModalCustomerDelete from "../components/ModalCustomerDelete.vue"
import ModalCustomerAdd from "../components/ModalCustomerAdd.vue";
import ModalCustomerEdit from "../components/ModalCustomerEdit.vue";
import { useAuthStore } from "../stores/auth";

const getDateTime = dateTimeService.getReadableDateTime
const indexStore = useIndexStore()
const authStore = useAuthStore()

const customerList = ref();
const error = ref(false)
const choosenCustomer = ref({})

const filteredCustomerList = ref(false)
const searchQuery = ref()
const dataList = () => {
	return filteredCustomerList.value || customerList.value
}

async function getCustomerList() {
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

function handleSuccessEvents() {
	choosenCustomer.value = {}
	indexStore.choosenCustomer = {}
	getCustomerList()
}

function filter() {
	if (!searchQuery.value) {
		filteredCustomerList.value = false
		return
	}

	choosenCustomer.value = {}
	indexStore.choosenCustomer = {}

	filteredCustomerList.value = customerList.value.filter((Customer) => 
		Customer.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
		// || Customer.address.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
		|| Customer.phone.indexOf(searchQuery.value) > -1
	)
}

function clearFilter() {
	searchQuery.value = null
	filteredCustomerList.value = false
}

onBeforeMount(() => {
  getCustomerList();
});
</script>

<template>
	<div>
		<div class="row">
			<div class="col">
				<h1>Customer</h1>
			</div>
			<div class="col text-end">
				<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalCustomerAdd">
					Tambah customer baru
					<i class="bi-plus"></i>
				</button>
			</div>
		</div>

		<div class="row">

			<!-- customer table column -->
			<div class="col-md-6">
				<div class="card">
					<div class="card-header d-flex justify-content-between align-items-center">
						<span>Tabel customer</span>
						<div>
							<!-- search bar -->
							<div class="input-group">
								<input
								v-model="searchQuery"
								@keyup="filter()"
								class="form-control" type="text" placeholder="Ketik disini untuk mencari">
									<button class="btn" :class="{'btn-danger' : searchQuery}" type="button" @click="clearFilter">
											<i class="bi-x-lg"></i>
									</button>
							</div>
						</div>
					</div>
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
								<tr 
									@click="showCustomer(customer)" v-for="(customer, index) in dataList()"
									:class="{'bg-dark text-white' : choosenCustomer.id === customer.id}"
									>
									<td>{{ ++index }}</td>
									<td>{{ capitalize.words(customer.name) }}</td>
									<td>{{ customer.phone }}</td>
								</tr>
								
								<tr>
									<td colspan="3">
										<button class="btn btn-success d-block w-100" data-bs-toggle="modal" data-bs-target="#modalCustomerAdd">
											Tambah customer baru
											<i class="bi-plus"></i>
										</button>
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

						<div class="row" v-if="authStore.isAdmin">
							<div class="col text-end">
								<RouterLink class="btn btn-primary ms-1" to="/customer" >
									<i class="list"></i>
									Riwayat penyewaan
								</RouterLink>
								
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



	<ModalCustomerDelete @customer-delete-success="handleSuccessEvents"/>
	<ModalCustomerAdd @customer-add-success="handleSuccessEvents"/>
	<ModalCustomerEdit @customer-edit-success="handleSuccessEvents"/>
</template>