<script setup>
import capitalize from "capitalize";
import { onMounted, ref } from "vue";
import customerService from "../service/modules/customerService";

const customerList = ref();

async function getCustomer() {
  try {
    const response = await customerService.getAll();
    console.log(response.data.data);
    customerList.value = response.data.data;
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  getCustomer();
});
</script>

<template>
  <div>
    <div class="card mt-3">
      <div class="card-body">
        <h1>Tabel pelanggan</h1>
        <table class="table table-borderless table-striped">
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
