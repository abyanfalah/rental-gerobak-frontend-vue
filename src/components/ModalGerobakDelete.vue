<script setup>
import gerobakService from "../service/modules/gerobakService";
import { useIndexStore } from "../stores/index"

const emit = defineEmits(['gerobakDeleteSuccess', 'gerobakDeleteFailed'])

const indexStore = useIndexStore()

async function deleteGerobak() {
	const response = await gerobakService.delete(indexStore.choosenGerobak.id)
	console.log(response)
	if (response.status == 200) {
		console.log("success, go refresh")
		emit('gerobakDeleteSuccess')
	} else {
		// TODO: use proper modal (use modal error if u can)
		alert("gerobak delete failed")
	}
}


</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalGerobakDelete" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header bg-danger text-white fw-bold">Hapus gerobak?</div>
				<div class="modal-body">
					<p>Gerobak dengan data berikut akan dihapus. Data masih dapat di recover oleh admin.</p>
					<div class="px-5">
						<div class="row">
							<div class="col text-muted">ID</div>
							<div class="col fw-bold">{{ indexStore.choosenGerobak.id }}</div>
						</div>
						<div class="row bg-light">
							<div class="col text-muted">Kode</div>
							<div class="col fw-bold fs-3">{{ indexStore.choosenGerobak.code }}</div>
						</div>
					</div>
					
				</div>
				<div class="modal-footer border-0">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteGerobak">Ya, hapus</button>
				</div>
			</div>
		</div>
	</div>
</template>