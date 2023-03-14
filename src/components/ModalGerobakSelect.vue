<script setup>
import { useIndexStore } from '../stores';
import { onMounted, ref } from 'vue';
import capitalize from 'capitalize';
import gerobakService from '../service/modules/gerobakService';

const indexStore = useIndexStore()
const gerobakList = ref([])
const choosenGerobakList = ref([])
const previouslyChoosenGerobakList = ref([])



function toggleGerobakAgainstList(gerobak) {
	if (gerobak.status.toLowerCase() !== 'ada') return;

	if(!choosenGerobakList.value.includes(gerobak)){
		choosenGerobakList.value.push(gerobak)
		// console.log(choosenGerobakList.value)
		return
	}

	removeGerobakFromList(gerobak)
}

function removeGerobakFromList(gerobak) {
	const foundIndex = choosenGerobakList.value.indexOf(gerobak)
	if (foundIndex < 0) {
		return false
	}
	choosenGerobakList.value.splice(foundIndex, 1);
}

function saveChanges() {
	indexStore.choosenGerobakList = []	
	Object.assign(indexStore.choosenGerobakList, choosenGerobakList.value)	

	previouslyChoosenGerobakList.value = []
	Object.assign(previouslyChoosenGerobakList.value, choosenGerobakList.value)	

}

function revertChanges() {
	choosenGerobakList.value = []
	Object.assign(choosenGerobakList.value, previouslyChoosenGerobakList.value)
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
							<table class="table table-bordered table-hover ">
								<thead>
									<tr>
										<th class="col-1 text-center">#</th>
										<th>Kode gerobak</th>
									</tr>
								</thead>
								<tbody>
									<tr 
										v-for="(gerobak, index) in gerobakList"
										@click="toggleGerobakAgainstList(gerobak)" 
										:class="{
											'bg-primary text-white': choosenGerobakList.includes(gerobak), 'disabled bg-secondary text-white': gerobak.status.toLowerCase() !== 'ada'}" 
										>
										<td class="col-1 text-center">{{ ++index }}</td>
										<td>{{ gerobak.code }}</td>
									</tr>
								</tbody>
							</table>
						</div>

						<!-- choosen gerobak list -->
						<div class="col">
							<div class="sticky-top top-0">
								<small class="text-muted d-block text-end">
									
									<span v-if="choosenGerobakList.length">Klik untuk menghapus</span>
									<span v-else>&nbsp;</span>
								</small>
								<table class="table table-bordered table-hover">
									<thead>
										<tr>
											<th class="col-1 text-center">#</th>
											<th>Gerobak terpilih</th>
										</tr>
									</thead>
									<tbody>
										<tr 
											v-for="(gerobak, index) in choosenGerobakList"
											@click="removeGerobakFromList(gerobak)" 
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
				<div class="modal-footer border-0 shadow-lg">
					<div class="row w-100">
						<div class="col px-0">
							<input type="text" placeholder="Ketik disini untuk mencari ... (COMING SOON)" autofocus class="form-control mb-3" id="searchCustomerInput">
						</div>
						<div class="col-5 text-end px-0	">
							<button 
								type="button" 
								class="btn btn-danger px-3 me-1 disabled" 

								data-bs-dismiss="modal"
								@click=""
								>
									Reset
							</button>

							<button 
								type="button" 
								class="btn btn-primary px-3 me-1" 

								data-bs-dismiss="modal"
								@click="saveChanges()"
								>
									Simpan
							</button>

							<button 
								type="button" 
								class="btn btn-secondary px-4" 
								data-bs-dismiss="modal"
								@click="revertChanges()"
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