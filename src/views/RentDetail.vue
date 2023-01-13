<script setup>
import capitalize from 'capitalize';
import { onBeforeMount, ref } from 'vue';
import customerService from '../service/modules/customerService';
import rentService from '../service/modules/rentService';
import userService from '../service/modules/userService';
import ButtonBack from "../components/ButtonBack.vue";
import dateTimeService from "../service/modules/dateTimeService";


const getDateTime = dateTimeService.getReadableDateTime
const props = defineProps(['id'])
const rent = ref({})

async function getRent() {
	try {
		rent.value = (await rentService.getById(props.id)).data.data
		rent.value.customer = (await customerService.getById(rent.value.customer_id)).data.data
		rent.value.user = (await userService.getById(rent.value.user_id)).data.data
		// console.log(rent.value)
	}catch (err) {
		console.error(err)
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
	const colors = {
		ok: "white",
	}

	return colors[rentStatus.toLowerCase()] ?? null;
}


onBeforeMount(() => {
	getRent()
})
</script>

<template>
	<div v-if="rent && rent.customer && rent.user && rent.detail">
		<div class="row">
			<div class="col d-flex justify-content-between align-items-center">
				<h1>Detail penyewaan</h1>
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


					</div>

						<!-- user's column -->
					<div class="col border-end">
						<div class="row">
							<div class="col">
								<small class="text-muted">
									User / kasir pertama
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
									User / kasir terakhir
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
														<span>
															{{ getDateTime(rent.created_at).time }} 
														</span> 
													</div>
												</span>
											</div>
										</div>
										
									</div>
									
									<!-- TODO: render conditional jika sudah lunas -->
									<!-- end time -->
									<div class="col">

										<div class="row">
											<div class="col">
												<small class="text-muted">Lunas</small>
											</div>
										</div>

										<div class="row">
											<div class="col">
												<span class="badge border text-dark p-2">
													<div class="d-flex flex-column text-start">
														<span class="mb-1">
															{{ getDateTime(rent.created_at).date }}
														</span> 
														<span>
															{{ getDateTime(rent.created_at).time }} 
														</span> 
													</div>
												</span>
											</div>
										</div>
										
									</div>

								</div>

							</div>

							<div class="mt-3">
								<small class="text-muted">Status</small>
								<p>
									<span class="badge fs-2" :class="`bg-${getBadgeColor(rent.status)}`">
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
								Daftar gerobak
								<button class="btn btn-success" v-if="rent.status !== 'OK'">Tambah gerobak</button>
							</div>
							<div class="card-body">
								<div class="row">
									<div class="col-6" v-for="(rentDetail, index) in rent.detail">
										<div class="card text-white" :class="`bg-${getBadgeColor(rentDetail.status)}`">
											<div class="card-body ">
												<div class="row">
													<div class="col fw-bold">
														{{ rentDetail.gerobak.code }}
													</div>
													<div class="col">
														<div class="row">
															<div class="col">
																	<small>
																		<small>
																			mulai
																		</small>
																	</small>
															</div>
														</div>
														
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="col-6" v-if="rent.status !== 'OK'">
											<div class="card border-0 shadow">
												<div class="card-body btn btn-outline-success ">
													<span>Tambah gerobak <strong>&plus;</strong></span>
												</div>
											</div>
									</div>
								</div>
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
	{{ rent }}
</template>