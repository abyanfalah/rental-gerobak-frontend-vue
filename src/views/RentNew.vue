<script setup>
import capitalize from 'capitalize';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ButtonBack from '../components/ButtonBack.vue';
import ModalCustomerSelect from '../components/ModalCustomerSelect.vue';
import ModalGerobakSelect from '../components/ModalGerobakSelect.vue';
import gerobakService from '../service/modules/gerobakService';
import { useIndexStore } from '../stores';


const indexStore = useIndexStore()
const gerobakList = ref([])

onMounted(async () => {
	gerobakList.value = (await gerobakService.getAll()).data.data
})

onBeforeUnmount(() => {
	indexStore.choosenRentCustomer = {}
})
</script>

<template>
	<div>
		<div class="row">
			<div class="col d-flex justify-content-between">
				<h1>Penyewaan baru</h1>
				<ButtonBack />
			</div>
		</div>

		<!-- detail row -->
		<div class="row">

			<!-- detail column -->
			<div class="col-md-6">
				<div class="card sticky-top">
					<div class="card-header d-flex justify-content-between align-items-center">
								<h4 class="text-muted m-0">Penyewa</h4>

								<button class="btn btn-primary shadow" data-bs-toggle="modal" data-bs-target="#modalCustomerSelect">Pilih penyewa <span v-if="indexStore.choosenRentCustomer.id">lain</span></button>
					</div>
					<div class="card-body">
						<div class="row" v-if="indexStore.choosenRentCustomer.id">
							<div class="col">
								<h3>{{ capitalize.words(indexStore.choosenRentCustomer.name) }}</h3>
								<span class="d-block">{{ capitalize.words(indexStore.choosenRentCustomer.address)}}</span>
								<span class="d-block">{{ indexStore.choosenRentCustomer.phone}}</span>
								<small class="font-monospace badge text-dark ps-0">{{ indexStore.choosenRentCustomer.id}}</small>
							</div>
						</div>
						
					</div>
				</div>
			</div>

			<!-- gerobak select column -->
			<div class="col">
				<div class="card" v-if="indexStore.choosenRentCustomer.id">
					<div class="card-header d-flex justify-content-between align-items-center">
						<h4 class="text-muted m-0">Gerobak</h4>
						<button class="btn btn-primary shadow" data-bs-toggle="modal" data-bs-target="#modalGerobakSelect">Tambah gerobak</button>
					</div>

					<div class="card-body">
						<div class="row">
							<div class="col-6 mb-3">
								<div class="card" v-if="false">
									<div class="card-body">
										<!-- terpilih gerobak disini -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- {{ indexStore.choosenRentCustomer }} -->

	<ModalCustomerSelect />
	<ModalGerobakSelect />
</template>