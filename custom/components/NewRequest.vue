<script setup>
import buildings from "@@/helpers/buildings.js";
import {ref, watch} from "vue";
import Button from "@@/components/Button.vue";
import {updateRequest} from "@@/helpers/requests.js";
import adminforth from '@/adminforth';


// import {Toast} from "bootstrap";

const flat = ref('')
const building = ref('')
const plate = ref('')
const loading = ref(false)
const fs3 = 'fs-3'

watch(building, (newValue, oldValue) => {
  if (newValue !== '') {
    document.getElementById('flat').focus()
  }
})

function addRequest() {
  if(!plate.value || !building.value || !flat.value){
    return
  }
  loading.value = true
  let date_start = new Date()
  let date_end = new Date()
  date_end.setDate(date_start.getDate() + 1)

  let data = {
    'plate': plate.value,
    'building': building.value,
    'flat': flat.value,
    'expireAt': date_end.toISOString(),
  }
  updateRequest(data)
      .then(response => {
        loading.value = false
        if (response.status === 200) {
          adminforth.alert({message: 'Заявка створена', variant: 'success'})
          // Toast.getOrCreateInstance(document.getElementById('newRequestSuccessToast')).show();
          plate.value = building.value = flat.value = ''
        }
        document.getElementById('new-plate').blur()
      })
}
</script>
<template>
  <form id="new-order" class="modal-content">
    <div class="modal-body">
      <div class="row fs-5">
        <div class="col-md-7">
          <label class="form-label">Будинок</label>
          <div class="flex-wrap btn-group btn-outline-primary input-group-text mb-3" id="building-select">
            <div v-for="(name, key) in buildings" class="font-monospace">
              <input type="radio" class="btn-check" name="building" v-model="building" :id="key" autocomplete="off"
                     :value="key"/>
              <label class="btn fs-4" :for="key" v-html=name></label>
            </div>
          </div>
        </div>
        <div class="col-md-5 d-flex flex-column">
          <div class="mb-2">
            <label for="flat" class="form-label">Приміщення</label>
            <input type="text" class="form-control fs-4" v-model.trim="flat" id="flat" placeholder="xxx" tabindex="1">
          </div>
          <div class="mb-2">
            <label for="new-plate" class="form-label">Номер авто</label>
            <input type="text" class="form-control text-uppercase font-monospace fs-4" v-model.trim="plate" name="plate"
                   id="new-plate" placeholder="xx0000xx" tabindex="2" required>
          </div>
          <Button @action="addRequest" :loading="loading" :size="fs3">Додати</Button>
        </div>
      </div>
    </div>
    <div class="modal-footer">

    </div>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="newRequestSuccessToast" class="toast align-items-center text-bg-success border-0" role="alert"
           aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body fs-4">
            Заявка створена
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
