<script setup>
import capitalize from 'capitalize';
import { onBeforeMount, ref, watch } from 'vue';
import userService from '../service/modules/userService';
import clearString from '../helper/clear-string'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import ButtonBack from '../components/ButtonBack.vue';
import { useIndexStore } from '../stores';
import router from '../router';


const indexStore = useIndexStore()

const name = ref("")
const username = ref("")
const password = ref("")
const passwordConfirmation = ref("")
const phone = ref("")
const profilePic = ref("")

const isValidName = ref(true)
const isValidUsername = ref(true)
const isValidPassword = ref(true)
const isSamePassword = ref(true)

function validateName() {
	const validCondition = 
		name.value.length

	isValidName.value = validCondition
	return validCondition;
}

function validateUsername() {
	const validCondition = 
		username.value.length >= 5

	isValidUsername.value = validCondition
	return validCondition;
}

function validatePassword() {
	const validCondition = 
		password.value.length >= 8

	isValidPassword.value = validCondition
	return validCondition;
}

function checkPasswordConfirmation() {
	const validCondition =
		passwordConfirmation.value === password.value
		&& passwordConfirmation.value.length >= 8

	isSamePassword.value = validCondition
	return validCondition
}

function validateAll() {
	validateName()
	validateUsername()
	validatePassword()
	checkPasswordConfirmation()

	return isValidName.value && isValidUsername.value && isValidPassword.value && isSamePassword.value
}

async function registerUser() {

	if (!validateAll()) return console.log("form is not valid!")

	indexStore.isExistUnsavedChanges = false;

	const formData = new FormData()
	formData.append("name", capitalize.words(name.value).trim())
	formData.append("username", clearString(username.value))
	formData.append("password", password.value)
	formData.append("phone", phone.value)
	formData.append("profilePic", profilePic.value.files[0])

	try {
		await userService.create(formData)
		router.push("/user")
		indexStore.actionSuccessMessage = "user baru tersimpan!"
	 } catch (err) {
		console.error(err)
		indexStore.actionErrorMessage = err
	}
}

// watch if there is changes to the form fields.
watch(() => [
	name.value,
	username.value,
	password.value,
	phone.value
], () => {
	indexStore.isExistUnsavedChanges = true
})

onBeforeMount(() => {
	indexStore.isExistUnsavedChanges = false
})

onBeforeRouteLeave(() => {
	if (!indexStore.isExistUnsavedChanges) {
		return true
	}

	if (confirm("leave unsaved changes?")) {
		indexStore.isExistUnsavedChanges = false;
		return true;
	}

	return false
})
</script>

<template>
	<div>
		<div class="row">
			<div class="col">
				<h1>User baru</h1>
			</div>
			<div class="col text-end">
				<ButtonBack />
			</div>
		</div>
		<div class="row">
			<div class="col">
				<form @submit.prevent="registerUser()" enctype="multipart/form-data">
					<div class="row">
						<div class="col-md-6 pe-5">

							<div class="mb-3">
								<label class="form-label">Nama</label>
								<input 
									v-model="name" 
									type="text" 
									class="form-control" 
									:class="{'border-danger' : !isValidName}"
									@blur="validateName">
								<div  class="text-danger" v-if="!isValidName">nama harus diisi!</div>
							</div>
				
							<div class="mb-3">
								<label class="form-label">Username</label>
								<input 
									v-model="username" 
									@blur="validateUsername" 
									@keydown="validateUsername" 
									type="text" class="form-control" 
									:class="{'border-danger' : !isValidUsername}"
									placeholder="5 karakter atau lebih">
								<div  class="text-danger" v-if="!isValidUsername">username tidak valid!</div>
							</div>
				
							<div class="mb-3">
								<label class="form-label">Kata sandi</label>
								<input 
									v-model="password" 
									type="password" 
									@blur="validatePassword" 
									class="form-control" 
									:class="{'border-danger' : !isValidPassword}"
									placeholder="8 karakter atau lebih.">
								<div class="text-danger" v-if="!isValidPassword">kata sandi tidak valid!</div>
							</div>
				
							<div class="mb-3">
								<label class="form-label">Konfirmasi kata sandi</label>
								<input 
									v-model="passwordConfirmation" 
									type="password" 
									class="form-control" 
									:class="{'border-danger' : !isSamePassword}"
									@blur="checkPasswordConfirmation">
								<div class="text-danger" v-if="!isSamePassword">password tidak sama!</div>
							</div>
		
							<div class="mb-3">
								<label class="form-label">Nomor telpon</label>
								<input 
									v-model="phone" 
									type="tel" 
									class="form-control" 
									>
							</div>
				
							<button type="submit" class="btn btn-primary">Simpan</button>
						</div>
						
						<div class="col-md-6 d-flex flex-column justify-content-center align-items-center border-start">

							<div class="mb-3">
								<label class="form-label">Foto profil</label>
								<input 
									ref="profilePic"
									type="file" 
									name="profilePic"
									accept="image/*"
									class="form-control" 
									
									>
							</div>
							
						</div>
					</div>
				</form>
			</div>
		</div>


	</div>
</template>