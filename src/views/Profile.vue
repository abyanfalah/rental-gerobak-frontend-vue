<script setup>
import capitalize from 'capitalize';
import { onBeforeMount, onMounted, ref } from 'vue';
import userService from '../service/modules/userService';
import { useAuthStore } from '../stores/auth';
import isNumber from '../helper/is-number'

import ButtonBack from '../components/ButtonBack.vue'
import ModalUserEditConfirmation from '../components/ModalUserEditConfirmation.vue'
import { useIndexStore } from '../stores';
import { computed } from '@vue/reactivity';

const authStore = useAuthStore()
const editMode = ref(false)
const user = ref({})
const oldData = ref({})

const isAvailableUsername = ref(true)
async function checkUsernameAvailability() {
	isAvailableUsername.value = true
	const usernameToCheck = formValues.value.username

	if (usernameToCheck.length < 5) return

	if (usernameToCheck === user.value.username) return

	const response = (await userService.checkUsername(usernameToCheck)).data
		console.log(response)
		isAvailableUsername.value = response
}

// use "valid input" method name instead? decide later
const formValues = ref({})
const isValidForm = computed(() => {
	const newData = formValues.value
	const isChanged = JSON.stringify(oldData.value) !== JSON.stringify(newData)
	const isValidLength = newData.username.length >= 5 && newData.name.length > 0
	const validity = isChanged && isValidLength
	return validity
})


const passwordForm = ref({})
const isValidPasswordForm = computed(() => {
	const password = passwordForm.value

	if(!password.old || !password.new || !password.confirmation) return false

	if (password.new.length < 8) return false
	if (password.new !== password.confirmation) return false

	return true
})

async function saveChanges() {
	editMode.value = false

	// Trim whitespace
	let formData = Object.assign({}, formValues.value)
	for (let key of Object.keys(formData)) {
		formData[key] = formData[key].trim()
	}

	try {
		const response = await userService.update(formData, user.value.id)
	
		// probably needs (if response.status == 200)

		reloadData()
		useIndexStore().actionSuccessMessage = "Perubahan berhasil disimpan!"
		console.log("user update response =>",response)
	} catch (err) {
		console.error(err)
		useIndexStore().actionErrorMessage = "Gagal menyimpan perubahan!"
	}
}

function loadData() {
		user.value = {
		id: authStore.user.id, 
		name: authStore.user.name,
		username: authStore.user.username,
		phone: authStore.user.phone,
		access: authStore.user.access
	}

	Object.assign(formValues.value, user.value)
	delete formValues.value.access
	Object.assign(oldData.value, formValues.value)
}

async function reloadData() {
	const newUserData = (await userService.getSession()).data.user
	console.log("new session data =>",newUserData)
	authStore.user = newUserData
	loadData()
}



onBeforeMount(() => {
	loadData()
});
</script>

<template>
	<div>
		<div class="row">
			<div class="col">
				<h1>
					<span v-if="editMode == true">Edit profil</span>
					<span v-else-if="editMode == 'password'">Ubah password</span>
					<span v-else>Profil</span>
				</h1>
			</div>
			<div class="col d-flex justify-content-end">
				<ButtonBack />
			</div>
		</div>

		<!-- user data row -->
		<div class="row mb-5">
			<!-- user data column -->
			<div class="col">
			
				<!-- user info -->
				<div v-if="editMode == false" class="card">
					<div class="card-header text-muted">
						<span class="font-monospace">{{ user.id }}</span>
					</div>
					<div class="card-body">
						<!-- nama lengkap -->
						<div class="row mb-3">
							<div class="col-md-3 text-muted">Nama</div>
							<div class="col">
								<div>
									{{ capitalize.words(user.name) }}
								</div>
							</div>
						</div>
		
						<!-- username -->
						<div class="row mb-3">
							<div class="col-md-3 text-muted">Username</div>
							<div class="col">
								<div>
									{{ user.username }}
								</div>
							</div>
						</div>
		
						<!-- phone -->
						<div class="row mb-3">
							<div class="col-md-3 text-muted">Telepon</div>
							<div class="col">
								<div>
									{{ user.phone }}
								</div>
							</div>
						</div>
		
						<!-- access -->
						<div class="row mb-3">
							<div class="col-md-3 text-muted">Akses</div>
							<div class="col">
								<span class="badge text-white" :class="`bg-${userService.getColorByAccess(user.access)}`">
									
									{{ capitalize(user.access) }}
								</span>
							</div>
						</div>
				
					</div>

					<div class="card-footer text-end">
						<button 
						@click="editMode = 'password'" 
						class="btn btn-warning text-dark me-2">
							<i class="bi-key-fill"></i>
							Ubah password
						</button>	

						<button 
						@click="editMode = true" 
						class="btn btn-primary px-4">
							<i class="bi-pencil-fill"></i>
							Edit
						</button>	
					</div>
				</div>

				<!-- edit password form -->
				<div v-else-if="editMode == 'password'" class="col-10">

					<!-- old password -->
					<div class="mb-3">
						<label class="form-label">Password lama</label>
						<input 
							v-model="passwordForm.old"
							type="password" 
							class="form-control" 
							>
						<!-- <div  class="text-danger" v-if="!isValidName">nama harus diisi!</div> -->
					</div>

					<!-- new password -->
					<div class="mb-3">
						<label class="form-label">Password baru</label>
						<input 
							v-model="passwordForm.new"
							type="password" 
							class="form-control" 
							>
						<small 
						v-if="passwordForm.new && passwordForm.new.length < 8"
						class="text-danger"
						>
						8 karakter atau lebih</small>
					</div>

					<!-- new password confirmation -->
					<div class="mb-3">
						<label class="form-label">Konfirmasi password baru</label>
						<input 
							v-model="passwordForm.confirmation"
							type="password" 
							class="form-control" 
							>
						<small class="text-danger" v-if="passwordForm.confirmation && (passwordForm.confirmation !== passwordForm.new)" >Password tidak sama!</small>
					</div>

					<!-- save edit password -->
					<div class="mt-3 text-end">
						<button
						class="btn btn-secondary me-2 px-3"
						@click="() => {editMode = false; passwordForm = {}}"
						>
							Batal
						</button>

						<button 
						data-bs-toggle="modal"
						data-bs-target="#modalUserEditConfirmation"
						:class="isValidPasswordForm ? 'btn-success' : 'btn-secondary disabled'" 
						class="btn">
								<i class="bi-save2-fill"></i>
								Simpan
						</button>
					</div>
				</div>

				<!-- user edit form -->
				<div v-else class="col-10">

					<!-- nama -->
					<div class="mb-3">
						<label class="form-label">Nama</label>
						<input 
							v-model="formValues.name"
							type="text" 
							class="form-control" 
							>
						<!-- <div  class="text-danger" v-if="!isValidName">nama harus diisi!</div> -->
					</div>

					<!-- username -->
					<div class="mb-3">
						<label class="form-label">Username</label>
						<input 
							v-model="formValues.username"
							type="text" 
							class="form-control" 
							placeholder="5 karakter atau lebih"
							@keyup="checkUsernameAvailability"
							>
						<small v-if="!isAvailableUsername" class="text-danger">Username tidak tersedia</small>
						<small v-if="formValues.username.length < 5 && formValues.username.length > 0" class="text-danger">Harus 5 karakter atau lebih!</small>
						<!-- <div  class="text-danger" v-if="!isValidName">nama harus diisi!</div> -->
					</div>

					<!-- phone -->
					<div class="mb-3">
						<label class="form-label">Phone</label>
						<input 
							type="text" 
							class="form-control"
							v-model="formValues.phone"
							onkeypress="return /\d/.test(event.key)"
							>
						<!-- <div  class="text-danger" v-if="!isValidName">nama harus diisi!</div> -->
					</div>

					<!-- save edit button -->
					<div class="mt-3 text-end">
						<button
						class="btn btn-secondary me-2 px-3"
						@click="() => {editMode = false; loadData()}"
						>
							Batal
						</button>

						<button 
						data-bs-toggle="modal"
						data-bs-target="#modalUserEditConfirmation"
						:class="isValidForm && isAvailableUsername ? 'btn-success' : 'btn-secondary disabled'"
						class="btn">
								<i class="bi-save2-fill"></i>
								Simpan
						</button>
					</div>
				</div>

			</div>

			<!-- profile pic column -->
			<div class="col d-flex justify-content-center">
				<!-- profile pic -->
				<div class="">
					<div class="d-flex align-items-center mb-3">
						<h3 class="d-inline mb-0 me-3">Foto profil</h3>
						<button class="btn btn-primary btn-sm	">
							<i class="bi-box-arrow-down-left"></i>
							Ubah
						</button>
					</div>
					<img :src="authStore.userImageUrl" class="img-thumbnail rounded" width="230">
				</div>
			</div>
		</div>

		<hr>	

		<!-- user transaction history -->
		<h1>Riwayat transaksi</h1>
	</div>

	<ModalUserEditConfirmation @user-edit-confirm="saveChanges()" />

	<div>
		<p>password</p>
		<p>{{ passwordForm }}</p>
	</div>

	<div>
		<p>OldData</p>
		<p>{{ oldData }}</p>
	</div>

	<div>
		<p>FormValues</p>
		<p>{{ formValues }}</p>
	</div>

	<div>
		<p>AuthStore.user</p>
		<p>{{ authStore.user }}</p>
	</div>

</template>