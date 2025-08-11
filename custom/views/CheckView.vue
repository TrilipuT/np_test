<script setup>
import {ref} from 'vue'
import Button from "@@/components/Button.vue"
import ResultsCard from "@@/components/ResultsCard.vue"
import {getVehicle} from "@@/helpers/requests.js";

const plate = ref()
const results = ref([])
const loading = ref(false)
const ownersCount = ref(0)
getVehicle({count:true}).then(data =>
    ownersCount.value = data
)

async function getInfo() {
  loading.value = true
  results.value = []
  await new Promise(r => setTimeout(r, 500));
  getVehicle({plate:plate.value}).then(data => {
    results.value = data
    loading.value = false
  })
}
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.7/css/bootstrap.min.css" integrity="sha512-fw7f+TcMjTb7bpbLJZlP8g2Y4XcCyFZW8uy8HsRZsH/SwbMw0plKHFHr99DN3l04VsYNwvzicUX/6qurvIxbxw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <section class="py-4">
    <main class="container col-lg-5">
      <div class="m-auto">
        <p>Всього авто в базі: {{ ownersCount }}</p>
        <form id="validate">
          <div class="input-group input-group-lg mb-3">
            <input v-model="plate" type="text" class="form-control text-uppercase font-monospace fs-1" id="plate"
                   placeholder="ХХ0000ХХ" required>
            <label for="plate" class="visually-hidden">Plate</label>
            <Button @action="getInfo" :loading="loading">Пошук</Button>
          </div>
        </form>
      </div>
      <div id="info">
        <div>
          <results-card v-for="result in results" :key="result.plate" :result="result"></results-card>
          <p v-if="!results.length">Нічого не знайдено</p>
        </div>
      </div>
    </main>
  </section>
</template>
