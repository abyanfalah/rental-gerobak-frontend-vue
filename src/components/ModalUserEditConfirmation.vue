<script setup>
import router from "../router";
import authService from "../service/modules/authService";
import { useAuthStore } from "../stores/auth";

const emit = defineEmits(['userEditConfirm'])
</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalUserEditConfirmation" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header bg-primary text-white">
					<h5 class="modal-title">Konfirmasi</h5>
				</div>
				<div class="modal-body">
					Simpan perubahan?
				</div>
				<div class="modal-footer border-0">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
					<button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="emit('userEditConfirm')">Ya, simpan</button>
				</div>
			</div>
		</div>
	</div>
</template>