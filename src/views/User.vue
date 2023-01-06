<script setup>
import { onMounted, ref } from 'vue';
import userService from '../service/modules/userService';

const userList = ref()

async function getUser() {
	try {
		const response = await userService.getAll()
		console.log(response.data.data)
		userList.value = response.data.data
	} catch(err) {
		console.error(err)
	}
}

onMounted(() => {
	getUser()
})
</script>

<template>
	<div>
		<div class="card mt-3">
				<div class="card-body">
					<h1>Tabel user</h1>
					<table id="tableBarang" class="table table-borderless table-striped">
						<thead>
							<tr>
								<th>#</th>
								<th>Username</th>
								<th>Nama</th>
								<th>Akses</th>
								<th class="text-center">Opsi</th>
							</tr>
						</thead>

						<tbody>
							<tr v-for="(user, index) in userList">
								<td>{{ ++index }}</td>
								<td>{{ user.username }}</td>
								<td>{{ user.name }}</td>
								<td>{{ user.access }}</td>
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