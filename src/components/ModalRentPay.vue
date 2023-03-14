<script setup>
import { useIndexStore } from '../stores';
import numeral from 'numeral'
import { ref } from 'vue';
import rentService from '../service/modules/rentService'

const emit = defineEmits([
	'paymentSuccess',
	'paymentFailed'
])

const indexStore = useIndexStore()

const transactionSuccess = ref(false)
const errorMessage = ref()
const isError = ref(false)
const customerMoney = ref(0)
const customerMoneyInput = ref(null)

function setMoneyRight() {
	const total = getTotalAmount()
	customerMoney.value = total;
	customerMoneyInput.value.value = total;
}

function setCustomerMoney() {
	const input = customerMoneyInput.value.value
	if (input.length < 1) {
		isError.value = true
		errorMessage.value = "Isi nominal pembayaran!";
	} 

	if (parseInt(input) < getTotalAmount()) {
		isError.value = true
		errorMessage.value = "Nominal tidak mencukupi!";
	} else {
		isError.value = false
	}

	customerMoney.value = input
}

function getTotalAmount() {
	const rentDetails = indexStore.choosenRent.detail
	const arrOfSubAmount = rentDetails.map((detail) => detail.sub_amount)
	const value = arrOfSubAmount.reduce((a, b) => a + b)
	return value
}

const isShownMoneyInput = ref(false)

async function payment() {
	if ((typeof customerMoney.value) == 'undefined') {
		isError.value = true
		errorMessage.value = "Isi nominal pembayaran!";
		return false;
	}

	if (parseInt(customerMoney.value) < getTotalAmount()) {
		isError.value = true
		errorMessage.value = "Nominal tidak mencukupi!"
		return false
	}

	const rent = indexStore.choosenRent
	const rentDetails = indexStore.choosenRent.detail

	const response = await rentService.payAll(rent.id)
	return response.status == 200
}

async function payAllHandler() {
	if (!isShownMoneyInput.value) {
		isShownMoneyInput.value = true
		return
	}

	const paymentValid = await payment()
	if(!paymentValid) return console.error(errorMessage.value) 
	
	transactionSuccess.value = true;
}

function clearPaymentProcess() {
	customerMoney.value = 0
	customerMoneyInput.value = null
	isShownMoneyInput.value = false
	isError.value = false;
	errorMessage.value = null
}

function closePayment() {
	clearPaymentProcess()
	indexStore.choosenRent = Object.assign({});
	indexStore.actionSuccessMessage = "Pembayaran berhasil!";
	transactionSuccess.value = false;
	emit('paymentSuccess')
}



</script>

<template>
	<div v-if="indexStore.choosenRent">
		<div class="modal fade" data-bs-backdrop="static" id="modalRentPay">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header text-white" :class="transactionSuccess ? 'bg-success' : 'bg-primary'">
						<h5 class="modal-title" id="exampleModalLabel">Pembayaran</h5>
					</div>
					<div class="modal-body">

						<!-- payment process body -->
						<div v-if="!transactionSuccess">
							<!-- Rent detail -->
							<div>
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
											<td class="text-end">{{ numeral(detail.sub_amount).format('0,0') }}</td>
										</tr>
			
										<tr class="bg-primary text-white border-0 text-end">
											<td colspan="2" class="text-center fw-bold">Total</td>
											<td class="text-end fw-bold">Rp {{ numeral(getTotalAmount()).format('0,0') }}</td>
										</tr>
									</tbody>
								</table>	
							</div>
	
							<!-- money input -->
							<div v-if="isShownMoneyInput">
								<div class="row">
									<div class="col d-flex flex-column">
										<label>Nominal pembayaran</label>

										<div class="d-flex flex-row">
											<button class="btn btn-success me-3" @click="setMoneyRight()">Uang pas</button>
											<input class="form-control text-end w-75" type="text" ref="customerMoneyInput" onkeypress="return /\d/.test(event.key)" @keyup="setCustomerMoney()">
										</div>
										<div class="align-self-end">
											<small v-if="isError" class="text-danger mt-1 ">{{ errorMessage }}</small>

											<small v-else-if="customerMoney > 0" class="text-primary">
												Kembali: 
												Rp {{ numeral(parseInt(customerMoney) - getTotalAmount() ).format(0,0)}}
											</small>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- transaction success body -->
						<div v-else class="card text-success border-0">
							<div class="card-body d-flex justify-content-center align-items-center flex-column">
								<span class="display-1">
									<i class="bi-check-circle"></i>
								</span>
								<span class="h1">Transaksi berhasil!</span>
							</div>
						</div>
					</div>

					<!-- payment process footer -->
					<div v-if="!transactionSuccess" class="modal-footer border-0">
						<button v-if="isShownMoneyInput" type="button" class="btn btn-outline-success" :class="{'disabled' : customerMoney < getTotalAmount()}" @click="payAllHandler()">Konfirmasi</button>

						<button 
							v-if="isShownMoneyInput" 
							class="btn btn-warning text-dark"
							@click="clearPaymentProcess()"
							>
								Kembali
						</button>
						
						<button 
							v-else 
							class="btn btn-primary" 
							@click="isShownMoneyInput = true"
							>
								Bayar
						</button>

						<button class="btn btn-secondary" data-bs-dismiss="modal" @click="clearPaymentProcess()">Batal</button>		
					</div>
					
					<!-- transaction success footer -->
					<div v-else class="modal-footer border-0">
						<button
							@click="closePayment()" 
							class="btn btn-outline-success fw-bold px-5"
							data-bs-dismiss="modal"
							>
							OK
						</button>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>