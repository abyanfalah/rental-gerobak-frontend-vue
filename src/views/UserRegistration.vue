<script setup>
import capitalize from 'capitalize';
import { ref } from 'vue';
import router from '../router';
import userService from '../service/modules/userService';
import clearString from '../helper/clear-string'

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
	validatePassword()
	checkPasswordConfirmation()

	return isValidName.value && isValidUsername.value && isValidPassword.value && isSamePassword.value
}

async function registerUser() {
	if (!validateAll()) return console.log("form is not valid!")

	const data = {
		name: capitalize.words(name.value).trim(),
		username: clearString(username.value),
		password: password.value,
	}

	const response = await userService.create(data)
	console.log(response)
	if (response.status === 200) {
		router.push("/user")
	}
	
}

</script>

<template>
	<div>
		<h1>User baru</h1>
		<div class="row">
			<div class="col-md-6">
				<div class="card mt-5">
					<div class="card-body">
						<form @submit.prevent="registerUser">
				
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
				
							<div class="mb-3">
								<label class="form-label">Kata sandi</label>
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
				<i class="bi-person-plus-fill display-1"></i>
				<br>
				idk how to make this thing bigger
			</div>
		</div>


	</div>
</template>