<script setup>
import capitalize from "capitalize";
import { onMounted, ref } from "vue";
import dateTimeService from "../service/modules/dateTimeService";
import userService from "../service/modules/userService";

const userList = ref();
const error = ref(false)
const choosenUser = ref({})

async function getUser() {
  try {
    const response = await userService.getAll();
		error.value = false
    // console.log(response.data.data);
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
}

onMounted(() => {
  getUser();
});
</script>

<template>
	<div>
		<h1>Tabel user</h1>
		<div class="row">

			<!-- user table column -->
			<div class="col-md-6">
				<div class="card">
					<div class="card-body">
						<p class="text-center muted" v-if="error">Error: cannot fetch data.</p>
						<table v-else class="table  table-hover">
							<thead>
								<tr>
									<th>#</th>
									<th>Username</th>
									<th>Nama</th>
									<th>Akses</th>
								</tr>
							</thead>

							<tbody>
								<tr @click="showUser(user)" v-for="(user, index) in userList">
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
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- user detail column -->
			<div class="col-md-6">
				<div class="card sticky-top shadow-sm" v-if="choosenUser.id">
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
							<div class="col">{{ dateTimeService(choosenUser.created_at).full() }}</div>
						</div>

						<div class="row mb-3">
							<div class="col-md-4 text-muted">Update terakhir</div>
							<div class="col">{{ choosenUser.updated_at ? dateTimeService(choosenUser.updated_at).full() : '-' }}</div>
						</div>

						<div class="row">
							<div class="col text-end">
								<button class="btn btn-warning">
									<i class="bi-pencil"></i>
									Edit
								</button>

								<button class="btn btn-danger ms-1">
									<i class="bi-trash"></i>
									Hapus
								</button>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>

	<div v-if="choosenUser">
		{{ choosenUser }}
	</div>

</template>
