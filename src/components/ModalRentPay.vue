<script setup>
import { useIndexStore } from '../stores';

const indexStore = useIndexStore()

function getTotalAmount() {
	const detail = indexStore.choosenRent.detail
	const arrOfSubAmount = detail.map((detail) => detail.sub_amount)
	return arrOfSubAmount.reduce((a,b) => a+b)
}
</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalRentPay">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header bg-primary text-white">
					<h5 class="modal-title" id="exampleModalLabel">Pembayaran</h5>
				</div>
				<div class="modal-body">
					<!-- <h1>Daftar detail</h1> -->
					<table v-if="indexStore.choosenRent.detail" class="table table-bordered table-striped">
						<thead>
							<tr>
								<th>#</th>
								<th>Kode gerobak</th>
								<!-- <th>Tarif</th>
								<th>Durasi</th> -->
								<th>Subtotal</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(detail, index) in indexStore.choosenRent.detail">
								<td>{{ ++index }}</td>
								<td>{{ detail.code }}</td>
								<td class="text-end">{{ detail.sub_amount }}</td>
							</tr>

							<tr class="bg-primary text-white border-0 text-end">
								<td colspan="2" class="text-center fw-bold">Total</td>
								<td class="text-end fw-bold">Rp {{ getTotalAmount() }}</td>
							</tr>
						</tbody>
					</table>	
					<!-- <p>{{ indexStore.choosenRent }}</p> -->
				</div>
				<div class="modal-footer border-0">
					<button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Bayar semua</button>
					<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Bayar</button>
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
				</div>
			</div>
		</div>
	</div>
</template>