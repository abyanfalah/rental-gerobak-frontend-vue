<script setup>
import router from "../router";
import authService from "../service/modules/authService";
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();

async function logout() {
  try {
    const response = await authService.logout();
    if (response.status == 200) {
			authStore.isAuthenticated = false;
			console.log("logout success");
      router.push("/login");
    }
  } catch (err) {
    console.error(err);

		// TODO: REMOVE FAKE LOGIC BELOW
    authStore.isAuthenticated = false;
    router.push("/login");
  }
}
</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalLogout" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header bg-danger text-white">
					<h5 class="modal-title" id="exampleModalLabel">Logout</h5>
				</div>
				<div class="modal-body">
					Anda yakin ingin logout?
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="logout">Ya, keluar</button>
				</div>
			</div>
		</div>
	</div>
</template>