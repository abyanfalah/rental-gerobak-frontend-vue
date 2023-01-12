<script setup>
import capitalize from "capitalize";
import { onMounted, ref } from "vue";
import rentService from "../service/modules/rentService";
import getDateTime from "../service/modules/dateTimeService";

const rentList = ref();
const error = ref(false)


async function getRent() {
  try {
    const response = await rentService.getAll();
		error.value = false
    rentList.value = response.data.data;
  } catch (err) {
		error.value = true
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

function getTextColor(rentStatus) {
	if (rentStatus.toLowerCase() !== "partial") {
		return "text-white"
	} else {
		return null
	}
}


onMounted(() => {
  getRent();
});
</script>

<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-4" v-for="(rent, index) in rentList">
				<RouterLink :to="`rent/${rent.id}`" class="text-decoration-none">
					<div 
						class="card shadow-sm"
						:class="[`bg-${getBadgeColor(rent.status)}`, getTextColor(rent.status)]"
					>
						<div class="card-body">
							
							<div class="row">
								<div class="col">
									<span class="fs-3">
										{{ capitalize.words(rent.customer) }}
									</span>
								</div>
								<div class="col text-end">
									<div class="badge bg-light" :class="`text-${getBadgeColor(rent.status)}`">{{ rent.status }}</div>
								</div>
							</div>

							<div class="row my-3">
								<div class="col">
									<!-- <div class="row">
										<div class="col">
											<small>
												<div class="badge">Start</div>
											</small>
										</div>
									</div> -->
									<div class="row">
										<div class="col">
											<div class="badge bg-light text-start" :class="`text-${getBadgeColor(rent.status)}`">
												<div class="row">
													<div class="col">{{ getDateTime(rent.created_at).date }}</div>
												</div>
												<div class="row mt-2">
													<div class="col">{{ getDateTime(rent.created_at).time }}</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<!-- <div class="col d-flex justify-content-center align-items-center">to</div> -->

								<!-- <div class="col">
									<div class="row">
										<div class="col">
											<small>
												<div class="badge">End</div>
											</small>
										</div>
									</div>



									<div class="row">
										<div class="col">
											<div class="badge bg-light text-start" :class="`text-${getBadgeColor(rent.status)}`">
												<div class="row">
													<div class="col">{{ getDateTime(rent.created_at).date }}</div>
												</div>
												<div class="row mt-2">
													<div class="col">{{ getDateTime(rent.created_at).time }}</div>
												</div>
											</div>
										</div>

									
										
									</div>
								</div> -->
							</div>

							<div class="row">
								<div class="col">
									<small class="">
										<small>
											{{ rent.id }}
										</small>
									</small>
								</div>
								<div class="col-md-3 d-flex justify-content-end align-items-end">
									{{ capitalize.words(rent.user) }}
								</div>
							</div>
						
						</div>
					</div>
				</RouterLink>
			</div>
		</div>
	</div>
</template>
