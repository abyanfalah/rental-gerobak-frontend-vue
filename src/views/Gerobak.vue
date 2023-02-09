<script setup>
import capitalize from "capitalize";
import { onBeforeMount, onMounted, ref } from "vue";
import dateTimeService from "../service/modules/dateTimeService";
import gerobakService from "../service/modules/gerobakService"
import gerobakTypeService from "../service/modules/gerobakTypeService"
import { useIndexStore } from "../stores";
import { useAuthStore } from "../stores/auth";
import ModalGerobakDelete from "../components/ModalGerobakDelete.vue"
import ModalGerobakAdd from "../components/ModalGerobakAdd.vue";

const indexStore = useIndexStore();
const authStore = useAuthStore()
const getDateTime = dateTimeService.getReadableDateTime

const gerobakList = ref([])
const gerobakTypeNameList = ref({})
const error = ref(false)

const choosenGerobak = ref({})

async function getGerobakList() {
	try {
		const responseGerobak = await gerobakService.getAll()
		gerobakList.value = responseGerobak.data.data 

		error.value = false
	}
	catch (err) {
		console.error(err)
		error.value = true
	}
}

async function getGerobakListWithType() {
	try {
		const responseGerobak = await gerobakService.getAll()
		gerobakList.value = responseGerobak.data.data 

		const responseGerobakType = await gerobakTypeService.getAll()
		const typeList = responseGerobakType.data.data

		typeList.forEach(gerobakType => {
			gerobakTypeNameList.value[gerobakType.id] = gerobakType.name;
		});	

		error.value = false
	}
	catch (err) {
		console.error(err)
		error.value = true
	}
}

function getBadgeColor(gerobakStatus) {
	const colors = {
		ada: "success",
		disewa: "primary",
	}

	return colors[gerobakStatus.toLowerCase()];
}

function showGerobak(gerobak) {
	choosenGerobak.value = gerobak
	indexStore.choosenGerobak = gerobak
	
}

function handleSuccessEvents() {
	choosenGerobak.value = {}
	indexStore.choosenGerobak = {}
	getGerobakList()

}

onBeforeMount(() => {
	getGerobakListWithType()
});

</script>

<template>
	<div>
		<!-- header row -->
		<div class="row">
			<div class="col">
					<h1>Gerobak</h1>
			</div>
				<div class="col text-end">
					<button class="btn btn-success shadow-sm" data-bs-toggle="modal" data-bs-target="#modalGerobakAdd">
						Tambah gerobak baru
						<i class="bi-plus"></i>
					</button>
				</div>
		</div>

		<!-- content row -->
		<div class="row">

			<!-- gerobak table col -->
			<div class="col-md-6">
				<div class="card">
					<div class="card-body">
						<p class="text-center muted" v-if="error">Error: cannot fetch data.</p>
						<table v-else class="table table-sm table-hover">
							<thead>
								<tr>
									<th>#</th>
									<th>Kode</th>
									<th>Status</th>
								</tr>
							</thead>
		
							<tbody>
								<tr 
									@click="showGerobak(gerobak)" v-for="(gerobak, index) in gerobakList"
									:class="{'bg-dark text-white' : choosenGerobak.id === gerobak.id}"
									>
									<td>{{ ++index }}</td>
									<td>{{ gerobak.code }}</td>
									<td>
										<span
											class="badge"
											:class="`bg-${getBadgeColor(gerobak.status)}`"
										 >
											{{ gerobak.status }}
										</span>
									</td>
									<!-- <td>{{ gerobakTypeNameList[gerobak.type_id] }}</td> -->
									<!-- <td class="text-center">
										<div class="btn-group btn-group-sm">
											<button class="btn btn-primary">
												<i class="bi-eye"></i>
											</button>
											<button class="btn btn-warning">
												<i class="bi-pencil"></i>
											</button>
											<button class="btn btn-danger">
												<i class="bi-trash"></i>
											</button>
										</div>
									</td> -->
								</tr>
								<tr class="">
									<td colspan="3">
									<button class="btn btn-success shadow-sm w-100" data-bs-toggle="modal" data-bs-target="#modalGerobakAdd">
										Tambah gerobak baru
										<i class="bi-plus"></i>
									</button>
										
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- gerobak detail column -->
			<div class="col-md-6">
				<div class="card sticky-top" v-if="choosenGerobak.id">
					<div class="card-header d-flex justify-content-around">
						Detail gerobak
						<small class="ms-auto">
							<button class="btn-close" @click="choosenGerobak = {}"></button>
						</small>
					</div>
					<div class="card-body p-4">

						<div class="row mb-3">
							<div class="col-md-4 text-muted">ID</div>
							<div class="col"><small>{{ choosenGerobak.id }}</small></div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Kode</div>
							<div class="col">{{ choosenGerobak.code }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Tipe</div>
							<div class="col">{{ capitalize.words(gerobakTypeNameList[choosenGerobak.type_id]) }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Status</div>
							<div class="col">
								<span 
										class="badge"
										:class="`bg-${getBadgeColor(choosenGerobak.status)}`"
									>
										{{ choosenGerobak.status }}
								</span>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Dibuat</div>
							<div class="col">{{ getDateTime(choosenGerobak.created_at).full() }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Update terakhir</div>
							<div class="col">{{ choosenGerobak.updated_at ? getDateTime(choosenGerobak.updated_at).full() : '-' }}</div>
						</div>

						<div class="row" >
							<div class="col text-end">

								<div v-if="authStore.isAdmin && choosenGerobak.status.toLowerCase() !== 'disewa'">
									<RouterLink to="/gerobak/edit" class="btn btn-warning disabled">
										<i class="bi-pencil"></i>
										Edit
									</RouterLink>
									
									<button class="btn btn-secondary ms-1">
										<i class="bi-exclamation-octagon-fill"></i>
										Nonaktifkan
									</button>
	
									<button class="btn btn-danger ms-1" data-bs-toggle="modal" data-bs-target="#modalGerobakDelete">
										<i class="bi-trash"></i>
										Hapus
									</button>

								</div>

								<div v-else>
									<!-- TODO: get rent by gerobak? damn bruh -->
									<button class="btn btn-primary">Lihat penyewaan</button>
								</div>

								
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

	</div>

	<ModalGerobakDelete @gerobak-delete-success="handleSuccessEvents" />
	<ModalGerobakAdd @gerobak-add-success="handleSuccessEvents" />
</template>
