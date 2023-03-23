<script setup>
import capitalize from "capitalize";
import { onMounted, ref } from "vue";
import rentService from "../service/modules/rentService";
import dateTimeService from "../service/modules/dateTimeService";
import { useIndexStore } from "../stores";
import ModalRentPay from "../components/ModalRentPay.vue";
import customerService from "../service/modules/customerService";

const getDateTime = dateTimeService.getReadableDateTime
const indexStore = useIndexStore()

const rentList = ref();
const customerList = ref()
const error = ref(false)
const choosenRent = ref({})


async function getRent() {
  try {
    const response = await rentService.getAll();
		error.value = false
		rentList.value = response.data.data;
  } catch (err) {
		error.value = true
    console.error(err);
  }
}

const getColorByStatus = rentService.getColorByStatus

function showRent(rent) {
	choosenRent.value = rent
	indexStore.choosenRent = rent
}

const searchQuery = ref()
function filter() {
	console.log(`looking for ${searchQuery.value}`)
	alert("coming soon")
}

onMounted( async () => {
	getRent();

	customerList.value = await customerService.getAll()
});
</script>

<template>
		<div>
		<div class="row">
			<div class="col">
				<h1>Rental</h1>
			</div>
			<div class="col text-end">
				<RouterLink class="btn btn-success shadow-sm" to="/rent/new">
					Tambah rental baru
					<i class="bi-plus"></i>
				</RouterLink>
			</div>
		</div>

		<div class="row">

			<!-- rent table column -->
			<div class="col-md-7">
				<div class="card">
					<div class="card-header d-flex justify-content-between align-items-center">
						<span>Tabel rental</span>

						<div>
							<!-- search bar -->
							<div class="input-group">
								<input
								type="text" 
								list="customers"
								v-model="searchQuery"
								@keyup="filter()"
								class="form-control" 
								placeholder="Ketik disini untuk mencari (coming soon)">
								<datalist id="customers">
									<option v-for="customer in customerList" :value="customer.name">{{ customer.name }}</option>
								</datalist>

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
									<th>Tanggal</th>
									<th>Waktu</th>
									<th>Penyewa</th>
									<th>Qty</th>
									<th>Status</th>
								</tr>
							</thead>

							<tbody>
								<tr
									:class="{'bg-dark text-white' : rent.id == choosenRent.id}" 
									@click="showRent(rent)" v-for="(rent, index) in rentList">
									<td >{{ ++index }}</td>
									<td>{{ getDateTime(rent.created_at).noDayDate }}</td>
									<td>{{ getDateTime(rent.created_at).time }}</td>
									<td>{{ capitalize.words(rent.customer) }}</td>
									<td class="text-center">{{ rent.detail.length }}</td>
									<td>
										<span 
											class="badge"
											:class="`bg-${getColorByStatus(rent.status)}`"
										>
											{{ rent.status }}
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

	

			<!-- rent detail column -->
			<div class="col">
				<div class="card sticky-top" v-if="choosenRent.id">
					<div class="card-header d-flex justify-content-around">
						Detail rent
						<small class="ms-auto">
							<button class="btn-close" @click="choosenRent = {}"></button>
						</small>
					</div>
					<div class="card-body p-4">

						<div class="row mb-3">
							<div class="col-md-4 text-muted">ID</div>
							<div class="col"><small class="font-monospace">{{ choosenRent.id }}</small></div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Penyewa</div>
							<div class="col">{{ capitalize.words(choosenRent.customer) }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Lokasi</div>
							<div class="col">{{ capitalize(choosenRent.location) }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Start</div>
							<div class="col">{{ getDateTime(choosenRent.created_at).full() }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Pembayaran terakhir</div>
							<div class="col">
								<span v-if="choosenRent.last_payment_at != null">
									{{ getDateTime(choosenRent.last_payment_at).full() }}
								</span>
								<span v-else>-</span>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Status</div>
							<div class="col">
								<span 
											class="badge"
											:class="`bg-${getColorByStatus(choosenRent.status)}`"
										>
											{{ choosenRent.status }}
										</span>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Gerobak ({{ choosenRent.detail.length }})</div>
							<div class="col">
								<span v-for="(detail,index) in choosenRent.detail">
									<span v-if="index < 4">
										<span>{{ detail.code }}</span>
										<span v-if="index < choosenRent.detail.length - 1"> | </span>
									</span>
									<span v-else> ...</span>
								</span>
							</div>
						</div>

						


						<div class="row mb-3">
							<div class="col text-end">
								<button v-if="choosenRent.status.toLowerCase() !== 'ok'" class="btn btn-primary ms-1" data-bs-toggle="modal" data-bs-target="#modalRentPay">
									<i class="bi-currency-dollar"></i>
									Bayar
								</button>
								
								<router-link class="btn btn-secondary ms-1" :to="`rent/${choosenRent.id}`">
									<i class="bi-list"></i>
									Lihat detail
								</router-link>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- <div v-if="choosenRent.id">{{ choosenRent }}</div> -->

	<ModalRentPay @payment-success="getRent()" />
</template>
