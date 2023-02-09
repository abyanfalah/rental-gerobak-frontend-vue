<script setup>
import capitalize from "capitalize";
import { onMounted, ref } from "vue";
import dateTimeService from "../service/modules/dateTimeService";
import userService from "../service/modules/userService";
import ModalUserDelete from "../components/ModalUserDelete.vue"
import { useIndexStore } from "../stores/index"
import { useAuthStore } from "../stores/auth";

const getDateTime = dateTimeService.getReadableDateTime
const indexStore = useIndexStore()
const authStore = useAuthStore(0)

const userList = ref();
const choosenUser = ref({})

const error = ref(false)

const filteredUserList = ref(false)
const searchQuery = ref()
const dataList = () => {
	return filteredUserList.value || userList.value
}

async function getUserList() {
  try {
    const response = await userService.getAll();
		error.value = false
		userList.value = response.data.data;
  } catch (err) {
		console.error(err);
		error.value = true
		
  }
}


function getBadgeColor(userAccess) {
	const colors = {
		admin: "danger",
		user: "primary"
	}

	return colors[userAccess.toLowerCase()];
}

function showUser(user) {
	choosenUser.value = user
	indexStore.choosenUser = user
}

function handleSuccessEvents() {
	choosenUser.value = {}
	indexStore.choosenUser = {}
	getUserList()
}

function filter() {
	if (!searchQuery.value) {
		filteredUserList.value = false
		return
	}

	choosenUser.value = {}
	indexStore.choosenUser = {}

	filteredUserList.value = userList.value.filter((user) => 
		user.name.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
		|| user.username.toLowerCase().indexOf(searchQuery.value.toLowerCase()) > -1
		|| user.phone.indexOf(searchQuery.value) > -1
	)
}

function clearFilter() {
	searchQuery.value = null
	filteredUserList.value = false
}

onMounted(() => {
  getUserList();
});
</script>

<template>
	<div>
		<div class="row">
			<div class="col">
				<h1>User</h1>
			</div>
			<div class="col text-end">
				<RouterLink class="btn btn-success shadow-sm" to="/user/registration">
					Tambah user baru
					<i class="bi-plus"></i>
				</RouterLink>
			</div>
		</div>

		<div class="row">

			<!-- user table column -->
			<div class="col-md-6">
				<div class="card">
					<div class="card-header d-flex justify-content-between align-items-center">
						<span>Tabel user</span>

						<div>
							<!-- search bar -->
							<div class="input-group">
								<input
								v-model="searchQuery"
								@keyup="filter()"
								class="form-control" type="text" placeholder="Ketik disini untuk mencari">
									<button class="btn" :class="{'btn-danger' : searchQuery}" type="button" @click="clearFilter">
											<i class="bi-x-lg"></i>
									</button>
							</div>
						</div>
						
					</div>
					<div class="card-body">
						<p class="text-center muted" v-if="error">Error: cannot fetch data.</p>
						
						<table v-else class="table table-sm table-hover">
							<thead>
								<tr>
									<th>#</th>
									<th>Username</th>
									<th>Nama</th>
									<th>Akses</th>
								</tr>
							</thead>

							<tbody>
								<tr
								 @click="showUser(user)" v-for="(user, index) in dataList()"
								 :class="{'bg-dark text-white' : choosenUser.id === user.id}"
								 >
									<td>{{ ++index }}</td>
									<td>{{ user.username }}</td>
									<td>{{ capitalize.words(user.name) }}</td>
									<td>
										<span 
											class="badge"
											:class="`bg-${getBadgeColor(user.access)}`"
										>
											{{ capitalize(user.access) }}
										</span>
									</td>
								</tr>
								
								
								<tr class="">
									<td colspan="4">
										<RouterLink class="btn btn-success d-block" to="/user/registration">
											Tambah user baru
											<i class="bi-plus"></i>
										</RouterLink>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- user detail column -->
			<div class="col-md-6">
				<div class="card sticky-top" v-if="choosenUser.id">
					<div class="card-header d-flex justify-content-around">
						Detail user
						<small class="ms-auto">
							<button class="btn-close" @click="choosenUser = {}"></button>
						</small>
					</div>
					<div class="card-body p-4">
						<div class="row mb-3">
							<div class="col-md-4 text-muted">ID</div>
							<div class="col"><small>{{ choosenUser.id }}</small></div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Nama</div>
							<div class="col">{{ choosenUser.name }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Username</div>
							<div class="col">{{ choosenUser.username }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Telepon</div>
							<div class="col">{{ choosenUser.phone ?? '-' }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Akses</div>
							<div class="col">
								<span 
											class="badge"
											:class="`bg-${getBadgeColor(choosenUser.access)}`"
										>
											{{ capitalize(choosenUser.access) }}
										</span>
							</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Registrasi</div>
							<div class="col">{{ getDateTime(choosenUser.created_at).full() }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Update terakhir</div>
							<div class="col">{{ choosenUser.updated_at ? getDateTime(choosenUser.updated_at).full() : '-' }}</div>
						</div>

						<div class="row" v-if="choosenUser.username != 'admin'">
							<div class="col text-end">

								<button class="btn me-1" :class="choosenUser.access == 'admin' ? 'btn-primary': 'btn-success'" v-if="authStore.isAdmin">
									
									<div v-if="choosenUser.access !== 'admin'">
										<i class="bi-person-check-fill"></i>
										Jadikan sebagai admin
									</div>

									<div v-else>
										<i class="bi-person-x-fill"></i>
										Cabut akses admin
									</div>
									
								</button>

								<RouterLink to="/user/edit" class="btn btn-warning"
								v-if="authStore.isAdmin"
								>
									<i class="bi-pencil"></i>
									Edit
								</RouterLink>

								<button class="btn btn-danger ms-1" data-bs-toggle="modal" data-bs-target="#modalUserDelete"
								v-if="authStore.isAdmin"
								>
									<i class="bi-trash"></i>
									Hapus
								</button>

								<button
									class="btn btn-primary"
									v-if="choosenUser.id === authStore.user.id"
								>
									<i class="bi-person-fill"></i>
									Edit profil saya
								</button>

								
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>

	<div v-if="choosenUser.id">
		{{ choosenUser }}
	</div>

	<ModalUserDelete @user-delete-success="handleSuccessEvents" />
</template>
