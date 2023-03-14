<script setup>


console.log("Welcome to testpage")
</script>

<template>
	<div>
		<h1>The testpage</h1>
		<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalTest">munculin modal</button>
		
		<div class="modal" id="modalTest" >
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-body">
						ini modal test
						<button class="btn btn-danger" >tutup ni modal</button>
					</div>
				</div>
			</div>
		</div>
	</div>


</template>