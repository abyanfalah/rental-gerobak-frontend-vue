<script setup>
import { getCurrentInstance } from "vue";
import router from "../router";
import userService from "../service/modules/userService";
import { useIndexStore } from "../stores/index"
const indexStore = useIndexStore()

async function deleteUser() {
	const response = await userService.delete(indexStore.choosenUser.id)
	console.log(response)
	if (response.status == 200) {
		console.log("success, go refresh")
		// router.push("/user")
		getCurrentInstance()?.proxy?.$forceUpdate();
	}
}


</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalUserDelete" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header bg-danger text-white fw-bold">Hapus user?</div>
				<div class="modal-body">
					<p>User dengan data berikut akan dihapus. Data masih dapat di recover oleh admin.</p>
					<div class="px-5">
						<div class="row bg-light">
							<div class="col text-muted">Nama</div>
							<div class="col fw-bold">{{ indexStore.choosenUser.name }}</div>
						</div>
						<div class="row">
							<div class="col text-muted">Username</div>
							<div class="col fw-bold">{{ indexStore.choosenUser.username }}</div>
						</div>
					</div>
					
				</div>
				<div class="modal-footer border-0">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteUser">Ya, hapus</button>
				</div>
			</div>
		</div>
	</div>
</template>