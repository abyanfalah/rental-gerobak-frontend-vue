<script setup>
import capitalize from "capitalize";
import { onMounted, ref } from "vue";
import userService from "../service/modules/userService";

const userList = ref();

async function getUser() {
  try {
    const response = await userService.getAll();
    console.log(response.data.data);
    userList.value = response.data.data;
  } catch (err) {
    console.error(err);
  }
}

function getBadgeColor(userAccess) {
	const colors = {
		admin: "danger",
		user: "primary"
	}

	return colors[userAccess.toLowerCase()];
}

onMounted(() => {
  getUser();
});
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
              <td>{{ capitalize.words(user.name) }}</td>
              <td>
								<span 
									class="badge"
									:class="`bg-${getBadgeColor(user.access)}`"
								>
									{{ capitalize(user.access) }}
								</span>
							</td>
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
