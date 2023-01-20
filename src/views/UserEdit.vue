<script setup>
import capitalize from 'capitalize';
import { onBeforeMount, ref } from 'vue';
import router from '../router';
import userService from '../service/modules/userService';
import clearString from '../helper/clear-string'
import { useIndexStore } from '../stores';
import { useAuthStore } from '../stores/auth';
import ButtonBack from '../components/ButtonBack.vue'

const indexStore = useIndexStore()
const authStore = useAuthStore()

const name = ref("")
const username = ref("")
const password = ref("")
const passwordConfirmation = ref("")
const phone = ref("")

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
	
	let validationResult = isValidName.value && isValidUsername.value
	if (password.value.length > 0) {
		validatePassword()
		checkPasswordConfirmation()
		let validationResult = validationResult && isValidPassword && isSamePassword
	}

	return validationResult
}

async function updateUser() {
	if (!validateAll()) return console.log("form is not valid!")

	let data = {
		name: capitalize.words(name.value).trim(),
		username: clearString(username.value),
	}

	if (password.value.length > 0) { 
		data.password = password.value
	}

	console.log(data)

	const isNoChange =
		(data.name === indexStore.choosenUser.name)
		&&(data.username === indexStore.choosenUser.username)


	if (isNoChange) {
		console.log("no changes were made")
		return router.push("/user")
	} 
	
	const response = await userService.update(data, indexStore.choosenUser.id)
	console.log(response)
	if (response.status === 200) {
		console.log("user updated")
		router.push("/user")
	}
}

console.log(indexStore.choosenUser)


onBeforeMount(() => {
	name.value = indexStore.choosenUser.name
	username.value = indexStore.choosenUser.username
	phone.value = indexStore.choosenUser.phone

})
</script>

<template>
	<div v-if="indexStore.choosenUser.id">
		<div class="row">
			<div class="col">
				<h1>Edit data user</h1>
			</div>
			<div class="col text-end">
				<ButtonBack />
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="card mt-5">
					<div class="card-body">
						<form @submit.prevent="updateUser">
				
							<div class="mb-3">
								<label class="form-label">Nama</label>
								<input 
									v-model="name" 
									type="text" 
									class="form-control" 
									:class="!isValidName ? 'border-danger' : null"
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
									:class="!isValidUsername ? 'border-danger' : null"
									placeholder="5 karakter atau lebih">
								<div  class="text-danger" v-if="!isValidUsername">username tidak valid!</div>
								
							</div>

							<!-- password stuff -->
							<div v-if="authStore.isAdmin">
								<div class="mb-3">
									<label class="form-label">Kata sandi baru</label>
									<input 
										v-model="password" 
										type="password" 
										@blur="validatePassword" 
										class="form-control" 
										:class="!isValidPassword ? 'border-danger' : null"
										placeholder="8 karakter atau lebih.">
									<div class="text-danger" v-if="!isValidPassword">kata sandi tidak valid!</div>
								</div>
					
								<div class="mb-3">
									<label class="form-label">Konfirmasi kata sandi</label>
									<input 
										v-model="passwordConfirmation" 
										type="password" 
										class="form-control" 
										:class="!isSamePassword ? 'border-danger' : null"
										@blur="checkPasswordConfirmation">
									 <div class="text-danger" v-if="!isSamePassword">password tidak sama!</div>
								</div>
							</div>

							<div class="mb-3">
								<label class="form-label">Nomor telpon</label>
								<input 
									v-model="phone" 
									type="tel" 
									class="form-control" 
									>
								 <!-- <div class="text-danger" v-if="!isSamePassword">password tidak sama!</div> -->
							</div>

				
							<button type="submit" class="btn btn-primary">Simpan</button>
						</form>
					</div>
				</div>
			</div>
	
			<div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
				<i class="bi-person-lines-fill display-1"></i>
				<br>
				idk how to make this thing bigger
			</div>
		</div>
	</div>

	<div v-else>
		No choosen user! go back!
	</div>
</template>