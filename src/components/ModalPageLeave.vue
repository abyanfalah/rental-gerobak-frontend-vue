<script setup>
import router from "../router";
import authService from "../service/modules/authService";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();

async function logout() {
  try {
			await authService.logout();
			authStore.isAuthenticated = false;
			authStore.user = null;
			console.log("logout success");
      router.push("/login");
  } catch (err) {
    console.error(err);

		// TODO: REMOVE FAKE LOGIC BELOW
    authStore.isAuthenticated = false;
    router.push("/login");
  }
}
</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalPageLeave" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header bg-danger text-white">
					<h5 class="modal-title" id="exampleModalLabel">Tinggalkan halaman?</h5>
				</div>
				<div class="modal-body">
					Perubahan yang belum tersimpan akan hilang.
					Anda yakin meninggalkan halaman? 
				</div>
				<div class="modal-footer border-0">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="logout">Ya, keluar</button>
				</div>
			</div>
		</div>
	</div>
</template>