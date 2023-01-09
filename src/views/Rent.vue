<script setup>
import capitalize from "capitalize";
import { onMounted, ref } from "vue";
import rentService from "../service/modules/rentService";

const rentList = ref();

async function getRent() {
  try {
    const response = await rentService.getAll();
    console.log(response.data.data);
    rentList.value = response.data.data;
  } catch (err) {
    console.error(err);
  }
}

function getBadgeColor(rentStatus) {
	const colors = {
		ok: "success",
		berlangsung: "primary",
		partial: "warning"
	}

	return colors[rentStatus.toLowerCase()];
}

onMounted(() => {
  getRent();
});
</script>

<template>
  <div>
    <div class="card mt-3">
      <div class="card-body">
        <h1>Tabel rental</h1>
        <table class="table table-borderless table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Status</th>
              <th>Customer</th>
              <th>User</th>
              <th class="text-center">Opsi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(rent, index) in rentList">
              <td>{{ ++index }}</td>
              <td>{{ rent.id }}</td>
              <td>
								<span 
									class="badge"
									:class="`bg-${getBadgeColor(rent.status)}`"
									>
										{{ rent.status }}
								</span>
							</td>
              <td>{{ capitalize.words(rent.customer) }}</td>
              <td>{{ capitalize.words(rent.user) }}</td>
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
