<script setup>
import {ref, watch} from "vue";
import Button from "@@/components/Button.vue";
import {getRequest} from "@@/helpers/requests.js";
import {getBuildingName} from "@@/helpers/buildings.js";
// import {Toast} from "bootstrap";

const plate = ref('')
const results = ref([])
const archive = ref([])
const loading = ref(false)
const status = ref()
const progressClass = ref('')
let infoTimer, searchTimer;

watch(plate, (newPlate, prevPlate) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    if (newPlate.length > 3) {
      getInfo()
    }
  }, 500);
})

function getInfo() {
  loading.value = true
  getRequest(plate.value)
      .then(data => {
        document.getElementById('plate').blur()
        let date = new Date();
        let res = []
        let arch = []
        status.value = 'bg-danger'
        data.forEach(item => {
          if (Date.parse(item.expireAt) >= date.getTime()) {
            res.push(item)
            status.value = 'bg-success'
          } else {
            // item.class = 'text-bg-success'
            arch.push(item)
          }
        })
        results.value = res
        archive.value = arch
        loading.value = false
        // Toast.getOrCreateInstance(document.getElementById('info')).show();
        progressClass.value = 'w-100'
        clearTimeout(infoTimer);
        infoTimer = setTimeout(() => {
          reset();
        }, 5000);
      })
}

function reset() {
  status.value = ''
  plate.value = ''
  // results.value = []
  progressClass.value = ''
}
</script>
<template>
  <form class="h-100" :class="status">
    <div class="input-group input-group-lg mb-3">
      <input type="text" class="form-control text-uppercase font-monospace fs-1" v-model="plate" name="plate" id="plate" placeholder="ХХ0000ХХ"
             tabindex="-1" required>
      <label for="plate" class="visually-hidden">Plate</label>
      <Button @action="getInfo" :loading="loading">Пошук</Button>
    </div>
    <div class="alert alert-primary position-relative" role="alert" id="info">
      <div class="progress" role="progressbar" aria-label="Info example">
        <div class="progress-bar bg-info" :class="progressClass" style="width: 0"></div>
      </div>
      <div class="content text-uppercase fs-2">
        <div v-for="row in results" :class="row.class">
          <b class="font-monospace">{{ row.plate }}</b>: {{ getBuildingName(row.user.building) }}, {{ row.user.flat }}
        </div>
      </div>
    </div>
    <div v-if="archive.length" class="alert alert-secondary position-relative" role="alert" id="archive">
      <div class="content text-uppercase fs-3">
        <div v-for="row in archive" :class="row.class">
          <b class="font-monospace">{{ row.plate }}</b>: {{ getBuildingName(row.user.building) }}, {{ row.user.flat }}
          <span class="fs-6 opacity-50">({{ row.expireAt.slice(0, 10) }})</span>
        </div>
      </div>
    </div>

    <button type="button" class="btn btn-lg btn-warning fs-1 d-none" data-bs-toggle="modal"
            data-bs-target="#newOrderModal">
      Нова заявка
    </button>
  </form>
</template>
<style scoped>
.progress {
  --bs-progress-bar-transition: width 5s linear;
  position: absolute;
  height: 6px;
  left: 0;
  top: 0;
  width: 100%;
}
</style>