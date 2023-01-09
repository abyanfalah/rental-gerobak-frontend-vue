<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import gerobakService from "../service/modules/gerobakService"
import gerobakTypeService from "../service/modules/gerobakTypeService"


const gerobakList = ref([])
const gerobakTypeNameList = ref({})
const error = ref(false)

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




onBeforeMount(() => {
	getGerobakListWithType()
});
</script>

<template>
	<div>
		  <div class="card mt-3">
				<div class="card-body">
					<h1>Tabel Gerobak</h1>
					<p class="text-center muted" v-if="error">Error: cannot fetch data.</p>
					<table v-else class="table table-borderless table-striped">
						<thead>
							<tr>
								<th>#</th>
								<th>Kode</th>
								<!-- <th>Tipe</th> -->
								<th>Status</th>
								<th class="text-center">Opsi</th>
							</tr>
						</thead>

						<tbody>
							<tr v-for="(gerobak, index) in gerobakList">
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
								<td class="text-center">
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
								</td>
							</tr>
						</tbody>
					</table>
				</div>
    </div>
	</div>
</template>
