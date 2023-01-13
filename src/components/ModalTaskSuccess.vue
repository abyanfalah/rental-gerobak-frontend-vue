<script setup></script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalTaskSuccess" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content bg-success">
				<div class="modal-body">
					Anda yakin ingin logout?
				</div>
				<div class="modal-footer border-0">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
					<button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="logout">Ya, keluar</button>
				</div>
			</div>
		</div>
	</div>
</template>