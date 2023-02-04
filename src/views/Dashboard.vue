<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import capitalize from "capitalize";
import AlertWelcome from '../components/AlertWelcome.vue';
import dateTimeService from '../service/modules/dateTimeService';
import rentService from '../service/modules/rentService';
import { useIndexStore } from '../stores';
import { useAuthStore } from '../stores/auth';
import router from '../router';

const authStore = useAuthStore();
const indexStore = useIndexStore()
const getDateTime = dateTimeService.getReadableDateTime
const getBadgeColorByStatus = rentService.getBadgeColorByStatus

const ongoingRentList = ref([])
const todayRentList = ref([])

if (indexStore.justLoggedIn) {
	setTimeout(function () {
		indexStore.justLoggedIn = false;
	}, 2500)
}

function viewRent(rentId) {
	router.push(`/rent/${rentId}`)	
}

onBeforeMount( async () => {
	ongoingRentList.value = (await rentService.getOngoing()).data.data
	todayRentList.value = (await rentService.getToday()).data.data
	console.log(todayRentList.value)
})



</script>

<template>
  <h1>Dashboard</h1>
	<div class="row">

		<div class="col-md-7">
			<!-- rent berlangsung -->
			<div class="card shadow-sm-sm sticky-top">
				<div class="card-header bg-primary text-white">Penyewaan berlangsung</div>
				<div class="card-body">
					<table v-if="ongoingRentList.length" class="table table-sm table-hover">
							<thead>
								<tr>
									<th>#</th>
									<th>Tanggal</th>
									<th>Waktu</th>
									<th>Penyewa</th>
									<th>Qty</th>
								</tr>
							</thead>

							<tbody>
								<tr 
									@click="viewRent(rent.id)" v-for="(rent, index) in ongoingRentList"
								>
									<td class="text-muted">{{ ++index }}</td>
									<td>{{ getDateTime(rent.created_at).noDayDate }}</td>
									<td>{{ getDateTime(rent.created_at).time }}</td>
									<td>{{ capitalize.words(rent.customer) }}</td>
									<td>{{ rent.detail.length }}</td>
								</tr>
							</tbody>
					</table>

					<span v-else class="d-block-text-center text-muted">(Data kosong)</span>
				</div>
			</div>
		</div>

		<div class="col">
			<!-- rent hari ini -->
			<div class="card shadow-sm sticky-top">
				<div class="card-header">Penyewaan hari ini </div>
				<div class="card-body">
					<table v-if="todayRentList.length" class="table table-sm table-hover">
							<thead>
								<tr>
									<th>#</th>
									<!-- <th>Tanggal</th> -->
									<th>Waktu</th>
									<th>Penyewa</th>
									<th>Status</th>
								</tr>
							</thead>

							<tbody>
								<tr @click="viewRent(rent.id)" v-for="(rent, index) in todayRentList">
									<td class="text-muted">{{ ++index }}</td>
									<!-- <td>{{ getDateTime(rent.created_at).noDayDate }}</td> -->
									<td>{{ getDateTime(rent.created_at).time }}</td>
									<td>{{ capitalize.words(rent.customer) }}</td>
									<td>
										<span
											class="badge"
											:class="`bg-${getBadgeColorByStatus(rent.status)}`"
										>
											{{ rent.status }}
										</span>
									</td>
								</tr>
							</tbody>
					</table>

					<span v-else class="d-block-text-center text-muted">(Data kosong)</span>
				</div>
			</div>
		</div>

	
	</div>


	

	<AlertWelcome />
</template>
