<script setup>
import capitalize from "capitalize";
import { onBeforeMount, onMounted, ref } from "vue";
import customerService from "../service/modules/customerService";

const customerList = ref();
const error = ref(false)
async function getCustomer() {
  try {
    const response = await customerService.getAll();
    // console.log(response.data.data);
		error.value = false
    customerList.value = response.data.data;
  } catch (err) {
    console.error(err);
		error.value = true
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

onBeforeMount(() => {
  getCustomer();
});
</script>

<template>
  <div>
    <div class="card mt-3">
      <div class="card-body">
        <h1>Tabel pelanggan</h1>
				<p class="text-center muted" v-if="error">Error: cannot fetch data.</p>
        <table v-else class="table table-borderless table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama</th>
              <th>Telepon</th>
              <th class="text-center">Opsi</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(customer, index) in customerList">
              <td>{{ ++index }}</td>
              <td>{{ capitalize.words(customer.name) }}</td>
              <td>{{ customer.phone }}</td>
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
