<script setup>
import capitalize from 'capitalize';
import { onBeforeMount, onMounted, ref } from 'vue';
import customerService from '../service/modules/customerService';
import rentService from '../service/modules/rentService';
import userService from '../service/modules/userService';
import dateTimeService from "../service/modules/dateTimeService";
import router from '../router';

import ButtonBack from "../components/ButtonBack.vue";
import ModalRentPay from '../components/ModalRentPay.vue';
import ModalGerobakSelect from '../components/ModalGerobakSelect.vue';

import { useIndexStore } from '../stores';
import { onBeforeRouteLeave } from 'vue-router';


const getDateTime = dateTimeService.getReadableDateTime
const props = defineProps(['id'])
const indexStore = useIndexStore()

const rent = ref({})

async function getRent() {
	try {
		rent.value = (await rentService.getById(props.id)).data.data
		rent.value.customer = (await customerService.getById(rent.value.customer_id)).data.data
		rent.value.user = (await userService.getById(rent.value.user_id)).data.data

		indexStore.choosenRent = Object.assign({}, rent.value)
	}catch (err) {
		console.error(err)
	}
}

const getBadgeColorByStatus = rentService.getBadgeColorByStatus

async function updateSubAmounts() {
	console.log("update subamount")

	const subAmountList = (await rentService.getRentSubAmountList(rent.value.id)).data.data

	// console.log(rent.value.detail[0].sub_amount)

	const detailCount = rent.value.detail.length
	for (let i = 0; i < detailCount; i++){
		rent.value.detail[i].sub_amount = parseInt(subAmountList[i])
	}

	indexStore.choosenRent = Object.assign({}, rent.value)
}

onBeforeMount(() => {
	getRent()
})
onBeforeRouteLeave(() => {
	indexStore.choosenRent = Object.assign({})
})
</script>

<template>
	<div>
		<div v-if="rent && rent.customer && rent.user && rent.detail">
			<div class="row d-flex">
				<div class="col ">
					<h1>Detail rental</h1>
				</div>
				<div class="col d-flex justify-content-end">
					<div class="me-2">
						<button 
						v-if="rent.status != 'OK'"
						class="btn px-4 btn-primary" 
						@click="updateSubAmounts()" 
						data-bs-toggle="modal" 
						data-bs-target="#modalRentPay">Bayar</button>
					</div>
					<ButtonBack/>
				</div>
			</div>
			<div class="card shadow-sm">
				<div class="card-body">
	
					<!-- rent info row -->
					<div class="row">
	
						<!-- customer's column -->
						<div class="col border-end">
							<div class="row">
								<div class="col">
									<small class="text-muted">
										Penyewa
									</small>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<span class="fs-3">{{ capitalize.words(rent.customer.name) }}</span>
								</div>
							</div>
	
							<div class="row mt-3">
								<div class="col">
									<small class="text-muted">
										Alamat
									</small>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<span>{{ rent.customer.address }}</span>
								</div>
							</div>
	
							<div class="row mt-3">
								<div class="col">
									<small class="text-muted">
										Telepon
									</small>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<span>{{ rent.customer.phone }}</span>
								</div>
							</div>
	
							<div class="row mt-3">
								<div class="col">
									<small class="text-muted">
										Lokasi
									</small>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<span>{{ rent.location ?? "N/A" }}</span>
								</div>
							</div>
	
	
						</div>
	
							<!-- user's column -->
						<div class="col border-end">
							<div class="row">
								<div class="col">
									<small class="text-muted">
										Kasir pertama
									</small>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<span class="fs-3">{{ capitalize.words(rent.user.name) }}</span>
								</div>
							</div>
	
							<div class="row mt-3">
								<div class="col">
									<small class="text-muted">
										Pembayaran terakhir
									</small>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<span v-if="rent.last_payment_at">{{ getDateTime(rent.last_payment_at).full() }}</span>
									<span v-else>N/A</span>
								</div>
							</div>
	
							<div class="row mt-3">
								<div class="col">
									<small class="text-muted">
										Kasir terakhir
									</small>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<span>{{ capitalize.words(rent.user.name) }}</span>
								</div>
							</div>
						</div>
						
						<!-- detail column -->
						<div class="col-md-4 d-flex justify-content-start">
							<div>
	
								<div>
									<small class="text-muted">ID</small>
									<p>
										<small class="font-monospace">	{{ rent.id }}</small>
									</p>
								</div>
	
								<div>
									<!-- row waktu -->
									<div class="row">
										
										<!-- start time -->
										<div class="col">
	
											<div class="row">
												<div class="col">
													<small class="text-muted">Pinjam</small>
												</div>
											</div>
	
											<div class="row">
												<div class="col">
													<span class="badge border text-dark p-2">
														<div class="d-flex flex-column text-start">
															<span class="mb-1">
																{{ getDateTime(rent.created_at).date }}
															</span> 
															<span >
																{{ getDateTime(rent.created_at).time }} 
															</span> 
														</div>
													</span>
												</div>
											</div>
											
										</div>
										
										<!-- end time -->
										<div class="col">
	
											<div class="row">
												<div class="col">
													<small class="text-muted">Lunas</small>
												</div>
											</div>
	
											<div class="row" v-if="rent.status == 'OK'">
												<div class="col">
													<span class="badge border text-dark p-2">
														<div
															class="d-flex flex-column text-start">
																<span class="mb-1">
																	{{ getDateTime(rent.last_payment_at).date }}
																</span> 
																<span>
																	{{ getDateTime(rent.last_payment_at).time }} 
																</span> 
														</div>
													</span>
												</div>
											</div>
											
										</div>
	
									</div>
									<small class="text-muted">durasi ....</small>
								</div>
	
								<div class="mt-3">
									<small class="text-muted">Status</small>
									<p>
										<span class="badge fs-2" :class="`bg-${getBadgeColorByStatus(rent.status)}`">
											{{ rent.status }}
										</span>
									</p>
								</div>
	
	
							</div>
						</div>
					</div>
	
					<!-- gerobak list row -->
					<div class="row mt-3">
						<div class="col">
							<div class="card">
								<div class="card-header d-flex justify-content-between align-items-center">
									<span>
										Daftar gerobak 
										<span>({{ rent.detail.length }})</span>
									</span>
									
									
									<button class="btn btn-success" v-if="rent.status !== 'OK'" data-bs-toggle="modal" data-bs-target="#modalGerobakSelect">Tambah gerobak</button>
								</div>
								<div class="card-body">
									<table v-if="rent.detail.length" class="table table-sm table-hover table-bordered">
											<thead>
												<tr>
													<th>#</th>
													<th>Kode</th>
													<th>Start</th>
													<th>Finish</th>
													<th>Status</th>
												</tr>
											</thead>
	
											<tbody>
												<tr
													v-for="(detail, index) in rent.detail"
												>
													<td class="text-muted">{{ ++index }}</td>
													<td>{{ detail.code }}</td>
													<td>
														{{ getDateTime(detail.start_time).noDayDate }}&nbsp;
														{{ getDateTime(detail.start_time).time }}
													</td>
													<td>
														<span v-if="detail.status == 'OK'">
															{{ getDateTime(detail.end_time).noDayDate }}&nbsp;
															{{ getDateTime(detail.end_time).time }}
														</span>
														<span v-else>-</span>
													</td>
													<td>
														<span 
															class="badge"
															:class="`bg-${getBadgeColorByStatus(detail.status)}`"
															>
															{{ detail.status }}
														</span>
													</td>
												</tr>
											</tbody>
									</table>
								</div>
							</div>
						</div>
	
						<div class="col-4">
							<div class="card sticky-top">
								<div class="card-header">
									Riwayat pembayaran
								</div>
								<div class="card-body"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		
		<div v-else>
			<p>Error fetching rent data</p>
		</div>
	</div>

	{{ rent }}
	
	<ModalGerobakSelect />
	<ModalRentPay @payment-success="router.push('/dashboard')" />
</template>