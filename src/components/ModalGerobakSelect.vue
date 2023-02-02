<script setup>
import { useIndexStore } from '../stores';
import { onMounted, ref } from 'vue';
import capitalize from 'capitalize';
import gerobakService from '../service/modules/gerobakService';

const indexStore = useIndexStore()
const gerobakList = ref([])
const choosenGerobakList = ref([])


function addGerobakToList(gerobak) {
	choosenGerobakList.value.push(gerobak)
	console.log(gerobakList.value)
}

onMounted(async () => {
	gerobakList.value = (await gerobakService.getAll()).data.data
});


</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalGerobakSelect">
		<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content">
				<div class="modal-header bg-primary text-white shadow-sm">
					<h5 class="modal-title">Pilih gerobak</h5>
				</div>
				<div class="modal-body">
					<div class="row">
						<div class="col">
							<!-- gerobak list -->
							<table class="table table-bordered table-hover">
								<thead>
									<tr>
										<th class="col-1 text-center">#</th>
										<th>Kode gerobak</th>
										<!-- <th>Tipe</th> -->
									</tr>
								</thead>
								<tbody>
									<tr v-for="(gerobak, index) in gerobakList">
										<td class="col-1 text-center text-muted">{{ ++index }}</td>
										<td>{{ gerobak.code }}</td>
										<!-- <td>{{ gerobak.type }}</td> -->
									</tr>
								</tbody>
							</table>
						</div>

						<div class="col">
							<div class="card sticky-top top-0">
								<div class="card-body">
									teprilih
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="modal-footer border-0 shadow-lg">
					<div class="row w-100">
						<div class="col px-0">
							<input type="text" placeholder="Ketik disini untuk mencari ..." autofocus class="form-control mb-3" id="searchCustomerInput">
						</div>
						<div class="col-3 text-end px-0	">
							<button 
								type="button" 
								class="btn btn-primary px-3 me-1" 

								data-bs-dismiss="modal"
								@click=""
								>
									Simpan
							</button>

							<button 
								type="button" 
								class="btn btn-secondary px-4" 
								data-bs-dismiss="modal"
								@click=""
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