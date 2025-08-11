<script setup>
defineProps(['result'])
import buildings from "@@/helpers/buildings.js";
</script>

<template>
  <div class="card mb-3 fs-2">
    <h1 class="card-header">{{ result.plate }}</h1>
    <div class="card-body">
      <div class="card-text">
        <div>
          <strong>Адреса:</strong> <br>{{ buildings[result.users[0].building] }}, {{ result.users[0].flat }}
        </div>
        <strong>Телефони:</strong> <br>
        <div v-for="user in result.users" :key="user.id">
          {{ user.phone }} <a :href="'tel:'+user.phone" class="btn btn-primary btn-sm">подзвонити</a>
        </div>
      </div>
    </div>
  </div>
</template>
