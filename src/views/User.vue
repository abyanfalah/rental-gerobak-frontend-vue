<script setup>
import capitalize from "capitalize";
import { onMounted, ref } from "vue";
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
		<div class="row">
			<div class="col-md-6 pt-3">
				<div class="card">
					<div class="card-body">
						<h1>Tabel user</h1>
						<p class="text-center muted" v-if="error">Error: cannot fetch data.</p>
						<table v-else class="table table-borderless table-hover">
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

			<div class="col-md-6">

				<div class="sticky-top pt-3">
					<div class="card shadow-sm" v-if="choosenUser.id">
						<div class="card-header d-flex justify-content-around">
							Detail user
							<small class="ms-auto">
								<button class="btn-close" @click="choosenUser = {}"></button>
							</small>
						</div>
						<div class="card-body">
							<table class="table table-striped">
								<tr>
									<td class="text-muted">Nama</td>
									<td class="text-muted">:</td>
									<td>{{ capitalize.words(choosenUser.name) }}</td>
								</tr>
	
								<tr>
									<td class="text-muted">Username</td>
									<td class="text-muted">:</td>
									<td>{{ choosenUser.username }}</td>
								</tr>
	
								<tr>
									<td class="text-muted">Tipe akses</td>
									<td class="text-muted">:</td>
									<td>
										<span class="badge badge-sm" :class="`bg-${getBadgeColor(choosenUser.access)}`">
											{{ choosenUser.access }}
										</span>
									</td>
								</tr>
	
							</table>
						</div>
					</div>
				</div>


			</div>
		</div>
	</div>

</template>
