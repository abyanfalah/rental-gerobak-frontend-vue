<script setup>
import capitalize from "capitalize";
import { ref } from "vue";
import gerobakService from "../service/modules/gerobakService";
import gerobakTypeService from "../service/modules/gerobakTypeService";

const emit = defineEmits(['gerobakAddSuccess', 'gerobakAddFailed'])

const type_id = ref(1)
const gerobakTypeList = ref([])
const isValidGerobakType = ref(true)

function validateInput() {
	if (type_id.value) {
		isValidGerobakType.value = true
		return true
	} 
	
	isValidGerobakType.value = false
	return false
}

async function addGerobak() {
	if(!validateInput()) return false

	const response = await gerobakService.create({type_id: type_id.value})
	console.log(response)
	if (response.status == 200) {
		console.log("success, go refresh")
		emit('gerobakAddSuccess')
	} else {
		// TODO: use proper modal (use modal error if u can)
		alert("gerobak add failed")
	}
}

async function getGerobakType() {
	const data = (await gerobakTypeService.getAll()).data.data
	gerobakTypeList.value = data
}

getGerobakType()

</script>

<template>
	<div class="modal fade" data-bs-backdrop="static" id="modalGerobakAdd" >
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header bg-success text-white fw-bold">Gerobak baru</div>
				<div class="modal-body">
					<form @submit.prevent="addGerobak" class="p-3">

						<div class="mb-3">
							<label class="form-label">Tipe gerobak</label>
							<select v-model="type_id" class="form-select" @change="validateInput" @blur="validateInput">
								<option 
								v-for="gerobakType in gerobakTypeList" 
								:value="gerobakType.id"
								>
									{{ capitalize.words(gerobakType.name) }} - {{ gerobakType.code }}
								</option>
							</select>
							<div  class="text-danger" v-if="!isValidGerobakType">Tipe gerobak tidak valid!</div>
						</div>

				
						<div class="d-block text-end">
							<button type="button" class="btn btn-danger me-1" data-bs-dismiss="modal">Batal</button>

							<!-- TODO: find a way to do validation before closing modal -->
							<button type="submit" class="btn btn-success" :class="isValidGerobakType ? '': 'disabled'" @mouseenter="validateInput">Simpan</button>

						</div>

				
					</form>
				</div>
				</div>
		</div>
	</div>

	<!-- <button ref="closeModalBtn" data-bs-dismiss="modal">asdfasf</button> -->
</template>