<script setup>
import capitalize from 'capitalize';
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import ButtonBack from '../components/ButtonBack.vue';
import ModalCustomerSelect from '../components/ModalCustomerSelect.vue';
import ModalGerobakSelect from '../components/ModalGerobakSelect.vue';
import customerService from '../service/modules/customerService';
import rentService from '../service/modules/rentService';
import { useIndexStore } from '../stores';
import router from '../router'

const indexStore = useIndexStore()
const rentLocation = ref("")
const additionalNotes = ref("")

function isEmptyChoosenGerobak() {
	return indexStore.choosenGerobakList.length < 1
}

async function confirmRent() {
	try {
		const rentData = {	
			gerobak_list : indexStore.choosenGerobakList.map((gerobak) => gerobak.id),
			customer_id : indexStore.choosenRentCustomer.id,
			location : rentLocation.value,
			note : additionalNotes.value,
		}
	
		const response = await rentService.create(rentData)
	
		if (response.status == 200) {
			router.push('/dashboard')
			indexStore.actionSuccessMessage = "Penyewaan baru berhasil dibuat!"
		} else {
			indexStore.actionErrorMessage = "Gagal membuat penyewaan baru"
		}
		
	} catch {
		indexStore.error =  "Gagal membuat penyewaan baru"
	}



}

onBeforeMount(async () => {

})

onBeforeUnmount(() => {
	indexStore.choosenRentCustomer = {}
	indexStore.choosenGerobakList = []
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
			<!-- customer column -->
			<div class="col-md-6">
				<div class="sticky-top">
					<!-- penyewa card -->
					<div class="row mb-3">
						<div class="col">
							<div class="card">
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
					</div>
	
					<!-- detail -->
					<div class="row mb-3">
						<div class="col">
							<div class="card" v-if="indexStore.choosenRentCustomer.id">
								<div class="card-header">Detail tambahan</div>
								<div class="card-body">

									<!-- lokasi peminjaman -->
									<div class="form-floating mb-3">
										<textarea v-model="rentLocation" class="form-control" placeholder="Masukkan lokasi peminjaman" rows="10" cols="20" id="floatingTextarea"></textarea>
										<label for="floatingTextarea">Lokasi peminjaman</label>
										<div class="form-text">opsional</div>
									</div>
	
									<!-- catatan tambahan -->
									<div class="form-floating mb-3">
										<textarea v-model="additionalNotes"  class="form-control" placeholder="Catatan tambahan" rows="10" cols="20" id="floatingTextarea"></textarea>
										<label for="floatingTextarea">Catatan tambahan</label>
										<div class="form-text">opsional</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="row mb-3">
						<div class="col" v-if="indexStore.choosenRentCustomer.id">
							<button 
								class="btn btn-lg btn-outline-success w-100 py-3"
								:class="{'disabled' : isEmptyChoosenGerobak()}"
								@click="confirmRent()"
							
								>
								<i class="bi-check-square-fill"></i>
								Konfirmasi penyewaan
							</button>
							<small v-if="isEmptyChoosenGerobak()" class="text-muted d-block">Daftar gerobak masih kosong!</small>
						</div>
					</div>

				</div>
			</div>

			<!-- gerobak select column -->
			<div class="col">
				<div class="card" v-if="indexStore.choosenRentCustomer.id">
					<div class="card-header d-flex justify-content-between align-items-center">
						<h4 class="text-muted m-0">Gerobak <span v-if="indexStore.choosenGerobakList.length">({{ indexStore.choosenGerobakList.length }})</span></h4>
						<button class="btn btn-primary shadow" data-bs-toggle="modal" data-bs-target="#modalGerobakSelect">
							<span v-if="indexStore.choosenGerobakList.length > 0">Tambah</span>
							<span v-else>Pilih</span>
							gerobak
							</button>
					</div>

					<div class="card-body">
						<table class="table table-bordered table-hover">
							<thead>
								<tr>
									<th class="col-1 text-center">#</th>
									<th>Kode gerobak</th>
								</tr>
							</thead>
							<tbody>
								<tr 
									v-for="(gerobak, index) in indexStore.choosenGerobakList"
									>
									<td class="col-1 text-center">{{ ++index }}</td>
									<td>{{ gerobak.code }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- {{ indexStore.choosenRentCustomer }} -->

	<ModalCustomerSelect />
	<ModalGerobakSelect />
</template>