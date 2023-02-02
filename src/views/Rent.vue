<script setup>
import capitalize from "capitalize";
import { onMounted, ref } from "vue";
import rentService from "../service/modules/rentService";
import dateTimeService from "../service/modules/dateTimeService";
import { useIndexStore } from "../stores";
import ModalRentPay from "../components/ModalRentPay.vue";

const getDateTime = dateTimeService.getReadableDateTime
const indexStore = useIndexStore()

const rentList = ref();
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

function getBadgeColor(rentStatus) {
	const colors = {
		ok: "success",
		berlangsung: "primary",
		partial: "warning"
	}

	return colors[rentStatus.toLowerCase()];
}

function getTextColor(rentStatus) {
	if (rentStatus.toLowerCase() !== "partial") {
		return "text-white"
	} else {
		return null
	}
}

function showRent(rent) {
	choosenRent.value = rent
	indexStore.choosenRent = rent
}


onMounted(() => {
	getRent();
});
</script>

<template>
		<div>
		<div class="row">
			<div class="col">
				<h1>Tabel rental</h1>
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
			<div class="col-md-6">
				<div class="card">
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
								<tr @click="showRent(rent)" v-for="(rent, index) in rentList">
									<td class="text-muted">{{ ++index }}</td>
									<td>{{ getDateTime(rent.created_at).noDayDate }}</td>
									<td>{{ getDateTime(rent.created_at).time }}</td>
									<td>{{ capitalize.words(rent.customer) }}</td>
									<td class="text-center">{{ rent.detail.length }}</td>
									<td>
										<span 
											class="badge"
											:class="`bg-${getBadgeColor(rent.status)}`"
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
											:class="`bg-${getBadgeColor(choosenRent.status)}`"
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
<!-- 					
						<div class="row" v-if="choosenRent.rentname != 'admin'">
							<div class="col text-end">

								<button class="btn me-1" :class="choosenRent.access == 'admin' ? 'btn-primary': 'btn-success'" v-if="authStore.isAdmin">
									<div v-if="choosenRent.access !== 'admin'">
										<i class="bi-person-check-fill"></i>
										Jadikan sebagai admin
									</div>

									<div v-else>
										<i class="bi-person-x-fill"></i>
										Cabut akses admin
									</div>
									
								</button>

								<RouterLink to="/rent/edit" class="btn btn-warning">
									<i class="bi-pencil"></i>
									Edit
								</RouterLink>

								<button class="btn btn-danger ms-1" data-bs-toggle="modal" data-bs-target="#modalRentDelete">
									<i class="bi-trash"></i>
									Hapus
								</button>

								
							</div>
						</div> -->

					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- <div v-if="choosenRent.id">{{ choosenRent }}</div> -->

	<ModalRentPay />
</template>
